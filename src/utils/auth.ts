// src/utils/auth.ts
export type UserRole = 'admin' | 'responder' | 'guard';
export const getUserRole = (): string => {
  return localStorage.getItem('userRole') || 'guest';
};

// Fake login just for testing
export const setUserRole = (role: string) => {
  localStorage.setItem('userRole', role);
};

export const getUserRole = (): UserRole => {
  // Example: Simulate a user role for now (can later fetch from backend or JWT)
  return localStorage.getItem('userRole') as UserRole || 'guard';
};

export const setUserRole = (role: UserRole) => {
  localStorage.setItem('userRole', role);
};

export const hasPermission = (allowedRoles: UserRole[], role: UserRole): boolean => {
  return allowedRoles.includes(role);
};
