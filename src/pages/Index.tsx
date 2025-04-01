
import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/ui/layout';
import Dashboard from '@/components/Dashboard';
import { useAuth } from '@/context/AuthContext';
import SmartWatchDownload from '@/components/SmartWatchDownload';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index: React.FC = () => {
  const { user } = useAuth();
  const [showSmartWatchDownload, setShowSmartWatchDownload] = useState(false);
  
  useEffect(() => {
    // Check if we should show the smartwatch component
    const hasSeenSmartWatchPromo = localStorage.getItem('safesphere_seen_smartwatch_promo');
    if (!hasSeenSmartWatchPromo) {
      // Show after a small delay for better UX
      const timer = setTimeout(() => {
        setShowSmartWatchDownload(true);
        localStorage.setItem('safesphere_seen_smartwatch_promo', 'true');
      }, 1500);
      return () => clearTimeout(timer);
    }
    
    // Still show sometimes for demo purposes
    if (Math.random() > 0.5) {
      setShowSmartWatchDownload(true);
    }
  }, []);
  
  return (
    <Layout>
      <div className="space-y-6 p-6">
        <Dashboard />
        
        {showSmartWatchDownload && (
          <SmartWatchDownload />
        )}
        
        {/* Figma Design Integration */}
        <Card className="bg-safesphere-dark-card border-white/10 mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Design System</CardTitle>
            <CardDescription className="text-safesphere-white-muted/60">
              SafeSphere UI Components and Styles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md overflow-hidden border border-white/10">
              <iframe
                className="w-full h-[500px]"
                src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FHdMCTFw96pGjF8bWN6kbU9%2FSafeSphere-User-Design-System%3Ftype%3Ddesign%26node-id%3D0%253A1%26t%3DYtaT1ZvDZkm8cPFZ-1"
                allowFullScreen
              ></iframe>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Index;
