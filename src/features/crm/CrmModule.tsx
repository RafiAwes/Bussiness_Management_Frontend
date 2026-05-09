import React, { useState, useEffect } from 'react';
import { CustomerList } from './CustomerList';
import { CustomerProfile } from './CustomerProfile';
import { CrmDashboard } from './CrmDashboard';
import { LeadList } from './LeadList';
import { SalesPipeline } from './SalesPipeline';
import { FollowUps } from './FollowUps';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { LayoutDashboard, Users, Target, Kanban, CheckSquare } from 'lucide-react';

type CrmView = 'dashboard' | 'list' | 'leads' | 'pipeline' | 'tasks' | 'profile';

export const CrmModule: React.FC<{ activePage: string }> = ({ activePage }) => {
  const [currentView, setCurrentView] = useState<CrmView>(activePage as CrmView || 'dashboard');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  // Sync state when sidebar link is clicked
  useEffect(() => {
    if (activePage) {
      setCurrentView(activePage as CrmView);
    }
  }, [activePage]);

  const handleViewProfile = (id: string) => {
    setSelectedCustomerId(id);
    setCurrentView('profile');
  };

  const navItems = [
    { id: 'dashboard', label: 'CRM Insights', icon: LayoutDashboard },
    { id: 'list', label: 'Global Accounts', icon: Users },
    { id: 'leads', label: 'Opportunity Hub', icon: Target },
    { id: 'pipeline', label: 'Sales Pipeline', icon: Kanban },
    { id: 'tasks', label: 'Follow-ups', icon: CheckSquare },
  ];

  return (
    <div className="space-y-8 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-slate-900 pb-8 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black italic text-xl shadow-lg">DR</div>
            <h2 className="text-3xl font-black text-slate-900 capitalize italic tracking-tighter">
              {currentView === 'profile' ? 'Relationship Deep-Dive' : 'Client Relations Engine'}
            </h2>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] pl-1">DressTown High-Velocity CRM Terminal</p>
        </div>

        {currentView !== 'profile' && (
          <div className="flex bg-slate-100 p-1.5 rounded-2xl shadow-inner gap-1">
             {navItems.map((item) => (
               <button 
                key={item.id}
                onClick={() => setCurrentView(item.id as CrmView)}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                  currentView === item.id 
                    ? "bg-slate-900 text-white shadow-xl scale-105" 
                    : "text-slate-400 hover:text-slate-600 hover:bg-white/50"
                )}
               >
                 <item.icon className="w-4 h-4" />
                 <span className="hidden lg:inline">{item.label}</span>
               </button>
             ))}
          </div>
        )}

        {currentView === 'profile' && (
          <button 
            onClick={() => setCurrentView('list')}
            className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl"
          >
            <Users className="w-4 h-4" />
            Return to Directory
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="pb-20"
        >
          {currentView === 'dashboard' && <CrmDashboard />}
          {currentView === 'list' && <CustomerList onViewProfile={handleViewProfile} />}
          {currentView === 'leads' && <LeadList />}
          {currentView === 'pipeline' && <SalesPipeline />}
          {currentView === 'tasks' && <FollowUps />}
          {currentView === 'profile' && (
            <CustomerProfile 
              customerId={selectedCustomerId || 'CUST-001'} 
              onBack={() => setCurrentView('list')} 
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

