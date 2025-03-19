// app/bookings/[id]/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import Image from 'next/image';
import Link from 'next/link';
import bookingService, { BookingStatus } from '@/services/booking-service';
import { format, formatDistanceToNow, isPast, isFuture } from 'date-fns';
import { toast } from 'react-hot-toast';
import { 
  AlertCircle,
  ArrowLeft, 
  Calendar, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  CreditCard, 
  MapPin, 
  MessageCircle, 
  Phone, 
  Star, 
  X,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineTitle,
  TimelineBody,
} from '@/components/ui/timeline';

// Helper function to get badge color based on status
const getStatusColor = (status: BookingStatus) => {
  switch (status) {
    case BookingStatus.PENDING:
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case BookingStatus.CONFIRMED:
      return 'bg-green-100 text-green-800 border-green-200';
    case BookingStatus.IN_PROGRESS:
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case BookingStatus.COMPLETED:
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case BookingStatus.CANCELLED:
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

// Status display component
const StatusBadge = ({ status }: { status: BookingStatus }) => {
  const colorClass = getStatusColor(status);
  return (
    <Badge variant="outline" className={`${colorClass} capitalize`}>
      {status.toLowerCase().replace('_', ' ')}
    </Badge>
  );
};

export default function BookingDetailsPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const { id: bookingId } = params;
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [booking, setBooking] = useState<any>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState<any[]>([]);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [error, setError] = useState<string | null>(searchParams.get('error'));
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [isCancelling, setIsCancelling] = useState(false);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !isAuthenticated) {
      router.push(`/login?redirectTo=/bookings/${bookingId}`);
      return;
    }

    const fetchBookingDetails = async () => {
      try {
        setPageLoading(true);
        const data = await bookingService.getBookingById(bookingId);
        setBooking(data);
        
        // Also fetch payment details
        setIsPaymentLoading(true);
        try {
          // In a real app, fetch payment details
          // const paymentsData = await paymentService.getPaymentsByBooking(bookingId);
          // setPaymentDetails(paymentsData);
          
          // For this example, create mock payment data
          if (data.status !== BookingStatus.PENDING && data.status !== BookingStatus.CANCELLED) {
            setPaymentDetails([
              {
                id: "pay_mock123",
                status: 'completed',
                amount: data.totalAmount * 0.2, // 20% deposit
                method: 'CREDIT_CARD',
                createdAt: new Date(new Date(data.startDate).getTime() - 86400000).toISOString(), // 1 day before start
              }
            ]);
          }
        } catch (err) {
          console.error('Failed to fetch payment details:', err);
          // Non-critical error, don't show to user
        } finally {
          setIsPaymentLoading(false);
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

  const handleCancelBooking = async () => {
    if (!cancelReason.trim()) {
      toast.error('Please provide a reason for cancellation');
      return;
    }
    
    try {
      setIsCancelling(true);
      await bookingService.cancelBooking(bookingId, cancelReason);
      toast.success('Booking cancelled successfully');
      setShowCancelDialog(false);
      
      // Refresh booking data
      const updatedBooking = await bookingService.getBookingById(bookingId);
      setBooking(updatedBooking);
    } catch (err: any) {
      console.error('Failed to cancel booking:', err);
      toast.error(err.message || 'Failed to cancel booking');
    } finally {
      setIsCancelling(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!reviewForm.comment.trim()) {
      toast.error('Please provide a comment for your review');
      return;
    }
    
    try {
      setIsSubmittingReview(true);
      // In a real app, submit the review
      // await reviewService.createReview({
      //   bookingId,
      //   rating: reviewForm.rating,
      //   comment: reviewForm.comment
      // });
      
      toast.success('Review submitted successfully');
      setShowReviewDialog(false);
      
      // Refresh booking data
      // const updatedBooking = await bookingService.getBookingById(bookingId);
      // setBooking(updatedBooking);
    } catch (err: any) {
      console.error('Failed to submit review:', err);
      toast.error(err.message || 'Failed to submit review');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  if (loading || pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-xl">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-4xl py-12 px-4">
        <div className="mb-8">
          <Link 
            href="/bookings"
            className="inline-flex items-center text-primary hover:text-primary/80"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Bookings
          </Link>
        </div>
        
        <Card className="border-red-200 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center text-red-700">
              <AlertCircle className="mr-2" />
              {error === 'booking_cancelled' 
                ? 'Booking has been cancelled' 
                : error === 'already_paid' 
                  ? 'Booking already paid'
                  : 'Error Loading Booking'}
            </CardTitle>
            <CardDescription>We encountered a problem while loading your booking details</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6">
              {error === 'booking_cancelled' 
                ? 'This booking has been cancelled and cannot be processed further.' 
                : error === 'already_paid' 
                  ? 'Your payment for this booking has already been processed.'
                  : 'Please try again or contact support if the problem persists.'}
            </p>
            <Button 
              onClick={() => router.push('/bookings')}
            >
              View All Bookings
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="container mx-auto max-w-4xl py-12 px-4">
        <div className="mb-8">
          <Link 
            href="/bookings"
            className="inline-flex items-center text-primary hover:text-primary/80"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Bookings
          </Link>
        </div>
        
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
  const isPastBooking = isPast(endDate);
  const isUpcoming = isFuture(startDate);
  const isPending = booking.status === BookingStatus.PENDING;
  const isConfirmed = booking.status === BookingStatus.CONFIRMED;
  const isInProgress = booking.status === BookingStatus.IN_PROGRESS;
  const isCompleted = booking.status === BookingStatus.COMPLETED;
  const isCancelled = booking.status === BookingStatus.CANCELLED;
  const canBeCancelled = (isPending || isConfirmed) && !isCancelled;
  const needsPayment = isPending && !paymentDetails.length;
  const canBeReviewed = isCompleted && !booking.reviews?.length;
  
  const companion = booking.companion;
  const companionUser = companion?.user || {};
  const companionName = companionUser 
    ? `${companionUser.firstName || ''} ${companionUser.lastName || ''}`.trim()
    : 'Unknown Companion';
  
  const profilePic = companionUser?.profilePicture || "/placeholder.svg";
  
  // Calculate time span
  const hours = Math.max(0.5, Math.abs(endDate.getTime() - startDate.getTime()) / 36e5);
  const depositAmount = booking.totalAmount * 0.2; // 20% deposit
  const remainingAmount = booking.totalAmount - depositAmount;

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="mb-8">
        <Link 
          href="/bookings"
          className="inline-flex items-center text-primary hover:text-primary/80"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Bookings
        </Link>
      </div>
      
      <Card className="shadow-md mb-8">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-sm">
                  <Image 
                    src={profilePic} 
                    alt={companionName} 
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <CardTitle className="text-xl">
                    Booking with {companionName}
                  </CardTitle>
                  <CardDescription>
                    {format(startDate, 'MMMM d, yyyy')}
                  </CardDescription>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <StatusBadge status={booking.status} />
              <p className="text-sm text-gray-500">
                Booking ID: {booking.id.slice(0, 8)}
              </p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left column - Booking details */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <div className="flex">
                  <Calendar className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Dates</p>
                    <p className="text-gray-700">
                      {format(startDate, 'MMMM d, yyyy')} - {format(endDate, 'MMMM d, yyyy')}
                    </p>
                    <p className="text-sm text-gray-500">
                      {format(startDate, 'h:mm a')} - {format(endDate, 'h:mm a')}
                    </p>
                  </div>
                </div>
                
                {booking.location && (
                  <div className="flex">
                    <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-gray-700">{booking.location}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex">
                  <Clock className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Duration</p>
                    <p className="text-gray-700">
                      {hours.toFixed(1)} hours
                      {isPastBooking 
                        ? ` (Completed ${formatDistanceToNow(endDate, { addSuffix: true })})` 
                        : isUpcoming
                          ? ` (Starting ${formatDistanceToNow(startDate, { addSuffix: true })})`
                          : ' (In progress)'}
                    </p>
                  </div>
                </div>
              </div>
              
              {booking.notes && (
                <div>
                  <h3 className="font-medium mb-2">Notes</h3>
                  <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded border border-gray-100">
                    {booking.notes}
                  </p>
                </div>
              )}
              
              {/* Timeline - Status history */}
              <div>
                <h3 className="font-medium mb-3">Booking Timeline</h3>
                <Timeline>
                  <TimelineItem>
                    <TimelineConnector />
                    <TimelineHeader>
                      <TimelineIcon className={isCancelled ? "bg-gray-200" : "bg-green-500"}>
                        {isCancelled ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                      </TimelineIcon>
                      <TimelineTitle>Booking Created</TimelineTitle>
                    </TimelineHeader>
                    <TimelineBody>
                      <p className="text-sm text-gray-500">
                        {format(new Date(booking.createdAt), 'MMM d, yyyy - h:mm a')}
                      </p>
                    </TimelineBody>
                  </TimelineItem>
                  
                  <TimelineItem>
                    <TimelineConnector />
                    <TimelineHeader>
                      <TimelineIcon className={
                        isCancelled 
                          ? "bg-gray-200" 
                          : paymentDetails.length 
                            ? "bg-green-500" 
                            : "bg-gray-200"
                      }>
                        {isCancelled 
                          ? <X className="h-4 w-4" /> 
                          : paymentDetails.length 
                            ? <Check className="h-4 w-4" /> 
                            : <CreditCard className="h-4 w-4" />}
                      </TimelineIcon>
                      <TimelineTitle>Payment</TimelineTitle>
                    </TimelineHeader>
                    <TimelineBody>
                      {paymentDetails.length ? (
                        <p className="text-sm text-gray-500">
                          Deposit paid on {format(new Date(paymentDetails[0].createdAt), 'MMM d, yyyy')}
                        </p>
                      ) : isCancelled ? (
                        <p className="text-sm text-gray-500">Booking cancelled before payment</p>
                      ) : (
                        <p className="text-sm text-gray-500">Payment pending</p>
                      )}
                    </TimelineBody>
                  </TimelineItem>
                  
                  <TimelineItem>
                    <TimelineConnector />
                    <TimelineHeader>
                      <TimelineIcon className={
                        isCancelled 
                          ? "bg-gray-200" 
                          : isConfirmed || isInProgress || isCompleted
                            ? "bg-green-500" 
                            : "bg-gray-200"
                      }>
                        {isCancelled 
                          ? <X className="h-4 w-4" /> 
                          : isConfirmed || isInProgress || isCompleted
                            ? <Check className="h-4 w-4" /> 
                            : <Clock className="h-4 w-4" />}
                      </TimelineIcon>
                      <TimelineTitle>Confirmation</TimelineTitle>
                    </TimelineHeader>
                    <TimelineBody>
                      {isConfirmed || isInProgress || isCompleted ? (
                        <p className="text-sm text-gray-500">
                          Booking confirmed on {format(new Date(booking.updatedAt), 'MMM d, yyyy')}
                        </p>
                      ) : isCancelled ? (
                        <p className="text-sm text-gray-500">Booking was cancelled</p>
                      ) : (
                        <p className="text-sm text-gray-500">Awaiting confirmation</p>
                      )}
                    </TimelineBody>
                  </TimelineItem>
                  
                  <TimelineItem>
                    <TimelineHeader>
                      <TimelineIcon className={
                        isCancelled 
                          ? "bg-red-500" 
                          : isCompleted
                            ? "bg-green-500" 
                            : "bg-gray-200"
                      }>
                        {isCancelled 
                          ? <X className="h-4 w-4" /> 
                          : isCompleted
                            ? <Check className="h-4 w-4" /> 
                            : <Clock className="h-4 w-4" />}
                      </TimelineIcon>
                      <TimelineTitle>
                        {isCancelled ? 'Cancelled' : 'Completion'}
                      </TimelineTitle>
                    </TimelineHeader>
                    <TimelineBody>
                      {isCompleted ? (
                        <p className="text-sm text-gray-500">
                          Trip completed on {format(endDate, 'MMM d, yyyy')}
                        </p>
                      ) : isCancelled ? (
                        <p className="text-sm text-gray-500">
                          Booking cancelled on {format(new Date(booking.updatedAt), 'MMM d, yyyy')}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-500">
                          {isInProgress ? 'In progress' : 'Scheduled for completion on'} {format(endDate, 'MMM d, yyyy')}
                        </p>
                      )}
                    </TimelineBody>
                  </TimelineItem>
                </Timeline>
              </div>
            </div>
            
            {/* Right column - Payment, companion details, actions */}
            <div className="space-y-6">
              {/* Payment information */}
              <div>
                <h3 className="font-medium mb-3">Payment Details</h3>
                <div className="bg-white border rounded-lg overflow-hidden">
                  <div className="p-4 border-b">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">Total price</span>
                      <span className="font-medium">₹{booking.totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">Deposit (20%)</span>
                      <span className="font-medium">₹{depositAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Remaining payment</span>
                      <span className="font-medium">₹{remainingAmount.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="px-4 py-3 bg-gray-50">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Payment status</span>
                      {isPaymentLoading ? (
                        <div className="flex items-center">
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Loading...
                        </div>
                      ) : paymentDetails.length > 0 ? (
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                          Deposit paid
                        </Badge>
                      ) : isCancelled ? (
                        <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                          No payment required
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                          Pending
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {needsPayment && (
                    <div className="p-4 border-t">
                      <Button 
                        onClick={() => router.push(`/bookings/${bookingId}/payment`)}
                        className="w-full"
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Pay Deposit ₹{depositAmount.toFixed(2)}
                      </Button>
                      <p className="text-xs text-center mt-2 text-gray-500">
                        You'll pay the remaining ₹{remainingAmount.toFixed(2)} at the start of your trip
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Companion details */}
              <div>
                <h3 className="font-medium mb-3">Companion Details</h3>
                <div className="bg-white border rounded-lg overflow-hidden">
                  <div className="flex items-center p-4 border-b">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 shadow-sm">
                      <Image 
                        src={profilePic} 
                        alt={companionName} 
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{companionName}</h3>
                      {companion?.languages && (
                        <p className="text-sm text-gray-600">
                          Speaks: {companion.languages.join(', ')}
                        </p>
                      )}
                      {companion?.averageRating > 0 && (
                        <div className="flex items-center text-sm">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3.5 w-3.5 ${
                                  i < Math.floor(companion.averageRating)
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="ml-1 text-gray-600">
                            {companion.averageRating.toFixed(1)} ({companion.totalReviews} {companion.totalReviews === 1 ? 'review' : 'reviews'})
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Specialties */}
                  {companion?.specialties && companion.specialties.length > 0 && (
                    <div className="p-4 border-b">
                      <h4 className="text-sm font-medium mb-2">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {companion.specialties.map((specialty: string) => (
                          <Badge key={specialty} variant="secondary">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Contact buttons - Only show for confirmed bookings */}
                  {(isConfirmed || isInProgress) && !isCancelled && (
                    <div className="p-4 flex flex-col gap-2">
                      <Button variant="outline" className="w-full">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Companion
                      </Button>
                      <Button className="w-full">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex flex-col gap-3">
                {canBeCancelled && (
                  <Button 
                    variant="outline" 
                    className="justify-between text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => setShowCancelDialog(true)}
                  >
                    <div className="flex items-center">
                      <X className="h-4 w-4 mr-2" />
                      Cancel Booking
                    </div>
                    <ChevronRight />
                  </Button>
                )}
                
                {canBeReviewed && (
                  <Button 
                    variant="outline"
                    className="justify-between"
                    onClick={() => setShowReviewDialog(true)}
                  >
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-2" />
                      Leave a Review
                    </div>
                    <ChevronRight />
                  </Button>
                )}
                
                {/* Download confirmation button */}
                {isConfirmed || isInProgress || isCompleted ? (
                  <Button 
                    variant="outline"
                    className="justify-between"
                  >
                    <div className="flex items-center">
                      <DownloadIcon className="h-4 w-4 mr-2" />
                      Download Confirmation
                    </div>
                    <ChevronRight />
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Cancel Booking Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this booking? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-2">
            <label className="block text-sm font-medium mb-1">
              Please provide a reason for cancellation:
            </label>
            <Textarea
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="Enter reason for cancellation..."
              className="w-full"
              rows={3}
            />
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowCancelDialog(false)}
              disabled={isCancelling}
            >
              Keep Booking
            </Button>
            <Button 
              variant="destructive"
              onClick={handleCancelBooking}
              disabled={isCancelling}
            >
              {isCancelling ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Cancelling...
                </>
              ) : (
                'Cancel Booking'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Review Dialog */}
      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review Your Experience</DialogTitle>
            <DialogDescription>
              Share your thoughts about your experience with {companionName}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-2 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Rating:
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Star
                    key={rating}
                    className={`h-8 w-8 cursor-pointer ${
                      rating <= reviewForm.rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                    onClick={() => setReviewForm({ ...reviewForm, rating })}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Your Review:
              </label>
              <Textarea
                value={reviewForm.comment}
                onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                placeholder="Share details of your experience to help other travelers..."
                className="w-full"
                rows={4}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowReviewDialog(false)}
              disabled={isSubmittingReview}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitReview}
              disabled={isSubmittingReview}
            >
              {isSubmittingReview ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Review'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Helper Components
const ChevronRight = () => (
  <ChevronDown className="h-4 w-4 transform -rotate-90" />
);

const DownloadIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 20 20" 
    fill="none" 
    stroke="currentColor" 
    className={className}
  >
    <path d="M10 1.66675V13.3334M10 13.3334L15 8.33342M10 13.3334L5 8.33342" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1.66663 14.9999V16.6666C1.66663 17.1087 1.84222 17.5326 2.15478 17.8451C2.46734 18.1577 2.89127 18.3333 3.33329 18.3333H16.6666C17.1087 18.3333 17.5326 18.1577 17.8451 17.8451C18.1577 17.5326 18.3333 17.1087 18.3333 16.6666V14.9999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);