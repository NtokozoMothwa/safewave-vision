
import React, { useState } from 'react';
import { Layout } from '@/components/ui/layout';
import { useAuth } from '@/context/AuthContext';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Check, Trash2, Filter, RefreshCw, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: string;
  isRead: boolean;
}

// Sample notification data
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Health Alert',
    message: 'Your heart rate was elevated during your last activity. We recommend taking a short break.',
    type: 'warning',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    isRead: false
  },
  {
    id: '2',
    title: 'System Update',
    message: 'SafeSphere was updated to the latest version with enhanced security features.',
    type: 'info',
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    isRead: false
  },
  {
    id: '3',
    title: 'Geofence Alert',
    message: 'Your child has left the designated safe zone around their school.',
    type: 'error',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    isRead: false
  },
  {
    id: '4',
    title: 'Battery Low',
    message: 'Your SafeSphere wearable device battery is below 20%. Please charge soon.',
    type: 'warning',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    isRead: true
  },
  {
    id: '5',
    title: 'Health Summary',
    message: 'Your weekly health report is now available. Overall status: Good.',
    type: 'success',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    isRead: true
  },
  {
    id: '6',
    title: 'Device Connected',
    message: 'New device successfully paired with your SafeSphere account.',
    type: 'success',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    isRead: true
  },
  {
    id: '7',
    title: 'Emergency Contact Updated',
    message: 'Your emergency contact list has been updated successfully.',
    type: 'info',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    isRead: true
  }
];

