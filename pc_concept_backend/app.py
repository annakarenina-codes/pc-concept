from flask import Flask
from extensions import db, migrate
from config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    migrate.init_app(app, db)

    from routes.products import products_bp
    from routes.specifications import specs_bp
    from routes.reviews import reviews_bp
    from routes.blogs import blogs_bp

    app.register_blueprint(products_bp, url_prefix='/products')
    app.register_blueprint(specs_bp, url_prefix='/specs')
    app.register_blueprint(reviews_bp, url_prefix='/reviews')
    app.register_blueprint(blogs_bp, url_prefix='/blogs')

    @app.route('/')
    def home():
        return "PC Concept Backend is running!"

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)