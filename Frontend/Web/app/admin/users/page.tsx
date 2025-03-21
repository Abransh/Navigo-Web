// app/admin/users/page.tsx
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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Users, 
  Search, 
  RefreshCw,
  UserPlus,
  Edit,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import adminService from '@/services/admin-service';
import { format } from 'date-fns';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const filter = [searchFilter, roleFilter, statusFilter].filter(Boolean).join(' ');
      const response = await adminService.getUsers(page, 10, filter);
      setUsers(response.users);
      setTotal(response.total);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  // Initial data load
  useEffect(() => {
    fetchUsers();
  }, [page]);

  // Fetch when filters change
  const applyFilters = () => {
    setPage(1); // Reset to first page
    fetchUsers();
  };

  const handleStatusChange = async (userId, status) => {
    try {
      await adminService.updateUserStatus(userId, status);
      toast.success(`User status updated to ${status}`);
      fetchUsers();
    } catch (error) {
      console.error('Failed to update user status:', error);
      toast.error('Failed to update user status');
    }
  };

  const openUserDetails = (user) => {
    setSelectedUser(user);
    setIsUserDialogOpen(true);
  };

  // Calculate stats from current user list
  const userStats = {
    total: total,
    active: users.filter(user => user.isActive).length,
    inactive: users.filter(user => !user.isActive).length,
    admins: users.filter(user => user.role === 'admin').length,
    tourists: users.filter(user => user.role === 'tourist').length,
    companions: users.filter(user => user.role === 'companion').length,
  };

  const getStatusBadgeVariant = (isActive) => {
    return isActive ? "success" : "destructive";
  };

  const getRoleBadgeVariant = (role) => {
    switch (role) {
      case 'admin': return "destructive";
      case 'companion': return "default";
      case 'tourist': return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Management</h1>
        <Button disabled>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-3xl font-bold">{userStats.total}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active / Inactive</p>
                <p className="text-3xl font-bold">{userStats.active} / {userStats.inactive}</p>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <XCircle className="h-8 w-8 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">By Role</p>
                <p className="text-lg font-medium">
                  <Badge variant="destructive" className="mr-1">A: {userStats.admins}</Badge>
                  <Badge variant="default" className="mr-1">C: {userStats.companions}</Badge>
                  <Badge variant="secondary">T: {userStats.tourists}</Badge>
                </p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email"
                  className="pl-8"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium">Role</label>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="companion">Companion</SelectItem>
                  <SelectItem value="tourist">Tourist</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <Button variant="outline" onClick={() => {
            setSearchFilter('');
            setRoleFilter('');
            setStatusFilter('');
          }}>
            Reset Filters
          </Button>
          <Button onClick={applyFilters}>
            Apply Filters
          </Button>
        </CardFooter>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Users</CardTitle>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={fetchUsers}
              disabled={loading}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
          <CardDescription>
            Manage user accounts and permissions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    <RefreshCw className="animate-spin h-8 w-8 mx-auto mb-4" />
                    <p className="text-muted-foreground">Loading users...</p>
                  </TableCell>
                </TableRow>
              ) : users.length > 0 ? (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      {user.firstName} {user.lastName}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={getRoleBadgeVariant(user.role)}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.isActive ? "default" : "destructive"}>
                        {user.isActive ? "Active" : "Suspended"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {format(new Date(user.createdAt), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => openUserDetails(user)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {user.isActive ? (
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleStatusChange(user.id, 'suspended')}
                          >
                            Suspend
                          </Button>
                        ) : (
                          <Button 
                            variant="default" 
                            size="sm"
                            onClick={() => handleStatusChange(user.id, 'active')}
                          >
                            Activate
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    <AlertCircle className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">No users found</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          
          {total > 10 && (
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-muted-foreground">
                Showing {users.length} of {total} users
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

      {/* User Details Dialog */}
      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              View and edit user information.
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Basic Information</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground">First Name</p>
                    <p>{selectedUser.firstName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Last Name</p>
                    <p>{selectedUser.lastName}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p>{selectedUser.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Role & Status</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Role</p>
                    <Badge variant={getRoleBadgeVariant(selectedUser.role)}>
                      {selectedUser.role}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <Badge variant={selectedUser.isActive ? "default" : "destructive"}>
                      {selectedUser.isActive ? "Active" : "Suspended"}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Account Information</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Created At</p>
                    <p>{format(new Date(selectedUser.createdAt), 'MMM d, yyyy')}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Verified</p>
                    <p>{selectedUser.isVerified ? "Yes" : "No"}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUserDialogOpen(false)}>
              Close
            </Button>
            {selectedUser && (
              selectedUser.isActive ? (
                <Button 
                  variant="destructive" 
                  onClick={() => {
                    handleStatusChange(selectedUser.id, 'suspended');
                    setIsUserDialogOpen(false);
                  }}
                >
                  Suspend User
                </Button>
              ) : (
                <Button 
                  variant="default" 
                  onClick={() => {
                    handleStatusChange(selectedUser.id, 'active');
                    setIsUserDialogOpen(false);
                  }}
                >
                  Activate User
                </Button>
              )
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}