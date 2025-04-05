import { apiClient } from '@/services/api';
import { ApiRequestOptions, ApiResponse } from '@/services/apiTypes';
import { useAuth } from '@/context/AuthContext';
import { makeAuthRequest, useApiState, useExportData } from './useApiUtils';
import { useSystemHealth } from './useSystemHealth';
import { useSmartWatch } from './useSmartWatch';

/**
 * Hook for making API requests with authentication and additional integration features
 */
export function useApi() {
  const { user } = useAuth();
  const { getLoadingState, getError, isLoading, clearErrors, updateRequestState } = useApiState();
  const { exportData } = useExportData();
  const smartWatch = useSmartWatch();
  
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
      options,
      updateRequestState
    );
  };
  
  return {
    loading: isLoading(),
    getLoadingState,
    getError,
    clearErrors,
    exportData,
    apiRequest,
    useSystemHealth,
    smartWatch,
    api: {
      docs: {
        getApiDocs: (format: 'json' | 'yaml' | 'html' = 'json', options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest('/docs', 'GET', opts => apiClient.docs.getApiDocs(format, opts), options, updateRequestState),
        getOpenApiSpec: (options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest('/docs/openapi', 'GET', opts => apiClient.docs.getOpenApiSpec(opts), options, updateRequestState),
      },
      users: {
        getAll: (options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest('/users', 'GET', opts => apiClient.users.getAll(opts), options, updateRequestState),
        getById: (id: string, options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest(`/users/${id}`, 'GET', opts => apiClient.users.getById(id, opts), options, updateRequestState),
        create: (userData: any, options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest('/users', 'POST', opts => apiClient.users.create(userData, opts), options, updateRequestState),
        update: (id: string, userData: any, options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest(`/users/${id}`, 'PUT', opts => apiClient.users.update(id, userData, opts), options, updateRequestState),
        delete: (id: string, options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest(`/users/${id}`, 'DELETE', opts => apiClient.users.delete(id, opts), options, updateRequestState),
        bulkImport: (usersData: any[], options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest('/users/bulk', 'POST', opts => apiClient.users.bulkImport(usersData, opts), options, updateRequestState),
        export: (format: 'json' | 'csv' = 'json', options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest('/users/export', 'GET', opts => apiClient.users.export(format, opts), options, updateRequestState),
      },
      health: {
        getHistory: (userId: string, options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest(`/health/${userId}/history`, 'GET', opts => apiClient.health.getHistory(userId, opts), options, updateRequestState),
        getCurrentStatus: (userId: string, options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest(`/health/${userId}/status`, 'GET', opts => apiClient.health.getCurrentStatus(userId, opts), options, updateRequestState),
        logEvent: (userId: string, eventData: any, options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest(`/health/${userId}/events`, 'POST', opts => apiClient.health.logEvent(userId, eventData, opts), options, updateRequestState),
        exportUserData: (userId: string, format: 'json' | 'csv' = 'json', options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest(`/health/${userId}/export`, 'GET', opts => apiClient.health.exportUserData(userId, format, opts), options, updateRequestState),
      },
      geofencing: {
        getZones: (options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest('/geofencing/zones', 'GET', opts => apiClient.geofencing.getZones(opts), options, updateRequestState),
        createZone: (zoneData: any, options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest('/geofencing/zones', 'POST', opts => apiClient.geofencing.createZone(zoneData, opts), options, updateRequestState),
        updateZone: (id: string, zoneData: any, options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest(`/geofencing/zones/${id}`, 'PUT', opts => apiClient.geofencing.updateZone(id, zoneData, opts), options, updateRequestState),
        deleteZone: (id: string, options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest(`/geofencing/zones/${id}`, 'DELETE', opts => apiClient.geofencing.deleteZone(id, opts), options, updateRequestState),
        bulkImportZones: (zonesData: any[], options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest('/geofencing/zones/bulk', 'POST', opts => apiClient.geofencing.bulkImportZones(zonesData, opts), options, updateRequestState),
        exportZones: (format: 'json' | 'csv' | 'kml' = 'json', options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest('/geofencing/zones/export', 'GET', opts => apiClient.geofencing.exportZones(format, opts), options, updateRequestState),
      },
      system: {
        getHealth: (options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest('/system/health', 'GET', opts => apiClient.system.getHealth(opts), options, updateRequestState),
        getApiUsage: (period: 'day' | 'week' | 'month' = 'day', options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest('/system/metrics/api', 'GET', opts => apiClient.system.getApiUsage(period, opts), options, updateRequestState),
        getLogs: (level: 'info' | 'warn' | 'error' | 'all' = 'all', options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest('/system/logs', 'GET', opts => apiClient.system.getLogs(level, opts), options, updateRequestState),
      },
      integrations: {
        registerWebhook: (webhookData: any, options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest('/integrations/webhooks', 'POST', opts => apiClient.integrations.registerWebhook(webhookData, opts), options, updateRequestState),
        testWebhook: (webhookId: string, options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest(`/integrations/webhooks/${webhookId}/test`, 'POST', opts => apiClient.integrations.testWebhook(webhookId, opts), options, updateRequestState),
        listWebhooks: (options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest('/integrations/webhooks', 'GET', opts => apiClient.integrations.listWebhooks(opts), options, updateRequestState),
        deleteWebhook: (webhookId: string, options?: Omit<ApiRequestOptions, 'token'>) => 
          makeAuthRequest(`/integrations/webhooks/${webhookId}`, 'DELETE', opts => apiClient.integrations.deleteWebhook(webhookId, opts), options, updateRequestState),
      },
    },
  };
}
