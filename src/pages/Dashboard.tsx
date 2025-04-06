
import React from 'react';
import { Layout } from '@/components/ui/layout';
import AnimatedTransition from '@/components/AnimatedTransition';
import Dashboard from '@/components/Dashboard';
import SmartWatchDownload from '@/components/SmartWatchDownload';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const DashboardPage: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6 p-6">
        <AnimatedTransition direction="up" className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Welcome to SafeSphere</h1>
              <p className="text-safesphere-white-muted/60 mt-2">
                Your personal safety dashboard is ready
              </p>
            </div>
            <div className="flex gap-3">
              <Button asChild variant="outline" className="border-white/10 hover:bg-safesphere-dark-hover">
                <Link to="/settings">View Settings</Link>
              </Button>
              <Button asChild className="bg-safesphere-red hover:bg-safesphere-red-light">
                <Link to="/health-history">
                  Health Report <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </AnimatedTransition>
        
        <Dashboard />
        
        <div className="mt-6">
          <SmartWatchDownload />
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
