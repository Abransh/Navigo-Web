// // app/booking/[companionId]/page.tsx
// "use client";

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/contexts/auth-context';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Calendar } from '@/components/ui/calendar';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea'; // Ensure this path is correct or update it to the correct path
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { 
//   Popover, 
//   PopoverContent, 
//   PopoverTrigger 
// } from '@/components/ui/popover';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { format, addHours, setHours, setMinutes, isBefore, addDays } from 'date-fns';
// import { CalendarIcon, Clock, ChevronRight, Loader2, MapPin } from 'lucide-react';
// import { toast } from 'react-hot-toast';
// import PaymentOptionSelector from '@/components/payment/PaymentOptionSelector';
// import EnhancedPaymentForm from '@/components/payment/EnhancedPaymentForm';
// import bookingService from '@/services/booking-service';

// // Time slot options
// const TIME_SLOTS = [
//   { label: 'Morning (9:00 AM - 12:00 PM)', value: '09:00' },
//   { label: 'Afternoon (12:00 PM - 3:00 PM)', value: '12:00' },
//   { label: 'Evening (3:00 PM - 6:00 PM)', value: '15:00' },
//   { label: 'Night (6:00 PM - 9:00 PM)', value: '18:00' },
// ];

// // Duration options
// const DURATION_OPTIONS = [
//   { label: '3 hours', value: '3' },
//   { label: '6 hours', value: '6' },
//   { label: 'Full day (9 hours)', value: '9' },
//   { label: 'Custom', value: 'custom' },
// ];

// // Helper function to parse time string to date
// const parseTimeString = (timeString: string, baseDate: Date): Date => {
//   const [hours, minutes] = timeString.split(':').map(Number);
//   return setMinutes(setHours(baseDate, hours), minutes);
// };

// export default function BookingPage({ params }: { params: { companionId: string } }) {
//   const { companionId } = params;
//   const { isAuthenticated, loading } = useAuth();
//   const router = useRouter();
//   const [companion, setCompanion] = useState<any>(null);
//   const [isLoadingCompanion, setIsLoadingCompanion] = useState(true);
//   const [currentStep, setCurrentStep] = useState(1);
//   const [totalSteps] = useState(3);
//   const [loadingPrice, setLoadingPrice] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
  
//   // Form data
//   const [date, setDate] = useState<Date | undefined>(addDays(new Date(), 1));
//   const [timeSlot, setTimeSlot] = useState('09:00');
//   const [duration, setDuration] = useState('3');
//   const [customDuration, setCustomDuration] = useState('4');
//   const [location, setLocation] = useState('');
//   const [notes, setNotes] = useState('');
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [paymentOption, setPaymentOption] = useState<'pay-now' | 'pay-later' | null>(null);
//   const [bookingId, setBookingId] = useState<string | null>(null);

//   // Calculate dates and times
//   const startTime = date ? parseTimeString(timeSlot, date) : undefined;
//   const durationHours = duration === 'custom' ? Number(customDuration) : Number(duration);
//   const endTime = startTime ? addHours(startTime, durationHours) : undefined;

//   // Fetch companion details
//   useEffect(() => {
//     const fetchCompanion = async () => {
//       try {
//         setIsLoadingCompanion(true);
//         // In a real app, replace with actual API call
//         // const data = await companionService.getCompanion(companionId);
        
//         // Mock data for now
//         const mockCompanion = {
//           id: companionId,
//           user: {
//             firstName: 'Rahul',
//             lastName: 'Sharma',
//             profilePicture: '/placeholder.svg',
//           },
//           bio: 'Experienced guide with knowledge of local history and culture.',
//           languages: ['English', 'Hindi', 'French'],
//           specialties: ['History', 'Food', 'Architecture'],
//           hourlyRate: 20,
//           averageRating: 4.8,
//           totalReviews: 24,
//         };
        
//         setCompanion(mockCompanion);
        
//         // Calculate initial price
//         calculatePrice(mockCompanion.hourlyRate);
//       } catch (error) {
//         console.error('Failed to fetch companion details:', error);
//         toast.error('Could not load companion details. Please try again.');
//       } finally {
//         setIsLoadingCompanion(false);
//       }
//     };

//     if (!loading && isAuthenticated) {
//       fetchCompanion();
//     } else if (!loading && !isAuthenticated) {
//       router.push(`/login?redirectTo=/booking/${companionId}`);
//     }
//   }, [companionId, isAuthenticated, loading, router]);

//   // Calculate price when duration or hourly rate changes
//   useEffect(() => {
//     if (companion?.hourlyRate) {
//       calculatePrice(companion.hourlyRate);
//     }
//   }, [duration, customDuration, companion?.hourlyRate]);

//   const calculatePrice = (hourlyRate: number) => {
//     const hours = duration === 'custom' ? Number(customDuration) : Number(duration);
//     setTotalPrice(hourlyRate * hours);
//   };

//   // Handle booking calculation from API
//   const calculatePriceFromAPI = async () => {
//     if (!startTime || !endTime) return;
    
//     try {
//       setLoadingPrice(true);
//       // In a real app, use actual API call
//       // const result = await bookingService.calculatePrice(
//       //   companionId,
//       //   startTime.toISOString(),
//       //   endTime.toISOString()
//       // );
//       // setTotalPrice(result.totalAmount);
      
//       // Mock calculation for now
//       setTotalPrice(companion.hourlyRate * durationHours);
//     } catch (error) {
//       console.error('Failed to calculate price:', error);
//       toast.error('Could not calculate price. Please try again.');
//     } finally {
//       setLoadingPrice(false);
//     }
//   };

//   // Create booking
//   const createBooking = async () => {
//     if (!startTime || !endTime || !location) {
//       toast.error('Please complete all required fields');
//       return;
//     }
    
//     try {
//       setSubmitting(true);
      
//       // In a real app, use actual API call
//       // const booking = await bookingService.createBooking({
//       //   companionId,
//       //   startDate: startTime.toISOString(),
//       //   endDate: endTime.toISOString(),
//       //   location,
//       //   notes,
//       // });
      
//       // Mock booking response
//       const mockBooking = {
//         id: 'booking_' + Math.random().toString(36).substr(2, 9),
//         companionId,
//         startDate: startTime.toISOString(),
//         endDate: endTime.toISOString(),
//         location,
//         notes,
//         totalAmount: totalPrice,
//         status: 'pending',
//       };
      
//       // Set the booking ID for payment processing
//       setBookingId(mockBooking.id);
      
//       // If "Pay Later" option is selected, redirect to success page
//       if (paymentOption === 'pay-later') {
//         toast.success('Booking confirmed! Payment will be collected after the tour.');
//         router.push(`/bookings/success?id=${mockBooking.id}`);
//       }
      
//       // If "Pay Now" option is selected, move to payment form step
//       // (This happens automatically since bookingId is now set)
      
//     } catch (error) {
//       console.error('Failed to create booking:', error);
//       toast.error('Could not create booking. Please try again.');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // Handle next step
//   const handleNextStep = () => {
//     // Validate current step
//     if (currentStep === 1) {
//       if (!date || !timeSlot) {
//         toast.error('Please select date and time');
//         return;
//       }
//       if (duration === 'custom' && (!customDuration || Number(customDuration) < 1)) {
//         toast.error('Please enter a valid duration');
//         return;
//       }
//     } else if (currentStep === 2) {
//       if (!location.trim()) {
//         toast.error('Please enter a meeting location');
//         return;
//       }
//     } else if (currentStep === 3) {
//       if (!paymentOption) {
//         toast.error('Please select a payment option');
//         return;
//       }
      
//       // Create booking when confirming the payment option
//       createBooking();
//       return;
//     }
    
//     // Move to next step
//     setCurrentStep(prev => Math.min(prev + 1, totalSteps));
//   };

//   // Handle previous step
//   const handlePreviousStep = () => {
//     setCurrentStep(prev => Math.max(prev - 1, 1));
//   };

//   if (loading || isLoadingCompanion) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
//           <p className="text-xl">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   // If we have a booking ID and payment option is "pay-now", show payment form
//   if (bookingId && paymentOption === 'pay-now') {
//     return (
//       <div className="container mx-auto py-12 px-4 max-w-4xl">
//         <div className="mb-8">
//           <Button 
//             variant="outline" 
//             onClick={() => setBookingId(null)}
//             className="flex items-center"
//           >
//             <ChevronRight className="h-4 w-4 transform rotate-180 mr-2" />
//             Back to booking
//           </Button>
//         </div>
        
//         <Card>
//           <CardHeader>
//             <CardTitle>Complete Your Payment</CardTitle>
//             <CardDescription>
//               Secure your booking with {companion?.user?.firstName} {companion?.user?.lastName}
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <EnhancedPaymentForm 
//               bookingId={bookingId}
//               amount={totalPrice}
//               returnUrl={`/bookings/success?id=${bookingId}`}
//             />
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto py-12 px-4 max-w-4xl">
//       <div className="mb-8">
//         <Link href={`/companions/${companionId}`} className="text-primary hover:underline">
//           &larr; Back to companion profile
//         </Link>
//       </div>
      
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {/* Main content - booking form */}
//         <div className="md:col-span-2">
//           <Card>
//             <CardHeader>
//               <CardTitle>Book Your Experience</CardTitle>
//               <CardDescription>
//                 Plan your journey with {companion?.user?.firstName} {companion?.user?.lastName}
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               {/* Progress indicator */}
//               <div className="mb-8">
//                 <div className="flex justify-between mb-2">
//                   {Array.from({ length: totalSteps }).map((_, i) => (
//                     <div 
//                       key={i}
//                       className={`flex-1 h-2 rounded-full mx-1 ${
//                         i + 1 <= currentStep ? 'bg-primary' : 'bg-gray-200'
//                       }`}
//                     />
//                   ))}
//                 </CardContent>
//           </Card>
//         </div>
        
//         {/* Sidebar - companion info & pricing */}
//         <div className="md:col-span-1">
//           <Card className="sticky top-6">
//             <CardHeader className="pb-3">
//               <CardTitle>Your Companion</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               {/* Companion info */}
//               <div className="flex items-center">
//                 <div className="relative h-16 w-16 overflow-hidden rounded-full mr-4">
//                   <Image
//                     src={companion?.user?.profilePicture || "/placeholder.svg"}
//                     alt={`${companion?.user?.firstName} ${companion?.user?.lastName}`}
//                     fill
//                     className="object-cover"
//                   />
//                 </div>
//                 <div>
//                   <h3 className="font-medium text-lg">
//                     {companion?.user?.firstName} {companion?.user?.lastName}
//                   </h3>
//                   {companion?.averageRating && (
//                     <div className="flex items-center text-sm text-amber-500">
//                       {'★'.repeat(Math.floor(companion.averageRating))}
//                       <span className="ml-1 text-gray-600">
//                         {companion.averageRating.toFixed(1)} ({companion.totalReviews} reviews)
//                       </span>
//                     </div>
//                   )}
//                 </div>
//               </div>
              
//               {/* Languages */}
//               {companion?.languages && companion.languages.length > 0 && (
//                 <div>
//                   <h4 className="text-sm font-medium mb-2">Languages</h4>
//                   <div className="flex flex-wrap gap-2">
//                     {companion.languages.map((lang: string) => (
//                       <span 
//                         key={lang} 
//                         className="inline-flex items-center rounded-full border border-gray-200 px-2.5 py-0.5 text-xs"
//                       >
//                         {lang}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}
              
//               {/* Specialties */}
//               {companion?.specialties && companion.specialties.length > 0 && (
//                 <div>
//                   <h4 className="text-sm font-medium mb-2">Specialties</h4>
//                   <div className="flex flex-wrap gap-2">
//                     {companion.specialties.map((specialty: string) => (
//                       <span 
//                         key={specialty} 
//                         className="inline-flex items-center rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-xs"
//                       >
//                         {specialty}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}
              
//               {/* Pricing */}
//               <div className="border-t pt-4 mt-4">
//                 <h4 className="text-sm font-medium mb-2">Pricing</h4>
//                 <div className="flex justify-between mb-2">
//                   <span>Hourly rate</span>
//                   <span>₹{companion?.hourlyRate.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between mb-2">
//                   <span>Duration</span>
//                   <span>{duration === 'custom' ? customDuration : duration} hours</span>
//                 </div>
//                 <div className="flex justify-between font-medium text-lg border-t pt-2 mt-2">
//                   <span>Total</span>
//                   <span>₹{totalPrice.toFixed(2)}</span>
//                 </div>
//                 {loadingPrice && (
//                   <div className="flex justify-center mt-2">
//                     <Loader2 className="h-4 w-4 animate-spin text-primary" />
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }>
//                 <div className="flex justify-between text-sm text-gray-500">
//                   <span>Select date & time</span>
//                   <span>Meeting details</span>
//                   <span>Payment options</span>
//                 </div>
//               </div>
              
