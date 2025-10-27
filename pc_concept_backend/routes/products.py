from flask import Blueprint, request, jsonify
from models import Product, ProductSpecification, Review
from sqlalchemy.exc import IntegrityError
from extensions import db

products_bp = Blueprint('products', __name__)

# Constants for validation
VALID_CATEGORIES = ['Laptops', 'Desktop/PCs', 'Components', 'Accessories', 'Speakers']
VALID_BRANDS = ['ACER', 'ASUS', 'LENOVO', 'NINGMEI']
VALID_SUBCATEGORIES = {
    'Desktop/PCs': ['PC Bundles', 'PC Monitors', 'System Units'],
    'Components': ['Cooling Systems', 'PC Cases'],
    'Accessories': ['Headset', 'Keyboard', 'Mouse']
}

# Server-side validation & sanitization
def validate_positive_int(value, default):
    """Validate and return positive integer or default"""
    try:
        v = int(value)
        return v if v > 0 else default
    except:
        return default

def validate_positive_number(value, field_name="value"):
    """Validate that a number is positive"""
    try:
        num = float(value)
        if num <= 0:
            return False, f"{field_name} must be a positive number"
        return True, num
    except (ValueError, TypeError):
        return False, f"{field_name} must be a valid number"

def serialize_product(product, include_specs=False, card_mode=False):
    """Serialize product to dictionary
    
    Args:
        product: Product model instance
        include_specs: Include product specifications (DEPRECATED - always include when card_mode=False)
        card_mode: Return minimal data for product cards (default: False)
    """
    if card_mode:
        # ✅ Minimal data for product cards: id, name, price, image_url only
        return {
            "product_id": product.product_id,
            "name": product.name,
            "price": float(product.price),
            "image_url": product.image_url
        }
    
    # ✅ FIXED: Full product data - ALWAYS include specifications when card_mode=False
    result = {
        "product_id": product.product_id,
        "name": product.name,
        "brand": product.brand,
        "category": product.category,
        "subcategory": product.subcategory,
        "price": float(product.price),
        "image_url": product.image_url,
        # ✅ ALWAYS include specifications for full product data
        "specifications": [
            {"spec_name": s.spec_name, "spec_value": s.spec_value}
            for s in product.specifications
        ] if product.specifications else []
    }
    
    return result

# GET all products (with pagination)
@products_bp.route('/', methods=['GET'])
def get_products():
    """Get all products with pagination"""
    page = validate_positive_int(request.args.get('page', 1), 1)
    per_page = validate_positive_int(request.args.get('per_page', 24), 24)
    per_page = min(per_page, 100)  # Max 100 items per page
    
    # ✅ REMOVED include_specs parameter - always included when card_mode=False
    card_mode = request.args.get('card_mode', 'false').lower() == 'true'
    
    paginated = Product.query.paginate(page=page, per_page=per_page, error_out=False)
    
    # ✅ FIXED: Simplified - specifications automatically included based on card_mode
    products = [serialize_product(p, card_mode=card_mode) for p in paginated.items]
    
    return jsonify({
        "products": products,
        "page": page,
        "per_page": per_page,
        "total": paginated.total,
        "pages": paginated.pages
    }), 200

# GET product by ID
@products_bp.route('/<string:product_id>', methods=['GET'])
def get_product(product_id):
    """Get a single product by ID with specifications"""
    product = Product.query.filter_by(product_id=product_id).first()
    
    if not product:
        return jsonify({'error': 'Product not found'}), 404
    
    # ✅ Always return full data with specifications for single product view
    result = serialize_product(product, card_mode=False)
    
    return jsonify(result), 200

# ADD new product (CREATE)
@products_bp.route('/', methods=['POST'])
def add_product():
    """Create a new product"""
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    # Validate required fields
    required_fields = ['product_id', 'name', 'category', 'price', 'image_url']
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    # Validate category
    category = data['category']
    if category not in VALID_CATEGORIES:
        return jsonify({'error': f'Invalid category. Must be one of: {VALID_CATEGORIES}'}), 400
    
    # Validate price
    is_valid, price_result = validate_positive_number(data['price'], 'Price')
    if not is_valid:
        return jsonify({'error': price_result}), 400
    
    # Get optional fields
    brand = data.get('brand')
    subcategory = data.get('subcategory')
    
    # Validate brand if provided
    if brand and brand not in VALID_BRANDS:
        return jsonify({'error': f'Invalid brand. Must be one of: {VALID_BRANDS}'}), 400
    
    # Validate subcategory if provided
    if subcategory:
        valid_subs = VALID_SUBCATEGORIES.get(category, [])
        if subcategory not in valid_subs:
            return jsonify({'error': f'Invalid subcategory for {category}. Must be one of: {valid_subs}'}), 400
    
    # Apply category-specific rules
    if category == 'Laptops':
        if not brand:
            return jsonify({'error': 'Laptops must have a brand'}), 400
        subcategory = None  # Laptops don't have subcategories
    
    elif category in ['Desktop/PCs', 'Components', 'Accessories']:
        if not subcategory:
            return jsonify({'error': f'{category} must have a subcategory'}), 400
        brand = None  # These categories don't use brands
    
    elif category == 'Speakers':
        subcategory = None
        brand = None
    
    # Check if product_id already exists
    existing = Product.query.filter_by(product_id=data['product_id']).first()
    if existing:
        return jsonify({'error': f'Product ID {data["product_id"]} already exists'}), 409
    
    try:
        new_product = Product(
            product_id=data['product_id'].strip(),
            name=data['name'].strip(),
            brand=brand,
            category=category,
            subcategory=subcategory,
            price=price_result,
            image_url=data['image_url'].strip()
        )
        
        db.session.add(new_product)
        db.session.commit()
        
        return jsonify({
            "message": "Product added successfully!",
            "product_id": new_product.product_id
        }), 201
    
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'error': 'Product ID already exists or constraint violation'}), 409
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Database error: {str(e)}'}), 500

