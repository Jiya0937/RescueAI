from fastapi import APIRouter, UploadFile, File
from app.services.ocr_service import extract_text

router = APIRouter(prefix="/ocr", tags=["OCR"])


@router.post("/")
async def ocr_image(file: UploadFile = File(...)):
    text = extract_text(file.file)
    return {"text": text}