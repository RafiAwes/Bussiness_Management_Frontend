import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { ShieldAlert } from 'lucide-react';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  const isAllowed = user && allowedRoles.includes(user.role);

  if (!isAllowed) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-rose-50 border border-rose-100 rounded-2xl text-center">
        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mb-4">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-rose-900 mb-2">Access Denied</h3>
        <p className="text-rose-700 max-w-sm">
          Your current role (<span className="font-bold uppercase">{user?.role}</span>) 
          does not have permission to access this module. 
          Please contact the DressTown system administrator.
        </p>
      </div>
    );
  }

  return <>{children}</>;
};
