from sqlalchemy import create_engine, text

engine = create_engine('postgresql://postgres:micah7:8@localhost:5432/pc_concept_db')

with engine.connect() as conn:
    conn.execute(text('DELETE FROM product_specifications;'))
    conn.execute(text('DELETE FROM products;'))
    conn.commit()
    print('All rows removed from products and product_specifications.')
