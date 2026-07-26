from fastapi import APIRouter, UploadFile, File
import os
import shutil
import tempfile

from app.services.speech_service import speech_to_text

router = APIRouter(
    prefix="/speech",
    tags=["Speech Recognition"]
)


@router.post("/")
async def recognize_speech(file: UploadFile = File(...)):
    """
    Convert uploaded speech (.wav) into text using the offline Vosk model.
    """

    temp_dir = tempfile.mkdtemp()

    audio_path = os.path.join(temp_dir, file.filename)

    with open(audio_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:

        text = speech_to_text(audio_path)

        return {
            "success": True,
            "text": text
        }

    except Exception as e:

        return {
            "success": False,
            "error": str(e)
        }

    finally:

        if os.path.exists(audio_path):
            os.remove(audio_path)

        if os.path.exists(temp_dir):
            os.rmdir(temp_dir)