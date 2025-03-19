// types/user.ts
export enum UserRole {
    TOURIST = 'tourist',
    COMPANION = 'companion',
    ADMIN = 'admin'
  }
  
  export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    phoneNumber?: string;
    profilePicture?: string;
    bio?: string;
    nationality?: string;
    isVerified: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface UserProfile extends Omit<User, 'password'> {}
  
  export interface UserStats {
    totalUsers: number;
    activeUsers: number;
    newUsersThisMonth: number;
    usersByRole: {
      [key in UserRole]: number;
    };
  }
  
  export interface UserFilter {
    role?: UserRole;
    isActive?: boolean;
    isVerified?: boolean;
    searchTerm?: string;
  }
  
  export interface PaginatedUsers {
    users: UserProfile[];
    total: number;
    page: number;
    limit: number;
  }
  
  export interface CreateUserInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: UserRole;
    phoneNumber?: string;
    profilePicture?: string;
  }
  
  export interface UpdateUserInput {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    profilePicture?: string;
    bio?: string;
    nationality?: string;
    isActive?: boolean;
    isVerified?: boolean;
  }