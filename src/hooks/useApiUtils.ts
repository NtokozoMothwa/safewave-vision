
import { useState } from 'react';
import { apiClient } from '@/services/api';
import { ApiRequestOptions, ApiResponse } from '@/services/apiTypes';
import { toast } from 'sonner';

interface ApiState {
  loading: boolean;
  error: string | null;
}

// Initialize states for API requests
export const useApiState = () => {
  const [state, setState] = useState<Record<string, ApiState>>({});
  
  /**
   * Helper function to create a request key for tracking loading states
   */
  const createRequestKey = (endpoint: string, method: string) => {
    return `${method}:${endpoint}`;
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
   * Update state for a request
   */
  const updateRequestState = (
    endpoint: string,
    method: string,
    loading: boolean,
    error: string | null = null
  ) => {
    const requestKey = createRequestKey(endpoint, method);
    setState(prev => ({
      ...prev,
      [requestKey]: { loading, error }
    }));
  };
  
  return {
    getLoadingState,
    getError,
    isLoading,
    clearErrors,
    updateRequestState,
  };
};

/**
 * Helper function to make authenticated API requests
 */
export const makeAuthRequest = async <T>(
  endpoint: string,
  method: string,
  requestFn: (options?: ApiRequestOptions) => Promise<ApiResponse<T>>,
  options?: Omit<ApiRequestOptions, 'token'>,
  updateRequestState?: (endpoint: string, method: string, loading: boolean, error: string | null) => void
): Promise<ApiResponse<T>> => {
  if (updateRequestState) {
    updateRequestState(endpoint, method, true, null);
  }
  
  try {
    // Get token from localStorage, in a real app you'd use a proper auth token
    const token = localStorage.getItem('safesphere_api_token') || 'demo_token';
    
    const response = await requestFn({
      ...options,
      token,
    });
    
    if (!response.success && response.error) {
      if (updateRequestState) {
        updateRequestState(endpoint, method, false, response.error.message);
      }
      
      if (options?.showErrors !== false) {
        toast.error(response.error.message, {
          description: `Error code: ${response.error.code}`,
          duration: 5000,
        });
      }
    } else {
      if (updateRequestState) {
        updateRequestState(endpoint, method, false, null);
      }
    }
    
    return response;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    
    if (updateRequestState) {
      updateRequestState(endpoint, method, false, errorMessage);
    }
    
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
 * Export data in various formats
 */
export const useExportData = () => {
  const { updateRequestState } = useApiState();
  
  const exportData = async (
    endpoint: string, 
    format: 'json' | 'csv' | 'xml' = 'json',
    fileName: string = 'safesphere_export',
    options?: Omit<ApiRequestOptions, 'token'>
  ) => {
    const response = await makeAuthRequest(
      endpoint, 
      'GET',
      (opts) => apiClient.apiRequest(endpoint, 'GET', { ...opts, format }),
      options,
      updateRequestState
    );
    
    if (response.success && response.data) {
      let dataStr: string;
      let fileNameWithExt: string;
      
      if (format === 'json') {
        dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(response.data, null, 2));
        fileNameWithExt = `${fileName}.json`;
      } else if (format === 'csv') {
        const csvData = typeof response.data === 'string' ? response.data : String(response.data);
        dataStr = "data:text/csv;charset=utf-8," + encodeURIComponent(csvData);
        fileNameWithExt = `${fileName}.csv`;
      } else {
        const xmlData = typeof response.data === 'string' ? response.data : String(response.data);
        dataStr = "data:text/xml;charset=utf-8," + encodeURIComponent(xmlData);
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
  
  return { exportData };
};
