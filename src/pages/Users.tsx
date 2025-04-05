
import React from 'react';
import { Layout } from '@/components/ui/layout';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, Filter, Users as UsersIcon, Shield, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdminUserTable from '@/components/admin/AdminUserTable';

const MOCK_USERS = [
  {
    id: '1',
    name: 'Jane Cooper',
    email: 'jane.cooper@example.com',
    role: 'Admin',
    status: 'active' as const,
    lastActive: '2 minutes ago'
  },
  {
    id: '2',
    name: 'Robert Fox',
    email: 'robert.fox@example.com',
    role: 'User',
    status: 'active' as const,
    lastActive: '3 hours ago'
  },
  {
    id: '3',
    name: 'Esther Howard',
    email: 'esther.howard@example.com',
    role: 'Manager',
    status: 'active' as const,
    lastActive: 'Today, 9:43 AM'
  },
  {
    id: '4',
    name: 'Cameron Williamson',
    email: 'cameron.williamson@example.com',
    role: 'User',
    status: 'inactive' as const,
    lastActive: '5 days ago'
  },
  {
    id: '5',
    name: 'Brooklyn Simmons',
    email: 'brooklyn.simmons@example.com',
    role: 'User',
    status: 'pending' as const,
    lastActive: 'Never'
  },
  {
    id: '6',
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    role: 'Support',
    status: 'active' as const,
    lastActive: 'Yesterday, 2:12 PM'
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
              <div className="flex justify-between items-center mb-4">
                <div className="relative w-full max-w-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Filter className="w-5 h-5 text-safesphere-white-muted/40" />
                  </div>
                  <input
                    type="search"
                    className="bg-safesphere-dark-card border border-white/10 text-safesphere-white text-sm rounded-lg block w-full pl-10 p-2.5 placeholder-safesphere-white-muted/40"
                    placeholder="Filter users by role, status..."
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px] bg-safesphere-dark-card text-safesphere-white border-white/10 ml-2">
                    <SelectValue placeholder="Permission Level" />
                  </SelectTrigger>
                  <SelectContent className="bg-safesphere-dark-card border-white/10">
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="high">High Access</SelectItem>
                    <SelectItem value="medium">Medium Access</SelectItem>
                    <SelectItem value="low">Low Access</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <AdminUserTable users={MOCK_USERS} />
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
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-safesphere-red" />
                  Permission Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-safesphere-white-muted/70 text-sm">
                  Advanced security controls for managing user access
                </p>
                <Button variant="outline" size="sm" className="w-full bg-safesphere-dark-hover text-safesphere-white-muted border-white/10">
                  Update Permissions
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-safesphere-dark-card border-white/10">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-safesphere-purple" />
                  Access Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-safesphere-white-muted/70 text-sm">
                  Configure feature access and restrictions for user roles
                </p>
                <Button variant="outline" size="sm" className="w-full bg-safesphere-dark-hover text-safesphere-white-muted border-white/10">
                  Manage Controls
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-safesphere-dark-card border-white/10">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <UsersIcon className="h-5 w-5 text-safesphere-info" />
                  Bulk Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-safesphere-white-muted/70 text-sm">
                  Perform actions on multiple user accounts simultaneously
                </p>
                <Button variant="outline" size="sm" className="w-full bg-safesphere-dark-hover text-safesphere-white-muted border-white/10">
                  Select Users
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </AnimatedTransition>
    </Layout>
  );
};

export default Users;
