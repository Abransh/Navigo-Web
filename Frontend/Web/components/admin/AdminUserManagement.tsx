// // components/admin/AdminUserManagement.tsx
// "use client";

// import { useState, useEffect } from 'react';
// import { 
//   Table, 
//   TableBody, 
//   TableCell, 
//   TableHead, 
//   TableHeader, 
//   TableRow 
// } from '@/components/ui/table';
// import { 
//   Card, 
//   CardContent, 
//   CardHeader, 
//   CardTitle 
// } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Input } from '@/components/ui/input';
// import { 
//   Select, 
//   SelectContent, 
//   SelectItem, 
//   SelectTrigger, 
//   SelectValue 
// } from '@/components/ui/select';
// import { 
//   Users, 
//   Filter, 
//   RefreshCw 
// } from 'lucide-react';
// import adminService, { UserManagement } from '@/services/admin-service';
// import { format } from 'date-fns';
// import { toast } from 'react-hot-toast';

// export function AdminUserManagement() {
//   const [users, setUsers] = useState<UserManagement[]>([]);
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [filter, setFilter] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');

//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const { users, total } = await adminService.getUsers(page, 10, `${filter} ${statusFilter}`);
//       setUsers(users);
//       setTotal(total);
//     } catch (error) {
//       toast.error('Failed to fetch users');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, [page, filter, statusFilter]);

//   const handleStatusChange = async (userId: string, status: 'active' | 'suspended') => {
//     try {
//       await adminService.updateUserStatus(userId, status);
//       toast.success(`User status updated to ${status}`);
//       fetchUsers();
//     } catch (error) {
//       toast.error('Failed to update user status');
//     }
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <div className="flex justify-between items-center">
//           <CardTitle className="flex items-center">
//             <Users className="mr-2" /> User Management
//           </CardTitle>
//           <div className="flex items-center space-x-2">
//             <Input 
//               placeholder="Search users..." 
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//               className="w-64"
//             />
//             <Select 
//               value={statusFilter} 
//               onValueChange={setStatusFilter}
//             >
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Filter by Status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="">All Status</SelectItem>
//                 <SelectItem value="active">Active</SelectItem>
//                 <SelectItem value="suspended">Suspended</SelectItem>
//               </SelectContent>
//             </Select>
//             <Button 
//               variant="outline" 
//               onClick={fetchUsers}
//               disabled={loading}
//             >
//               <RefreshCw className="mr-2 h-4 w-4" /> Refresh
//             </Button>
//           </div>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Name</TableHead>
//               <TableHead>Email</TableHead>
//               <TableHead>Role</TableHead>
//               <TableHead>Joined</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead>Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {users.map((user) => (
//               <TableRow key={user.id}>
//                 <TableCell>{user.firstName} {user.lastName}</TableCell>
//                 <TableCell>{user.email}</TableCell>
//                 <TableCell>
//                   <Badge variant="secondary">{user.role}</Badge>
//                 </TableCell>
//                 <TableCell>
//                   {format(new Date(user.createdAt), 'MMM d, yyyy')}
//                 </TableCell>
//                 <TableCell>
//                   <Badge 
//                     variant={
//                       user.status === 'active' 
//                         ? 'default' 
//                         : user.status === 'suspended' 
//                           ? 'destructive' 
//                           : 'outline'
//                     }
//                   >
//                     {user.status}
//                   </Badge>
//                 </TableCell>
//                 <TableCell>
//                   <div className="flex space-x-2">
//                     {user.status === 'active' ? (
//                       <Button 
//                         variant="destructive" 
//                         size="sm"
//                         onClick={() => handleStatusChange(user.id, 'suspended')}
//                       >
//                         Suspend
//                       </Button>
//                     ) : (
//                       <Button 
//                         variant="default" 
//                         size="sm"
//                         onClick={() => handleStatusChange(user.id, 'active')}
//                       >
//                         Activate
//                       </Button>
//                     )}
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   );
// }

