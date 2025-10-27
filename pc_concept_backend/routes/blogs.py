from flask import Blueprint, request, jsonify
from models import Blog
from datetime import datetime
from extensions import db

blogs_bp = Blueprint('blogs', __name__)

def validate_positive_int(value, default):
    """Validate and return positive integer or default"""
    try:
        v = int(value)
        return v if v > 0 else default
    except:
        return default

def validate_date(date_string):
    """Validate date string in YYYY-MM-DD format"""
    if not date_string:
        return False, "Date is required"
    
    try:
        parsed_date = datetime.strptime(date_string, '%Y-%m-%d').date()
        return True, parsed_date
    except ValueError:
        return False, "Invalid date format. Use YYYY-MM-DD"

def serialize_blog(blog, include_full_content=True):
    """Serialize blog to dictionary"""
    result = {
        "blog_id": blog.blog_id,
        "title": blog.title,
        "author": blog.author,
        "date_published": blog.date_published.strftime("%Y-%m-%d"),
        "image_url": blog.image_url,
        "introduction": blog.introduction
    }
    
    if include_full_content:
        result["body"] = blog.body
        result["conclusion"] = blog.conclusion
    
    # ❌ REMOVED: sources references
    return result

@blogs_bp.route('/', methods=['GET'])
def get_blogs():
    """Get all blogs with pagination"""
    page = validate_positive_int(request.args.get('page', 1), 1)
    per_page = validate_positive_int(request.args.get('per_page', 10), 10)
    per_page = min(per_page, 50)
    
    full_content = request.args.get('full_content', 'false').lower() == 'true'
    
    query = Blog.query.order_by(Blog.date_published.desc())
    paginated = query.paginate(page=page, per_page=per_page, error_out=False)
    
    output = []
    for b in paginated.items:
        output.append(serialize_blog(b, include_full_content=full_content))
    
    return jsonify({
        "blogs": output,
        "page": page,
        "per_page": per_page,
        "total": paginated.total,
        "pages": paginated.pages
    }), 200

@blogs_bp.route('/latest', methods=['GET'])
def get_latest_blogs():
    """Get the most recent blogs (default 5)"""
    limit = validate_positive_int(request.args.get('limit', 5), 5)
    limit = min(limit, 20)
    
    blogs = Blog.query.order_by(Blog.date_published.desc()).limit(limit).all()
    
    output = []
    for b in blogs:
        output.append(serialize_blog(b, include_full_content=False))
    
    return jsonify(output), 200

@blogs_bp.route('/<int:blog_id>', methods=['GET'])
def get_blog_by_id(blog_id):
    """Get a single blog by ID with full content"""
    blog = Blog.query.get(blog_id)
    if not blog:
        return jsonify({'error': 'Blog not found'}), 404

    result = serialize_blog(blog, include_full_content=True)
    return jsonify(result), 200

@blogs_bp.route('/search', methods=['GET'])
def search_blogs():
    """Search blogs by title or content keywords"""
    search_term = request.args.get('q', '').strip()
    
    if not search_term:
        return jsonify({'error': 'Search term is required (use ?q=search_term)'}), 400
    
    if len(search_term) < 2:
        return jsonify({'error': 'Search term must be at least 2 characters'}), 400
    
    page = validate_positive_int(request.args.get('page', 1), 1)
    per_page = validate_positive_int(request.args.get('per_page', 10), 10)
    per_page = min(per_page, 50)
    
    query = Blog.query.filter(
        db.or_(
            Blog.title.ilike(f'%{search_term}%'),
            Blog.introduction.ilike(f'%{search_term}%'),
            Blog.body.ilike(f'%{search_term}%'),
            Blog.conclusion.ilike(f'%{search_term}%')
        )
    ).order_by(Blog.date_published.desc())
    
    paginated = query.paginate(page=page, per_page=per_page, error_out=False)
    
    output = []
    for b in paginated.items:
        output.append(serialize_blog(b, include_full_content=False))
    
    return jsonify({
        "blogs": output,
        "page": page,
        "per_page": per_page,
        "total": paginated.total,
        "pages": paginated.pages,
        "search_term": search_term
    }), 200

@blogs_bp.route('/author/<string:author>', methods=['GET'])
def get_blogs_by_author(author):
    """Get all blogs by a specific author"""
    page = validate_positive_int(request.args.get('page', 1), 1)
    per_page = validate_positive_int(request.args.get('per_page', 10), 10)
    per_page = min(per_page, 50)
    
    query = Blog.query.filter_by(author=author).order_by(Blog.date_published.desc())
    paginated = query.paginate(page=page, per_page=per_page, error_out=False)
    
    output = []
    for b in paginated.items:
        output.append(serialize_blog(b, include_full_content=False))
    
    return jsonify({
        "blogs": output,
        "page": page,
        "per_page": per_page,
        "total": paginated.total,
        "pages": paginated.pages,
        "author": author
    }), 200

