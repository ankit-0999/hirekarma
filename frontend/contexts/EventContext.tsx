"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  imageUrl: string;
  createdBy?: string;
}

interface EventContextType {
  events: Event[];
  refresh: () => Promise<void>;
  addEvent: (event: Omit<Event, 'id'>) => Promise<boolean>;
  updateEvent: (id: string, event: Partial<Event>) => Promise<boolean>;
  deleteEvent: (id: string) => Promise<boolean>;
  getEvent: (id: string) => Event | undefined;
  isLoading: boolean;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export function EventProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useAuth();

  const mapFromApi = (e: any): Event => ({
    id: String(e.id),
    title: e.title,
    description: e.description,
    date: e.date,
    time: e.time,
    imageUrl: e.image_url ?? '',
  });

  const refresh = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/events`);
      const data = await res.json();
      setEvents(data.map(mapFromApi));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const addEvent = async (event: Omit<Event, 'id'>) => {
    if (!user) return false;
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: event.title,
        description: event.description,
        date: event.date,
        time: event.time,
        image_url: event.imageUrl,
      }),
    });
    if (!res.ok) return false;
    await refresh();
    return true;
  };

  const updateEvent = async (id: string, eventUpdate: Partial<Event>) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE}/events/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: eventUpdate.title,
        description: eventUpdate.description,
        date: eventUpdate.date,
        time: eventUpdate.time,
        image_url: eventUpdate.imageUrl,
      }),
    });
    
    if (!res.ok) {
      return false;
    }
    
    await refresh();
    return true;
  };

  const deleteEvent = async (id: string) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE}/events/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return false;
    await refresh();
    return true;
  };

  const getEvent = (id: string) => {
    return events.find(event => event.id === id);
  };

  return (
    <EventContext.Provider value={{ events, refresh, addEvent, updateEvent, deleteEvent, getEvent, isLoading }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
}