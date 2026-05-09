import React from 'react';
import { FinanceDashboard } from './FinanceDashboard';
import { InvoiceList } from './InvoiceList';
import { Ledger } from './Ledger';
import { ExpenseList } from './ExpenseList';
import { AddExpense } from './AddExpense';
import { CreateInvoice } from './CreateInvoice';
import { Payments } from './Payments';
import { ProfitLoss } from './ProfitLoss';
import { motion, AnimatePresence } from 'motion/react';

export const AccountsModule: React.FC<{ activePage: string }> = ({ activePage }) => {
  const [activeForm, setActiveForm] = React.useState<'none' | 'expense' | 'invoice'>('none');

  // Reset form when changing pages
  React.useEffect(() => {
    setActiveForm('none');
  }, [activePage]);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 capitalize italic tracking-tight">
            Accounts {activePage.replace('-', ' ')}
          </h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">DressTown Fiscal Control & Ledger</p>
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
          {activeForm === 'expense' ? (
            <AddExpense onClose={() => setActiveForm('none')} />
          ) : activeForm === 'invoice' ? (
            <CreateInvoice onClose={() => setActiveForm('none')} />
          ) : (
            <>
              {activePage === 'dashboard' && <FinanceDashboard />}
              {activePage === 'invoices' && <InvoiceList onCreateInvoice={() => setActiveForm('invoice')} />}
              {activePage === 'expenses' && <ExpenseList onAddExpense={() => setActiveForm('expense')} />}
              {activePage === 'payments' && <Payments />}
              {activePage === 'profit-loss' && <ProfitLoss />}
              {activePage === 'ledger' && <Ledger />}
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
