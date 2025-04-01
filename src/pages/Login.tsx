
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignIn, useAuth } from '@/context/AuthContext';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Login = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

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
            <SignIn redirectUrl="/" routing="path" path="/login" />
          </CardContent>
        </Card>
      </AnimatedTransition>
    </div>
  );
};

export default Login;
