from flask import Blueprint, request, jsonify
from models import ProductSpecification, Product
from sqlalchemy.exc import IntegrityError
from extensions import db

specs_bp = Blueprint('specs', __name__)


def validate_positive_int(value, default):
    """Validate and return positive integer or default"""
    try:
        v = int(value)
        return v if v > 0 else default
    except:
        return default


# GET all product specifications (with pagination)
@specs_bp.route('/', methods=['GET'])
def get_specs():
    """Get all specifications with pagination"""
    page = validate_positive_int(request.args.get('page', 1), 1)
    per_page = validate_positive_int(request.args.get('per_page', 50), 50)
    per_page = min(per_page, 200)  # Max 200 items per page
    
    paginated = ProductSpecification.query.paginate(page=page, per_page=per_page, error_out=False)
    
    output = []
    for s in paginated.items:
        output.append({
            "spec_id": s.spec_id,
            "product_id": s.product_id,
            "spec_name": s.spec_name,
            "spec_value": s.spec_value
        })
    
    return jsonify({
        "specifications": output,
        "page": page,
        "per_page": per_page,
        "total": paginated.total,
        "pages": paginated.pages
    }), 200


# GET specs by specification ID
@specs_bp.route('/<int:spec_id>', methods=['GET'])
def get_spec_by_id(spec_id):
    """Get a single specification by its ID"""
    spec = ProductSpecification.query.get(spec_id)
    if not spec:
        return jsonify({'error': 'Specification not found'}), 404

    result = {
        'spec_id': spec.spec_id,
        'product_id': spec.product_id,
        'spec_name': spec.spec_name,
        'spec_value': spec.spec_value
    }
    return jsonify(result), 200


# GET all specs for a specific product (MOST IMPORTANT ENDPOINT)
@specs_bp.route('/product/<string:product_id>', methods=['GET'])
def get_specs_by_product(product_id):
    """Get all specifications for a specific product"""
    # Check if product exists
    product = Product.query.filter_by(product_id=product_id).first()
    if not product:
        return jsonify({'error': 'Product not found'}), 404
    
    specs = ProductSpecification.query.filter_by(product_id=product_id).all()
    
    if not specs:
        return jsonify([]), 200  # Return empty array if no specs
    
    output = []
    for s in specs:
        output.append({
            "spec_id": s.spec_id,
            "product_id": s.product_id,
            "spec_name": s.spec_name,
            "spec_value": s.spec_value
        })
    
    return jsonify(output), 200


# ADD new specification(s)
@specs_bp.route('/', methods=['POST'])
def add_spec():
    """Create new specification(s) - supports single or bulk insert"""
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    # Check if the request is a list (bulk insert)
    if isinstance(data, list):
        if len(data) == 0:
            return jsonify({'error': 'Empty array provided'}), 400
        
        # Validate all items first
        errors = []
        for idx, item in enumerate(data):
            # Validate required fields
            if 'product_id' not in item or not item['product_id']:
                errors.append(f"Item {idx}: Missing product_id")
            if 'spec_name' not in item or not item['spec_name']:
                errors.append(f"Item {idx}: Missing spec_name")
            if 'spec_value' not in item or not item['spec_value']:
                errors.append(f"Item {idx}: Missing spec_value")
            
            # Validate product exists
            if 'product_id' in item:
                product = Product.query.filter_by(product_id=item['product_id']).first()
                if not product:
                    errors.append(f"Item {idx}: Product {item['product_id']} not found")
            
            # Validate spec_name and spec_value are not empty
            if 'spec_name' in item and len(str(item['spec_name']).strip()) == 0:
                errors.append(f"Item {idx}: spec_name cannot be empty")
            if 'spec_value' in item and len(str(item['spec_value']).strip()) == 0:
                errors.append(f"Item {idx}: spec_value cannot be empty")
        
        if errors:
            return jsonify({'error': 'Validation failed', 'details': errors}), 400
        
        try:
            specs = []
            for item in data:
                # Check for duplicate spec_name for the same product
                existing = ProductSpecification.query.filter_by(
                    product_id=item['product_id'],
                    spec_name=item['spec_name'].strip()
                ).first()
                
                if existing:
                    return jsonify({
                        'error': f"Specification '{item['spec_name']}' already exists for product {item['product_id']}"
                    }), 409
                
                spec = ProductSpecification(
                    product_id=item['product_id'],
                    spec_name=item['spec_name'].strip(),
                    spec_value=item['spec_value'].strip()
                )
                specs.append(spec)
            
            db.session.add_all(specs)
            db.session.commit()
            
            return jsonify({
                "message": f"{len(specs)} specification(s) added successfully!",
                "count": len(specs)
            }), 201
        
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': f'Database error: {str(e)}'}), 500
    
    # Otherwise handle a single insert
    # Validate required fields
    required_fields = ['product_id', 'spec_name', 'spec_value']
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    # Validate product exists
    product = Product.query.filter_by(product_id=data['product_id']).first()
    if not product:
        return jsonify({'error': 'Product not found'}), 404
    
    # Validate spec_name and spec_value are not empty strings
    spec_name = str(data['spec_name']).strip()
    spec_value = str(data['spec_value']).strip()
    
    if len(spec_name) == 0:
        return jsonify({'error': 'spec_name cannot be empty'}), 400
    if len(spec_value) == 0:
        return jsonify({'error': 'spec_value cannot be empty'}), 400
    
    # Check for duplicate spec_name for the same product
    existing = ProductSpecification.query.filter_by(
        product_id=data['product_id'],
        spec_name=spec_name
    ).first()
    
    if existing:
        return jsonify({
            'error': f"Specification '{spec_name}' already exists for product {data['product_id']}"
        }), 409
    
    try:
        new_spec = ProductSpecification(
            product_id=data['product_id'],
            spec_name=spec_name,
            spec_value=spec_value
        )
        
        db.session.add(new_spec)
        db.session.commit()
        
        return jsonify({
            "message": "Specification added successfully!",
            "spec_id": new_spec.spec_id
        }), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Database error: {str(e)}'}), 500


