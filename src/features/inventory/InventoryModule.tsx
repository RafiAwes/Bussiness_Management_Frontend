import React from 'react';
import { ProductList } from './ProductList';
import { StockTransfer } from './StockTransfer';
import { StockAdjustment } from './StockAdjustment';
import { RestockEntry } from './RestockEntry';
import { InventoryAnalytics } from './InventoryAnalytics';
import { ProductHistory } from './ProductHistory';
import { AddProduct } from './AddProduct';
import { motion, AnimatePresence } from 'motion/react';
import { InventoryDashboard } from './InventoryDashboard';
import { cn } from '../../lib/utils';

export const InventoryModule: React.FC<{ activePage: string }> = ({ activePage }) => {
  const [activeForm, setActiveForm] = React.useState<'none' | 'adjustment' | 'restock' | 'add'>('none');

  // Reset form when changing pages
  React.useEffect(() => {
    setActiveForm('none');
  }, [activePage]);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 capitalize italic tracking-tight">
            Inventory {activePage.replace('-', ' ')}
          </h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">DressTown Warehousing & Logistics</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeForm !== 'none' ? `form-${activeForm}` : activePage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {activeForm === 'adjustment' ? (
            <StockAdjustment onClose={() => setActiveForm('none')} />
          ) : activeForm === 'restock' ? (
            <RestockEntry onClose={() => setActiveForm('none')} />
          ) : activeForm === 'add' ? (
            <AddProduct onClose={() => setActiveForm('none')} />
          ) : (
            <>
              {activePage === 'dashboard' && <InventoryDashboard onRestock={() => setActiveForm('restock')} />}
              {activePage === 'items' && <ProductList onAdd={() => setActiveForm('add')} onAdjust={() => setActiveForm('adjustment')} />}
              {activePage === 'movements' && <StockTransfer />}
              {activePage === 'adjustments' && <StockAdjustment onClose={() => {}} />}
              {activePage === 'restock' && <RestockEntry onClose={() => {}} />}
              {activePage === 'analytics' && <InventoryAnalytics />}
              {activePage === 'history' && <ProductHistory />}
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

