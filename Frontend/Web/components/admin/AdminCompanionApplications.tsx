// components/admin/AdminCompanionApplications.tsx
"use client";

import { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  UserPlus, 
  RefreshCw, 
  Check, 
  X
} from 'lucide-react';
import adminService from '@/services/admin-service';
import { toast } from 'react-hot-toast';

export function AdminCompanionApplications() {
  const [applications, setApplications] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const { applications, total } = await adminService.getCompanionApplications(page);
      setApplications(applications);
      setTotal(total);
    } catch (error) {
      console.error('Failed to fetch companion applications:', error);
      toast.error('Failed to fetch companion applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [page]);

  const handleApplicationAction = async (applicationId, status) => {
    setProcessing(true);
    try {
      await adminService.processCompanionApplication(applicationId, status);
      toast.success(`Application ${status === 'approved' ? 'approved' : 'rejected'}`);
      fetchApplications();
    } catch (error) {
      console.error('Failed to process application:', error);
      toast.error('Failed to process application');
    } finally {
      setProcessing(false);
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'approved': return 'default';
      case 'rejected': return 'destructive';
      case 'pending': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <UserPlus className="mr-2" /> Companion Applications
          </CardTitle>
          <Button 
            variant="outline" 
            onClick={fetchApplications}
            disabled={loading}
          >
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">
            <RefreshCw className="animate-spin h-8 w-8 mx-auto mb-4" />
            <p>Loading applications...</p>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Languages</TableHead>
                  <TableHead>Specialties</TableHead>
                  <TableHead>Hourly Rate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.length > 0 ? (
                  applications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell>
                        {app.user.firstName} {app.user.lastName}
                      </TableCell>
                      <TableCell>{app.user.email}</TableCell>
                      <TableCell>{app.languages.join(', ')}</TableCell>
                      <TableCell>{app.specialties.join(', ')}</TableCell>
                      <TableCell>₹{app.hourlyRate.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={getStatusBadgeVariant(app.status)}
                        >
                          {app.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {app.status === 'pending' && (
                            <>
                              <Button 
                                variant="default" 
                                size="sm"
                                onClick={() => handleApplicationAction(app.id, 'approved')}
                                disabled={processing}
                                className="bg-green-500 hover:bg-green-600"
                              >
                                <Check className="mr-1 h-4 w-4" /> Approve
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => handleApplicationAction(app.id, 'rejected')}
                                disabled={processing}
                              >
                                <X className="mr-1 h-4 w-4" /> Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      No applications found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            
            {total > 10 && (
              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-500">
                  Showing {applications.length} of {total} applications
                </p>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                  >
                    Previous
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setPage(prev => prev + 1)}
                    disabled={page * 10 >= total}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}