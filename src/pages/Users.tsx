
import React from 'react';
import { Layout } from '@/components/ui/layout';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Search, MoreVertical, UserPlus, Filter, Users as UsersIcon, Shield, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const MOCK_USERS = [
  {
    id: '1',
    name: 'Jane Cooper',
    email: 'jane.cooper@example.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2 minutes ago'
  },
  {
    id: '2',
    name: 'Robert Fox',
    email: 'robert.fox@example.com',
    role: 'User',
    status: 'Active',
    lastLogin: '3 hours ago'
  },
  {
    id: '3',
    name: 'Esther Howard',
    email: 'esther.howard@example.com',
    role: 'Manager',
    status: 'Active',
    lastLogin: 'Today, 9:43 AM'
  },
  {
    id: '4',
    name: 'Cameron Williamson',
    email: 'cameron.williamson@example.com',
    role: 'User',
    status: 'Inactive',
    lastLogin: '5 days ago'
  },
  {
    id: '5',
    name: 'Brooklyn Simmons',
    email: 'brooklyn.simmons@example.com',
    role: 'User',
    status: 'Pending',
    lastLogin: 'Never'
  },
  {
    id: '6',
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    role: 'Support',
    status: 'Active',
    lastLogin: 'Yesterday, 2:12 PM'
  }
];

