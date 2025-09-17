"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { Event } from '@/contexts/EventContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface EventFormData {
  title: string;
  description: string;
  date: string;
  time: string;
  imageUrl: string;
}

interface EventFormProps {
  event?: Event;
  onSubmit: (data: EventFormData) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export default function EventForm({ event, onSubmit, onCancel, isSubmitting = false }: EventFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<EventFormData>({
    defaultValues: event ? {
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time.includes(':') ? event.time.substring(0, 5) : event.time, // Convert "HH:MM:SS" to "HH:MM" for display
      imageUrl: event.imageUrl
    } : {
      title: '',
      description: '',
      date: '',
      time: '',
      imageUrl: ''
    }
  });

  const watchedImageUrl = watch('imageUrl');

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
          {event ? 'Edit Event' : 'Create New Event'}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Image Preview */}
          {watchedImageUrl && (
            <div className="mb-6">
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Image Preview
              </Label>
              <div className="w-full h-48 rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={watchedImageUrl}
                  alt="Event preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                Event Title *
              </Label>
              <Input
                id="title"
                {...register('title', { 
                  required: 'Event title is required',
                  minLength: { value: 3, message: 'Title must be at least 3 characters' }
                })}
                className="mt-1"
                placeholder="Enter event title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                Description *
              </Label>
              <Textarea
                id="description"
                {...register('description', { 
                  required: 'Event description is required',
                  minLength: { value: 10, message: 'Description must be at least 10 characters' }
                })}
                className="mt-1"
                rows={4}
                placeholder="Describe your event..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date" className="text-sm font-medium text-gray-700">
                  Event Date *
                </Label>
                <Input
                  id="date"
                  type="date"
                  {...register('date', { required: 'Event date is required' })}
                  className="mt-1"
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.date && (
                  <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="time" className="text-sm font-medium text-gray-700">
                  Event Time *
                </Label>
                <Input
                  id="time"
                  type="time"
                  {...register('time', { required: 'Event time is required' })}
                  className="mt-1"
                />
                {errors.time && (
                  <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="imageUrl" className="text-sm font-medium text-gray-700">
                Image URL *
              </Label>
              <Input
                id="imageUrl"
                type="url"
                {...register('imageUrl', { 
                  required: 'Image URL is required',
                })}
                className="mt-1"
                placeholder="https://example.com/image.jpg"
              />
              {errors.imageUrl && (
                <p className="mt-1 text-sm text-red-600">{errors.imageUrl.message}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Enter a direct link to an image (jpg, jpeg, png, gif, webp)
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600"
            >
              {isSubmitting ? 'Saving...' : (event ? 'Update Event' : 'Create Event')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}