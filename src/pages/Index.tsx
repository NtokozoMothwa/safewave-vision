
import React, { useEffect, useState } from 'react';
import Layout from '@/components/ui/layout';
import Dashboard from '@/components/Dashboard';
import { useAuth } from '@/context/AuthContext';
import SmartWatchDownload from '@/components/SmartWatchDownload';

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
      </div>
    </Layout>
  );
};

export default Index;
