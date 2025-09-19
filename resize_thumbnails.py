from PIL import Image
import os

# Input folder
input_folder = 'assets/images'
# Output folder (you can overwrite if needed)
output_folder = os.path.join(input_folder, 'resized')
os.makedirs(output_folder, exist_ok=True)

# Images to process and target widths
images = {
    'Logo.png': 256,             # Keep size same but convert to WebP
    'your-profile-pic.webp': 400 # Resize width to 400px
}

for img_name, target_width in images.items():
    img_path = os.path.join(input_folder, img_name)
    
    # Open image
    with Image.open(img_path) as img:
        # Calculate height to maintain aspect ratio
        ratio = target_width / img.width
        target_height = int(img.height * ratio)
        
        # Determine new filename
        if img_name.lower().endswith('.png'):
            new_name = img_name.replace('.png', '.webp')
        else:
            new_name = img_name

        save_path = os.path.join(output_folder, new_name)

        # Resize and convert
        img.convert('RGB').resize((target_width, target_height), Image.LANCZOS).save(save_path, 'WEBP', quality=85)
        print(f"{img_name} → resized and saved as {save_path}")