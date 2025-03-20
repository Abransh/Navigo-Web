// components/auth/SocialLoginButtons.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaGoogle, FaApple, FaFacebook } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

interface SocialLoginButtonsProps {
  mode: 'login' | 'register';
}

export default function SocialLoginButtons({ mode }: SocialLoginButtonsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/';
  
  // Save redirectTo to localStorage for the OAuth callback to use
  useEffect(() => {
    if (redirectTo) {
      localStorage.setItem('redirectTo', redirectTo);
    }
  }, [redirectTo]);

  const handleSocialLogin = (provider: string) => {
    try {
      setIsLoading(true);
      setLoadingProvider(provider);
      
      // Save redirectTo to localStorage for the callback
      if (redirectTo) {
        localStorage.setItem('redirectTo', redirectTo);
      }
      
      // Get the API URL from environment variable
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      
      // UPDATED: Construct the correct OAuth URL WITH /api prefix
      // This URL should match the controller routes in the backend
      const authUrl = `${apiUrl}/api/auth/${provider}`;
      
      console.log(`Initiating ${provider} authentication. Redirecting to: ${authUrl}`);
      
      // Redirect to the OAuth provider
      window.location.href = authUrl;
    } catch (error) {
      console.error(`Error initiating ${provider} login:`, error);
      toast.error(`Failed to connect to ${provider}. Please try again.`);
      setIsLoading(false);
      setLoadingProvider(null);
    }
  };

  return (
    <div className="space-y-3 mb-6">
      <button 
        type="button"
        onClick={() => handleSocialLogin('google')}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        aria-label={`Sign in with Google`}
      >
        {isLoading && loadingProvider === 'google' ? (
          <span className="mr-2 h-4 w-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></span>
        ) : (
          <FaGoogle className="text-red-500" />
        )}
        <span>{mode === 'login' ? 'Continue with Google' : 'Sign up with Google'}</span>
      </button>
      
      <button 
        type="button"
        onClick={() => handleSocialLogin('facebook')}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-[#1877F2] text-white border border-gray-300 rounded-lg shadow-sm hover:bg-[#0e6ae4] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        aria-label={`Sign in with Facebook`}
      >
        {isLoading && loadingProvider === 'facebook' ? (
          <span className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        ) : (
          <FaFacebook />
        )}
        <span>{mode === 'login' ? 'Continue with Facebook' : 'Sign up with Facebook'}</span>
      </button>
      
      <button 
        type="button"
        onClick={() => handleSocialLogin('apple')}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-black text-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-900 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        aria-label={`Sign in with Apple`}
      >
        {isLoading && loadingProvider === 'apple' ? (
          <span className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        ) : (
          <FaApple />
        )}
        <span>{mode === 'login' ? 'Continue with Apple' : 'Sign up with Apple'}</span>
      </button>
    </div>
  );
}