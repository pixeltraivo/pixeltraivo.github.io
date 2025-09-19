from PIL import Image
import os

# Input & output folders
input_dir = "assets/thumbnails"
output_dir = "assets/thumbnails_resized"
os.makedirs(output_dir, exist_ok=True)

# Resize dimensions
size = (480, 270)

# Process images 01.jpg to 11.jpg
for i in range(1, 12):
    file_name = f"{i:02d}.jpg"
    input_path = os.path.join(input_dir, file_name)
    output_path = os.path.join(output_dir, file_name)

    if os.path.exists(input_path):
        with Image.open(input_path) as img:
            img = img.resize(size, Image.Resampling.LANCZOS)
            img.save(output_path, "JPEG", quality=80, optimize=True)
            print(f"Resized: {file_name} → {output_path}")
    else:
        print(f"⚠️ File not found: {input_path}")

print("\n✅ All thumbnails resized successfully!")
