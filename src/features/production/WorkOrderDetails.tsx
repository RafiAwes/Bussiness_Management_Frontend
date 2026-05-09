import React from 'react';
import { Package, Users, AlertTriangle, ArrowRight, CheckCircle2, History, Info } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Material {
  name: string;
  expected: number;
  actual: number;
  unit: string;
}

interface Worker {
  name: string;
  role: string;
}

interface Issue {
  type: string;
  desc: string;
  date: string;
  severity: 'low' | 'medium' | 'high';
}

interface WorkOrderDetailsProps {
  materials: Material[];
  workers: Worker[];
  issues: Issue[];
  bom: { item: string; qty: string }[];
}

export const WorkOrderDetails: React.FC<WorkOrderDetailsProps> = ({ materials, workers, issues, bom }) => {
  return (
    <div className="p-8 bg-slate-50/50 border-t border-slate-200 animate-in slide-in-from-top-4 duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: BOM & Consumption */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
               <Package className="w-4 h-4 text-indigo-500" />
               <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Bill of Materials (BOM)</h4>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
               <table className="w-full text-left">
                  <thead className="bg-slate-50">
                     <tr>
                        <th className="px-4 py-2 text-[9px] font-black text-slate-400 uppercase">Input Material</th>
                        <th className="px-4 py-2 text-[9px] font-black text-slate-400 uppercase text-right">Requirement</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {bom.map((item, i) => (
                        <tr key={i}>
                           <td className="px-4 py-3 text-[11px] font-bold text-slate-700 italic">{item.item}</td>
                           <td className="px-4 py-3 text-[11px] font-black text-slate-900 text-right tabular-nums">{item.qty}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
          </div>

          <div>
             <div className="flex items-center gap-2 mb-4">
                <History className="w-4 h-4 text-emerald-500" />
                <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Material Consumption Tracking</h4>
             </div>
             <div className="space-y-3">
                {materials.map((m, i) => {
                   const waste = m.actual - m.expected;
                   const wastePercent = (waste / m.expected) * 100;
                   return (
                      <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                         <div className="flex justify-between items-center mb-2">
                            <span className="text-[11px] font-black text-slate-900 italic">{m.name}</span>
                            <span className={cn(
                               "text-[10px] font-black uppercase tracking-tighter",
                               waste > 0 ? "text-rose-500" : "text-emerald-500"
                            )}>
                               {waste > 0 ? `+${waste.toFixed(1)}${m.unit} Variance` : 'Optimized'}
                            </span>
                         </div>
                         <div className="flex items-center gap-4">
                            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                               <div 
                                  className={cn("h-full", wastePercent > 5 ? "bg-rose-500" : "bg-emerald-500")} 
                                  style={{ width: `${Math.min((m.actual / (m.expected * 1.1)) * 100, 100)}%` }} 
                               />
                            </div>
                            <span className="text-[10px] font-black text-slate-400 tabular-nums">{m.actual}{m.unit} / {m.expected}{m.unit}</span>
                         </div>
                      </div>
                   )
                })}
             </div>
          </div>
        </div>

        {/* Right Column: Workers & Issues */}
        <div className="space-y-8">
           <div>
              <div className="flex items-center gap-2 mb-4">
                 <Users className="w-4 h-4 text-amber-500" />
                 <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Assigned Personnel</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                 {workers.map((w, i) => (
                    <div key={i} className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl flex items-center gap-2 shadow-sm">
                       <div className="w-5 h-5 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-[8px] italic">
                          {w.name.split(' ').map(n => n[0]).join('')}
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-slate-900 italic leading-none">{w.name}</p>
                          <p className="text-[8px] font-bold text-slate-400 uppercase mt-0.5">{w.role}</p>
                       </div>
                    </div>
                 ))}
                 <button className="px-3 py-1.5 bg-slate-50 border border-slate-200 border-dashed rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-slate-100 transition-all">
                    + Assign
                 </button>
              </div>
           </div>

           <div>
              <div className="flex items-center gap-2 mb-4">
                 <AlertTriangle className="w-4 h-4 text-rose-500" />
                 <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Active Issues & Delays</h4>
              </div>
              <div className="space-y-3">
                 {issues.length > 0 ? issues.map((issue, i) => (
                    <div key={i} className={cn(
                       "p-4 rounded-2xl border-l-4 shadow-sm",
                       issue.severity === 'high' ? "bg-rose-50 border-rose-500" :
                       issue.severity === 'medium' ? "bg-amber-50 border-amber-500" :
                       "bg-blue-50 border-blue-500"
                    )}>
                       <div className="flex justify-between items-start mb-1">
                          <h5 className={cn(
                             "text-[10px] font-black uppercase tracking-widest",
                             issue.severity === 'high' ? "text-rose-900" : "text-slate-900"
                          )}>{issue.type}</h5>
                          <span className="text-[9px] font-bold text-slate-400 font-mono">{issue.date}</span>
                       </div>
                       <p className="text-[10px] font-medium text-slate-600 leading-relaxed italic">{issue.desc}</p>
                    </div>
                 )) : (
                    <div className="p-8 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-center opacity-40">
                       <CheckCircle2 className="w-8 h-8 text-emerald-500 mb-2" />
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No Active Incidents</p>
                    </div>
                 )}
                 <button className="w-full py-3 bg-white border border-slate-200 border-dashed rounded-2xl text-[10px] font-black text-rose-500 uppercase tracking-widest hover:bg-rose-50 transition-all flex items-center justify-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5" /> Report Latency Issue
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
