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


# GET Review by ID
@reviews_bp.route('/<int:review_id>', methods=['GET'])
def get_review_by_id(review_id):
    """Get a single review by its ID"""
    review = Review.query.get(review_id)
    if not review:
        return jsonify({'error': 'Review not found'}), 404

    result = {
        'review_id': review.review_id,
        'product_id': review.product_id,
        'user_alias': review.user_alias,
        'review_text': review.review_text,
        'rating': review.rating,
        'category': review.category,
        'subcategory': review.subcategory,
        'brand': review.brand,
        'date_posted': review.date_posted.strftime('%Y-%m-%d %H:%M:%S')
    }
    return jsonify(result), 200


# GET All Reviews (with pagination)
@reviews_bp.route('/', methods=['GET'])
def get_reviews():
    """Get all reviews with optional pagination"""
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)
    
    # Limit per_page to prevent excessive data retrieval
    per_page = min(per_page, 100)
    
    paginated_reviews = Review.query.paginate(page=page, per_page=per_page, error_out=False)
    
    output = []
    for r in paginated_reviews.items:
        output.append({
            "review_id": r.review_id,
            "product_id": r.product_id,
            "user_alias": r.user_alias,
            "review_text": r.review_text,
            "rating": r.rating,
            "category": r.category,
            "subcategory": r.subcategory,
            "brand": r.brand,
            "date_posted": r.date_posted.strftime('%Y-%m-%d %H:%M:%S')
        })
    
    return jsonify({
        'reviews': output,
        'total': paginated_reviews.total,
        'pages': paginated_reviews.pages,
        'current_page': paginated_reviews.page,
        'per_page': per_page
    }), 200


# GET Reviews by Product ID
@reviews_bp.route('/product/<int:product_id>', methods=['GET'])
def get_reviews_by_product(product_id):
    """Get all reviews for a specific product"""
    # Check if product exists
    product = Product.query.get(product_id)
    if not product:
        return jsonify({'error': 'Product not found'}), 404
    
    reviews = Review.query.filter_by(product_id=product_id).order_by(Review.date_posted.desc()).all()
    
    if not reviews:
        return jsonify([]), 200
    
    results = [{
        "review_id": r.review_id,
        "product_id": r.product_id,
        "user_alias": r.user_alias,
        "review_text": r.review_text,
        "rating": r.rating,
        "category": r.category,
        "subcategory": r.subcategory,
        "brand": r.brand,
        "date_posted": r.date_posted.strftime('%Y-%m-%d %H:%M:%S')
    } for r in reviews]
    
    return jsonify(results), 200


# FILTER Reviews
@reviews_bp.route('/filter', methods=['GET'])
def filter_reviews():
    """Filter reviews by category, subcategory, or brand"""
    category = request.args.get('category')
    subcategory = request.args.get('subcategory')
    brand = request.args.get('brand')

    query = Review.query

    if category:
        # Validate category
        if category not in VALID_CATEGORIES:
            return jsonify({"error": f"Invalid category. Must be one of: {VALID_CATEGORIES}"}), 400
        
        query = query.filter_by(category=category)

        if category == 'Laptops':
            if subcategory:
                return jsonify({"error": "Laptops cannot be filtered by subcategory"}), 400
            if brand:
                # Validate brand
                if brand not in VALID_BRANDS:
                    return jsonify({"error": f"Invalid brand. Must be one of: {VALID_BRANDS}"}), 400
                query = query.filter_by(brand=brand)

        elif category in ['Desktop/PCs', 'Components', 'Accessories']:
            if brand:
                return jsonify({"error": f"{category} cannot be filtered by brand"}), 400
            if subcategory:
                # Validate subcategory
                valid_subs = VALID_SUBCATEGORIES.get(category, [])
                if subcategory not in valid_subs:
                    return jsonify({"error": f"Invalid subcategory for {category}. Must be one of: {valid_subs}"}), 400
                query = query.filter_by(subcategory=subcategory)

        elif category == 'Speakers':
            if subcategory or brand:
                return jsonify({"error": "Speakers cannot be filtered by brand or subcategory"}), 400

    reviews = query.order_by(Review.date_posted.desc()).all()

    if not reviews:
        return jsonify([]), 200  # Return empty array instead of 404

    results = [{
        "review_id": r.review_id,
        "product_id": r.product_id,
        "user_alias": r.user_alias,
        "review_text": r.review_text,
        "rating": r.rating,
        "category": r.category,
        "subcategory": r.subcategory,
        "brand": r.brand,
        "date_posted": r.date_posted.strftime('%Y-%m-%d %H:%M:%S')
    } for r in reviews]

    return jsonify(results), 200


