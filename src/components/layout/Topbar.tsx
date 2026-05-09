import React from 'react';
import { 
  Bell, 
  Search, 
  User as UserIcon,
  ChevronDown,
  Settings,
  HelpCircle,
  LogOut,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

export const Topbar: React.FC = () => {
  const { user, login, logout } = useAuth();

  if (!user) return null;

  const roles = Object.values(UserRole);

  return (
    <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 sticky top-0 z-40 shadow-sm">
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search records, orders, or employees..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Role Switcher (For Dev/Demo Purposes) */}
        <div className="group relative">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Switch Role</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          
          <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
            <div className="p-2 border-b border-slate-100">
              <span className="px-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Switch Identity</span>
            </div>
            <div className="p-1">
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => login(role)}
                  className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                    user.role === role 
                      ? 'bg-accent/10 text-accent font-medium' 
                      : 'hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-px h-6 bg-slate-200 mx-1" />

        <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="group relative">
          <button className="flex items-center gap-3 p-1 pl-3 hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-100">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold text-slate-900 leading-tight">{user.name}</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{user.role}</div>
            </div>
            <div className="w-9 h-9 bg-accent rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
              {user.name.charAt(0)}
            </div>
          </button>

          <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
            <div className="p-2 space-y-1">
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                <UserIcon className="w-4 h-4" />
                <span>My Profile</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                <Settings className="w-4 h-4" />
                <span>Account Settings</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                <HelpCircle className="w-4 h-4" />
                <span>Help Center</span>
              </button>
              <div className="h-px bg-slate-100 my-1" />
              <button 
                onClick={logout}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
