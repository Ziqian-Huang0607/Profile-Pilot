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
        # 1. PARSE REQUEST (
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
            #  2. GATHER GITHUB DATA 
            print(f"Fetching data for {username}...")
            headers = {'Authorization': f'token {os.environ.get("GITHUB_TOKEN")}'}
            user_res = requests.get(f"https://api.github.com/users/{username}", headers=headers)
            user_res.raise_for_status()
            user_data = user_res.json()
            repos_res = requests.get(f"{user_data['repos_url']}?sort=pushed&per_page=10", headers=headers)
            repos_res.raise_for_status()
            repos_data = repos_res.json()
            
            # 3. PREPARE CONTEXT 
            profile_summary = {
                "name": user_data.get('name'), "bio": user_data.get('bio'), "location": user_data.get('location'),
                "public_repos": user_data.get('public_repos'), "followers": user_data.get('followers'),
                "top_10_recent_repos": [
                    {"name": repo.get('name'), "description": repo.get('description'), 
                     "language": repo.get('language'), "stars": repo.get('stargazers_count')} for repo in repos_data
                ]
            }
            
            # 4. USE GOOGLE GEMINI TO GENERATE THE REPORT 
            print("Sending data to Google Gemini...")
            
        
            gemini_api_key = os.environ.get("GOOGLE_API_KEY") 
            genai.configure(api_key=gemini_api_key)
            
            
            prompt = f"""
            Analyze the following GitHub profile data and generate a report.

            Data:
            ```json
            {json.dumps(profile_summary, indent=2)}
            ```

            Report Structure:
            ### 📊 Overall Summary
            A brief, one-paragraph summary of the developer's likely role and expertise based on their bio and repo descriptions.

            ### 💻 Key Technical Skills
            A bulleted list of probable technical skills (languages, frameworks, tools) inferred from the repositories. Go beyond just listing the primary language.

            ### 🚀 Notable Projects
            A summary of 2-3 of the most interesting or significant projects from the list. For each, provide the name and a one-sentence summary of its purpose.

            ### 🧑‍💻 Developer Archetype
            Based on everything, assign a fun but insightful "developer archetype" (e.g., 'The Full-Stack Architect', 'The Data Whisperer', 'The Open-Source Toolsmith'). Provide a one-sentence justification.
            """
            
            model = genai.GenerativeModel('gemini-pro')
            response = model.generate_content(prompt)
            markdown_report = response.text
            html_report = markdown2.markdown(markdown_report) # Convert Markdown to HTML

            # 5. SEND RESPONSE
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'report': html_report}).encode())

        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': str(e)}).encode())
        
        return