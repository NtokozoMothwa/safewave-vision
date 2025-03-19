
import React from 'react';
import { Layout } from '@/components/ui/layout';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Search, MoreVertical, UserPlus } from 'lucide-react';

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
              <h1 className="text-2xl font-bold text-safesphere-white">Users</h1>
              <p className="text-safesphere-white-muted/60">
                Manage system users and permissions
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button className="bg-safesphere-red hover:bg-safesphere-red/80">
                <UserPlus className="mr-1.5 h-4 w-4" />
                Add New User
              </Button>
            </div>
          </div>
          
          <Card className="bg-safesphere-dark-card border-white/10">
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle className="text-lg text-safesphere-white">
                  User Management
                </CardTitle>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-safesphere-white-muted/40" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="pl-9 pr-4 py-2 w-full md:w-64 rounded-md bg-safesphere-dark border border-white/10 text-sm text-safesphere-white placeholder-safesphere-white-muted/40 focus:outline-none focus:ring-1 focus:ring-safesphere-red"
                  />
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
                  <Button variant="outline" size="sm" className="bg-transparent border-white/10 text-safesphere-white-muted/70 h-8">
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" className="bg-transparent border-white/10 text-safesphere-white-muted/70 h-8">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AnimatedTransition>
    </Layout>
  );
};

export default Users;
