@echo off
echo Starting HireKarma Backend...
echo.

REM Activate virtual environment
call venv\Scripts\activate

REM Set environment variables
set SECRET_KEY=your-super-secret-key-change-this-in-production
set NEXT_PUBLIC_API_URL=http://localhost:8000

REM Start the server
echo Starting FastAPI server on http://localhost:8000
echo Press Ctrl+C to stop
echo.
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
