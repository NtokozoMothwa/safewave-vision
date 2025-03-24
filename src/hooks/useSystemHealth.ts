
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/services/api';
import { ApiRequestOptions, SystemHealthService } from '@/services/apiTypes';
import { makeAuthRequest } from './useApiUtils';

/**
 * Hook to fetch and monitor system health status
 */
export function useSystemHealth(options?: Omit<ApiRequestOptions, 'token'>) {
  return useQuery({
    queryKey: ['system', 'health'],
    queryFn: async () => {
      const response = await makeAuthRequest<SystemHealthService>(
        '/system/health',
        'GET',
        opts => apiClient.system.getHealth(opts),
        options
      );
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to fetch system health');
      }
      return response.data;
    }
  });
}
