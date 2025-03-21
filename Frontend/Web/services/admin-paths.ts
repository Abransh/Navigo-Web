// services/admin-paths.ts
import { basePath } from './api-client';

// Central place to define all admin API paths
export const ADMIN_PATHS = {
  // Dashboard
  STATS: `${basePath}/admin/stats`,
  
  // User management
  USERS: `${basePath}/admin/users`,
  USER_STATUS: (userId: string) => `${basePath}/admin/users/${userId}/status`,
  
  // Booking management
  BOOKINGS: `${basePath}/admin/bookings`,
  BOOKING_DETAILS: (bookingId: string) => `${basePath}/admin/bookings/${bookingId}`,
  
  // Payment management
  PAYMENTS: `${basePath}/admin/payments`,
  
  // Companion applications
  COMPANION_APPLICATIONS: `${basePath}/admin/companion-applications`,
  PROCESS_APPLICATION: (applicationId: string) => 
    `${basePath}/admin/companion-applications/${applicationId}`,
};