const NotificationsPage: React.FC = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
  // Filter notifications based on search and type
  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = 
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === 'all' || notification.type === typeFilter;
    
    return matchesSearch && matchesType;
  });
  
  const unreadNotifications = filteredNotifications.filter(n => !n.isRead);
  const readNotifications = filteredNotifications.filter(n => n.isRead);
  
  // Format the timestamp to a readable format
  const formatTime = (timestamp: string): string => {
    const now = new Date();
    const notifTime = new Date(timestamp);
    const diffMs = now.getTime() - notifTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hr ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return notifTime.toLocaleDateString();
  };
  
  // Mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
    toast.success('Notification marked as read');
  };
  
  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
    toast.success('All notifications marked as read');
  };
  
  // Delete a notification
  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    setSelectedItems(prev => prev.filter(itemId => itemId !== id));
    toast.success('Notification deleted');
  };
  
  // Delete selected notifications
  const deleteSelected = () => {
    if (selectedItems.length === 0) return;
    
    setNotifications(prev => prev.filter(notification => !selectedItems.includes(notification.id)));
    setSelectedItems([]);
    toast.success(`${selectedItems.length} notification${selectedItems.length > 1 ? 's' : ''} deleted`);
  };
  
  // Toggle selection of a notification
  const toggleSelection = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id) 
        : [...prev, id]
    );
  };
  
  // Refresh notifications
  const refreshNotifications = async () => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Add a new notification at the top
    const newNotification: Notification = {
      id: `new-${Date.now()}`,
      title: 'Refresh Complete',
      message: 'Your notifications are now up to date.',
      type: 'info',
      timestamp: new Date().toISOString(),
      isRead: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    setLoading(false);
    toast.success('Notifications refreshed');
  };
  
  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-yellow-500';
      case 'error': return 'bg-safesphere-red';
      case 'success': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  };
  
  const renderNotificationItems = (items: Notification[]) => {
    if (items.length === 0) {
      return (
        <div className="p-6 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-safesphere-dark-hover mb-3">
            <Bell size={24} className="text-safesphere-white-muted/40" />
          </div>
          <p className="text-safesphere-white-muted/60">No notifications found</p>
        </div>
      );
    }
    
    return items.map((notification) => (
      <motion.div
        key={notification.id}
        className={`p-4 border-b border-white/5 hover:bg-safesphere-dark-hover transition-colors ${notification.isRead ? 'opacity-80' : ''}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-start">
          <input 
            type="checkbox" 
            className="mr-3 mt-1 h-4 w-4 rounded border-gray-500" 
            checked={selectedItems.includes(notification.id)} 
            onChange={() => toggleSelection(notification.id)}
          />
          <div className={`${getNotificationColor(notification.type)} h-2 w-2 mt-1.5 rounded-full flex-shrink-0`} />
          <div className="ml-2 flex-1">
            <div className="flex justify-between items-start">
              <h4 className="text-sm font-semibold">{notification.title}</h4>
              <span className="text-xs text-safesphere-white-muted/40">{formatTime(notification.timestamp)}</span>
            </div>
            <p className="text-sm text-safesphere-white-muted/80 mt-1">{notification.message}</p>
          </div>
          <div className="flex flex-col ml-2 gap-1">
            {!notification.isRead && (
              <Button 
                variant="ghost" 
                size="icon"
                className="h-7 w-7 rounded-full hover:bg-safesphere-dark-hover"
                onClick={() => markAsRead(notification.id)}
                title="Mark as read"
              >
                <Check size={14} />
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="icon"
              className="h-7 w-7 rounded-full hover:bg-safesphere-dark-hover text-safesphere-red/80 hover:text-safesphere-red"
              onClick={() => deleteNotification(notification.id)}
              title="Delete"
            >
              <Trash2 size={14} />
            </Button>
          </div>
        </div>
      </motion.div>
    ));
  };

  return (
    <Layout>
      <div className="space-y-6 p-6">
        <AnimatedTransition direction="up" className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Notifications</h1>
              <p className="text-safesphere-white-muted/60 mt-2">
                View and manage your notifications
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="border-white/10 hover:bg-safesphere-dark-hover flex items-center gap-2"
                onClick={refreshNotifications}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Refreshing...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4" />
                    <span>Refresh</span>
                  </>
                )}
              </Button>
              
              {unreadNotifications.length > 0 && (
                <Button 
                  className="bg-safesphere-red hover:bg-safesphere-red-light flex items-center gap-2"
                  onClick={markAllAsRead}
                >
                  <Check className="h-4 w-4" />
                  <span>Mark All Read</span>
                </Button>
              )}
            </div>
          </div>
        </AnimatedTransition>
        
        <Card className="bg-safesphere-dark-card border-white/10">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Bell className="mr-2 h-5 w-5 text-safesphere-red" />
              All Notifications
            </CardTitle>
            <CardDescription className="text-safesphere-white-muted/60">
              {notifications.length} notification{notifications.length !== 1 ? 's' : ''} total
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-safesphere-white-muted/40" />
                <Input 
                  placeholder="Search notifications..." 
                  className="pl-9 bg-safesphere-dark-hover border-white/10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="w-full md:w-40">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full bg-safesphere-dark-hover border-white/10">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="Filter" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-safesphere-dark-card border-white/10">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {selectedItems.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4"
              >
                <Alert className="bg-safesphere-dark-hover border-safesphere-red/20">
                  <div className="flex justify-between items-center">
                    <div>
                      <AlertTitle>{selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected</AlertTitle>
                      <AlertDescription>
                        Select the action you want to perform on these items
                      </AlertDescription>
                    </div>
                    <div>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        className="bg-safesphere-red hover:bg-safesphere-red-light"
                        onClick={deleteSelected}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Selected
                      </Button>
                    </div>
                  </div>
                </Alert>
              </motion.div>
            )}
            
            <Tabs defaultValue="unread" className="w-full">
              <TabsList className="bg-safesphere-dark-hover">
                <TabsTrigger value="unread" className="data-[state=active]:bg-safesphere-dark-card">
                  Unread ({unreadNotifications.length})
                </TabsTrigger>
                <TabsTrigger value="read" className="data-[state=active]:bg-safesphere-dark-card">
                  Read ({readNotifications.length})
                </TabsTrigger>
                <TabsTrigger value="all" className="data-[state=active]:bg-safesphere-dark-card">
                  All ({filteredNotifications.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="unread" className="mt-4">
                <div className="rounded-lg border border-white/10 bg-safesphere-dark-hover overflow-hidden">
                  {renderNotificationItems(unreadNotifications)}
                </div>
              </TabsContent>
              
              <TabsContent value="read" className="mt-4">
                <div className="rounded-lg border border-white/10 bg-safesphere-dark-hover overflow-hidden">
                  {renderNotificationItems(readNotifications)}
                </div>
              </TabsContent>
              
              <TabsContent value="all" className="mt-4">
                <div className="rounded-lg border border-white/10 bg-safesphere-dark-hover overflow-hidden">
                  {renderNotificationItems(filteredNotifications)}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-safesphere-white-muted/60">
            Notifications are stored for up to 30 days
          </div>
          
          {notifications.length > 0 && (
            <Button 
              variant="outline"
              className="border-safesphere-red/30 hover:bg-safesphere-red/10 hover:text-safesphere-red text-safesphere-red/80"
              onClick={() => {
                setNotifications([]);
                toast.success('All notifications cleared');
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default NotificationsPage;