// // components/admin/AdminBookingManagement.tsx
// export function AdminBookingManagement() {
//   const [bookings, setBookings] = useState<any[]>([]);
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [filter, setFilter] = useState('');

//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
//       const { bookings, total } = await adminService.getBookings(page, 10, filter);
//       setBookings(bookings);
//       setTotal(total);
//     } catch (error) {
//       toast.error('Failed to fetch bookings');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, [page, filter]);

//   return (
//     <Card>
//       <CardHeader>
//         <div className="flex justify-between items-center">
//           <CardTitle className="flex items-center">
//             <Calendar className="mr-2" /> Booking Management
//           </CardTitle>
//           <div className="flex items-center space-x-2">
//             <Input 
//               placeholder="Search bookings..." 
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//               className="w-64"
//             />
//             <Button 
//               variant="outline" 
//               onClick={fetchBookings}
//               disabled={loading}
//             >
//               <RefreshCw className="mr-2 h-4 w-4" /> Refresh
//             </Button>
//           </div>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Booking ID</TableHead>
//               <TableHead>Tourist</TableHead>
//               <TableHead>Companion</TableHead>
//               <TableHead>Dates</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead>Total Amount</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {bookings.map((booking) => (
//               <TableRow key={booking.id}>
//                 <TableCell>{booking.id.slice(0, 8)}</TableCell>
//                 <TableCell>
//                   {booking.tourist.firstName} {booking.tourist.lastName}
//                 </TableCell>
//                 <TableCell>
//                   {booking.companion.firstName} {booking.companion.lastName}
//                 </TableCell>
//                 <TableCell>
//                   {format(new Date(booking.startDate), 'MMM d, yyyy')} - 
//                   {format(new Date(booking.endDate), 'MMM d, yyyy')}
//                 </TableCell>
//                 <TableCell>
//                   <Badge 
//                     variant={
//                       booking.status === 'completed' 
//                         ? 'default' 
//                         : booking.status === 'cancelled' 
//                           ? 'destructive' 
//                           : 'outline'
//                     }
//                   >
//                     {booking.status}
//                   </Badge>
//                 </TableCell>
//                 <TableCell>₹{booking.totalAmount.toFixed(2)}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   );
// }

// // components/admin/AdminCompanionApplications.tsx
// export function AdminCompanionApplications() {
//   const [applications, setApplications] = useState<any[]>([]);
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const [loading, setLoading] = useState(false);

//   const fetchApplications = async () => {
//     try {
//       setLoading(true);
//       const { applications, total } = await adminService.getCompanionApplications(page);
//       setApplications(applications);
//       setTotal(total);
//     } catch (error) {
//       toast.error('Failed to fetch companion applications');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleApplicationAction = async (applicationId: string, status: 'approved' | 'rejected') => {
//     try {
//       await adminService.processCompanionApplication(applicationId, status);
//       toast.success(`Application ${status}`);
//       fetchApplications();
//     } catch (error) {
//       toast.error('Failed to process application');
//     }
//   };

//   useEffect(() => {
//     fetchApplications();
//   }, [page]);

//   return (
//     <Card>
//       <CardHeader>
//         <div className="flex justify-between items-center">
//           <CardTitle className="flex items-center">
//             <Users className="mr-2" /> Companion Applications
//           </CardTitle>
//           <Button 
//             variant="outline" 
//             onClick={fetchApplications}
//             disabled={loading}
//           ></Button>

// // ... Previous components continue here

// export function AdminCompanionApplications() {
//   const [applications, setApplications] = useState<CompanionApplication[]>([]);
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const [loading, setLoading] = useState(false);

//   const fetchApplications = async () => {
//     try {
//       setLoading(true);
//       const { applications, total } = await adminService.getCompanionApplications(page);
//       setApplications(applications);
//       setTotal(total);
//     } catch (error) {
//       toast.error('Failed to fetch companion applications');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleApplicationAction = async (applicationId: string, status: 'approved' | 'rejected') => {
//     try {
//       await adminService.processCompanionApplication(applicationId, status);
//       toast.success(`Application ${status}`);
//       fetchApplications();
//     } catch (error) {
//       toast.error('Failed to process application');
//     }
//   };

