// Frontend/Web/app/forgot-password/page.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import authService from '@/services/auth-service';
import { toast } from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await authService.requestPasswordReset(email);
      setIsSubmitted(true);
      toast.success('Password reset link sent to your email');
    } catch (error) {
      console.error('Failed to request password reset:', error);
      toast.error('Failed to request password reset. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-3">Forgot Your Password?</h2>
            <p className="mb-4">No worries! We'll help you get back to exploring the world. Enter your email and we'll send you instructions to reset your password.</p>
          </div>
        </div>
      </div>
      
      {/* Right side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile heading - only visible on small screens */}
          <div className="md:hidden text-center mb-8">
            <h1 className="text-3xl font-bold text-[#003366] mb-2">Navigo</h1>
            <p className="text-gray-600">Your Gateway to The Experience</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
            
            {!isSubmitted ? (
              <>
                <p className="text-gray-600 mb-6 text-center">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input 
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3A522] focus:border-transparent transition"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-4 ${
                      isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-[#F3A522] hover:bg-[#003366]'
                    } text-white rounded-lg transition-colors font-medium flex items-center justify-center`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Sending...
                      </>
                    ) : (
                      'Reset Password'
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-green-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Check Your Email</h3>
                <p className="text-gray-600 mb-6">
                  We've sent a password reset link to <span className="font-medium">{email}</span>. 
                  Please check your inbox and follow the instructions to reset your password.
                </p>
                <p className="text-sm text-gray-500">
                  Didn't receive the email? Check your spam folder or <button 
                    type="button" 
                    onClick={handleSubmit}
                    className="text-[#003366] hover:text-[#F3A522] font-medium"
                  >
                    try again
                  </button>.
                </p>
              </div>
            )}
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Remember your password? 
                <Link href="/login" className="text-[#003366] hover:text-[#F3A522] ml-1 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}