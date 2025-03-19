
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
}

// API response interface
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

/**
 * Creates the headers for an API request
 */
const createHeaders = (options?: ApiRequestOptions): Headers => {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  });

  // Add authentication token if provided
  if (options?.token) {
    headers.append('Authorization', `Bearer ${options.token}`);
  }

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
    if (options?.params) {
      const queryParams = new URLSearchParams();
      Object.entries(options.params).forEach(([key, value]) => {
        queryParams.append(key, value);
      });
      url += `?${queryParams.toString()}`;
    }

    // Make the request
    const response = await fetch(url, {
      method,
      headers: createHeaders(options),
      body: options?.body ? JSON.stringify(options.body) : undefined,
    });

    // Parse the JSON response
    const data = await response.json();

    // Return a standardized response
    if (response.ok) {
      return {
        success: true,
        data: data as T,
      };
    } else {
      return {
        success: false,
        error: {
          code: data.error?.code || String(response.status),
          message: data.error?.message || 'Unknown error occurred',
        },
      };
    }
  } catch (error) {
    console.error('API request failed:', error);
    return {
      success: false,
      error: {
        code: 'client_error',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      },
    };
  }
};

/**
 * API client with endpoints for different resources
 */
export const apiClient = {
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
  },
};