//   useEffect(() => {
//     fetchApplications();
//   }, [page]);

//   return (
//     <Card>
//       <CardHeader>
//         <div className="flex justify-between items-center">
//           <CardTitle className="flex items-center">
//             <Users className="mr-2" /> Companion Applications
//           </CardTitle>
//           <Button 
//             variant="outline" 
//             onClick={fetchApplications}
//             disabled={loading}
//           >
//             <RefreshCw className="mr-2 h-4 w-4" /> Refresh
//           </Button>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Name</TableHead>
//               <TableHead>Email</TableHead>
//               <TableHead>Languages</TableHead>
//               <TableHead>Specialties</TableHead>
//               <TableHead>Hourly Rate</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead>Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {applications.map((app) => (
//               <TableRow key={app.id}>
//                 <TableCell>
//                   {app.user.firstName} {app.user.lastName}
//                 </TableCell>
//                 <TableCell>{app.user.email}</TableCell>
//                 <TableCell>{app.languages.join(', ')}</TableCell>
//                 <TableCell>{app.specialties.join(', ')}</TableCell>
//                 <TableCell>₹{app.hourlyRate.toFixed(2)}</TableCell>
//                 <TableCell>
//                   <Badge 
//                     variant={
//                       app.status === 'pending' 
//                         ? 'outline' 
//                         : app.status === 'approved' 
//                           ? 'default' 
//                           : 'destructive'
//                     }
//                   >
//                     {app.status}
//                   </Badge>
//                 </TableCell>
//                 <TableCell>
//                   <div className="flex space-x-2">
//                     {app.status === 'pending' && (
//                       <>
//                         <Button 
//                           variant="default" 
//                           size="sm"
//                           onClick={() => handleApplicationAction(app.id, 'approved')}
//                         >
//                           Approve
//                         </Button>
//                         <Button 
//                           variant="destructive" 
//                           size="sm"
//                           onClick={() => handleApplicationAction(app.id, 'rejected')}
//                         >
//                           Reject
//                         </Button>
//                       </>
//                     )}
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   );
// }

// // components/admin/AdminPaymentManagement.tsx
// export function AdminPaymentManagement() {
//   const [payments, setPayments] = useState<PaymentRecord[]>([]);
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [filter, setFilter] = useState('');

//   const fetchPayments = async () => {
//     try {
//       setLoading(true);
//       const { payments, total } = await adminService.getPayments(page, 10, filter);
//       setPayments(payments);
//       setTotal(total);
//     } catch (error) {
//       toast.error('Failed to fetch payments');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPayments();
//   }, [page, filter]);

//   return (
//     <Card>
//       <CardHeader>
//         <div className="flex justify-between items-center">
//           <CardTitle className="flex items-center">
//             <CreditCard className="mr-2" /> Payment Management
//           </CardTitle>
//           <div className="flex items-center space-x-2">
//             <Input 
//               placeholder="Search payments..." 
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//               className="w-64"
//             />
//             <Button 
//               variant="outline" 
//               onClick={fetchPayments}
//               disabled={loading}
//             >
//               <RefreshCw className="mr-2 h-4 w-4" /> Refresh
//             </Button>
//           </div>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Payment ID</TableHead>
//               <TableHead>Tourist</TableHead>
//               <TableHead>Amount</TableHead>
//               <TableHead>Method</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead>Date</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {payments.map((payment) => (
//               <TableRow key={payment.id}>
//                 <TableCell>{payment.id.slice(0, 8)}</TableCell>
//                 <TableCell>
//                   {payment.booking.tourist.firstName} {payment.booking.tourist.lastName}
//                 </TableCell>
//                 <TableCell>₹{payment.amount.toFixed(2)}</TableCell>
//                 <TableCell>{payment.method}</TableCell>
//                 <TableCell>
//                   <Badge 
//                     variant={
//                       payment.status === 'completed' 
//                         ? 'default' 
//                         : payment.status === 'failed' 
//                           ? 'destructive' 
//                           : 'outline'
//                     }
//                   >
//                     {payment.status}
//                   </Badge>
//                 </TableCell>
//                 <TableCell>
//                   {format(new Date(payment.createdAt), 'MMM d, yyyy HH:mm')}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   );
// }

