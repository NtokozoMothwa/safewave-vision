
import React from 'react';
import { Layout } from '@/components/ui/layout';
import { useApi } from '@/hooks/useApi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowRight, Book, FileJson, FileText } from 'lucide-react';

const ApiDocs: React.FC = () => {
  const { api } = useApi();

  return (
    <Layout>
      <div className="container mx-auto py-10">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">API Documentation</CardTitle>
            <CardDescription>Explore the SafeSphere API endpoints and schemas.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList>
                <TabsTrigger value="overview">
                  <Book className="mr-2 h-4 w-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="json">
                  <FileJson className="mr-2 h-4 w-4" />
                  JSON
                </TabsTrigger>
                <TabsTrigger value="yaml">
                  <FileText className="mr-2 h-4 w-4" />
                  YAML
                </TabsTrigger>
                <TabsTrigger value="html">
                  <FileText className="mr-2 h-4 w-4" />
                  HTML
                </TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <div className="space-y-4">
                  <p>
                    Welcome to the SafeSphere API documentation. Here, you can explore our API endpoints,
                    schemas, and examples to help you integrate SafeSphere with your applications.
                  </p>
                  <p>
                    Use the tabs above to view the API documentation in different formats.
                  </p>
                  <Button asChild>
                    <a href="/docs/openapi" target="_blank" className="flex items-center">
                      View OpenAPI Spec <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="json">
                <pre className="bg-gray-100 rounded-md p-4 overflow-x-auto">
                  <code>
                    {/* JSON Content Here */}
                    {JSON.stringify(api, null, 2)}
                  </code>
                </pre>
              </TabsContent>
              <TabsContent value="yaml">
                <pre className="bg-gray-100 rounded-md p-4 overflow-x-auto">
                  <code>
                    {/* YAML Content Here */}
                    YAML Documentation Coming Soon
                  </code>
                </pre>
              </TabsContent>
              <TabsContent value="html">
                <div className="space-y-4">
                  {/* HTML Content Here */}
                  <p>HTML Documentation Coming Soon</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ApiDocs;