# UPDATE specification (PUT)
@specs_bp.route('/<int:spec_id>', methods=['PUT'])
def update_spec(spec_id):
    """Update an existing specification"""
    spec = ProductSpecification.query.get(spec_id)
    
    if not spec:
        return jsonify({'error': 'Specification not found'}), 404
    
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    # Validate spec_name if provided
    if 'spec_name' in data:
        spec_name = str(data['spec_name']).strip()
        if len(spec_name) == 0:
            return jsonify({'error': 'spec_name cannot be empty'}), 400
        
        # Check for duplicate spec_name for the same product (excluding current spec)
        existing = ProductSpecification.query.filter(
            ProductSpecification.product_id == spec.product_id,
            ProductSpecification.spec_name == spec_name,
            ProductSpecification.spec_id != spec_id
        ).first()
        
        if existing:
            return jsonify({
                'error': f"Specification '{spec_name}' already exists for this product"
            }), 409
    
    # Validate spec_value if provided
    if 'spec_value' in data:
        spec_value = str(data['spec_value']).strip()
        if len(spec_value) == 0:
            return jsonify({'error': 'spec_value cannot be empty'}), 400
    
    # Don't allow changing product_id
    if 'product_id' in data and data['product_id'] != spec.product_id:
        return jsonify({'error': 'Cannot change product_id. Delete and recreate the specification instead.'}), 400
    
    try:
        spec.spec_name = data.get('spec_name', spec.spec_name).strip() if 'spec_name' in data else spec.spec_name
        spec.spec_value = data.get('spec_value', spec.spec_value).strip() if 'spec_value' in data else spec.spec_value
        
        db.session.commit()
        return jsonify({"message": "Specification updated successfully!"}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Database error: {str(e)}'}), 500


# DELETE single specification
@specs_bp.route('/<int:spec_id>', methods=['DELETE'])
def delete_spec(spec_id):
    """Delete a single specification"""
    spec = ProductSpecification.query.get(spec_id)
    
    if not spec:
        return jsonify({'error': 'Specification not found'}), 404
    
    try:
        db.session.delete(spec)
        db.session.commit()
        return jsonify({"message": "Specification deleted successfully!"}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Database error: {str(e)}'}), 500


# DELETE all specifications for a product
@specs_bp.route('/product/<string:product_id>', methods=['DELETE'])
def delete_specs_by_product(product_id):
    """Delete all specifications for a specific product"""
    # Check if product exists
    product = Product.query.filter_by(product_id=product_id).first()
    if not product:
        return jsonify({'error': 'Product not found'}), 404
    
    try:
        deleted_count = ProductSpecification.query.filter_by(product_id=product_id).delete()
        db.session.commit()
        
        return jsonify({
            "message": f"{deleted_count} specification(s) deleted successfully!",
            "count": deleted_count
        }), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Database error: {str(e)}'}), 500