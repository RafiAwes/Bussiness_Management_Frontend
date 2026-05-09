import React from 'react';
import { Search, Download, ExternalLink, Filter, Calendar } from 'lucide-react';
import { cn } from '../../lib/utils';

const SALES_HISTORY = [
  { id: 'INV-4401', customer: 'Private Client (Walk-in)', method: 'Cash', date: '2024-05-04 14:20', total: 125.50, items: 3, status: 'Paid' },
  { id: 'INV-4402', customer: 'Zara (Ref: #8812)', method: 'Bank Transfer', date: '2024-05-04 12:15', total: 14200.00, items: 1200, status: 'Paid' },
  { id: 'INV-4403', customer: 'H&M (Ref: #5542)', method: 'L/C', date: '2024-05-04 10:30', total: 45000.00, items: 5000, status: 'Pending' },
  { id: 'INV-4404', customer: 'Private Client (Walk-in)', method: 'Card', date: '2024-05-03 16:45', total: 45.00, items: 1, status: 'Paid' },
  { id: 'INV-4405', customer: 'GAP (Ref: #3321)', method: 'Wire', date: '2024-05-03 09:12', total: 8500.00, items: 800, status: 'Cancelled' },
];

export const SalesHistory: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search by invoice ID or customer..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-accent/20 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Date Range</span>
          </button>
          <button className="btn-secondary flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span>Method</span>
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span>Report</span>
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-premium p-6">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Today's Revenue</div>
          <div className="text-2xl font-black text-slate-950 tabular-nums">$59,370.50</div>
          <div className="text-[10px] font-bold text-emerald-500 uppercase mt-1">+14% vs yesterday</div>
        </div>
        <div className="card-premium p-6">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Transactions</div>
          <div className="text-2xl font-black text-slate-950 tabular-nums">42</div>
          <div className="text-[10px] font-bold text-slate-400 uppercase mt-1">Average $1,413 / tx</div>
        </div>
        <div className="card-premium p-6 border-l-4 border-l-amber-400">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Pending L/C</div>
          <div className="text-2xl font-black text-slate-950 tabular-nums">$45,000.00</div>
          <div className="text-[10px] font-bold text-amber-500 uppercase mt-1">Awaiting bank proof</div>
        </div>
      </div>

      {/* History Table */}
      <div className="card-premium overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="table-header">Invoice ID</th>
              <th className="table-header">Customer / Channel</th>
              <th className="table-header">Method</th>
              <th className="table-header">Date & Time</th>
              <th className="table-header text-right">Amount</th>
              <th className="table-header text-center">Status</th>
              <th className="table-header"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {SALES_HISTORY.map((tx) => (
              <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-4 py-4 text-xs font-bold text-slate-500 font-mono italic">{tx.id}</td>
                <td className="px-4 py-4">
                  <div className="text-sm font-bold text-slate-900">{tx.customer}</div>
                  <div className="text-[10px] text-slate-400 font-medium">{tx.items} items included</div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded">
                    {tx.method}
                  </span>
                </td>
                <td className="px-4 py-4 text-xs text-slate-500 font-medium tabular-nums">{tx.date}</td>
                <td className="px-4 py-4 text-right">
                  <div className="text-sm font-bold text-slate-950 tabular-nums">${tx.total.toFixed(2)}</div>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest border",
                    tx.status === 'Paid' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                    tx.status === 'Pending' ? "bg-amber-50 text-amber-600 border-amber-100" :
                    "bg-rose-50 text-rose-600 border-rose-100"
                  )}>
                    {tx.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-accent transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
