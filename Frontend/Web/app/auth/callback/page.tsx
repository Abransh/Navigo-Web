// app/auth/callback/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { toast } from 'react-hot-toast';

export default function AuthCallbackPage() {
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const errorParam = searchParams.get('error');
  const { isAuthenticated, processSocialAuthToken } = useAuth();

  useEffect(() => {
    async function handleCallback() {
      // Check for error from the backend
      if (errorParam) {
        const errorMessages: Record<string, string> = {
          'authentication_failed': 'Authentication failed. Please try again.',
          'token_missing': 'Authentication token was not provided.',
          'server_error': 'Server error occurred during authentication.',
          'access_denied': 'Access was denied or cancelled by the user.',
          'invalid_request': 'Invalid authentication request.',
        };
        
        // Log error for debugging
        console.error(`Authentication error: ${errorParam}`);
        
        // Set user-friendly error message
        setError(errorMessages[errorParam] || `Authentication failed: ${errorParam}`);
        setIsProcessing(false);
        return;
      }
      
      // Check if token exists
      if (!token) {
        console.error('No token received in callback');
        setError('Authentication failed. No authentication token was received.');
        setIsProcessing(false);
        return;
      }
  
      try {
        console.log('Processing authentication with token');
        
        // Store token in localStorage
        localStorage.setItem('token', token);
        
        // Get user info from the server
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const response = await fetch(`${apiUrl}/api/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          const responseText = await response.text();
          console.error('Error fetching user data:', responseText);
          throw new Error(`Failed to get user information: ${response.status} ${responseText}`);
        }
        
        const userData = await response.json();
        console.log('User data received:', { ...userData, password: '[REDACTED]' });
        
        // Store user data
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Process token with auth context
        await processSocialAuthToken(token);
        
        // Success message
        toast.success('Successfully signed in!');
        
        // Redirect - check if there's a redirectTo in localStorage
        const redirectTo = localStorage.getItem('redirectTo') || '/';
        localStorage.removeItem('redirectTo'); // Clear the redirect after use
        
        console.log('Redirecting to:', redirectTo);
        
        // Short delay to allow toast to show
        setTimeout(() => {
          router.push(redirectTo);
        }, 1000);
      } catch (err: any) {
        console.error('Error processing authentication callback:', err);
        setError(err.message || 'Failed to process authentication. Please try again.');
        localStorage.removeItem('token');
      } finally {
        setIsProcessing(false);
      }
    }
  
    // Only process if not already authenticated
    if (!isAuthenticated) {
      handleCallback();
    } else {
      // Already authenticated, redirect to home
      console.log('Already authenticated, redirecting to home');
      router.push('/');
    }
  }, [token, router, isAuthenticated, errorParam, processSocialAuthToken]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {error ? 'Authentication Failed' : 'Finalizing Your Sign In'}
          </h2>
          
          {isProcessing ? (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-[#F3A522] border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">
                Please wait while we complete your authentication...
              </p>
            </div>
          ) : error ? (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-red-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => router.push('/login')}
                className="px-4 py-2 bg-[#F3A522] text-white rounded-md hover:bg-[#e09415] transition-colors"
              >
                Back to Login
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-green-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-green-600 mb-4">Authentication successful! Redirecting you...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}