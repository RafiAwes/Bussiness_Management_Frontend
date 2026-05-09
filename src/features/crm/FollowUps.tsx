import React, { useState } from 'react';
import { Calendar, CheckCircle2, Clock, Plus, Search, Filter, User, AlertCircle, Trash2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FollowUpTask {
  id: string;
  customer: string;
  task: string;
  dueDate: string;
  status: 'Pending' | 'Done';
  priority: 'High' | 'Medium' | 'Low';
}

const INITIAL_TASKS: FollowUpTask[] = [
  { id: 'TSK-101', customer: 'Zara Global', task: 'Follow up on Spring/Summer PO-8812-24 shipment status', dueDate: '2024-05-10', status: 'Pending', priority: 'High' },
  { id: 'TSK-102', customer: 'Nordstrom', task: 'Send finalized quotation for Winter Denim collection', dueDate: '2024-05-09', status: 'Done', priority: 'High' },
  { id: 'TSK-103', customer: 'Urban Outfitters', task: 'Negotiate price for bulk order (Leads project)', dueDate: '2024-05-12', status: 'Pending', priority: 'Medium' },
  { id: 'TSK-104', customer: 'H&M Stockholm', task: 'Review Q3 volume commitment contract', dueDate: '2024-05-15', status: 'Pending', priority: 'Medium' },
  { id: 'TSK-105', customer: 'GAP Inc.', task: 'Internal recap for regional management board', dueDate: '2024-05-11', status: 'Pending', priority: 'Low' },
  { id: 'TSK-106', customer: 'Selfridges', task: 'Prepare boutique showcase documentation', dueDate: '2024-05-08', status: 'Done', priority: 'Medium' },
];

export const FollowUps: React.FC = () => {
  const [tasks, setTasks] = useState<FollowUpTask[]>(INITIAL_TASKS);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');

  const toggleStatus = (id: string) => {
    setTasks(prev => prev.map(t => 
      t.id === id ? { ...t, status: t.status === 'Done' ? 'Pending' : 'Done' } : t
    ));
  };

  const filteredTasks = tasks.filter(t => 
    t.customer.toLowerCase().includes(search.toLowerCase()) || 
    t.task.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search tasks or stakeholders..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-rose-500/20 transition-all font-medium italic"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="btn-primary bg-slate-900 border-none flex items-center gap-2 shadow-lg hover:bg-rose-600 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {showForm && (
        <div className="card-premium p-6 border-slate-200 bg-slate-50/50 animate-in slide-in-from-top-4 duration-300">
           <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 italic">Define Action Item</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Customer / Stakeholder</label>
                 <input type="text" placeholder="Select Company" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-rose-500/20" />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Deadline Date</label>
                 <input type="date" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-rose-500/20" />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Urgency Tier</label>
                 <select className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-rose-500/20">
                    <option>High Priority</option>
                    <option>Medium Priority</option>
                    <option>Low Priority</option>
                 </select>
              </div>
              <div className="md:col-span-2 lg:col-span-3 space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Task Specification</label>
                 <textarea placeholder="Describe the required interaction or workflow..." className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-rose-500/20 min-h-[80px]" />
              </div>
           </div>
           <div className="flex justify-end mt-8 gap-3">
              <button 
                onClick={() => setShowForm(false)}
                className="px-6 py-2.5 text-xs font-black text-slate-400 uppercase hover:text-slate-600 transition-colors"
              >
                Discard
              </button>
              <button className="px-12 py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-rose-600 transition-all shadow-xl">
                Commit Task
              </button>
           </div>
        </div>
      )}

      <div className="card-premium overflow-hidden shadow-2xl border-slate-200/60">
        <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
           <div className="flex gap-4">
              <div className="flex items-center gap-2">
                 <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-sm" />
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active</span>
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm" />
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Completed</span>
              </div>
           </div>
           <p className="text-[10px] font-black text-slate-400 italic">Sorted by imminent deadline</p>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white border-b border-slate-100 italic">
              <th className="px-6 py-5 w-12"></th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Action Required</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Stakeholder</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Deadline</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Priority</th>
              <th className="px-6 py-5 w-16"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 bg-white">
            {filteredTasks.map((task) => (
              <tr key={task.id} className={cn(
                "group transition-all hover:bg-slate-50/50",
                task.status === 'Done' && "opacity-60 grayscale-[0.5]"
              )}>
                <td className="px-6 py-5">
                   <button 
                    onClick={() => toggleStatus(task.id)}
                    className={cn(
                      "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all shadow-sm",
                      task.status === 'Done' ? "bg-emerald-500 border-emerald-500 text-white" : "bg-white border-slate-200 text-transparent hover:border-indigo-500 hover:text-indigo-200"
                    )}
                   >
                     <CheckCircle2 className="w-4 h-4" />
                   </button>
                </td>
                <td className="px-6 py-5">
                   <div className={cn(
                      "text-sm font-black tracking-tight italic",
                      task.status === 'Done' ? "line-through text-slate-400" : "text-slate-900 underline decoration-slate-100 decoration-4 underline-offset-4"
                   )}>
                      {task.task}
                   </div>
                   <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Task ID: {task.id}</div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                     <div className="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                     </div>
                     <span className="text-xs font-black text-slate-700 uppercase italic">{task.customer}</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-center">
                  <div className="flex flex-col items-center">
                     <span className={cn(
                        "text-[10px] font-black tabular-nums italic",
                        new Date(task.dueDate) < new Date() && task.status === 'Pending' ? "text-rose-500 animate-pulse" : "text-slate-900"
                     )}>
                        {task.dueDate}
                     </span>
                     <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" /> Handover
                     </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className={cn(
                    "text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tighter",
                    task.priority === 'High' ? "bg-rose-50 text-rose-600" :
                    task.priority === 'Medium' ? "bg-amber-50 text-amber-600" :
                    "bg-slate-100 text-slate-400"
                  )}>
                    {task.priority}
                  </span>
                </td>
                <td className="px-6 py-5 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="p-2 text-slate-300 hover:text-rose-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
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
