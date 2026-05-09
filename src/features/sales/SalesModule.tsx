import React from 'react';
import { PosInterface } from './PosInterface';
import { SalesHistory } from './SalesHistory';
import { SalesDashboard } from './SalesDashboard';
import { SupplierDirectory } from './SupplierDirectory';
import { FactoryPurchaseOrders } from './FactoryPurchaseOrders';
import { ExternalProduction } from './ExternalProduction';
import { QualityControl } from './QualityControl';
import { CustomerOrders } from './CustomerOrders';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

export const SalesModule: React.FC<{ activePage: string }> = ({ activePage }) => {
  const getPageInfo = () => {
    switch (activePage) {
      case 'dashboard': return { title: 'Sales Insights', subtitle: 'Revenue Intelligence & Performance' };
      case 'pos': return { title: 'Showroom POS', subtitle: 'Direct Retail & Showroom Operations' };
      case 'customer-orders': return { title: 'Customer Orders', subtitle: 'B2B Client Portfolio & Bookings' };
      case 'suppliers': return { title: 'Supplier Directory', subtitle: 'Partner Factory Network & Capacity' };
      case 'factory-pos': return { title: 'Factory Purchase Orders', subtitle: 'Procurement & Supply Chain Pipeline' };
      case 'external-production': return { title: 'External Production', subtitle: 'Remote Factory Tracking & Lead Times' };
      case 'qc': return { title: 'Quality Control', subtitle: 'Audit Compliance & Inspection Integrity' };
      default: return { title: 'Sales & Supply', subtitle: 'DressTown Global Operations' };
    }
  };

  const { title, subtitle } = getPageInfo();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 capitalize italic tracking-tight">
            {title}
          </h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">{subtitle}</p>
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
          {activePage === 'dashboard' && <SalesDashboard />}
          {activePage === 'pos' && <PosInterface />}
          {activePage === 'customer-orders' && <CustomerOrders />}
          {activePage === 'suppliers' && <SupplierDirectory />}
          {activePage === 'factory-pos' && <FactoryPurchaseOrders />}
          {activePage === 'external-production' && <ExternalProduction />}
          {activePage === 'qc' && <QualityControl />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

