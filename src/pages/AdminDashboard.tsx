
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/ui/layout';
import { 
  Grid, Cpu, Database, Server, FileDown, Settings, Users, 
  Bell, Shield, Activity, Globe, Download, Code, BarChart3
} from 'lucide-react';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdminStatCard from '@/components/admin/AdminStatCard';
import AdminUserActivity from '@/components/admin/AdminUserActivity';
import AdminUserDistribution from '@/components/admin/AdminUserDistribution';
import AdminUserTable from '@/components/admin/AdminUserTable';
import SystemStatusCard from '@/components/admin/SystemStatusCard';
import ApiKeyManager from '@/components/admin/ApiKeyManager';
import { useSystemHealth } from '@/hooks/useSystemHealth';

// Mock data for API request monitoring
const apiRequestData = [
  { day: 'Mon', count: 2356 },
  { day: 'Tue', count: 2864 },
  { day: 'Wed', count: 3172 },
  { day: 'Thu', count: 3585 },
  { day: 'Fri', count: 3268 },
  { day: 'Sat', count: 2132 },
  { day: 'Sun', count: 1825 },
];

const userActivityData = [
  { day: 'Mon', count: 56 },
  { day: 'Tue', count: 64 },
  { day: 'Wed', count: 72 },
  { day: 'Thu', count: 85 },
  { day: 'Fri', count: 68 },
  { day: 'Sat', count: 32 },
  { day: 'Sun', count: 25 },
];

const userDistributionData = [
  { name: 'Active', value: 65 },
  { name: 'Inactive', value: 22 },
  { name: 'Pending', value: 13 },
];

const deviceDistributionData = [
  { name: 'Standard', value: 45 },
  { name: 'Medical', value: 25 },
  { name: 'Kiddies', value: 18 },
  { name: 'Luxury', value: 12 },
];

const endpointUsageData = [
  { name: 'User data', value: 35 },
  { name: 'Health', value: 25 },
  { name: 'Geofencing', value: 20 },
  { name: 'Auth', value: 15 },
  { name: 'Config', value: 5 },
];

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

