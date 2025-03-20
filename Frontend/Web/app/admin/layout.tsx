// "use client";

// import { useState } from 'react';
// import { 
//   LayoutDashboard, 
//   Users, 
//   BookOpen, 
//   CreditCard, 
//   Settings, 
//   Menu, 
//   X 
// } from 'lucide-react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { useAuth } from '@/contexts/auth-context';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Button } from '@/components/ui/button';
// import { UserRole } from '@/types/user';
// import { useRouter } from 'next/navigation';

// // Navigation menu items
// const NAV_ITEMS = [
//   { 
//     href: '/admin', 
//     label: 'Dashboard', 
//     icon: LayoutDashboard 
//   },
//   { 
//     href: '/admin/users', 
//     label: 'Users', 
//     icon: Users 
//   },
//   { 
//     href: '/admin/bookings', 
//     label: 'Bookings', 
//     icon: BookOpen 
//   },
//   { 
//     href: '/admin/payments', 
//     label: 'Payments', 
//     icon: CreditCard 
//   },
//   { 
//     href: '/admin/settings', 
//     label: 'Settings', 
//     icon: Settings 
//   }
// ];

// export default function AdminLayout({ children }: { children: React.ReactNode }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const { user, logout } = useAuth();
//   const pathname = usePathname();
//   const router = useRouter();

//   // Redirect or block non-admin users
//   if (!user || user.role !== UserRole.ADMIN) {
//     router.push('/');
//     return null;
//   }

//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Mobile & Desktop Sidebar */}
//       <div className={`
//         fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 
//         md:translate-x-0 
//         ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
//       `}>
//         {/* Close button for mobile */}
//         <Button 
//           variant="ghost" 
//           size="icon" 
//           className="md:hidden absolute top-4 right-4"
//           onClick={toggleSidebar}
//         >
//           <X className="h-6 w-6" />
//         </Button>

//         {/* Sidebar Content */}
//         <div className="p-6 space-y-8">
//           {/* Logo */}
//           <div className="flex items-center space-x-3">
//             <img 
//               src="/logo.png" 
//               alt="Navigo Admin" 
//               className="h-10 w-10" 
//             />
//             <h1 className="text-2xl font-bold text-primary">Navigo Admin</h1>
//           </div>

//           {/* Navigation */}
//           <nav className="space-y-2">
//             {NAV_ITEMS.map((item) => (
//               <Link 
//                 key={item.href}
//                 href={item.href}
//                 className={`
//                   flex items-center p-3 rounded-lg transition-colors 
//                   ${pathname === item.href 
//                     ? 'bg-primary text-white' 
//                     : 'hover:bg-gray-100 text-gray-700'
//                   }
//                 `}
//               >
//                 <item.icon className="mr-3 h-5 w-5" />
//                 {item.label}
//               </Link>
//             ))}
//           </nav>

//           {/* User Profile */}
//           <div className="border-t pt-4">
//             <div className="flex items-center space-x-4 mb-4">
//               <Avatar>
//                 <AvatarImage 
//                   src={user?.profilePicture || '/placeholder-avatar.png'} 
//                   alt={user?.firstName || 'Admin'} 
//                 />
//                 <AvatarFallback>
//                   {user?.firstName?.[0]}{user?.lastName?.[0]}
//                 </AvatarFallback>
//               </Avatar>
//               <div>
//                 <p className="font-semibold">{user?.firstName} {user?.lastName}</p>
//                 <p className="text-xs text-gray-500">{user?.email}</p>
//               </div>
//             </div>
//             <Button 
//               variant="destructive" 
//               className="w-full"
//               onClick={() => {
//                 logout();
//                 router.push('/login');
//               }}
//             >
//               Logout
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className="flex-1 md:pl-64">
//         {/* Mobile Header */}
//         <header className="md:hidden bg-white shadow-sm p-4 flex justify-between items-center">
//           <Button 
//             variant="ghost" 
//             size="icon" 
//             onClick={toggleSidebar}
//           >
//             <Menu className="h-6 w-6" />
//           </Button>
//           <img 
//             src="/logo.png" 
//             alt="Navigo" 
//             className="h-8" 
//           />
//         </header>

//         {/* Main Content */}
//         <main className="p-6">
//           {children}
//         </main>
//       </div>

//       {/* Overlay for mobile sidebar */}
//       {isSidebarOpen && (
//         <div 
//           className="fixed inset-0 z-40 bg-black/50 md:hidden" 
//           onClick={toggleSidebar}
//         />
//       )}
//     </div>
//   );
// }

// app/admin/layout.tsx
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { toast } from 'react-hot-toast';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect non-admin users
    if (!loading) {
      if (!user) {
        toast.error('Please log in to access the admin area');
        router.push('/login?redirectTo=/admin');
      } else if (user.role !== 'admin') {
        toast.error('You do not have admin permissions');
        router.push('/');
      }
    }
  }, [user, loading, router]);

  // Show loading state
  if (loading || !user) {
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
  return <>{children}</>;
}