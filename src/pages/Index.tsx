
import { useEffect } from 'react';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
import { toast } from 'sonner';

const Index = () => {
  useEffect(() => {
    // Show environment alert after a delay to avoid overwhelming the user on page load
    const timer = setTimeout(() => {
      toast("Environment Alert", {
        description: "Air quality has decreased in your area.",
        position: "top-right",
      });
    }, 5000); // Increased from 2000ms to 5000ms for better user experience
    
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
