
import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Loading } from '@/components/ui/loading';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { LogIn, ArrowRight, Key, Shield, Bell } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Login = () => {
  const { isAuthenticated, isLoading, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get the intended destination from location state or use default
  const from = (location.state as any)?.from?.pathname || '/dashboard';

  // Simulate loading progress
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          const next = prev + (100 - prev) * 0.1;
          return Math.min(next, 95); // Cap at 95% until actually loaded
        });
      }, 200);
      
      return () => clearInterval(interval);
    } else {
      setLoadingProgress(100);
    }
  }, [isLoading]);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <Loading size="md" text="Loading authentication..." fullscreen progress={loadingProgress} />;
  }

  return (
    <div className="min-h-screen bg-mesh-pattern flex items-center justify-center p-4">
      <AnimatedTransition className="w-full max-w-md">
        <Card className="bg-safesphere-dark-card border-white/10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-safesphere-red/5 to-safesphere-dark-card pointer-events-none" />
          
          <CardHeader className="space-y-1 relative z-10">
            <motion.div 
              className="flex justify-center mb-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <div className="relative h-14 w-14 overflow-hidden">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-safesphere-red to-safesphere-red-light shadow-glow-sm"></div>
                <div className="absolute inset-[3px] rounded-full bg-safesphere-black flex items-center justify-center">
                  <motion.div 
                    className="w-2 h-2 rounded-full bg-safesphere-red"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  ></motion.div>
                </div>
              </div>
            </motion.div>
            
            <CardTitle className="text-2xl font-bold text-center text-safesphere-white">
              Safe<span className="text-safesphere-red">Sphere</span> Login
            </CardTitle>
            <CardDescription className="text-center text-safesphere-white-muted/60">
              Enter your credentials to access your security dashboard
            </CardDescription>
          </CardHeader>
          
          <CardContent className="relative z-10">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  type="email" 
                  placeholder="your@email.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-safesphere-dark-hover border-white/10"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link 
                    to="/forgot-password" 
                    className="text-xs text-safesphere-red hover:text-safesphere-red-light transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input 
                  id="password"
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-safesphere-dark-hover border-white/10"
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-safesphere-red hover:bg-safesphere-red-light"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>Loading...</>
                ) : (
                  <>Sign In <LogIn className="ml-2 h-4 w-4" /></>
                )}
              </Button>
              
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-safesphere-dark-card px-2 text-safesphere-white-muted/40">
                  Or try demo accounts
                </span>
                <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/5"></div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  type="button"
                  variant="outline" 
                  className="border-white/10 hover:bg-safesphere-dark-hover"
                  onClick={() => {
                    setEmail('user@safesphere.com');
                    setPassword('password123');
                  }}
                >
                  User Demo
                </Button>
                <Button 
                  type="button"
                  variant="outline" 
                  className="border-white/10 hover:bg-safesphere-dark-hover"
                  onClick={() => {
                    setEmail('admin@safesphere.com');
                    setPassword('password123');
                  }}
                >
                  Admin Demo
                </Button>
              </div>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-3 pt-0 relative z-10">
            <div className="flex items-center justify-between w-full mt-4">
              <Button variant="link" size="sm" asChild className="text-safesphere-white-muted/70 hover:text-safesphere-white">
                <Link to="/">
                  Back to Home
                </Link>
              </Button>
              
              <Button variant="link" size="sm" asChild className="text-safesphere-white-muted/70 hover:text-safesphere-white">
                <Link to="/sign-up" className="flex items-center">
                  Create Account <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>
            
            <div className="mt-6 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-md bg-safesphere-dark-hover border border-white/5">
                <Shield className="h-4 w-4 mx-auto mb-1 text-safesphere-red" />
                <p className="text-safesphere-white-muted/70">Secure Access</p>
              </div>
              <div className="p-2 rounded-md bg-safesphere-dark-hover border border-white/5">
                <Bell className="h-4 w-4 mx-auto mb-1 text-safesphere-red" />
                <p className="text-safesphere-white-muted/70">Real-time Alerts</p>
              </div>
              <div className="p-2 rounded-md bg-safesphere-dark-hover border border-white/5">
                <Key className="h-4 w-4 mx-auto mb-1 text-safesphere-red" />
                <p className="text-safesphere-white-muted/70">End-to-End Encrypted</p>
              </div>
            </div>
          </CardFooter>
        </Card>
      </AnimatedTransition>
    </div>
  );
};

export default Login;
