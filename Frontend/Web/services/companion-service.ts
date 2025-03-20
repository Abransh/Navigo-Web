// services/companion-service.ts
import apiClient from './api-client';

export interface Companion {
  id: string;
  user: {
    firstName: string;
    lastName: string;
    profilePicture?: string;
  };
  bio: string;
  languages: string[];
  specialties: string[];
  hourlyRate: number;
  averageRating: number;
  totalReviews: number;
}

export interface CompanionMatchRequest {
  date: string;
  timeSlot: string;
  duration: number;
  location: string;
  interests?: string[];
  languages?: string[];
}

const findMatchingCompanion = async (matchRequest: CompanionMatchRequest): Promise<Companion> => {
  try {
    const response = await apiClient.post<Companion>('/companions/match', matchRequest);
    return response.data;
  } catch (error) {
    console.error('Failed to find matching companion:', error);
    throw error;
  }
};

const getCompanionAvailability = async (companionId: string, date: string): Promise<boolean> => {
  try {
    const response = await apiClient.get<boolean>(`/companions/${companionId}/availability`, {
      params: { date }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to check companion availability:', error);
    throw error;
  }
};

export default {
  findMatchingCompanion,
  getCompanionAvailability,
};