//               {/* Step 1: Date, Time & Duration */}
//               {currentStep === 1 && (
//                 <div className="space-y-6">
//                   <div>
//                     <h3 className="text-lg font-medium mb-4">Select your preferred date</h3>
//                     <Calendar
//                       mode="single"
//                       selected={date}
//                       onSelect={setDate}
//                       disabled={(date) => isBefore(date, new Date()) || date.getDay() === 0}
//                       className="rounded-md border shadow mx-auto"
//                     />
//                   </div>
                  
//                   <div>
//                     <h3 className="text-lg font-medium mb-4">Choose a time slot</h3>
//                     <RadioGroup value={timeSlot} onValueChange={setTimeSlot} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       {TIME_SLOTS.map((slot) => (
//                         <div key={slot.value} className="flex items-center space-x-2">
//                           <RadioGroupItem value={slot.value} id={`time-${slot.value}`} />
//                           <Label htmlFor={`time-${slot.value}`} className="flex items-center cursor-pointer">
//                             <Clock className="h-4 w-4 mr-2 text-primary" />
//                             {slot.label}
//                           </Label>
//                         </div>
//                       ))}
//                     </RadioGroup>
//                   </div>
                  
//                   <div>
//                     <h3 className="text-lg font-medium mb-4">Select duration</h3>
//                     <RadioGroup value={duration} onValueChange={setDuration} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//                       {DURATION_OPTIONS.map((option) => (
//                         <div key={option.value} className="flex items-center space-x-2">
//                           <RadioGroupItem value={option.value} id={`duration-${option.value}`} />
//                           <Label htmlFor={`duration-${option.value}`} className="cursor-pointer">
//                             {option.label}
//                           </Label>
//                         </div>
//                       ))}
//                     </RadioGroup>
                    
