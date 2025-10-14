from flask import Blueprint, request, jsonify
from models import db, Blog

blogs_bp = Blueprint('blogs', __name__)

# GET all blogs
@blogs_bp.route('/', methods=['GET'])
def get_blogs():
    blogs = Blog.query.all()
    output = []
    for b in blogs:
        output.append({
            "blog_id": b.blog_id,
            "title": b.title,
            "content": b.content,
            "author": b.author,
            "sources": b.sources,
            "date_published": b.date_published.strftime("%Y-%m-%d")
        })
    return jsonify(output), 200


# ADD new blog
@blogs_bp.route('/', methods=['POST'])
def add_blog():
    data = request.get_json()
    new_blog = Blog(
        title=data['title'],
        content=data['content'],
        author=data['author'],
        sources=data.get('sources'),
        date_published=data['date_published']
    )
    db.session.add(new_blog)
    db.session.commit()
    return jsonify({"message": "Blog added successfully!"}), 201


# UPDATE blog (PUT)
@blogs_bp.route('/<int:id>', methods=['PUT'])
def update_blog(id):
    blog = Blog.query.get_or_404(id)
    data = request.get_json()

    blog.title = data.get('title', blog.title)
    blog.content = data.get('content', blog.content)
    blog.author = data.get('author', blog.author)
    blog.sources = data.get('sources', blog.sources)
    blog.date_published = data.get('date_published', blog.date_published)

    db.session.commit()
    return jsonify({"message": "Blog updated successfully!"}), 200


# DELETE blog
@blogs_bp.route('/<int:id>', methods=['DELETE'])
def delete_blog(id):
    blog = Blog.query.get_or_404(id)
    db.session.delete(blog)
    db.session.commit()
    return jsonify({"message": "Blog deleted successfully!"}), 200
