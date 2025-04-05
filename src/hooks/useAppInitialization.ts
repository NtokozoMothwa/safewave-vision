
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

    // Function to prefetch only the most critical data
    const prefetchCriticalData = async () => {
      try {
        // Only load absolute essentials immediately
        queryClient.prefetchQuery({
          queryKey: ['notifications'],
          queryFn: async () => {
            const response = await makeAuthRequest<any>(
              '/notifications',
              'GET',
              () => Promise.resolve({
                success: true,
                data: [],
                meta: { timestamp: new Date().toISOString() }
              }),
              { showErrors: false, skipLoading: true }
            );
            return response.data;
          }
        });
      } catch (error) {
        // Silent fail for prefetching
        console.error('Error prefetching critical data:', error);
      }
    };

    // Less critical data prefetching with delay
    const prefetchNonCriticalData = async () => {
      try {
        // Prefetch system health
        queryClient.prefetchQuery({
          queryKey: ['system', 'health'],
          queryFn: async () => {
            const response = await makeAuthRequest(
              '/system/health',
              'GET',
              opts => apiClient.system.getHealth(opts),
              { showErrors: false, skipLoading: true }
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
              { showErrors: false, skipLoading: true }
            );
            return response.data;
          }
        });
      } catch (error) {
        // Silent fail for prefetching
      }
    };

    // Run critical data prefetching immediately but don't block UI
    setTimeout(prefetchCriticalData, 50);
    
    // Run non-critical prefetching after a delay
    const nonCriticalTimer = setTimeout(prefetchNonCriticalData, 2000);
    
    // Check for system updates with a longer delay
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
          { showErrors: false, skipLoading: true }
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
    
    // Check for updates after a longer delay
    const updateTimer = setTimeout(checkForUpdates, 5000);
    
    return () => {
      clearTimeout(nonCriticalTimer);
      clearTimeout(updateTimer);
    };
  }, [isAuthenticated, user, queryClient]);
};