@blogs_bp.route('/', methods=['POST'])
def add_blog():
    """Create a new blog post"""
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    required_fields = ['title', 'introduction', 'body', 'conclusion', 'author', 'image_url']
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    title = str(data['title']).strip()
    introduction = str(data['introduction']).strip()
    body = str(data['body']).strip()
    conclusion = str(data['conclusion']).strip()
    author = str(data['author']).strip()
    image_url = str(data['image_url']).strip()
    
    if len(title) == 0:
        return jsonify({'error': 'Title cannot be empty'}), 400
    if len(introduction) == 0:
        return jsonify({'error': 'Introduction cannot be empty'}), 400
    if len(body) == 0:
        return jsonify({'error': 'Body cannot be empty'}), 400
    if len(conclusion) == 0:
        return jsonify({'error': 'Conclusion cannot be empty'}), 400
    if len(author) == 0:
        return jsonify({'error': 'Author cannot be empty'}), 400
    if len(image_url) == 0:
        return jsonify({'error': 'Image URL cannot be empty'}), 400
    
    if len(title) > 200:
        return jsonify({'error': 'Title must not exceed 200 characters'}), 400
    
    if len(author) > 100:
        return jsonify({'error': 'Author name must not exceed 100 characters'}), 400
    
    if not image_url.startswith('http'):
        return jsonify({'error': 'Image URL must be a valid URL (http/https)'}), 400
    
    if 'date_published' in data and data['date_published']:
        is_valid, date_result = validate_date(data['date_published'])
        if not is_valid:
            return jsonify({'error': date_result}), 400
        date_published = date_result
    else:
        date_published = datetime.utcnow().date()
    
    # ❌ REMOVED: sources handling
    
    try:
        new_blog = Blog(
            title=title,
            introduction=introduction,
            body=body,
            conclusion=conclusion,
            author=author,
            image_url=image_url,
            date_published=date_published
            # ❌ REMOVED: sources=sources
        )
        
        db.session.add(new_blog)
        db.session.commit()
        
        return jsonify({
            "message": "Blog added successfully!",
            "blog_id": new_blog.blog_id
        }), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Database error: {str(e)}'}), 500

@blogs_bp.route('/<int:blog_id>', methods=['PUT'])
def update_blog(blog_id):
    """Update an existing blog post"""
    blog = Blog.query.get(blog_id)
    
    if not blog:
        return jsonify({'error': 'Blog not found'}), 404
    
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    if 'title' in data:
        title = str(data['title']).strip()
        if len(title) == 0:
            return jsonify({'error': 'Title cannot be empty'}), 400
        if len(title) > 200:
            return jsonify({'error': 'Title must not exceed 200 characters'}), 400
    
    if 'introduction' in data:
        introduction = str(data['introduction']).strip()
        if len(introduction) == 0:
            return jsonify({'error': 'Introduction cannot be empty'}), 400
    
    if 'body' in data:
        body = str(data['body']).strip()
        if len(body) == 0:
            return jsonify({'error': 'Body cannot be empty'}), 400
    
    if 'conclusion' in data:
        conclusion = str(data['conclusion']).strip()
        if len(conclusion) == 0:
            return jsonify({'error': 'Conclusion cannot be empty'}), 400
    
    if 'author' in data:
        author = str(data['author']).strip()
        if len(author) == 0:
            return jsonify({'error': 'Author cannot be empty'}), 400
        if len(author) > 100:
            return jsonify({'error': 'Author name must not exceed 100 characters'}), 400
    
    if 'image_url' in data:
        image_url = str(data['image_url']).strip()
        if len(image_url) == 0:
            return jsonify({'error': 'Image URL cannot be empty'}), 400
        if not image_url.startswith('http'):
            return jsonify({'error': 'Image URL must be a valid URL'}), 400
    
    if 'date_published' in data and data['date_published']:
        is_valid, date_result = validate_date(data['date_published'])
        if not is_valid:
            return jsonify({'error': date_result}), 400
    
    try:
        blog.title = data.get('title', blog.title).strip() if 'title' in data else blog.title
        blog.introduction = data.get('introduction', blog.introduction).strip() if 'introduction' in data else blog.introduction
        blog.body = data.get('body', blog.body).strip() if 'body' in data else blog.body
        blog.conclusion = data.get('conclusion', blog.conclusion).strip() if 'conclusion' in data else blog.conclusion
        blog.author = data.get('author', blog.author).strip() if 'author' in data else blog.author
        blog.image_url = data.get('image_url', blog.image_url).strip() if 'image_url' in data else blog.image_url
        # ❌ REMOVED: blog.sources line
        
        if 'date_published' in data and data['date_published']:
            is_valid, date_result = validate_date(data['date_published'])
            if is_valid:
                blog.date_published = date_result
        
        db.session.commit()
        return jsonify({"message": "Blog updated successfully!"}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Database error: {str(e)}'}), 500

@blogs_bp.route('/<int:blog_id>', methods=['DELETE'])
def delete_blog(blog_id):
    """Delete a blog post"""
    blog = Blog.query.get(blog_id)
    
    if not blog:
        return jsonify({'error': 'Blog not found'}), 404
    
    try:
        db.session.delete(blog)
        db.session.commit()
        return jsonify({"message": "Blog deleted successfully!"}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Database error: {str(e)}'}), 500
