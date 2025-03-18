// Frontend/Web/components/auth/SocialLoginButtons.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaGoogle, FaApple, FaFacebook } from 'react-icons/fa';

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
    setIsLoading(true);
    setLoadingProvider(provider);
    
    // Save redirectTo to localStorage for the callback
    if (redirectTo) {
      localStorage.setItem('redirectTo', redirectTo);
    }
    
    // Redirect to backend auth endpoint
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/${provider}`;
  };

  return (
    <div className="space-y-3 mb-6">
      <button 
        type="button"
        onClick={() => handleSocialLogin('google')}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
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
        onClick={() => handleSocialLogin('apple')}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-black text-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-900 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading && loadingProvider === 'apple' ? (
          <span className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        ) : (
          <FaApple />
        )}
        <span>{mode === 'login' ? 'Continue with Apple' : 'Sign up with Apple'}</span>
      </button>
      
      <button 
        type="button"
        onClick={() => handleSocialLogin('facebook')}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-[#1877F2] text-white border border-gray-300 rounded-lg shadow-sm hover:bg-[#0e6ae4] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading && loadingProvider === 'facebook' ? (
          <span className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        ) : (
          <FaFacebook />
        )}
        <span>{mode === 'login' ? 'Continue with Facebook' : 'Sign up with Facebook'}</span>
      </button>
    </div>
  );
}