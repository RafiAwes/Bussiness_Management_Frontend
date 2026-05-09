import React, { useState } from 'react';
import { Users, Shield, Briefcase, TrendingUp, Info, ChevronRight, UserPlus, Layers, X, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';

const INITIAL_DEPARTMENTS = [
  { 
    id: 'D1', 
    name: 'Sales (Showroom)', 
    manager: 'Sarah Smith', 
    staffCount: 12, 
    color: 'indigo',
    roles: ['Manager', 'Sales Executive', 'Staff']
  },
  { 
    id: 'D2', 
    name: 'Accounts', 
    manager: 'Mike Johnson', 
    staffCount: 4, 
    color: 'emerald',
    roles: ['Chief Accountant', 'Accountant', 'Apprentice']
  },
  { 
    id: 'D3', 
    name: 'Admin', 
    manager: 'John Doe', 
    staffCount: 6, 
    color: 'amber',
    roles: ['HR Manager', 'Ops Coordinator', 'Admin Staff']
  },
  { 
    id: 'D4', 
    name: 'Logistics', 
    manager: 'Robert Brown', 
    staffCount: 15, 
    color: 'rose',
    roles: ['Warehouse Lead', 'Loader', 'Driver']
  },
];

export const DepartmentRoles: React.FC = () => {
  const [departments, setDepartments] = useState(INITIAL_DEPARTMENTS);
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [newDept, setNewDept] = useState({
    name: '',
    manager: '',
    color: 'indigo',
    roles: ''
  });

  const handleProvision = (e: React.FormEvent) => {
    e.preventDefault();
    const dept = {
      id: `D${departments.length + 1}`,
      name: newDept.name,
      manager: newDept.manager,
      staffCount: 0,
      color: newDept.color,
      roles: newDept.roles.split(',').map(r => r.trim()).filter(r => r)
    };
    setDepartments([...departments, dept]);
    setIsProvisioning(false);
    setNewDept({ name: '', manager: '', color: 'indigo', roles: '' });
  };

  return (
    <div className="page-container">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-black text-slate-900 italic tracking-tighter">Organizational Architecture</h3>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Tiered Departmental Hierarchy & Role Access</p>
        </div>
        <button 
          onClick={() => setIsProvisioning(true)}
          className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          Provision New Entity
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {departments.map((dept) => (
          <div key={dept.id} className="card-premium p-8 hover:shadow-2xl transition-all border-2 border-slate-50 relative group">
            <div className={cn(
              "absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform duration-500",
              dept.color === 'indigo' ? "text-indigo-500" :
              dept.color === 'emerald' ? "text-emerald-500" :
              dept.color === 'amber' ? "text-amber-500" : "text-rose-500"
            )}>
              <Layers className="w-32 h-32" />
            </div>

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-5">
                  <div className={cn(
                    "w-16 h-16 rounded-3xl flex items-center justify-center shadow-lg",
                    dept.color === 'indigo' ? "bg-indigo-500 text-white" :
                    dept.color === 'emerald' ? "bg-emerald-500 text-white" :
                    dept.color === 'amber' ? "bg-amber-500 text-white" : "bg-rose-500 text-white"
                  )}>
                    <Briefcase className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-slate-900 italic tracking-tighter">{dept.name}</h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1 italic">Dept. Head: {dept.manager}</p>
                  </div>
                </div>
                <div className="text-right">
                   <div className="text-2xl font-black text-slate-900 tabular-nums italic">{dept.staffCount}</div>
                   <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Personnel</div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] pl-1 border-b-2 border-slate-100 pb-3">Operational Role Matrix</p>
                <div className="flex flex-wrap gap-3">
                  {dept.roles.map((role) => (
                    <div key={role} className="flex items-center gap-3 px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl hover:border-indigo-200 transition-all cursor-default">
                       <Shield className={cn(
                         "w-3.5 h-3.5",
                         dept.color === 'indigo' ? "text-indigo-500" :
                         dept.color === 'emerald' ? "text-emerald-500" :
                         dept.color === 'amber' ? "text-amber-500" : "text-rose-500"
                       )} />
                       <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">{role}</span>
                    </div>
                  ))}
                  <button className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:border-indigo-400 hover:text-indigo-600 transition-all">
                    <Info className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Add Capability</span>
                  </button>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Efficiency: 94.2%</span>
                 </div>
                 <button className="text-[10px] font-black text-slate-900 underline underline-offset-4 decoration-2 decoration-indigo-500 hover:text-indigo-600 transition-colors uppercase tracking-[0.2em] flex items-center gap-1 group">
                    Entity Configuration
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Provision Modal */}
      {isProvisioning && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[40px] w-full max-w-2xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-10 border-b-2 border-slate-50 relative bg-slate-950 flex items-center justify-between overflow-hidden text-white">
               <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-32 -mt-32 blur-3xl opacity-30" />
               <div className="relative z-10 flex items-center gap-6">
                  <div className="w-16 h-16 bg-white/10 rounded-[24px] flex items-center justify-center backdrop-blur-md border border-white/20">
                    <Layers className="w-8 h-8 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black italic tracking-tighter uppercase whitespace-nowrap">Entity Provisioning</h3>
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] mt-2 italic">Organizational Structure Expansion</p>
                  </div>
               </div>
               <button 
                onClick={() => setIsProvisioning(false)}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all relative z-10"
               >
                 <X className="w-6 h-6" />
               </button>
            </div>

            <form onSubmit={handleProvision} className="p-12 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Department/Entity Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Quality Control"
                    value={newDept.name}
                    onChange={(e) => setNewDept({ ...newDept, name: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-indigo-600 transition-all font-sans"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Primary Managerial Identity</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Alex Henderson"
                    value={newDept.manager}
                    onChange={(e) => setNewDept({ ...newDept, manager: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-indigo-600 transition-all font-sans"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Visual Branding Color</label>
                  <select 
                    value={newDept.color}
                    onChange={(e) => setNewDept({ ...newDept, color: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-indigo-600 appearance-none transition-all cursor-pointer"
                  >
                    <option value="indigo">Indigo Corporate</option>
                    <option value="emerald">Emerald Growth</option>
                    <option value="amber">Amber Warning</option>
                    <option value="rose">Rose Critical</option>
                    <option value="purple">Purple Premium</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Role Matrix (Comma Separated)</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Lead, Staff, Trainee"
                    value={newDept.roles}
                    onChange={(e) => setNewDept({ ...newDept, roles: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-indigo-600 transition-all font-sans"
                  />
                </div>
              </div>

              <div className="pt-8 flex gap-6">
                <button 
                  type="button"
                  onClick={() => setIsProvisioning(false)}
                  className="flex-1 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 border-2 border-transparent hover:border-slate-100 rounded-3xl transition-all italic"
                >
                  Discard Provision
                </button>
                <button 
                  type="submit"
                  className="flex-[2] py-5 bg-indigo-600 text-white rounded-3xl text-[10px] font-black uppercase tracking-[0.3em] shadow-[0_20px_40px_-5px_rgba(79,70,229,0.4)] hover:scale-105 active:scale-95 transition-all italic flex items-center justify-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Finalize Entity Creation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
