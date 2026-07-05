from fastapi import APIRouter, UploadFile, File
from app.services.vision_service import detect_objects

router = APIRouter(
    prefix="/vision",
    tags=["Object Detection"]
)


@router.post("/")
async def detect_image(file: UploadFile = File(...)):
    """
    Detect objects in an uploaded image.
    """

    objects = detect_objects(file.file)

    return {
        "success": True,
        "objects": objects
    }