//                     {duration === 'custom' && (
//                       <div className="mt-4">
//                         <Label htmlFor="custom-duration" className="mb-2 block">
//                           Custom duration (hours)
//                         </Label>
//                         <Input 
//                           id="custom-duration"
//                           type="number"
//                           value={customDuration}
//                           onChange={(e) => setCustomDuration(e.target.value)}
//                           min="1"
//                           max="12"
//                           className="w-full"
//                         />
//                       </div>
//                     )}
//                   </div>
                  
//                   <div className="pt-4 border-t">
//                     <div className="flex items-center justify-between">
//                       <p className="text-gray-600">
//                         {date ? format(date, 'MMMM d, yyyy') : 'Select date'} &middot; {' '}
//                         {TIME_SLOTS.find(s => s.value === timeSlot)?.label.split('(')[1].replace(')', '')}
//                       </p>
//                       <p className="text-gray-600">
//                         Duration: {duration === 'custom' ? customDuration : duration} hours
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )}
              
//               {/* Step 2: Location & Notes */}
//               {currentStep === 2 && (
//                 <div className="space-y-6">
//                   <div>
//                     <h3 className="text-lg font-medium mb-4">Meeting location</h3>
//                     <div className="flex items-start space-x-2 mb-2">
//                       <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
//                       <p className="text-gray-600">
//                         Specify where you'd like to meet your companion. Be as specific as possible
//                         for a smooth start to your experience.
//                       </p>
//                     </div>
//                     <Input 
//                       placeholder="e.g., Main entrance of Taj Mahal, Agra"
//                       value={location}
//                       onChange={(e) => setLocation(e.target.value)}
//                       className="w-full"
//                     />
//                   </div>
                  
