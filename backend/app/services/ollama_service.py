import os
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

OLLAMA_API = os.getenv("OLLAMA_API_BASE", "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "qwen2.5:3b")


SYSTEM_PROMPT = """
You are RescueAI, an offline emergency assistant.

Rules:
1. Answer ONLY emergency, first aid, disaster, CPR, burns, fractures, bleeding, poisoning, snake bites, fire, earthquake, flood, and medical safety questions.

2. If the question is unrelated, reply exactly:
'I am RescueAI. I can only assist with emergency and first-aid related questions.'

3. Keep every answer under 120 words.

4. Use this format:

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

Never explain unnecessary details.
Never write long paragraphs.
Never invent medical advice.
"""


def ask_ollama(user_message: str, language: str = "en"):
    """
    Sends a message to the local Ollama server
    and returns the generated response.
    """
    system_prompt = SYSTEM_PROMPT
    if language.lower() in ("hi", "hindi"):
        system_prompt += "\nResponse MUST be written in Hindi (हिंदी) language."
    else:
        system_prompt += "\nResponse MUST be written in English language."

    payload = {
    "model": OLLAMA_MODEL,
    "messages": [
        {
            "role": "system",
            "content": system_prompt
        },
        {
            "role": "user",
            "content": user_message
        }
    ],
    "stream": False,
    "options": {
        "temperature": 0.2,
        "num_predict": 40
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
