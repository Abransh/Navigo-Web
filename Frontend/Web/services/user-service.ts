// Frontend/Web/services/user-service.ts
import apiClient from './api-client';

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  bio?: string;
  profilePicture?: string | null;
}

export interface ProfilePictureResponse {
  url: string;
}

const getProfile = async (): Promise<UserProfile> => {
  try {
    const response = await apiClient.get<UserProfile>('/users/profile');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    throw error;
  }
};

const updateProfile = async (profileData: UserProfile): Promise<UserProfile> => {
  try {
    const response = await apiClient.patch<UserProfile>('/users/profile', profileData);
    
    // Update local storage user data
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      const updatedUser = { ...user, ...response.data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
    
    return response.data;
  } catch (error) {
    console.error('Failed to update user profile:', error);
    throw error;
  }
};

const uploadProfilePicture = async (formData: FormData): Promise<ProfilePictureResponse> => {
  try {
    const response = await apiClient.post<ProfilePictureResponse>('/users/profile/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to upload profile picture:', error);
    throw error;
  }
};

const changePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
  try {
    await apiClient.post('/users/change-password', {
      currentPassword,
      newPassword,
    });
  } catch (error) {
    console.error('Failed to change password:', error);
    throw error;
  }
};

export default {
  getProfile,
  updateProfile,
  uploadProfilePicture,
  changePassword,
};