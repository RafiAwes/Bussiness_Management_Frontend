import React from 'react';
import { Search, Filter, Download, Plus, Receipt, ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const EXPENSES = [
  { id: 'EXP-101', category: 'Fabric', amount: 12500, date: '2024-05-02', note: 'Bulk cotton rolls from Supplier X', status: 'Approved' },
  { id: 'EXP-102', category: 'Utilities', amount: 840, date: '2024-05-03', note: 'Electricity Bill - Block A', status: 'Pending' },
  { id: 'EXP-103', category: 'Salary', amount: 45000, date: '2024-04-30', note: 'Monthly Payroll - Production Team', status: 'Approved' },
  { id: 'EXP-104', category: 'Rent', amount: 5000, date: '2024-05-01', note: 'Warehouse Lease Payment', status: 'Approved' },
  { id: 'EXP-105', category: 'Logistics', amount: 1200, date: '2024-05-05', note: 'DHL Shipping Charges', status: 'Rejected' },
];

export const ExpenseList: React.FC<{ onAddExpense: () => void }> = ({ onAddExpense }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search expenses by ID, category, or note..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-600/10 transition-all font-medium"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button 
            onClick={onAddExpense}
            className="btn-primary flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4" />
            <span>Record Expense</span>
          </button>
        </div>
      </div>

      <div className="card-premium overflow-hidden border-slate-200/60 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="table-header">Date</th>
                <th className="table-header">Category</th>
                <th className="table-header">Reference</th>
                <th className="table-header text-right">Amount</th>
                <th className="table-header text-center">Status</th>
                <th className="table-header"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {EXPENSES.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/30 transition-colors group">
                  <td className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-tighter">
                    {item.date}
                  </td>
                  <td className="px-4 py-4">
                    <span className={cn(
                      "text-[10px] font-black px-2 py-0.5 rounded tracking-widest uppercase",
                      item.category === 'Salary' ? "bg-blue-50 text-blue-600" :
                      item.category === 'Fabric' ? "bg-amber-50 text-amber-600" :
                      item.category === 'Rent' ? "bg-indigo-50 text-indigo-600" :
                      "bg-slate-100 text-slate-600"
                    )}>
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm font-bold text-slate-900 leading-tight">{item.note}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-1 uppercase tracking-tighter">{item.id}</div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="text-sm font-black text-rose-600 tabular-nums">
                      -${item.amount.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={cn(
                      "text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-[0.1em]",
                      item.status === 'Approved' ? "bg-emerald-50 text-emerald-600" :
                      item.status === 'Pending' ? "bg-amber-50 text-amber-600" :
                      "bg-rose-50 text-rose-500"
                    )}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-indigo-600">
                      <Receipt className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
