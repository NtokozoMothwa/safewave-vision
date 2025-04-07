
import React from 'react';
import { Layout } from '@/components/ui/layout';
import AnimatedTransition from '@/components/AnimatedTransition';
import SmartWatchDownload from '@/components/SmartWatchDownload';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, User, Shield, Bell, Activity } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Dashboard from '@/components/Dashboard';

const DashboardPage: React.FC = () => {
  const { user, isAdmin } = useAuth();

  const adminFeatures = [
    { 
      title: "System Management", 
      description: "Access advanced system controls and configurations",
      icon: <Shield className="h-8 w-8 text-safesphere-red" />,
      link: "/admin"
    },
    { 
      title: "User Management", 
      description: "Manage user accounts, roles and permissions",
      icon: <User className="h-8 w-8 text-safesphere-info" />,
      link: "/users"
    },
    { 
      title: "API Documentation", 
      description: "View and test available API endpoints",
      icon: <Activity className="h-8 w-8 text-safesphere-purple" />,
      link: "/api-docs"
    }
  ];

  const userFeatures = [
    { 
      title: "Health Monitoring", 
      description: "Track your vital signs and health metrics",
      icon: <Activity className="h-8 w-8 text-safesphere-info" />,
      link: "/health-history"
    },
    { 
      title: "Location Safety", 
      description: "Set up safe zones and geofencing alerts",
      icon: <Bell className="h-8 w-8 text-safesphere-purple" />,
      link: "/geofencing"
    },
    { 
      title: "AI Models", 
      description: "Configure your AI detection preferences",
      icon: <Shield className="h-8 w-8 text-safesphere-warning" />,
      link: "/models"
    }
  ];

  const features = isAdmin ? adminFeatures : userFeatures;

  return (
    <Layout>
      <div className="space-y-6 p-6">
        <AnimatedTransition direction="up" className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
              <p className="text-safesphere-white-muted/60 mt-2">
                {isAdmin 
                  ? "Your administration dashboard is ready" 
                  : "Your personal safety dashboard is ready"}
              </p>
            </div>
            <div className="flex gap-3">
              <Button asChild variant="outline" className="border-white/10 hover:bg-safesphere-dark-hover">
                <Link to="/settings">Settings</Link>
              </Button>
              <Button asChild className="bg-safesphere-red hover:bg-safesphere-red-light">
                <Link to={isAdmin ? "/admin" : "/health-history"}>
                  {isAdmin ? "Admin Panel" : "Health Report"} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </AnimatedTransition>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-safesphere-dark-card border-white/10 hover:bg-safesphere-dark-hover/50 transition-colors">
              <CardHeader className="pb-2">
                <div className="mb-2">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription className="text-safesphere-white-muted/60">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full justify-between hover:bg-safesphere-dark-hover">
                  <Link to={feature.link}>
                    Access <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <Dashboard />
        
        <div className="mt-6">
          <SmartWatchDownload />
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
