# PC Concept Backend Current Progress

A RESTful API backend for an e-commerce platform specializing in computer hardware and peripherals. Built with Flask and PostgreSQL.

## Features

- **Product Management** - CRUD operations with filtering, search, and specifications
- **Anonymous Reviews** - User reviews without authentication, organized by product categories
- **Blog System** - Content management with search and author filtering
- **Category-Based Organization** - Laptops, Desktop/PCs, Components, Accessories, and Speakers
- **Comprehensive Validation** - Input validation and error handling on all endpoints
- **Pagination** - Efficient data retrieval for large datasets

## Tech Stack

- **Framework:** Flask
- **Database:** PostgreSQL
- **ORM:** SQLAlchemy
- **Migrations:** Flask-Migrate

## Database Schema

### Products
- Categorized into 5 main categories with subcategories and brands
- Includes pricing, descriptions, and images
- Supports detailed product specifications

### Reviews
- Anonymous user reviews with ratings (1-5)
- Organized by category, subcategory, or brand
- Linked to specific products

### Blogs
- Technical content and product guides
- Search functionality by title/content
- Author attribution and source citations

### Product Specifications
- Dynamic spec names and values per product
- Supports bulk insertion
- Prevents duplicate specifications

## Project Structure

```
pc_concept_backend/
├── app.py                 # Application entry point
├── config.py              # Configuration settings
├── models.py              # Database models
├── routes/
│   ├── products.py        # Product endpoints
│   ├── specifications.py  # Specification endpoints
│   ├── reviews.py         # Review endpoints
│   └── blogs.py           # Blog endpoints
├── migrations/            # Database migrations
└── venv/                  # Virtual environment
```

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/pc_concept_backend.git
cd pc_concept_backend
```

2. **Create virtual environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install flask flask-sqlalchemy flask-migrate psycopg2-binary
```

4. **Configure database**
Update `config.py` with your PostgreSQL credentials:
```python
SQLALCHEMY_DATABASE_URI = 'postgresql://username:password@localhost/pc_concept_db'
```

5. **Initialize database**
```bash
flask db init
flask db migrate -m "initial_migration"
flask db upgrade
```

6. **Run the application**
```bash
python app.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Products
- `GET /products/` - Get all products (paginated)
- `GET /products/<product_id>` - Get product by ID with specs
- `POST /products/` - Create product
- `PUT /products/<product_id>` - Update product
- `DELETE /products/<product_id>` - Delete product
- `GET /products/category/<category>` - Get by category
- `GET /products/category/<category>/subcategory/<subcategory>` - Get by subcategory
- `GET /products/category/Laptops/brand/<brand>` - Get laptops by brand
- `GET /products/filter` - Filter products (category, subcategory, brand)
- `GET /products/search?q=keyword` - Search products

### Specifications
- `GET /specs/` - Get all specifications (paginated)
- `GET /specs/<spec_id>` - Get specification by ID
- `GET /specs/product/<product_id>` - Get all specs for a product
- `POST /specs/` - Create specification(s) (single or bulk)
- `PUT /specs/<spec_id>` - Update specification
- `DELETE /specs/<spec_id>` - Delete specification
- `DELETE /specs/product/<product_id>` - Delete all specs for product

### Reviews
- `GET /reviews/` - Get all reviews (paginated)
- `GET /reviews/<review_id>` - Get review by ID
- `GET /reviews/product/<product_id>` - Get reviews for a product
- `GET /reviews/filter` - Filter reviews (category, subcategory, brand)
- `POST /reviews/` - Create review
- `PUT /reviews/<review_id>` - Update review
- `DELETE /reviews/<review_id>` - Delete review

### Blogs
- `GET /blogs/` - Get all blogs (paginated, preview mode)
- `GET /blogs/<blog_id>` - Get blog by ID (full content)
- `GET /blogs/latest?limit=5` - Get latest blogs
- `GET /blogs/search?q=keyword` - Search blogs
- `GET /blogs/author/<author>` - Get blogs by author
- `POST /blogs/` - Create blog
- `PUT /blogs/<blog_id>` - Update blog
- `DELETE /blogs/<blog_id>` - Delete blog

## Category Rules

### Laptops
- **Can be filtered by:** Brand (ACER, ASUS, LENOVO, NINGMEI)
- **Cannot have:** Subcategories

### Desktop/PCs
- **Subcategories:** PC Bundles, PC Monitors, System Units
- **Cannot have:** Brands

### Components
- **Subcategories:** Cooling Systems, PC Cases
- **Cannot have:** Brands

### Accessories
- **Subcategories:** Headset, Keyboard, Mouse
- **Cannot have:** Brands

### Speakers
- **Cannot have:** Brands or Subcategories

## Validation Features

- Required field checking on all POST/PUT requests
- Empty string prevention
- Price validation (must be positive)
- Rating validation (1-5 range)
- Category, brand, and subcategory validation
- Foreign key verification (product existence)
- Duplicate prevention for specifications
- Date format validation (YYYY-MM-DD)
- Input sanitization with `.strip()`

## Error Handling

All endpoints include:
- Try-except blocks for database operations
- Automatic rollback on errors
- Descriptive error messages
- Appropriate HTTP status codes (400, 404, 409, 500)

## Pagination

List endpoints support pagination parameters:
- `?page=1` - Page number (default: 1)
- `?per_page=20` - Items per page (default varies by endpoint)
- Maximum items per page enforced to prevent performance issues

## Contributing

This is a backend project for the PC Concept e-commerce platform.

## License

This project is for educational/commercial purposes.

## Contact

For questions or support, please open an issue in the repository.
