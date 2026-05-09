import React from 'react';
import { motion } from 'motion/react';
import { 
  Package, 
  Scissors, 
  Users, 
  Wallet, 
  ShoppingCart, 
  LogOut,
  LayoutDashboard,
  ChevronLeft,
  Menu,
  ChevronRight,
  Circle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { MODULE_CONFIGS } from '../../constants';
import { cn } from '../../lib/utils';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  activeModule: string;
  setActiveModule: (module: string) => void;
  activePage: string;
  setActivePage: (page: string) => void;
}

const iconMap: Record<string, any> = {
  inventory: Package,
  production: Scissors,
  sales: ShoppingCart,
  crm: Users,
  accounts: Wallet,
  hrm: Users,
};

export const Sidebar: React.FC<SidebarProps> = ({ 
  isCollapsed, 
  setIsCollapsed, 
  activeModule, 
  setActiveModule,
  activePage,
  setActivePage
}) => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const filteredModules = Object.entries(MODULE_CONFIGS).filter(([_, config]) => 
    config.roles.includes(user.role)
  );

  const currentModuleConfig = (MODULE_CONFIGS as any)[activeModule];

  return (
    <motion.div 
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="bg-slate-900 h-screen text-slate-400 flex flex-col relative transition-all duration-300 ease-in-out border-r border-slate-800 shadow-2xl z-50 font-sans"
    >
      {/* Sidebar Toggle */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 bg-accent text-white rounded-full p-1 shadow-lg hover:scale-110 transition-transform z-50 border border-slate-800"
      >
        {isCollapsed ? <Menu size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Brand Logo */}
      <div className="flex items-center gap-3 px-6 py-8">
        <div className="flex-shrink-0 w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-4 ring-indigo-500/10">
          <Scissors className="text-white w-6 h-6" />
        </div>
        {!isCollapsed && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <span className="text-xl font-black text-white tracking-tighter uppercase leading-none">DressTown</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Enterprise ERP</span>
          </motion.div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-8 scrollbar-hide py-4">
        {/* Module Switcher (Top Level) */}
        <section>
          {!isCollapsed && <h3 className="px-3 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Core Modules</h3>}
          <div className="space-y-1">
            <NavItem 
              icon={<LayoutDashboard className="w-5 h-5" />} 
              label="Dashboard Overview" 
              collapsed={isCollapsed} 
              active={activeModule === 'dashboard'}
              onClick={() => {
                setActiveModule('dashboard');
                setActivePage('main');
              }}
            />
            
            {filteredModules.map(([key, config]) => {
              const Icon = iconMap[key];
              const isActive = activeModule === key;
              return (
                <NavItem 
                  key={key} 
                  icon={<Icon className="w-5 h-5" />} 
                  label={config.label} 
                  collapsed={isCollapsed} 
                  active={isActive}
                  onClick={() => {
                    setActiveModule(key);
                    setActivePage(config.subPages[0].id);
                  }}
                />
              );
            })}
          </div>
        </section>

        {/* Current Module Sub-Navigation */}
        {!isCollapsed && activeModule !== 'dashboard' && currentModuleConfig && (
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="px-3 py-3 mb-2 bg-slate-800/30 rounded-xl border border-slate-700/50">
              <div className="flex items-center justify-between text-[10px] font-black text-accent uppercase tracking-widest ">
                <span>{currentModuleConfig.label} Management</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>
            
            <div className="space-y-1 pl-2 border-l border-slate-800 ml-3 mt-4">
              {currentModuleConfig.subPages.map((page: any) => (
                <button
                  key={page.id}
                  onClick={() => setActivePage(page.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold transition-all group",
                    activePage === page.id 
                      ? "text-white bg-slate-800" 
                      : "text-slate-500 hover:text-slate-300 hover:translate-x-1"
                  )}
                >
                  <Circle className={cn("w-1.5 h-1.5", activePage === page.id ? "fill-accent text-accent" : "text-slate-700 group-hover:text-slate-500")} />
                  {page.label}
                </button>
              ))}
            </div>
          </motion.section>
        )}
      </div>

      {/* User Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <button 
          onClick={logout}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-rose-400 hover:bg-rose-950/30 hover:text-rose-300 transition-all w-full font-bold text-xs uppercase tracking-widest",
            isCollapsed && "justify-center"
          )}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </motion.div>
  );
};

const NavItem: React.FC<{ 
  icon: React.ReactNode; 
  label: string; 
  collapsed: boolean;
  active?: boolean;
  onClick: () => void;
}> = ({ icon, label, collapsed, active, onClick }) => (
  <button 
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative w-full",
      active 
        ? "bg-accent text-white shadow-lg shadow-indigo-500/20" 
        : "hover:bg-slate-800/50 hover:text-white text-slate-400 font-medium",
      collapsed && "justify-center"
    )}
  >
    <div className={cn("flex-shrink-0 transition-transform group-hover:scale-110", active ? "text-white" : "text-inherit")}>
      {icon}
    </div>
    {!collapsed && (
      <span className="font-bold text-xs uppercase tracking-widest truncate">{label}</span>
    )}
    {collapsed && (
      <div className="absolute left-full ml-4 px-3 py-2 bg-slate-800 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all translate-x-[-10px] group-hover:translate-x-0 z-[100] border border-slate-700 shadow-xl">
        {label}
      </div>
    )}
  </button>
);
