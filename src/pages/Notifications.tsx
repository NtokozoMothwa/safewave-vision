
import React, { useState } from 'react';
import { Layout } from '@/components/ui/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Bell, Check, Clock, AlertTriangle, Shield, MapPin, Activity, Trash2 } from 'lucide-react';
import { useApiState, makeAuthRequest } from '@/hooks/useApiUtils';
import { apiClient } from '@/services/api';
import { toast } from 'sonner';
import { Loading } from '@/components/ui/loading';
import { useQuery } from '@tanstack/react-query';

interface Notification {
  id: string;
  title: string;
  description: string;
  type: 'health' | 'security' | 'location' | 'system';
  priority: 'low' | 'medium' | 'high' | 'critical';
  read: boolean;
  timestamp: string;
}

const Notifications: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const { updateRequestState, getLoadingState } = useApiState();

  // Simulate fetching notifications with react-query
  const { data: notifications = [], isLoading, refetch } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const response = await makeAuthRequest<Notification[]>(
        '/notifications',
        'GET',
        () => Promise.resolve({
          success: true,
          data: [
            {
              id: '1',
              title: 'Elevated Heart Rate',
              description: 'Your heart rate was above normal for 15 minutes',
              type: 'health',
              priority: 'high',
              read: false,
              timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString()
            },
            {
              id: '2',
              title: 'Left Safe Zone',
              description: 'You left your Home safe zone at 2:15 PM',
              type: 'location',
              priority: 'medium',
              read: false,
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
            },
            {
              id: '3',
              title: 'Security Alert',
              description: 'Unusual login attempt detected from a new location',
              type: 'security',
              priority: 'critical',
              read: false,
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString()
            },
            {
              id: '4',
              title: 'System Update',
              description: 'SafeSphere was updated to version 3.2.1',
              type: 'system',
              priority: 'low',
              read: true,
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
            }
          ],
          meta: { timestamp: new Date().toISOString() }
        }),
        { showErrors: true }
      );
      return response.data;
    }
  });

  const markAsRead = async (id: string) => {
    try {
      await makeAuthRequest(
        `/notifications/${id}/read`,
        'PATCH',
        () => Promise.resolve({ success: true, data: null, meta: { timestamp: new Date().toISOString() } }),
        { showErrors: true },
        updateRequestState
      );
      toast.success('Notification marked as read');
      refetch();
    } catch (error) {
      toast.error('Failed to mark notification as read');
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      await makeAuthRequest(
        `/notifications/${id}`,
        'DELETE',
        () => Promise.resolve({ success: true, data: null, meta: { timestamp: new Date().toISOString() } }),
        { showErrors: true },
        updateRequestState
      );
      toast.success('Notification deleted');
      refetch();
    } catch (error) {
      toast.error('Failed to delete notification');
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    return notification.type === activeTab;
  });

  const getIconForType = (type: string) => {
    switch (type) {
      case 'health':
        return <Activity size={16} className="text-safesphere-red" />;
      case 'security':
        return <Shield size={16} className="text-safesphere-warning" />;
      case 'location':
        return <MapPin size={16} className="text-safesphere-info" />;
      case 'system':
      default:
        return <Bell size={16} className="text-safesphere-white-muted" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'critical':
        return <Badge className="bg-safesphere-red">Critical</Badge>;
      case 'high':
        return <Badge className="bg-safesphere-warning">High</Badge>;
      case 'medium':
        return <Badge className="bg-safesphere-info">Medium</Badge>;
      case 'low':
      default:
        return <Badge className="bg-safesphere-white-muted/30">Low</Badge>;
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) {
      return `${diffMins} min ago`;
    } else if (diffMins < 1440) {
      return `${Math.floor(diffMins / 60)} hrs ago`;
    } else {
      return `${Math.floor(diffMins / 1440)} days ago`;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Layout>
      <AnimatedTransition className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Notifications</h1>
            <p className="text-safesphere-white-muted/60 mt-1">
              {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="border-white/10"
            onClick={() => {
              toast.success('All notifications marked as read');
              refetch();
            }}
          >
            <Check size={14} className="mr-1" /> Mark all as read
          </Button>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="bg-safesphere-dark-card border-white/10 rounded-lg p-1 mb-6">
            <TabsList className="w-full grid grid-cols-5 bg-transparent">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-safesphere-dark-hover data-[state=active]:text-white"
              >
                All
              </TabsTrigger>
              <TabsTrigger 
                value="unread" 
                className="data-[state=active]:bg-safesphere-dark-hover data-[state=active]:text-white"
              >
                Unread
              </TabsTrigger>
              <TabsTrigger 
                value="health" 
                className="data-[state=active]:bg-safesphere-dark-hover data-[state=active]:text-white"
              >
                Health
              </TabsTrigger>
              <TabsTrigger 
                value="location" 
                className="data-[state=active]:bg-safesphere-dark-hover data-[state=active]:text-white"
              >
                Location
              </TabsTrigger>
              <TabsTrigger 
                value="security" 
                className="data-[state=active]:bg-safesphere-dark-hover data-[state=active]:text-white"
              >
                Security
              </TabsTrigger>
            </TabsList>
          </div>

          {isLoading ? (
            <div className="p-12 flex justify-center">
              <Loading text="Loading notifications..." />
            </div>
          ) : filteredNotifications.length === 0 ? (
            <Card className="bg-safesphere-dark-card border-white/10 p-8 text-center">
              <div className="flex flex-col items-center justify-center">
                <Bell size={48} className="text-safesphere-white-muted/30 mb-4" />
                <h3 className="text-lg font-medium">No notifications found</h3>
                <p className="text-safesphere-white-muted/60 mt-1">
                  {activeTab === 'all' 
                    ? "You don't have any notifications yet." 
                    : `You don't have any ${activeTab === 'unread' ? 'unread' : activeTab} notifications.`}
                </p>
              </div>
            </Card>
          ) : (
            <TabsContent value={activeTab} className="m-0">
              <div className="space-y-4">
                {filteredNotifications.map((notification) => (
                  <Card 
                    key={notification.id} 
                    className={`bg-safesphere-dark-card border-white/10 ${
                      !notification.read ? 'shadow-[0_0_10px_rgba(255,0,0,0.1)]' : ''
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className={`mt-1 p-2 rounded-full ${
                            !notification.read ? 'bg-safesphere-red/10' : 'bg-safesphere-dark-hover'
                          }`}>
                            {getIconForType(notification.type)}
                          </div>
                          
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{notification.title}</h3>
                              {!notification.read && (
                                <span className="h-2 w-2 rounded-full bg-safesphere-red"></span>
                              )}
                            </div>
                            <p className="text-sm text-safesphere-white-muted/70 mt-1">
                              {notification.description}
                            </p>
                            <div className="flex items-center gap-3 mt-2">
                              <div className="text-xs flex items-center gap-1 text-safesphere-white-muted/50">
                                <Clock size={12} />
                                {formatTime(notification.timestamp)}
                              </div>
                              {getPriorityBadge(notification.priority)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 text-xs hover:bg-safesphere-dark-hover"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check size={14} className="mr-1" /> Mark read
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 text-xs hover:bg-safesphere-dark-hover hover:text-safesphere-red"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          )}
        </Tabs>
      </AnimatedTransition>
    </Layout>
  );
};

export default Notifications;
