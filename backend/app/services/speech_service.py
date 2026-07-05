from vosk import Model, KaldiRecognizer
import wave
import json
import os

# Path to the offline Vosk model
MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "..",
    "models",
    "vosk",
    "vosk-model-small-en-us-0.15"
)

model = Model(MODEL_PATH)


def speech_to_text(audio_path: str):
    """
    Convert a WAV audio file into text using the offline Vosk model.
    """

    wf = wave.open(audio_path, "rb")

    if wf.getnchannels() != 1:
        raise ValueError("Audio must be mono.")

    if wf.getsampwidth() != 2:
        raise ValueError("Audio must be 16-bit PCM.")

    if wf.getframerate() not in (8000, 16000, 44100):
        raise ValueError("Unsupported sample rate.")

    recognizer = KaldiRecognizer(model, wf.getframerate())

    final_text = ""

    while True:

        data = wf.readframes(4000)

        if len(data) == 0:
            break

        if recognizer.AcceptWaveform(data):

            result = json.loads(recognizer.Result())

            final_text += result.get("text", "") + " "

    result = json.loads(recognizer.FinalResult())

    final_text += result.get("text", "")

    wf.close()

    return final_text.strip()