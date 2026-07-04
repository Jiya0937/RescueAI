import easyocr
import numpy as np
from PIL import Image

# Load the OCR model only once
reader = easyocr.Reader(['en'], gpu=False)


def extract_text(image_file):
    """
    Extract text from an uploaded image.
    """

    image = Image.open(image_file).convert("RGB")
    image = np.array(image)

    results = reader.readtext(image)

    extracted_text = "\n".join([result[1] for result in results])

    return extracted_text