# ADD Review
@reviews_bp.route('/', methods=['POST'])
def add_review():
    """Create a new review"""
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    # Validate required fields
    required_fields = ['product_id', 'user_alias', 'rating', 'category']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    # Validate rating range
    rating = data['rating']
    if not isinstance(rating, (int, float)) or rating < 1 or rating > 5:
        return jsonify({'error': 'Rating must be a number between 1 and 5'}), 400
    
    # Validate category
    category = data.get('category')
    if category not in VALID_CATEGORIES:
        return jsonify({'error': f'Invalid category. Must be one of: {VALID_CATEGORIES}'}), 400
    
    # Check if product exists
    product = Product.query.get(data['product_id'])
    if not product:
        return jsonify({'error': 'Product not found'}), 404
    
    # Validate brand if provided
    brand = data.get('brand')
    if brand and brand not in VALID_BRANDS:
        return jsonify({'error': f'Invalid brand. Must be one of: {VALID_BRANDS}'}), 400
    
    # Validate subcategory if provided
    subcategory = data.get('subcategory')
    if subcategory:
        valid_subs = VALID_SUBCATEGORIES.get(category, [])
        if subcategory not in valid_subs:
            return jsonify({'error': f'Invalid subcategory for {category}. Must be one of: {valid_subs}'}), 400
    
    # Validate user_alias length
    user_alias = data['user_alias'].strip()
    if len(user_alias) < 2:
        return jsonify({'error': 'User alias must be at least 2 characters long'}), 400
    if len(user_alias) > 50:
        return jsonify({'error': 'User alias must not exceed 50 characters'}), 400

    # Apply category-specific rules
    if category == 'Laptops':
        subcategory = None
    elif category in ['Desktop/PCs', 'Components', 'Accessories']:
        brand = None
    elif category == 'Speakers':
        subcategory = None
        brand = None

    try:
        new_review = Review(
            product_id=data['product_id'],
            user_alias=user_alias,
            review_text=data.get('review_text', '').strip(),
            rating=rating,
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
    review = Review.query.get_or_404(review_id)
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    # Validate rating if provided
    if 'rating' in data:
        rating = data['rating']
        if not isinstance(rating, (int, float)) or rating < 1 or rating > 5:
            return jsonify({'error': 'Rating must be a number between 1 and 5'}), 400
    
    # Validate category if provided
    category = data.get('category', review.category)
    if category not in VALID_CATEGORIES:
        return jsonify({'error': f'Invalid category. Must be one of: {VALID_CATEGORIES}'}), 400
    
    # Validate brand if provided
    brand = data.get('brand')
    if brand and brand not in VALID_BRANDS:
        return jsonify({'error': f'Invalid brand. Must be one of: {VALID_BRANDS}'}), 400
    
    # Validate subcategory if provided
    subcategory = data.get('subcategory')
    if subcategory:
        valid_subs = VALID_SUBCATEGORIES.get(category, [])
        if subcategory not in valid_subs:
            return jsonify({'error': f'Invalid subcategory for {category}. Must be one of: {valid_subs}'}), 400
    
    # Validate user_alias if provided
    if 'user_alias' in data:
        user_alias = data['user_alias'].strip()
        if len(user_alias) < 2:
            return jsonify({'error': 'User alias must be at least 2 characters long'}), 400
        if len(user_alias) > 50:
            return jsonify({'error': 'User alias must not exceed 50 characters'}), 400

    # Apply category-specific rules
    if category == 'Laptops':
        subcategory = None
    elif category in ['Desktop/PCs', 'Components', 'Accessories']:
        brand = None
    elif category == 'Speakers':
        subcategory = None
        brand = None

    try:
        review.user_alias = data.get('user_alias', review.user_alias).strip()
        review.review_text = data.get('review_text', review.review_text).strip()
        review.rating = data.get('rating', review.rating)
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
    review = Review.query.get_or_404(review_id)
    
    try:
        db.session.delete(review)
        db.session.commit()
        return jsonify({"message": "Review deleted successfully!"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Database error: {str(e)}'}), 500