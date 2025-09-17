"use client";

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useEvents } from '@/contexts/EventContext';
import EventCard from '@/components/EventCard';
import EventDetailModal from '@/components/EventDetailModal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Calendar, Plus, Filter } from 'lucide-react';
import Link from 'next/link';

export default function EventsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const { events } = useEvents();
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const router = useRouter();

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsDetailModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDetailModalOpen(false);
    setSelectedEvent(null);
  };

  // Filter events based on search term and date
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDate = !dateFilter || event.date === dateFilter;
      
      return matchesSearch && matchesDate;
    });
  }, [events, searchTerm, dateFilter]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Amazing Events
            </h1>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Find events that inspire, educate, and connect you with your community
            </p>
            
            {user.role === 'admin' && (
              <Link href="/admin/events">
                <Button size="lg" variant="secondary" className="bg-white text-indigo-600 hover:bg-gray-100">
                  <Plus className="h-5 w-5 mr-2" />
                  Create Event
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search events by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
            
            <div className="relative min-w-48">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="pl-10 h-12"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            {(searchTerm || dateFilter) && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setDateFilter('');
                }}
                className="h-12 px-6"
              >
                Clear Filters
              </Button>
            )}
          </div>
          
          {(searchTerm || dateFilter) && (
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredEvents.length} of {events.length} events
              {searchTerm && <span className="ml-1">matching "{searchTerm}"</span>}
              {dateFilter && <span className="ml-1">for {new Date(dateFilter).toLocaleDateString()}</span>}
            </div>
          )}
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {searchTerm || dateFilter ? 'No events found' : 'No events available'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || dateFilter 
                ? 'Try adjusting your search filters to find more events.'
                : 'Check back later for upcoming events or create one if you\'re an admin.'
              }
            </p>
            {user.role === 'admin' && !searchTerm && !dateFilter && (
              <Link href="/admin/events">
                <Button className="bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Event
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} onClick={handleEventClick} />
            ))}
          </div>
        )}

        {/* Stats Section */}
        {events.length > 0 && (
          <div className="mt-16 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Event Statistics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">
                    {events.length}
                  </div>
                  <div className="text-gray-600">Total Events</div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {events.filter(e => new Date(e.date) >= new Date()).length}
                  </div>
                  <div className="text-gray-600">Upcoming Events</div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {new Set(events.map(e => e.date)).size}
                  </div>
                  <div className="text-gray-600">Event Days</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Event Detail Modal */}
      <EventDetailModal
        event={selectedEvent}
        isOpen={isDetailModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}