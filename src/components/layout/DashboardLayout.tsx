import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { useAuth } from '../../context/AuthContext';

export const DashboardLayout: React.FC<{ 
  children: React.ReactNode,
  activeModule: string;
  setActiveModule: (module: string) => void;
  activePage: string;
  setActivePage: (page: string) => void;
}> = ({ children, activeModule, setActiveModule, activePage, setActivePage }) => {
  const { isAuthenticated } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!isAuthenticated) return <>{children}</>;

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <Sidebar 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar />
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-10">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
