
import React, { useState } from 'react';
import { Layout } from '@/components/ui/layout';
import { 
  Grid, Cpu, Database, Server, FileDown, Settings, Users, 
  Shield, Terminal, GitBranch
} from 'lucide-react';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdminStatCard from '@/components/admin/AdminStatCard';
import AdminUserActivity from '@/components/admin/AdminUserActivity';
import AdminUserTable from '@/components/admin/AdminUserTable';
import SystemStatusCard from '@/components/admin/SystemStatusCard';
import ApiKeyManager from '@/components/admin/ApiKeyManager';
import { useSystemHealth } from '@/hooks/useSystemHealth';

// Mock data for API requests
const apiRequestData = [
  { day: 'Mon', count: 2356 },
  { day: 'Tue', count: 2864 },
  { day: 'Wed', count: 3172 },
  { day: 'Thu', count: 3585 },
  { day: 'Fri', count: 3268 },
  { day: 'Sat', count: 2132 },
  { day: 'Sun', count: 1825 },
];

// Mock users for the admin table
const mockUsers = [
  {
    id: '1',
    name: 'Jane Cooper',
    email: 'jane.cooper@example.com',
    role: 'admin',
    status: 'active' as const,
    lastActive: '2 mins ago',
  },
  {
    id: '2',
    name: 'Robert Fox',
    email: 'robert.fox@example.com',
    role: 'user',
    status: 'active' as const,
    lastActive: '35 mins ago',
  },
  {
    id: '3',
    name: 'Jenny Wilson',
    email: 'jenny.wilson@example.com',
    role: 'user',
    status: 'inactive' as const,
    lastActive: '2 days ago',
  },
  {
    id: '4',
    name: 'Cody Fisher',
    email: 'cody.fisher@example.com',
    role: 'user',
    status: 'pending' as const,
    lastActive: 'Never',
  },
];

// System alerts data
const systemAlerts = [
  {
    id: '1',
    title: 'High CPU Usage',
    description: 'Server cluster DB-East-1 experiencing high CPU load (92%)',
    severity: 'high',
    time: '10 mins ago'
  },
  {
    id: '2',
    title: 'Storage Warning',
    description: 'Primary storage cluster at 85% capacity, plan expansion',
    severity: 'medium',
    time: '1 hour ago'
  },
  {
    id: '3',
    title: 'Security Update',
    description: 'Critical security patches applied to all production servers',
    severity: 'info',
    time: '5 hours ago'
  }
];

