from PIL import Image
import os

folder = "assets/images"
for img_name in os.listdir(folder):
    if img_name.lower().endswith(('.png', '.webp', '.jpg', '.jpeg')):
        path = os.path.join(folder, img_name)
        with Image.open(path) as img:
            print(f"{img_name} -> {img.size} px, DPI: {img.info.get('dpi', 'unknown')}")