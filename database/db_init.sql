DROP TABLE IF EXISTS product_specifications, reviews, blogs, products CASCADE;

-- PRODUCTS TABLE
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL, 
    brand VARCHAR(100),
    category VARCHAR(100) NOT NULL,
    subcategory VARCHAR(100),
    price NUMERIC(10,2) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

-- PRODUCT SPECIFICATIONS TABLE
CREATE TABLE product_specifications (
    spec_id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(product_id) ON DELETE CASCADE,
    spec_name VARCHAR(255) NOT NULL,
    spec_value VARCHAR(255) NOT NULL
);

-- REVIEWS TABLE
CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(product_id) ON DELETE CASCADE,
    user_alias VARCHAR(100) NOT NULL,
    review_text TEXT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5)
);

-- BLOGS TABLE
CREATE TABLE blogs (
    blog_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(100) NOT NULL,
    sources TEXT,
    date_published DATE NOT NULL
);
