import React, { useState } from 'react';
import { Search, Plus, MapPin, Phone, Star, Building2, ExternalLink, ChevronRight, X, Globe, Mail, ShieldCheck, History, BarChart3, ArrowLeft, Filter } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  location: string;
  status: 'Active' | 'On Hold' | 'Under Review';
  category: string;
  rating: number;
  orders: number;
  onTime: string;
}

const INITIAL_SUPPLIERS: Supplier[] = [
  { id: 'FAC-001', name: 'Elite Apparels Ltd', contact: '+880 171 234567', email: 'ops@elite.com', location: 'Dhaka, BD', status: 'Active', category: 'Woven', rating: 4.8, orders: 12, onTime: '98%' },
  { id: 'FAC-002', name: 'Oceanic Knitwear', contact: '+880 31 654321', email: 'supply@oceanic.knit', location: 'Chittagong, BD', status: 'Active', category: 'Knits', rating: 4.5, orders: 8, onTime: '92%' },
  { id: 'FAC-003', name: 'Global Denim Hub', contact: '+880 2 9876543', email: 'bd@globaldenim.com', location: 'Gazipur, BD', status: 'On Hold', category: 'Denim', rating: 4.2, orders: 5, onTime: '85%' },
  { id: 'FAC-004', name: 'Smart Stitching', contact: '+880 181 998877', email: 'hello@smartstitch.bd', location: 'Narayanganj, BD', status: 'Active', category: 'Formal Wear', rating: 4.9, orders: 15, onTime: '100%' },
  { id: 'FAC-005', name: 'EcoFabric Solutions', contact: '+880 191 112233', email: 'eco@fabrics.co', location: 'Savar, BD', status: 'Under Review', category: 'Cotton', rating: 3.8, orders: 2, onTime: '75%' },
  { id: 'FAC-006', name: 'Prime Textiles Ltd', contact: '+880 151 445566', email: 'contact@primetextile.com', location: 'Comilla, BD', status: 'Active', category: 'Mixed', rating: 4.6, orders: 10, onTime: '95%' },
];

