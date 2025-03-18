// Frontend/Web/app/change-password/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import userService from "@/services/user-service";
import { toast } from "react-hot-toast";

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login?redirectTo=/change-password');
    }
  }, [isAuthenticated, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (newPassword !== confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }
    
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long");
      return;
    }
    
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newPassword)) {
      toast.error("New password must contain at least one uppercase letter, one lowercase letter, and one number");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await userService.changePassword(currentPassword, newPassword);
      setIsSuccess(true);
      toast.success("Password changed successfully");
      
      // Redirect to profile after 3 seconds
      setTimeout(() => {
        router.push('/profile');
      }, 3000);
    } catch (error: any) {
      console.error("Error changing password:", error);
      
      if (error.response?.status === 400) {
        toast.error("Current password is incorrect");
      } else {
        toast.error("Failed to change password. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">Change Password</h1>
          
          {isSuccess ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-green-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Password Changed Successfully</h3>
              <p className="text-gray-600 mb-6">
                Your password has been updated. You will be redirected to your profile in a few seconds.
              </p>
              <Link 
                href="/profile" 
                className="px-4 py-2 bg-[#F3A522] text-white rounded-md hover:bg-[#e09415] transition-colors inline-block"
              >
                Back to Profile
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <input 
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3A522] focus:border-transparent transition"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input 
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3A522] focus:border-transparent transition"
                  required
                  minLength={8}
                />
                <p className="mt-1 text-xs text-gray-500">
                  Password must be at least 8 characters long and include uppercase, lowercase, and numbers.
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
                  required
                />
              </div>
              
              <div className="flex justify-between gap-4">
                <Link 
                  href="/profile" 
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors inline-block"
                >
                  Cancel
                </Link>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 py-2 px-4 ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-[#F3A522] hover:bg-[#003366]'
                  } text-white rounded-lg transition-colors font-medium flex items-center justify-center`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Changing...
                    </>
                  ) : (
                    'Change Password'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}