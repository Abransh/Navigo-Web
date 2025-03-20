// components/payment/StripePaymentForm.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { 
  PaymentElement, 
  LinkAuthenticationElement,
  useStripe, 
  useElements,
  Elements
} from '@stripe/react-stripe-js';

import { getStripe, StripeKeyWarning } from './StripeConfig';
import paymentService from '@/services/payment-service';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

// The wrapper component that manages Stripe Elements
export default function StripePaymentForm({ 
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
  const [stripeError, setStripeError] = useState<boolean>(false);

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        setLoading(true);
        
        // Create payment intent from backend
        const { clientSecret } = await paymentService.createPaymentIntent(
          bookingId, 
          amount, 
          'CREDIT_CARD'
        );
        
        setClientSecret(clientSecret);
      } catch (err: any) {
        // Check if this is a Stripe configuration error
        if (err.message?.includes('Stripe public key is missing')) {
          setStripeError(true);
          setError('Payment processing is not configured. Please contact support.');
        } else {
          console.error('Error creating payment intent:', err);
          setError(err.message || 'Failed to initialize payment. Please try again.');
          toast.error('Failed to initialize payment');
        }
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

  // Show Stripe configuration error
  if (stripeError) {
    return <StripeKeyWarning />;
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
      stripe={getStripe()} 
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
  returnUrl 
}: { 
  clientSecret: string; 
  bookingId: string; 
  amount: number;
  returnUrl: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

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
    <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
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
  );
}