import React, { useState } from 'react';
import { Search, Filter, UserPlus, MoreVertical, Mail, Phone, ExternalLink, Tag, Globe, Star, ShieldCheck, TrendingUp, X } from 'lucide-react';
import { cn } from '../../lib/utils';

const INITIAL_CUSTOMERS = [
  { id: 'CUST-001', name: 'Alina Torson', company: 'Zara International', email: 'alina.t@zara.com', phone: '+34 91 110 2300', totalOrders: 142, status: 'Active', segment: 'VIP', lastContact: '2 days ago', revenue: 1250000 },
  { id: 'CUST-002', name: 'Mark Schmidt', company: 'Nordstrom', email: 'mark.s@nordstrom.com', phone: '+1 206-628-1000', totalOrders: 89, status: 'Active', segment: 'Wholesale', lastContact: 'Today', revenue: 640000 },
  { id: 'CUST-003', name: 'Jean Pierre', company: 'H&M Global', email: 'jean.p@hm.com', phone: '+46 8 796 55 00', totalOrders: 230, status: 'Active', segment: 'VIP', lastContact: '1 week ago', revenue: 2100000 },
  { id: 'CUST-004', name: 'Sarah Jenkins', company: 'GAP Inc.', email: 'sjenkins@gap.com', phone: '+1 415-427-5000', totalOrders: 56, status: 'Inactive', segment: 'Retail', lastContact: '1 month ago', revenue: 120000 },
  { id: 'CUST-005', name: 'Robert Fox', company: 'Urban Outfitters', email: 'rfox@urbn.com', phone: '+1 215-454-5500', totalOrders: 12, status: 'Lead', segment: 'Wholesale', lastContact: '3 hours ago', revenue: 45000 },
  { id: 'CUST-006', name: 'Emily Chen', company: 'Lane Crawford', email: 'e.chen@lanecrawford.hk', phone: '+852 2118 3388', totalOrders: 42, status: 'Active', segment: 'VIP', lastContact: '5 hours ago', revenue: 890000 },
];

