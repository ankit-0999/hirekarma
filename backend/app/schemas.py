# schemas.py

from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Optional, Literal, Union
from datetime import date, time, datetime

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: Literal['admin', 'normal'] = 'normal'

class UserOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: Literal['admin', 'normal']
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str


class EventBase(BaseModel):
    title: str
    description: str
    date: date
    time: Union[time, str]
    image_url: Optional[str] = None
    
    @field_validator('time')
    @classmethod
    def validate_time(cls, v):
        if isinstance(v, str):
            # Handle both "HH:MM" and "HH:MM:SS" formats
            if len(v.split(':')) == 2:
                v = v + ':00'  # Add seconds if missing
            return datetime.strptime(v, '%H:%M:%S').time()
        return v


class EventCreate(EventBase):
    pass


class EventUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    date: Optional[date] = None
    time: Optional[Union[time, str]] = None
    image_url: Optional[str] = None
    
    @field_validator('time')
    @classmethod
    def validate_time(cls, v):
        if v is None:
            return v
        if isinstance(v, str):
            # Handle both "HH:MM" and "HH:MM:SS" formats
            if len(v.split(':')) == 2:
                v = v + ':00'  # Add seconds if missing
            return datetime.strptime(v, '%H:%M:%S').time()
        return v


class EventOut(EventBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