const Users: React.FC = () => {
  return (
    <Layout>
      <AnimatedTransition className="max-w-7xl mx-auto">
        <div className="px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-safesphere-white">User Management</h1>
              <p className="text-safesphere-white-muted/60">
                Manage system users, roles, and permissions
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
              <Button variant="outline" className="bg-safesphere-dark-card border-white/10">
                <Download className="mr-1.5 h-4 w-4" />
                Export Users
              </Button>
              <Button className="bg-safesphere-red hover:bg-safesphere-red/80">
                <UserPlus className="mr-1.5 h-4 w-4" />
                Add New User
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all" className="mb-6">
            <TabsList className="bg-safesphere-dark-card border border-white/10 mb-6">
              <TabsTrigger value="all" className="data-[state=active]:bg-safesphere-dark-hover">All Users</TabsTrigger>
              <TabsTrigger value="admins" className="data-[state=active]:bg-safesphere-dark-hover">Admins</TabsTrigger>
              <TabsTrigger value="managers" className="data-[state=active]:bg-safesphere-dark-hover">Managers</TabsTrigger>
              <TabsTrigger value="support" className="data-[state=active]:bg-safesphere-dark-hover">Support</TabsTrigger>
              <TabsTrigger value="inactive" className="data-[state=active]:bg-safesphere-dark-hover">Inactive</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <Card className="bg-safesphere-dark-card border-white/10">
                <CardHeader className="pb-2">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <CardTitle className="text-lg text-safesphere-white flex items-center gap-2">
                      <UsersIcon size={18} className="text-safesphere-info" />
                      System Users
                    </CardTitle>
                    <div className="flex gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-safesphere-white-muted/40" />
                        <input
                          type="text"
                          placeholder="Search users..."
                          className="pl-9 pr-4 py-2 w-full md:w-64 rounded-md bg-safesphere-dark border border-white/10 text-sm text-safesphere-white placeholder-safesphere-white-muted/40 focus:outline-none focus:ring-1 focus:ring-safesphere-red"
                        />
                      </div>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[130px] bg-safesphere-dark-card text-safesphere-white border-white/10">
                          <SelectValue placeholder="Filter by" />
                        </SelectTrigger>
                        <SelectContent className="bg-safesphere-dark-card border-white/10">
                          <SelectItem value="all">All Roles</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="support">Support</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border border-white/10 overflow-hidden">
                    <Table>
                      <TableHeader className="bg-safesphere-dark">
                        <TableRow className="hover:bg-safesphere-dark border-white/10">
                          <TableHead className="text-safesphere-white-muted/70 font-medium">Name</TableHead>
                          <TableHead className="text-safesphere-white-muted/70 font-medium">Email</TableHead>
                          <TableHead className="text-safesphere-white-muted/70 font-medium">Role</TableHead>
                          <TableHead className="text-safesphere-white-muted/70 font-medium">Status</TableHead>
                          <TableHead className="text-safesphere-white-muted/70 font-medium">Last Login</TableHead>
                          <TableHead className="text-safesphere-white-muted/70 font-medium w-[70px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {MOCK_USERS.map((user) => (
                          <TableRow 
                            key={user.id} 
                            className="hover:bg-safesphere-dark-hover border-white/10"
                          >
                            <TableCell className="font-medium text-safesphere-white">{user.name}</TableCell>
                            <TableCell className="text-safesphere-white-muted/70">{user.email}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                user.role === 'Admin' 
                                  ? 'bg-safesphere-red/10 text-safesphere-red' 
                                  : user.role === 'Manager' 
                                    ? 'bg-safesphere-purple/10 text-safesphere-purple' 
                                    : user.role === 'Support' 
                                      ? 'bg-safesphere-info/10 text-safesphere-info'
                                      : 'bg-safesphere-white-muted/10 text-safesphere-white-muted'
                              }`}>
                                {user.role}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                user.status === 'Active' 
                                  ? 'bg-safesphere-success/10 text-safesphere-success' 
                                  : user.status === 'Inactive' 
                                    ? 'bg-safesphere-warning/10 text-safesphere-warning' 
                                    : 'bg-safesphere-info/10 text-safesphere-info'
                              }`}>
                                {user.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-safesphere-white-muted/70">{user.lastLogin}</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4 text-safesphere-white-muted/70" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="flex justify-between items-center mt-4 text-sm text-safesphere-white-muted/60">
                    <div>Showing 6 of 42 users</div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="bg-safesphere-dark-card border-white/10 text-safesphere-white-muted/70 h-8">
                        Previous
                      </Button>
                      <Button variant="outline" size="sm" className="bg-safesphere-dark-card border-white/10 text-safesphere-white-muted/70 h-8">
                        Next
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="admins">
              <Card className="bg-safesphere-dark-card border-white/10 p-6 flex items-center justify-center min-h-[200px]">
                <div className="text-center">
                  <Shield className="h-12 w-12 text-safesphere-red mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-medium mb-2">Admin Users</h3>
                  <p className="text-safesphere-white-muted/60 max-w-md mx-auto">
                    View and manage users with administrative privileges
                  </p>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="managers">
              <Card className="bg-safesphere-dark-card border-white/10 p-6 flex items-center justify-center min-h-[200px]">
                <div className="text-center">
                  <UsersIcon className="h-12 w-12 text-safesphere-purple mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-medium mb-2">Manager Users</h3>
                  <p className="text-safesphere-white-muted/60 max-w-md mx-auto">
                    View and manage users with manager privileges
                  </p>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="support">
              <Card className="bg-safesphere-dark-card border-white/10 p-6 flex items-center justify-center min-h-[200px]">
                <div className="text-center">
                  <UsersIcon className="h-12 w-12 text-safesphere-info mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-medium mb-2">Support Users</h3>
                  <p className="text-safesphere-white-muted/60 max-w-md mx-auto">
                    View and manage users with support privileges
                  </p>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="inactive">
              <Card className="bg-safesphere-dark-card border-white/10 p-6 flex items-center justify-center min-h-[200px]">
                <div className="text-center">
                  <UsersIcon className="h-12 w-12 text-safesphere-warning mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-medium mb-2">Inactive Users</h3>
                  <p className="text-safesphere-white-muted/60 max-w-md mx-auto">
                    View and manage inactive or suspended user accounts
                  </p>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-safesphere-dark-card border-white/10">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-safesphere-red/10 p-2 rounded-full">
                      <Shield className="h-5 w-5 text-safesphere-red" />
                    </div>
                    <h3 className="font-medium">Admin Users</h3>
                  </div>
                  <Badge className="bg-safesphere-red/20 text-safesphere-red">4</Badge>
                </div>
                <p className="text-safesphere-white-muted/60 text-sm">
                  Users with full system access and privileges
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-safesphere-dark-card border-white/10">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-safesphere-purple/10 p-2 rounded-full">
                      <UsersIcon className="h-5 w-5 text-safesphere-purple" />
                    </div>
                    <h3 className="font-medium">Managers</h3>
                  </div>
                  <Badge className="bg-safesphere-purple/20 text-safesphere-purple">12</Badge>
                </div>
                <p className="text-safesphere-white-muted/60 text-sm">
                  Users with department and team management privileges
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-safesphere-dark-card border-white/10">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-safesphere-info/10 p-2 rounded-full">
                      <UsersIcon className="h-5 w-5 text-safesphere-info" />
                    </div>
                    <h3 className="font-medium">Standard Users</h3>
                  </div>
                  <Badge className="bg-safesphere-info/20 text-safesphere-info">26</Badge>
                </div>
                <p className="text-safesphere-white-muted/60 text-sm">
                  Users with standard application access privileges
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </AnimatedTransition>
    </Layout>
  );
};

export default Users;
