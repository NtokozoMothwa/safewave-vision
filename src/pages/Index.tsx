
import React from 'react';
import { Layout } from '@/components/ui/layout';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import SmartWatchDownload from '@/components/SmartWatchDownload';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import AnimatedTransition from '@/components/AnimatedTransition';
import { ArrowRight, BarChart3, Shield, Activity, LogIn, MapPin } from 'lucide-react';
import VitalsDisplay from '@/components/VitalsDisplay';

const Index: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const isMobile = useIsMobile();
  
  return (
    <Layout>
      <div className="space-y-6 p-6">
        <AnimatedTransition direction="up" className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Welcome to SafeSphere</h1>
              <p className="text-safesphere-white-muted/60 mt-2">
                Your personal safety assistant and health monitoring system
              </p>
            </div>
            {isAuthenticated ? (
              <Button asChild className="bg-safesphere-red hover:bg-safesphere-red-light">
                <Link to="/dashboard">
                  Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <div className="flex gap-3">
                <Button asChild variant="outline" className="border-white/10 hover:bg-safesphere-dark-hover">
                  <Link to="/sign-up">Sign Up</Link>
                </Button>
                <Button asChild className="bg-safesphere-red hover:bg-safesphere-red-light">
                  <Link to="/login">
                    Sign In <LogIn className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </AnimatedTransition>
        
        {/* Quick Status Overview - Only show if authenticated */}
        {isAuthenticated && (
          <Card className="bg-safesphere-dark-card border-white/10">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Activity className="mr-2 h-5 w-5 text-safesphere-red" />
                Quick Health Status
              </CardTitle>
              <CardDescription className="text-safesphere-white-muted/60">
                Your current health metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <VitalsDisplay />
              
              <div className="mt-4 flex justify-end">
                <Button asChild variant="outline" size="sm" className="border-white/10">
                  <Link to="/health-history">
                    View Complete History <BarChart3 className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Product Feature Highlights - Show for all users */}
        <Card className="bg-safesphere-dark-card border-white/10">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Shield className="mr-2 h-5 w-5 text-safesphere-red" />
              SafeSphere Features
            </CardTitle>
            <CardDescription className="text-safesphere-white-muted/60">
              Discover what SafeSphere can do for you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-safesphere-dark-hover border border-white/10">
                <div className="mb-2 h-8 w-8 rounded-lg bg-safesphere-red/20 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-safesphere-red" />
                </div>
                <h3 className="text-sm font-medium mb-1">Health Monitoring</h3>
                <p className="text-xs text-safesphere-white-muted/70">
                  Track vital signs and get real-time health insights
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-safesphere-dark-hover border border-white/10">
                <div className="mb-2 h-8 w-8 rounded-lg bg-safesphere-red/20 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-safesphere-red" />
                </div>
                <h3 className="text-sm font-medium mb-1">Location Tracking</h3>
                <p className="text-xs text-safesphere-white-muted/70">
                  Know where your loved ones are at all times
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-safesphere-dark-hover border border-white/10">
                <div className="mb-2 h-8 w-8 rounded-lg bg-safesphere-red/20 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-safesphere-red" />
                </div>
                <h3 className="text-sm font-medium mb-1">Emergency Response</h3>
                <p className="text-xs text-safesphere-white-muted/70">
                  Quick access to emergency services when needed
                </p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
              <Button asChild className="bg-safesphere-red hover:bg-safesphere-red-light">
                <Link to="/models">
                  Explore All Features <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* SmartWatch Download - Show for all */}
        <SmartWatchDownload />
        
        {/* Figma Design System Integration */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Shield className="mr-2 h-5 w-5 text-safesphere-red" />
            SafeSphere Design System
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-safesphere-dark-card border-white/10">
              <CardHeader>
                <CardTitle className="text-lg">UI Components Library</CardTitle>
                <CardDescription className="text-safesphere-white-muted/60">
                  SafeSphere UI Components and Styles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md overflow-hidden border border-white/10 shadow-lg">
                  <iframe
                    className="w-full h-[400px]"
                    src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FHdMCTFw96pGjF8bWN6kbU9%2FSafeSphere-User-Design-System%3Ftype%3Ddesign%26node-id%3D0%253A1%26t%3DYtaT1ZvDZkm8cPFZ-1"
                    allowFullScreen
                  ></iframe>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-safesphere-dark-card border-white/10">
              <CardHeader>
                <CardTitle className="text-lg">Responsive Design Guidelines</CardTitle>
                <CardDescription className="text-safesphere-white-muted/60">
                  Breakpoints and Device Adaptations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md overflow-hidden border border-white/10 shadow-lg">
                  <iframe
                    className="w-full h-[400px]"
                    src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FHdMCTFw96pGjF8bWN6kbU9%2FSafeSphere-User-Design-System%3Ftype%3Ddesign%26node-id%3D12%253A89%26t%3DYtaT1ZvDZkm8cPFZ-1"
                    allowFullScreen
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
