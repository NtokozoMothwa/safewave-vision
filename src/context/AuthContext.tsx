
import React from 'react';

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
  refetchUser: () => void;
}

// Create a dummy auth context with a default user
const AuthContext = React.createContext<AuthContextType>({
  user: {
    id: 'default-user',
    name: 'SafeSphere User',
    email: 'user@example.com',
    role: 'admin', // Set to admin to enable all features
    avatarUrl: undefined
  },
  isAuthenticated: true, // Always authenticated
  isAdmin: true, // Always admin
  logout: () => {}, // No-op function
  isLoading: false,
  refetchUser: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Create a dummy implementation with a default user
  const defaultUser: User = {
    id: 'default-user',
    name: 'SafeSphere User',
    email: 'user@example.com',
    role: 'admin', // Set to admin to enable all features
    avatarUrl: undefined
  };

  return (
    <AuthContext.Provider value={{ 
      user: defaultUser, 
      isAuthenticated: true, 
      isAdmin: true, 
      logout: () => {}, 
      isLoading: false,
      refetchUser: () => {}
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};

// Create no-op implementations of the Clerk components to prevent errors
export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

// Export dummy components for compatibility
export const SignIn = () => <div>Sign In (Disabled)</div>;
export const SignUp = () => <div>Sign Up (Disabled)</div>;
export const UserButton = () => <div>User Button (Disabled)</div>;
export const SignedIn = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const SignedOut = ({ children }: { children: React.ReactNode }) => null;
