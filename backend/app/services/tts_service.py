import pyttsx3
import tempfile
import os

engine = pyttsx3.init()

# Optional: Adjust voice settings
engine.setProperty("rate", 170)
engine.setProperty("volume", 1.0)


def text_to_speech(text: str):
    """
    Convert text to speech and save it as a WAV file.
    Returns the path of the generated audio.
    """

    temp_dir = tempfile.gettempdir()

    output_path = os.path.join(temp_dir, "rescueai_tts.wav")

    engine.save_to_file(text, output_path)
    engine.runAndWait()

    return output_path