
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedTransition from '@/components/AnimatedTransition';
import { AtSign, Lock, LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-mesh-pattern flex items-center justify-center p-4">
      <AnimatedTransition className="w-full max-w-md">
        <Card className="bg-safesphere-dark-card border-white/10">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="relative h-12 w-12 overflow-hidden">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-safesphere-red to-safesphere-red-light shadow-glow-sm"></div>
                <div className="absolute inset-[3px] rounded-full bg-safesphere-black flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-safesphere-red"></div>
                </div>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center text-safesphere-white">
              Safe<span className="text-safesphere-red">Sphere</span> Login
            </CardTitle>
            <CardDescription className="text-center text-safesphere-white-muted/60">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-safesphere-white">Email</Label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-safesphere-white-muted/40 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-safesphere-dark-hover border-white/10 text-safesphere-white"
                    required
                  />
                </div>
                <div className="text-xs text-safesphere-info">
                  Demo: user@example.com / admin@example.com
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-safesphere-white">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-safesphere-white-muted/40 h-4 w-4" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-safesphere-dark-hover border-white/10 text-safesphere-white"
                    required
                  />
                </div>
                <div className="text-xs text-safesphere-info">
                  Demo: password123 / admin123
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-safesphere-red hover:bg-safesphere-red-light text-white" 
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : (
                  <>
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-safesphere-white-muted/60 text-center">
              Don't have an account? <Link to="#" className="text-safesphere-red hover:text-safesphere-red-light underline">Sign up</Link>
            </div>
          </CardFooter>
        </Card>
      </AnimatedTransition>
    </div>
  );
};

export default Login;
