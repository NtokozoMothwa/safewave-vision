import { ApiRequestOptions, ApiResponse, ApiServices, SystemHealthService } from './apiTypes';
import { SmartWatchApiService, smartwatchApi } from './smartwatchApi';

class ApiClient {
  private baseUrl: string;
  
  constructor(baseUrl: string = 'https://api.safesphere.example.com') {
    this.baseUrl = baseUrl;
  }
  
  /**
   * Generic method to make API requests
   */
  async apiRequest<T = any>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
    options: ApiRequestOptions = {}
  ): Promise<ApiResponse<T>> {
    try {
      // For demo purposes, we're simulating API responses
      console.log(`API Request: ${method} ${endpoint} with options:`, options);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Demo response handler
      return this.getDemoResponse<T>(endpoint, method, options);
    } catch (error) {
      console.error('API Request failed:', error);
      return {
        success: false,
        error: {
          code: 'request_failed',
          message: error instanceof Error ? error.message : 'Unknown error',
        },
        meta: {
          timestamp: new Date().toISOString()
        }
      };
    }
  }
  
  /**
   * Helper method to generate demo responses
   * In a real app, this would not exist, and we'd make actual API calls
   */
  private getDemoResponse<T>(endpoint: string, method: string, options: ApiRequestOptions): ApiResponse<T> {
    // Default successful response
    const successResponse = {
      success: true,
      data: {} as T,
      meta: {
        timestamp: new Date().toISOString()
      }
    };
    
    // Handle system health endpoint specifically for the ApiStatus component
    if (endpoint === '/system/health') {
      return {
        success: true,
        data: {
          status: 'healthy',
          uptime: 99.98,
          message: 'All systems operational',
          lastChecked: new Date().toISOString(),
          services: [
            { name: 'API Gateway', status: 'up', responseTime: 120 },
            { name: 'Auth Service', status: 'up', responseTime: 80 },
            { name: 'Data Storage', status: 'up', responseTime: 190 },
            { name: 'Notification Service', status: 'up', responseTime: 210 }
          ]
        } as unknown as T,
        meta: {
          timestamp: new Date().toISOString()
        }
      };
    }
    
    // Handle geofencing zones endpoint with some mock data
    if (endpoint === '/geofencing/zones' && method === 'GET') {
      return {
        success: true,
        data: [
          { 
            id: 'zone1', 
            name: 'Home', 
            type: 'safe', 
            coordinates: { lat: 37.7749, lng: -122.4194 },
            radius: 500
          },
          { 
            id: 'zone2', 
            name: 'Work', 
            type: 'safe', 
            coordinates: { lat: 37.7833, lng: -122.4167 },
            radius: 300
          },
          { 
            id: 'zone3', 
            name: 'Restricted Area', 
            type: 'danger', 
            coordinates: { lat: 37.8044, lng: -122.2711 },
            radius: 200
          }
        ] as unknown as T,
        meta: {
          timestamp: new Date().toISOString(),
          total: 3
        }
      };
    }
    
    // Handle user health history with mock data
    if (endpoint.includes('/health/') && endpoint.includes('/history')) {
      return {
        success: true,
        data: [
          { date: '2023-10-01', heartRate: 68, bloodPressure: '120/80', activity: 8500 },
          { date: '2023-10-02', heartRate: 72, bloodPressure: '122/82', activity: 7800 },
          { date: '2023-10-03', heartRate: 75, bloodPressure: '125/85', activity: 6200 },
          { date: '2023-10-04', heartRate: 70, bloodPressure: '118/78', activity: 9100 },
          { date: '2023-10-05', heartRate: 68, bloodPressure: '120/80', activity: 8700 },
        ] as unknown as T,
        meta: {
          timestamp: new Date().toISOString()
        }
      };
    }
    
    // For demo purposes, return successful responses for most endpoints
    return successResponse;
  }
  
  // Define API service methods - in a real app these would make real API calls
  get docs() {
    return {
      getApiDocs: (format: 'json' | 'yaml' | 'html' = 'json', options?: ApiRequestOptions) => 
        this.apiRequest('/docs', 'GET', { ...options, format }),
      getOpenApiSpec: (options?: ApiRequestOptions) => 
        this.apiRequest('/docs/openapi', 'GET', options),
    };
  }
  
  get users() {
    return {
      getAll: (options?: ApiRequestOptions) => 
        this.apiRequest('/users', 'GET', options),
      getById: (id: string, options?: ApiRequestOptions) => 
        this.apiRequest(`/users/${id}`, 'GET', options),
      create: (userData: any, options?: ApiRequestOptions) => 
        this.apiRequest('/users', 'POST', { ...options, body: userData }),
      update: (id: string, userData: any, options?: ApiRequestOptions) => 
        this.apiRequest(`/users/${id}`, 'PUT', { ...options, body: userData }),
      delete: (id: string, options?: ApiRequestOptions) => 
        this.apiRequest(`/users/${id}`, 'DELETE', options),
      bulkImport: (usersData: any[], options?: ApiRequestOptions) => 
        this.apiRequest('/users/bulk', 'POST', { ...options, body: usersData }),
      export: (format: 'json' | 'csv' = 'json', options?: ApiRequestOptions) => 
        this.apiRequest('/users/export', 'GET', { ...options, format }),
    };
  }
  
  get health() {
    return {
      getHistory: (userId: string, options?: ApiRequestOptions) => 
        this.apiRequest(`/health/${userId}/history`, 'GET', options),
      getCurrentStatus: (userId: string, options?: ApiRequestOptions) => 
        this.apiRequest(`/health/${userId}/status`, 'GET', options),
      logEvent: (userId: string, eventData: any, options?: ApiRequestOptions) => 
        this.apiRequest(`/health/${userId}/events`, 'POST', { ...options, body: eventData }),
      exportUserData: (userId: string, format: 'json' | 'csv' = 'json', options?: ApiRequestOptions) => 
        this.apiRequest(`/health/${userId}/export`, 'GET', { ...options, format }),
    };
  }
  
  get geofencing() {
    return {
      getZones: (options?: ApiRequestOptions) => 
        this.apiRequest('/geofencing/zones', 'GET', options),
      createZone: (zoneData: any, options?: ApiRequestOptions) => 
        this.apiRequest('/geofencing/zones', 'POST', { ...options, body: zoneData }),
      updateZone: (id: string, zoneData: any, options?: ApiRequestOptions) => 
        this.apiRequest(`/geofencing/zones/${id}`, 'PUT', { ...options, body: zoneData }),
      deleteZone: (id: string, options?: ApiRequestOptions) => 
        this.apiRequest(`/geofencing/zones/${id}`, 'DELETE', options),
      bulkImportZones: (zonesData: any[], options?: ApiRequestOptions) => 
        this.apiRequest('/geofencing/zones/bulk', 'POST', { ...options, body: zonesData }),
      exportZones: (format: 'json' | 'csv' | 'kml' = 'json', options?: ApiRequestOptions) => 
        this.apiRequest('/geofencing/zones/export', 'GET', { ...options, format }),
    };
  }
  
  get system() {
    return {
      getHealth: (options?: ApiRequestOptions) => 
        this.apiRequest<SystemHealthService>('/system/health', 'GET', options),
      getApiUsage: (period: 'day' | 'week' | 'month' = 'day', options?: ApiRequestOptions) => 
        this.apiRequest('/system/metrics/api', 'GET', { ...options, params: { ...options?.params, period } }),
      getLogs: (level: 'info' | 'warn' | 'error' | 'all' = 'all', options?: ApiRequestOptions) => 
        this.apiRequest('/system/logs', 'GET', { ...options, params: { ...options?.params, level } }),
    };
  }
  
  get integrations() {
    return {
      registerWebhook: (webhookData: any, options?: ApiRequestOptions) => 
        this.apiRequest('/integrations/webhooks', 'POST', { ...options, body: webhookData }),
      testWebhook: (webhookId: string, options?: ApiRequestOptions) => 
        this.apiRequest(`/integrations/webhooks/${webhookId}/test`, 'POST', options),
      listWebhooks: (options?: ApiRequestOptions) => 
        this.apiRequest('/integrations/webhooks', 'GET', options),
      deleteWebhook: (webhookId: string, options?: ApiRequestOptions) => 
        this.apiRequest(`/integrations/webhooks/${webhookId}`, 'DELETE', options),
    };
  }
  
  // Add smartwatch API service
  get smartwatch(): SmartWatchApiService {
    return smartwatchApi;
  }
}

// Create an instance of the API client
export const apiClient: ApiServices = new ApiClient() as ApiServices;
