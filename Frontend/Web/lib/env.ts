// lib/env.ts
// This utility validates required environment variables and provides type-safe access

// Required environment variables
const REQUIRED_ENV_VARS = [
    'NEXT_PUBLIC_API_URL',
  ];
  
  // Optional environment variables with defaults
  const ENV_DEFAULTS = {
    NEXT_PUBLIC_APP_NAME: 'Navigo',
    NEXT_PUBLIC_APP_URL: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
    NEXT_PUBLIC_ENABLE_SOCIAL_LOGIN: 'true',
  };
  
  // Validate environment variables on startup
  export function validateEnv() {
    const missingVars = REQUIRED_ENV_VARS.filter(
      (name) => !process.env[name]
    );
  
    if (missingVars.length > 0) {
      if (typeof window !== 'undefined') {
        // Client-side - just warn in the console
        console.warn(
          `Missing required environment variables: ${missingVars.join(', ')}\n` +
          `This may cause application functionality to be limited.`
        );
      } else {
        // Server-side - throw an error to prevent startup with missing vars
        throw new Error(
          `Missing required environment variables: ${missingVars.join(', ')}\n` +
          `Make sure to define these in your .env file.`
        );
      }
    }
  }
  
  // Type-safe environment variable access
  export const env = {
    // API
    apiUrl: process.env.NEXT_PUBLIC_API_URL!,
    
    // App Info
    appName: process.env.NEXT_PUBLIC_APP_NAME || ENV_DEFAULTS.NEXT_PUBLIC_APP_NAME,
    appUrl: process.env.NEXT_PUBLIC_APP_URL || ENV_DEFAULTS.NEXT_PUBLIC_APP_URL,
    
    // Feature flags
    enableSocialLogin: process.env.NEXT_PUBLIC_ENABLE_SOCIAL_LOGIN === 'true',
    enableApplePay: process.env.NEXT_PUBLIC_ENABLE_APPLE_PAY === 'true',
    
    // Stripe
    stripePublicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '',
    
    // Optional
    gaId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    facebookAppId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
  };
  
  // Validate on import
  validateEnv();