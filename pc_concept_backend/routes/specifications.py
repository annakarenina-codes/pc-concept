from flask import Blueprint, request, jsonify
from models import db, ProductSpecification

specs_bp = Blueprint('specs', __name__)

# GET all product specifications
@specs_bp.route('/', methods=['GET'])
def get_specs():
    specs = ProductSpecification.query.all()
    output = []
    for s in specs:
        output.append({
            "spec_id": s.spec_id,
            "product_id": s.product_id,
            "spec_name": s.spec_name,
            "spec_value": s.spec_value
        })
    return jsonify(output), 200


# ADD new specification
@specs_bp.route('/', methods=['POST'])
def add_spec():
    data = request.get_json()
    new_spec = ProductSpecification(
        product_id=data['product_id'],
        spec_name=data['spec_name'],
        spec_value=data['spec_value']
    )
    db.session.add(new_spec)
    db.session.commit()
    return jsonify({"message": "Specification added successfully!"}), 201


# UPDATE specification (PUT)
@specs_bp.route('/<int:id>', methods=['PUT'])
def update_spec(id):
    spec = ProductSpecification.query.get_or_404(id)
    data = request.get_json()

    spec.spec_name = data.get('spec_name', spec.spec_name)
    spec.spec_value = data.get('spec_value', spec.spec_value)

    db.session.commit()
    return jsonify({"message": "Specification updated successfully!"}), 200


# DELETE specification
@specs_bp.route('/<int:id>', methods=['DELETE'])
def delete_spec(id):
    spec = ProductSpecification.query.get_or_404(id)
    db.session.delete(spec)
    db.session.commit()
    return jsonify({"message": "Specification deleted successfully!"}), 200
