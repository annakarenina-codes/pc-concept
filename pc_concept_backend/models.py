from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from extensions import db


class Product(db.Model):
    __tablename__ = 'products'

    product_id = db.Column(db.String(10), primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    brand = db.Column(db.String(50), nullable=True)
    category = db.Column(db.String(50), nullable=False)
    subcategory = db.Column(db.String(50), nullable=True)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)  # Already exists in your model!

    # Relationships with cascade deletes
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

    review_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    product_id = db.Column(
        db.String(10), 
        db.ForeignKey('products.product_id', ondelete='CASCADE', name='fk_review_product'), 
        nullable=False
    )
    user_alias = db.Column(db.String(50), nullable=False)
    review_text = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    subcategory = db.Column(db.String(50), nullable=True)
    brand = db.Column(db.String(50), nullable=True)
    date_posted = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)



class Blog(db.Model):
    __tablename__ = 'blogs'
    
    blog_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(255), nullable=False)
    introduction = db.Column(db.Text, nullable=False)
    body = db.Column(db.Text, nullable=False)
    conclusion = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(255), nullable=True)
    author = db.Column(db.String(100), nullable=False)
    date_published = db.Column(db.Date, nullable=False)