// // components/admin/AdminSidebar.tsx
// export function AdminSidebar() {
//   const router = useRouter();
//   const { user, logout } = useAuth();

//   const menuItems = [
//     { 
//       icon: LayoutDashboard, 
//       label: 'Dashboard', 
//       href: '/admin' 
//     },
//     { 
//       icon: Users, 
//       label: 'User Management', 
//       href: '/admin/users' 
//     },
//     { 
//       icon: CalendarDays, 
//       label: 'Bookings', 
//       href: '/admin/bookings' 
//     },
//     { 
//       icon: CreditCard, 
//       label: 'Payments', 
//       href: '/admin/payments' 
//     },
//     { 
//       icon: UserPlus, 
//       label: 'Companion Applications', 
//       href: '/admin/companion-applications' 
//     }
//   ];

//   return (
//     <div className="w-64 bg-gray-50 border-r min-h-screen p-4 flex flex-col">
//       <div className="mb-8">
//         <h2 className="text-2xl font-bold text-primary">Navigo Admin</h2>
//       </div>

//       <nav className="flex-1">
//         {menuItems.map((item) => (
//           <Link 
//             key={item.href} 
//             href={item.href}
//             className={`
//               flex items-center p-3 rounded-lg mb-2 
//               ${router.pathname === item.href 
//                 ? 'bg-primary text-white' 
//                 : 'hover:bg-gray-200 text-gray-700'
//               }
//             `}
//           >
//             <item.icon className="mr-3 h-5 w-5" />
//             {item.label}
//           </Link>
//         ))}
//       </nav>

//       <div className="border-t pt-4">
//         <div className="flex items-center mb-4">
//           <Avatar className="mr-3">
//             <AvatarImage 
//               src={user?.profilePicture || '/placeholder-avatar.png'} 
//               alt={user?.firstName || 'Admin'}
//             />
//             <AvatarFallback>
//               {user?.firstName?.[0]}{user?.lastName?.[0]}
//             </AvatarFallback>
//           </Avatar>
//           <div>
//             <p className="font-medium">{user?.firstName} {user?.lastName}</p>
//             <p className="text-xs text-gray-500">{user?.role}</p>
//           </div>
//         </div>
//         <Button 
//           variant="destructive" 
//           className="w-full"
//           onClick={() => {
//             logout();
//             router.push('/login');
//           }}
//         >
//           Logout
//         </Button>
//       </div>
//     </div>
//   );
// }

// components/admin/AdminUserManagement.tsx
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
import { Input } from '@/components/ui/input';
import { 
  Users, 
  Filter, 
  RefreshCw 
} from 'lucide-react';
import adminService from '@/services/admin-service';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';

export function AdminUserManagement() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { users, total } = await adminService.getUsers(page, 10, `${filter} ${statusFilter}`);
      setUsers(users);
      setTotal(total);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, filter, statusFilter]);

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

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <Users className="mr-2" /> User Management
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Input 
              placeholder="Search users..." 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-64"
            />
            <Button 
              variant="outline" 
              onClick={fetchUsers}
              disabled={loading}
            >
              <RefreshCw className="mr-2 h-4 w-4" /> Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">
            <RefreshCw className="animate-spin h-8 w-8 mx-auto mb-4" />
            <p>Loading users...</p>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.firstName} {user.lastName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        {format(new Date(user.createdAt), 'MMM d, yyyy')}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            user.isActive ? 'default' : 'destructive'
                          }
                        >
                          {user.isActive ? 'Active' : 'Suspended'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
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
                    <TableCell colSpan={6} className="text-center">
                      No users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            
            {total > 10 && (
              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-500">
                  Showing {users.length} of {total} users
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