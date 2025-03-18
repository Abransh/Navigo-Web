// Frontend/Web/app/login/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaGoogle, FaApple, FaFacebook } from "react-icons/fa";
import  { toast } from "react-hot-toast"; 

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const { login, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/';
  const fromPlanTrip = redirectTo === '/planyourtrip';

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && !loading) {
      console.log('Already authenticated, redirecting to:', redirectTo);
      router.push(redirectTo);
    }
  }, [isAuthenticated, redirectTo, router, loading]);

  // Save redirectTo to localStorage for social auth callback
  useEffect(() => {
    if (redirectTo) {
      localStorage.setItem('redirectTo', redirectTo);
    }
  }, [redirectTo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    
    if (!email || !password) {
      setError("Email and password are required");
      setIsSubmitting(false);
      return;
    }
    
    try {
      console.log('Attempting login with:', { email });
      await login(email, password);
      toast.success('Login successful!');
      console.log('Login successful, redirecting to:', redirectTo);
      router.push(redirectTo);
    } catch (err: any) {
      console.error('Login error:', err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Login failed. Please check your credentials and try again.");
      }
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    setSocialLoading(provider);
    
    // Save redirectTo to localStorage for the callback
    if (redirectTo) {
      localStorage.setItem('redirectTo', redirectTo);
    }
    
    // Redirect to backend auth endpoint
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    window.location.href = `${apiUrl}/auth/${provider}`;
  };

  // Show loading state while auth state is being determined
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#F3A522] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Image and branding */}
      <div className="hidden md:flex md:w-1/2 bg-[#003366] relative">
        <div className="absolute inset-0">
          <Image 
            src="/images/HeroSectionImage.jpg" 
            alt="Travel experience" 
            fill 
            className="object-cover opacity-50"
          />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <h1 className="text-5xl font-bold mb-6">Navigo</h1>
          <p className="text-2xl mb-8">Your Gateway to The Experience</p>
          {fromPlanTrip && (
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-3">Plan Your Perfect Trip</h2>
              <p className="mb-4">Sign in to access personalized trip planning, connect with local companions, and discover authentic experiences across India.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Right side - Login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile heading - only visible on small screens */}
          <div className="md:hidden text-center mb-8">
            <h1 className="text-3xl font-bold text-[#003366] mb-2">Navigo</h1>
            <p className="text-gray-600">Your Gateway to The Experience</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">{fromPlanTrip ? 'Sign in to Plan Your Trip' : 'Sign In'}</h2>
            
            {error && (
              <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                <p>{error}</p>
              </div>
            )}
            
            {/* Social Login Buttons */}
            <div className="space-y-3 mb-6">
              <button 
                type="button"
                onClick={() => handleSocialLogin('google')}
                disabled={isSubmitting || !!socialLoading}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {socialLoading === 'google' ? (
                  <span className="mr-2 h-4 w-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <FaGoogle className="text-red-500" />
                )}
                <span>Continue with Google</span>
              </button>
              
              <button 
                type="button"
                onClick={() => handleSocialLogin('apple')}
                disabled={isSubmitting || !!socialLoading}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-black text-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-900 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {socialLoading === 'apple' ? (
                  <span className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <FaApple />
                )}
                <span>Continue with Apple</span>
              </button>
              
              <button 
                type="button"
                onClick={() => handleSocialLogin('facebook')}
                disabled={isSubmitting || !!socialLoading}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-[#1877F2] text-white border border-gray-300 rounded-lg shadow-sm hover:bg-[#0e6ae4] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {socialLoading === 'facebook' ? (
                  <span className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <FaFacebook />
                )}
                <span>Continue with Facebook</span>
              </button>
            </div>
            
            {/* Or divider */}
            <div className="relative flex items-center justify-center mb-6">
              <div className="border-t border-gray-300 w-full"></div>
              <span className="bg-white px-3 text-sm text-gray-500 absolute">or</span>
            </div>
            
            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3A522] focus:border-transparent transition"
                  placeholder="your@email.com"
                  required
                  disabled={isSubmitting || !!socialLoading}
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <Link 
                    href="/forgot-password" 
                    className="text-sm text-[#003366] hover:text-[#F3A522]"
                    tabIndex={isSubmitting || !!socialLoading ? -1 : 0}
                    aria-disabled={isSubmitting || !!socialLoading}
                  >
                    Forgot password?
                  </Link>
                </div>
                <input 
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3A522] focus:border-transparent transition"
                  placeholder="••••••••"
                  required
                  disabled={isSubmitting || !!socialLoading}
                />
              </div>
              
              <button 
                type="submit"
                disabled={isSubmitting || !!socialLoading}
                className={`w-full py-3 px-4 ${
                  isSubmitting || !!socialLoading
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-[#F3A522] hover:bg-[#003366]'
                } text-white rounded-lg transition-colors font-medium flex items-center justify-center`}
              >
                {isSubmitting ? (
                  <>
                    <span className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account? 
                <Link href={`/register${redirectTo ? `?redirectTo=${redirectTo}` : ''}`} className="text-[#003366] hover:text-[#F3A522] ml-1 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}