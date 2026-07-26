from ultralytics import YOLO
from PIL import Image
import logging

logger = logging.getLogger(__name__)

model = None

def get_model():
    global model

    if model is None:
        logger.info("Loading YOLO model...")
        model = YOLO("app/models/yolo/yolov8n.pt")

    return model


def detect_objects(image_file):

    try:

        detector = get_model()

        image = Image.open(image_file)

        results = detector(image)

        detected_objects = []

        for result in results:
            for box in result.boxes:

                class_id = int(box.cls[0])

                confidence = float(box.conf[0])

                detected_objects.append({
                    "name": detector.names[class_id],
                    "confidence": round(confidence * 100, 2)
                })

        return detected_objects

    except Exception as e:
        logger.error(e)
        return []