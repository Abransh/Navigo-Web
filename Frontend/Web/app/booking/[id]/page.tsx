// app/booking/[id]/page.tsx (Refactored)
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { addHours, setHours, setMinutes, isBefore, addDays } from 'date-fns';
import { ChevronRight, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import PaymentOptionSelector from '@/components/payment/PaymentOptionSelector';
import bookingService from '@/services/booking-service';
import companionService from '@/services/companion-service';

// Import our refactored components
import { BookingSteps } from '@/components/booking/BookingSteps';
import { DateTimeSelector } from '@/components/booking/DateTimeSelector';
import { MeetingDetails } from '@/components/booking/MeetingDetails';
import { BookingSummary } from '@/components/booking/BookingSummary';

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
        
        // Replace with real API call when backend is ready
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

  // Auto-match companion (placeholder for now)
  const findMatchingCompanion = async () => {
    if (!date || !timeSlot || !location) return false;
    
    try {
      setMatchingCompanion(true);
      
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

  // If payment flow is active
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
            {/* Payment component would go here */}
            <p>Payment processing UI would be here.</p>
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
              <BookingSteps currentStep={currentStep} totalSteps={totalSteps} />
              
              {/* Step 1: Date, Time & Duration */}
              {currentStep === 1 && (
                <DateTimeSelector
                  date={date}
                  setDate={setDate}
                  timeSlot={timeSlot}
                  setTimeSlot={setTimeSlot}
                  duration={duration}
                  setDuration={setDuration}
                  customDuration={customDuration}
                  setCustomDuration={setCustomDuration}
                  timeSlots={TIME_SLOTS}
                  durationOptions={DURATION_OPTIONS}
                />
              )}
              
              {/* Step 2: Location & Notes */}
              {currentStep === 2 && (
                <MeetingDetails
                  location={location}
                  setLocation={setLocation}
                  notes={notes}
                  setNotes={setNotes}
                  date={date}
                  timeSlot={timeSlot}
                  duration={duration}
                  customDuration={customDuration}
                  timeSlots={TIME_SLOTS}
                />
              )}
              
              {/* Step 3: Payment Options */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <PaymentOptionSelector 
                    price={totalPrice}
                    selectedOption={paymentOption}
                    onSelectOption={setPaymentOption}
                  />
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
          <BookingSummary companion={companion} totalPrice={totalPrice} />
        </div>
      </div>
    </div>
  );
}