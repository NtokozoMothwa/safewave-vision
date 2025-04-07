
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Define user types and roles
export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  refetchUser: () => void;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  login: async () => false,
  logout: () => {},
  isLoading: false,
  refetchUser: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Check if user is already logged in via localStorage
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('safesphere_user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('safesphere_user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Mock login functionality
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // For demo purposes - authenticate based on email format
      if (email && password.length >= 6) {
        const isAdminUser = email.includes('admin');
        const newUser: User = {
          id: Date.now().toString(),
          name: isAdminUser ? 'Admin User' : 'Standard User',
          email: email,
          role: isAdminUser ? 'admin' : 'user',
          avatarUrl: isAdminUser ? '/admin-avatar.png' : '/user-avatar.png'
        };
        
        setUser(newUser);
        localStorage.setItem('safesphere_user', JSON.stringify(newUser));
        
        toast.success(`Welcome back, ${newUser.name}!`);
        return true;
      } else {
        toast.error('Invalid credentials. Please try again.');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Authentication failed. Please try again later.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('safesphere_user');
    toast.info('You have been logged out');
    navigate('/login');
  };

  const refetchUser = () => {
    // In a real app, this would fetch the latest user data from the API
    const storedUser = localStorage.getItem('safesphere_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isAdmin: user?.role === 'admin', 
      login,
      logout, 
      isLoading,
      refetchUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

// Role-based protection components
export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);
  
  if (isLoading) return <div>Loading authentication...</div>;
  return isAuthenticated ? <>{children}</> : null;
};

export const RequireAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoading && !isAdmin) {
      navigate('/dashboard', { replace: true });
      toast.error('Admin access required');
    }
  }, [isAdmin, isLoading, navigate]);
  
  if (isLoading) return <div>Verifying admin access...</div>;
  return isAdmin ? <>{children}</> : null;
};
