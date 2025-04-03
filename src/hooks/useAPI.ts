
import { useState, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  skipLoading?: boolean; // Added to skip loading state for non-critical requests
}

interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
  execute: (url: string, options?: ApiOptions) => Promise<{ data: T | null; error: Error | null }>;
}

export function useAPI<T = any>(): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { isAuthenticated, logout } = useAuth();

  const execute = useCallback(async (
    url: string,
    {
      method = 'GET',
      body,
      headers = {},
      showSuccessToast = false,
      showErrorToast = true,
      skipLoading = false, // Use this for background requests
    }: ApiOptions = {}
  ): Promise<{ data: T | null; error: Error | null }> => {
    try {
      if (!skipLoading) {
        setLoading(true);
      }
      setError(null);

      const requestHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        ...headers,
      };

      // Add authentication header if logged in
      if (isAuthenticated) {
        requestHeaders['Authorization'] = `Bearer ${localStorage.getItem('auth_token') || ''}`;
      }

      const requestOptions: RequestInit = {
        method,
        headers: requestHeaders,
        credentials: 'include',
      };

      if (body && (method === 'POST' || method === 'PUT')) {
        requestOptions.body = JSON.stringify(body);
      }

      // For demo purposes, simulate API call with reduced time
      await new Promise(resolve => setTimeout(resolve, 200));

      // Simulate API response
      const mockResponse = {
        success: true,
        data: body || { message: 'Success', timestamp: new Date().toISOString() },
        status: 200
      };

      // Handle success
      setData(mockResponse.data as T);
      
      if (showSuccessToast) {
        toast.success('Operation completed successfully');
      }
      
      if (!skipLoading) {
        setLoading(false);
      }
      return { data: mockResponse.data as T, error: null };
    } catch (err) {
      const error = err as Error;
      setError(error);
      setData(null);

      // Handle specific error cases
      if (error.message.includes('401')) {
        toast.error('Your session has expired. Please log in again.');
        logout();
      } else if (showErrorToast) {
        toast.error(error.message || 'An error occurred');
      }

      console.error('API Error:', error);
      if (!skipLoading) {
        setLoading(false);
      }
      return { data: null, error };
    }
  }, [isAuthenticated, logout]);

  return { data, error, loading, execute };
}

export default useAPI;
