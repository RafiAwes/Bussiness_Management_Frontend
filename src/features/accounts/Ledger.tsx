import React from 'react';
import { Search, Filter, ArrowDownLeft, ArrowUpRight, ListFilter, Download } from 'lucide-react';
import { cn } from '../../lib/utils';

const TRANSACTIONS = [
  { id: 'T-9901', date: '2024-05-10', desc: 'Zara Invoice INV-2024-001 Payment', type: 'Credit', amount: 45000, category: 'Sales' },
  { id: 'T-9902', date: '2024-05-11', desc: 'Textile Pro Bulk Fabric Purchase', type: 'Debit', amount: 12500, category: 'Expense' },
  { id: 'T-9903', date: '2024-05-12', desc: 'Production Team Salary Disbursement', type: 'Debit', amount: 45000, category: 'Payroll' },
  { id: 'T-9904', date: '2024-05-12', desc: 'Petty Cash - Office Supplies', type: 'Debit', amount: 350, category: 'Expense' },
  { id: 'T-9905', date: '2024-05-13', desc: 'Refund from Logistics Error', type: 'Credit', amount: 200, category: 'Adjustment' },
  { id: 'T-9906', date: '2024-05-14', desc: 'Gap Inc. Invoice Partial Payment', type: 'Credit', amount: 15000, category: 'Sales' },
];

export const Ledger: React.FC = () => {
  const [isAddingAccount, setIsAddingAccount] = React.useState(false);

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search by ID, Description or category..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-600/10 transition-all font-medium"
          />
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsAddingAccount(true)}
            className="btn-primary bg-slate-900 border-none flex items-center gap-2 shadow-sm px-4 py-2"
          >
            <ListFilter className="w-4 h-4 text-indigo-400" />
            <span className="text-xs uppercase font-black tracking-widest text-white">New Account</span>
          </button>
          <button className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span>GL Report</span>
          </button>
        </div>
      </div>

      <div className="card-premium overflow-hidden border-slate-200/60 shadow-sm">
        <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex flex-col">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">General Ledger</h4>
            <span className="text-xs font-bold text-white">May 01, 2024 - May 31, 2024</span>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Total Turnover</div>
            <div className="text-sm font-black text-emerald-400 tabular-nums italic">$118,050.00</div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="table-header">Date</th>
                <th className="table-header">Transaction ID</th>
                <th className="table-header">Description</th>
                <th className="table-header text-right">Debit (-)</th>
                <th className="table-header text-right">Credit (+)</th>
                <th className="table-header">Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {TRANSACTIONS.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/30 transition-colors group">
                  <td className="px-6 py-4 text-xs font-bold text-slate-400 tabular-nums lowercase tracking-tighter">
                    {t.date}
                  </td>
                  <td className="px-6 py-4 text-[10px] font-black text-slate-900 uppercase">
                    {t.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-slate-900 italic tracking-tight">{t.desc}</div>
                  </td>
                  <td className="px-6 py-4 text-right tabular-nums text-sm font-black text-rose-600">
                    {t.type === 'Debit' ? `$${t.amount.toLocaleString()}` : '-'}
                  </td>
                  <td className="px-6 py-4 text-right tabular-nums text-sm font-black text-emerald-600">
                    {t.type === 'Credit' ? `$${t.amount.toLocaleString()}` : '-'}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[9px] font-black px-2 py-0.5 rounded border border-slate-100 bg-slate-50 text-slate-500 uppercase tracking-widest">
                      {t.category}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Ledger Account Modal */}
      {isAddingAccount && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="text-xl font-black text-slate-900 italic tracking-tight">Create Ledger Account</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Expanding Chart of Accounts</p>
              </div>
              <button 
                onClick={() => setIsAddingAccount(false)}
                className="p-2 hover:bg-white rounded-xl text-slate-400"
              >
                <ArrowDownLeft className="w-5 h-5 rotate-45" />
              </button>
            </div>
            
            <form className="p-8 space-y-6" onSubmit={(e) => { e.preventDefault(); setIsAddingAccount(false); }}>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Account Display Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. Petty Cash - Showroom A"
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold italic outline-none focus:border-slate-900 transition-all shadow-inner"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Classification</label>
                  <select className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold italic outline-none focus:border-slate-900 transition-all shadow-inner appearance-none">
                    <option>Asset</option>
                    <option>Liability</option>
                    <option>Equity</option>
                    <option>Revenue</option>
                    <option>Expense</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Opening Balance</label>
                  <input 
                    type="number" 
                    placeholder="0.00"
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold italic outline-none focus:border-slate-900 transition-all shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Parent Group (Optional)</label>
                <select className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold italic outline-none focus:border-slate-900 transition-all shadow-inner appearance-none">
                  <option>None (Top Level)</option>
                  <option>Current Assets</option>
                  <option>Fixed Assets</option>
                  <option>Operational Expenses</option>
                  <option>Sales Revenue</option>
                </select>
              </div>

              <div className="pt-4 flex gap-4">
                <button 
                  type="button"
                  onClick={() => setIsAddingAccount(false)}
                  className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all italic"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:scale-105 active:scale-95 transition-all italic"
                >
                  Register Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
