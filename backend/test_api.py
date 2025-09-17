#!/usr/bin/env python3
"""
Simple test script to verify the API endpoints are working
"""
import requests
import json

BASE_URL = "http://localhost:8000"

def test_signup():
    """Test user signup"""
    print("Testing signup...")
    
    test_user = {
        "name": "Test User",
        "email": "test@example.com",
        "password": "password123",
        "role": "normal"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/register", json=test_user)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            print("✅ Signup successful!")
            return response.json()
        else:
            print("❌ Signup failed!")
            return None
            
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to backend. Make sure it's running on http://localhost:8000")
        return None
    except Exception as e:
        print(f"❌ Error: {e}")
        return None

def test_login():
    """Test user login"""
    print("\nTesting login...")
    
    login_data = {
        "username": "test@example.com",  # OAuth2PasswordRequestForm uses 'username'
        "password": "password123"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/login", data=login_data)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            print("✅ Login successful!")
            return response.json()
        else:
            print("❌ Login failed!")
            return None
            
    except Exception as e:
        print(f"❌ Error: {e}")
        return None

def test_events():
    """Test events endpoint"""
    print("\nTesting events...")
    
    try:
        response = requests.get(f"{BASE_URL}/events")
        print(f"Status: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            print("✅ Events endpoint working!")
            return response.json()
        else:
            print("❌ Events endpoint failed!")
            return None
            
    except Exception as e:
        print(f"❌ Error: {e}")
        return None

if __name__ == "__main__":
    print("🧪 Testing HireKarma API...")
    print("=" * 50)
    
    # Test signup
    user = test_signup()
    
    # Test login
    token_data = test_login()
    
    # Test events
    events = test_events()
    
    print("\n" + "=" * 50)
    print("Test completed!")
