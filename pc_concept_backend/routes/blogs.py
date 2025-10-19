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


def serialize_blog(blog, include_full_content=True, excerpt_length=200):
    """Serialize blog to dictionary"""
    result = {
        "blog_id": blog.blog_id,
        "title": blog.title,
        "author": blog.author,
        "date_published": blog.date_published.strftime("%Y-%m-%d")
    }
    
    if include_full_content:
        result["content"] = blog.content
    else:
        # Return excerpt/preview
        content = blog.content or ""
        if len(content) > excerpt_length:
            result["excerpt"] = content[:excerpt_length].strip() + "..."
        else:
            result["excerpt"] = content
    
    # Include sources if available
    if blog.sources:
        result["sources"] = blog.sources
    
    return result


# GET all blogs (with pagination and preview mode)
@blogs_bp.route('/', methods=['GET'])
def get_blogs():
    """Get all blogs with pagination and optional preview mode"""
    page = validate_positive_int(request.args.get('page', 1), 1)
    per_page = validate_positive_int(request.args.get('per_page', 10), 10)
    per_page = min(per_page, 50)  # Max 50 blogs per page
    
    # Option to get full content or just excerpts
    preview_mode = request.args.get('preview', 'true').lower() == 'true'
    
    # Sort by newest first
    query = Blog.query.order_by(Blog.date_published.desc())
    paginated = query.paginate(page=page, per_page=per_page, error_out=False)
    
    output = []
    for b in paginated.items:
        output.append(serialize_blog(b, include_full_content=not preview_mode))
    
    return jsonify({
        "blogs": output,
        "page": page,
        "per_page": per_page,
        "total": paginated.total,
        "pages": paginated.pages
    }), 200


# GET latest/recent blogs
@blogs_bp.route('/latest', methods=['GET'])
def get_latest_blogs():
    """Get the most recent blogs (default 5)"""
    limit = validate_positive_int(request.args.get('limit', 5), 5)
    limit = min(limit, 20)  # Max 20 blogs
    
    blogs = Blog.query.order_by(Blog.date_published.desc()).limit(limit).all()
    
    output = []
    for b in blogs:
        output.append(serialize_blog(b, include_full_content=False))
    
    return jsonify(output), 200


# GET blog by ID
@blogs_bp.route('/<int:blog_id>', methods=['GET'])
def get_blog_by_id(blog_id):
    """Get a single blog by ID with full content"""
    blog = Blog.query.get(blog_id)
    if not blog:
        return jsonify({'error': 'Blog not found'}), 404

    result = serialize_blog(blog, include_full_content=True)
    return jsonify(result), 200


# SEARCH blogs by title or content
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
    
    # Search in both title and content
    query = Blog.query.filter(
        db.or_(
            Blog.title.ilike(f'%{search_term}%'),
            Blog.content.ilike(f'%{search_term}%')
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


# GET blogs by author
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


# ADD new blog
@blogs_bp.route('/', methods=['POST'])
def add_blog():
    """Create a new blog post"""
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    # Validate required fields
    required_fields = ['title', 'content', 'author']
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    # Validate that fields are not empty strings
    title = str(data['title']).strip()
    content = str(data['content']).strip()
    author = str(data['author']).strip()
    
    if len(title) == 0:
        return jsonify({'error': 'Title cannot be empty'}), 400
    if len(content) == 0:
        return jsonify({'error': 'Content cannot be empty'}), 400
    if len(author) == 0:
        return jsonify({'error': 'Author cannot be empty'}), 400
    
    # Validate title length
    if len(title) > 200:
        return jsonify({'error': 'Title must not exceed 200 characters'}), 400
    
    # Validate author length
    if len(author) > 100:
        return jsonify({'error': 'Author name must not exceed 100 characters'}), 400
    
    # Handle date_published - auto-generate if not provided
    if 'date_published' in data and data['date_published']:
        is_valid, date_result = validate_date(data['date_published'])
        if not is_valid:
            return jsonify({'error': date_result}), 400
        date_published = date_result
    else:
        # Auto-generate current date if not provided
        date_published = datetime.utcnow().date()
    
    # Handle sources (optional)
    sources = data.get('sources', '').strip() if data.get('sources') else None
    
    try:
        new_blog = Blog(
            title=title,
            content=content,
            author=author,
            sources=sources,
            date_published=date_published
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


# UPDATE blog (PUT)
@blogs_bp.route('/<int:blog_id>', methods=['PUT'])
def update_blog(blog_id):
    """Update an existing blog post"""
    blog = Blog.query.get(blog_id)
    
    if not blog:
        return jsonify({'error': 'Blog not found'}), 404
    
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    # Validate title if provided
    if 'title' in data:
        title = str(data['title']).strip()
        if len(title) == 0:
            return jsonify({'error': 'Title cannot be empty'}), 400
        if len(title) > 200:
            return jsonify({'error': 'Title must not exceed 200 characters'}), 400
    
    # Validate content if provided
    if 'content' in data:
        content = str(data['content']).strip()
        if len(content) == 0:
            return jsonify({'error': 'Content cannot be empty'}), 400
    
    # Validate author if provided
    if 'author' in data:
        author = str(data['author']).strip()
        if len(author) == 0:
            return jsonify({'error': 'Author cannot be empty'}), 400
        if len(author) > 100:
            return jsonify({'error': 'Author name must not exceed 100 characters'}), 400
    
    # Validate date if provided
    if 'date_published' in data and data['date_published']:
        is_valid, date_result = validate_date(data['date_published'])
        if not is_valid:
            return jsonify({'error': date_result}), 400
    
    try:
        blog.title = data.get('title', blog.title).strip() if 'title' in data else blog.title
        blog.content = data.get('content', blog.content).strip() if 'content' in data else blog.content
        blog.author = data.get('author', blog.author).strip() if 'author' in data else blog.author
        blog.sources = data.get('sources', blog.sources).strip() if 'sources' in data and data['sources'] else blog.sources
        
        if 'date_published' in data and data['date_published']:
            is_valid, date_result = validate_date(data['date_published'])
            if is_valid:
                blog.date_published = date_result
        
        db.session.commit()
        return jsonify({"message": "Blog updated successfully!"}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Database error: {str(e)}'}), 500


# DELETE blog
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