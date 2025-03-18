// services/destination-service.ts
import apiClient from './api-client';

export interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  highlights?: string[];
  attractions?: {
    name: string;
    description: string;
    image: string;
  }[];
}

const getDestinations = async (): Promise<Destination[]> => {
  const response = await apiClient.get<Destination[]>('/destinations');
  return response.data;
};

const getDestination = async (slug: string): Promise<Destination> => {
  const response = await apiClient.get<Destination>(`/destinations/${slug}`);
  return response.data;
};

export default {
  getDestinations,
  getDestination,
};