//                   <div>
//                     <h3 className="text-lg font-medium mb-4">Additional notes (optional)</h3>
//                     <Textarea 
//                       placeholder="Any specific interests, preferences, or requirements you'd like to share..."
//                       value={notes}
//                       onChange={(e) => setNotes(e.target.value)}
//                       className="w-full min-h-[150px]"
//                     />
//                   </div>
                  
//                   <div className="pt-4 border-t">
//                     <div className="space-y-2">
//                       <div className="flex items-center">
//                         <CalendarIcon className="h-5 w-5 text-primary mr-2" />
//                         <p className="text-gray-600">
//                           {date ? format(date, 'MMMM d, yyyy') : 'Select date'} &middot; {' '}
//                           {TIME_SLOTS.find(s => s.value === timeSlot)?.label.split('(')[1].replace(')', '')}
//                         </p>
//                       </div>
//                       <div className="flex items-center">
//                         <Clock className="h-5 w-5 text-primary mr-2" />
//                         <p className="text-gray-600">
//                           Duration: {duration === 'custom' ? customDuration : duration} hours
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
              
//               {/* Step 3: Payment Options */}
//               {currentStep === 3 && (
//                 <div className="space-y-6">
//                   <PaymentOptionSelector 
//                     price={totalPrice}
//                     selectedOption={paymentOption}
//                     onSelectOption={setPaymentOption}
//                   />
                  
