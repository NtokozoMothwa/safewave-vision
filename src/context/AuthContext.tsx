
import React, { createContext, useContext } from 'react';
import { 
  useUser, 
  useAuth as useClerkAuth, 
  SignIn, 
  SignUp,
  UserButton,
  SignedIn,
  SignedOut 
} from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
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
  logout: () => void;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoaded, userId } = useClerkAuth();
  const { user: clerkUser } = useUser();
  
  // Map Clerk user to our User interface
  const user: User | null = clerkUser ? {
    id: clerkUser.id,
    name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 'User',
    email: clerkUser.emailAddresses[0]?.emailAddress || '',
    // For demo, determine admin role based on email domain
    role: clerkUser.emailAddresses.some(email => 
      email.emailAddress?.includes('admin')) ? 'admin' : 'user',
    avatarUrl: clerkUser.imageUrl || undefined
  } : null;
  
  const isAuthenticated = !!userId;
  const isAdmin = user?.role === 'admin';

  const logout = () => {
    toast.info('You have been logged out');
  };

  // Return loading state if Clerk isn't loaded yet
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-safesphere-dark">
        <div className="animate-pulse text-safesphere-red font-semibold">
          Loading authentication...
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Protected route component for regular users
export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    toast.error('You must be logged in to access this page');
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Protected route component for admins
export const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  if (!isAuthenticated) {
    toast.error('You must be logged in to access this page');
    return <Navigate to="/login" replace />;
  }
  
  if (!isAdmin) {
    toast.error('You do not have permission to access this page');
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// Export Clerk components for use in the app
export { SignIn, SignUp, UserButton, SignedIn, SignedOut };
