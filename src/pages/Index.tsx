
import React, { useEffect } from 'react';
import { Layout } from '@/components/ui/layout';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import SmartWatchDownload from '@/components/SmartWatchDownload';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import AnimatedTransition from '@/components/AnimatedTransition';
import { ArrowRight, BarChart3, Shield, Activity, LogIn, MapPin, User, Check, Heart } from 'lucide-react';
import VitalsDisplay from '@/components/VitalsDisplay';
import { motion } from 'framer-motion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const Index: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const isMobile = useIsMobile();
  
  // Heartbeat animation
  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  useEffect(() => {
    // ScrollReveal-like functionality for elements
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <Layout>
      <div className="space-y-6 pt-20 pb-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8 bg-safesphere-darker rounded-xl mx-4 md:mx-6">
          <div className="absolute inset-0 bg-safesphere-dark">
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:40px]" />
          </div>
          <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-safesphere-red/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-safesphere-red/10 blur-3xl" />
          
          <div className="relative mx-auto max-w-2xl">
            <AnimatedTransition direction="up" className="mb-8 text-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="mx-auto mb-6"
              >
                <div className="relative h-20 w-20 mx-auto">
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-gradient-to-tr from-safesphere-red to-safesphere-red-light opacity-70"
                    variants={pulseVariants}
                    animate="pulse"
                  />
                  <div className="absolute inset-[4px] rounded-full bg-safesphere-black flex items-center justify-center">
                    <motion.div 
                      className="w-3 h-3 rounded-full bg-safesphere-red"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    />
                  </div>
                </div>
              </motion.div>
              
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-4">
                Safe<span className="text-safesphere-red">Sphere</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-safesphere-white-muted/80">
                Your personal safety assistant and health monitoring system powered by advanced technology
              </p>
              
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                {isAuthenticated ? (
                  <Button asChild className="bg-safesphere-red hover:bg-safesphere-red-light text-white px-6 py-6">
                    <Link to="/dashboard" className="flex items-center">
                      Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button asChild className="bg-safesphere-red hover:bg-safesphere-red-light text-white px-6 py-6">
                      <Link to="/sign-up" className="flex items-center">
                        Get Started <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="border-white/20 hover:bg-safesphere-dark-hover">
                      <Link to="/login" className="flex items-center">
                        <LogIn className="mr-2 h-4 w-4" /> Sign In
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </AnimatedTransition>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="reveal-on-scroll opacity-0 px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-safesphere-dark-card border border-white/10 rounded-xl p-4 text-center flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-safesphere-red/20 flex items-center justify-center mb-3">
                  <User className="h-5 w-5 text-safesphere-red" />
                </div>
                <div className="text-2xl font-bold text-white">10K+</div>
                <div className="text-xs text-safesphere-white-muted/60">Active Users</div>
              </div>
              
              <div className="bg-safesphere-dark-card border border-white/10 rounded-xl p-4 text-center flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-safesphere-red/20 flex items-center justify-center mb-3">
                  <Shield className="h-5 w-5 text-safesphere-red" />
                </div>
                <div className="text-2xl font-bold text-white">99.9%</div>
                <div className="text-xs text-safesphere-white-muted/60">Security Rating</div>
              </div>
              
              <div className="bg-safesphere-dark-card border border-white/10 rounded-xl p-4 text-center flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-safesphere-red/20 flex items-center justify-center mb-3">
                  <Heart className="h-5 w-5 text-safesphere-red" />
                </div>
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-xs text-safesphere-white-muted/60">Monitoring</div>
              </div>
              
              <div className="bg-safesphere-dark-card border border-white/10 rounded-xl p-4 text-center flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-safesphere-red/20 flex items-center justify-center mb-3">
                  <Check className="h-5 w-5 text-safesphere-red" />
                </div>
                <div className="text-2xl font-bold text-white">100+</div>
                <div className="text-xs text-safesphere-white-muted/60">Health Metrics</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Quick Status Overview - Only show if authenticated */}
        {isAuthenticated && (
          <section className="px-6">
            <Card className="bg-safesphere-dark-card border-white/10 overflow-hidden reveal-on-scroll opacity-0">
              <div className="absolute inset-0 bg-gradient-to-br from-safesphere-red/5 to-transparent pointer-events-none" />
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
          </section>
        )}
        
        {/* Features Section */}
        <section className="px-6 py-10 reveal-on-scroll opacity-0">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold mb-2 flex items-center justify-center">
                <Shield className="mr-2 h-6 w-6 text-safesphere-red" />
                SafeSphere Features
              </h2>
              <p className="text-safesphere-white-muted/60 max-w-lg mx-auto">
                Comprehensive security and health monitoring for your peace of mind
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-safesphere-dark-card border-white/10 overflow-hidden h-full">
                <div className="absolute top-0 right-0 h-20 w-20 rounded-bl-full bg-gradient-to-bl from-safesphere-red/10 to-transparent" />
                <CardHeader>
                  <div className="h-12 w-12 rounded-xl bg-safesphere-red/20 flex items-center justify-center mb-4">
                    <Activity className="h-6 w-6 text-safesphere-red" />
                  </div>
                  <CardTitle>Health Monitoring</CardTitle>
                  <CardDescription>Track vital signs in real-time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm text-safesphere-white-muted/80">
                      <Check className="mr-2 h-4 w-4 text-safesphere-red" /> Heart rate tracking
                    </li>
                    <li className="flex items-center text-sm text-safesphere-white-muted/80">
                      <Check className="mr-2 h-4 w-4 text-safesphere-red" /> Blood pressure monitoring
                    </li>
                    <li className="flex items-center text-sm text-safesphere-white-muted/80">
                      <Check className="mr-2 h-4 w-4 text-safesphere-red" /> Sleep quality analysis
                    </li>
                    <li className="flex items-center text-sm text-safesphere-white-muted/80">
                      <Check className="mr-2 h-4 w-4 text-safesphere-red" /> Stress level detection
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" size="sm" className="border-white/10 w-full">
                    <Link to={isAuthenticated ? "/health-history" : "/sign-up"}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-safesphere-dark-card border-white/10 overflow-hidden h-full">
                <div className="absolute top-0 right-0 h-20 w-20 rounded-bl-full bg-gradient-to-bl from-safesphere-red/10 to-transparent" />
                <CardHeader>
                  <div className="h-12 w-12 rounded-xl bg-safesphere-red/20 flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-safesphere-red" />
                  </div>
                  <CardTitle>Location Security</CardTitle>
                  <CardDescription>Know where your loved ones are</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm text-safesphere-white-muted/80">
                      <Check className="mr-2 h-4 w-4 text-safesphere-red" /> Real-time location tracking
                    </li>
                    <li className="flex items-center text-sm text-safesphere-white-muted/80">
                      <Check className="mr-2 h-4 w-4 text-safesphere-red" /> Geofencing alerts
                    </li>
                    <li className="flex items-center text-sm text-safesphere-white-muted/80">
                      <Check className="mr-2 h-4 w-4 text-safesphere-red" /> Safe route suggestions
                    </li>
                    <li className="flex items-center text-sm text-safesphere-white-muted/80">
                      <Check className="mr-2 h-4 w-4 text-safesphere-red" /> Location history
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" size="sm" className="border-white/10 w-full">
                    <Link to={isAuthenticated ? "/geofencing" : "/sign-up"}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-safesphere-dark-card border-white/10 overflow-hidden h-full">
                <div className="absolute top-0 right-0 h-20 w-20 rounded-bl-full bg-gradient-to-bl from-safesphere-red/10 to-transparent" />
                <CardHeader>
                  <div className="h-12 w-12 rounded-xl bg-safesphere-red/20 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-safesphere-red" />
                  </div>
                  <CardTitle>Emergency Response</CardTitle>
                  <CardDescription>Fast access to help when needed</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm text-safesphere-white-muted/80">
                      <Check className="mr-2 h-4 w-4 text-safesphere-red" /> One-tap emergency calls
                    </li>
                    <li className="flex items-center text-sm text-safesphere-white-muted/80">
                      <Check className="mr-2 h-4 w-4 text-safesphere-red" /> Automatic fall detection
                    </li>
                    <li className="flex items-center text-sm text-safesphere-white-muted/80">
                      <Check className="mr-2 h-4 w-4 text-safesphere-red" /> Emergency contact alerts
                    </li>
                    <li className="flex items-center text-sm text-safesphere-white-muted/80">
                      <Check className="mr-2 h-4 w-4 text-safesphere-red" /> Medical info sharing
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" size="sm" className="border-white/10 w-full">
                    <Link to={isAuthenticated ? "/dashboard" : "/sign-up"}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="mt-10 text-center">
              <Button asChild className="bg-safesphere-red hover:bg-safesphere-red-light text-white px-6">
                <Link to="/models">
                  Explore All Features <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="px-6 py-10 reveal-on-scroll opacity-0">
          <Alert className="bg-safesphere-dark-card border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-safesphere-red/10 to-transparent pointer-events-none" />
            <div className="relative">
              <AlertTitle className="text-xl font-bold mb-2 text-white">
                Take control of your safety today
              </AlertTitle>
              <AlertDescription className="text-safesphere-white-muted/80 mb-4">
                Join thousands of users who trust SafeSphere for their personal safety and health monitoring needs.
              </AlertDescription>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Button asChild className="bg-safesphere-red hover:bg-safesphere-red-light text-white">
                  <Link to={isAuthenticated ? "/dashboard" : "/sign-up"}>
                    {isAuthenticated ? "Go to Dashboard" : "Create Free Account"}
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-white/10 hover:bg-safesphere-dark-hover">
                  <Link to="/models">
                    View Plans <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Alert>
        </section>
        
        {/* SmartWatch Download */}
        <section className="px-6 reveal-on-scroll opacity-0">
          <SmartWatchDownload />
        </section>
        
        {/* Design System Preview */}
        <section className="px-6 py-10 reveal-on-scroll opacity-0">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold mb-2">SafeSphere Design System</h2>
              <p className="text-safesphere-white-muted/60">
                Explore our comprehensive design system built for safety and security applications
              </p>
            </div>
            
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
        </section>
      </div>
    </Layout>
  );
};

export default Index;
