from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os
import cloudinary
from extensions import db, migrate
from config import Config

# Load environment variables from .env file
load_dotenv()


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Initialize database and migrations
    db.init_app(app)
    migrate.init_app(app, db)
    
    # Configure CORS (allow frontend to access backend)
    CORS(app, resources={
     r"/*": {
        "origins": [
            "http://localhost:5173", 
            "http://localhost:3000",
            "http://127.0.0.1:5173",  # ✅ ADD THIS
            "http://127.0.0.1:3000"   # ✅ ADD THIS
        ],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"]
        }
    })
    
    # Configure Cloudinary
    cloudinary.config(
        cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
        api_key=os.getenv('CLOUDINARY_API_KEY'),
        api_secret=os.getenv('CLOUDINARY_API_SECRET'),
        secure=True  # Use HTTPS URLs
    )
    
    # Verify Cloudinary configuration on startup
    print("✅ Cloudinary configured:")
    print(f"   Cloud Name: {os.getenv('CLOUDINARY_CLOUD_NAME')}")
    print(f"   API Key: {os.getenv('CLOUDINARY_API_KEY')}")
    
    # Register blueprints (API routes) - ORIGINAL PREFIXES
    from routes.products import products_bp
    from routes.specifications import specs_bp
    from routes.reviews import reviews_bp
    from routes.blogs import blogs_bp
    
    app.register_blueprint(products_bp, url_prefix='/products')
    app.register_blueprint(specs_bp, url_prefix='/specs')
    app.register_blueprint(reviews_bp, url_prefix='/reviews')
    app.register_blueprint(blogs_bp, url_prefix='/blogs')
    
    # Root endpoint
    @app.route('/')
    def home():
        return {
            "message": "PC Concept Backend is running!",
            "version": "1.0.0",
            "endpoints": {
                "products": "/products",
                "specifications": "/specs",
                "reviews": "/reviews",
                "blogs": "/blogs"
            }
        }
    
    # Health check endpoint (useful for deployment)
    @app.route('/health')
    def health():
        return {"status": "healthy", "database": "connected"}, 200
    
    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000)
