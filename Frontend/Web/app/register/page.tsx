// app/register/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaGoogle, FaApple, FaFacebook } from "react-icons/fa";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, isAuthenticated, loading } = useAuth();
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError("All fields are required");
      setIsSubmitting(false);
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      setIsSubmitting(false);
      return;
    }
    
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsSubmitting(false);
      return;
    }
    
    try {
      console.log('Attempting registration with:', { 
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName
      });
      
      // Remove confirmPassword before sending
      const { confirmPassword, ...registrationData } = formData;
      
      await register({
        ...registrationData,
        role: 'tourist' // Set default role to tourist
      });
      
      console.log('Registration successful, redirecting to:', redirectTo);
      router.push(redirectTo);
    } catch (err: any) {
      console.error('Registration error:', err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Registration failed. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialSignup = (provider: string) => {
    // This would be implemented with your actual OAuth provider
    alert(`Social signup with ${provider} is not implemented yet.`);
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
              <h2 className="text-2xl font-semibold mb-3">Start Your Journey</h2>
              <p className="mb-4">Create an account to unlock personalized trip planning, connect with local companions, and discover authentic experiences across India.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Right side - Registration form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile heading - only visible on small screens */}
          <div className="md:hidden text-center mb-8">
            <h1 className="text-3xl font-bold text-[#003366] mb-2">Navigo</h1>
            <p className="text-gray-600">Your Gateway to The Experience</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">{fromPlanTrip ? 'Sign up to Plan Your Trip' : 'Create Account'}</h2>
            
            {error && (
              <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                <p>{error}</p>
              </div>
            )}
            
            {/* Social Login Buttons */}
            <div className="space-y-3 mb-6">
              <button 
                type="button"
                onClick={() => handleSocialSignup('google')}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
              >
                <FaGoogle className="text-red-500" />
                <span>Sign up with Google</span>
              </button>
              
              <button 
                type="button"
                onClick={() => handleSocialSignup('apple')}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-black text-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-900 transition-colors"
              >
                <FaApple />
                <span>Sign up with Apple</span>
              </button>
              
              <button 
                type="button"
                onClick={() => handleSocialSignup('facebook')}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-[#1877F2] text-white border border-gray-300 rounded-lg shadow-sm hover:bg-[#0e6ae4] transition-colors"
              >
                <FaFacebook />
                <span>Sign up with Facebook</span>
              </button>
            </div>
            
            {/* Or divider */}
            <div className="relative flex items-center justify-center mb-6">
              <div className="border-t border-gray-300 w-full"></div>
              <span className="bg-white px-3 text-sm text-gray-500 absolute">or</span>
            </div>
            
            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input 
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3A522] focus:border-transparent transition"
                    placeholder="John"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input 
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3A522] focus:border-transparent transition"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3A522] focus:border-transparent transition"
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input 
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3A522] focus:border-transparent transition"
                  placeholder="••••••••"
                  minLength={6}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input 
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
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
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account? 
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