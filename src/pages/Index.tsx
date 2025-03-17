
import { useEffect } from 'react';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
import { toast } from 'sonner';

const Index = () => {
  useEffect(() => {
    // Demo toast for prototype
    const timer = setTimeout(() => {
      toast("Environment Alert", {
        description: "Air quality has decreased in your area.",
        position: "top-right",
      });
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen bg-mesh-pattern">
      <Header />
      <div className="max-w-7xl mx-auto px-4 pt-20 pb-10">
        <Dashboard />
      </div>
    </div>
  );
};

export default Index;
