// app/booking/[id]/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { format, addHours, setHours, setMinutes, isBefore, addDays } from 'date-fns';
import { CalendarIcon, Clock, ChevronRight, Loader2, MapPin, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import PaymentOptionSelector from '@/components/payment/PaymentOptionSelector';
import EnhancedPaymentForm from '@/components/payment/EnhancedPaymentForm';
import bookingService from '@/services/booking-service';
import companionService from '@/services/companion-service';

// Time slot options
const TIME_SLOTS = [
  { label: 'Morning (9:00 AM - 12:00 PM)', value: '09:00' },
  { label: 'Afternoon (12:00 PM - 3:00 PM)', value: '12:00' },
  { label: 'Evening (3:00 PM - 6:00 PM)', value: '15:00' },
  { label: 'Night (6:00 PM - 9:00 PM)', value: '18:00' },
];

// Duration options
const DURATION_OPTIONS = [
  { label: '3 hours', value: '3' },
  { label: '6 hours', value: '6' },
  { label: 'Full day (9 hours)', value: '9' },
  { label: 'Custom', value: 'custom' },
];

// Helper function to parse time string to date
const parseTimeString = (timeString: string, baseDate: Date): Date => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return setMinutes(setHours(baseDate, hours), minutes);
};

export default function BookingPage({ params }: { params: { id: string } }) {
  const companionId = params.id;
  const { isAuthenticated, loading, user } = useAuth();
  const router = useRouter();
  const [companion, setCompanion] = useState<any>(null);
  const [isLoadingCompanion, setIsLoadingCompanion] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps] = useState(3);
  const [loadingPrice, setLoadingPrice] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  // Form data
  const [date, setDate] = useState<Date | undefined>(addDays(new Date(), 1));
  const [timeSlot, setTimeSlot] = useState('09:00');
  const [duration, setDuration] = useState('3');
  const [customDuration, setCustomDuration] = useState('4');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentOption, setPaymentOption] = useState<'pay-now' | 'pay-later' | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [matchingCompanion, setMatchingCompanion] = useState(false);

  // Calculate dates and times
  const startTime = date ? parseTimeString(timeSlot, date) : undefined;
  const durationHours = duration === 'custom' ? Number(customDuration) : Number(duration);
  const endTime = startTime ? addHours(startTime, durationHours) : undefined;

  // Fetch companion details
  useEffect(() => {
    const fetchCompanion = async () => {
      try {
        setIsLoadingCompanion(true);
        // In a real implementation, we would use the actual API call
        // const data = await companionService.getCompanion(companionId);
        
        // For demonstration purposes, use mock data
        const mockCompanion = await new Promise(resolve => {
          setTimeout(() => {
            resolve({
              id: companionId,
              user: {
                firstName: 'Rahul',
                lastName: 'Sharma',
                profilePicture: '/placeholder.svg',
              },
              bio: 'Experienced guide with knowledge of local history and culture.',
              languages: ['English', 'Hindi', 'French'],
              specialties: ['History', 'Food', 'Architecture'],
              hourlyRate: 20,
              averageRating: 4.8,
              totalReviews: 24,
            });
          }, 800); // Simulate API delay
        });
        
        setCompanion(mockCompanion);
        
        // Calculate initial price
        calculatePrice((mockCompanion as any).hourlyRate);
      } catch (error) {
        console.error('Failed to fetch companion details:', error);
        toast.error('Could not load companion details. Please try again.');
      } finally {
        setIsLoadingCompanion(false);
      }
    };

    if (!loading && isAuthenticated) {
      fetchCompanion();
    } else if (!loading && !isAuthenticated) {
      router.push(`/login?redirectTo=/booking/${companionId}`);
    }
  }, [companionId, isAuthenticated, loading, router]);

  // Calculate price when duration or hourly rate changes
  useEffect(() => {
    if (companion?.hourlyRate) {
      calculatePrice(companion.hourlyRate);
    }
  }, [duration, customDuration, companion?.hourlyRate]);

  const calculatePrice = (hourlyRate: number) => {
    const hours = duration === 'custom' ? Number(customDuration) : Number(duration);
    setTotalPrice(hourlyRate * hours);
  };

  // Handle booking calculation from API
  const calculatePriceFromAPI = async () => {
    if (!startTime || !endTime) return;
    
    try {
      setLoadingPrice(true);
      // In a real implementation, use the actual API call
      // const result = await bookingService.calculatePrice(
      //   companionId,
      //   startTime.toISOString(),
      //   endTime.toISOString()
      // );
      
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock calculation for now
      setTotalPrice(companion.hourlyRate * durationHours);
    } catch (error) {
      console.error('Failed to calculate price:', error);
      toast.error('Could not calculate price. Please try again.');
    } finally {
      setLoadingPrice(false);
    }
  };

  // Auto-match companion (placeholder for now)
  const findMatchingCompanion = async () => {
    if (!date || !timeSlot || !location) return false;
    
    try {
      setMatchingCompanion(true);
      
      // In a real implementation, we would call an API to match a companion based on:
      // - Date and time availability
      // - Location proximity
      // - Language preferences
      // - Specialties matching the user's interests
      
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For now, we'll assume a match is always found (the current companion)
      setMatchingCompanion(false);
      return true;
    } catch (error) {
      console.error('Failed to find matching companion:', error);
      toast.error('Could not find a matching companion. Please try different dates or times.');
      setMatchingCompanion(false);
      return false;
    }
  };

  // Create booking
  const createBooking = async () => {
    if (!startTime || !endTime || !location) {
      toast.error('Please complete all required fields');
      return;
    }
    
    // First, find a matching companion
    const matchFound = await findMatchingCompanion();
    if (!matchFound) return;
    
    try {
      setSubmitting(true);
      
      // In a real implementation, use the actual API call
      // const booking = await bookingService.createBooking({
      //   companionId,
      //   startDate: startTime.toISOString(),
      //   endDate: endTime.toISOString(),
      //   location,
      //   notes,
      //   paymentOption,
      // });
      
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock booking response
      const mockBooking = {
        id: 'booking_' + Math.random().toString(36).substr(2, 9),
        companionId,
        startDate: startTime.toISOString(),
        endDate: endTime.toISOString(),
        location,
        notes,
        totalAmount: totalPrice,
        status: 'pending',
        paymentOption,
      };
      
      // Set the booking ID for payment processing
      setBookingId(mockBooking.id);
      
      // If "Pay Later" option is selected, redirect to success page
      if (paymentOption === 'pay-later') {
        toast.success('Booking confirmed! Payment will be collected after the tour.');
        router.push(`/bookings/success?id=${mockBooking.id}`);
      }
      
      // If "Pay Now" option is selected, the payment form will be shown
      // (This happens automatically since bookingId is now set)
      
    } catch (error) {
      console.error('Failed to create booking:', error);
      toast.error('Could not create booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle next step
  const handleNextStep = () => {
    // Validate current step
    if (currentStep === 1) {
      if (!date || !timeSlot) {
        toast.error('Please select date and time');
        return;
      }
      if (duration === 'custom' && (!customDuration || Number(customDuration) < 1)) {
        toast.error('Please enter a valid duration');
        return;
      }
    } else if (currentStep === 2) {
      if (!location.trim()) {
        toast.error('Please enter a meeting location');
        return;
      }
    } else if (currentStep === 3) {
      if (!paymentOption) {
        toast.error('Please select a payment option');
        return;
      }
      
      // Create booking when confirming the payment option
      createBooking();
      return;
    }
    
    // Move to next step
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  // Handle previous step
  const handlePreviousStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  if (loading || isLoadingCompanion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#F3A522] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg">Loading your booking details...</p>
        </div>
      </div>
    );
  }

  // If we have a booking ID and payment option is "pay-now", show payment form
  if (bookingId && paymentOption === 'pay-now') {
    return (
      <div className="container mx-auto py-12 px-4 max-w-4xl">
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => setBookingId(null)}
            className="flex items-center"
          >
            <ChevronRight className="h-4 w-4 transform rotate-180 mr-2" />
            Back to booking
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Complete Your Payment</CardTitle>
            <CardDescription>
              Secure your booking with {companion?.user?.firstName} {companion?.user?.lastName}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EnhancedPaymentForm 
              bookingId={bookingId}
              amount={totalPrice}
              returnUrl={`/bookings/success?id=${bookingId}`}
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  // If we're matching a companion, show a loading state
  if (matchingCompanion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#F3A522] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold mb-3">Finding Your Perfect Companion</h2>
          <p className="text-lg text-gray-600 max-w-md">
            We're matching you with the best available local companion based on your preferences and schedule...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <div className="mb-8">
        <Link href={`/companions/${companionId}`} className="text-primary hover:underline flex items-center">
          <ChevronRight className="h-4 w-4 transform rotate-180 mr-2" />
          Back to companion profiles
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main content - booking form */}
        <div className="md:col-span-2">
          <Card className="shadow-md">
            <CardHeader className="border-b bg-muted/30">
              <CardTitle>Book Your Experience</CardTitle>
              <CardDescription>
                Plan your journey with a local companion in India
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {/* Progress indicator */}
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  {Array.from({ length: totalSteps }).map((_, i) => (
                    <div 
                      key={i}
                      className="flex items-center flex-1"
                    >
                      <div 
                        className={`flex items-center justify-center h-8 w-8 rounded-full ${
                          i + 1 < currentStep 
                            ? 'bg-primary text-white' 
                            : i + 1 === currentStep
                              ? 'bg-primary/20 text-primary border-2 border-primary' 
                              : 'bg-gray-100 text-gray-400'
                        } font-medium text-sm`}
                      >
                        {i + 1 < currentStep ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          i + 1
                        )}
                      </div>
                      {i < totalSteps - 1 && (
                        <div 
                          className={`flex-1 h-1 ${
                            i + 1 < currentStep ? 'bg-primary' : 'bg-gray-200'
                          } mx-2`}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span className={currentStep >= 1 ? 'text-primary font-medium' : ''}>
                    Date & Time
                  </span>
                  <span className={currentStep >= 2 ? 'text-primary font-medium' : ''}>
                    Meeting Details
                  </span>
                  <span className={currentStep >= 3 ? 'text-primary font-medium' : ''}>
                    Payment Options
                  </span>
                </div>
              </div>
              
              {/* Step 1: Date, Time & Duration */}
              {currentStep === 1 && (
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
                      {TIME_SLOTS.map((slot) => (
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
                      {DURATION_OPTIONS.map((option) => (
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
                          {TIME_SLOTS.find(s => s.value === timeSlot)?.label.split('(')[1].replace(')', '')} &middot; {' '}
                          {duration === 'custom' ? customDuration : duration} hours
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 2: Location & Notes */}
              {currentStep === 2 && (
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
                          {TIME_SLOTS.find(s => s.value === timeSlot)?.label.split('(')[1].replace(')', '')}
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
              )}
              
              {/* Step 3: Payment Options */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <PaymentOptionSelector 
                    price={totalPrice}
                    selectedOption={paymentOption}
                    onSelectOption={setPaymentOption}
                  />
                  
                  <div className="pt-4 border-t">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <CalendarIcon className="h-5 w-5 text-primary mr-2" />
                        <p className="text-gray-600">
                          {date ? format(date, 'MMMM d, yyyy') : 'Select date'} &middot; {' '}
                          {TIME_SLOTS.find(s => s.value === timeSlot)?.label.split('(')[1].replace(')', '')}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-primary mr-2" />
                        <p className="text-gray-600">
                          Duration: {duration === 'custom' ? customDuration : duration} hours
                        </p>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-primary mr-2" />
                        <p className="text-gray-600">
                          Meeting at: {location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Navigation buttons */}
              <div className="flex justify-between mt-8">
                {currentStep > 1 ? (
                  <Button 
                    variant="outline" 
                    onClick={handlePreviousStep}
                    disabled={submitting}
                  >
                    Previous
                  </Button>
                ) : (
                  <div></div> // Empty div to maintain flex layout
                )}
                
                <Button 
                  onClick={handleNextStep}
                  disabled={submitting}
                  className="ml-auto"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : currentStep === totalSteps ? (
                    paymentOption === 'pay-now' ? 'Continue to Payment' : 'Confirm Booking'
                  ) : (
                    'Next'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar - pricing information */}
        <div className="md:col-span-1">
          <Card className="sticky top-6 shadow-md">
            <CardHeader className="border-b">
              <CardTitle className="text-lg">Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
              {/* Price breakdown */}
              <div>
                <h3 className="text-sm font-medium mb-3">Price Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base rate</span>
                    <span>₹{companion?.hourlyRate?.toFixed(2)}/hour</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span>{duration === 'custom' ? customDuration : duration} hours</span>
                  </div>
                  {/* You can add service fee, taxes, etc. here */}
                  <div className="pt-2 mt-2 border-t border-dashed flex justify-between font-semibold">
                    <span>Total Price</span>
                    <span className="text-lg">₹{totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              {/* What's included */}
              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-3">What's Included</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="h-5 w-5 text-green-500 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </span>
                    <span className="text-sm">Personal local companion for the entire duration</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 text-green-500 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </span>
                    <span className="text-sm">Communication assistance & translation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 text-green-500 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </span>
                    <span className="text-sm">Help with navigation & local transport</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 text-green-500 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </span>
                    <span className="text-sm">Protection from tourist scams & inflated prices</span>
                  </li>
                </ul>
              </div>
              
              {/* What's not included */}
              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-3">Not Included</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="h-5 w-5 text-red-500 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </span>
                    <span className="text-sm">Entrance fees for attractions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 text-red-500 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </span>
                    <span className="text-sm">Food and drinks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 text-red-500 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </span>
                    <span className="text-sm">Transportation costs</span>
                  </li>
                </ul>
              </div>
              
              {/* Cancellation policy */}
              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-2">Cancellation Policy</h3>
                <p className="text-sm text-gray-600">
                  Free cancellation up to 24 hours before the start time. 
                  Cancel within 24 hours for a 50% refund.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}