const AdminDashboard: React.FC = () => {
  const { data: healthData } = useSystemHealth();
  const [exportFormat, setExportFormat] = useState<string>('json');
  
  const handleExportData = () => {
    toast.success("Generating export. The file will download shortly.", {
      description: `Export format: ${exportFormat.toUpperCase()}`
    });
    
    // Simulate download after a short delay
    setTimeout(() => {
      const mockData = {
        users: mockUsers,
        apiRequests: apiRequestData,
        systemStatus: "Operational"
      };
      
      let dataStr;
      let fileName;
      
      if (exportFormat === 'json') {
        dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(mockData, null, 2));
        fileName = "safesphere_admin_report.json";
      } else if (exportFormat === 'csv') {
        // Simple CSV conversion for demo
        const headers = "id,name,email,role,status,lastActive\n";
        const rows = mockUsers.map(u => `${u.id},${u.name},${u.email},${u.role},${u.status},${u.lastActive}`).join("\n");
        dataStr = "data:text/csv;charset=utf-8," + encodeURIComponent(headers + rows);
        fileName = "safesphere_admin_report.csv";
      } else {
        dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(JSON.stringify(mockData));
        fileName = "safesphere_admin_report.txt";
      }
      
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", fileName);
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    }, 1500);
  };

  return (
    <Layout>
      <AnimatedTransition className="max-w-7xl mx-auto">
        <div className="px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Admin Control Panel</h1>
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
                  Export Report
                </Button>
              </div>
              <Button className="bg-safesphere-red hover:bg-safesphere-red/80">
                <Settings className="mr-1.5 h-4 w-4" />
                System Settings
              </Button>
            </div>
          </div>

          <Tabs defaultValue="overview" className="mb-8">
            <TabsList className="bg-safesphere-dark-card border border-white/10 mb-6">
              <TabsTrigger value="overview" className="data-[state=active]:bg-safesphere-dark-hover">Overview</TabsTrigger>
              <TabsTrigger value="users" className="data-[state=active]:bg-safesphere-dark-hover">Users</TabsTrigger>
              <TabsTrigger value="api" className="data-[state=active]:bg-safesphere-dark-hover">API</TabsTrigger>
              <TabsTrigger value="system" className="data-[state=active]:bg-safesphere-dark-hover">System</TabsTrigger>
              <TabsTrigger value="logs" className="data-[state=active]:bg-safesphere-dark-hover">Logs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <AdminStatCard
                  title="Total Users"
                  value="5,231"
                  change="+12.5%"
                  trend="up"
                  icon={<Users className="h-5 w-5 text-safesphere-info" />}
                  subtitle="120 new this week"
                />
                <AdminStatCard
                  title="API Requests"
                  value="2.8M"
                  change="+7.2%"
                  trend="up"
                  icon={<Globe className="h-5 w-5 text-safesphere-success" />}
                  subtitle="Daily average"
                />
                <AdminStatCard
                  title="System Load"
                  value="62%"
                  change="+5.1%"
                  trend="up"
                  icon={<Cpu className="h-5 w-5 text-safesphere-warning" />}
                  subtitle="Normal operation"
                />
                <AdminStatCard
                  title="Security Alerts"
                  value="3"
                  change="-25%"
                  trend="down"
                  icon={<Shield className="h-5 w-5 text-safesphere-red" />}
                  subtitle="8 resolved this week"
                />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AdminUserActivity 
                  data={apiRequestData} 
                  title="API Requests" 
                  description="Last 7 days of API traffic"
                  color="#10b981"
                />
                <AdminUserActivity 
                  data={userActivityData} 
                  title="New User Signups" 
                  description="Weekly registration activity"
                />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AdminUserTable users={mockUsers} />
                <Card className="bg-safesphere-dark-card border-white/10">
                  <CardContent className="p-4">
                    <div className="space-y-4 pt-2">
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        <Bell className="h-5 w-5 text-safesphere-warning" />
                        System Alerts
                      </h3>
                      <div className="space-y-3">
                        <div className="bg-safesphere-red/10 border border-safesphere-red/20 p-3 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Bell className="h-4 w-4 text-safesphere-red mr-2" />
                              <span className="text-sm font-medium">High CPU Usage</span>
                            </div>
                            <span className="text-xs text-safesphere-white-muted/60">10 mins ago</span>
                          </div>
                          <p className="text-xs text-safesphere-white-muted/70 mt-1">
                            Server cluster DB-East-1 experiencing high CPU load (92%)
                          </p>
                        </div>
                        <div className="bg-safesphere-warning/10 border border-safesphere-warning/20 p-3 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Bell className="h-4 w-4 text-safesphere-warning mr-2" />
                              <span className="text-sm font-medium">Storage Warning</span>
                            </div>
                            <span className="text-xs text-safesphere-white-muted/60">1 hour ago</span>
                          </div>
                          <p className="text-xs text-safesphere-white-muted/70 mt-1">
                            Primary storage cluster at 85% capacity, plan expansion
                          </p>
                        </div>
                        <div className="bg-safesphere-info/10 border border-safesphere-info/20 p-3 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Bell className="h-4 w-4 text-safesphere-info mr-2" />
                              <span className="text-sm font-medium">Security Update</span>
                            </div>
                            <span className="text-xs text-safesphere-white-muted/60">5 hours ago</span>
                          </div>
                          <p className="text-xs text-safesphere-white-muted/70 mt-1">
                            Critical security patches applied to all production servers
                          </p>
                        </div>
                      </div>
                      
                      <Link 
                        to="#" 
                        className="text-xs flex items-center text-safesphere-info hover:text-safesphere-info/80"
                      >
                        View all alerts
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="users" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <AdminStatCard
                  title="Total Users"
                  value="5,231"
                  change="+12.5%"
                  trend="up"
                  icon={<Users className="h-5 w-5 text-safesphere-info" />}
                />
                <AdminStatCard
                  title="Active Users"
                  value="3,856"
                  change="+5.3%"
                  trend="up"
                  icon={<Activity className="h-5 w-5 text-safesphere-success" />}
                />
                <AdminStatCard
                  title="Avg. Session Time"
                  value="24m"
                  change="+2.1%"
                  trend="up"
                  icon={<BarChart3 className="h-5 w-5 text-safesphere-purple" />}
                />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AdminUserActivity 
                  data={userActivityData} 
                  title="User Signups" 
                  description="Weekly registrations"
                />
                <AdminUserDistribution 
                  data={userDistributionData} 
                  title="User Status" 
                  description="Current user account status"
                />
              </div>
              
              <AdminUserTable users={mockUsers} />
            </TabsContent>
            
            <TabsContent value="api" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <AdminStatCard
                  title="Daily API Calls"
                  value="2.8M"
                  change="+15.3%"
                  trend="up"
                  icon={<Globe className="h-5 w-5 text-safesphere-info" />}
                />
                <AdminStatCard
                  title="Avg Response Time"
                  value="125ms"
                  change="-8.2%"
                  trend="down"
                  icon={<Activity className="h-5 w-5 text-safesphere-success" />}
                />
                <AdminStatCard
                  title="Error Rate"
                  value="0.36%"
                  change="+0.12%"
                  trend="up"
                  icon={<Code className="h-5 w-5 text-safesphere-warning" />}
                />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AdminUserActivity 
                  data={apiRequestData} 
                  title="API Traffic" 
                  description="7-day request volume"
                  color="#06b6d4"
                />
                <AdminUserDistribution 
                  data={endpointUsageData} 
                  title="Endpoint Usage" 
                  description="Distribution by service"
                />
              </div>
              
              <div className="space-y-4">
                <ApiKeyManager />
                
                <Card className="bg-safesphere-dark-card border-white/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Download className="h-5 w-5 mr-2 text-safesphere-info" />
                      API Documentation
                    </CardTitle>
                    <CardDescription className="text-safesphere-white-muted/60">
                      Download API documentation and data for integration
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <Button variant="outline" className="bg-safesphere-dark-card border-white/10 text-safesphere-white-muted/80">
                        <FileDown className="mr-2 h-4 w-4" /> API Documentation
                      </Button>
                      <Button variant="outline" className="bg-safesphere-dark-card border-white/10 text-safesphere-white-muted/80">
                        <FileDown className="mr-2 h-4 w-4" /> Swagger Spec
                      </Button>
                      <Button variant="outline" className="bg-safesphere-dark-card border-white/10 text-safesphere-white-muted/80">
                        <FileDown className="mr-2 h-4 w-4" /> Postman Collection
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
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
                  title="Daily API Calls"
                  value="2.8M"
                  change="+15.3%"
                  trend="up"
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
              
              <AdminUserActivity 
                data={apiRequestData} 
                title="System Load" 
                description="7-day monitoring"
                color="#ec4899"
              />
            </TabsContent>
            
            <TabsContent value="logs" className="space-y-6">
              <Card className="bg-safesphere-dark-card border-white/10">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">System Logs</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="bg-safesphere-dark-card text-safesphere-white-muted/70 border-white/10">
                        Filter
                      </Button>
                      <Button variant="outline" size="sm" className="bg-safesphere-dark-card text-safesphere-white-muted/70 border-white/10">
                        Export
                      </Button>
                    </div>
                  </div>
                  
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
        </div>
      </AnimatedTransition>
    </Layout>
  );
};

export default AdminDashboard;
