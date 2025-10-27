from flask import Blueprint, request, jsonify
from models import Review, Product
from datetime import datetime
from extensions import db

reviews_bp = Blueprint('reviews', __name__)

# Constants for validation
VALID_CATEGORIES = ['Laptops', 'Desktop/PCs', 'Components', 'Accessories', 'Speakers']
VALID_BRANDS = ['ACER', 'ASUS', 'LENOVO', 'NINGMEI']
VALID_SUBCATEGORIES = {
    'Desktop/PCs': ['PC Bundles', 'PC Monitors', 'System Units'],
    'Components': ['Cooling Systems', 'PC Cases'],
    'Accessories': ['Headset', 'Keyboard', 'Mouse']
}

def validate_positive_int(value, default):
    """Validate and return positive integer or default"""
    try:
        v = int(value)
        return v if v > 0 else default
    except:
        return default

def serialize_review(review, include_product_name=False):
    """Serialize review to dictionary"""
    result = {
        "review_id": review.review_id,
        "product_id": review.product_id,
        "user_alias": review.user_alias,
        "review_text": review.review_text,
        "category": review.category,
        "subcategory": review.subcategory,
        "brand": review.brand,
        "date_posted": review.date_posted.strftime('%Y-%m-%d %H:%M:%S')
    }
    if include_product_name:
        # Fetch product name via relationship
        product = Product.query.filter_by(product_id=review.product_id).first()
        result["product_name"] = product.name if product else None
    return result

# GET All Reviews (with pagination)
@reviews_bp.route('/', methods=['GET'])
def get_reviews():
    """Get all reviews with optional pagination"""
    page = validate_positive_int(request.args.get('page', 1), 1)
    per_page = validate_positive_int(request.args.get('per_page', 20), 20)
    per_page = min(per_page, 100)  # Max 100 items per page
    include_product_name = request.args.get('include_product_name', 'false').lower() == 'true'

    paginated = Review.query.order_by(Review.date_posted.desc()).paginate(
        page=page, per_page=per_page, error_out=False
    )
    reviews = [serialize_review(r, include_product_name) for r in paginated.items]
    return jsonify({
        "reviews": reviews,
        "page": page,
        "per_page": per_page,
        "total": paginated.total,
        "pages": paginated.pages
    }), 200

# GET Review by ID
@reviews_bp.route('/<int:review_id>', methods=['GET'])
def get_review_by_id(review_id):
    """Get a single review by its ID"""
    review = Review.query.get(review_id)
    if not review:
        return jsonify({'error': 'Review not found'}), 404
    result = serialize_review(review, include_product_name=True)
    return jsonify(result), 200

# GET Reviews by Product ID
@reviews_bp.route('/product/<string:product_id>', methods=['GET'])
def get_reviews_by_product(product_id):
    """Get all reviews for a specific product"""
    product = Product.query.filter_by(product_id=product_id).first()
    if not product:
        return jsonify({'error': 'Product not found'}), 404
    page = validate_positive_int(request.args.get('page', 1), 1)
    per_page = validate_positive_int(request.args.get('per_page', 20), 20)
    per_page = min(per_page, 100)
    include_product_name = request.args.get('include_product_name', 'false').lower() == 'true'
    query = Review.query.filter_by(product_id=product_id).order_by(Review.date_posted.desc())
    paginated = query.paginate(page=page, per_page=per_page, error_out=False)
    reviews = [serialize_review(r, include_product_name) for r in paginated.items]
    return jsonify({
        "reviews": reviews,
        "page": page,
        "per_page": per_page,
        "total": paginated.total,
        "pages": paginated.pages,
        "product_id": product_id,
        "product_name": product.name
    }), 200

# FILTER Reviews by Category, Subcategory, or Brand
@reviews_bp.route('/filter', methods=['GET'])
def filter_reviews():
    """Filter reviews by category, subcategory, or brand"""
    category = request.args.get('category')
    subcategory = request.args.get('subcategory')
    brand = request.args.get('brand')
    page = validate_positive_int(request.args.get('page', 1), 1)
    per_page = validate_positive_int(request.args.get('per_page', 20), 20)
    per_page = min(per_page, 100)
    include_product_name = request.args.get('include_product_name', 'false').lower() == 'true'
    query = Review.query

    # Category filter
    if category:
        if category not in VALID_CATEGORIES:
            return jsonify({"error": f"Invalid category. Must be one of: {VALID_CATEGORIES}"}), 400
        query = query.filter_by(category=category)
        # Category-specific filtering rules
        if category == 'Laptops':
            if subcategory:
                return jsonify({"error": "Laptops cannot be filtered by subcategory"}), 400
            if brand:
                if brand.upper() not in VALID_BRANDS:
                    return jsonify({"error": f"Invalid brand. Must be one of: {VALID_BRANDS}"}), 400
                query = query.filter_by(brand=brand.upper())
        elif category in ['Desktop/PCs', 'Components', 'Accessories']:
            if brand:
                return jsonify({"error": f"{category} cannot be filtered by brand"}), 400
            if subcategory:
                valid_subs = VALID_SUBCATEGORIES.get(category, [])
                if subcategory not in valid_subs:
                    return jsonify({"error": f"Invalid subcategory for {category}. Must be one of: {valid_subs}"}), 400
                query = query.filter_by(subcategory=subcategory)
        elif category == 'Speakers':
            if subcategory or brand:
                return jsonify({"error": "Speakers cannot be filtered by brand or subcategory"}), 400
    elif brand:
        if brand.upper() not in VALID_BRANDS:
            return jsonify({"error": f"Invalid brand. Must be one of: {VALID_BRANDS}"}), 400
        query = query.filter_by(brand=brand.upper())

    query = query.order_by(Review.date_posted.desc())
    paginated = query.paginate(page=page, per_page=per_page, error_out=False)
    reviews = [serialize_review(r, include_product_name) for r in paginated.items]
    return jsonify({
        "reviews": reviews,
        "page": page,
        "per_page": per_page,
        "total": paginated.total,
        "pages": paginated.pages
    }), 200

