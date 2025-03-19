
import { useState } from 'react';
import { apiClient, ApiRequestOptions, ApiResponse } from '@/services/api';
import { useAuth } from '@/context/AuthContext';

/**
 * Hook for making API requests with authentication
 */
export function useApi() {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  /**
   * Helper function to make authenticated API requests
   */
  const makeAuthRequest = async <T>(
    requestFn: (options?: ApiRequestOptions) => Promise<ApiResponse<T>>,
    options?: Omit<ApiRequestOptions, 'token'>
  ): Promise<ApiResponse<T>> => {
    setLoading(true);
    setError(null);
    
    try {
      // Get token from localStorage, in a real app you'd use a proper auth token
      // This is just simulating the token retrieval
      const token = localStorage.getItem('safesphere_api_token') || 'demo_token';
      
      const response = await requestFn({
        ...options,
        token,
      });
      
      if (!response.success && response.error) {
        setError(response.error.message);
      }
      
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return {
        success: false,
        error: {
          code: 'unknown_error',
          message: errorMessage,
        },
      };
    } finally {
      setLoading(false);
    }
  };
  
  return {
    loading,
    error,
    api: {
      users: {
        getAll: (options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest(opts => apiClient.users.getAll(opts), options),
        getById: (id: string, options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest(opts => apiClient.users.getById(id, opts), options),
        create: (userData: any, options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest(opts => apiClient.users.create(userData, opts), options),
        update: (id: string, userData: any, options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest(opts => apiClient.users.update(id, userData, opts), options),
        delete: (id: string, options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest(opts => apiClient.users.delete(id, opts), options),
      },
      health: {
        getHistory: (userId: string, options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest(opts => apiClient.health.getHistory(userId, opts), options),
        getCurrentStatus: (userId: string, options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest(opts => apiClient.health.getCurrentStatus(userId, opts), options),
        logEvent: (userId: string, eventData: any, options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest(opts => apiClient.health.logEvent(userId, eventData, opts), options),
      },
      geofencing: {
        getZones: (options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest(opts => apiClient.geofencing.getZones(opts), options),
        createZone: (zoneData: any, options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest(opts => apiClient.geofencing.createZone(zoneData, opts), options),
        updateZone: (id: string, zoneData: any, options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest(opts => apiClient.geofencing.updateZone(id, zoneData, opts), options),
        deleteZone: (id: string, options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest(opts => apiClient.geofencing.deleteZone(id, opts), options),
      },
    },
    clearError: () => setError(null),
  };
}
