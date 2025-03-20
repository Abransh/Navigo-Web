// app/admin/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminUserManagement } from '@/components/admin/AdminUserManagement';
import { AdminBookingManagement } from '@/components/admin/AdminBookingManagement';
import { AdminCompanionApplications } from '@/components/admin/AdminCompanionApplications';
import adminService from '@/services/admin-service';
import { toast } from 'react-hot-toast';
import { 
  Users, 
  BookOpen, 
  CreditCard, 
  UserPlus, 
  Loader2
} from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
    pendingVerifications: 0,
    companionApplications: 0,
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await adminService.getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
        toast.error('Failed to load admin dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium">{title}</h3>
          <Icon className={`h-8 w-8 ${color}`} />
        </div>
        <div className="text-3xl font-bold">
          {title.includes('Revenue') ? `₹${value.toLocaleString()}` : value.toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-xl">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="companions">Companions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatCard 
              title="Total Users" 
              value={stats.totalUsers} 
              icon={Users} 
              color="text-blue-500" 
            />
            <StatCard 
              title="Total Bookings" 
              value={stats.totalBookings} 
              icon={BookOpen} 
              color="text-green-500" 
            />
            <StatCard 
              title="Total Revenue" 
              value={stats.totalRevenue} 
              icon={CreditCard} 
              color="text-purple-500" 
            />
            <StatCard 
              title="Pending Verifications" 
              value={stats.pendingVerifications} 
              icon={UserPlus} 
              color="text-amber-500" 
            />
            <StatCard 
              title="Companion Applications" 
              value={stats.companionApplications} 
              icon={UserPlus} 
              color="text-red-500" 
            />
          </div>
          
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">No recent activity to display.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users">
          <AdminUserManagement />
        </TabsContent>
        
        <TabsContent value="bookings">
          <AdminBookingManagement />
        </TabsContent>
        
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payment Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Payment management interface will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="companions">
          <AdminCompanionApplications />
        </TabsContent>
      </Tabs>
    </div>
  );
}