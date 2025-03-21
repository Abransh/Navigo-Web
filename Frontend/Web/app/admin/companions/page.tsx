// app/admin/companions/page.tsx
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
import { Badge } from '@/components/ui/badge';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  UserPlus, 
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle,
  Languages,
  Tag
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import adminService from '@/services/admin-service';
import { format } from 'date-fns';

export default function AdminCompanionsPage() {
  const [applications, setApplications] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await adminService.getCompanionApplications(page);
      setApplications(response.applications);
      setTotal(response.total);
    } catch (error) {
      console.error('Failed to fetch companion applications:', error);
      toast.error('Failed to fetch companion applications');
    } finally {
      setLoading(false);
    }
  };

  // Initial data load
  useEffect(() => {
    fetchApplications();
  }, [page]);

  const handleApplicationAction = async (applicationId, status) => {
    try {
      await adminService.processCompanionApplication(applicationId, status);
      toast.success(`Application ${status}`);
      fetchApplications();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Failed to process application:', error);
      toast.error('Failed to process application');
    }
  };

  const viewApplicationDetails = (app) => {
    setSelectedApp(app);
    setIsDialogOpen(true);
  };

  // Calculate stats for the dashboard
  const stats = {
    totalApplications: total,
    pending: applications.filter(app => app.status === 'pending').length,
    approved: applications.filter(app => app.status === 'approved').length,
    rejected: applications.filter(app => app.status === 'rejected').length,
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'approved': return "success";
      case 'rejected': return "destructive";
      case 'pending': return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Companion Applications</h1>
        <Button variant="outline" onClick={fetchApplications} disabled={loading}>
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Applications</p>
                <p className="text-3xl font-bold">{stats.totalApplications}</p>
              </div>
              <UserPlus className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-3xl font-bold">{stats.pending}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Approved</p>
                <p className="text-3xl font-bold">{stats.approved}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rejected</p>
                <p className="text-3xl font-bold">{stats.rejected}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Companion Applications</CardTitle>
          <CardDescription>
            Review and process applications from users who want to become companions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Languages</TableHead>
                <TableHead>Hourly Rate</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    <RefreshCw className="animate-spin h-8 w-8 mx-auto mb-4" />
                    <p className="text-muted-foreground">Loading applications...</p>
                  </TableCell>
                </TableRow>
              ) : applications.length > 0 ? (
                applications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage 
                            src={app.user.profilePicture || ''} 
                            alt={app.user.firstName} 
                          />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {app.user.firstName[0]}{app.user.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{app.user.firstName} {app.user.lastName}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{app.user.email}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {app.languages.map((lang, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>₹{app.hourlyRate.toFixed(2)}/hr</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(app.status)}>
                        {app.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => viewApplicationDetails(app)}
                        >
                          View
                        </Button>
                        {app.status === 'pending' && (
                          <>
                            <Button 
                              variant="default" 
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleApplicationAction(app.id, 'approved')}
                            >
                              <CheckCircle className="mr-1 h-4 w-4" />
                              Approve
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleApplicationAction(app.id, 'rejected')}
                            >
                              <XCircle className="mr-1 h-4 w-4" />
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    <AlertCircle className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">No applications found</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          
          {total > 10 && (
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-muted-foreground">
                Showing {applications.length} of {total} applications
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

      {/* Application Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
            <DialogDescription>
              Review all details of the companion application.
            </DialogDescription>
          </DialogHeader>
          
          {selectedApp && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Applicant Info */}
                <div className="sm:w-1/3 space-y-4">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-24 w-24 mb-2">
                      <AvatarImage 
                        src={selectedApp.user.profilePicture || ''} 
                        alt={selectedApp.user.firstName} 
                      />
                      <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                        {selectedApp.user.firstName[0]}{selectedApp.user.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg">
                      {selectedApp.user.firstName} {selectedApp.user.lastName}
                    </h3>
                    <p className="text-sm text-muted-foreground">{selectedApp.user.email}</p>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-md space-y-2">
                    <div className="flex items-center gap-2">
                      <Languages className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Languages</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {selectedApp.languages.map((lang, index) => (
                        <Badge key={index} variant="outline">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-md space-y-2">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Specialties</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {selectedApp.specialties.map((spec, index) => (
                        <Badge key={index} variant="outline">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-md">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Hourly Rate</span>
                      <Badge variant="secondary">₹{selectedApp.hourlyRate.toFixed(2)}/hr</Badge>
                    </div>
                  </div>
                </div>
                
                {/* Bio Section */}
                <div className="sm:w-2/3 space-y-4">
                  <div>
                    <h3 className="font-medium text-sm mb-2">Bio</h3>
                    <div className="bg-muted p-4 rounded-md min-h-[150px]">
                      <p className="text-sm whitespace-pre-line">{selectedApp.bio}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-sm mb-2">Application Status</h3>
                    <div className="bg-muted p-4 rounded-md">
                      <div className="flex items-center justify-between">
                        <span>Current Status</span>
                        <Badge variant={getStatusBadgeVariant(selectedApp.status)}>
                          {selectedApp.status}
                        </Badge>
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground">
                        Applied on {format(new Date(selectedApp.createdAt), 'MMMM d, yyyy')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="sm:justify-between gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
            
            {selectedApp && selectedApp.status === 'pending' && (
              <div className="flex gap-2">
                <Button 
                  variant="destructive"
                  onClick={() => handleApplicationAction(selectedApp.id, 'rejected')}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject Application
                </Button>
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => handleApplicationAction(selectedApp.id, 'approved')}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve Application
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}