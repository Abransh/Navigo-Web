// components/booking/DateTimeSelector.tsx
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Clock, CalendarIcon } from 'lucide-react';
import { format, isBefore } from 'date-fns';

interface DateTimeSelectorProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  timeSlot: string;
  setTimeSlot: (slot: string) => void;
  duration: string;
  setDuration: (duration: string) => void;
  customDuration: string;
  setCustomDuration: (duration: string) => void;
  timeSlots: { label: string; value: string }[];
  durationOptions: { label: string; value: string }[];
}

export const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({
  date,
  setDate,
  timeSlot,
  setTimeSlot,
  duration,
  setDuration,
  customDuration,
  setCustomDuration,
  timeSlots,
  durationOptions,
}) => {
  return (
    <div className="space-y-8">
      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
        <p className="text-amber-800 text-sm flex items-start">
          <span className="bg-amber-200 p-1 rounded-full mr-2 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </span>
          <span>
            <strong>Automatic Matching:</strong> We'll match you with an available companion 
            based on your selected date, time, and preferences.
          </span>
        </p>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Select your preferred date</h3>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={(date) => isBefore(date, new Date()) || date.getDay() === 0}
          className="rounded-md border shadow mx-auto"
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Choose a time slot</h3>
        <RadioGroup value={timeSlot} onValueChange={setTimeSlot} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {timeSlots.map((slot) => (
            <div 
              key={slot.value} 
              className={`flex items-center space-x-2 p-3 rounded-lg border ${
                timeSlot === slot.value ? 'border-primary bg-primary/5' : 'border-gray-200'
              } cursor-pointer`}
              onClick={() => setTimeSlot(slot.value)}
            >
              <RadioGroupItem value={slot.value} id={`time-${slot.value}`} />
              <Label htmlFor={`time-${slot.value}`} className="flex items-center cursor-pointer flex-1">
                <Clock className="h-4 w-4 mr-2 text-primary" />
                {slot.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Select duration</h3>
        <RadioGroup value={duration} onValueChange={setDuration} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {durationOptions.map((option) => (
            <div 
              key={option.value} 
              className={`flex items-center space-x-2 p-3 rounded-lg border ${
                duration === option.value ? 'border-primary bg-primary/5' : 'border-gray-200'
              } cursor-pointer`}
              onClick={() => setDuration(option.value)}
            >
              <RadioGroupItem value={option.value} id={`duration-${option.value}`} />
              <Label htmlFor={`duration-${option.value}`} className="cursor-pointer flex-1">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        
        {duration === 'custom' && (
          <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <Label htmlFor="custom-duration" className="mb-2 block">
              Custom duration (hours)
            </Label>
            <div className="flex items-center">
              <Input 
                id="custom-duration"
                type="number"
                value={customDuration}
                onChange={(e) => setCustomDuration(e.target.value)}
                min="1"
                max="12"
                className="w-24"
              />
              <span className="ml-3 text-gray-500">hours</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="pt-4 border-t">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center text-gray-600">
            <CalendarIcon className="h-5 w-5 text-primary mr-2" />
            <span>{date ? format(date, 'MMMM d, yyyy') : 'Select date'}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-5 w-5 text-primary mr-2" />
            <span>
              {timeSlots.find(s => s.value === timeSlot)?.label.split('(')[1].replace(')', '')} &middot; {' '}
              {duration === 'custom' ? customDuration : duration} hours
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};