const AdminDashboard: React.FC = () => {
  const { data: healthData } = useSystemHealth();
  const [exportFormat, setExportFormat] = useState<string>('json');
  
  const handleExportData = () => {
    toast.success("Generating export. The file will download shortly.", {
      description: `Export format: ${exportFormat.toUpperCase()}`
    });
    
    // Simulate download after a short delay
    setTimeout(() => {
      // Mock data export logic
      const fileName = `safesphere_admin_report.${exportFormat}`;
      toast.success(`${fileName} has been downloaded`);
    }, 1500);
  };

  return (
    <Layout>
      <AnimatedTransition className="max-w-7xl mx-auto">
        <div className="px-4 py-6">
          {/* Admin Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-safesphere-white flex items-center gap-2">
                <Shield className="h-6 w-6 text-safesphere-red" />
                Admin Control Panel
              </h1>
              <p className="text-safesphere-white-muted/60">
                System monitoring and management
              </p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <div className="flex items-center gap-2">
                <Select defaultValue={exportFormat} onValueChange={setExportFormat}>
                  <SelectTrigger className="w-[120px] bg-safesphere-dark-card text-safesphere-white border-white/10">
                    <SelectValue placeholder="Format" />
                  </SelectTrigger>
                  <SelectContent className="bg-safesphere-dark-card border-white/10">
                    <SelectItem value="json">JSON</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="text">Text</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="bg-safesphere-dark-card text-safesphere-white border-white/10" onClick={handleExportData}>
                  <FileDown className="mr-1.5 h-4 w-4" />
                  Export
                </Button>
              </div>
              <Button className="bg-safesphere-red hover:bg-safesphere-red/80">
                <Settings className="mr-1.5 h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>

          {/* Admin Dashboard Tabs */}
          <Tabs defaultValue="overview" className="mb-8">
            <TabsList className="bg-safesphere-dark-card border border-white/10 mb-6">
              <TabsTrigger value="overview" className="data-[state=active]:bg-safesphere-dark-hover">Overview</TabsTrigger>
              <TabsTrigger value="system" className="data-[state=active]:bg-safesphere-dark-hover">System</TabsTrigger>
              <TabsTrigger value="users" className="data-[state=active]:bg-safesphere-dark-hover">Users</TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-safesphere-dark-hover">Security</TabsTrigger>
              <TabsTrigger value="logs" className="data-[state=active]:bg-safesphere-dark-hover">Logs</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab - Removed duplicated health metrics */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <AdminStatCard
                  title="System Health"
                  value="92%"
                  change="+3.5%"
                  trend="up"
                  icon={<Server className="h-5 w-5 text-safesphere-info" />}
                  subtitle="Overall status"
                />
                <AdminStatCard
                  title="API Requests"
                  value="2.8M"
                  change="+7.2%"
                  trend="up"
                  icon={<Grid className="h-5 w-5 text-safesphere-success" />}
                  subtitle="Daily average"
                />
                <AdminStatCard
                  title="CPU Load"
                  value="62%"
                  change="+5.1%"
                  trend="up"
                  icon={<Cpu className="h-5 w-5 text-safesphere-warning" />}
                  subtitle="Average across servers"
                />
                <AdminStatCard
                  title="Security Alerts"
                  value="3"
                  change="-25%"
                  trend="down"
                  icon={<Shield className="h-5 w-5 text-safesphere-red" />}
                  subtitle="Active alerts"
                />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AdminUserActivity 
                  data={apiRequestData} 
                  title="API Traffic" 
                  description="Last 7 days of API traffic"
                  color="#10b981"
                />
                <Card className="bg-safesphere-dark-card border-white/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Terminal className="h-5 w-5 mr-2 text-safesphere-warning" />
                      System Alerts
                    </CardTitle>
                    <CardDescription className="text-safesphere-white-muted/60">
                      Current system notifications and warnings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {systemAlerts.map(alert => (
                      <div 
                        key={alert.id}
                        className={`${
                          alert.severity === 'high' 
                            ? 'bg-safesphere-red/10 border-safesphere-red/20' 
                            : alert.severity === 'medium'
                              ? 'bg-safesphere-warning/10 border-safesphere-warning/20'
                              : 'bg-safesphere-info/10 border-safesphere-info/20'
                        } border p-3 rounded-lg`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Shield className={`h-4 w-4 mr-2 ${
                              alert.severity === 'high' 
                                ? 'text-safesphere-red' 
                                : alert.severity === 'medium'
                                  ? 'text-safesphere-warning'
                                  : 'text-safesphere-info'
                            }`} />
                            <span className="text-sm font-medium">{alert.title}</span>
                          </div>
                          <span className="text-xs text-safesphere-white-muted/60">{alert.time}</span>
                        </div>
                        <p className="text-xs text-safesphere-white-muted/70 mt-1">
                          {alert.description}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* System Tab - Server-focused without user-accessible content */}
            <TabsContent value="system" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <AdminStatCard
                  title="CPU Load"
                  value="42%"
                  change="-8.3%"
                  trend="down"
                  icon={<Cpu className="h-5 w-5 text-safesphere-info" />}
                />
                <AdminStatCard
                  title="Memory Usage"
                  value="68%"
                  change="+12.7%"
                  trend="up"
                  icon={<Server className="h-5 w-5 text-safesphere-warning" />}
                />
                <AdminStatCard
                  title="Storage"
                  value="85%"
                  change="+5.2%"
                  trend="up"
                  icon={<Database className="h-5 w-5 text-safesphere-red" />}
                />
                <AdminStatCard
                  title="Services"
                  value="14/14"
                  change="0%"
                  trend="neutral"
                  icon={<Grid className="h-5 w-5 text-safesphere-success" />}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <SystemStatusCard
                  name="API Gateway"
                  status="operational"
                  uptime="99.98%"
                  lastIncident="32 days ago"
                />
                <SystemStatusCard
                  name="Database Cluster"
                  status="degraded"
                  uptime="99.82%"
                  lastIncident="2 hours ago"
                />
                <SystemStatusCard
                  name="Authentication Service"
                  status="operational"
                  uptime="100%"
                  lastIncident="None"
                />
                <SystemStatusCard
                  name="Storage Service"
                  status="operational"
                  uptime="99.95%"
                  lastIncident="14 days ago"
                />
                <SystemStatusCard
                  name="Analytics Pipeline"
                  status="operational"
                  uptime="99.99%"
                  lastIncident="45 days ago"
                />
                <SystemStatusCard
                  name="Email Service"
                  status="down"
                  uptime="93.45%"
                  lastIncident="10 minutes ago"
                />
              </div>
            </TabsContent>
            
            {/* Users Tab - Admin-specific user management */}
            <TabsContent value="users" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <AdminStatCard
                  title="Total Users"
                  value="5,231"
                  change="+12.5%"
                  trend="up"
                  icon={<Users className="h-5 w-5 text-safesphere-info" />}
                />
                <AdminStatCard
                  title="Active Admins"
                  value="8"
                  change="+1"
                  trend="up"
                  icon={<Shield className="h-5 w-5 text-safesphere-red" />}
                />
                <AdminStatCard
                  title="Pending Approvals"
                  value="24"
                  change="+5"
                  trend="up"
                  icon={<Terminal className="h-5 w-5 text-safesphere-warning" />}
                />
              </div>
              
              <AdminUserTable users={mockUsers} />
            </TabsContent>
            
            {/* Security Tab - Admin-only security features */}
            <TabsContent value="security" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <AdminStatCard
                  title="Security Score"
                  value="A+"
                  change="+1 grade"
                  trend="up"
                  icon={<Shield className="h-5 w-5 text-safesphere-success" />}
                />
                <AdminStatCard
                  title="Failed Logins"
                  value="28"
                  change="-12%"
                  trend="down"
                  icon={<Grid className="h-5 w-5 text-safesphere-warning" />}
                />
                <AdminStatCard
                  title="API Keys"
                  value="14"
                  change="+2"
                  trend="up"
                  icon={<Terminal className="h-5 w-5 text-safesphere-info" />}
                />
              </div>
              
              <ApiKeyManager />
              
              <Card className="bg-safesphere-dark-card border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <GitBranch className="h-5 w-5 mr-2 text-safesphere-info" />
                    Deployment Security
                  </CardTitle>
                  <CardDescription className="text-safesphere-white-muted/60">
                    Recent security deployments and updates
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-safesphere-dark-hover rounded-lg">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-safesphere-success mr-3"></div>
                        <div>
                          <p className="text-sm font-medium">Authentication Update</p>
                          <p className="text-xs text-safesphere-white-muted/60">2FA enforcement policy deployed</p>
                        </div>
                      </div>
                      <div className="text-xs text-safesphere-white-muted/60">2 days ago</div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-safesphere-dark-hover rounded-lg">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-safesphere-success mr-3"></div>
                        <div>
                          <p className="text-sm font-medium">SSL Certificate Renewal</p>
                          <p className="text-xs text-safesphere-white-muted/60">All certificates updated to latest standard</p>
                        </div>
                      </div>
                      <div className="text-xs text-safesphere-white-muted/60">5 days ago</div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-safesphere-dark-hover rounded-lg">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-safesphere-success mr-3"></div>
                        <div>
                          <p className="text-sm font-medium">Firewall Rules</p>
                          <p className="text-xs text-safesphere-white-muted/60">Updated IP whitelisting configuration</p>
                        </div>
                      </div>
                      <div className="text-xs text-safesphere-white-muted/60">1 week ago</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Logs Tab - Admin-only system logs */}
            <TabsContent value="logs" className="space-y-6">
              <Card className="bg-safesphere-dark-card border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Terminal className="h-5 w-5 mr-2 text-safesphere-info" />
                    System Logs
                  </CardTitle>
                  <div className="flex justify-between items-center">
                    <CardDescription className="text-safesphere-white-muted/60">
                      Recent system events and errors
                    </CardDescription>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="bg-safesphere-dark-card text-safesphere-white-muted/70 border-white/10">
                        Filter
                      </Button>
                      <Button variant="outline" size="sm" className="bg-safesphere-dark-card text-safesphere-white-muted/70 border-white/10">
                        Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-safesphere-dark rounded-lg p-3 h-[400px] overflow-y-auto font-mono text-sm">
                    <div className="text-safesphere-red">[ERROR] 2023-10-15 14:32:15 - Failed to connect to database cluster DB-East-1-replica</div>
                    <div className="text-safesphere-warning mt-2">[WARN] 2023-10-15 14:30:45 - Rate limit exceeded for API key: ak_12345... from IP: 192.168.1.105</div>
                    <div className="text-safesphere-success mt-2">[INFO] 2023-10-15 14:30:22 - User authentication successful: user_id=28456</div>
                    <div className="text-safesphere-warning mt-2">[WARN] 2023-10-15 14:28:43 - High memory usage detected (85%) on server app-server-12</div>
                    <div className="text-safesphere-info mt-2">[INFO] 2023-10-15 14:26:30 - API key created for client: Enterprise Corp</div>
                    <div className="text-safesphere-success mt-2">[INFO] 2023-10-15 14:25:17 - New user registration: user_id=38532</div>
                    <div className="text-safesphere-success mt-2">[INFO] 2023-10-15 14:22:09 - Payment processed successfully: transaction_id=TR-9384756</div>
                    <div className="text-safesphere-warning mt-2">[WARN] 2023-10-15 14:18:32 - API rate limit approaching for client_id=CL-45678</div>
                    <div className="text-safesphere-success mt-2">[INFO] 2023-10-15 14:15:45 - System backup completed successfully. Size: 2.3GB</div>
                    <div className="text-safesphere-red mt-2">[ERROR] 2023-10-15 14:12:33 - Invalid API request from IP 203.45.67.89: malformed JSON body</div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {/* Removed Figma Design Preview section as it's not admin-specific functionality */}
        </div>
      </AnimatedTransition>
    </Layout>
  );
};

export default AdminDashboard;
