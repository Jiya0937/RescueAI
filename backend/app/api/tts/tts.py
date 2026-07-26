from fastapi import APIRouter
from fastapi.responses import FileResponse
from pydantic import BaseModel

from app.services.tts_service import text_to_speech

router = APIRouter(
    prefix="/tts",
    tags=["Text To Speech"]
)


class TTSRequest(BaseModel):
    text: str


@router.post("/")
async def generate_speech(request: TTSRequest):

    audio_path = text_to_speech(request.text)

    return FileResponse(
        audio_path,
        media_type="audio/wav",
        filename="speech.wav"
    )