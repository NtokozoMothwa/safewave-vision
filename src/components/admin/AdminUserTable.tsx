
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Users, MoreHorizontal, UserPlus, UserX, Shield, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';

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

  const getRoleBadge = (role: string) => {
    const roleLower = role.toLowerCase();
    
    if (roleLower === 'admin') {
      return <Badge className="bg-safesphere-red/10 text-safesphere-red">{role}</Badge>;
    } else if (roleLower === 'user') {
      return <Badge className="bg-safesphere-info/10 text-safesphere-info">{role}</Badge>;
    } else {
      return <Badge className="bg-safesphere-purple/10 text-safesphere-purple">{role}</Badge>;
    }
  };

  return (
    <Card className="bg-safesphere-dark-card border-white/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-safesphere-white flex items-center gap-2">
          <Users size={18} className="text-safesphere-info" />
          Recent User Activity
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
                <TableCell>{getRoleBadge(user.role)}</TableCell>
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
                      <DropdownMenuItem className="text-safesphere-white cursor-pointer flex items-center">
                        <Edit className="h-4 w-4 mr-2" /> Edit User
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-safesphere-warning cursor-pointer flex items-center">
                        <Shield className="h-4 w-4 mr-2" /> Change Role
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-white/10" />
                      <DropdownMenuItem className="text-safesphere-red cursor-pointer flex items-center">
                        <UserX className="h-4 w-4 mr-2" /> Suspend User
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-safesphere-white-muted/70 cursor-pointer flex items-center">
                        <Users className="h-4 w-4 mr-2" /> View Activity Log
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end mt-4">
          <Button size="sm" className="bg-safesphere-dark-hover text-safesphere-white-muted/70 hover:text-safesphere-white">
            <UserPlus className="h-4 w-4 mr-2" /> Add New User
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminUserTable;
