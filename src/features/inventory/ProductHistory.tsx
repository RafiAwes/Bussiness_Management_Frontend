import React from 'react';
import { Search, Filter, ArrowUp, ArrowDown, RefreshCcw, History, Tag, Box } from 'lucide-react';
import { cn } from '../../lib/utils';

const HISTORY_DATA = [
  { id: 'LOG-001', date: '2024-05-10 14:30', product: 'Premium Cotton Roll / White', type: 'SALE', qty: -50, user: 'Jane Smith', reference: 'ORD-5501', location: 'Warehouse A' },
  { id: 'LOG-002', date: '2024-05-10 11:20', product: 'Premium Cotton Roll / White', type: 'RESTOCK', qty: 200, user: 'Michael Wilson', reference: 'PUR-9902', location: 'Warehouse A' },
  { id: 'LOG-003', date: '2024-05-09 16:45', product: 'Indigo Denim Fabric', type: 'TRANSFER', qty: -100, user: 'Robert Brown', reference: 'TRN-4412', location: 'Warehouse A' },
  { id: 'LOG-004', date: '2024-05-09 16:45', product: 'Indigo Denim Fabric', type: 'TRANSFER', qty: 100, user: 'Robert Brown', reference: 'TRN-4412', location: 'Showroom Alpha' },
  { id: 'LOG-005', date: '2024-05-08 09:00', product: 'Button Pack - Gold', type: 'ADJUSTMENT', qty: -5, user: 'Jane Smith', reference: 'ADJ-1022 (Damage)', location: 'Warehouse B' },
];

export const ProductHistory: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search by SKU, Product or Reference..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-600/10 transition-all font-medium italic"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span>All Types</span>
          </button>
        </div>
      </div>

      <div className="card-premium overflow-hidden border-slate-200/60 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="table-header">Timestamp</th>
                <th className="table-header">Movement Type</th>
                <th className="table-header">Product & SKU</th>
                <th className="table-header text-right">Qty Change</th>
                <th className="table-header">Location</th>
                <th className="table-header">Reference / User</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {HISTORY_DATA.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-4 py-4">
                    <div className="text-[10px] font-black text-slate-400 uppercase tabular-nums tracking-tighter leading-none mb-1">{log.date.split(' ')[0]}</div>
                    <div className="text-xs font-bold text-slate-900 tracking-tight leading-none">{log.date.split(' ')[1]}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.1em]",
                      log.type === 'SALE' ? "bg-rose-50 text-rose-600" :
                      log.type === 'RESTOCK' ? "bg-emerald-50 text-emerald-600" :
                      log.type === 'TRANSFER' ? "bg-indigo-50 text-indigo-600" : "bg-amber-50 text-amber-600"
                    )}>
                      {log.type === 'SALE' ? <ArrowDown className="w-2.5 h-2.5" /> :
                       log.type === 'RESTOCK' ? <ArrowUp className="w-2.5 h-2.5" /> :
                       log.type === 'TRANSFER' ? <RefreshCcw className="w-2.5 h-2.5" /> : <History className="w-2.5 h-2.5" />}
                      {log.type}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm font-bold text-slate-900 italic">{log.product}</div>
                    <div className="text-[9px] font-mono text-slate-400 tracking-tighter uppercase mt-1 flex items-center gap-1">
                      <Tag className="w-2.5 h-2.5" /> {log.id}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className={cn(
                      "text-sm font-black tabular-nums italic",
                      log.qty > 0 ? "text-emerald-600" : "text-rose-600"
                    )}>
                      {log.qty > 0 ? '+' : ''}{log.qty} Units
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                      <Box className="w-3 h-3 text-slate-400" />
                      {log.location}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-xs font-bold text-slate-900 italic tracking-tight">{log.reference}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{log.user}</div>
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
