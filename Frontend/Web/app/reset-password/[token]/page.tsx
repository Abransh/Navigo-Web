// Frontend/Web/app/reset-password/[token]/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import authService from '@/services/auth-service';
import { toast } from 'react-hot-toast';

export default function ResetPasswordPage({ params }: { params: { token: string } }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [tokenChecked, setTokenChecked] = useState(false);
  const router = useRouter();
  const { token } = params;

  // Verify token on component mount
  useEffect(() => {
    const verifyToken = async () => {
      try {
        await authService.verifyResetToken(token);
        setIsTokenValid(true);
      } catch (error) {
        console.error('Invalid or expired token:', error);
        setIsTokenValid(false);
        toast.error('This password reset link is invalid or has expired.');
      } finally {
        setTokenChecked(true);
      }
    };

    verifyToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await authService.resetPassword(token, password);
      setIsSuccess(true);
      toast.success('Password reset successfully');
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (error) {
      console.error('Failed to reset password:', error);
      toast.error('Failed to reset password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state while checking token
  if (!tokenChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#F3A522] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-xl">Verifying reset link...</p>
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
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-3">Reset Your Password</h2>
            <p className="mb-4">Create a new secure password for your Navigo account and get back to exploring the world.</p>
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
            {!isTokenValid ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-red-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Invalid or Expired Link</h3>
                <p className="text-gray-600 mb-6">
                  This password reset link is invalid or has expired. Please try resetting your password again.
                </p>
                <Link 
                  href="/forgot-password" 
                  className="px-4 py-2 bg-[#F3A522] text-white rounded-md hover:bg-[#e09415] transition-colors inline-block"
                >
                  Request New Link
                </Link>
              </div>
            ) : isSuccess ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-green-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Password Reset Successful</h3>
                <p className="text-gray-600 mb-6">
                  Your password has been reset successfully. You will be redirected to the login page in a few seconds.
                </p>
                <Link 
                  href="/login" 
                  className="px-4 py-2 bg-[#F3A522] text-white rounded-md hover:bg-[#e09415] transition-colors inline-block"
                >
                  Go to Login
                </Link>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
                <p className="text-gray-600 mb-6 text-center">
                  Create a new password for your account.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input 
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3A522] focus:border-transparent transition"
                      placeholder="••••••••"
                      required
                      minLength={8}
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Password must be at least 8 characters long, include uppercase, lowercase and numbers.
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input 
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3A522] focus:border-transparent transition"
                      placeholder="••••••••"
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
                        Resetting...
                      </>
                    ) : (
                      'Reset Password'
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}