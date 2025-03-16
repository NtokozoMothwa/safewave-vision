
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Users, Search, AlertCircle, Shield, Activity, Settings2 } from 'lucide-react';
import { toast } from 'sonner';

// Mock data for users
const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active', lastActive: '2 hours ago' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active', lastActive: '5 minutes ago' },
  { id: '3', name: 'Admin User', email: 'admin@example.com', role: 'admin', status: 'active', lastActive: 'Just now' },
  { id: '4', name: 'Robert Johnson', email: 'robert@example.com', role: 'user', status: 'inactive', lastActive: '3 days ago' },
  { id: '5', name: 'Emma Wilson', email: 'emma@example.com', role: 'user', status: 'active', lastActive: '1 day ago' },
];

// Mock data for alerts
const mockAlerts = [
  { id: '1', userId: '2', type: 'health', message: 'Abnormal heart rate detected', timestamp: '10 minutes ago', severity: 'high' },
  { id: '2', userId: '1', type: 'location', message: 'Left safe zone', timestamp: '1 hour ago', severity: 'medium' },
  { id: '3', userId: '4', type: 'system', message: 'Device battery low', timestamp: '30 minutes ago', severity: 'low' },
  { id: '4', userId: '5', type: 'environment', message: 'High CO2 levels detected', timestamp: '2 hours ago', severity: 'high' },
];

