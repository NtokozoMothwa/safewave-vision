
export interface ApiError {
  code: string;
  message: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: Record<string, any>;
}

export interface ApiRequestOptions {
  token?: string;
  params?: Record<string, string | number | boolean>;
  body?: any;
  headers?: Record<string, string>;
  format?: 'json' | 'csv' | 'xml' | 'yaml' | 'kml' | 'html';
  showErrors?: boolean;
}

export interface SystemHealthService {
  status: string;
  uptime: number;
  message: string;
  lastChecked: string;
  services: Array<{
    name: string;
    status: string;
    responseTime: number;
  }>;
}

export interface ApiServices {
  docs: {
    getApiDocs: (format?: 'json' | 'yaml' | 'html', options?: Omit<ApiRequestOptions, 'token'>) => Promise<ApiResponse>;
    getOpenApiSpec: (options?: Omit<ApiRequestOptions, 'token'>) => Promise<ApiResponse>;
  };
  users: {
    getAll: (options?: Omit<ApiRequestOptions, 'token'>) => Promise<ApiResponse>;
    getById: (id: string, options?: Omit<ApiRequestOptions, 'token'>) => Promise<ApiResponse>;
    create: (userData: any, options?: Omit<ApiRequestOptions, 'token'>) => Promise<ApiResponse>;
    update: (id: string, userData: any, options?: Omit<ApiRequestOptions, 'token'>) => Promise<ApiResponse>;
    delete: (id: string, options?: Omit<ApiRequestOptions, 'token'>) => Promise<ApiResponse>;
    bulkImport: (usersData: any[], options?: Omit<ApiRequestOptions, 'token'>) => Promise<ApiResponse>;
    export: (format: 'json' | 'csv', options?: Omit<ApiRequestOptions, 'token'>) => Promise<ApiResponse>;
  };
  health: {
    getHistory: (userId: string, options?: Omit<ApiRequestOptions, 'token'>) => Promise<ApiResponse>;
    getCurrentStatus: (userId: string, options?: Omit<ApiRequestOptions, 'token'>) => Promise<ApiResponse>;
    logEvent: (userId: string, eventData: any, options?: Omit<ApiRequestOptions, 'token'>) => Promise<ApiResponse>;
    exportUserData: (userId: string, format?: 'json' | 'csv', options?: Omit<ApiRequestOptions, 'token'>) => Promise<ApiResponse>;
  };
  geofencing: {
    getZones: (options?: Omit<ApiRequestOptions, 'token'>) => Promise<ApiResponse>;
    createZone: (zoneData: any, options?: Omit<ApiRequestOptions, 'token'>) => Promise<ApiResponse>;
    updateZone: (id: string, zoneData: any, options?: Omit<ApiRequestOptions, 'token'>) => Promise<ApiResponse>;
    deleteZone: (id: string, options?: Omit<ApiRequestOptions, 'token'>) => Promise<ApiResponse>;
    bulkImportZones: (zonesData: any[], options?: Omit<ApiRequestOptions, 'token'>) => Promise<ApiResponse>;
    exportZones: (format?: 'json' | 'csv' | 'kml', options?: Omit<ApiRequestOptions, 'token'>) => Promise<ApiResponse>;
  };
  system: {
    getHealth: (options?: Omit<ApiRequestOptions, 'token'>) => Promise<ApiResponse<SystemHealthService>>;
    getApiUsage: (period?: 'day' | 'week' | 'month', options?: Omit<ApiRequestOptions, 'token'>) => Promise<ApiResponse>;
    getLogs: (level?: 'info' | 'warn' | 'error' | 'all', options?: Omit<ApiRequestOptions, 'token'>) => Promise<ApiResponse>;
  };
  integrations: {
    registerWebhook: (webhookData: any, options?: Omit<ApiRequestOptions, 'token'>) => Promise<ApiResponse>;
    testWebhook: (webhookId: string, options?: Omit<ApiRequestOptions, 'token'>) => Promise<ApiResponse>;
    listWebhooks: (options?: Omit<ApiRequestOptions, 'token'>) => Promise<ApiResponse>;
    deleteWebhook: (webhookId: string, options?: Omit<ApiRequestOptions, 'token'>) => Promise<ApiResponse>;
  };
  apiRequest: <T = any>(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH', options?: ApiRequestOptions) => Promise<ApiResponse<T>>;
}
