
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Bell, X, Check } from 'lucide-react';
import { makeAuthRequest } from '@/hooks/useApiUtils';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { toast } from 'sonner';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: string;
  isRead: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Health Alert',
    message: 'Your heart rate was elevated during your last activity',
    type: 'warning',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    isRead: false
  },
  {
    id: '2',
    title: 'System Update',
    message: 'SafeSphere was updated to the latest version',
    type: 'info',
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    isRead: false
  },
  {
    id: '3',
    title: 'Geofence Alert',
    message: 'Your child has left the designated safe zone',
    type: 'error',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    isRead: false
  }
];

const NotificationsBadge: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [showBadgePulse, setShowBadgePulse] = useState(false);

  // Get unread notifications count
  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Add pulse effect when new notifications arrive
  useEffect(() => {
    if (unreadCount > 0) {
      setShowBadgePulse(true);
      const timer = setTimeout(() => {
        setShowBadgePulse(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [unreadCount]);

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
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
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
    toast.success('Notification dismissed');
  };

  if (!isAuthenticated || isLoading) return null;

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-yellow-500';
      case 'error': return 'bg-safesphere-red';
      case 'success': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className="relative"
        >
          <Bell size={18} />
          <AnimatePresence>
            {unreadCount > 0 && (
              <motion.span 
                className={`absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full ${showBadgePulse ? 'bg-safesphere-red animate-pulse' : 'bg-safesphere-red'} text-[10px] font-medium text-white`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                {unreadCount > 9 ? '9+' : unreadCount}
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </PopoverTrigger>
      
      <PopoverContent 
        className="w-80 p-0 bg-safesphere-dark-card border-white/10"
        align="end"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <h3 className="text-sm font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-safesphere-white-muted/60 hover:text-safesphere-white"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
        
        <div className="max-h-80 overflow-y-auto">
          {notifications.length > 0 ? (
            <AnimatePresence>
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  className={`p-4 border-b border-white/5 hover:bg-safesphere-dark-hover transition-colors ${notification.isRead ? 'opacity-60' : ''}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                >
                  <div className="flex items-start">
                    <div className={`${getNotificationColor(notification.type)} h-2 w-2 mt-1.5 rounded-full flex-shrink-0`} />
                    <div className="ml-2 flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-medium">{notification.title}</h4>
                        <span className="text-xs text-safesphere-white-muted/40">{formatTime(notification.timestamp)}</span>
                      </div>
                      <p className="text-xs text-safesphere-white-muted/60 mt-1">{notification.message}</p>
                    </div>
                    <div className="flex ml-2 gap-1">
                      {!notification.isRead && (
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-5 w-5 rounded-full hover:bg-safesphere-dark-hover"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check size={12} />
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-5 w-5 rounded-full hover:bg-safesphere-dark-hover"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <X size={12} />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <div className="py-8 text-center">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-safesphere-dark-hover mb-3">
                <Bell size={20} className="text-safesphere-white-muted/40" />
              </div>
              <p className="text-sm text-safesphere-white-muted/60">No new notifications</p>
            </div>
          )}
        </div>
        
        <div className="p-2 border-t border-white/10">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full border-white/10 hover:bg-safesphere-dark-hover"
            onClick={() => {
              setIsOpen(false);
            }}
            asChild
          >
            <Link to="/notifications">View All Notifications</Link>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsBadge;
