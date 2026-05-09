import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Calendar, 
  History, 
  MessageSquare, 
  FileText, 
  TrendingUp,
  Tag,
  Video,
  Download,
  Plus,
  MoreVertical,
  Activity,
  CheckCircle2,
  AlertCircle,
  Users
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface ActivityEntry {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note';
  content: string;
  date: string;
  user: string;
}

const DUMMY_ACTIVITIES: ActivityEntry[] = [
  { id: 'ACT-1', type: 'call', content: 'Discussed Summer PO volume adjustments. Client requested 15% increase on linen shirts.', date: '2024-05-08 10:30 AM', user: 'Sarah J.' },
  { id: 'ACT-2', type: 'email', content: 'Sent Winter Denim collection lookbook and preliminary pricing tiered by volume.', date: '2024-05-07 02:15 PM', user: 'Sarah J.' },
  { id: 'ACT-3', type: 'note', content: 'VIP status confirmed after hitting $1M LTV milestone. Priority logistics enabled.', date: '2024-05-05 09:00 AM', user: 'System' },
  { id: 'ACT-4', type: 'meeting', content: 'Quarterly review at Arteixo HQ. High satisfaction with last shipment quality.', date: '2024-05-02 11:00 AM', user: 'Mike R.' },
];

export const CustomerProfile: React.FC<{ customerId: string; onBack: () => void }> = ({ customerId, onBack }) => {
  const [activeTab, setActiveTab] = useState<'history' | 'activity' | 'legal'>('history');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Back Button & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2.5 hover:bg-white bg-slate-50 border border-slate-100 rounded-xl transition-all text-slate-400 hover:text-slate-900 shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-black text-slate-900 italic tracking-tight">Alina Torson</h2>
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">
              <span>Primary Stakeholder</span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded italic">Zara International Group</span>
            </div>
          </div>
        </div>
        
        {/* Action Bar - Communication UI */}
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl shadow-xl">
           <button className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded-xl text-white transition-all">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px] font-black uppercase tracking-widest">Voice Call</span>
           </button>
           <button className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded-xl text-white transition-all border-x border-white/5">
              <Mail className="w-4 h-4 text-indigo-400" />
              <span className="text-[10px] font-black uppercase tracking-widest">Message</span>
           </button>
           <button className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded-xl text-white transition-all">
              <Video className="w-4 h-4 text-rose-400" />
              <span className="text-[10px] font-black uppercase tracking-widest">Sync-Up</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card-premium p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
               <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors">
                  <MoreVertical className="w-4 h-4" />
               </button>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-28 h-28 rounded-3xl bg-slate-900 border-4 border-white shadow-2xl flex items-center justify-center text-4xl font-black text-white italic">
                  AT
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-indigo-500 text-white rounded-2xl border-4 border-white flex items-center justify-center animate-bounce-slow">
                   <TrendingUp className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-xl font-black text-slate-900 italic tracking-tight mb-1">Alina Torson</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Regional Procurement Lead</p>
            </div>

            <div className="pt-8 mt-8 border-t border-slate-50 space-y-5">
              <div className="flex items-center gap-4 group/item">
                <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center group-hover/item:bg-indigo-50 group-hover/item:border-indigo-100 transition-all">
                  <Mail className="w-4 h-4 text-slate-400 group-hover/item:text-indigo-600" />
                </div>
                <span className="text-xs font-bold text-slate-600 truncate">alina.t@zara.com</span>
              </div>
              <div className="flex items-center gap-4 group/item">
                <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center group-hover/item:bg-emerald-50 group-hover/item:border-emerald-100 transition-all">
                  <Phone className="w-4 h-4 text-slate-400 group-hover/item:text-emerald-600" />
                </div>
                <span className="text-xs font-bold text-slate-600">+34 91 110 2300</span>
              </div>
              <div className="flex items-center gap-4 group/item">
                <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center group-hover/item:bg-rose-50 group-hover/item:border-rose-100 transition-all">
                  <MapPin className="w-4 h-4 text-slate-400 group-hover/item:text-rose-600" />
                </div>
                <span className="text-[10px] font-black text-slate-600 leading-tight uppercase tracking-tighter">Arteixo, Spain <br/>Global HQ Office</span>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-50 space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Relationship Segmentation</label>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-amber-900/5 text-amber-700 text-[9px] font-black uppercase rounded-lg border border-amber-900/10 italic">Tier 1: VIP</span>
                <span className="px-3 py-1 bg-emerald-900/5 text-emerald-700 text-[9px] font-black uppercase rounded-lg border border-emerald-900/10 italic">Wholesale</span>
                <span className="px-3 py-1 bg-indigo-900/5 text-indigo-700 text-[9px] font-black uppercase rounded-lg border border-indigo-900/10 italic">European Hub</span>
              </div>
            </div>
          </div>

          <div className="card-premium p-8 bg-slate-900 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-1000" />
            <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-6">Commercial Analytics</h4>
            <div className="space-y-6 relative z-10">
              <div>
                <div className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-widest">Lifetime Value (LTV)</div>
                <div className="text-3xl font-black tabular-nums italic">$1,420,500</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-widest">Active Forecast</div>
                <div className="text-2xl font-black tabular-nums text-emerald-400">12 POs Pending</div>
              </div>
            </div>
            <button className="w-full mt-8 py-3 bg-white/10 hover:bg-white/20 transition-all rounded-xl text-[10px] font-black uppercase tracking-widest">
               Deep Financial Analysis
            </button>
          </div>
        </div>

        {/* Main Content Tabs */}
        <div className="lg:col-span-3 space-y-6">
          {/* Dashboard Mini-Tiles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white border-2 border-slate-100 rounded-3xl flex items-center gap-5 shadow-sm hover:border-emerald-200 transition-all group">
              <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-600 group-hover:scale-110 transition-transform"><History className="w-6 h-6" /></div>
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Last Fulfillment</div>
                <div className="text-base font-black text-slate-900 italic">May 02, 2024</div>
              </div>
            </div>
            <div className="p-6 bg-white border-2 border-slate-100 rounded-3xl flex items-center gap-5 shadow-sm hover:border-amber-200 transition-all group">
              <div className="p-4 bg-amber-50 rounded-2xl text-amber-600 group-hover:scale-110 transition-transform"><TrendingUp className="w-6 h-6" /></div>
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Volume Growth</div>
                <div className="text-base font-black text-slate-900 italic">+18.4% YOY</div>
              </div>
            </div>
            <div className="p-6 bg-white border-2 border-slate-100 rounded-3xl flex items-center gap-5 shadow-sm hover:border-indigo-200 transition-all group">
              <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600 group-hover:scale-110 transition-transform"><AlertCircle className="w-6 h-6" /></div>
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Health Score</div>
                <div className="text-base font-black text-slate-900 italic">98 / 100</div>
              </div>
            </div>
          </div>

          <div className="card-premium h-full min-h-[500px] flex flex-col">
            <div className="p-2 border-b border-slate-100 bg-slate-50 flex gap-2 overflow-x-auto no-scrollbar">
              <button 
                onClick={() => setActiveTab('history')}
                className={cn(
                  "px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                  activeTab === 'history' ? "bg-white shadow-xl text-indigo-600 border border-indigo-100" : "text-slate-400 hover:bg-slate-100"
                )}
              >
                Engagement History
              </button>
              <button 
                onClick={() => setActiveTab('activity')}
                className={cn(
                  "px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                  activeTab === 'activity' ? "bg-white shadow-xl text-indigo-600 border border-indigo-100" : "text-slate-400 hover:bg-slate-100"
                )}
              >
                Interaction Timeline
              </button>
              <button 
                onClick={() => setActiveTab('legal')}
                className={cn(
                  "px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                  activeTab === 'legal' ? "bg-white shadow-xl text-indigo-600 border border-indigo-100" : "text-slate-400 hover:bg-slate-100"
                )}
              >
                Legal & Contractual
              </button>
            </div>

            <div className="p-8 flex-1">
              {activeTab === 'history' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-2">
                     <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest italic">Order Fulfillment Pipeline</h4>
                     <button className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">
                        <Download className="w-3 h-3" /> Export Ledger
                     </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-slate-50">
                          <th className="text-[10px] font-black text-slate-400 uppercase tracking-widest pb-6">PO Entity</th>
                          <th className="text-[10px] font-black text-slate-400 uppercase tracking-widest pb-6">Status</th>
                          <th className="text-[10px] font-black text-slate-400 uppercase tracking-widest pb-6">Manifest Description</th>
                          <th className="text-[10px] font-black text-slate-400 uppercase tracking-widest pb-6 text-right">Valuation</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {[1, 2, 3, 4, 5].map(i => (
                          <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                            <td className="py-6">
                              <div className="text-sm font-black text-slate-900 italic">PO-99{i}82-INT</div>
                              <div className="text-[10px] text-slate-400 font-black uppercase tracking-tighter mt-1">Ref: {i === 1 ? 'MAY 02' : i === 2 ? 'APR 28' : 'MAR 14'} Cycle</div>
                            </td>
                            <td className="py-6">
                              <div className="flex items-center gap-2">
                                <div className={cn(
                                   "w-2 h-2 rounded-full",
                                   i === 1 ? "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" : "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                                )} />
                                <span className={cn(
                                   "text-[9px] font-black uppercase tracking-widest italic",
                                   i === 1 ? "text-indigo-600" : "text-emerald-600"
                                )}>
                                  {i === 1 ? 'Processing' : 'Delivered'}
                                </span>
                              </div>
                            </td>
                            <td className="py-6">
                               <p className="text-xs font-bold text-slate-600 italic leading-relaxed max-w-sm">
                                  {i % 2 === 0 ? 'Silk Blouse Consignment - Qty: 2,400 units' : 'Autumn Outerwear Collection - Premium Logistics'}
                               </p>
                            </td>
                            <td className="py-6 text-right">
                               <div className="text-sm font-black text-slate-900 tabular-nums italic">
                                  ${(Math.random() * 25000 + 15000).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                               </div>
                               <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">USD Base</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'activity' && (
                <div className="space-y-12 relative">
                  {/* Timeline Line */}
                  <div className="absolute left-[23px] top-4 bottom-4 w-1 bg-slate-100 rounded-full" />
                  
                  {DUMMY_ACTIVITIES.map((activity) => (
                    <div key={activity.id} className="relative pl-16 group">
                      {/* Timeline Marker */}
                      <div className={cn(
                        "absolute left-2.5 top-1 w-7 h-7 rounded-lg border-2 border-white shadow-lg flex items-center justify-center z-10 transition-transform group-hover:scale-125",
                        activity.type === 'call' ? "bg-emerald-500 text-white" :
                        activity.type === 'email' ? "bg-indigo-500 text-white" :
                        activity.type === 'meeting' ? "bg-amber-500 text-white" : "bg-slate-900 text-white"
                      )}>
                        {activity.type === 'call' && <Phone className="w-3.5 h-3.5" />}
                        {activity.type === 'email' && <Mail className="w-3.5 h-3.5" />}
                        {activity.type === 'meeting' && <Users className="w-3.5 h-3.5" />}
                        {activity.type === 'note' && <FileText className="w-3.5 h-3.5" />}
                      </div>

                      <div className="card-premium p-6 hover:border-indigo-100 transition-all bg-white shadow-sm border-slate-100 relative group-hover:shadow-indigo-500/5">
                        <div className="flex items-center justify-between mb-4">
                           <div className="flex items-center gap-3">
                              <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest italic">{activity.type} logged</span>
                              <div className="w-1 h-1 rounded-full bg-slate-200" />
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{activity.user}</span>
                           </div>
                           <span className="text-[10px] font-bold text-slate-400 uppercase tabular-nums">{activity.date}</span>
                        </div>
                        <p className="text-sm font-bold text-slate-600 italic leading-relaxed">
                          {activity.content}
                        </p>
                      </div>
                    </div>
                  ))}

                  <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl flex items-center justify-center gap-3 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50/10 transition-all group">
                     <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                     <span className="text-xs font-black uppercase tracking-[0.2em]">Add Timeline Entry</span>
                  </button>
                </div>
              )}

              {activeTab === 'legal' && (
                <div className="flex flex-col items-center justify-center h-full text-center py-20">
                   <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-200">
                      <FileText className="w-10 h-10" />
                   </div>
                   <h4 className="text-lg font-black text-slate-900 italic tracking-tight mb-2">Commercial Contracts</h4>
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-loose">Secure access only. This module requires<br/>secondary auth clearance.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
