// app/admin/bookings/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  BookOpen, 
  RefreshCw,
  Search,
  Calendar,
  MapPin,
  Clock,
  User,
  AlertCircle,
  CheckCircle,
  XCircle,
  HourglassIcon,
  PlayCircle
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import adminService from '@/services/admin-service';
import { format } from 'date-fns';
import { BookingStatus } from '@/services/booking-service';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const filter = [searchFilter, statusFilter].filter(Boolean).join(' ');
      const response = await adminService.getBookings(page, 10, filter);
      setBookings(response.bookings);
      setTotal(response.total);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  // Initial data load
  useEffect(() => {
    fetchBookings();
  }, [page]);

  // Fetch when filters change
  const applyFilters = () => {
    setPage(1); // Reset to first page
    fetchBookings();
  };

  const viewBookingDetails = (booking) => {
    setSelectedBooking(booking);
    setIsDialogOpen(true);
  };

  // Calculate stats from the current bookings list
  const stats = {
    total: total,
    pending: bookings.filter(b => b.status === BookingStatus.PENDING).length,
    confirmed: bookings.filter(b => b.status === BookingStatus.CONFIRMED).length,
    inProgress: bookings.filter(b => b.status === BookingStatus.IN_PROGRESS).length,
    completed: bookings.filter(b => b.status === BookingStatus.COMPLETED).length,
    cancelled: bookings.filter(b => b.status === BookingStatus.CANCELLED).length,
    totalValue: bookings.reduce((sum, b) => sum + b.totalAmount, 0)
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case BookingStatus.COMPLETED: return "default";
      case BookingStatus.CONFIRMED: return "secondary";
      case BookingStatus.IN_PROGRESS: return "success";
      case BookingStatus.PENDING: return "outline";
      case BookingStatus.CANCELLED: return "destructive";
      default: return "outline";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case BookingStatus.COMPLETED: return CheckCircle;
      case BookingStatus.CONFIRMED: return CheckCircle;
      case BookingStatus.IN_PROGRESS: return PlayCircle;
      case BookingStatus.PENDING: return HourglassIcon;
      case BookingStatus.CANCELLED: return XCircle;
      default: return AlertCircle;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Booking Management</h1>
        <Button variant="outline" onClick={fetchBookings} disabled={loading}>
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                <p className="text-3xl font-bold">{stats.total}</p>
              </div>
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status Breakdown</p>
                <div className="flex gap-1 mt-1">
                  <Badge variant="outline">{stats.pending} Pending</Badge>
                  <Badge variant="secondary">{stats.confirmed} Confirmed</Badge>
                  <Badge variant="success">{stats.inProgress} In Progress</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                <p className="text-3xl font-bold">₹{stats.totalValue.toLocaleString()}</p>
              </div>
              <div className="text-green-500 font-semibold">
                {stats.completed} Completed
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by tourist or companion"
                  className="pl-8"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <Button variant="outline" onClick={() => {
            setSearchFilter('');
            setStatusFilter('');
          }}>
            Reset Filters
          </Button>
          <Button onClick={applyFilters}>
            Apply Filters
          </Button>
        </CardFooter>
      </Card>

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Bookings</CardTitle>
          <CardDescription>
            Manage bookings and check their status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Tourist</TableHead>
                <TableHead>Companion</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">
                    <RefreshCw className="animate-spin h-8 w-8 mx-auto mb-4" />
                    <p className="text-muted-foreground">Loading bookings...</p>
                  </TableCell>
                </TableRow>
              ) : bookings.length > 0 ? (
                bookings.map((booking) => {
                  const StatusIcon = getStatusIcon(booking.status);
                  return (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">
                        {booking.id.slice(-8)}
                      </TableCell>
                      <TableCell>
                        {booking.tourist.firstName} {booking.tourist.lastName}
                      </TableCell>
                      <TableCell>
                        {booking.companion.user?.firstName} {booking.companion.user?.lastName}
                      </TableCell>
                      <TableCell>
                        {format(new Date(booking.startDate), 'MMM d')} - {format(new Date(booking.endDate), 'MMM d, yyyy')}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <StatusIcon className="h-4 w-4" />
                          <Badge variant={getStatusBadgeVariant(booking.status)}>
                            {booking.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>₹{booking.totalAmount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => viewBookingDetails(booking)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">
                    <AlertCircle className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">No bookings found</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          
          {total > 10 && (
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-muted-foreground">
                Showing {bookings.length} of {total} bookings
              </p>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                  disabled={page === 1 || loading}
                >
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setPage(prev => prev + 1)}
                  disabled={page * 10 >= total || loading}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Booking Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>
              View all details of the booking.
            </DialogDescription>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Booking ID</p>
                  <p className="font-mono">{selectedBooking.id}</p>
                </div>
                <Badge variant={getStatusBadgeVariant(selectedBooking.status)} className="text-base py-1 px-3">
                  {selectedBooking.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column - Tour Details */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Tour Details</h3>
                  
                  <div className="bg-muted p-4 rounded-md space-y-3">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Dates</p>
                        <p className="text-sm">
                          {format(new Date(selectedBooking.startDate), 'MMMM d, yyyy')} - 
                          {format(new Date(selectedBooking.endDate), 'MMMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Times</p>
                        <p className="text-sm">
                          {format(new Date(selectedBooking.startDate), 'h:mm a')} - 
                          {format(new Date(selectedBooking.endDate), 'h:mm a')}
                        </p>
                      </div>
                    </div>
                    
                    {selectedBooking.location && (
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Meeting Location</p>
                          <p className="text-sm">{selectedBooking.location}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {selectedBooking.notes && (
                    <div className="bg-muted p-4 rounded-md">
                      <p className="font-medium mb-2">Special Notes</p>
                      <p className="text-sm">{selectedBooking.notes}</p>
                    </div>
                  )}
                  
                  <div className="bg-muted p-4 rounded-md">
                    <p className="font-medium mb-2">Payment Information</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Total Amount</p>
                        <p className="font-medium">₹{selectedBooking.totalAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Hourly Rate</p>
                        <p className="font-medium">₹{selectedBooking.companion.hourlyRate.toLocaleString()}/hr</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right Column - People Involved */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">People Involved</h3>
                  
                  <div className="bg-muted p-4 rounded-md space-y-3">
                    <p className="font-medium">Tourist</p>
                    <div className="flex items-center gap-3">
                      <div className="bg-primary text-primary-foreground rounded-full h-10 w-10 flex items-center justify-center">
                        {selectedBooking.tourist.firstName[0]}{selectedBooking.tourist.lastName[0]}
                      </div>
                      <div>
                        <p>{selectedBooking.tourist.firstName} {selectedBooking.tourist.lastName}</p>
                        <p className="text-sm text-muted-foreground">{selectedBooking.tourist.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-md space-y-3">
                    <p className="font-medium">Companion</p>
                    <div className="flex items-center gap-3">
                      <div className="bg-secondary text-secondary-foreground rounded-full h-10 w-10 flex items-center justify-center">
                        {selectedBooking.companion.user?.firstName?.[0] || 'C'}
                        {selectedBooking.companion.user?.lastName?.[0] || ''}
                      </div>
                      <div>
                        <p>
                          {selectedBooking.companion.user?.firstName || 'Companion'} 
                          {' '}
                          {selectedBooking.companion.user?.lastName || ''}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {selectedBooking.companion.user?.email || 'No email available'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-md">
                    <p className="font-medium mb-2">Booking Timeline</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <p className="text-muted-foreground">Created</p>
                        <p>{format(new Date(selectedBooking.createdAt), 'MMM d, yyyy h:mm a')}</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-muted-foreground">Last Updated</p>
                        <p>{format(new Date(selectedBooking.updatedAt), 'MMM d, yyyy h:mm a')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}