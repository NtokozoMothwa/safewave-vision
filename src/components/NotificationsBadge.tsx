
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Bell } from 'lucide-react';
import { makeAuthRequest } from '@/hooks/useApiUtils';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const NotificationsBadge: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ['notifications', 'unread'],
    queryFn: async () => {
      if (!isAuthenticated) return [];
      
      const response = await makeAuthRequest<any[]>(
        '/notifications/unread',
        'GET',
        () => Promise.resolve({
          success: true,
          data: [
            { id: '1' },
            { id: '2' },
            { id: '3' }
          ],
          meta: { timestamp: new Date().toISOString() }
        }),
        { showErrors: false }
      );
      return response.data;
    },
    enabled: isAuthenticated,
    refetchInterval: 60000, // Refresh every 60 seconds
  });

  const unreadCount = notifications?.length || 0;

  if (!isAuthenticated) return null;

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      asChild
      className="relative"
    >
      <Link to="/notifications">
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-safesphere-red text-[10px] font-medium text-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </Link>
    </Button>
  );
};

export default NotificationsBadge;