//                   <div className="pt-4 border-t">
//                     <div className="space-y-2">
//                       <div className="flex items-center">
//                         <CalendarIcon className="h-5 w-5 text-primary mr-2" />
//                         <p className="text-gray-600">
//                           {date ? format(date, 'MMMM d, yyyy') : 'Select date'} &middot; {' '}
//                           {TIME_SLOTS.find(s => s.value === timeSlot)?.label.split('(')[1].replace(')', '')}
//                         </p>
//                       </div>
//                       <div className="flex items-center">
//                         <Clock className="h-5 w-5 text-primary mr-2" />
//                         <p className="text-gray-600">
//                           Duration: {duration === 'custom' ? customDuration : duration} hours
//                         </p>
//                       </div>
//                       <div className="flex items-center">
//                         <MapPin className="h-5 w-5 text-primary mr-2" />
//                         <p className="text-gray-600">
//                           Meeting at: {location}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
              
//               {/* Navigation buttons */}
//               <div className="flex justify-between mt-8">
//                 {currentStep > 1 ? (
//                   <Button 
//                     variant="outline" 
//                     onClick={handlePreviousStep}
//                     disabled={submitting}
//                   >
//                     Previous
//                   </Button>
//                 ) : (
//                   <div></div> // Empty div to maintain flex layout
//                 )}
                
//                 <Button 
//                   onClick={handleNextStep}
//                   disabled={submitting}
//                   className="ml-auto"
//                 >
//                   {submitting ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Processing...
//                     </>
//                   ) : currentStep === totalSteps ? (
//                     paymentOption === 'pay-now' ? 'Continue to Payment' : 'Confirm Booking'
//                   ) : (
//                     'Next'
//                   )}
//                 </Button>
//               </div>
//             </div>