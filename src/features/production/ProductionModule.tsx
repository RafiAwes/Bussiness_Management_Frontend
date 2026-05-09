import React from 'react';
import { ProductionOrders } from './ProductionOrders';
import { ProductionTracking } from './ProductionTracking';
import { ProductionDashboard } from './ProductionDashboard';
import { ProductionPlanning } from './ProductionPlanning';
import { WorkerAssignment } from './WorkerAssignment';
import { ProductionAnalytics } from './ProductionAnalytics';
import { ProductionHistory } from './ProductionHistory';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

export const ProductionModule: React.FC<{ activePage: string }> = ({ activePage }) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 capitalize italic tracking-tight">
            Production {activePage.replace('-', ' ')}
          </h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">DressTown Manufacturing & Line Control</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activePage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {activePage === 'dashboard' && <ProductionDashboard />}
          {activePage === 'orders' && <ProductionOrders />}
          {activePage === 'tracking' && <ProductionTracking />}
          {activePage === 'planning' && <ProductionPlanning />}
          {activePage === 'assignments' && <WorkerAssignment />}
          {activePage === 'analytics' && <ProductionAnalytics />}
          {activePage === 'history' && <ProductionHistory />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

