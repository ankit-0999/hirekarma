# config.py
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

DATABASE_URL=os.getenv("DATABASE_URL")

SECRET_KEY= "ankit"
ALGORITHM= "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES= 30
