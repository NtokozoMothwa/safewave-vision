
/**
 * SafeSphere API Client
 * 
 * This module provides connectivity to SafeSphere API endpoints
 * for integration with external corporate systems.
 */

// Base configuration for API requests
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.safesphere.example.com/v1';

// API request options interface
export interface ApiRequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string>;
  body?: any;
  token?: string;
  format?: 'json' | 'xml' | 'csv';
  timeout?: number;
  retries?: number;
}

// API response interface
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  meta?: {
    page?: number;
    pageSize?: number;
    totalCount?: number;
    totalPages?: number;
    format?: string;
    timestamp?: string;
    requestId?: string;
  };
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

/**
 * Creates the headers for an API request
 */
const createHeaders = (options?: ApiRequestOptions): Headers => {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': options?.format === 'xml' ? 'application/xml' :
              options?.format === 'csv' ? 'text/csv' : 'application/json',
  });

  // Add authentication token if provided
  if (options?.token) {
    headers.append('Authorization', `Bearer ${options.token}`);
  }

  // Add request ID for tracking
  headers.append('X-Request-ID', `req_${Math.random().toString(36).substring(2, 15)}`);

  // Add any custom headers
  if (options?.headers) {
    Object.entries(options.headers).forEach(([key, value]) => {
      headers.append(key, value);
    });
  }

  return headers;
};

/**
 * Makes an API request
 */
export const apiRequest = async <T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  options?: ApiRequestOptions
): Promise<ApiResponse<T>> => {
  try {
    // Build the URL with any query parameters
    let url = `${API_BASE_URL}${endpoint}`;
    
    // Add standard parameters
    const queryParams = new URLSearchParams();
    
    // Add format parameter if specified
    if (options?.format) {
      queryParams.append('format', options.format);
    }
    
    // Add custom parameters
    if (options?.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        queryParams.append(key, value);
      });
    }
    
    // Append params to URL if we have any
    if (queryParams.toString()) {
      url += `?${queryParams.toString()}`;
    }

    // Set up AbortController for timeout
    const controller = new AbortController();
    const timeoutMs = options?.timeout || 30000;
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    // Make the request
    const response = await fetch(url, {
      method,
      headers: createHeaders(options),
      body: options?.body ? JSON.stringify(options.body) : undefined,
      signal: controller.signal,
    });

    // Clear the timeout
    clearTimeout(timeoutId);

    // Handle different response formats
    let data: any;
    const contentType = response.headers.get('Content-Type') || '';
    
    if (contentType.includes('application/json')) {
      data = await response.json();
    } else if (contentType.includes('text/csv')) {
      const text = await response.text();
      // Simple parsing in this example - in production would use proper CSV parser
      data = text;
    } else if (contentType.includes('application/xml')) {
      const text = await response.text();
      // Simple string in this example - in production would use XML parser
      data = text;
    } else {
      data = await response.text();
    }

    // Get response headers for metadata
    const requestId = response.headers.get('X-Request-ID') || undefined;
    
    // Return a standardized response
    if (response.ok) {
      return {
        success: true,
        data: data as T,
        meta: {
          format: options?.format || 'json',
          timestamp: new Date().toISOString(),
          requestId
        }
      };
    } else {
      return {
        success: false,
        error: {
          code: data.error?.code || String(response.status),
          message: data.error?.message || 'Unknown error occurred',
          details: data.error?.details || null
        },
        meta: {
          timestamp: new Date().toISOString(),
          requestId
        }
      };
    }
  } catch (error) {
    console.error('API request failed:', error);
    
    // Handle abort error (timeout)
    if (error instanceof DOMException && error.name === 'AbortError') {
      return {
        success: false,
        error: {
          code: 'request_timeout',
          message: 'The request timed out',
        },
        meta: {
          timestamp: new Date().toISOString()
        }
      };
    }
    
    return {
      success: false,
      error: {
        code: 'client_error',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      meta: {
        timestamp: new Date().toISOString()
      }
    };
  }
};

/**
 * API client with endpoints for different resources
 */
