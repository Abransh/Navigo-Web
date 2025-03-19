"use client";

import { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Users, 
  BookOpen, 
  CreditCard, 
  Activity 
} from 'lucide-react';
import adminService from '@/services/admin-service';
import { toast } from 'react-hot-toast';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
    recentActivity: []
  });

  const [monthlyData, setMonthlyData] = useState([
    { month: 'Jan', users: 0, bookings: 0, revenue: 0 },
    { month: 'Feb', users: 0, bookings: 0, revenue: 0 },
    { month: 'Mar', users: 0, bookings: 0, revenue: 0 },
    { month: 'Apr', users: 0, bookings: 0, revenue: 0 },
    { month: 'May', users: 0, bookings: 0, revenue: 0 },
    { month: 'Jun', users: 0, bookings: 0, revenue: 0 },
  ]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const statsData = await adminService.getDashboardStats();
        setStats({
          totalUsers: statsData.totalUsers,
          totalBookings: statsData.totalBookings,
          totalRevenue: statsData.totalRevenue,
          recentActivity: [] // Fetch recent activity separately
        });

        // Mock monthly data - in a real app, fetch this from backend
        const mockMonthlyData = [
          { month: 'Jan', users: 50, bookings: 20, revenue: 5000 },
          { month: 'Feb', users: 75, bookings: 35, revenue: 7500 },
          { month: 'Mar', users: 100, bookings: 45, revenue: 10000 },
          { month: 'Apr', users: 120, bookings: 55, revenue: 12000 },
          { month: 'May', users: 150, bookings: 70, revenue: 15000 },
          { month: 'Jun', users: 200, bookings: 90, revenue: 20000 },
        ];
        setMonthlyData(mockMonthlyData);
      } catch (error) {
        toast.error('Failed to fetch dashboard statistics');
      }
    };

    fetchDashboardData();
  }, []);

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    color 
  }: { 
    title: string, 
    value: number, 
    icon: React.ElementType, 
    color: string 
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {title.includes('Revenue') ? `₹${value.toLocaleString()}` : value}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Performance Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#8884d8" name="Users" />
                <Bar dataKey="bookings" fill="#82ca9d" name="Bookings" />
                <Bar dataKey="revenue" fill="#ffc658" name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((_, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <Activity className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">
                        New Booking Created
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date().toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}