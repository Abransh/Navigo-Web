// app/admin/layout.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  CreditCard,
  UserPlus,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { createAdminUser } from '@/lib/auth-debug'; // Import the admin creation function

// Navigation items for the admin sidebar
const NAV_ITEMS = [
  { 
    href: '/admin', 
    label: 'Dashboard', 
    icon: LayoutDashboard 
  },
  { 
    href: '/admin/users', 
    label: 'Users', 
    icon: Users 
  },
  { 
    href: '/admin/bookings', 
    label: 'Bookings', 
    icon: BookOpen 
  },
  { 
    href: '/admin/payments', 
    label: 'Payments', 
    icon: CreditCard 
  },
  {
    href: '/admin/companions',
    label: 'Companions',
    icon: UserPlus
  }
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  // Set isClient to true when component mounts (to avoid hydration mismatch)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Redirect non-admin users
  useEffect(() => {
    if (!loading && isClient) {
      console.log("Admin check - Current user:", user);
      
      // Check for force admin mode
      const forceAdmin = localStorage.getItem('forceAdmin') === 'true';
      
      if (forceAdmin) {
        console.log("Using force admin bypass");
        // If we're using force admin, let's make sure we have admin user data
        if (!user || user.role?.toLowerCase() !== 'admin') {
          const adminBypassData = localStorage.getItem('user');
          if (adminBypassData) {
            try {
              // Try to parse and use the admin bypass data
              const adminUser = JSON.parse(adminBypassData);
              // This is just for logging, as the auth context should already be using this
              console.log("Using admin bypass data:", adminUser);
            } catch (e) {
              console.error("Failed to parse admin bypass data", e);
            }
          }
        }
        return; // Skip all checks if force admin is enabled
      }
      
      // Normal authentication checks...
      if (!user) {
        toast.error('Please log in to access the admin area');
        router.push('/login?redirectTo=/admin');
      } else if (user.role?.toLowerCase() !== 'admin') {
        console.log("Redirecting - User role is not admin:", user.role);
        toast.error('You do not have admin permissions');
        router.push('/');
      }
    }
  }, [user, loading, router, isClient]);

  // Toggle sidebar for mobile view
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Handle logout
  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  // Show loading state
  if (loading || !isClient || !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#F3A522] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-xl">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  // If user is not admin, don't render children
  if (user.role !== 'admin') {
    return null;
  }

  // Render admin layout for admin users
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile & Desktop Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 
        md:translate-x-0 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Close button for mobile */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden absolute top-4 right-4"
          onClick={toggleSidebar}
        >
          <X className="h-6 w-6" />
        </Button>

        {/* Sidebar Content */}
        <div className="p-6 space-y-8">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            {/* Replace with your logo or icon */}
            <div className="h-10 w-10 bg-[#F3A522] rounded-full flex items-center justify-center text-white font-bold">
              N
            </div>
            <h1 className="text-2xl font-bold text-[#003366]">Navigo Admin</h1>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {NAV_ITEMS.map((item) => (
              <Link 
                key={item.href}
                href={item.href}
                className={`
                  flex items-center p-3 rounded-lg transition-colors 
                  ${item.href === '/admin' 
                    ? 'bg-[#F3A522] text-white' 
                    : 'hover:bg-gray-100 text-gray-700'
                  }
                `}
                onClick={() => setIsSidebarOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User Profile */}
          <div className="border-t pt-4">
            <div className="flex items-center space-x-4 mb-4">
              <Avatar>
                <AvatarImage 
                  src={user?.profilePicture || ''} 
                  alt={user?.firstName || 'Admin'} 
                />
                <AvatarFallback className="bg-[#003366] text-white">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
            <Button 
              variant="destructive" 
              className="w-full flex items-center justify-center"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 md:pl-64">
        {/* Mobile Header */}
        <header className="md:hidden bg-white shadow-sm p-4 flex justify-between items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold">Navigo Admin</h1>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {/* Debug Panel - Only shown in development */}
          {process.env.NODE_ENV === 'development' && (
            <div className="p-4 bg-amber-50 border-amber-200 border rounded-md text-amber-800 text-sm mb-4">
              <h3 className="font-bold">Admin Debug Info</h3>
              <div className="mt-2">
                <p>User: {user?.firstName} {user?.lastName}</p>
                <p>Role: {user?.role}</p>
                <p>Token Present: {typeof window !== 'undefined' && localStorage.getItem('token') ? '✓' : '✗'}</p>
                <button 
                  className="mt-2 px-2 py-1 bg-amber-500 text-white rounded-md text-xs"
                  onClick={async () => {
                    try {
                      const result = await createAdminUser();
                      if (result.success) {
                        toast.success('Admin user created/logged in!');
                        window.location.reload();
                      } else {
                        toast.error(result.error);
                      }
                    } catch (error) {
                      toast.error('Admin creation failed');
                      console.error(error);
                    }
                  }}
                >
                  Create/Login Admin User
                </button>
              </div>
            </div>
          )}
          
          {children}
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden" 
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}