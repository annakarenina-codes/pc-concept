from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from extensions import db


class Product(db.Model):
    __tablename__ = 'products'

    product_id = db.Column(db.String(10), primary_key=True)    
    name = db.Column(db.String(100), nullable=False)
    brand = db.Column(db.String(50))
    category = db.Column(db.String(50), nullable=False)
    subcategory = db.Column(db.String(50))
    price = db.Column(db.Numeric(10, 2), nullable=False)
    description = db.Column(db.Text)
    image_url = db.Column(db.String(255))

    # Add cascade deletes for relationships
    specifications = db.relationship('ProductSpecification', backref='product', cascade="all, delete-orphan")
    reviews = db.relationship('Review', backref='product', cascade="all, delete-orphan")


class ProductSpecification(db.Model):
    __tablename__ = 'product_specifications'

    spec_id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(
        db.String(10), 
        db.ForeignKey('products.product_id', ondelete='CASCADE', name='fk_spec_product'), 
        nullable=False
    )
    spec_name = db.Column(db.String(100), nullable=False)
    spec_value = db.Column(db.String(255), nullable=False)
    
    # Add unique constraint to prevent duplicate spec names per product
    __table_args__ = (
        db.UniqueConstraint('product_id', 'spec_name', name='uq_product_spec_name'),
    )


class Review(db.Model):
    __tablename__ = 'reviews'

    review_id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(
        db.String(10), 
        db.ForeignKey('products.product_id', ondelete='CASCADE', name='fk_review_product'), 
        nullable=False
    )
    user_alias = db.Column(db.String(50), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    review_text = db.Column(db.Text)
    category = db.Column(db.String(50), nullable=False)
    subcategory = db.Column(db.String(50))
    brand = db.Column(db.String(50))
    date_posted = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Add check constraint for rating
    __table_args__ = (
        db.CheckConstraint('rating >= 1 AND rating <= 5', name='check_rating_range'),
    )

    def __init__(self, product_id, user_alias, rating, review_text, category, subcategory=None, brand=None, date_posted=None):
        self.product_id = product_id
        self.user_alias = user_alias
        self.rating = rating
        self.review_text = review_text
        self.category = category
        self.date_posted = date_posted or datetime.utcnow()

        # Apply category-specific logic
        if category == 'Laptops':
            self.brand = brand
            self.subcategory = None
        elif category in ['Desktop/PCs', 'Components', 'Accessories']:
            self.subcategory = subcategory
            self.brand = None
        elif category == 'Speakers':
            self.brand = None
            self.subcategory = None
        else:
            self.brand = brand
            self.subcategory = subcategory


class Blog(db.Model):
    __tablename__ = 'blogs'
    
    blog_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    author = db.Column(db.String(100), nullable=False)
    sources = db.Column(db.Text)
    date_published = db.Column(db.Date, nullable=False)