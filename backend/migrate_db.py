#!/usr/bin/env python3
"""
Database migration script for HireKarma
Run this when you update the models to recreate the database schema
"""
from app.database import engine
from app.models import Base

def migrate_database():
    """Drop and recreate all tables with the current schema"""
    print("Dropping existing tables...")
    Base.metadata.drop_all(bind=engine)

    print("Creating tables with new schema...")
    Base.metadata.create_all(bind=engine)

    print("Database migration completed successfully!")

if __name__ == "__main__":
    migrate_database()