const AdminDashboard = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredUsers = mockUsers.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAddUser = () => {
    toast.info('This would open a form to add a new user');
  };
  
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <Badge className="bg-safesphere-red">High</Badge>;
      case 'medium':
        return <Badge className="bg-safesphere-warning">Medium</Badge>;
      case 'low':
        return <Badge className="bg-safesphere-info">Low</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-safesphere-success">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-safesphere-white-muted/30">Inactive</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  return (
    <div className="min-h-screen bg-mesh-pattern">
      <Header />
      <AnimatedTransition className="max-w-7xl mx-auto">
        <div className="px-4 pt-20 pb-10">
          <AnimatedTransition direction="up" className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-safesphere-white-muted/60 mt-2">
                  Welcome back, {user?.name || 'Admin'}
                </p>
              </div>
              <Card className="w-auto bg-safesphere-dark-card border-white/10 p-4">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-safesphere-white-muted/60">Total Users</span>
                    <span className="text-2xl font-bold">{mockUsers.length}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-safesphere-white-muted/60">Active Alerts</span>
                    <span className="text-2xl font-bold">{mockAlerts.length}</span>
                  </div>
                </div>
              </Card>
            </div>
          </AnimatedTransition>
          
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="glass-panel grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users size={16} />
                <span>Users</span>
              </TabsTrigger>
              <TabsTrigger value="alerts" className="flex items-center gap-2">
                <AlertCircle size={16} />
                <span>Alerts</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings2 size={16} />
                <span>Settings</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="users" className="space-y-4">
              <Card className="bg-safesphere-dark-card border-white/10">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl text-safesphere-white flex items-center gap-2">
                      <Shield size={20} className="text-safesphere-info" />
                      User Management
                    </CardTitle>
                    <Button onClick={handleAddUser} className="bg-safesphere-info hover:bg-safesphere-info/80">
                      <UserPlus size={16} className="mr-2" />
                      Add User
                    </Button>
                  </div>
                  <CardDescription className="text-safesphere-white-muted/60">
                    Manage users and their permissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex w-full max-w-sm items-center space-x-2 mb-4">
                    <div className="relative w-full">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-safesphere-white-muted/40 h-4 w-4" />
                      <Input
                        type="search"
                        placeholder="Search users..."
                        className="pl-10 bg-safesphere-dark-hover border-white/10 text-safesphere-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="rounded-md border border-white/10 overflow-hidden">
                    <Table>
                      <TableHeader className="bg-safesphere-black">
                        <TableRow className="hover:bg-safesphere-black/50 border-b-white/10">
                          <TableHead className="text-safesphere-white">Name</TableHead>
                          <TableHead className="text-safesphere-white">Email</TableHead>
                          <TableHead className="text-safesphere-white">Role</TableHead>
                          <TableHead className="text-safesphere-white">Status</TableHead>
                          <TableHead className="text-safesphere-white">Last Active</TableHead>
                          <TableHead className="text-safesphere-white text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.length > 0 ? (
                          filteredUsers.map((user) => (
                            <TableRow key={user.id} className="hover:bg-safesphere-dark-hover border-b-white/10">
                              <TableCell className="font-medium text-safesphere-white">{user.name}</TableCell>
                              <TableCell className="text-safesphere-white-muted/70">{user.email}</TableCell>
                              <TableCell>
                                <Badge variant={user.role === 'admin' ? 'destructive' : 'outline'} className={user.role === 'admin' ? 'bg-safesphere-purple' : ''}>
                                  {user.role === 'admin' ? 'Admin' : 'User'}
                                </Badge>
                              </TableCell>
                              <TableCell>{getStatusBadge(user.status)}</TableCell>
                              <TableCell className="text-safesphere-white-muted/70">{user.lastActive}</TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm" className="h-8 text-safesphere-info hover:text-safesphere-info/80 hover:bg-safesphere-black/20">
                                  Edit
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center h-24 text-safesphere-white-muted/60">
                              No users found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="alerts" className="space-y-4">
              <Card className="bg-safesphere-dark-card border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-safesphere-white flex items-center gap-2">
                    <Activity size={20} className="text-safesphere-warning" />
                    System Alerts
                  </CardTitle>
                  <CardDescription className="text-safesphere-white-muted/60">
                    Monitor and manage system alerts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border border-white/10 overflow-hidden">
                    <Table>
                      <TableHeader className="bg-safesphere-black">
                        <TableRow className="hover:bg-safesphere-black/50 border-b-white/10">
                          <TableHead className="text-safesphere-white">User</TableHead>
                          <TableHead className="text-safesphere-white">Type</TableHead>
                          <TableHead className="text-safesphere-white">Message</TableHead>
                          <TableHead className="text-safesphere-white">Severity</TableHead>
                          <TableHead className="text-safesphere-white">Time</TableHead>
                          <TableHead className="text-safesphere-white text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockAlerts.map((alert) => {
                          const alertUser = mockUsers.find(u => u.id === alert.userId);
                          return (
                            <TableRow key={alert.id} className="hover:bg-safesphere-dark-hover border-b-white/10">
                              <TableCell className="font-medium text-safesphere-white">
                                {alertUser?.name || 'Unknown User'}
                              </TableCell>
                              <TableCell className="capitalize text-safesphere-white-muted/70">{alert.type}</TableCell>
                              <TableCell className="text-safesphere-white-muted/70">{alert.message}</TableCell>
                              <TableCell>{getSeverityBadge(alert.severity)}</TableCell>
                              <TableCell className="text-safesphere-white-muted/70">{alert.timestamp}</TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm" className="h-8 text-safesphere-info hover:text-safesphere-info/80 hover:bg-safesphere-black/20">
                                  Resolve
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4">
              <Card className="bg-safesphere-dark-card border-white/10">
                <CardHeader>
                  <CardTitle className="text-xl text-safesphere-white flex items-center gap-2">
                    <Settings2 size={20} className="text-safesphere-white-muted" />
                    System Settings
                  </CardTitle>
                  <CardDescription className="text-safesphere-white-muted/60">
                    Configure global system settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="systemName" className="text-safesphere-white">System Name</Label>
                    <Input id="systemName" defaultValue="SafeSphere Security Platform" className="bg-safesphere-dark-hover border-white/10 text-safesphere-white" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="alertThreshold" className="text-safesphere-white">Alert Threshold</Label>
                    <Input id="alertThreshold" type="number" defaultValue="75" className="bg-safesphere-dark-hover border-white/10 text-safesphere-white" />
                    <p className="text-xs text-safesphere-white-muted/60">
                      Set the sensitivity threshold for system-generated alerts (0-100)
                    </p>
                  </div>
                  
                  <div className="pt-4">
                    <Button className="bg-safesphere-info hover:bg-safesphere-info/80">
                      Save Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </AnimatedTransition>
    </div>
  );
};

export default AdminDashboard;
