
import { useState } from 'react';
import { apiClient, ApiRequestOptions, ApiResponse } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface ApiState {
  loading: boolean;
  error: string | null;
}

/**
 * Hook for making API requests with authentication and additional integration features
 */
export function useApi() {
  const { user } = useAuth();
  const [state, setState] = useState<Record<string, ApiState>>({});
  
  /**
   * Helper function to create a request key for tracking loading states
   */
  const createRequestKey = (endpoint: string, method: string) => {
    return `${method}:${endpoint}`;
  };
  
  /**
   * Helper function to make authenticated API requests
   */
  const makeAuthRequest = async <T>(
    endpoint: string,
    method: string,
    requestFn: (options?: ApiRequestOptions) => Promise<ApiResponse<T>>,
    options?: Omit<ApiRequestOptions, 'token'>
  ): Promise<ApiResponse<T>> => {
    const requestKey = createRequestKey(endpoint, method);
    
    setState(prev => ({
      ...prev,
      [requestKey]: { loading: true, error: null }
    }));
    
    try {
      // Get token from localStorage, in a real app you'd use a proper auth token
      // This is just simulating the token retrieval
      const token = localStorage.getItem('safesphere_api_token') || 'demo_token';
      
      const response = await requestFn({
        ...options,
        token,
      });
      
      if (!response.success && response.error) {
        setState(prev => ({
          ...prev,
          [requestKey]: { loading: false, error: response.error.message }
        }));
        
        if (options?.showErrors !== false) {
          toast.error(response.error.message, {
            description: `Error code: ${response.error.code}`,
            duration: 5000,
          });
        }
      } else {
        setState(prev => ({
          ...prev,
          [requestKey]: { loading: false, error: null }
        }));
      }
      
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      
      setState(prev => ({
        ...prev,
        [requestKey]: { loading: false, error: errorMessage }
      }));
      
      if (options?.showErrors !== false) {
        toast.error('API Request Failed', {
          description: errorMessage,
          duration: 5000,
        });
      }
      
      return {
        success: false,
        error: {
          code: 'unknown_error',
          message: errorMessage,
        },
        meta: {
          timestamp: new Date().toISOString()
        }
      };
    }
  };
  
  /**
   * Helper to get loading state for a request
   */
  const getLoadingState = (endpoint: string, method: string) => {
    const requestKey = createRequestKey(endpoint, method);
    return state[requestKey]?.loading || false;
  };
  
  /**
   * Helper to get error for a request
   */
  const getError = (endpoint: string, method: string) => {
    const requestKey = createRequestKey(endpoint, method);
    return state[requestKey]?.error || null;
  };
  
  /**
   * Get loading state for any request
   */
  const isLoading = () => {
    return Object.values(state).some(s => s.loading);
  };
  
  /**
   * Clear all errors
   */
  const clearErrors = () => {
    setState(prev => {
      const newState = { ...prev };
      Object.keys(newState).forEach(key => {
        newState[key] = { ...newState[key], error: null };
      });
      return newState;
    });
  };
  
  /**
   * Export data in various formats
   */
  const exportData = async (
    endpoint: string, 
    format: 'json' | 'csv' | 'xml' = 'json',
    fileName: string = 'safesphere_export',
    options?: Omit<ApiRequestOptions, 'token'>
  ) => {
    const response = await makeAuthRequest(
      endpoint, 
      'GET',
      opts => apiClient.apiRequest(endpoint, 'GET', { ...opts, format }),
      options
    );
    
    if (response.success && response.data) {
      let dataStr;
      let fileNameWithExt;
      
      if (format === 'json') {
        dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(response.data, null, 2));
        fileNameWithExt = `${fileName}.json`;
      } else if (format === 'csv') {
        dataStr = "data:text/csv;charset=utf-8," + encodeURIComponent(String(response.data));
        fileNameWithExt = `${fileName}.csv`;
      } else {
        dataStr = "data:text/xml;charset=utf-8," + encodeURIComponent(String(response.data));
        fileNameWithExt = `${fileName}.xml`;
      }
      
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", fileNameWithExt);
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
      
      return true;
    }
    
    return false;
  };
  
  // Helper function to make an API request with the given options
  const apiRequest = <T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    options?: ApiRequestOptions
  ): Promise<ApiResponse<T>> => {
    return makeAuthRequest(
      endpoint,
      method,
      opts => apiClient.apiRequest<T>(endpoint, method, opts),
      options
    );
  };
  
  return {
    loading: isLoading(),
    getLoadingState,
    getError,
    clearErrors,
    exportData,
    apiRequest,
    api: {
      docs: {
        getApiDocs: (format: 'json' | 'yaml' | 'html' = 'json', options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest('/docs', 'GET', opts => apiClient.docs.getApiDocs(format, opts), options),
        getOpenApiSpec: (options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest('/docs/openapi', 'GET', opts => apiClient.docs.getOpenApiSpec(opts), options),
      },
      users: {
        getAll: (options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest('/users', 'GET', opts => apiClient.users.getAll(opts), options),
        getById: (id: string, options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest(`/users/${id}`, 'GET', opts => apiClient.users.getById(id, opts), options),
        create: (userData: any, options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest('/users', 'POST', opts => apiClient.users.create(userData, opts), options),
        update: (id: string, userData: any, options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest(`/users/${id}`, 'PUT', opts => apiClient.users.update(id, userData, opts), options),
        delete: (id: string, options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest(`/users/${id}`, 'DELETE', opts => apiClient.users.delete(id, opts), options),
        bulkImport: (usersData: any[], options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest('/users/bulk', 'POST', opts => apiClient.users.bulkImport(usersData, opts), options),
        export: (format: 'json' | 'csv' = 'json', options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest('/users/export', 'GET', opts => apiClient.users.export(format, opts), options),
      },
      health: {
        getHistory: (userId: string, options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest(`/health/${userId}/history`, 'GET', opts => apiClient.health.getHistory(userId, opts), options),
        getCurrentStatus: (userId: string, options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest(`/health/${userId}/status`, 'GET', opts => apiClient.health.getCurrentStatus(userId, opts), options),
        logEvent: (userId: string, eventData: any, options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest(`/health/${userId}/events`, 'POST', opts => apiClient.health.logEvent(userId, eventData, opts), options),
        exportUserData: (userId: string, format: 'json' | 'csv' = 'json', options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest(`/health/${userId}/export`, 'GET', opts => apiClient.health.exportUserData(userId, format, opts), options),
      },
      geofencing: {
        getZones: (options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest('/geofencing/zones', 'GET', opts => apiClient.geofencing.getZones(opts), options),
        createZone: (zoneData: any, options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest('/geofencing/zones', 'POST', opts => apiClient.geofencing.createZone(zoneData, opts), options),
        updateZone: (id: string, zoneData: any, options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest(`/geofencing/zones/${id}`, 'PUT', opts => apiClient.geofencing.updateZone(id, zoneData, opts), options),
        deleteZone: (id: string, options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest(`/geofencing/zones/${id}`, 'DELETE', opts => apiClient.geofencing.deleteZone(id, opts), options),
        bulkImportZones: (zonesData: any[], options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest('/geofencing/zones/bulk', 'POST', opts => apiClient.geofencing.bulkImportZones(zonesData, opts), options),
        exportZones: (format: 'json' | 'csv' | 'kml' = 'json', options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest('/geofencing/zones/export', 'GET', opts => apiClient.geofencing.exportZones(format, opts), options),
      },
      system: {
        getHealth: (options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest('/system/health', 'GET', opts => apiClient.system.getHealth(opts), options),
        getApiUsage: (period: 'day' | 'week' | 'month' = 'day', options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest('/system/metrics/api', 'GET', opts => apiClient.system.getApiUsage(period, opts), options),
        getLogs: (level: 'info' | 'warn' | 'error' | 'all' = 'all', options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest('/system/logs', 'GET', opts => apiClient.system.getLogs(level, opts), options),
      },
      integrations: {
        registerWebhook: (webhookData: any, options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest('/integrations/webhooks', 'POST', opts => apiClient.integrations.registerWebhook(webhookData, opts), options),
        testWebhook: (webhookId: string, options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest(`/integrations/webhooks/${webhookId}/test`, 'POST', opts => apiClient.integrations.testWebhook(webhookId, opts), options),
        listWebhooks: (options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest('/integrations/webhooks', 'GET', opts => apiClient.integrations.listWebhooks(opts), options),
        deleteWebhook: (webhookId: string, options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest(`/integrations/webhooks/${webhookId}`, 'DELETE', opts => apiClient.integrations.deleteWebhook(webhookId, opts), options),
      },
    },
  };
}
