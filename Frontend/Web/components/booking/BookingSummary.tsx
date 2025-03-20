// components/booking/BookingSummary.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BookingSummaryProps {
  companion: any;
  totalPrice: number;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({
  companion,
  totalPrice
}) => {
  return (
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
              <span>{companion?.duration || "3"} hours</span>
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
  );
};