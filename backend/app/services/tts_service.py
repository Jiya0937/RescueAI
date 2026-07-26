import os
import tempfile

# Check if TTS is enabled from environment
ENABLE_TTS = os.getenv("ENABLE_TTS", "True").lower() == "true"

try:
    if ENABLE_TTS:
        import pyttsx3

        engine = pyttsx3.init()
        engine.setProperty("rate", 170)
        engine.setProperty("volume", 1.0)
        TTS_AVAILABLE = True
    else:
        engine = None
        TTS_AVAILABLE = False

except Exception as e:
    print(f"TTS initialization failed: {e}")
    engine = None
    TTS_AVAILABLE = False


def text_to_speech(text: str):
    """
    Convert text to speech and save it as a WAV file.
    Returns a dictionary containing success status and result.
    """

    if not TTS_AVAILABLE:
        return {
            "success": False,
            "message": "Text-to-Speech is not available on this server.",
            "audio_path": None
        }

    try:
        temp_dir = tempfile.gettempdir()
        output_path = os.path.join(temp_dir, "rescueai_tts.wav")

        engine.save_to_file(text, output_path)
        engine.runAndWait()

        return {
            "success": True,
            "message": "Speech generated successfully.",
            "audio_path": output_path
        }

    except Exception as e:
        return {
            "success": False,
            "message": str(e),
            "audio_path": None
        }