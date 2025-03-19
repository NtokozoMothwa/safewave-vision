
import React from 'react';
import { Layout } from '@/components/ui/layout';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code } from 'lucide-react';

const ApiDocs: React.FC = () => {
  return (
    <Layout>
      <AnimatedTransition className="max-w-7xl mx-auto">
        <div className="px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-safesphere-white">API Documentation</h1>
              <p className="text-safesphere-white-muted/60">
                Integration guides for corporate systems
              </p>
            </div>
          </div>

          <Card className="bg-safesphere-dark-card border-white/10 mb-6">
            <CardHeader>
              <CardTitle className="text-lg text-safesphere-white flex items-center gap-2">
                <Code className="h-5 w-5 text-safesphere-info" />
                API Overview
              </CardTitle>
              <CardDescription className="text-safesphere-white-muted/70">
                SafeSphere provides a comprehensive RESTful API for integration with corporate systems.
                All endpoints return standardized JSON responses and support authentication via API tokens.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-safesphere-white font-medium mb-2">Base URL</h3>
                  <div className="bg-black rounded-md p-3">
                    <code className="text-safesphere-success">https://api.safesphere.example.com/v1</code>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-safesphere-white font-medium mb-2">Authentication</h3>
                  <p className="text-safesphere-white-muted/70 mb-2">
                    All API requests require authentication using a Bearer token in the Authorization header:
                  </p>
                  <div className="bg-black rounded-md p-3">
                    <code className="text-safesphere-info">Authorization: Bearer YOUR_API_KEY</code>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-safesphere-white font-medium mb-2">Response Format</h3>
                  <p className="text-safesphere-white-muted/70 mb-2">
                    All responses follow this standard format:
                  </p>
                  <div className="bg-black rounded-md p-3">
                    <pre className="text-safesphere-warning whitespace-pre">
{`{
  "success": true|false,
  "data": { ... },  // Present on success
  "error": {        // Present on failure
    "code": "error_code",
    "message": "Error description"
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="bg-safesphere-dark border-white/10 mb-4">
              <TabsTrigger value="users">Users API</TabsTrigger>
              <TabsTrigger value="health">Health API</TabsTrigger>
              <TabsTrigger value="geofencing">Geofencing API</TabsTrigger>
            </TabsList>
            
            <TabsContent value="users">
              <Card className="bg-safesphere-dark-card border-white/10">
                <CardHeader>
                  <CardTitle className="text-lg text-safesphere-white">Users API</CardTitle>
                  <CardDescription className="text-safesphere-white-muted/70">
                    Endpoints for managing users and authentication
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader className="bg-safesphere-dark">
                      <TableRow className="hover:bg-safesphere-dark border-white/10">
                        <TableHead className="text-safesphere-white-muted/70 font-medium">Endpoint</TableHead>
                        <TableHead className="text-safesphere-white-muted/70 font-medium">Method</TableHead>
                        <TableHead className="text-safesphere-white-muted/70 font-medium">Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="hover:bg-safesphere-dark-hover border-white/10">
                        <TableCell className="font-medium text-safesphere-white">/users</TableCell>
                        <TableCell>
                          <Badge className="bg-safesphere-success/20 text-safesphere-success">GET</Badge>
                        </TableCell>
                        <TableCell className="text-safesphere-white-muted/70">Get all users</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-safesphere-dark-hover border-white/10">
                        <TableCell className="font-medium text-safesphere-white">/users/:id</TableCell>
                        <TableCell>
                          <Badge className="bg-safesphere-success/20 text-safesphere-success">GET</Badge>
                        </TableCell>
                        <TableCell className="text-safesphere-white-muted/70">Get a specific user</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-safesphere-dark-hover border-white/10">
                        <TableCell className="font-medium text-safesphere-white">/users</TableCell>
                        <TableCell>
                          <Badge className="bg-safesphere-info/20 text-safesphere-info">POST</Badge>
                        </TableCell>
                        <TableCell className="text-safesphere-white-muted/70">Create a new user</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-safesphere-dark-hover border-white/10">
                        <TableCell className="font-medium text-safesphere-white">/users/:id</TableCell>
                        <TableCell>
                          <Badge className="bg-safesphere-warning/20 text-safesphere-warning">PUT</Badge>
                        </TableCell>
                        <TableCell className="text-safesphere-white-muted/70">Update a user</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-safesphere-dark-hover border-white/10">
                        <TableCell className="font-medium text-safesphere-white">/users/:id</TableCell>
                        <TableCell>
                          <Badge className="bg-safesphere-red/20 text-safesphere-red">DELETE</Badge>
                        </TableCell>
                        <TableCell className="text-safesphere-white-muted/70">Delete a user</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="health">
              <Card className="bg-safesphere-dark-card border-white/10">
                <CardHeader>
                  <CardTitle className="text-lg text-safesphere-white">Health API</CardTitle>
                  <CardDescription className="text-safesphere-white-muted/70">
                    Endpoints for retrieving and logging health information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader className="bg-safesphere-dark">
                      <TableRow className="hover:bg-safesphere-dark border-white/10">
                        <TableHead className="text-safesphere-white-muted/70 font-medium">Endpoint</TableHead>
                        <TableHead className="text-safesphere-white-muted/70 font-medium">Method</TableHead>
                        <TableHead className="text-safesphere-white-muted/70 font-medium">Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="hover:bg-safesphere-dark-hover border-white/10">
                        <TableCell className="font-medium text-safesphere-white">/health/:userId/history</TableCell>
                        <TableCell>
                          <Badge className="bg-safesphere-success/20 text-safesphere-success">GET</Badge>
                        </TableCell>
                        <TableCell className="text-safesphere-white-muted/70">Get user health history</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-safesphere-dark-hover border-white/10">
                        <TableCell className="font-medium text-safesphere-white">/health/:userId/status</TableCell>
                        <TableCell>
                          <Badge className="bg-safesphere-success/20 text-safesphere-success">GET</Badge>
                        </TableCell>
                        <TableCell className="text-safesphere-white-muted/70">Get current health status</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-safesphere-dark-hover border-white/10">
                        <TableCell className="font-medium text-safesphere-white">/health/:userId/events</TableCell>
                        <TableCell>
                          <Badge className="bg-safesphere-info/20 text-safesphere-info">POST</Badge>
                        </TableCell>
                        <TableCell className="text-safesphere-white-muted/70">Log a health event</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="geofencing">
              <Card className="bg-safesphere-dark-card border-white/10">
                <CardHeader>
                  <CardTitle className="text-lg text-safesphere-white">Geofencing API</CardTitle>
                  <CardDescription className="text-safesphere-white-muted/70">
                    Endpoints for geofencing zone management
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader className="bg-safesphere-dark">
                      <TableRow className="hover:bg-safesphere-dark border-white/10">
                        <TableHead className="text-safesphere-white-muted/70 font-medium">Endpoint</TableHead>
                        <TableHead className="text-safesphere-white-muted/70 font-medium">Method</TableHead>
                        <TableHead className="text-safesphere-white-muted/70 font-medium">Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="hover:bg-safesphere-dark-hover border-white/10">
                        <TableCell className="font-medium text-safesphere-white">/geofencing/zones</TableCell>
                        <TableCell>
                          <Badge className="bg-safesphere-success/20 text-safesphere-success">GET</Badge>
                        </TableCell>
                        <TableCell className="text-safesphere-white-muted/70">Get all geofencing zones</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-safesphere-dark-hover border-white/10">
                        <TableCell className="font-medium text-safesphere-white">/geofencing/zones</TableCell>
                        <TableCell>
                          <Badge className="bg-safesphere-info/20 text-safesphere-info">POST</Badge>
                        </TableCell>
                        <TableCell className="text-safesphere-white-muted/70">Create a new zone</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-safesphere-dark-hover border-white/10">
                        <TableCell className="font-medium text-safesphere-white">/geofencing/zones/:id</TableCell>
                        <TableCell>
                          <Badge className="bg-safesphere-warning/20 text-safesphere-warning">PUT</Badge>
                        </TableCell>
                        <TableCell className="text-safesphere-white-muted/70">Update a zone</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-safesphere-dark-hover border-white/10">
                        <TableCell className="font-medium text-safesphere-white">/geofencing/zones/:id</TableCell>
                        <TableCell>
                          <Badge className="bg-safesphere-red/20 text-safesphere-red">DELETE</Badge>
                        </TableCell>
                        <TableCell className="text-safesphere-white-muted/70">Delete a zone</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <Card className="mt-6 bg-safesphere-dark-card border-white/10">
            <CardHeader>
              <CardTitle className="text-lg text-safesphere-white">Integration Examples</CardTitle>
              <CardDescription className="text-safesphere-white-muted/70">
                Code examples for common integrations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-safesphere-white font-medium mb-2">JavaScript/TypeScript</h3>
                  <div className="bg-black rounded-md p-3">
                    <pre className="text-safesphere-purple whitespace-pre overflow-auto">
{`// Example: Fetch users
const fetchUsers = async (apiKey) => {
  const response = await fetch('https://api.safesphere.example.com/v1/users', {
    method: 'GET',
    headers: {
      'Authorization': \`Bearer \${apiKey}\`,
      'Content-Type': 'application/json'
    }
  });
  
  return await response.json();
};`}
                    </pre>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-safesphere-white font-medium mb-2">Python</h3>
                  <div className="bg-black rounded-md p-3">
                    <pre className="text-safesphere-info whitespace-pre overflow-auto">
{`# Example: Fetch user health data
import requests

def get_user_health(user_id, api_key):
    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json'
    }
    
    response = requests.get(
        f'https://api.safesphere.example.com/v1/health/{user_id}/status',
        headers=headers
    )
    
    return response.json()`}
                    </pre>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-safesphere-white font-medium mb-2">Java</h3>
                  <div className="bg-black rounded-md p-3">
                    <pre className="text-safesphere-red-light whitespace-pre overflow-auto">
{`// Example: Create a geofencing zone
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

public class SafeSphereClient {
    private final String apiKey;
    private final HttpClient client = HttpClient.newHttpClient();
    
    public SafeSphereClient(String apiKey) {
        this.apiKey = apiKey;
    }
    
    public String createGeofencingZone(String zoneData) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
            .uri(new URI("https://api.safesphere.example.com/v1/geofencing/zones"))
            .header("Authorization", "Bearer " + apiKey)
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(zoneData))
            .build();
            
        HttpResponse<String> response = client.send(
            request, HttpResponse.BodyHandlers.ofString());
            
        return response.body();
    }
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AnimatedTransition>
    </Layout>
  );
};

export default ApiDocs;
