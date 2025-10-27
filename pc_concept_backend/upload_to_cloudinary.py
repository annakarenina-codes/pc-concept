#OPTIONAL ONLY (can be uploaded through this, or manually :)) 

import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv
import os

# Load credentials
load_dotenv()

cloudinary.config(
    cloud_name=os.getenv('dwtmr4wqt'),
    api_key=os.getenv('187429251816365'),
    api_secret=os.getenv('hdOmbVIXoR-LcSR0cG_3Pk8-hE0')
)

# Path to your local images folder
LOCAL_IMAGES_PATH = r"C:\Users\aquarius12\Documents\images"

# Categories to upload
categories = {
    'laptops': 'products/laptops',
    'desktops': 'products/desktops',
    'components': 'products/components',
    'accessories': 'products/accessories',
    'speakers': 'products/speakers',
    'blogs': 'blogs'
}

def upload_images(local_folder, cloudinary_folder):
    """Upload all images from local folder to Cloudinary folder"""
    folder_path = os.path.join(LOCAL_IMAGES_PATH, local_folder)
    
    if not os.path.exists(folder_path):
        print(f"❌ Folder not found: {folder_path}")
        return
    
    images = [f for f in os.listdir(folder_path) if f.endswith(('.jpg', '.jpeg', '.png'))]
    
    print(f"\n📁 Uploading {len(images)} images from {local_folder}...")
    
    for image_file in images:
        local_path = os.path.join(folder_path, image_file)
        public_id = os.path.splitext(image_file)[0]  # Remove extension
        
        try:
            result = cloudinary.uploader.upload(
                local_path,
                folder=cloudinary_folder,
                public_id=public_id,
                overwrite=True,
                resource_type="image"
            )
            print(f"  ✅ {image_file} → {result['secure_url']}")
        except Exception as e:
            print(f"  ❌ Failed to upload {image_file}: {str(e)}")

# Upload all categories
print("🚀 Starting Cloudinary upload...\n")

for local_folder, cloudinary_folder in categories.items():
    upload_images(local_folder, cloudinary_folder)

print("\n✅ Upload complete!")
