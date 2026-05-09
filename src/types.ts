export enum UserRole {
  ADMIN = 'admin',
  ACCOUNTS = 'accounts',
  INVENTORY = 'inventory',
  PRODUCTION = 'production',
  SALES = 'sales',
  HR = 'hr',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
