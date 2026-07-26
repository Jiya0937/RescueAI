

# Load the OCR model only once
import easyocr
import numpy as np
from PIL import Image

reader = None

def get_reader():
    global reader
    if reader is None:
        print("Loading EasyOCR model...")
        reader = easyocr.Reader(["en"], gpu=False)
    return reader


def extract_text(image_file):
    image = Image.open(image_file).convert("RGB")
    image = np.array(image)

    ocr_reader = get_reader()

    results = ocr_reader.readtext(image)

    return "\n".join([r[1] for r in results])