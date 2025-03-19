// app/admin/layout.tsx
"use client";

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { UserRole } from '@/types/user';
import { useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect logic for non-admin users
    if (!loading) {
      if (!isAuthenticated) {
        router.push('/login?redirectTo=/admin');
      } else if (user?.role !== UserRole.ADMIN) {
        router.push('/');
      }
    }
  }, [user, loading, isAuthenticated, router]);

  // Show nothing while checking authentication
  if (loading || !isAuthenticated || user?.role !== UserRole.ADMIN) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

// app/admin/page.tsx (Main Dashboard)
"use client";

import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Users, 
  CreditCard, 
  BookOpen, 
  StarHalf, 
  TrendingUp, 
  TrendingDown 
} from 'lucide-react';
import adminService from '@/services/admin-service';
import { toast } from 'react-hot-toast';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCompanions: 0,
    totalBookings: 0,
    totalRevenue: 0,
    pendingVerifications: 0,
    companionApplications: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsData = await adminService.getDashboardStats();
        setStats(statsData);
      } catch (error) {
        toast.error('Failed to fetch dashboard statistics');
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    trend 
  }: { 
    title: string, 
    value: number, 
    icon: React.ElementType, 
    trend?: 'up' | 'down' 
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            {trend === 'up' ? (
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
            ) : (
              <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
            )}
            <span className={trend === 'up' ? 'text-green-500' : 'text-red-500'}>
              {trend === 'up' ? '+12.5%' : '-5.2%'}
            </span>
            <span className="ml-1">from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Users" 
          value={stats.totalUsers} 
          icon={Users} 
          trend="up" 
        />
        <StatCard 
          title="Total Companions" 
          value={stats.totalCompanions} 
          icon={StarHalf} 
          trend="up" 
        />
        <StatCard 
          title="Total Bookings" 
          value={stats.totalBookings} 
          icon={BookOpen} 
          trend="down" 
        />
        <StatCard 
          title="Total Revenue" 
          value={stats.totalRevenue} 
          icon={CreditCard} 
          trend="up" 
        />
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pending Verifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.