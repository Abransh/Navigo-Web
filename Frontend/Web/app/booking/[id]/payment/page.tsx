// app/bookings/[id]/payment/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/contexts/auth-context';
import bookingService from '@/services/booking-service';
import { format } from 'date-fns';
import StripePaymentForm from '@/components/payment/StripePaymentForm';
import { BookingStatus } from '@/services/booking-service';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, MapPin, Clock, CreditCard, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function BookingPaymentPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const { id: bookingId } = params;
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [booking, setBooking] = useState<any>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !isAuthenticated) {
      router.push(`/login?redirectTo=/bookings/${bookingId}/payment`);
      return;
    }

    const fetchBookingDetails = async () => {
      try {
        const data = await bookingService.getBookingById(bookingId);
        setBooking(data);
        
        // If booking is already paid or cancelled, redirect to booking details
        if (data.status === BookingStatus.CANCELLED) {
          router.push(`/bookings/${bookingId}?error=booking_cancelled`);
          return;
        }
        
        // Example logic - update with actual validation
        if (data.payments && data.payments.some(p => p.status === 'completed')) {
          router.push(`/bookings/${bookingId}?error=already_paid`);
          return;
        }
      } catch (err: any) {
        console.error('Failed to fetch booking details:', err);
        setError(err.message || 'Failed to load booking details. Please try again.');
      } finally {
        setPageLoading(false);
      }
    };

    if (isAuthenticated && !loading) {
      fetchBookingDetails();
    }
  }, [bookingId, isAuthenticated, loading, router]);

  if (loading || pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-xl">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-4xl py-12 px-4">
        <Card className="border-red-200 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center text-red-700">
              <AlertCircle className="mr-2" />
              Error Loading Payment
            </CardTitle>
            <CardDescription>We encountered a problem while loading your payment details</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6">{error}</p>
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                onClick={() => router.push(`/bookings/${bookingId}`)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Booking
              </Button>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="container mx-auto max-w-4xl py-12 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Booking Not Found</CardTitle>
            <CardDescription>
              We couldn't find the booking you're looking for
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6">The booking may have been cancelled or doesn't exist.</p>
            <Link href="/bookings">
              <Button>View All Bookings</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const startDate = new Date(booking.startDate);
  const endDate = new Date(booking.endDate);
  const depositAmount = booking.totalAmount * 0.2; // 20% deposit
  
  return (
    <div className="container mx-auto max-w-5xl py-12 px-4">
      <div className="mb-8">
        <Link 
          href={`/bookings/${bookingId}`}
          className="inline-flex items-center text-primary hover:text-primary/80"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Booking Details
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Payment Form Section */}
        <div className="lg:col-span-3">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Complete Your Payment</CardTitle>
              <CardDescription>
                Secure payment for your booking with {booking.companion?.user?.firstName || 'your companion'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <StripePaymentForm 
                bookingId={bookingId} 
                amount={depositAmount}
                returnUrl={`/bookings/success?id=${bookingId}`}
              />
              
              <div className="mt-6 pt-4 border-t text-sm text-gray-500">
                <p className="flex items-center mb-2">
                  <CreditCard className="h-4 w-4 mr-2 text-primary" />
                  Your payment is secured and encrypted
                </p>
                <p>
                  You're only paying the initial deposit now. The remaining amount will be collected when you meet your companion.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Booking Summary Section */}
        <div className="lg:col-span-2">
          <Card className="shadow-md">
            <CardHeader className="bg-gray-50 rounded-t-lg">
              <CardTitle className="text-lg">Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {/* Companion info */}
              <div className="flex items-center mb-6">
                <div className="relative w-12 h-12 mr-4 rounded-full overflow-hidden">
                  <Image 
                    src={booking.companion?.user?.profilePicture || "/placeholder.svg"} 
                    alt={booking.companion?.user?.firstName || 'Companion'} 
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">
                    {booking.companion?.user?.firstName} {booking.companion?.user?.lastName}
                  </h3>
                  {booking.companion?.languages && (
                    <p className="text-sm text-gray-600">
                      Speaks: {booking.companion.languages.join(', ')}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Booking details */}
              <div className="space-y-4 py-4 border-t border-b">
                <div className="flex">
                  <Calendar className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Dates</p>
                    <p className="text-gray-600">
                      {format(startDate, 'MMM d, yyyy')} - {format(endDate, 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <Clock className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Time</p>
                    <p className="text-gray-600">
                      {format(startDate, 'h:mm a')} - {format(endDate, 'h:mm a')}
                    </p>
                  </div>
                </div>
                
                {booking.location && (
                  <div className="flex">
                    <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-gray-600">{booking.location}</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Payment breakdown */}
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Total price</span>
                  <span>₹{booking.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-primary">
                  <span>Initial payment (20%)</span>
                  <span>₹{depositAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Remaining (to be paid in person)</span>
                  <span>₹{(booking.totalAmount - depositAmount).toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}