# UPDATE product (PUT)
@products_bp.route('/<string:product_id>', methods=['PUT'])
def update_product(product_id):
    """Update an existing product"""
    product = Product.query.filter_by(product_id=product_id).first()
    
    if not product:
        return jsonify({'error': 'Product not found'}), 404
    
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    # Validate category if provided
    if 'category' in data:
        category = data['category']
        if category not in VALID_CATEGORIES:
            return jsonify({'error': f'Invalid category. Must be one of: {VALID_CATEGORIES}'}), 400
    else:
        category = product.category
    
    # Validate price if provided
    if 'price' in data:
        is_valid, price_result = validate_positive_number(data['price'], 'Price')
        if not is_valid:
            return jsonify({'error': price_result}), 400
    
    # Validate brand if provided
    if 'brand' in data and data['brand']:
        if data['brand'] not in VALID_BRANDS:
            return jsonify({'error': f'Invalid brand. Must be one of: {VALID_BRANDS}'}), 400
    
    # Validate subcategory if provided
    if 'subcategory' in data and data['subcategory']:
        valid_subs = VALID_SUBCATEGORIES.get(category, [])
        if data['subcategory'] not in valid_subs:
            return jsonify({'error': f'Invalid subcategory for {category}. Must be one of: {valid_subs}'}), 400
    
    # Apply category-specific rules
    brand = data.get('brand', product.brand)
    subcategory = data.get('subcategory', product.subcategory)
    
    if category == 'Laptops':
        subcategory = None
    elif category in ['Desktop/PCs', 'Components', 'Accessories']:
        brand = None
    elif category == 'Speakers':
        subcategory = None
        brand = None
    
    try:
        product.name = data.get('name', product.name).strip() if 'name' in data else product.name
        product.brand = brand
        product.category = category
        product.subcategory = subcategory
        product.price = data.get('price', product.price)
        product.image_url = data.get('image_url', product.image_url).strip() if 'image_url' in data else product.image_url
        
        db.session.commit()
        return jsonify({"message": "Product updated successfully!"}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Database error: {str(e)}'}), 500

# DELETE product
@products_bp.route('/<string:product_id>', methods=['DELETE'])
def delete_product(product_id):
    """Delete a product (checks for existing reviews)"""
    product = Product.query.filter_by(product_id=product_id).first()
    
    if not product:
        return jsonify({'error': 'Product not found'}), 404
    
    # Check if product has reviews
    review_count = Review.query.filter_by(product_id=product_id).count()
    if review_count > 0:
        return jsonify({
            'error': f'Cannot delete product. It has {review_count} review(s). Delete reviews first.'
        }), 409
    
    try:
        # Delete associated specifications first
        ProductSpecification.query.filter_by(product_id=product_id).delete()
        
        db.session.delete(product)
        db.session.commit()
        return jsonify({"message": "Product deleted successfully!"}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Database error: {str(e)}'}), 500

# ========== CATEGORY-BASED ENDPOINTS ==========

# GET products by category
@products_bp.route('/category/<string:category>', methods=['GET'])
def get_products_by_category(category):
    """Get products by category with pagination"""
    # Validate category
    if category not in VALID_CATEGORIES:
        return jsonify({'error': f'Invalid category. Must be one of: {VALID_CATEGORIES}'}), 400
    
    page = validate_positive_int(request.args.get('page', 1), 1)
    per_page = validate_positive_int(request.args.get('per_page', 24), 24)
    per_page = min(per_page, 100)
    
    card_mode = request.args.get('card_mode', 'false').lower() == 'true'
    
    q = Product.query.filter_by(category=category)
    pagination = q.paginate(page=page, per_page=per_page, error_out=False)
    
    products = [serialize_product(p, card_mode=card_mode) for p in pagination.items]
    
    return jsonify({
        "products": products,
        "page": page,
        "per_page": per_page,
        "total": pagination.total,
        "pages": pagination.pages,
        "category": category
    }), 200

# GET products by category and subcategory
@products_bp.route('/category/<string:category>/subcategory/<string:subcategory>', methods=['GET'])
def get_products_by_category_subcategory(category, subcategory):
    """Get products by category and subcategory"""
    # Validate category
    if category not in VALID_CATEGORIES:
        return jsonify({'error': f'Invalid category. Must be one of: {VALID_CATEGORIES}'}), 400
    
    # Validate subcategory
    valid_subs = VALID_SUBCATEGORIES.get(category, [])
    if not valid_subs:
        return jsonify({'error': f'{category} does not have subcategories'}), 400
    if subcategory not in valid_subs:
        return jsonify({'error': f'Invalid subcategory for {category}. Must be one of: {valid_subs}'}), 400
    
    page = validate_positive_int(request.args.get('page', 1), 1)
    per_page = validate_positive_int(request.args.get('per_page', 24), 24)
    per_page = min(per_page, 100)
    
    card_mode = request.args.get('card_mode', 'false').lower() == 'true'
    
    q = Product.query.filter_by(category=category, subcategory=subcategory)
    pagination = q.paginate(page=page, per_page=per_page, error_out=False)
    
    products = [serialize_product(p, card_mode=card_mode) for p in pagination.items]
    
    return jsonify({
        "products": products,
        "page": page,
        "per_page": per_page,
        "total": pagination.total,
        "pages": pagination.pages,
        "category": category,
        "subcategory": subcategory
    }), 200

# GET laptops by brand
@products_bp.route('/category/Laptops/brand/<string:brand>', methods=['GET'])
def get_laptops_by_brand(brand):
    """Get laptops by brand"""
    # Validate brand
    if brand not in VALID_BRANDS:
        return jsonify({'error': f'Invalid brand. Must be one of: {VALID_BRANDS}'}), 400
    
    page = validate_positive_int(request.args.get('page', 1), 1)
    per_page = validate_positive_int(request.args.get('per_page', 24), 24)
    per_page = min(per_page, 100)
    
    card_mode = request.args.get('card_mode', 'false').lower() == 'true'
    
    q = Product.query.filter_by(category='Laptops', brand=brand)
    pagination = q.paginate(page=page, per_page=per_page, error_out=False)
    
    products = [serialize_product(p, card_mode=card_mode) for p in pagination.items]
    
    return jsonify({
        "products": products,
        "page": page,
        "per_page": per_page,
        "total": pagination.total,
        "pages": pagination.pages,
        "category": "Laptops",
        "brand": brand
    }), 200

# ========== FILTER ENDPOINT ==========

# FILTER products by category, subcategory, or brand
@products_bp.route('/filter', methods=['GET'])
def filter_products():
    """Filter products by category, subcategory, or brand"""
    category = request.args.get('category')
    subcategory = request.args.get('subcategory')
    brand = request.args.get('brand')
    
    card_mode = request.args.get('card_mode', 'false').lower() == 'true'
    
    query = Product.query
    
    # Category filter
    if category:
        # Validate category
        if category not in VALID_CATEGORIES:
            return jsonify({"error": f"Invalid category. Must be one of: {VALID_CATEGORIES}"}), 400
        
        query = query.filter_by(category=category)
        
        # Category-specific filtering rules
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
    
    elif brand:
        # If no category specified but brand is, filter by brand (for Laptops only)
        if brand not in VALID_BRANDS:
            return jsonify({"error": f"Invalid brand. Must be one of: {VALID_BRANDS}"}), 400
        query = query.filter_by(brand=brand)
    
    products = query.all()
    
    if not products:
        return jsonify([]), 200  # Return empty array instead of 404
    
    # Convert to JSON
    results = [serialize_product(p, card_mode=card_mode) for p in products]
    
    return jsonify(results), 200

# ========== SEARCH ENDPOINT ==========

# ✅ FIXED: SEARCH products by name ONLY (not categories/brands)
@products_bp.route('/search', methods=['GET'])
def search_products():
    """Search products by product name only"""
    search_term = request.args.get('q', '').strip()
    
    if not search_term:
        return jsonify({'error': 'Search term is required (use ?q=search_term)'}), 400
    
    if len(search_term) < 2:
        return jsonify({'error': 'Search term must be at least 2 characters'}), 400
    
    page = validate_positive_int(request.args.get('page', 1), 1)
    per_page = validate_positive_int(request.args.get('per_page', 24), 24)
    per_page = min(per_page, 100)
    
    card_mode = request.args.get('card_mode', 'false').lower() == 'true'
    
    # ✅ SEARCH ONLY IN PRODUCT NAME (not brand, category, or subcategory)
    query = Product.query.filter(Product.name.ilike(f'%{search_term}%'))
    pagination = query.paginate(page=page, per_page=per_page, error_out=False)
    
    products = [serialize_product(p, card_mode=card_mode) for p in pagination.items]
    
    return jsonify({
        "products": products,
        "page": page,
        "per_page": per_page,
        "total": pagination.total,
        "pages": pagination.pages,
        "search_term": search_term
    }), 200
