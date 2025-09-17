# config.py
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Default to a local SQLite database if DATABASE_URL is not provided
DATABASE_URL = os.getenv("DATABASE_URL") or "sqlite:///./hirekarma.db"

# Allow overriding secret and algorithm via env; keep sensible defaults for dev
SECRET_KEY = os.getenv("SECRET_KEY") or "ankit"
ALGORITHM = os.getenv("ALGORITHM") or "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES") or 30)
