from flask import Blueprint, request, jsonify
from models import db, Product

products_bp = Blueprint('products', __name__)

# GET all products
@products_bp.route('/', methods=['GET'])
def get_products():
    products = Product.query.all()
    output = []
    for p in products:
        output.append({
            "product_id": p.product_id,
            "name": p.name,
            "brand": p.brand,
            "category": p.category,
            "subcategory": p.subcategory,
            "price": float(p.price),
            "description": p.description,
            "image_url": p.image_url
        })
    return jsonify(output), 200


# GET product by ID
@products_bp.route('/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get_or_404(id)
    return jsonify({
        "product_id": product.product_id,
        "name": product.name,
        "brand": product.brand,
        "category": product.category,
        "subcategory": product.subcategory,
        "price": float(product.price),
        "description": product.description,
        "image_url": product.image_url
    }), 200


# ADD new product (CREATE)
@products_bp.route('/', methods=['POST'])
def add_product():
    data = request.get_json()
    new_product = Product(
        name=data['name'],
        brand=data.get('brand'),
        category=data['category'],
        subcategory=data.get('subcategory'),
        price=data['price'],
        description=data['description'],
        image_url=data['image_url']
    )
    db.session.add(new_product)
    db.session.commit()
    return jsonify({"message": "Product added successfully!"}), 201


# UPDATE product (PUT)
@products_bp.route('/<int:id>', methods=['PUT'])
def update_product(id):
    product = Product.query.get_or_404(id)
    data = request.get_json()

    product.name = data.get('name', product.name)
    product.brand = data.get('brand', product.brand)
    product.category = data.get('category', product.category)
    product.subcategory = data.get('subcategory', product.subcategory)
    product.price = data.get('price', product.price)
    product.description = data.get('description', product.description)
    product.image_url = data.get('image_url', product.image_url)

    db.session.commit()
    return jsonify({"message": "Product updated successfully!"}), 200


# DELETE product
@products_bp.route('/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Product deleted successfully!"}), 200