export const SupplierDirectory: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>(INITIAL_SUPPLIERS);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newSupplier, setNewSupplier] = useState({ name: '', contact: '', email: '', location: '', category: 'Woven' });

  const handleAddSupplier = (e: React.FormEvent) => {
    e.preventDefault();
    const supplier: Supplier = {
      id: `FAC-00${suppliers.length + 1}`,
      name: newSupplier.name,
      contact: newSupplier.contact,
      email: newSupplier.email,
      location: newSupplier.location,
      status: 'Under Review',
      category: newSupplier.category,
      rating: 0,
      orders: 0,
      onTime: '0%'
    };
    setSuppliers([...suppliers, supplier]);
    setShowForm(false);
    setNewSupplier({ name: '', contact: '', email: '', location: '', category: 'Woven' });
  };

  if (selectedSupplier) {
    return (
      <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
        <button 
          onClick={() => setSelectedSupplier(null)}
          className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Directory
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="card-premium p-8 border-slate-200/60 shadow-xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 blur-2xl" />
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white italic font-black text-xl">
                    {selectedSupplier.name[0]}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 italic tracking-tight">{selectedSupplier.name}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 mt-1">
                      <MapPin className="w-3 h-3 text-indigo-500" /> {selectedSupplier.location}
                    </p>
                  </div>
                </div>
                <span className={cn(
                  "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm",
                  selectedSupplier.status === 'Active' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-slate-50 text-slate-400 border-slate-100"
                )}>
                  {selectedSupplier.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-100">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Expertise</p>
                    <p className="text-sm font-black text-slate-900 italic">{selectedSupplier.category}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Network Rating</p>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-black italic">{selectedSupplier.rating} / 5.0</span>
                    </div>
                  </div>
                  <div className="space-y-1 text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Liaison</p>
                    <p className="text-sm font-bold text-indigo-600">{selectedSupplier.email}</p>
                  </div>
              </div>
            </div>

            <div className="card-premium p-8 border-slate-200/60 shadow-xl">
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 italic flex items-center gap-2">
                <History className="w-4 h-4 text-slate-400" /> Assigned Fulfillment History
              </h4>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-200 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-[10px] font-black text-slate-400 font-mono italic">
                        FPO-{2024 - i}
                      </div>
                      <div>
                        <p className="text-[11px] font-black text-slate-900 italic tracking-tight">Q{4-i} Seasonal Collection Batch</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Completed May {12+i}, 2024</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-900 tabular-nums">$42,500.00</p>
                      <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">QC Passed</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="card-premium p-8 border-slate-200/60 shadow-xl bg-slate-900 text-white border-0">
              <h4 className="text-sm font-black uppercase tracking-widest italic mb-6">Partner Scorecard</h4>
              <div className="space-y-8">
                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span className="text-slate-400">On-Time Delivery</span>
                    <span>{selectedSupplier.onTime}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full" style={{ width: selectedSupplier.onTime }} />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span className="text-slate-400">Total Orders Settled</span>
                    <span>{selectedSupplier.orders}</span>
                  </div>
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full bg-white/20 border-2 border-slate-900 flex items-center justify-center text-[8px] font-black italic">DT</div>
                    ))}
                    <div className="w-8 h-8 rounded-full bg-indigo-500 border-2 border-slate-900 flex items-center justify-center text-[8px] font-black italic">+{selectedSupplier.orders - 5}</div>
                  </div>
                </div>
              </div>
              <button className="w-full py-4 mt-8 bg-indigo-500 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-slate-900 transition-all">
                Audit Inspection Log
              </button>
            </div>

            <div className="card-premium p-8 border-slate-200/60 shadow-xl">
               <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 italic">Quick Contact</h4>
               <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <Phone className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs font-black text-slate-700 italic">{selectedSupplier.contact}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <Globe className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs font-black text-slate-700 italic">www.{selectedSupplier.name.toLowerCase().replace(/ /g, '')}.com</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search partner factories, expertise, or IDs..." 
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none italic shadow-sm"
            />
          </div>
          <button className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all">
            <Filter className="w-3.5 h-3.5" /> Filter Matrix
          </button>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className={cn(
            "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 transition-all shadow-lg",
            showForm ? "bg-rose-500 text-white hover:bg-rose-600" : "bg-slate-900 text-white hover:bg-indigo-600"
          )}
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? 'Cancel Onboarding' : 'Onboard New Factory'}
        </button>
      </div>

      {/* Onboarding Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[40px] w-full max-w-2xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-10 border-b-2 border-slate-50 relative bg-slate-50 flex items-center justify-between overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
               <div className="relative z-10 flex items-center gap-6">
                  <div className="w-16 h-16 bg-slate-900 text-white rounded-[24px] flex items-center justify-center shadow-xl">
                    <Building2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 italic tracking-tighter uppercase whitespace-nowrap">Factory Onboarding</h3>
                    <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em] mt-2 italic">Global Partner Ecosystem Protocol</p>
                  </div>
               </div>
               <button 
                onClick={() => setShowForm(false)}
                className="p-3 hover:bg-slate-200 rounded-full transition-all relative z-10 text-slate-400"
               >
                 <X className="w-6 h-6" />
               </button>
            </div>

            <form onSubmit={handleAddSupplier} className="p-12 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Manufacturing Entity Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Apex Textiles Ltd"
                      value={newSupplier.name}
                      onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
                      className="w-full pl-12 pr-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-indigo-500 transition-all font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Primary Liaison Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      required
                      type="email" 
                      placeholder="operations@factory.com"
                      value={newSupplier.email}
                      onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
                      className="w-full pl-12 pr-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-indigo-500 transition-all font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Geographic Region / Site</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Gazipur, BD"
                      value={newSupplier.location}
                      onChange={(e) => setNewSupplier({ ...newSupplier, location: e.target.value })}
                      className="w-full pl-12 pr-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-indigo-500 transition-all font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Operational Expertise</label>
                  <div className="relative">
                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select 
                      value={newSupplier.category}
                      onChange={(e) => setNewSupplier({ ...newSupplier, category: e.target.value })}
                      className="w-full pl-12 pr-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-indigo-500 appearance-none transition-all cursor-pointer"
                    >
                      <option value="Woven">Woven / Tailored</option>
                      <option value="Knits">Knits / Jersey</option>
                      <option value="Denim">Denim Specialists</option>
                      <option value="Formal Wear">Formal / Evening Wear</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-8 flex gap-6">
                <button 
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 border-2 border-transparent hover:border-slate-100 rounded-3xl transition-all italic"
                >
                  Abort Onboarding
                </button>
                <button 
                  type="submit"
                  className="flex-[2] py-5 bg-slate-900 text-white rounded-3xl text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl hover:scale-105 active:scale-95 transition-all italic flex items-center justify-center gap-3"
                >
                  <Plus className="w-5 h-5" />
                  Execute System Integration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card-premium border-slate-200/60 shadow-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Partner Factory</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Liaison</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Expertise Cell</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Protocol Status</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Orders Portfolio</th>
              <th className="px-6 py-5 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {suppliers.map((supplier) => (
              <tr 
                key={supplier.id} 
                onClick={() => setSelectedSupplier(supplier)}
                className="hover:bg-slate-50 transition-all group cursor-pointer"
              >
                <td className="px-6 py-6">
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-slate-950 italic tracking-tight">{supplier.name}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-1.5 mt-1">
                      <MapPin className="w-3 h-3 text-slate-300" /> {supplier.location}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-slate-900 italic mb-1">{supplier.email}</span>
                    <span className="text-[10px] font-bold text-slate-400 tabular-nums">{supplier.contact}</span>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <span className="text-[10px] font-black px-3 py-1 bg-slate-100 text-slate-600 rounded-lg uppercase tracking-tight italic">
                    {supplier.category}
                  </span>
                </td>
                <td className="px-6 py-6 text-center">
                  <div className="flex justify-center">
                    <span className={cn(
                      "text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border shadow-sm",
                      supplier.status === 'Active' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                      supplier.status === 'On Hold' ? "bg-amber-50 text-amber-600 border-amber-100" :
                      "bg-slate-50 text-slate-500 border-slate-100"
                    )}>
                      {supplier.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-6 text-right">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-black text-slate-900 tabular-nums">{supplier.orders} Booked</span>
                    <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">{supplier.onTime} Reliability</span>
                  </div>
                </td>
                <td className="px-6 py-6 text-right">
                   <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-all" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-premium p-6 border-slate-200/60 shadow-lg">
           <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-5 h-5 text-indigo-500" />
              <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-widest italic">Compliance Drift</h5>
           </div>
           <p className="text-2xl font-black text-slate-950 italic">94.8%</p>
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Aggregate Factory Standards</p>
        </div>
        <div className="card-premium p-6 border-emerald-100 bg-emerald-50/20 shadow-lg">
           <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <h5 className="text-[10px] font-black text-emerald-900 uppercase tracking-widest italic">Secure Network</h5>
           </div>
           <p className="text-2xl font-black text-emerald-950 italic">100% Audit</p>
           <p className="text-[10px] font-bold text-emerald-600/60 uppercase tracking-widest mt-2">Certified Tier-1 Factories</p>
        </div>
        <div className="card-premium p-6 border-slate-200/60 shadow-lg relative overflow-hidden">
           <div className="absolute top-0 right-0 w-24 h-24 bg-slate-100 rounded-full -mr-12 -mt-12 blur-xl" />
           <div className="flex items-center gap-3 mb-4">
              <History className="w-5 h-5 text-slate-400" />
              <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-widest italic">Pending Syncs</h5>
           </div>
           <p className="text-2xl font-black text-slate-950 italic">0</p>
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">All Remote Logs Synchronized</p>
        </div>
      </div>
    </div>
  );
};
