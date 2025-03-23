
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Key, Copy, Trash, Plus, Eye, EyeOff } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Mock data for API keys
const initialApiKeys = [
  { id: 'key_01', name: 'Production API Key', key: 'sk_prod_xc7y8z9abcdef1234567890', createdAt: '2023-08-15', lastUsed: '2 minutes ago' },
  { id: 'key_02', name: 'Development API Key', key: 'sk_dev_ab3c4d5efghij6789012345', createdAt: '2023-09-21', lastUsed: '3 days ago' },
  { id: 'key_03', name: 'Testing API Key', key: 'sk_test_kl6m7n8opqrst9012345678', createdAt: '2023-10-05', lastUsed: '1 week ago' },
];

const ApiKeyManager: React.FC = () => {
  const [apiKeys, setApiKeys] = useState(initialApiKeys);
  const [newKeyName, setNewKeyName] = useState('');
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [newlyCreatedKey, setNewlyCreatedKey] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleCreateKey = () => {
    if (!newKeyName.trim()) {
      toast.error("Please enter a name for the API key");
      return;
    }
    
    // Generate a mock API key
    const mockKey = 'sk_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const newKey = {
      id: 'key_' + (apiKeys.length + 1).toString().padStart(2, '0'),
      name: newKeyName,
      key: mockKey,
      createdAt: new Date().toISOString().split('T')[0],
      lastUsed: 'Never'
    };
    
    setApiKeys([...apiKeys, newKey]);
    setNewKeyName('');
    setNewlyCreatedKey(mockKey);
    setOpen(false);
    
    toast.success("API key created successfully", {
      description: "Make sure to copy your API key now. You won't be able to see it again."
    });
  };

  const handleDeleteKey = (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
    toast.success("API key deleted successfully");
  };

  const toggleShowKey = (id: string) => {
    setShowKeys(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyToClipboard = (text: string, name: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(`API key for ${name} copied to clipboard`);
    });
  };

  return (
    <Card className="bg-safesphere-dark-card border-white/10">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center">
              <Key className="h-5 w-5 mr-2 text-safesphere-purple" />
              API Key Management
            </CardTitle>
            <CardDescription>
              Manage API keys for third-party integrations
            </CardDescription>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-safesphere-purple hover:bg-safesphere-purple/80">
                <Plus className="h-4 w-4 mr-1" /> New API Key
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-safesphere-dark-card border-white/10 text-safesphere-white">
              <DialogHeader>
                <DialogTitle>Create New API Key</DialogTitle>
                <DialogDescription className="text-safesphere-white-muted/60">
                  This will generate a new API key for integrations. Save it securely as it won't be shown again.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Key Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="e.g. Production Key"
                    className="col-span-3 bg-safesphere-dark border-white/10"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                <Button 
                  onClick={handleCreateKey} 
                  className="bg-safesphere-purple hover:bg-safesphere-purple/80"
                >
                  Create Key
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {newlyCreatedKey && (
            <div className="bg-safesphere-purple/10 border border-safesphere-purple/20 p-4 rounded-md mb-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-safesphere-white">Your New API Key</h4>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 text-safesphere-white-muted/70"
                  onClick={() => setNewlyCreatedKey(null)}
                >
                  Dismiss
                </Button>
              </div>
              <div className="flex items-center justify-between bg-safesphere-dark p-2 rounded-md">
                <code className="text-xs text-safesphere-white/90 break-all">{newlyCreatedKey}</code>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="ml-2 h-8 text-safesphere-purple"
                  onClick={() => copyToClipboard(newlyCreatedKey, "new key")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-safesphere-white-muted/70 mt-2">
                This key will not be shown again. Please store it securely.
              </p>
            </div>
          )}
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-safesphere-white-muted/60 text-sm">
                  <th className="font-medium pb-2">Name</th>
                  <th className="font-medium pb-2">API Key</th>
                  <th className="font-medium pb-2">Created</th>
                  <th className="font-medium pb-2">Last Used</th>
                  <th className="font-medium pb-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {apiKeys.map((key) => (
                  <tr key={key.id} className="text-sm">
                    <td className="py-3 pr-4">
                      <div>
                        <span className="text-safesphere-white font-medium">{key.name}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center space-x-2">
                        <code className="text-xs bg-safesphere-dark p-1 rounded">
                          {showKeys[key.id] ? key.key : `${key.key.slice(0, 8)}...${key.key.slice(-4)}`}
                        </code>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0"
                          onClick={() => toggleShowKey(key.id)}
                        >
                          {showKeys[key.id] ? (
                            <EyeOff className="h-3.5 w-3.5 text-safesphere-white-muted/70" />
                          ) : (
                            <Eye className="h-3.5 w-3.5 text-safesphere-white-muted/70" />
                          )}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0"
                          onClick={() => copyToClipboard(key.key, key.name)}
                        >
                          <Copy className="h-3.5 w-3.5 text-safesphere-white-muted/70" />
                        </Button>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-safesphere-white-muted/70">{key.createdAt}</td>
                    <td className="py-3 pr-4 text-safesphere-white-muted/70">{key.lastUsed}</td>
                    <td className="py-3 text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-safesphere-red hover:text-safesphere-red/80 hover:bg-red-500/10"
                        onClick={() => handleDeleteKey(key.id)}
                      >
                        <Trash className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiKeyManager;
