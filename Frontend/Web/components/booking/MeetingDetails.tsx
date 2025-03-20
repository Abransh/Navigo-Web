// components/booking/MeetingDetails.tsx
import React from 'react';
import { MapPin, CalendarIcon, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';

interface MeetingDetailsProps {
  location: string;
  setLocation: (location: string) => void;
  notes: string;
  setNotes: (notes: string) => void;
  date: Date | undefined;
  timeSlot: string;
  duration: string;
  customDuration: string;
  timeSlots: { label: string; value: string }[];
}

export const MeetingDetails: React.FC<MeetingDetailsProps> = ({
  location,
  setLocation,
  notes,
  setNotes,
  date,
  timeSlot,
  duration,
  customDuration,
  timeSlots
}) => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Meeting location</h3>
        <div className="flex items-start space-x-3 mb-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="mt-1 text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>
          <p className="text-blue-800 text-sm">
            <strong>Choose a safe, public meeting place</strong> like a hotel lobby, 
            popular cafe, or a major tourist attraction entrance. Be as specific as possible.
          </p>
        </div>
        <div className="flex items-start space-x-2 mb-3">
          <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
          <div className="flex-1">
            <Label htmlFor="location" className="text-base font-medium">Meeting location</Label>
            <p className="text-sm text-gray-500 mb-2">
              Specify where you'd like to meet your companion
            </p>
            <Input 
              id="location"
              placeholder="e.g., Lobby of Hotel Taj, Main entrance of Red Fort, etc."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Additional notes (optional)</h3>
        <div className="mb-3">
          <Label htmlFor="notes" className="mb-2 block">
            Any specific interests, preferences, or requirements?
          </Label>
          <Textarea 
            id="notes"
            placeholder="E.g., I'm interested in local cuisine, want to avoid crowded places, need wheelchair access, etc."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full min-h-[150px]"
          />
        </div>
      </div>
      
      <div className="pt-4 border-t">
        <div className="space-y-2">
          <div className="flex items-center">
            <CalendarIcon className="h-5 w-5 text-primary mr-2" />
            <p className="text-gray-600">
              {date ? format(date, 'MMMM d, yyyy') : 'Select date'} &middot; {' '}
              {timeSlots.find(s => s.value === timeSlot)?.label.split('(')[1].replace(')', '')}
            </p>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-primary mr-2" />
            <p className="text-gray-600">
              Duration: {duration === 'custom' ? customDuration : duration} hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