# ADD Review
@reviews_bp.route('/', methods=['POST'])
def add_review():
    """Create a new review"""
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    required_fields = ['product_id', 'user_alias', 'review_text', 'category']
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({'error': f'Missing required field: {field}'}), 400

    category = data['category']
    if category not in VALID_CATEGORIES:
        return jsonify({'error': f'Invalid category. Must be one of: {VALID_CATEGORIES}'}), 400

    product = Product.query.filter_by(product_id=data['product_id']).first()
    if not product:
        return jsonify({'error': 'Product not found'}), 404

    # Case-insensitive brand check and store as uppercase
    brand = data.get('brand')
    if brand and brand.upper() not in VALID_BRANDS:
        return jsonify({'error': f'Invalid brand. Must be one of: {VALID_BRANDS}'}), 400
    brand = brand.upper() if brand else None

    subcategory = data.get('subcategory')
    if subcategory:
        valid_subs = VALID_SUBCATEGORIES.get(category, [])
        if subcategory not in valid_subs:
            return jsonify({'error': f'Invalid subcategory for {category}. Must be one of: {valid_subs}'}), 400

    user_alias = data['user_alias'].strip()
    if len(user_alias) < 2:
        return jsonify({'error': 'User alias must be at least 2 characters long'}), 400
    if len(user_alias) > 50:
        return jsonify({'error': 'User alias must not exceed 50 characters'}), 400

    review_text = data['review_text'].strip()
    if len(review_text) < 10:
        return jsonify({'error': 'Review text must be at least 10 characters long'}), 400

    if category == 'Laptops':
        if not brand:
            return jsonify({'error': 'Laptops must have a brand'}), 400
        subcategory = None
    elif category in ['Desktop/PCs', 'Components', 'Accessories']:
        if not subcategory:
            return jsonify({'error': f'{category} must have a subcategory'}), 400
        brand = None
    elif category == 'Speakers':
        subcategory = None
        brand = None

    try:
        new_review = Review(
            product_id=data['product_id'],
            user_alias=user_alias,
            review_text=review_text,
            category=category,
            subcategory=subcategory,
            brand=brand,
            date_posted=datetime.utcnow()
        )
        db.session.add(new_review)
        db.session.commit()
        return jsonify({
            "message": "Review added successfully!",
            "review_id": new_review.review_id
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Database error: {str(e)}'}), 500

# UPDATE Review
@reviews_bp.route('/<int:review_id>', methods=['PUT'])
def update_review(review_id):
    """Update an existing review"""
    review = Review.query.get(review_id)
    if not review:
        return jsonify({'error': 'Review not found'}), 404
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    category = data.get('category', review.category)
    if category not in VALID_CATEGORIES:
        return jsonify({'error': f'Invalid category. Must be one of: {VALID_CATEGORIES}'}), 400

    # Case-insensitive update for brand
    brand = data.get('brand')
    if brand and brand.upper() not in VALID_BRANDS:
        return jsonify({'error': f'Invalid brand. Must be one of: {VALID_BRANDS}'}), 400
    if brand:
        brand = brand.upper()

    subcategory = data.get('subcategory')
    if subcategory:
        valid_subs = VALID_SUBCATEGORIES.get(category, [])
        if subcategory not in valid_subs:
            return jsonify({'error': f'Invalid subcategory for {category}. Must be one of: {valid_subs}'}), 400

    if 'user_alias' in data:
        user_alias = data['user_alias'].strip()
        if len(user_alias) < 2:
            return jsonify({'error': 'User alias must be at least 2 characters long'}), 400
        if len(user_alias) > 50:
            return jsonify({'error': 'User alias must not exceed 50 characters'}), 400

    if 'review_text' in data:
        review_text = data['review_text'].strip()
        if len(review_text) < 10:
            return jsonify({'error': 'Review text must be at least 10 characters long'}), 400

    if category == 'Laptops':
        subcategory = None
    elif category in ['Desktop/PCs', 'Components', 'Accessories']:
        brand = None
    elif category == 'Speakers':
        subcategory = None
        brand = None

    try:
        review.user_alias = data.get('user_alias', review.user_alias).strip() if 'user_alias' in data else review.user_alias
        review.review_text = data.get('review_text', review.review_text).strip() if 'review_text' in data else review.review_text
        review.category = category
        review.subcategory = subcategory
        review.brand = brand
        db.session.commit()
        return jsonify({"message": "Review updated successfully!"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Database error: {str(e)}'}), 500

# DELETE Review
@reviews_bp.route('/<int:review_id>', methods=['DELETE'])
def delete_review(review_id):
    """Delete a review"""
    review = Review.query.get(review_id)
    if not review:
        return jsonify({'error': 'Review not found'}), 404
    try:
        db.session.delete(review)
        db.session.commit()
        return jsonify({"message": "Review deleted successfully!"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Database error: {str(e)}'}), 500
