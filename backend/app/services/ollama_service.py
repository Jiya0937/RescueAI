import os
import requests
from dotenv import load_dotenv

load_dotenv()

OLLAMA_API = os.getenv("OLLAMA_API_BASE", "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "qwen2.5:3b")
def ask_ollama(user_message: str, language: str = "en"):
    print(f"Language received: {language}")

    language = language.lower()

    system_prompt = """
You are RescueAI, an offline emergency first-aid assistant.

Your responsibilities:
- Answer ONLY emergency and first-aid related questions.
- Understand English, Hindi, Roman Hindi, Marathi, Roman Marathi, Kannada and Roman Kannada.
- Recognize spelling mistakes.
- If someone asks about snake bite, burns, CPR, bleeding, poisoning, fractures, heart attack, choking, fire, flood, earthquake or any emergency, immediately provide first-aid guidance.
- Never reject genuine emergency questions.
- Never invent medical facts.
- Keep answers under 120 words.
- Ignore minor spelling mistakes.
- Ignore capitalization.
- Ignore punctuation.
- Understand common abbreviations.
- Understand phonetic typing.
- If multiple interpretations are possible, choose the interpretation most related to an emergency.
- Never ask the user to rewrite an emergency question because of spelling mistakes.

Format every answer like this:

Step 1:
...

Step 2:
...

Step 3:
...

Emergency Number:
112 (India)

Warning:
This guidance does not replace professional medical care.
"""

    if language in ("hi", "hindi"):

        system_prompt += """

IMPORTANT:
- Reply ONLY in Hindi (हिन्दी).
- Never use English.
- Understand Hindi and Roman Hindi.
"""

        user_content = f"""
The following emergency question is written in Hindi or Roman Hindi.

Question:
{user_message}
"""

    elif language in ("mr", "marathi"):

        system_prompt += """

IMPORTANT:
- Reply ONLY in Marathi (मराठी).
- Never use English or Hindi.
- Understand Marathi and Roman Marathi.
"""

        user_content = f"""
The following emergency question is written in Marathi or Roman Marathi.

Question:
{user_message}
"""

    elif language in ("kn", "kannada", "kannadh"):

        system_prompt += """

IMPORTANT:
- Reply ONLY in Kannada (ಕನ್ನಡ).
- Never use English or Hindi.
- Understand Kannada and Roman Kannada.
"""

        user_content = f"""
The following emergency question is written in Kannada or Roman Kannada.

Question:
{user_message}
"""

    else:

        system_prompt += """

IMPORTANT:
- Reply ONLY in English.
"""

        user_content = user_message

    payload = {
        "model": OLLAMA_MODEL,
        "messages": [
            {
                "role": "system",
                "content": system_prompt
            },
            {
                "role": "user",
                "content": user_content
            }
        ],
        "stream": False,
        "options": {
            "temperature": 0.1,
            "num_predict": 200
        }
    }

    try:
        response = requests.post(
            f"{OLLAMA_API}/api/chat",
            json=payload,
            timeout=120
        )

        response.raise_for_status()

        data = response.json()

        return data["message"]["content"]

    except Exception as e:
        return f"Error communicating with Ollama: {str(e)}"