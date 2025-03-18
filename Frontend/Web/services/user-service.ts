// services/user-service.ts
import apiClient from './api-client';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  nationality?: string;
  profilePicture?: string;
  role: string;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
}

export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  nationality?: string;
  profilePicture?: string;
}

/**
 * Get the current logged in user's profile
 */
const getCurrentUser = async (): Promise<User> => {
  const response = await apiClient.get<User>('/users/me');
  return response.data;
};

/**
 * Update the current user's profile
 */
const updateUserProfile = async (data: UpdateUserData): Promise<User> => {
  const response = await apiClient.patch<User>('/users/me', data);
  return response.data;
};

/**
 * Upload a profile picture
 */
const uploadProfilePicture = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await apiClient.post<{url: string}>('/users/me/profile-picture', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data.url;
};

/**
 * Update user preferences (notification settings, language, etc.)
 */
const updateUserPreferences = async (preferences: any): Promise<any> => {
  const response = await apiClient.patch<any>('/users/me/preferences', preferences);
  return response.data;
};

/**
 * Delete user account
 */
const deleteAccount = async (): Promise<void> => {
  await apiClient.delete('/users/me');
};

export default {
  getCurrentUser,
  updateUserProfile,
  uploadProfilePicture,
  updateUserPreferences,
  deleteAccount,
};