import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy.exc import SQLAlchemyError

# Database connection (update with your credentials)
engine = create_engine('postgresql://postgres:micah7:8@localhost:5432/pc_concept_db')

# Read the Blogs CSV
blogs_df = pd.read_csv(r'C:\Users\aquarius12\Documents\PC Concept_Database - Blogs.csv')

# Insert into PostgreSQL
try:
    blogs_df.to_sql('blogs', engine, if_exists='append', index=False)
    print(f"{len(blogs_df)} records inserted into 'blogs' table successfully.")
except SQLAlchemyError as e:
    print("An error occurred while inserting data:", e)
