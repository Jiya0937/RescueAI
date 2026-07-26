import os
import math
import time
import requests

# Indore city bounding box (approx)
MIN_LAT, MAX_LAT = 22.65, 22.78
MIN_LON, MAX_LON = 75.78, 75.92

MIN_ZOOM, MAX_ZOOM = 5, 16
OUTPUT_DIR = "tiles"

# OSM tile usage policy ke mutabik proper User-Agent aur rate limiting zaroori hai
HEADERS = {
    "User-Agent": "RescueAI-OfflineMapDemo/1.0 (contact: jiyadeshmukh389@gmail.com)"
}

def deg2num(lat_deg, lon_deg, zoom):
    lat_rad = math.radians(lat_deg)
    n = 2.0 ** zoom
    xtile = int((lon_deg + 180.0) / 360.0 * n)
    ytile = int((1.0 - math.asinh(math.tan(lat_rad)) / math.pi) / 2.0 * n)
    return xtile, ytile

def download_tile(z, x, y):
    url = f"https://tile.openstreetmap.org/{z}/{x}/{y}.png"
    folder = os.path.join(OUTPUT_DIR, str(z), str(x))
    os.makedirs(folder, exist_ok=True)
    path = os.path.join(folder, f"{y}.png")

    if os.path.exists(path):
        return  # already downloaded, skip

    try:
        response = requests.get(url, headers=HEADERS, timeout=10)
        if response.status_code == 200:
            with open(path, "wb") as f:
                f.write(response.content)
            print(f"Downloaded: z={z} x={x} y={y}")
        else:
            print(f"Failed ({response.status_code}): z={z} x={x} y={y}")
    except Exception as e:
        print(f"Error downloading z={z} x={x} y={y}: {e}")

    time.sleep(0.5)  # OSM policy: max ~2 requests/sec, rate-limit karna zaroori hai

def main():
    for zoom in range(MIN_ZOOM, MAX_ZOOM + 1):
        x_min, y_max = deg2num(MIN_LAT, MIN_LON, zoom)
        x_max, y_min = deg2num(MAX_LAT, MAX_LON, zoom)

        for x in range(min(x_min, x_max), max(x_min, x_max) + 1):
            for y in range(min(y_min, y_max), max(y_min, y_max) + 1):
                download_tile(zoom, x, y)

    print("All tiles downloaded!")

if __name__ == "__main__":
    main()