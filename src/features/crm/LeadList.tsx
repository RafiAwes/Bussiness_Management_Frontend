import React, { useState } from 'react';
import { Search, Filter, Plus, Mail, Phone, MoreVertical, X, ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface Lead {
  id: string;
  name: string;
  company: string;
  contact: string;
  email: string;
  status: 'New' | 'Contacted' | 'Negotiation' | 'Converted';
  value?: number;
  priority: 'High' | 'Medium' | 'Low';
}

const INITIAL_LEADS: Lead[] = [
  { id: 'LD-4001', name: 'James Wilson', company: 'Selfridges', contact: '+44 20 7111 0000', email: 'j.wilson@selfridges.com', status: 'Negotiation', value: 45000, priority: 'High' },
  { id: 'LD-4002', name: 'Maria Garcia', company: 'El Corte Inglés', contact: '+34 91 401 8500', email: 'm.garcia@eci.es', status: 'New', value: 12500, priority: 'Medium' },
  { id: 'LD-4003', name: 'Thomas Müller', company: 'Zalando SE', contact: '+49 30 2000 88 400', email: 't.mueller@zalando.de', status: 'Contacted', value: 85000, priority: 'High' },
  { id: 'LD-4004', name: 'Li Wei', company: 'Alibaba Group', contact: '+86 571 8502 2088', email: 'li.wei@alibaba-inc.com', status: 'Converted', value: 150000, priority: 'High' },
  { id: 'LD-4005', name: 'Sophie Martin', company: 'Galeries Lafayette', contact: '+33 1 42 82 34 56', email: 's.martin@galeries.fr', status: 'Negotiation', value: 32000, priority: 'Medium' },
  { id: 'LD-4006', name: 'Kenzo Tanaka', company: 'Isetan Mitsukoshi', contact: '+81 3-3352-1111', email: 'tanaka.k@isetan.jp', status: 'New', value: 28000, priority: 'Low' },
];

export const LeadList: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [newLead, setNewLead] = useState({
    name: '',
    company: '',
    email: '',
    contact: '',
    status: 'New' as Lead['status'],
    priority: 'Medium' as Lead['priority'],
    value: ''
  });

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    const lead: Lead = {
      id: `LD-${4000 + leads.length + 1}`,
      name: newLead.name,
      company: newLead.company,
      email: newLead.email,
      contact: newLead.contact,
      status: newLead.status,
      priority: newLead.priority,
      value: parseFloat(newLead.value) || 0
    };
    setLeads([lead, ...leads]);
    setShowForm(false);
    setNewLead({ name: '', company: '', email: '', contact: '', status: 'New', priority: 'Medium', value: '' });
  };

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(search.toLowerCase()) || 
    l.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search leads..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="btn-primary flex items-center gap-2 shadow-lg shadow-indigo-500/10"
          >
            <Plus className="w-4 h-4" />
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* Modal Overlay */}
      {showForm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[40px] w-full max-w-2xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-white relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
               <div>
                  <h3 className="text-2xl font-black text-slate-900 italic tracking-tighter uppercase">New Opportunity</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-2 italic">CRM Pipeline Entry Protocol</p>
               </div>
               <button 
                onClick={() => setShowForm(false)}
                className="p-3 hover:bg-slate-100 rounded-full transition-all text-slate-400"
               >
                 <X className="w-6 h-6" />
               </button>
            </div>

            <form onSubmit={handleAddLead} className="p-12 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Lead Identity</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Full Name"
                    value={newLead.name}
                    onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-indigo-500 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Global Entity (Company)</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Harrods"
                    value={newLead.company}
                    onChange={(e) => setNewLead({ ...newLead, company: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-indigo-500 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Liaison Email</label>
                  <input 
                    required
                    type="email" 
                    placeholder="contact@entity.com"
                    value={newLead.email}
                    onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-indigo-500 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Potential Value ($)</label>
                  <input 
                    required
                    type="number" 
                    placeholder="e.g. 50000"
                    value={newLead.value}
                    onChange={(e) => setNewLead({ ...newLead, value: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-indigo-500 transition-all tabular-nums"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Lifecycle Stage</label>
                  <select 
                    value={newLead.status}
                    onChange={(e) => setNewLead({ ...newLead, status: e.target.value as Lead['status'] })}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-indigo-500 appearance-none transition-all cursor-pointer"
                  >
                    <option>New</option>
                    <option>Contacted</option>
                    <option>Negotiation</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Network Priority</label>
                  <select 
                    value={newLead.priority}
                    onChange={(e) => setNewLead({ ...newLead, priority: e.target.value as Lead['priority'] })}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-indigo-500 appearance-none transition-all cursor-pointer"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
              </div>

              <div className="pt-8 flex gap-6">
                <button 
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 border-2 border-transparent hover:border-slate-100 rounded-3xl transition-all italic"
                >
                  Discard
                </button>
                <button 
                  type="submit"
                  className="flex-[2] py-5 bg-slate-900 text-white rounded-3xl text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl hover:scale-105 active:scale-95 transition-all italic flex items-center justify-center gap-3"
                >
                  <Plus className="w-5 h-5" />
                  Register Opportunity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card-premium overflow-hidden shadow-xl border-slate-200/60">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Lead / Opportunity</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Stakeholder</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact Pipeline</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Stage</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Potential</th>
              <th className="px-6 py-5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-5">
                   <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        lead.priority === 'High' ? "bg-rose-500 animate-pulse" : 
                        lead.priority === 'Medium' ? "bg-amber-500" : "bg-slate-300"
                      )} />
                      <div>
                        <div className="text-sm font-black text-slate-900 italic tracking-tight">{lead.company}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{lead.id}</div>
                      </div>
                   </div>
                </td>
                <td className="px-6 py-5">
                  <div className="text-sm font-semibold text-slate-700">{lead.name}</div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Mail className="w-3 h-3 text-slate-300" /> {lead.email}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Phone className="w-3 h-3 text-slate-300" /> {lead.contact}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className={cn(
                    "text-[9px] font-black px-2.5 py-1 rounded-full border uppercase tracking-widest shadow-sm",
                    lead.status === 'Converted' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                    lead.status === 'Negotiation' ? "bg-amber-50 text-amber-600 border-amber-100" :
                    lead.status === 'Contacted' ? "bg-indigo-50 text-indigo-600 border-indigo-100" :
                    "bg-slate-50 text-slate-400 border-slate-200"
                  )}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-right font-black text-slate-900 tabular-nums text-sm italic">
                  ${lead.value?.toLocaleString()}
                </td>
                <td className="px-6 py-5 text-right opacity-0 group-hover:opacity-100 transition-all">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-indigo-600 transition-all border border-transparent hover:border-slate-100">
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-slate-900">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