export const apiClient = {
  // Documentation endpoints
  docs: {
    /**
     * Get API documentation in various formats
     */
    getApiDocs: async (format: 'json' | 'yaml' | 'html' = 'json', options?: ApiRequestOptions) => {
      return apiRequest<any>('/docs', 'GET', {
        ...options,
        params: {
          ...options?.params,
          format
        }
      });
    },
    
    /**
     * Get OpenAPI specification
     */
    getOpenApiSpec: async (options?: ApiRequestOptions) => {
      return apiRequest<any>('/docs/openapi', 'GET', options);
    }
  },
  
  // User-related endpoints
  users: {
    /**
     * Get a list of users
     */
    getAll: async (options?: ApiRequestOptions) => {
      return apiRequest<any[]>('/users', 'GET', options);
    },
    
    /**
     * Get a single user by ID
     */
    getById: async (id: string, options?: ApiRequestOptions) => {
      return apiRequest<any>(`/users/${id}`, 'GET', options);
    },
    
    /**
     * Create a new user
     */
    create: async (userData: any, options?: ApiRequestOptions) => {
      return apiRequest<any>('/users', 'POST', {
        ...options,
        body: userData,
      });
    },
    
    /**
     * Update a user
     */
    update: async (id: string, userData: any, options?: ApiRequestOptions) => {
      return apiRequest<any>(`/users/${id}`, 'PUT', {
        ...options,
        body: userData,
      });
    },
    
    /**
     * Delete a user
     */
    delete: async (id: string, options?: ApiRequestOptions) => {
      return apiRequest<void>(`/users/${id}`, 'DELETE', options);
    },
    
    /**
     * Bulk import users
     */
    bulkImport: async (usersData: any[], options?: ApiRequestOptions) => {
      return apiRequest<{success: number; failed: number}>('/users/bulk', 'POST', {
        ...options,
        body: { users: usersData },
      });
    },
    
    /**
     * Export users data
     */
    export: async (format: 'json' | 'csv' = 'json', options?: ApiRequestOptions) => {
      return apiRequest<any>('/users/export', 'GET', {
        ...options,
        format,
      });
    },
  },
  
  // Health data endpoints
  health: {
    /**
     * Get historical health data
     */
    getHistory: async (userId: string, options?: ApiRequestOptions) => {
      return apiRequest<any[]>(`/health/${userId}/history`, 'GET', options);
    },
    
    /**
     * Get current health status
     */
    getCurrentStatus: async (userId: string, options?: ApiRequestOptions) => {
      return apiRequest<any>(`/health/${userId}/status`, 'GET', options);
    },
    
    /**
     * Log a new health event
     */
    logEvent: async (userId: string, eventData: any, options?: ApiRequestOptions) => {
      return apiRequest<any>(`/health/${userId}/events`, 'POST', {
        ...options,
        body: eventData,
      });
    },
    
    /**
     * Export health data for a user
     */
    exportUserData: async (userId: string, format: 'json' | 'csv' = 'json', options?: ApiRequestOptions) => {
      return apiRequest<any>(`/health/${userId}/export`, 'GET', {
        ...options,
        format,
      });
    },
  },
  
  // Geofencing endpoints
  geofencing: {
    /**
     * Get all geofencing zones
     */
    getZones: async (options?: ApiRequestOptions) => {
      return apiRequest<any[]>('/geofencing/zones', 'GET', options);
    },
    
    /**
     * Create a new geofencing zone
     */
    createZone: async (zoneData: any, options?: ApiRequestOptions) => {
      return apiRequest<any>('/geofencing/zones', 'POST', {
        ...options,
        body: zoneData,
      });
    },
    
    /**
     * Update a geofencing zone
     */
    updateZone: async (id: string, zoneData: any, options?: ApiRequestOptions) => {
      return apiRequest<any>(`/geofencing/zones/${id}`, 'PUT', {
        ...options,
        body: zoneData,
      });
    },
    
    /**
     * Delete a geofencing zone
     */
    deleteZone: async (id: string, options?: ApiRequestOptions) => {
      return apiRequest<void>(`/geofencing/zones/${id}`, 'DELETE', options);
    },
    
    /**
     * Bulk import zones
     */
    bulkImportZones: async (zonesData: any[], options?: ApiRequestOptions) => {
      return apiRequest<{success: number; failed: number}>('/geofencing/zones/bulk', 'POST', {
        ...options,
        body: { zones: zonesData },
      });
    },
    
    /**
     * Export all zones
     */
    exportZones: async (format: 'json' | 'csv' | 'kml' = 'json', options?: ApiRequestOptions) => {
      return apiRequest<any>('/geofencing/zones/export', 'GET', {
        ...options,
        params: {
          ...options?.params,
          format
        }
      });
    },
  },
  
  // System monitoring endpoints
  system: {
    /**
     * Get system health status
     */
    getHealth: async (options?: ApiRequestOptions) => {
      return apiRequest<any>('/system/health', 'GET', options);
    },
    
    /**
     * Get API usage metrics
     */
    getApiUsage: async (period: 'day' | 'week' | 'month' = 'day', options?: ApiRequestOptions) => {
      return apiRequest<any>('/system/metrics/api', 'GET', {
        ...options,
        params: {
          ...options?.params,
          period
        }
      });
    },
    
    /**
     * Get logs
     */
    getLogs: async (level: 'info' | 'warn' | 'error' | 'all' = 'all', options?: ApiRequestOptions) => {
      return apiRequest<any[]>('/system/logs', 'GET', {
        ...options,
        params: {
          ...options?.params,
          level
        }
      });
    },
  },
  
  // Integration endpoints
  integrations: {
    /**
     * Register a webhook
     */
    registerWebhook: async (webhookData: any, options?: ApiRequestOptions) => {
      return apiRequest<any>('/integrations/webhooks', 'POST', {
        ...options,
        body: webhookData,
      });
    },
    
    /**
     * Test a webhook
     */
    testWebhook: async (webhookId: string, options?: ApiRequestOptions) => {
      return apiRequest<any>(`/integrations/webhooks/${webhookId}/test`, 'POST', options);
    },
    
    /**
     * List available webhooks
     */
    listWebhooks: async (options?: ApiRequestOptions) => {
      return apiRequest<any[]>('/integrations/webhooks', 'GET', options);
    },
    
    /**
     * Delete a webhook
     */
    deleteWebhook: async (webhookId: string, options?: ApiRequestOptions) => {
      return apiRequest<void>(`/integrations/webhooks/${webhookId}`, 'DELETE', options);
    },
  },
};
