# api/index.py
from http.server import BaseHTTPRequestHandler
import os
import requests
import json
import google.generativeai as genai
import markdown2
from urllib.parse import urlparse, parse_qs

class handler(BaseHTTPRequestHandler):

    # --- Soporte para OPTIONS (preflight CORS) ---
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_GET(self):
        # --- DEBUG LOG: request path ---
        print("Incoming request path:", self.path)

        # --- 1. PARSE REQUEST AND GET USERNAME & LANGUAGE ---
        parsed_path = urlparse(self.path)
        query_params = parse_qs(parsed_path.query)
        username = query_params.get('username', [None])[0]
        lang = query_params.get('lang', ['en'])[0]  # default 'en'

        print(f"Parsed username={username}, lang={lang}")

        if not username:
            self.send_response(400)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()
            self.wfile.write(json.dumps({'error': 'Username is required'}).encode())
            return

        try:
            # --- 2. GATHER DATA FROM GITHUB API ---
            print(f"Fetching data for {username} from GitHub...")
            headers = {}
            github_token = os.environ.get("GITHUB_TOKEN")
            if github_token:
                headers['Authorization'] = f'token {github_token}'

            user_res = requests.get(f"https://api.github.com/users/{username}", headers=headers, timeout=15)
            user_res.raise_for_status()
            user_data = user_res.json()

            repos_res = requests.get(f"{user_data['repos_url']}?sort=pushed&per_page=10", headers=headers, timeout=15)
            repos_res.raise_for_status()
            repos_data = repos_res.json()

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

            clean_data_for_ai = {k: v for k, v in profile_summary.items() if v}

            # --- 3. LOAD PROMPT BASED ON LANGUAGE ---
            prompt_dir = os.path.join(os.path.dirname(__file__), "prompts")
            prompt_path = os.path.join(prompt_dir, f"{lang}.txt")
            print(f"Trying prompt path: {prompt_path}")

            if not os.path.isfile(prompt_path):
                fallback = os.path.join(prompt_dir, "default.txt")
                print(f"Prompt file not found for lang='{lang}', falling back to: {fallback}")
                prompt_path = fallback

            with open(prompt_path, "r", encoding="utf-8") as f:
                template_prompt = f.read()

            user_prompt = template_prompt.replace("{{data}}", json.dumps(clean_data_for_ai, indent=2))

            # --- 4. SEND TO GEMINI ---
            print("Sending data to Google Gemini...")
            gemini_api_key = os.environ.get("GOOGLE_API_KEY")
            if not gemini_api_key:
                print("WARNING: GOOGLE_API_KEY not set — returning mock response.")
                markdown_report = f"### 📊 Overall Summary\nMock response (no GOOGLE_API_KEY) for {username} (lang={lang})."
            else:
                genai.configure(api_key=gemini_api_key)
                model = genai.GenerativeModel('gemini-2.5-flash')
                response = model.generate_content(user_prompt)
                markdown_report = response.text

            if not markdown_report or not markdown_report.strip():
                raise ValueError("The AI returned an empty response.")

            html_report = markdown2.markdown(markdown_report)

            response_data = {
                "report_html": html_report,
                "report_md": markdown_report
            }

            # --- 5. SEND SUCCESS RESPONSE WITH CORS ---
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()
            self.wfile.write(json.dumps(response_data).encode())

        except Exception as e:
            print(f"ERROR during execution: {e}", flush=True)
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()
            self.wfile.write(json.dumps({'error': f'An internal server error occurred: {e}'}).encode())
