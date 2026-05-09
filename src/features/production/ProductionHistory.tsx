import React from 'react';
import { History, Download, Filter, Search, ChevronRight, FileCheck } from 'lucide-react';
import { cn } from '../../lib/utils';

const COMPLETED_ORDERS = [
  { id: 'WO-2023-998', product: 'Men Polo Sport', qty: 2500, start: '2024-04-26', end: '2024-05-01', duration: '5 days', status: 'Completed' },
  { id: 'WO-2023-997', product: 'Summer Tee Black', qty: 1200, start: '2024-04-25', end: '2024-04-28', duration: '3 days', status: 'Completed' },
  { id: 'WO-2023-996', product: 'Cargo Pants Tan', qty: 850, start: '2024-04-18', end: '2024-04-25', duration: '7 days', status: 'Completed' },
  { id: 'WO-2023-995', product: 'Denim Jacket V2', qty: 500, start: '2024-04-10', end: '2024-04-22', duration: '12 days', status: 'Slight Delay' },
  { id: 'WO-2023-994', product: 'Linen Dress', qty: 1500, start: '2024-04-05', end: '2024-04-15', duration: '10 days', status: 'Completed' },
  { id: 'WO-2023-993', product: 'Silk Blouse', qty: 300, start: '2024-04-01', end: '2024-04-05', duration: '4 days', status: 'Completed' },
];

export const ProductionHistory: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black text-slate-900 italic tracking-tight underline decoration-slate-500/30 decoration-4 underline-offset-4">Production Ledger Archive</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">Historical Records / Audit Optimized Logging</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all">
            <Search className="w-3.5 h-3.5" /> Global Search
          </button>
          <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-slate-700 transition-all shadow-lg">
            <Download className="w-3.5 h-3.5" /> Export Data
          </button>
        </div>
      </div>

      <div className="card-premium border-slate-200/60 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between gap-4">
           <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex items-center gap-3">
                 <span className="text-[10px] font-black text-slate-400 uppercase">Date Range:</span>
                 <input type="date" className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-[10px] font-black text-slate-900 outline-none" />
                 <span className="text-[10px] font-black text-slate-400 uppercase">to</span>
                 <input type="date" className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-[10px] font-black text-slate-900 outline-none" />
              </div>
              <div className="h-4 w-px bg-slate-200 hidden md:block" />
              <div className="flex items-center gap-3">
                 <span className="text-[10px] font-black text-slate-400 uppercase">Status:</span>
                 <select className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-[10px] font-black text-indigo-600 outline-none uppercase tracking-tighter">
                    <option>All Status</option>
                    <option>Completed</option>
                    <option>Delayed</option>
                 </select>
              </div>
           </div>
        </div>

        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">W.O. ID</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Product Descriptor</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Qty Produced</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Timeline</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Duration</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 font-medium">
            {COMPLETED_ORDERS.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50/50 transition-all group cursor-pointer">
                <td className="px-6 py-5">
                  <span className="text-[10px] font-black text-indigo-500 font-mono tracking-tighter italic">#{order.id}</span>
                </td>
                <td className="px-6 py-5">
                  <p className="text-sm font-black text-slate-900 italic tracking-tight">{order.product}</p>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-black text-slate-700 tabular-nums">{order.qty.toLocaleString()}</span>
                    <span className="text-[9px] font-black text-slate-300 uppercase">PCS</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-900">{order.start}</span>
                    <span className="text-[10px] font-bold text-slate-400">{order.end}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <History className="w-3.5 h-3.5 text-slate-300" />
                    <span className="text-[10px] font-black text-slate-700 uppercase tracking-tight">{order.duration}</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-center">
                  <span className={cn(
                    "text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border shadow-sm",
                    order.status === 'Completed' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100"
                  )}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="p-6 bg-slate-50 border-t border-slate-100/50 flex items-center justify-between">
           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total 1,240 historical work orders archived</p>
           <div className="flex gap-2">
              <button className="px-4 py-1 bg-white border border-slate-200 rounded text-[10px] font-black text-slate-400 hover:text-slate-900">Prev</button>
              <button className="px-4 py-1 bg-white border border-slate-200 rounded text-[10px] font-black text-slate-400 hover:text-slate-900">Next</button>
           </div>
        </div>
      </div>
    </div>
  );
};
