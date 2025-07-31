# api/index.py
from http.server import BaseHTTPRequestHandler
import os
import requests
import json
import google.generativeai as genai
import markdown2
from urllib.parse import urlparse, parse_qs

class handler(BaseHTTPRequestHandler):

    def do_GET(self):
        # --- 1. PARSE REQUEST AND GET USERNAME ---
        parsed_path = urlparse(self.path)
        query_params = parse_qs(parsed_path.query)
        username = query_params.get('username', [None])[0]

        if not username:
            self.send_response(400)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': 'Username is required'}).encode())
            return

        try:
            # --- 2. GATHER DATA FROM GITHUB API ---
            print(f"Fetching data for {username}...")
            # Use a personal access token for higher rate limits
            headers = {'Authorization': f'token {os.environ.get("GITHUB_TOKEN")}'} 
            
            user_res = requests.get(f"https://api.github.com/users/{username}", headers=headers)
            user_res.raise_for_status()
            user_data = user_res.json()

            repos_res = requests.get(f"{user_data['repos_url']}?sort=pushed&per_page=10", headers=headers)
            repos_res.raise_for_status()
            repos_data = repos_res.json()
            
            # --- 3. PREPARE CONTEXT FOR LLM ---
            profile_summary = {
                "name": user_data.get('name'),
                "bio": user_data.get('bio'),
                "location": user_data.get('location'),
                "public_repos": user_data.get('public_repos'),
                "followers": user_data.get('followers'),
                "top_10_recent_repos": [
                    {
                        "name": repo.get('name'),
                        "description": repo.get('description'),
                        "language": repo.get('language'),
                        "stars": repo.get('stargazers_count')
                    } for repo in repos_data
                ]
            }
            # Clean the data to remove null values which can confuse the AI
            clean_data_for_ai = {k: v for k, v in profile_summary.items() if v}
            
            # --- 4. USE LLM TO GENERATE THE REPORT ---
            print("Sending data to Google Gemini...")
            gemini_api_key = os.environ.get("GOOGLE_API_KEY") 
            genai.configure(api_key=gemini_api_key)
            
            user_prompt = f"""
            Analyze the following GitHub profile data. Do your best to provide a helpful and detailed summary based on what is available. You can also check contributions they made in organizations!

            Data:
            ```json
            {json.dumps(clean_data_for_ai, indent=2)}
            ```

            Report Structure:
            ### 📊 Overall Summary
            A brief, one-paragraph summary of the developer's likely role and expertise.

            ### 💻 Key Technical Skills
            A bulleted list of probable technical skills.

            ### 🚀 Notable Projects
            A summary of all projects listed and explained one by one

            ### 🧑‍💻 Developer Archetype
            Assign a fun but insightful "developer archetype" and a one-sentence justification.

            ### 👀 MBTI Personality
            Based on their work and profile geuss their personality(MBTI)
            
            ### 📧 Contact
            Summarize ways to contact them

            """
            
            model = genai.GenerativeModel('gemini-2.5-flash')
            response = model.generate_content(user_prompt)
            
            # --- 5. VALIDATE RESPONSE AND PREPARE JSON---
          
            markdown_report = response.text
            if not markdown_report or not markdown_report.strip():
                raise ValueError("The AI returned an empty response.")

            html_report = markdown2.markdown(markdown_report)

            # Create the JSON object that the new frontend expects
            response_data = {
                "report_html": html_report,
                "report_md": markdown_report
            }

            # --- 6. SEND SUCCESS RESPONSE ---
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            # Send the complete JSON object as the response
            self.wfile.write(json.dumps(response_data).encode())

        except Exception as e:
            print(f"ERROR during execution: {e}")
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': f'An internal server error occurred: {e}'}).encode())
        
        return
