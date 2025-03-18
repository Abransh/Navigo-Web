// Frontend/Web/app/profile/page.tsx
"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import Image from "next/image";
import userService from "@/services/user-service";
import { toast } from "react-hot-toast";

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  bio: string;
  profilePicture: string | null;
}

export default function ProfilePage() {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    bio: "",
    profilePicture: null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login?redirectTo=/profile');
    }
  }, [isAuthenticated, loading, router]);

  // Load user data
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        bio: user.bio || "",
        profilePicture: user.profilePicture || null,
      });
      
      if (user.profilePicture) {
        setImagePreview(user.profilePicture);
      }
    }
  }, [user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      let profilePictureUrl = formData.profilePicture;
      
      // Upload image if changed
      if (imageFile) {
        const formDataUpload = new FormData();
        formDataUpload.append('file', imageFile);
        
        const uploadResult = await userService.uploadProfilePicture(formDataUpload);
        profilePictureUrl = uploadResult.url;
      }
      
      // Update profile data
      const updatedUserData = {
        ...formData,
        profilePicture: profilePictureUrl,
      };
      
      await userService.updateProfile(updatedUserData);
      
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-[#003366] to-[#0066cc] px-6 py-8 md:p-10 text-white relative">
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="mt-2 text-blue-100">Manage your personal information and travel preferences</p>
            
            {/* Profile Picture */}
            <div className="absolute -bottom-16 right-10">
              <div className="relative h-32 w-32 rounded-full bg-white p-1 shadow-lg">
                {imagePreview ? (
                  <Image 
                    src={imagePreview} 
                    alt="Profile picture" 
                    width={128} 
                    height={128} 
                    className="rounded-full h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full rounded-full bg-[#003366] flex items-center justify-center">
                    <span className="text-white text-3xl font-bold">
                      {user?.firstName && user?.lastName 
                        ? `${user.firstName[0]}${user.lastName[0]}`
                        : '?'}
                    </span>
                  </div>
                )}
                
                {isEditing && (
                  <label 
                    htmlFor="profilePicture" 
                    className="absolute -bottom-2 -right-2 bg-[#F3A522] rounded-full p-2 cursor-pointer shadow-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                    </svg>
                    <input 
                      id="profilePicture" 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>
          
          {/* Profile Content */}
          <div className="pt-20 px-6 pb-8 md:p-10">
            {/* Edit/Save Buttons */}
            <div className="flex justify-end mb-6">
              {isEditing ? (
                <div className="space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                    disabled={isSaving}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-[#003366] text-white rounded-md hover:bg-[#00264d] transition-colors flex items-center"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <span className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-[#F3A522] text-white rounded-md hover:bg-[#e09415] transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>
            
            {/* Profile Form */}
            <form className="space-y-6">
              {/* Personal Information Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F3A522] focus:border-transparent"
                        required
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-md">{formData.firstName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F3A522] focus:border-transparent"
                        required
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-md">{formData.lastName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    {isEditing ? (
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F3A522] focus:border-transparent"
                        required
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-md">{formData.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F3A522] focus:border-transparent"
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-md">{formData.phoneNumber || "No phone number added"}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Bio Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">About Me</h2>
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  {isEditing ? (
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F3A522] focus:border-transparent"
                      placeholder="Tell us a bit about yourself, your travel interests, and preferences..."
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded-md min-h-[100px]">
                      {formData.bio || "No bio added yet."}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Account Actions Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Actions</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                    <div>
                      <h3 className="font-medium text-gray-800">Change Password</h3>
                      <p className="text-gray-500 text-sm">Update your password for better security</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => router.push('/change-password')}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      Change
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                    <div>
                      <h3 className="font-medium text-red-600">Delete Account</h3>
                      <p className="text-gray-500 text-sm">Permanently delete your account and all data</p>
                    </div>
                    <button
                      type="button"
                      className="px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
                      onClick={() => {
                        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                          // Handle account deletion
                          toast.error('Account deletion is not implemented yet.');
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}