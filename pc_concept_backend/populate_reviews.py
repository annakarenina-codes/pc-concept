import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy.exc import SQLAlchemyError

# Database connection (update with your credentials)
engine = create_engine('postgresql://postgres:micah7:8@localhost:5432/pc_concept_db')

# Read the Reviews CSV
reviews_df = pd.read_csv(r'C:\Users\aquarius12\Documents\PC Concept_Database - Reviews.csv')

# Insert into PostgreSQL
try:
    reviews_df.to_sql('reviews', engine, if_exists='append', index=False)
    print(f"{len(reviews_df)} records inserted into 'reviews' table successfully.")
except SQLAlchemyError as e:
    print("An error occurred while inserting data:", e)
