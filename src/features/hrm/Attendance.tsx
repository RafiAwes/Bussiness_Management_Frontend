import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, CheckCircle2, XCircle, Search, Save, UserCheck, AlertCircle, TrendingUp, Filter, MoreVertical } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useStore } from '../../context/StoreContext';

const EMPLOYEES = [
  { id: 'EMP-001', name: 'John Doe', dept: 'Admin' },
  { id: 'EMP-002', name: 'Jane Smith', dept: 'Sales' },
  { id: 'EMP-003', name: 'Robert Brown', dept: 'Admin' },
  { id: 'EMP-004', name: 'Emily Davis', dept: 'Accounts' },
  { id: 'EMP-005', name: 'Michael Wilson', dept: 'Accounts' },
];

export const Attendance: React.FC = () => {
  const { state, recordAttendance } = useStore();
  const [markedToday, setMarkedToday] = useState<Record<string, 'Present' | 'Late' | 'Absent'>>({});

  const handleStatusChange = (empId: string, status: 'Present' | 'Late' | 'Absent') => {
    setMarkedToday(prev => ({ ...prev, [empId]: status }));
    if (status === 'Present' || status === 'Late') {
      recordAttendance(empId);
    }
  };

  return (
    <div className="space-y-8">
      {/* Attendance Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="card-premium p-3 flex items-center gap-3 border-2 border-slate-100 shadow-xl">
            <CalendarIcon className="w-5 h-5 text-indigo-600" />
            <div className="text-sm font-black text-slate-900 italic">May 09, 2026</div>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest border-l-2 border-slate-200 pl-4">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            Live Reporting: Active
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search Personnel..." 
              className="pl-10 pr-4 py-2.5 bg-white border-2 border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest outline-none focus:border-indigo-500/50 transition-all w-64 shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all italic">
            <Save className="w-4 h-4" />
            Finalize Entry
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AttendanceMetric label="Active Attendance" value="328" sub="Present Today" icon={<UserCheck className="text-emerald-500" />} />
        <AttendanceMetric label="Personnel Attrition" value="14" sub="Absences Logged" icon={<XCircle className="text-rose-500" />} />
        <AttendanceMetric label="Late Arrivals" value="08" sub="Post-Shift Start" icon={<Clock className="text-amber-500" />} />
        <AttendanceMetric label="Efficiency index" value="96.2%" sub="Monthly Average" icon={<TrendingUp className="text-indigo-500" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Attendance Table */}
        <div className="lg:col-span-2 card-premium overflow-hidden border-2 border-slate-100 shadow-2xl">
          <div className="bg-slate-900 p-6 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] italic">Daily Operational check-in</h3>
            <div className="flex gap-4">
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Morning Shift: 09:00 AM</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Personnel</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest italic text-center">Clock In</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest italic text-center">Status</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest italic text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {EMPLOYEES.map((emp) => {
                  const status = markedToday[emp.id];
                  return (
                    <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="text-sm font-black text-slate-900 italic tracking-tight">{emp.name}</div>
                        <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{emp.dept} Unit</div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col items-center">
                          <div className="flex items-center gap-2 text-xs font-black text-slate-900 tabular-nums italic">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {status === 'Present' ? '09:00 AM' : status === 'Late' ? '09:42 AM' : '--:--'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex justify-center">
                          <div className={cn(
                            "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm",
                            status === 'Present' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                            status === 'Late' ? "bg-amber-50 text-amber-600 border-amber-100" :
                            status === 'Absent' ? "bg-rose-50 text-rose-600 border-rose-100" :
                            "bg-slate-50 text-slate-400 border-slate-100 italic"
                          )}>
                            {status || 'Not Marked'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                           <button 
                            onClick={() => handleStatusChange(emp.id, 'Present')}
                            className={cn(
                              "p-2 rounded-xl border-2 transition-all transition-all",
                              status === 'Present' ? "bg-emerald-500 border-emerald-500 text-white shadow-lg" : "bg-white border-slate-100 text-slate-300 hover:text-emerald-500 hover:border-emerald-100"
                            )}
                           >
                              <CheckCircle2 className="w-4 h-4" />
                           </button>
                           <button 
                            onClick={() => handleStatusChange(emp.id, 'Late')}
                            className={cn(
                              "p-2 rounded-xl border-2 transition-all",
                              status === 'Late' ? "bg-amber-500 border-amber-500 text-white shadow-lg" : "bg-white border-slate-100 text-slate-300 hover:text-amber-500 hover:border-amber-100"
                            )}
                           >
                              <Clock className="w-4 h-4" />
                           </button>
                           <button 
                            onClick={() => handleStatusChange(emp.id, 'Absent')}
                            className={cn(
                              "p-2 rounded-xl border-2 transition-all",
                              status === 'Absent' ? "bg-rose-500 border-rose-500 text-white shadow-lg" : "bg-white border-slate-100 text-slate-300 hover:text-rose-500 hover:border-rose-100"
                            )}
                           >
                              <XCircle className="w-4 h-4" />
                           </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Calendar / Summary Side */}
        <div className="space-y-6">
           <div className="card-premium p-8 bg-slate-900 text-white relative flex flex-col justify-between overflow-hidden shadow-2xl border-none">
              <div className="absolute top-0 right-0 p-8 text-white/5 opacity-10">
                 <CalendarIcon className="w-40 h-40" />
              </div>
              <div className="relative z-10">
                 <h4 className="text-xs font-black text-indigo-400 uppercase tracking-[0.3em] mb-4">Personnel summary</h4>
                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Avg. monthly</p>
                       <p className="text-xl font-black italic">22.4 Days</p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total OT</p>
                       <p className="text-xl font-black italic">42 Hours</p>
                    </div>
                 </div>
              </div>
              <div className="relative z-10 mt-10 pt-6 border-t border-white/5">
                 <button className="w-full py-4 bg-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20 italic">
                    Export Monthly Ledger
                 </button>
              </div>
           </div>

           <div className="card-premium p-8 border-2 border-slate-50 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Attendance Alerts</h4>
                 <AlertCircle className="w-4 h-4 text-rose-500" />
              </div>
              <div className="space-y-4">
                 <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl">
                    <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-1 italic">Consistent Tardiness</p>
                    <p className="text-xs font-bold text-slate-700">Robert Brown (3 Days)</p>
                 </div>
                 <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl">
                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1 italic">Leave Overlap</p>
                    <p className="text-xs font-bold text-slate-700">Jane Smith (Tomorrow)</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const AttendanceMetric = ({ label, value, sub, icon }: any) => (
  <div className="card-premium p-6 flex flex-col justify-between border-2 border-slate-50 hover:border-indigo-100 transition-all group shadow-xl">
    <div className="flex justify-between items-start mb-6">
       <div className="p-3 bg-white border border-slate-100 rounded-2xl group-hover:scale-110 transition-transform shadow-sm">
          {icon}
       </div>
       <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] italic">{sub}</span>
    </div>
    <div className="space-y-1">
      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</h4>
      <div className="text-3xl font-black text-slate-900 italic tracking-tighter tabular-nums">{value}</div>
    </div>
  </div>
);

