
import { useState, useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import Header from '@/components/Header';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, X, Copy, Code, FileJson, FileText } from 'lucide-react';
import { toast } from 'sonner';

const ApiDocs = () => {
  const { api } = useApi();
  const [apiSpec, setApiSpec] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchApiDocs = async () => {
      setLoading(true);
      try {
        const response = await api.docs.getOpenApiSpec();
        if (response.success && response.data) {
          setApiSpec(response.data);
        } else {
          toast.error("Failed to load API documentation");
        }
      } catch (error) {
        console.error("Error fetching API docs:", error);
        toast.error("Error loading API documentation");
      } finally {
        setLoading(false);
      }
    };
    
    fetchApiDocs();
  }, [api.docs]);
  
  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Code copied to clipboard");
  };
  
  const downloadDocs = async (format: 'json' | 'yaml' | 'html') => {
    try {
      const response = await api.docs.getApiDocs(format);
      if (response.success && response.data) {
        let fileContent, mimeType, fileName;
        
        if (format === 'json') {
          fileContent = JSON.stringify(response.data, null, 2);
          mimeType = 'application/json';
          fileName = 'safesphere-api-docs.json';
        } else if (format === 'yaml') {
          fileContent = String(response.data);
          mimeType = 'application/yaml';
          fileName = 'safesphere-api-docs.yaml';
        } else {
          fileContent = String(response.data);
          mimeType = 'text/html';
          fileName = 'safesphere-api-docs.html';
        }
        
        const blob = new Blob([fileContent], { type: mimeType });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        toast.success(`API documentation downloaded as ${format.toUpperCase()}`);
      }
    } catch (error) {
      toast.error(`Failed to download API documentation as ${format.toUpperCase()}`);
    }
  };
  
  // Mock API endpoints for demo
  const mockEndpoints = [
    {
      path: '/system/health',
      method: 'GET',
      description: 'Get current system health status',
      response: {
        success: true,
        data: {
          status: 'healthy',
          uptime: 99.98,
          services: [
            { name: 'API Gateway', status: 'up', responseTime: 120 },
          ]
        }
      }
    },
    {
      path: '/users',
      method: 'GET',
      description: 'Get all users',
      response: {
        success: true,
        data: [
          { id: '1', name: 'John Doe', email: 'john@example.com' }
        ]
      }
    },
    {
      path: '/health/{userId}/status',
      method: 'GET',
      description: 'Get health status for a specific user',
      response: {
        success: true,
        data: {
          heartRate: 75,
          bloodPressure: { systolic: 120, diastolic: 80 },
          temperature: 98.6
        }
      }
    }
  ];
  
  return (
    <div className="min-h-screen bg-mesh-pattern">
      <Header />
      <div className="max-w-7xl mx-auto px-4 pt-20 pb-10">
        <div className="glass-card rounded-2xl p-6 mb-8">
          <h1 className="text-3xl font-bold mb-2">API Documentation</h1>
          <p className="text-safesphere-white-muted/60 mb-6">
            Comprehensive documentation for integrating with the SafeSphere API.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <button 
              onClick={() => downloadDocs('json')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-safesphere-dark-card hover:bg-safesphere-dark-hover button-hover"
            >
              <FileJson size={16} />
              <span>Download as JSON</span>
            </button>
            <button 
              onClick={() => downloadDocs('yaml')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-safesphere-dark-card hover:bg-safesphere-dark-hover button-hover"
            >
              <FileText size={16} />
              <span>Download as YAML</span>
            </button>
            <button 
              onClick={() => downloadDocs('html')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-safesphere-dark-card hover:bg-safesphere-dark-hover button-hover"
            >
              <Code size={16} />
              <span>Download as HTML</span>
            </button>
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
              <p className="mt-4 text-safesphere-white-muted/60">Loading API documentation...</p>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-4">API Endpoints</h2>
              
              <Accordion type="single" collapsible className="w-full">
                {mockEndpoints.map((endpoint, index) => (
                  <AccordionItem key={index} value={`endpoint-${index}`} className="border-safesphere-dark-hover">
                    <AccordionTrigger className="py-4 text-left">
                      <div className="flex items-start">
                        <span className={`px-2 py-1 rounded text-xs mr-3 ${
                          endpoint.method === 'GET' ? 'bg-blue-500/20 text-blue-400' :
                          endpoint.method === 'POST' ? 'bg-green-500/20 text-green-400' :
                          endpoint.method === 'PUT' ? 'bg-yellow-500/20 text-yellow-400' :
                          endpoint.method === 'DELETE' ? 'bg-red-500/20 text-red-400' :
                          'bg-purple-500/20 text-purple-400'
                        }`}>
                          {endpoint.method}
                        </span>
                        <div>
                          <div className="font-mono text-sm">{endpoint.path}</div>
                          <div className="text-xs text-safesphere-white-muted/60 mt-1">{endpoint.description}</div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pl-10 pr-4 py-3">
                        <h4 className="text-sm font-medium mb-2">Example Response</h4>
                        <div className="relative">
                          <pre className="bg-safesphere-dark-card p-4 rounded-lg overflow-x-auto font-mono text-xs">
                            {JSON.stringify(endpoint.response, null, 2)}
                          </pre>
                          <button 
                            onClick={() => handleCopyCode(JSON.stringify(endpoint.response, null, 2))}
                            className="absolute top-2 right-2 p-1.5 rounded-md bg-safesphere-dark-hover/50 hover:bg-safesphere-dark-hover text-safesphere-white-muted/60 hover:text-safesphere-white button-hover"
                          >
                            <Copy size={14} />
                          </button>
                        </div>
                        
                        <div className="mt-4">
                          <h4 className="text-sm font-medium mb-2">Code Example</h4>
                          <div className="relative">
                            <pre className="bg-safesphere-dark-card p-4 rounded-lg overflow-x-auto font-mono text-xs">
{`// Using fetch API
fetch("https://api.safesphere.example.com${endpoint.path}", {
  method: "${endpoint.method}",
  headers: {
    "Authorization": "Bearer YOUR_API_TOKEN",
    "Content-Type": "application/json"
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error("Error:", error));`}
                            </pre>
                            <button 
                              onClick={() => handleCopyCode(`// Using fetch API
fetch("https://api.safesphere.example.com${endpoint.path}", {
  method: "${endpoint.method}",
  headers: {
    "Authorization": "Bearer YOUR_API_TOKEN",
    "Content-Type": "application/json"
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error("Error:", error));`)}
                              className="absolute top-2 right-2 p-1.5 rounded-md bg-safesphere-dark-hover/50 hover:bg-safesphere-dark-hover text-safesphere-white-muted/60 hover:text-safesphere-white button-hover"
                            >
                              <Copy size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              
              <div className="mt-8 p-4 border border-safesphere-dark-hover rounded-lg">
                <h3 className="text-lg font-medium mb-2">Authentication</h3>
                <p className="text-safesphere-white-muted/80 text-sm mb-3">
                  All API requests require authentication. Include your API token in the Authorization header:
                </p>
                <div className="relative">
                  <pre className="bg-safesphere-dark-card p-3 rounded-lg overflow-x-auto font-mono text-xs">
{`Authorization: Bearer YOUR_API_TOKEN`}
                  </pre>
                  <button 
                    onClick={() => handleCopyCode(`Authorization: Bearer YOUR_API_TOKEN`)}
                    className="absolute top-2 right-2 p-1.5 rounded-md bg-safesphere-dark-hover/50 hover:bg-safesphere-dark-hover text-safesphere-white-muted/60 hover:text-safesphere-white button-hover"
                  >
                    <Copy size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiDocs;
