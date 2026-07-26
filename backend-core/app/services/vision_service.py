from ultralytics import YOLO
from PIL import Image
import logging

logger = logging.getLogger(__name__)

# Load the model only once when the server starts
model = YOLO("app/models/yolo/yolov8n.pt")


def detect_objects(image_file):
    """
    Detect objects from an uploaded image using YOLOv8.
    """

    try:
        image = Image.open(image_file)

        results = model(image)

        detected_objects = []

        for result in results:
            for box in result.boxes:

                class_id = int(box.cls[0])
                confidence = float(box.conf[0])

                detected_objects.append({
                    "name": model.names[class_id],
                    "confidence": round(confidence * 100, 2)
                })

        return detected_objects

    except Exception as e:
        logger.error(f"Vision Detection Error: {e}")
        return []