import React, { useState } from 'react';
import { User, Users, Plus, Filter, Search, ChevronRight, UserPlus, Shield, Activity, Clock, Briefcase } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Worker {
  id: string;
  name: string;
  role: 'Tailor' | 'Cutter' | 'Finisher' | 'Lead' | 'Machine Op';
  line: string;
  order: string;
  status: 'Active' | 'Idle';
}

const INITIAL_WORKERS: Worker[] = [
  { id: '1', name: 'Althea Johnson', role: 'Tailor', line: 'Line A', order: 'WO-2024-001', status: 'Active' },
  { id: '2', name: 'Marcus Wong', role: 'Cutter', line: 'Line A', order: 'WO-2024-001', status: 'Active' },
  { id: '3', name: 'Sarah Miller', role: 'Finisher', line: 'Line B', order: 'WO-2024-002', status: 'Active' },
  { id: '4', name: 'James Wilson', role: 'Lead', line: 'Line C', order: 'WO-2024-003', status: 'Active' },
  { id: '5', name: 'Elena Rodriguez', role: 'Tailor', line: 'N/A', order: 'N/A', status: 'Idle' },
  { id: '6', name: 'David Chen', role: 'Machine Op', line: 'N/A', order: 'N/A', status: 'Idle' },
  { id: '7', name: 'Sofia Garcia', role: 'Cutter', line: 'Line B', order: 'WO-2024-002', status: 'Active' },
  { id: '8', name: 'Robert Taylor', role: 'Finisher', line: 'N/A', order: 'N/A', status: 'Idle' },
];

export const WorkerAssignment: React.FC = () => {
  const [workers, setWorkers] = useState<Worker[]>(INITIAL_WORKERS);
  const [showAssignForm, setShowAssignForm] = useState(false);
  const [assignment, setAssignment] = useState({ workerId: '', line: 'Line A', orderId: 'WO-2024-001' });

  const handleAssign = () => {
    if (!assignment.workerId) return;
    
    setWorkers(prev => prev.map(w => {
      if (w.id === assignment.workerId) {
        return {
          ...w,
          line: assignment.line,
          order: assignment.orderId,
          status: 'Active'
        };
      }
      return w;
    }));
    setShowAssignForm(false);
    setAssignment({ workerId: '', line: 'Line A', orderId: 'WO-2024-001' });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search personnel..." 
              className="w-80 pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none italic shadow-sm"
            />
          </div>
          <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all">
            <Filter className="w-3.5 h-3.5" /> Filter Roles
          </button>
        </div>
        <button 
          onClick={() => setShowAssignForm(!showAssignForm)}
          className="px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-indigo-600 transition-all shadow-lg active:scale-95"
          id="btn-show-assign-form"
        >
          <UserPlus className="w-4 h-4" /> {showAssignForm ? 'Cancel Assignment' : 'Assign New Personnel'}
        </button>
      </div>

      {/* Assignment Form */}
      {showAssignForm && (
        <div className="card-premium p-8 border-slate-200/60 shadow-2xl animate-in slide-in-from-top-4 duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 blur-2xl" />
          <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 italic flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-500" /> Deployment: Worker Allocation
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Worker Selection</label>
              <select 
                value={assignment.workerId}
                onChange={(e) => setAssignment({...assignment, workerId: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all italic"
              >
                <option value="">Select Worker...</option>
                {workers.map(w => (
                  <option key={w.id} value={w.id}>{w.name} ({w.role})</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Target Line</label>
              <select 
                value={assignment.line}
                onChange={(e) => setAssignment({...assignment, line: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all italic"
              >
                <option value="Line A">Line A</option>
                <option value="Line B">Line B</option>
                <option value="Line C">Line C</option>
                <option value="Line D">Line D</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Active Work Order</label>
              <select 
                value={assignment.orderId}
                onChange={(e) => setAssignment({...assignment, orderId: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all italic"
              >
                <option value="WO-2024-001">WO-2024-001</option>
                <option value="WO-2024-002">WO-2024-002</option>
                <option value="WO-2024-003">WO-2024-003</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-8 pt-6 border-t border-slate-100">
             <button 
               onClick={handleAssign}
               className="px-8 py-3 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-emerald-700 transition-all font-sans"
               id="btn-confirm-assign"
             >
               Deploy Personnel
             </button>
          </div>
        </div>
      )}

      {/* Assignment Table */}
      <div className="card-premium border-slate-200/60 shadow-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Personnel</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Core Role</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Station</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Batch Context</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
              <th className="px-6 py-5 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {workers.map((worker) => (
              <tr key={worker.id} className="hover:bg-slate-50/50 transition-all group cursor-pointer" id={`worker-row-${worker.id}`}>
                <td className="px-6 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-[11px] font-black text-white italic shadow-inner">
                      {worker.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-950 italic leading-none">{worker.name}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase mt-1 tracking-tighter">ID: FAC-{worker.id.slice(0, 4)}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6">
                   <div className="flex items-center gap-2 p-1.5 bg-slate-50 rounded-xl w-fit border border-slate-100 pr-4 shadow-sm">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-[10px] font-black text-slate-700 uppercase tracking-tight">{worker.role}</span>
                   </div>
                </td>
                <td className="px-6 py-6">
                  <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">{worker.line}</span>
                </td>
                <td className="px-6 py-6">
                  <span className="text-[10px] font-black text-slate-900 font-mono tracking-tighter opacity-60">#{worker.order}</span>
                </td>
                <td className="px-6 py-6 text-center">
                  <span className={cn(
                    "text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border shadow-sm flex items-center gap-1.5 w-fit mx-auto",
                    worker.status === 'Active' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-slate-50 text-slate-400 border-slate-100"
                  )}>
                    <div className={cn("w-1 h-1 rounded-full", worker.status === 'Active' ? "bg-emerald-500 animate-pulse" : "bg-slate-300")} />
                    {worker.status}
                  </span>
                </td>
                <td className="px-6 py-6 text-right">
                  <ChevronRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-all" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Roster Overview / Tags Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {['Line A', 'Line B', 'Line C'].map((line) => (
           <div key={line} className="card-premium p-6 border-slate-200/60 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                 <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-widest italic">{line} Roster</h5>
                 <Users className="w-4 h-4 text-slate-300" />
              </div>
              <div className="flex flex-wrap gap-2">
                 {workers.filter(w => w.line === line).map(w => (
                    <div key={w.id} className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-[9px] font-black text-slate-600 uppercase tracking-tight flex items-center gap-2 hover:bg-slate-100 transition-all cursor-default">
                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                       {w.name.split(' ')[0]}
                    </div>
                 ))}
                 {workers.filter(w => w.line === line).length === 0 && (
                    <p className="text-[10px] font-bold text-slate-400 italic">No assigned personnel</p>
                 )}
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};
