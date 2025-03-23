
import { useState } from 'react';
import { useApi } from '@/hooks/useApi';
import { toast } from 'sonner';
import Header from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Copy, Download, Code, FileJson } from 'lucide-react';
import AnimatedTransition from '@/components/AnimatedTransition';

const ApiDocs = () => {
  const { api, getLoadingState } = useApi();
  const [format, setFormat] = useState<'json' | 'yaml' | 'html'>('json');
  const [apiSpec, setApiSpec] = useState<string>('');
  
  const isLoading = getLoadingState('/docs', 'GET') || getLoadingState('/docs/openapi', 'GET');
  
  const fetchApiDocs = async () => {
    const response = await api.docs.getApiDocs(format);
    if (response.success && response.data) {
      if (typeof response.data === 'string') {
        setApiSpec(response.data);
      } else {
        setApiSpec(JSON.stringify(response.data, null, 2));
      }
      toast.success('API documentation loaded successfully');
    }
  };
  
  const fetchOpenApiSpec = async () => {
    const response = await api.docs.getOpenApiSpec();
    if (response.success && response.data) {
      setApiSpec(JSON.stringify(response.data, null, 2));
      toast.success('OpenAPI specification loaded successfully');
    }
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiSpec);
    toast.success('Copied to clipboard');
  };
  
  const downloadSpec = () => {
    const element = document.createElement('a');
    const file = new Blob([apiSpec], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `safesphere-api-${format}.${format === 'html' ? 'html' : format === 'yaml' ? 'yaml' : 'json'}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('Downloaded API specification');
  };
  
  // Demo API documentation
  const demoApiDocs = {
    "openapi": "3.0.0",
    "info": {
      "title": "SafeSphere API",
      "version": "1.0.0",
      "description": "API for SafeSphere health and safety monitoring system"
    },
    "servers": [
      {
        "url": "https://api.safesphere.example.com/v1",
        "description": "Production API Server"
      }
    ],
    "paths": {
      "/users": {
        "get": {
          "summary": "Get all users",
          "description": "Returns a list of all users"
        },
        "post": {
          "summary": "Create a new user",
          "description": "Creates a new user in the system"
        }
      },
      "/users/{id}": {
        "get": {
          "summary": "Get user by ID",
          "description": "Returns a single user by ID"
        },
        "put": {
          "summary": "Update user",
          "description": "Updates an existing user"
        },
        "delete": {
          "summary": "Delete user",
          "description": "Deletes a user from the system"
        }
      },
      "/health/{userId}/history": {
        "get": {
          "summary": "Get health history",
          "description": "Returns historical health data for a user"
        }
      },
      "/health/{userId}/status": {
        "get": {
          "summary": "Get current health status",
          "description": "Returns the current health status for a user"
        }
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-mesh-pattern">
      <Header />
      <AnimatedTransition className="max-w-7xl mx-auto px-4 pt-24 pb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">API Documentation</h1>
            <p className="text-safesphere-white-muted/60 mt-2">
              Integrate SafeSphere with your systems using our comprehensive API
            </p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button 
              variant="outline" 
              onClick={copyToClipboard} 
              disabled={!apiSpec}
            >
              <Copy className="mr-2 h-4 w-4" /> Copy
            </Button>
            <Button 
              onClick={downloadSpec} 
              disabled={!apiSpec}
            >
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1 glass-card rounded-2xl p-5">
            <h2 className="text-lg font-semibold mb-4">API Resources</h2>
            <ul className="space-y-2">
              <li className="py-2 px-3 bg-safesphere-dark-hover rounded-lg text-sm font-medium">
                Users
              </li>
              <li className="py-2 px-3 hover:bg-safesphere-dark-hover rounded-lg text-sm">
                Health Data
              </li>
              <li className="py-2 px-3 hover:bg-safesphere-dark-hover rounded-lg text-sm">
                Geofencing
              </li>
              <li className="py-2 px-3 hover:bg-safesphere-dark-hover rounded-lg text-sm">
                System Monitoring
              </li>
              <li className="py-2 px-3 hover:bg-safesphere-dark-hover rounded-lg text-sm">
                Webhooks
              </li>
            </ul>
            
            <h2 className="text-lg font-semibold mt-6 mb-4">Documentation Format</h2>
            <div className="space-y-2">
              <button 
                className={`w-full py-2 px-3 rounded-lg text-sm text-left ${format === 'json' ? 'bg-safesphere-dark-hover font-medium' : 'hover:bg-safesphere-dark-hover'}`}
                onClick={() => setFormat('json')}
              >
                <FileJson className="inline-block mr-2 h-4 w-4" /> JSON
              </button>
              <button 
                className={`w-full py-2 px-3 rounded-lg text-sm text-left ${format === 'yaml' ? 'bg-safesphere-dark-hover font-medium' : 'hover:bg-safesphere-dark-hover'}`}
                onClick={() => setFormat('yaml')}
              >
                <Code className="inline-block mr-2 h-4 w-4" /> YAML
              </button>
              <button 
                className={`w-full py-2 px-3 rounded-lg text-sm text-left ${format === 'html' ? 'bg-safesphere-dark-hover font-medium' : 'hover:bg-safesphere-dark-hover'}`}
                onClick={() => setFormat('html')}
              >
                <Code className="inline-block mr-2 h-4 w-4" /> HTML
              </button>
            </div>
            
            <div className="mt-6">
              <Button 
                className="w-full"
                onClick={fetchApiDocs}
                disabled={isLoading}
              >
                Load API Docs
              </Button>
              <Button 
                className="w-full mt-2"
                variant="outline"
                onClick={fetchOpenApiSpec}
                disabled={isLoading}
              >
                Load OpenAPI Spec
              </Button>
            </div>
          </div>
          
          <div className="md:col-span-3 glass-card rounded-2xl p-5">
            <Tabs defaultValue="documentation">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="documentation">Documentation</TabsTrigger>
                <TabsTrigger value="examples">Code Examples</TabsTrigger>
              </TabsList>
              
              <TabsContent value="documentation" className="mt-6">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold mb-2">API Specification</h2>
                  <p className="text-safesphere-white-muted/60 text-sm">
                    Full documentation of available endpoints and their parameters
                  </p>
                </div>
                
                {isLoading ? (
                  <div className="flex justify-center p-8">
                    <div className="animate-pulse">Loading API documentation...</div>
                  </div>
                ) : (
                  <pre className="bg-safesphere-dark-card/50 p-4 rounded-lg overflow-auto max-h-[600px] text-sm">
                    {apiSpec || JSON.stringify(demoApiDocs, null, 2)}
                  </pre>
                )}
              </TabsContent>
              
              <TabsContent value="examples" className="mt-6">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold mb-2">Code Examples</h2>
                  <p className="text-safesphere-white-muted/60 text-sm">
                    Sample code for integrating with the SafeSphere API
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-medium mb-2">JavaScript/TypeScript</h3>
                    <pre className="bg-safesphere-dark-card/50 p-4 rounded-lg overflow-auto text-sm">
{`// Fetch user data
const fetchUsers = async () => {
  const response = await fetch('https://api.safesphere.example.com/v1/users', {
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    }
  });
  
  const data = await response.json();
  return data;
};

// Create a new user
const createUser = async (userData) => {
  const response = await fetch('https://api.safesphere.example.com/v1/users', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });
  
  const data = await response.json();
  return data;
};`}
                    </pre>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium mb-2">Python</h3>
                    <pre className="bg-safesphere-dark-card/50 p-4 rounded-lg overflow-auto text-sm">
{`import requests

API_BASE = 'https://api.safesphere.example.com/v1'
API_TOKEN = 'YOUR_API_TOKEN'

def get_users():
    headers = {
        'Authorization': f'Bearer {API_TOKEN}',
        'Content-Type': 'application/json'
    }
    response = requests.get(f'{API_BASE}/users', headers=headers)
    return response.json()

def create_user(user_data):
    headers = {
        'Authorization': f'Bearer {API_TOKEN}',
        'Content-Type': 'application/json'
    }
    response = requests.post(
        f'{API_BASE}/users', 
        headers=headers, 
        json=user_data
    )
    return response.json()`}
                    </pre>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </AnimatedTransition>
    </div>
  );
};

export default ApiDocs;
