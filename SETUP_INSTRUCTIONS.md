# HireKarma Setup Instructions

## Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Activate virtual environment:**
   ```bash
   # Windows
   venv\Scripts\activate
   
   # Mac/Linux
   source venv/bin/activate
   ```

3. **Install dependencies (if not already installed):**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set environment variables:**
   ```bash
   # Windows PowerShell
   $env:SECRET_KEY="your-super-secret-key-change-this-in-production"
   
   # Windows CMD
   set SECRET_KEY=your-super-secret-key-change-this-in-production
   
   # Mac/Linux
   export SECRET_KEY="your-super-secret-key-change-this-in-production"
   ```

5. **Start the backend server:**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```
   
   Or use the provided batch file on Windows:
   ```bash
   start_backend.bat
   ```

6. **Test the API:**
   ```bash
   python test_api.py
   ```

## Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set environment variable:**
   Create a `.env.local` file in the frontend directory with:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. **Start the frontend:**
   ```bash
   npm run dev
   ```

## Testing

1. **Backend should be running on:** http://localhost:8000
2. **Frontend should be running on:** http://localhost:3000
3. **API Documentation:** http://localhost:8000/docs

## Common Issues

### Signup Error
- Make sure the backend is running
- Check browser console for error messages
- Verify database connection in backend logs
- Ensure SECRET_KEY is set

### Database Connection Error
- Verify the DATABASE_URL in `backend/app/config.py` is correct
- Make sure the PostgreSQL database is accessible
- Check if the database exists and has proper permissions

### CORS Issues
- Backend has CORS enabled for all origins
- If issues persist, check the CORS configuration in `backend/app/main.py`

## API Endpoints

- `POST /register` - User signup
- `POST /login` - User login
- `GET /users/me` - Get current user
- `GET /events` - List events
- `POST /events` - Create event (admin only)
- `PUT /events/{id}` - Update event (admin only)
- `DELETE /events/{id}` - Delete event (admin only)
