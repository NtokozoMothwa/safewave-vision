
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
import { Loading } from '@/components/ui/loading';

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
  isLoading: boolean;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoaded, userId, signOut } = useClerkAuth();
  const { user: clerkUser, isLoaded: isUserLoaded } = useUser();
  
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
  const isLoading = !isLoaded || !isUserLoaded;

  const logout = () => {
    signOut && signOut();
    toast.info('You have been logged out');
  };

  // Return loading state if Clerk isn't loaded yet
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-safesphere-dark">
        <Loading size="lg" text="Authenticating..." fullscreen />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, logout, isLoading }}>
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
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <Loading size="md" text="Checking authentication..." fullscreen />;
  }
  
  if (!isAuthenticated) {
    toast.error('You must be logged in to access this page');
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Protected route component for admins
export const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  
  if (isLoading) {
    return <Loading size="md" text="Checking authorization..." fullscreen />;
  }
  
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
