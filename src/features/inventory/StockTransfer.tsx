import React, { useState } from 'react';
import { ArrowRightLeft, Warehouse, Clock, AlertTriangle, ArrowRight, ShieldCheck, Box, Search } from 'lucide-react';
import { cn } from '../../lib/utils';

export const StockTransfer: React.FC = () => {
  const [items, setItems] = useState([
    { id: '1', name: 'Premium Cotton Roll / White', sku: 'CTN-WHT-001', stock: 1200, unit: 'm', qty: 0 }
  ]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Transfer Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card-premium p-8 border-slate-200/60 shadow-xl">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-black text-slate-900 italic tracking-tight">Internal Stock Transfer</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Inter-Location Movement Protocol</p>
              </div>
              <div className="px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-[10px] font-black text-indigo-600 uppercase tracking-widest">
                Draft #TR-9904
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Source Origin</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all appearance-none cursor-pointer">
                    <option>Main Warehouse (Block A)</option>
                    <option>B-Block Storage (High Density)</option>
                    <option>Showroom Alpha</option>
                  </select>
                </div>
                <div className="flex justify-center md:pt-6">
                   <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                      <ArrowRight className="w-5 h-5" />
                   </div>
                </div>
                <div className="space-y-2 md:col-start-2 md:row-start-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Terminal Destination</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all appearance-none cursor-pointer">
                    <option>Sewing Floor (North Wing)</option>
                    <option>Main Warehouse (Block A)</option>
                    <option>Quality Assurance Lab</option>
                    <option>Showroom Alpha</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                    <Box className="w-4 h-4 text-indigo-500" />
                    Manifest Items
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
                    <input type="text" placeholder="Quick Add SKU..." className="pl-8 pr-4 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-bold text-slate-900 outline-none w-40" />
                  </div>
                </div>
                <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm bg-white">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Item Specification</th>
                        <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Available</th>
                        <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest w-40">Transfer qty</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {items.map(item => (
                        <tr key={item.id}>
                          <td className="px-6 py-4">
                            <div className="text-sm font-bold text-slate-900 italic">{item.name}</div>
                            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter mt-0.5">{item.sku}</div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="text-xs font-black text-slate-900 tabular-nums bg-slate-100 px-2 py-1 rounded-lg">
                              {item.stock}{item.unit}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <input 
                              type="number" 
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm font-black text-indigo-600 outline-none tabular-nums focus:ring-4 focus:ring-indigo-500/5 transition-all" 
                              placeholder="0" 
                            />
                          </td>
                          <td className="px-6 py-4 text-center">
                             <button className="text-slate-300 hover:text-rose-500 transition-colors">
                                <ArrowRightLeft className="w-4 h-4" />
                             </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button className="w-full py-4 bg-slate-50 text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] hover:bg-slate-100 transition-all border-t border-slate-50">
                    + Insert Row to Manifest
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex justify-end">
                <button className="px-8 py-4 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-indigo-600 transition-all shadow-xl shadow-slate-900/20">
                  <ShieldCheck className="w-4 h-4" />
                  Validate & Commit Transfer
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="card-premium p-8 bg-slate-900 text-white border-0 shadow-2xl relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full -mr-24 -mb-24 blur-3xl" />
            <Warehouse className="w-10 h-10 text-indigo-400 mb-6" />
            <h3 className="text-lg font-black italic tracking-tight mb-2">Location Logistics</h3>
            <p className="text-slate-400 text-[10px] font-medium uppercase tracking-widest mb-8 leading-relaxed">System-wide monitoring of storage utilization.</p>
            
            <div className="space-y-6 relative z-10">
              {[
                { name: 'Main Warehouse', usage: 92, color: 'bg-rose-500' },
                { name: 'Showroom Alpha', usage: 24, color: 'bg-indigo-400' },
                { name: 'B-Block Storage', usage: 68, color: 'bg-emerald-400' }
              ].map(loc => (
                <div key={loc.name}>
                  <div className="flex justify-between text-[11px] font-black uppercase tracking-widest mb-2">
                    <span className="text-slate-400">{loc.name}</span>
                    <span className={cn(loc.usage > 90 ? "text-rose-400" : "text-white")}>{loc.usage}% Capacity</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full transition-all duration-1000", loc.color)} style={{ width: `${loc.usage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-premium p-8 border-slate-200/60 shadow-sm">
            <h4 className="flex items-center gap-2 text-[10px] font-black text-slate-900 uppercase tracking-widest mb-8">
              <Clock className="w-4 h-4 text-indigo-500" />
              Transfer Registry
            </h4>
            <div className="space-y-5">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-start gap-4 pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                  <div className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center flex-shrink-0 border border-slate-100">
                    <ArrowRightLeft className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-[10px] font-black text-slate-900 uppercase">W1 <ArrowRight className="inline w-3 h-3 mx-1 text-slate-300" /> S1</p>
                      <span className="text-[9px] font-black text-emerald-500 uppercase tracking-tighter">Verified</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold italic leading-none">200 spools Polyester Thread</p>
                    <p className="text-[9px] text-slate-300 mt-2 font-mono tabular-nums uppercase">May 10, 14:30</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3 shadow-sm border-l-4">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
            <div>
               <p className="text-[10px] text-amber-900 font-black uppercase tracking-widest mb-1">Protocol Restriction</p>
               <p className="text-[10px] text-amber-800/70 leading-relaxed font-bold uppercase tracking-tight">
                 Transfers to Quarantine (Q1) require supervisor digital signature validation.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

