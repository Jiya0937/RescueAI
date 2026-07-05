import json
import os

# Path to the local emergency locations JSON file
DATA_PATH = os.path.join(
    os.path.dirname(__file__),
    "..",
    "database",
    "emergency_locations.json"
)


def get_locations():
    """
    Load emergency locations from the local JSON file.
    """
    try:
        with open(DATA_PATH, "r", encoding="utf-8") as file:
            return json.load(file)
    except Exception as e:
        print(f"Maps Error: {e}")
        return []