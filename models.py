from app import db

class Product(db.Model):
    __tablename__ = 'products'
    product_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    brand = db.Column(db.String(100))
    category = db.Column(db.String(100), nullable=False)
    subcategory = db.Column(db.String(100))
    price = db.Column(db.Numeric(10,2), nullable=False)
    description = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.Text, nullable=False)

    specifications = db.relationship('ProductSpecification', backref='product', cascade="all, delete")
    reviews = db.relationship('Review', backref='product', cascade="all, delete")


class ProductSpecification(db.Model):
    __tablename__ = 'product_specifications'
    spec_id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.product_id'))
    spec_name = db.Column(db.String(255), nullable=False)
    spec_value = db.Column(db.String(255), nullable=False)


class Review(db.Model):
    __tablename__ = 'reviews'
    review_id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.product_id'))
    user_alias = db.Column(db.String(100), nullable=False)
    review_text = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, nullable=False)


class Blog(db.Model):
    __tablename__ = 'blogs'
    blog_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    author = db.Column(db.String(100), nullable=False)
    sources = db.Column(db.Text)
    date_published = db.Column(db.Date, nullable=False)