export const CustomerList: React.FC<{ onViewProfile: (id: string) => void }> = ({ onViewProfile }) => {
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [search, setSearch] = useState('');
  const [filterSegment, setFilterSegment] = useState<string>('All');
  const [isAddingAccount, setIsAddingAccount] = useState(false);
  const [newAccount, setNewAccount] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    segment: 'Retail' as 'VIP' | 'Wholesale' | 'Retail'
  });

  const filteredCustomers = customers.filter(cust => {
    const matchesSearch = cust.name.toLowerCase().includes(search.toLowerCase()) || 
                          cust.company.toLowerCase().includes(search.toLowerCase());
    const matchesSegment = filterSegment === 'All' || cust.segment === filterSegment;
    return matchesSearch && matchesSegment;
  });

  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `CUST-${String(customers.length + 1).padStart(3, '0')}`;
    const account = {
      ...newAccount,
      id,
      totalOrders: 0,
      status: 'Active',
      lastContact: 'Just now',
      revenue: 0
    };
    setCustomers([account, ...customers]);
    setIsAddingAccount(false);
    setNewAccount({ name: '', company: '', email: '', phone: '', segment: 'Retail' });
  };

  return (
    <div className="space-y-6 relative">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search global accounts..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border-2 border-slate-100 rounded-2xl text-sm outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 transition-all font-black italic tracking-tight"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 p-1 rounded-xl">
             {['All', 'VIP', 'Wholesale', 'Retail'].map((s) => (
               <button 
                key={s}
                onClick={() => setFilterSegment(s)}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                  filterSegment === s ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                )}
               >
                 {s}
               </button>
             ))}
          </div>
          <button 
            onClick={() => setIsAddingAccount(true)}
            className="btn-primary bg-slate-900 border-none flex items-center gap-2 shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            <UserPlus className="w-4 h-4" />
            <span className="text-[10px] uppercase font-black tracking-widest">New Account</span>
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <CustomerMetric label="Managed Accounts" value={customers.length.toLocaleString()} sub="Global" icon={<Globe className="text-blue-500" />} />
        <CustomerMetric label="VIP Partnerships" value={customers.filter(c => c.segment === 'VIP').length} sub="Top Tier" icon={<Star className="text-amber-500" />} />
        <CustomerMetric label="Client Health" value="98.2%" sub="Retention" icon={<ShieldCheck className="text-emerald-500" />} />
        <CustomerMetric label="Forecast Value" value={`$${(customers.reduce((acc, c) => acc + c.revenue, 0) / 1000000).toFixed(1)}M`} sub="Total Pipeline" icon={<TrendingUp className="text-indigo-500" />} />
      </div>

      {/* Customers Table */}
      <div className="card-premium overflow-hidden border-2 border-slate-100 shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] italic">Account Stakeholder</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] italic">Commercial Entity</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] italic">Market segment</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] italic text-center">Fulfillment Count</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] italic text-right">Revenue (LTV)</th>
              <th className="px-6 py-5 w-16"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredCustomers.map((cust) => (
              <tr key={cust.id} className="hover:bg-slate-50/80 transition-colors group">
                <td className="px-6 py-5">
                  <button 
                    onClick={() => onViewProfile(cust.id)}
                    className="flex items-center gap-4 text-left"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-xs font-black text-slate-900 border-2 border-white shadow-sm uppercase italic">
                      {cust.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-sm font-black text-slate-900 italic tracking-tight group-hover:text-indigo-600 transition-colors">{cust.name}</div>
                      <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{cust.email}</div>
                    </div>
                  </button>
                </td>
                <td className="px-6 py-5">
                  <div className="text-xs font-black text-slate-700 uppercase italic tracking-widest">{cust.company}</div>
                </td>
                <td className="px-6 py-5">
                   <div className="flex items-center gap-2">
                      <Tag className={cn(
                        "w-3 h-3",
                        cust.segment === 'VIP' ? "text-amber-500" :
                        cust.segment === 'Wholesale' ? "text-indigo-500" : "text-slate-400"
                      )} />
                      <span className={cn(
                        "text-[9px] font-black uppercase tracking-widest italic",
                        cust.segment === 'VIP' ? "text-amber-600" :
                        cust.segment === 'Wholesale' ? "text-indigo-600" : "text-slate-500"
                      )}>
                        {cust.segment}
                      </span>
                   </div>
                </td>
                <td className="px-6 py-5 text-center tabular-nums font-black text-slate-900 text-sm italic">
                  {cust.totalOrders}
                </td>
                <td className="px-6 py-5 text-right font-black text-slate-900 tabular-nums text-sm italic">
                  ${(cust.revenue / 1000).toFixed(0)}k
                </td>
                <td className="px-6 py-5 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => onViewProfile(cust.id)} className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-indigo-600 transition-all border border-transparent hover:border-slate-100">
                    <ExternalLink className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Account Modal */}
      {isAddingAccount && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b-2 border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="text-xl font-black text-slate-900 italic tracking-tight">Onboard New Global Account</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Expanding the DressTown Ecosystem</p>
              </div>
              <button 
                onClick={() => setIsAddingAccount(false)}
                className="p-3 hover:bg-white rounded-2xl text-slate-400 hover:text-slate-900 transition-all shadow-sm border border-transparent hover:border-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddAccount} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Primary Stakeholder</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Alexander McQueen"
                    value={newAccount.name}
                    onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Commercial Entity</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Fashion Group LLC"
                    value={newAccount.company}
                    onChange={(e) => setNewAccount({ ...newAccount, company: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Communication Channel (Email)</label>
                  <input 
                    required
                    type="email" 
                    placeholder="stakeholder@entity.com"
                    value={newAccount.email}
                    onChange={(e) => setNewAccount({ ...newAccount, email: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Global Mobile ID</label>
                  <input 
                    required
                    type="tel" 
                    placeholder="+44 20 7123 4567"
                    value={newAccount.phone}
                    onChange={(e) => setNewAccount({ ...newAccount, phone: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Market Segment Classification</label>
                <div className="grid grid-cols-3 gap-4">
                  {['Retail', 'Wholesale', 'VIP'].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setNewAccount({ ...newAccount, segment: s as any })}
                      className={cn(
                        "py-4 rounded-2xl border-2 font-black uppercase text-[10px] tracking-widest transition-all",
                        newAccount.segment === s 
                          ? "bg-slate-900 border-slate-900 text-white shadow-xl scale-105" 
                          : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button 
                  type="button"
                  onClick={() => setIsAddingAccount(false)}
                  className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 border-2 border-transparent hover:border-slate-100 rounded-2xl transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:scale-105 active:scale-95 transition-all italic"
                >
                  Confirm Global Activation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const CustomerMetric = ({ label, value, sub, icon }: any) => (
  <div className="card-premium p-6 hover:shadow-xl transition-all border-2 border-slate-50 group">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-white border border-slate-100 rounded-2xl group-hover:scale-110 transition-transform shadow-sm">
        {icon}
      </div>
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">
        {sub}
      </span>
    </div>
    <div className="space-y-1">
      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</h4>
      <div className="text-2xl font-black text-slate-900 italic tracking-tight">{value}</div>
    </div>
  </div>
);
