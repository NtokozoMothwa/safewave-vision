
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/services/api';
import { makeAuthRequest } from './useApiUtils';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

/**
 * Hook to handle app initialization and prefetching data
 */
export const useAppInitialization = () => {
  const queryClient = useQueryClient();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    // Only prefetch data if the user is authenticated
    if (!isAuthenticated || !user) return;

    // Function to prefetch data for critical components
    const prefetchCriticalData = async () => {
      try {
        // Prefetch system health
        queryClient.prefetchQuery({
          queryKey: ['system', 'health'],
          queryFn: async () => {
            const response = await makeAuthRequest(
              '/system/health',
              'GET',
              opts => apiClient.system.getHealth(opts),
              { showErrors: false }
            );
            return response.data;
          }
        });
        
        // Prefetch user health status
        queryClient.prefetchQuery({
          queryKey: ['health', 'status', user.id],
          queryFn: async () => {
            const response = await makeAuthRequest(
              `/health/${user.id}/status`,
              'GET',
              opts => apiClient.health.getCurrentStatus(user.id, opts),
              { showErrors: false }
            );
            return response.data;
          }
        });
        
        // Prefetch geofencing zones
        queryClient.prefetchQuery({
          queryKey: ['geofencing', 'zones'],
          queryFn: async () => {
            const response = await makeAuthRequest(
              '/geofencing/zones',
              'GET',
              opts => apiClient.geofencing.getZones(opts),
              { showErrors: false }
            );
            return response.data;
          }
        });
        
        // Prefetch notifications
        queryClient.prefetchQuery({
          queryKey: ['notifications'],
          queryFn: async () => {
            const response = await makeAuthRequest<any>(
              '/notifications',
              'GET',
              () => Promise.resolve({
                success: true,
                data: [
                  // Mock notifications data
                ],
                meta: { timestamp: new Date().toISOString() }
              }),
              { showErrors: false }
            );
            return response.data;
          }
        });
      } catch (error) {
        console.error('Error prefetching data:', error);
      }
    };

    // Run prefetching in the background
    prefetchCriticalData();

    // Check for system updates
    const checkForUpdates = async () => {
      try {
        const response = await makeAuthRequest(
          '/system/updates',
          'GET',
          () => Promise.resolve({
            success: true,
            data: {
              hasUpdate: true,
              version: '3.2.1',
              releaseNotes: 'Bug fixes and performance improvements'
            },
            meta: { timestamp: new Date().toISOString() }
          }),
          { showErrors: false }
        );
        
        if (response.success && response.data.hasUpdate) {
          toast.info('Update Available', {
            description: `Version ${response.data.version} is now available with new features and improvements.`,
            action: {
              label: 'Update',
              onClick: () => console.log('Update initiated')
            },
            duration: 10000
          });
        }
      } catch (error) {
        // Silent fail for update checks
      }
    };
    
    // Check for updates after a delay
    const updateTimer = setTimeout(checkForUpdates, 3000);
    
    return () => {
      clearTimeout(updateTimer);
    };
  }, [isAuthenticated, user, queryClient]);
};
