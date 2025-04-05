
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/services/api';
import { makeAuthRequest } from './useApiUtils';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

/**
 * Hook to handle app initialization and prefetching data with improved performance
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
              { showErrors: false }
            );
            return response.data;
          },
          // Don't refetch to reduce unnecessary network requests
          staleTime: 5 * 60 * 1000,
        });
      } catch (error) {
        // Silent fail for prefetching
        console.error('Error prefetching critical data:', error);
      }
    };

    // Use a shorter timeout for critical prefetch to get app interactive faster
    const criticalTimer = setTimeout(prefetchCriticalData, 100);
    
    // Less critical data prefetching with longer delay
    const prefetchNonCriticalData = async () => {
      try {
        // Prefetch system health with lower priority
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
          },
          // Use longer stale time for non-critical data
          staleTime: 15 * 60 * 1000,
        });
      } catch (error) {
        // Silent fail for prefetching
      }
    };

    // Run non-critical prefetching after a longer delay
    const nonCriticalTimer = setTimeout(prefetchNonCriticalData, 5000);
    
    // Check for updates with the lowest priority
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
    
    // Check for updates after a longer delay
    const updateTimer = setTimeout(checkForUpdates, 10000);
    
    return () => {
      clearTimeout(criticalTimer);
      clearTimeout(nonCriticalTimer);
      clearTimeout(updateTimer);
    };
  }, [isAuthenticated, user, queryClient]);
};
