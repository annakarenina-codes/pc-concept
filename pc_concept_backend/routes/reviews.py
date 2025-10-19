from flask import Blueprint, request, jsonify
from models import db, Review

reviews_bp = Blueprint('reviews', __name__)

# GET all reviews
@reviews_bp.route('/', methods=['GET'])
def get_reviews():
    reviews = Review.query.all()
    output = []
    for r in reviews:
        output.append({
            "review_id": r.review_id,
            "product_id": r.product_id,
            "user_alias": r.user_alias,
            "review_text": r.review_text,
            "rating": r.rating
        })
    return jsonify(output), 200


# ADD new review
@reviews_bp.route('/', methods=['POST'])
def add_review():
    data = request.get_json()
    new_review = Review(
        product_id=data['product_id'],
        user_alias=data['user_alias'],
        review_text=data['review_text'],
        rating=data['rating']
    )
    db.session.add(new_review)
    db.session.commit()
    return jsonify({"message": "Review added successfully!"}), 201


# UPDATE review (PUT)
@reviews_bp.route('/<int:id>', methods=['PUT'])
def update_review(id):
    review = Review.query.get_or_404(id)
    data = request.get_json()

    review.review_text = data.get('review_text', review.review_text)
    review.rating = data.get('rating', review.rating)

    db.session.commit()
    return jsonify({"message": "Review updated successfully!"}), 200


# DELETE review
@reviews_bp.route('/<int:id>', methods=['DELETE'])
def delete_review(id):
    review = Review.query.get_or_404(id)
    db.session.delete(review)
    db.session.commit()
    return jsonify({"message": "Review deleted successfully!"}), 200
