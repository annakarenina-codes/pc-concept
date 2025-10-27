import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy.exc import SQLAlchemyError

# 1. Database connection (edit your credentials if needed)
# Example: postgresql://username:password@localhost:5432/pc_concept_db
engine = create_engine('postgresql://postgres:micah7:8@localhost:5432/pc_concept_db')

# 2. Read both CSVs
products_df = pd.read_csv(r'C:\Users\aquarius12\Documents\PC Concept_Database - Products.csv')
product_specs_df = pd.read_csv(r'C:\Users\aquarius12\Documents\PC Concept_Database - Product_Specifications.csv')

# 3. Create the database tables if not already existing
# Assuming your tables were already defined under Flask models, skip this step.
# Otherwise, you can define simple schemas as placeholders.

# 4. Insert into PostgreSQL
try:
    # Insert Products
    products_df.to_sql('products', engine, if_exists='append', index=False)
    print(f"{len(products_df)} records inserted into Products table successfully.")

    # Insert Product Specifications
    product_specs_df.to_sql('product_specifications', engine, if_exists='append', index=False)
    print(f"{len(product_specs_df)} records inserted into Product_Specifications table successfully.")

except SQLAlchemyError as e:
    print("An error occurred while inserting data:", e)
