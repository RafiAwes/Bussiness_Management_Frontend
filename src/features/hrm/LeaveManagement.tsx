import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, XCircle, AlertCircle, Plus, Filter, Search, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface LeaveRequest {
  id: string;
  employee: string;
  type: 'Sick' | 'Casual' | 'Emergency' | 'Annual';
  startDate: string;
  endDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  reason: string;
}

const DUMMY_LEAVES: LeaveRequest[] = [
  { id: 'LR-001', employee: 'John Doe', type: 'Sick', startDate: '2024-05-10', endDate: '2024-05-12', status: 'Pending', reason: 'Flu symptoms' },
  { id: 'LR-002', employee: 'Sarah Smith', type: 'Annual', startDate: '2024-06-01', endDate: '2024-06-15', status: 'Approved', reason: 'Family vacation' },
  { id: 'LR-003', employee: 'Mike Johnson', type: 'Emergency', startDate: '2024-05-08', endDate: '2024-05-08', status: 'Rejected', reason: 'Personal urgent matter' },
  { id: 'LR-004', employee: 'Emma Wilson', type: 'Casual', startDate: '2024-05-20', endDate: '2024-05-21', status: 'Pending', reason: 'Personal errands' },
  { id: 'LR-005', employee: 'Robert Brown', type: 'Sick', startDate: '2024-05-05', endDate: '2024-05-06', status: 'Approved', reason: 'Medical appointment' },
];

export const LeaveManagement: React.FC = () => {
  const [leaves, setLeaves] = useState<LeaveRequest[]>(DUMMY_LEAVES);
  const [isAdding, setIsAdding] = useState(false);
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');

  const handleStatusChange = (id: string, newStatus: 'Approved' | 'Rejected') => {
    setLeaves(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
  };

  const filteredLeaves = leaves.filter(l => filter === 'All' || l.status === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex bg-slate-100 p-1 rounded-xl">
             {['All', 'Pending', 'Approved', 'Rejected'].map((s) => (
               <button 
                key={s}
                onClick={() => setFilter(s as any)}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                  filter === s ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                )}
               >
                 {s}
               </button>
             ))}
          </div>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="btn-primary bg-slate-900 border-none flex items-center gap-2 shadow-xl hover:scale-105 transition-all text-white px-6 py-3 rounded-2xl"
        >
          <Plus className="w-4 h-4" />
          <span className="text-[10px] uppercase font-black tracking-widest">Request Leave</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <LeaveStat label="Pending Approval" value={leaves.filter(l => l.status === 'Pending').length} icon={<Clock className="text-amber-500" />} />
        <LeaveStat label="Approved Today" value={leaves.filter(l => l.status === 'Approved').length} icon={<CheckCircle2 className="text-emerald-500" />} />
        <LeaveStat label="Rejected Requests" value={leaves.filter(l => l.status === 'Rejected').length} icon={<XCircle className="text-rose-500" />} />
      </div>

      {/* List */}
      <div className="card-premium overflow-hidden border-2 border-slate-100 shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] italic">Employee</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] italic">Type</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] italic">Period</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] italic">Reason</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] italic">Status</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] italic text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredLeaves.map((leave) => (
              <tr key={leave.id} className="hover:bg-slate-50/80 transition-colors group">
                <td className="px-6 py-5 font-black text-slate-900 italic text-sm">{leave.employee}</td>
                <td className="px-6 py-5">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                    leave.type === 'Sick' ? "bg-rose-50 text-rose-600" :
                    leave.type === 'Annual' ? "bg-indigo-50 text-indigo-600" :
                    leave.type === 'Emergency' ? "bg-amber-50 text-amber-600" : "bg-slate-50 text-slate-600"
                  )}>
                    {leave.type}
                  </span>
                </td>
                <td className="px-6 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {leave.startDate} - {leave.endDate}
                  </div>
                </td>
                <td className="px-6 py-5 text-xs text-slate-400 font-medium max-w-[200px] truncate">{leave.reason}</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      leave.status === 'Approved' ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" :
                      leave.status === 'Rejected' ? "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]" :
                      "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)] animate-pulse"
                    )} />
                    <span className={cn(
                      "text-[10px] font-black uppercase tracking-widest italic",
                      leave.status === 'Approved' ? "text-emerald-600" :
                      leave.status === 'Rejected' ? "text-rose-600" : "text-amber-600"
                    )}>
                      {leave.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5 text-right">
                  {leave.status === 'Pending' && (
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleStatusChange(leave.id, 'Approved')}
                        className="p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleStatusChange(leave.id, 'Rejected')}
                        className="p-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Simulation */}
      {isAdding && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[40px] w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border-2 border-slate-100">
            <div className="bg-slate-900 p-8 text-white relative">
               <button onClick={() => setIsAdding(false)} className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
                  <XCircle className="w-6 h-6" />
               </button>
               <h3 className="text-2xl font-black italic tracking-tighter">Submit Leave Request</h3>
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mt-2">DressTown Official Form</p>
            </div>
            <div className="p-10 space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Employee Select</label>
                  <select className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-indigo-500/50 transition-all">
                    <option>Select Employee...</option>
                    <option>John Doe</option>
                    <option>Sarah Smith</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Leave Category</label>
                  <select className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-indigo-500/50 transition-all">
                    <option>Sick</option>
                    <option>Casual</option>
                    <option>Emergency</option>
                    <option>Annual</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Start Timeline</label>
                  <input type="date" className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-indigo-500/50 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">End Timeline</label>
                  <input type="date" className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-indigo-500/50 transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Request justification</label>
                <textarea rows={3} placeholder="Provide details..." className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-indigo-500/50 transition-all resize-none"></textarea>
              </div>
              <button 
                onClick={() => setIsAdding(false)}
                className="w-full py-5 bg-slate-900 text-white rounded-3xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95 transition-all italic"
              >
                Dispatch Authorization Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const LeaveStat = ({ label, value, icon }: any) => (
  <div className="card-premium p-6 flex items-center justify-between border-2 border-slate-50 hover:border-indigo-100 transition-all group">
    <div className="space-y-1">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <p className="text-3xl font-black text-slate-900 italic tracking-tighter tabular-nums">{value}</p>
    </div>
    <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
      {icon}
    </div>
  </div>
);
