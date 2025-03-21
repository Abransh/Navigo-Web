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
      if (!user) {
        toast.error('Please log in to access the admin area');
        router.push('/login?redirectTo=/admin');
      } else if (user.role !== 'admin') {
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