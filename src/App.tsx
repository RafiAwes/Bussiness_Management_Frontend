/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, Suspense, lazy } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { StoreProvider } from './context/StoreContext';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { RoleGuard } from './components/auth/RoleGuard';
import { UserRole } from './types';
import { MODULE_CONFIGS } from './constants';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { motion, AnimatePresence } from 'motion/react';
import { DashboardSkeleton } from './components/ui/Skeleton';

// Lazy load feature modules
const InventoryModule = lazy(() => import('./features/inventory/InventoryModule').then(m => ({ default: m.InventoryModule })));
const ProductionModule = lazy(() => import('./features/production/ProductionModule').then(m => ({ default: m.ProductionModule })));
const SalesModule = lazy(() => import('./features/sales/SalesModule').then(m => ({ default: m.SalesModule })));
const CrmModule = lazy(() => import('./features/crm/CrmModule').then(m => ({ default: m.CrmModule })));
const AccountsModule = lazy(() => import('./features/accounts/AccountsModule').then(m => ({ default: m.AccountsModule })));
const HrmModule = lazy(() => import('./features/hrm/HrmModule').then(m => ({ default: m.HrmModule })));
import { 
  Scissors, 
  ShieldCheck, 
  Factory, 
  Users, 
  DollarSign, 
  Package, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';

const LoginPage = () => {
  const { login } = useAuth();

  const roleOptions = [
    { role: UserRole.ADMIN, icon: ShieldCheck, color: 'bg-indigo-600' },
    { role: UserRole.PRODUCTION, icon: Factory, color: 'bg-emerald-600' },
    { role: UserRole.HR, icon: Users, color: 'bg-blue-600' },
    { role: UserRole.ACCOUNTS, icon: DollarSign, color: 'bg-amber-600' },
    { role: UserRole.INVENTORY, icon: Package, color: 'bg-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden p-10 animate-in fade-in zoom-in duration-700">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-900 rounded-[2rem] mb-6 shadow-xl shadow-slate-900/20">
            <Scissors className="text-white w-10 h-10" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase">DressTown ERP</h1>
          <p className="text-subtitle mt-2 italic">Standardized Enterprise OS v2.0</p>
        </div>

        <div className="grid gap-4">
          {roleOptions.map(({ role, icon: Icon, color }) => (
            <button
              key={role}
              onClick={() => login(role)}
              className="group flex items-center gap-4 w-full p-5 rounded-2xl border border-slate-100 hover:border-accent hover:bg-slate-50 transition-all text-left shadow-sm hover:shadow-md"
              id={`login-role-${role}`}
            >
              <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="font-black text-slate-900 capitalize text-sm italic tracking-tight">{role} Command</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Authorized Entry Only</div>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-accent group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
        
        <div className="mt-10 pt-8 border-t border-slate-50 text-center">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Build Code: DT-OS-2024-X</p>
        </div>
      </div>
    </div>
  );
};

// Generic Module Placeholder
const ModulePage = ({ name, description }: { name: string, description: string }) => (
  <div className="page-container space-y-8">
    <div className="card-premium">
      <h2 className="text-title italic uppercase mb-2">{name} Command Center</h2>
      <p className="text-subtitle italic">{description}</p>
    </div>
    
    <div className="grid-main">
      {[1, 2, 3].map(i => (
        <div key={i} className="h-48 bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-300 gap-4 group hover:border-accent hover:bg-white transition-all cursor-wait">
          <Package className="w-10 h-10 opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all" />
          <div className="text-center">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] block">Data Implementation</span>
            <span className="text-[9px] font-bold text-slate-400 italic">Stage: Deployment Pending</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AppContent = () => {
  const { isAuthenticated, user } = useAuth();
  
  // Professional navigation state
  const [activeModule, setActiveModule] = useState<string>('dashboard');
  const [activePage, setActivePage] = useState<string>('main');

  // Automatic role-based redirection
  React.useEffect(() => {
    if (user && activeModule !== 'dashboard') {
      const config = (MODULE_CONFIGS as any)[activeModule];
      if (config && !config.roles.includes(user.role)) {
        setActiveModule('dashboard');
        setActivePage('main');
      }
    }
  }, [user?.role, activeModule]);

  if (!isAuthenticated) return <LoginPage />;

  return (
    <DashboardLayout 
      activeModule={activeModule} 
      setActiveModule={setActiveModule}
      activePage={activePage}
      setActivePage={setActivePage}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeModule}-${activePage}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <Suspense fallback={<DashboardSkeleton />}>
            {activeModule === 'dashboard' && <DashboardOverview />}
            
            {activeModule === 'inventory' && (
              <RoleGuard allowedRoles={MODULE_CONFIGS.inventory.roles}>
                <InventoryModule activePage={activePage} />
              </RoleGuard>
            )}

            {activeModule === 'production' && (
              <RoleGuard allowedRoles={MODULE_CONFIGS.production.roles}>
                <ProductionModule activePage={activePage} />
              </RoleGuard>
            )}

            {activeModule === 'sales' && (
              <RoleGuard allowedRoles={MODULE_CONFIGS.sales.roles}>
                <SalesModule activePage={activePage} />
              </RoleGuard>
            )}

            {activeModule === 'crm' && (
              <RoleGuard allowedRoles={MODULE_CONFIGS.crm.roles}>
                <CrmModule activePage={activePage} />
              </RoleGuard>
            )}

            {activeModule === 'accounts' && (
              <RoleGuard allowedRoles={MODULE_CONFIGS.accounts.roles}>
                <AccountsModule activePage={activePage} />
              </RoleGuard>
            )}

            {activeModule === 'hrm' && (
              <RoleGuard allowedRoles={MODULE_CONFIGS.hrm.roles}>
                <HrmModule activePage={activePage} />
              </RoleGuard>
            )}
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <AppContent />
      </StoreProvider>
    </AuthProvider>
  );
}

