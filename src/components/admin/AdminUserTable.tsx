
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Users, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  lastActive: string;
}

interface AdminUserTableProps {
  users: User[];
}

const AdminUserTable: React.FC<AdminUserTableProps> = ({ users }) => {
  const getStatusBadge = (status: User['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-safesphere-success text-white">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-safesphere-white-muted/30 text-white">Inactive</Badge>;
      case 'pending':
        return <Badge className="bg-safesphere-warning text-white">Pending</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="bg-safesphere-dark-card border-white/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-safesphere-white flex items-center gap-2">
          <Users size={18} className="text-safesphere-info" />
          User Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-safesphere-white/10 hover:bg-safesphere-dark-hover">
              <TableHead className="text-safesphere-white-muted/60">Name</TableHead>
              <TableHead className="text-safesphere-white-muted/60">Email</TableHead>
              <TableHead className="text-safesphere-white-muted/60">Role</TableHead>
              <TableHead className="text-safesphere-white-muted/60">Status</TableHead>
              <TableHead className="text-safesphere-white-muted/60">Last Active</TableHead>
              <TableHead className="text-safesphere-white-muted/60 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="border-safesphere-white/10 hover:bg-safesphere-dark-hover">
                <TableCell className="text-safesphere-white">{user.name}</TableCell>
                <TableCell className="text-safesphere-white-muted/70">{user.email}</TableCell>
                <TableCell className="text-safesphere-white-muted/70 capitalize">{user.role}</TableCell>
                <TableCell>{getStatusBadge(user.status)}</TableCell>
                <TableCell className="text-safesphere-white-muted/70">{user.lastActive}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4 text-safesphere-white-muted/70" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-safesphere-dark-card border-white/10">
                      <DropdownMenuItem className="text-safesphere-white cursor-pointer">Edit User</DropdownMenuItem>
                      <DropdownMenuItem className="text-safesphere-red cursor-pointer">Suspend User</DropdownMenuItem>
                      <DropdownMenuItem className="text-safesphere-white-muted/70 cursor-pointer">View Activity</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminUserTable;
