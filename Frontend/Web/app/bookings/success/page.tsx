// app/bookings/success/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CheckCircle, Calendar, Share2, Download, User } from 'lucide-react';
import { format } from 'date-fns';

export default function BookingSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookingId = searchParams.get('id');
  const [loading, setLoading] = useState(true);
  
  // In a real app, you would fetch the booking details from the API
  // For demo purposes, we'll use mock data
  const [booking, setBooking] = useState<any>({
    id: bookingId || 'demo-123',
    status: 'confirmed',
    destination: 'Varanasi',
    startDate: new Date(),
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    companion: {
      name: 'Rahul Sharma',
      profileImage: '/placeholder.svg',
      phone: '+91 98765 43210',
      email: 'rahul@example.com',
    },
    totalAmount: 360.00,
    depositAmount: 72.00,
  });

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    // In a real app:
    // const fetchBookingDetails = async () => {
    //   try {
    //     setLoading(true);
    //     const data = await bookingService.getBookingById(bookingId);
    //     setBooking(data);
    //   } catch (err) {
    //     console.error('Failed to fetch booking details:', err);
    //     router.push('/bookings');
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // 
    // if (bookingId) {
    //   fetchBookingDetails();
    // } else {
    //   router.push('/bookings');
    // }
  }, [bookingId, router]);

  const handleShareBooking = () => {
    // In a real app, implement sharing functionality
    // For demo purposes, we'll just copy to clipboard
    navigator.clipboard.writeText(
      `Check out my upcoming trip to ${booking.destination} with Navigo! Booking reference: ${booking.id}`
    );
    
    alert('Booking details copied to clipboard for sharing!');
  };

  const handleDownloadDetails = () => {
    // In a real app, generate a PDF or other file for download
    // For demo purposes, just show an alert
    alert('Booking details would be downloaded in a real app implementation.');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#F3A522] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg">Loading your booking details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Banner */}
        <div className="bg-green-50 rounded-xl p-6 flex items-center mb-8">
          <CheckCircle className="h-12 w-12 text-green-500 mr-6" />
          <div>
            <h1 className="text-2xl font-bold text-green-700">Booking Confirmed!</h1>
            <p className="text-green-600">
              Your trip to {booking.destination} has been successfully booked.
              <br />
              Booking reference: <span className="font-medium">{booking.id}</span>
            </p>
          </div>
        </div>
        
        {/* Booking Details Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="bg-[#003366] text-white p-6">
            <h2 className="text-xl font-bold">Trip to {booking.destination}</h2>
            <p className="text-white/80">
              {format(booking.startDate, 'PPP')} to {format(booking.endDate, 'PPP')}
            </p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Trip Details */}
              <div>
                <h3 className="text-lg font-medium mb-4">Trip Details</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-[#F3A522] mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Dates</p>
                      <p className="text-gray-600">
                        {format(booking.startDate, 'PPPP')} - 
                        <br className="md:hidden" /> {format(booking.endDate, 'PPPP')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-5 w-5 flex items-center justify-center text-[#F3A522] mr-3">📍</div>
                    <div>
                      <p className="font-medium">Destination</p>
                      <p className="text-gray-600">{booking.destination}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-5 w-5 flex items-center justify-center text-[#F3A522] mr-3">💰</div>
                    <div>
                      <p className="font-medium">Payment</p>
                      <p className="text-gray-600">
                        ${booking.depositAmount.toFixed(2)} deposit paid
                        <br />
                        ${(booking.totalAmount - booking.depositAmount).toFixed(2)} due at the start of your trip
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Companion Details */}
              <div className="border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-8">
                <h3 className="text-lg font-medium mb-4">Your Companion</h3>
                
                <div className="flex items-center mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                    <Image 
                      src={booking.companion.profileImage} 
                      alt={booking.companion.name} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-lg">{booking.companion.name}</p>
                    <div className="text-yellow-500 text-sm">
                      ★★★★★ <span className="text-gray-500">4.9</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 text-gray-600">
                  <p>
                    <span className="font-medium">Phone:</span> {booking.companion.phone}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span> {booking.companion.email}
                  </p>
                </div>
                
                <div className="mt-6">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-2"
                  >
                    <User className="h-4 w-4" />
                    Contact Your Companion
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Next Steps Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h3 className="text-lg font-medium mb-4">Next Steps</h3>
          
          <div className="space-y-4">
            <div className="flex">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#F3A522] text-white flex items-center justify-center mr-3">
                1
              </div>
              <div>
                <p className="font-medium">Check your email</p>
                <p className="text-gray-600">
                  We've sent a confirmation email with all the details of your booking.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#F3A522] text-white flex items-center justify-center mr-3">
                2
              </div>
              <div>
                <p className="font-medium">Review your itinerary</p>
                <p className="text-gray-600">
                  Your companion will create a personalized itinerary based on your preferences.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#F3A522] text-white flex items-center justify-center mr-3">
                3
              </div>
              <div>
                <p className="font-medium">Prepare for your trip</p>
                <p className="text-gray-600">
                  Check out our travel guides for {booking.destination} and pack accordingly.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={handleShareBooking}
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={handleDownloadDetails}
            >
              <Download className="h-4 w-4" />
              Download Details
            </Button>
          </div>
          
          <div className="flex gap-4">
            <Link href="/bookings">
              <Button 
                variant="outline"
              >
                View All Bookings
              </Button>
            </Link>
            
            <Link href="/">
              <Button 
                className="bg-[#F3A522] hover:bg-[#003366]"
              >
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}