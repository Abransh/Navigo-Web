// components/payment/StripeConfig.tsx
import { loadStripe, Stripe } from '@stripe/stripe-js';

// Stripe public key from environment variables
const STRIPE_PUBLIC_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

// Check if Stripe key is available
if (!STRIPE_PUBLIC_KEY) {
  console.error(
    'Stripe public key is missing. Make sure to set NEXT_PUBLIC_STRIPE_PUBLIC_KEY in your .env file.'
  );
}

// Cache the promise to avoid recreating it
let stripePromise: Promise<Stripe | null>;

export const getStripe = (): Promise<Stripe | null> => {
  if (!stripePromise && STRIPE_PUBLIC_KEY) {
    stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
  } else if (!STRIPE_PUBLIC_KEY) {
    // Return a rejected promise for better error handling
    return Promise.reject(new Error('Stripe public key is missing'));
  }
  
  return stripePromise!;
};

// Export a Component to show Stripe warning if key is missing
export function StripeKeyWarning() {
  if (!STRIPE_PUBLIC_KEY) {
    return (
      <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
        <p className="font-medium">Stripe Configuration Error</p>
        <p>
          Stripe public key is missing. Please set NEXT_PUBLIC_STRIPE_PUBLIC_KEY 
          in your .env file to enable payment processing.
        </p>
      </div>
    );
  }
  
  return null;
}