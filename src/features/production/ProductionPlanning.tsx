import React, { useState } from 'react';
import { Calendar, Plus, Filter, Search, ChevronRight, X, LayoutGrid, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PlanEntry {
  id: string;
  orderId: string;
  product: string;
  quantity: number;
  startDate: string;
  endDate: string;
  line: string;
  status: 'Scheduled' | 'In Progress' | 'Delayed';
}

const INITIAL_PLANS: PlanEntry[] = [
  { id: '1', orderId: 'WO-2024-001', product: 'Linen Summer Shirt', quantity: 5000, startDate: '2024-05-10', endDate: '2024-05-15', line: 'Line A', status: 'In Progress' },
  { id: '2', orderId: 'WO-2024-002', product: 'Slim Fit Chinos', quantity: 12000, startDate: '2024-05-12', endDate: '2024-05-20', line: 'Line B', status: 'Scheduled' },
  { id: '3', orderId: 'WO-2024-003', product: 'Basic Crew Neck', quantity: 45000, startDate: '2024-05-01', endDate: '2024-05-08', line: 'Line C', status: 'In Progress' },
  { id: '4', orderId: 'WO-2024-004', product: 'Knit Pullover', quantity: 3000, startDate: '2024-05-15', endDate: '2024-05-22', line: 'Line A', status: 'Scheduled' },
  { id: '5', orderId: 'WO-2024-005', product: 'Floral Maxi Dress', quantity: 8000, startDate: '2024-05-10', endDate: '2024-05-18', line: 'Line D', status: 'Delayed' },
];

export const ProductionPlanning: React.FC = () => {
  const [plans, setPlans] = useState<PlanEntry[]>(INITIAL_PLANS);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<string>('All');

  const filteredPlans = filter === 'All' ? plans : plans.filter(p => p.status === filter);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search schedule..." 
              className="w-80 pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none italic shadow-sm"
            />
          </div>
          <div className="flex gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 shadow-inner">
            {['All', 'Scheduled', 'In Progress', 'Delayed'].map((s) => (
              <button 
                key={s}
                onClick={() => setFilter(s)}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
                  filter === s ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                )}
                id={`filter-${s.toLowerCase().replace(' ', '-')}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-indigo-600 transition-all shadow-lg active:scale-95"
          id="btn-add-schedule"
        >
          <Plus className={cn("w-4 h-4 transition-transform", showForm && "rotate-45")} /> 
          {showForm ? 'Close Editor' : 'Deploy Schedule'}
        </button>
      </div>

      {/* Add Schedule Form (Simulated) */}
      {showForm && (
        <div className="card-premium p-8 border-slate-200/60 shadow-2xl animate-in slide-in-from-top-4 duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 blur-2xl" />
          <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 italic">Configuration: New Production Run</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Work Order</label>
              <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all italic">
                <option>WO-2024-006 (Summer Tee)</option>
                <option>WO-2024-007 (Denim Jeans)</option>
                <option>WO-2024-008 (Silk Scarf)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Start Date</label>
              <input type="date" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">End Date</label>
              <input type="date" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Target Line</label>
              <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all italic">
                <option>Line A</option>
                <option>Line B</option>
                <option>Line C</option>
                <option>Line D</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-8 pt-6 border-t border-slate-100">
             <button 
               onClick={() => setShowForm(false)}
               className="px-8 py-3 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-indigo-700 transition-all"
               id="btn-save-schedule"
             >
               Commit Schedule
             </button>
          </div>
        </div>
      )}

      {/* Planning Table */}
      <div className="card-premium border-slate-200/60 shadow-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">W.O. Ref</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Product Descriptor</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Batch Qty</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Start / End</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Assigned Line</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
              <th className="px-6 py-5 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 font-medium">
            {filteredPlans.map((plan) => (
              <tr key={plan.id} className="hover:bg-slate-50/50 transition-all group cursor-pointer" id={`plan-row-${plan.id}`}>
                <td className="px-6 py-5">
                  <span className="text-[10px] font-black text-indigo-500 font-mono tracking-tighter italic">#{plan.orderId}</span>
                </td>
                <td className="px-6 py-5">
                  <p className="text-sm font-black text-slate-900 italic tracking-tight">{plan.product}</p>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-black text-slate-700 tabular-nums">{plan.quantity.toLocaleString()}</span>
                    <span className="text-[9px] font-black text-slate-300 uppercase">PCS</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-900">{plan.startDate}</span>
                    <span className="text-[10px] font-bold text-slate-400">{plan.endDate}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-lg bg-slate-900 flex items-center justify-center text-[9px] font-black text-white italic">
                      {plan.line.split(' ')[1]}
                    </div>
                    <span className="text-[10px] font-black text-slate-700 uppercase tracking-tight">{plan.line}</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-center">
                  <span className={cn(
                    "text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border shadow-sm",
                    plan.status === 'Scheduled' ? "bg-blue-50 text-blue-600 border-blue-100" :
                    plan.status === 'In Progress' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                    "bg-rose-50 text-rose-600 border-rose-100"
                  )}>
                    {plan.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                  <ChevronRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-all" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Logic Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="card-premium p-8 bg-slate-900 text-white border-0 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full -mr-24 -mt-24 blur-3xl opacity-0 group-hover:opacity-100 transition-all" />
            <div className="flex items-center justify-between mb-6">
               <Calendar className="w-8 h-8 text-emerald-400" />
               <div className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] px-3 py-1 bg-emerald-400/10 rounded-full">Automated Planning Sync</div>
            </div>
            <h4 className="text-lg font-black italic tracking-tight mb-2">Schedule Optimization Enabled</h4>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
              Algorithms are currently balancing workload across 4 production lines.
            </p>
         </div>
         <div className="card-premium p-8 border-slate-200/60 shadow-xl relative group">
            <div className="flex items-center justify-between mb-6">
               <AlertCircle className="w-8 h-8 text-rose-500" />
               <div className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em] px-3 py-1 bg-rose-50 rounded-full">Alert Threshold: High</div>
            </div>
            <h4 className="text-lg font-black italic tracking-tight mb-2">Capacity Conflict Detected</h4>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
               WO-2024-005 is currently <span className="text-rose-500">Delayed</span> due to line D maintenance. Manual intervention required.
            </p>
         </div>
      </div>
    </div>
  );
};
