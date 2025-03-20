// components/payment/EnhancedPaymentForm.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { 
  PaymentElement, 
  LinkAuthenticationElement,
  useStripe, 
  useElements,
  Elements,
  PaymentRequestButtonElement,
} from '@stripe/react-stripe-js';

import { loadStripe } from '@stripe/stripe-js';
import bookingService from '@/services/booking-service';
import paymentService from '@/services/payment-service';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Initialize Stripe with public key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || ''
);

// The wrapper component that manages Stripe Elements
export default function EnhancedPaymentForm({ 
  bookingId, 
  amount, 
  currency = 'inr',
  returnUrl 
}: { 
  bookingId: string; 
  amount: number;
  currency?: string;
  returnUrl?: string;
}) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        setLoading(true);
        const { clientSecret } = await paymentService.createPaymentIntent(
          bookingId, 
          amount, 
          'CREDIT_CARD'
        );
        setClientSecret(clientSecret);
      } catch (err: any) {
        console.error('Error creating payment intent:', err);
        setError(err.message || 'Failed to initialize payment. Please try again.');
        toast.error('Failed to initialize payment');
      } finally {
        setLoading(false);
      }
    };

    if (bookingId && amount > 0) {
      fetchPaymentIntent();
    }
  }, [bookingId, amount]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p>Preparing payment...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
        <p className="text-red-700">{error}</p>
        <Button 
          variant="outline" 
          className="mt-4" 
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </div>
    );
  }

  if (!clientSecret) {
    return <p>Could not initialize payment system. Please try again later.</p>;
  }

  return (
    <Elements 
      stripe={stripePromise} 
      options={{
        clientSecret,
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#F3A522',
            colorBackground: '#ffffff',
            colorText: '#30313d',
            colorDanger: '#df1b41',
            fontFamily: 'Poppins, system-ui, sans-serif',
            borderRadius: '8px',
          },
        },
      }}
    >
      <CheckoutForm 
        clientSecret={clientSecret} 
        bookingId={bookingId} 
        amount={amount}
        currency={currency}
        returnUrl={returnUrl || `/bookings/${bookingId}`}
      />
    </Elements>
  );
}

// The inner form component that handles payment submission
function CheckoutForm({ 
  clientSecret, 
  bookingId, 
  amount,
  currency,
  returnUrl 
}: { 
  clientSecret: string; 
  bookingId: string; 
  amount: number;
  currency: string;
  returnUrl: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentRequest, setPaymentRequest] = useState<any>(null);
  const [paymentTab, setPaymentTab] = useState<string>('card');

  // Set up Apple Pay / Google Pay
  useEffect(() => {
    if (!stripe || !elements) {
      return;
    }

    const pr = stripe.paymentRequest({
      country: 'IN',
      currency: currency.toLowerCase(),
      total: {
        label: 'Navigo Booking',
        amount: Math.round(amount * 100), // Stripe uses smallest currency unit (cents/paise)
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    // Check if the Payment Request is supported
    pr.canMakePayment().then(result => {
      if (result) {
        setPaymentRequest(pr);
        // If Apple Pay is available, default to that tab
        if (result.applePay) {
          setPaymentTab('applepay');
        }
      }
    });

    // Handle payment request completion
    pr.on('paymentmethod', async (e) => {
      setIsLoading(true);
      
      try {
        const { error, paymentIntent } = await stripe.confirmPaymentIntent(clientSecret, {
          payment_method: e.paymentMethod.id,
        });

        if (error) {
          e.complete('fail');
          setPaymentError(error.message || 'Payment failed');
          toast.error('Payment failed: ' + error.message);
        } else if (paymentIntent.status === 'succeeded') {
          e.complete('success');
          toast.success('Payment successful!');
          router.push(`/bookings/success?id=${bookingId}`);
        } else {
          e.complete('success');
          toast.success('Payment is processing. You will be notified once completed.');
          router.push(`/bookings/${bookingId}`);
        }
      } catch (err: any) {
        e.complete('fail');
        console.error('Payment error:', err);
        setPaymentError(err.message || 'An unexpected error occurred');
        toast.error('Payment failed');
      } finally {
        setIsLoading(false);
      }
    });

  }, [stripe, elements, amount, currency, bookingId, clientSecret, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't loaded yet
      return;
    }

    setIsLoading(true);
    setPaymentError(null);

    try {
      // Submit the form with Stripe.js
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}${returnUrl}`,
          payment_method_data: {
            billing_details: { email },
          },
        },
        redirect: 'if_required',
      });

      if (error) {
        // Show error to your customer
        setPaymentError(error.message || 'An error occurred during payment processing');
        toast.error('Payment failed: ' + error.message);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Payment succeeded
        toast.success('Payment successful!');
        router.push(`/bookings/success?id=${bookingId}`);
      } else {
        // Some other status like 'processing'
        toast.success('Payment is processing. You will be notified once completed.');
        router.push(`/bookings/${bookingId}`);
      }
    } catch (err: any) {
      console.error('Payment error:', err);
      setPaymentError(err.message || 'An unexpected error occurred');
      toast.error('Payment failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-medium mb-2">Payment Summary</h3>
        <div className="flex justify-between mb-1">
          <span>Booking Amount:</span>
          <span>₹{amount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-semibold border-t pt-2 mt-2">
          <span>Total:</span>
          <span>₹{amount.toFixed(2)}</span>
        </div>
      </div>

      <Tabs value={paymentTab} onValueChange={setPaymentTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="card">Card Payment</TabsTrigger>
          <TabsTrigger 
            value="applepay" 
            disabled={!paymentRequest}
            className={!paymentRequest ? "opacity-50 cursor-not-allowed" : ""}
          >
            Apple Pay / Google Pay
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="card">
          <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
            <LinkAuthenticationElement 
              id="link-authentication-element"
              onChange={(e) => setEmail(e.value.email)}
            />
            
            <PaymentElement 
              id="payment-element" 
              options={{
                layout: 'tabs',
              }}
            />

            {paymentError && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mt-4">
                <p className="text-red-700">{paymentError}</p>
              </div>
            )}

            <Button 
              disabled={isLoading || !stripe || !elements} 
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                `Pay ₹${amount.toFixed(2)}`
              )}
            </Button>
          </form>
        </TabsContent>
        
        <TabsContent value="applepay">
          {paymentRequest ? (
            <div className="py-4">
              <PaymentRequestButtonElement 
                options={{ paymentRequest }} 
                className="w-full"
              />
              <p className="text-sm text-gray-500 mt-4 text-center">
                Pay securely using Apple Pay or Google Pay
              </p>
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-gray-600">
                Apple Pay / Google Pay is not available on this device or browser.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Please use the Card Payment option instead.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      <div className="pt-2 text-sm text-gray-500">
        <p className="flex items-center justify-center">
          <LockIcon className="h-4 w-4 mr-2" />
          Your payment information is secure and encrypted
        </p>
      </div>
    </div>
  );
}

// Lock icon component
const LockIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);