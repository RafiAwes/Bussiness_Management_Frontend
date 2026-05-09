import React, { useState } from 'react';
import { Search, Plus, FileText, Calendar, DollarSign, Clock, ArrowUpRight, X, Factory, Package, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PurchaseOrder {
  id: string;
  factory: string;
  product: string;
  qty: number;
  price: number;
  date: string;
  deliveryDate: string;
  status: 'Sent' | 'In Production' | 'Delivered' | 'Draft';
  progress: number;
}

const INITIAL_POS: PurchaseOrder[] = [
  { id: 'FPO-2024-001', factory: 'Elite Apparels Ltd', product: 'Men Polo Sport', qty: 5000, price: 12.50, date: '2024-05-01', deliveryDate: '2024-06-15', status: 'In Production', progress: 15 },
  { id: 'FPO-2024-002', factory: 'Oceanic Knitwear', product: 'Summer Tee Black', qty: 1200, price: 8.20, date: '2024-05-02', deliveryDate: '2024-06-20', status: 'Draft', progress: 0 },
  { id: 'FPO-2024-003', factory: 'Global Denim Hub', product: 'Straight Cut Jean', qty: 8000, price: 18.00, date: '2024-04-28', deliveryDate: '2024-06-10', status: 'In Production', progress: 45 },
  { id: 'FPO-2024-004', factory: 'Smart Stitching', product: 'Formal White Shirt', qty: 2500, price: 14.50, date: '2024-04-25', deliveryDate: '2024-05-25', status: 'In Production', progress: 65 },
  { id: 'FPO-2024-005', factory: 'Elite Apparels Ltd', product: 'Linen Summer Dress', qty: 1500, price: 22.00, date: '2024-04-20', deliveryDate: '2024-05-30', status: 'Delivered', progress: 100 },
];

export const FactoryPurchaseOrders: React.FC = () => {
  const [pos, setPos] = useState<PurchaseOrder[]>(INITIAL_POS);
  const [showForm, setShowForm] = useState(false);
  const [newPO, setNewPO] = useState({
    factory: '',
    product: '',
    qty: '',
    price: '',
    deliveryDate: ''
  });

  const [selectedPoId, setSelectedPoId] = useState<string | null>(null);

  const handleCreatePO = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPO.factory || !newPO.product || !newPO.qty || !newPO.price) return;

    const po: PurchaseOrder = {
      id: `FPO-2024-${(pos.length + 1).toString().padStart(3, '0')}`,
      factory: newPO.factory,
      product: newPO.product,
      qty: parseInt(newPO.qty),
      price: parseFloat(newPO.price),
      date: new Date().toISOString().split('T')[0],
      deliveryDate: newPO.deliveryDate,
      status: 'Sent',
      progress: 0
    };

    setPos([po, ...pos]);
    setShowForm(false);
    setNewPO({ factory: '', product: '', qty: '', price: '', deliveryDate: '' });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-black text-slate-900 italic tracking-tight underline decoration-indigo-500/30 decoration-4 underline-offset-8">Factory Procurement Ledger</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-3">External Manufacturing & B2B Sourcing</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className={cn(
            "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 transition-all shadow-lg",
            showForm ? "bg-rose-500 text-white" : "bg-slate-900 text-white hover:bg-indigo-600"
          )}
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? 'Cancel PO' : 'Issue New Factory PO'}
        </button>
      </div>

      {/* PO Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[40px] w-full max-w-2xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-10 border-b-2 border-slate-50 relative bg-slate-950 flex items-center justify-between overflow-hidden text-white">
               <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-32 -mt-32 blur-3xl" />
               <div className="relative z-10 flex items-center gap-6">
                  <div className="w-16 h-16 bg-white/10 rounded-[24px] flex items-center justify-center backdrop-blur-md border border-white/20">
                    <FileText className="w-8 h-8 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black italic tracking-tighter uppercase whitespace-nowrap">Factory Procurement</h3>
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] mt-2 italic">Standard Purchase Order Issue</p>
                  </div>
               </div>
               <button 
                onClick={() => setShowForm(false)}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all relative z-10"
               >
                 <X className="w-6 h-6" />
               </button>
            </div>

            <form onSubmit={handleCreatePO} className="p-12 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Manufacturing Partner</label>
                  <div className="relative">
                    <Factory className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select 
                      required
                      value={newPO.factory}
                      onChange={(e) => setNewPO({ ...newPO, factory: e.target.value })}
                      className="w-full pl-12 pr-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-indigo-600 appearance-none transition-all cursor-pointer"
                    >
                      <option value="">Select Factory...</option>
                      <option>Elite Apparels Ltd</option>
                      <option>Oceanic Knitwear</option>
                      <option>Global Denim Hub</option>
                      <option>Smart Stitching</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Product Descriptor / Style</label>
                  <div className="relative">
                    <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Denim Jacket v2"
                      value={newPO.product}
                      onChange={(e) => setNewPO({ ...newPO, product: e.target.value })}
                      className="w-full pl-12 pr-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-indigo-600 transition-all font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Volume (PCS)</label>
                  <input 
                    required
                    type="number" 
                    placeholder="e.g. 5000"
                    value={newPO.qty}
                    onChange={(e) => setNewPO({ ...newPO, qty: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-indigo-600 transition-all font-sans tabular-nums"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Agreed Unit Price ($)</label>
                  <input 
                    required
                    type="number" 
                    step="0.01"
                    placeholder="e.g. 12.50"
                    value={newPO.price}
                    onChange={(e) => setNewPO({ ...newPO, price: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-indigo-600 transition-all font-sans tabular-nums"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Expected Delivery Date (SLA)</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      required
                      type="date" 
                      value={newPO.deliveryDate}
                      onChange={(e) => setNewPO({ ...newPO, deliveryDate: e.target.value })}
                      className="w-full pl-12 pr-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-indigo-600 transition-all font-sans"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-8 flex gap-6">
                <button 
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 border-2 border-transparent hover:border-slate-100 rounded-3xl transition-all italic"
                >
                  Discard Draft
                </button>
                <button 
                  type="submit"
                  className="flex-[2] py-5 bg-indigo-600 text-white rounded-3xl text-[10px] font-black uppercase tracking-[0.3em] shadow-[0_20px_40px_-5px_rgba(79,70,229,0.4)] hover:scale-105 active:scale-95 transition-all italic flex items-center justify-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Authorize Factory Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card-premium overflow-hidden shadow-xl border-slate-200/60">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Order ID</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Factory</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Product Descriptor</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Volume / Value</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Timeline</th>
              <th className="px-6 py-5 text-[10px) font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
              <th className="px-6 py-5 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {pos.map((po) => (
              <React.Fragment key={po.id}>
                <tr 
                  onClick={() => setSelectedPoId(selectedPoId === po.id ? null : po.id)}
                  className={cn(
                    "hover:bg-slate-50/50 transition-colors group cursor-pointer",
                    selectedPoId === po.id && "bg-indigo-50/30"
                  )}
                >
                  <td className="px-6 py-5">
                    <span className="text-xs font-black text-indigo-500 font-mono tracking-tighter italic">#{po.id}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <Factory className="w-3.5 h-3.5 text-slate-300" />
                      <span className="text-sm font-black text-slate-900 italic tracking-tight">{po.factory}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                     <p className="text-sm font-black text-slate-700 italic">{po.product}</p>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-black text-slate-900 tabular-nums">{po.qty.toLocaleString()} PCS</span>
                      <span className="text-[10px] font-bold text-slate-400 tabular-nums">${(po.qty * po.price).toLocaleString()} Total</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex flex-col items-end px-2 py-1 bg-slate-50 rounded-lg w-fit ml-auto border border-slate-100 shadow-sm">
                      <span className="text-[10px] font-black text-slate-900 italic">{po.deliveryDate}</span>
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Handover Date</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className={cn(
                      "text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border shadow-sm",
                      po.status === 'Delivered' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                      po.status === 'In Production' ? "bg-amber-50 text-amber-600 border-amber-100" :
                      po.status === 'Sent' ? "bg-indigo-50 text-indigo-600 border-indigo-100" :
                      "bg-slate-50 text-slate-400 border-slate-200"
                    )}>
                      {po.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className={cn(
                      "p-2 rounded-lg transition-all",
                      selectedPoId === po.id ? "bg-indigo-500 text-white" : "text-slate-400 hover:bg-slate-100 hover:text-indigo-600"
                    )}>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
                {selectedPoId === po.id && (
                  <tr className="bg-slate-50/50">
                    <td colSpan={7} className="px-12 py-8 animate-in slide-in-from-top-2 duration-200">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-4">
                          <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Procurement Detail</h5>
                          <div className="space-y-2">
                             <div className="flex justify-between text-xs">
                                <span className="text-slate-500">Unit Price</span>
                                <span className="font-black text-slate-900">${po.price.toFixed(2)}</span>
                             </div>
                             <div className="flex justify-between text-xs">
                                <span className="text-slate-500">Material Composition</span>
                                <span className="font-black text-slate-900 italic">Organic Cotton / Poly</span>
                             </div>
                             <div className="flex justify-between text-xs">
                                <span className="text-slate-500">AQL Standard</span>
                                <span className="font-black text-indigo-600">2.5 Standard</span>
                             </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Production Milestone</h5>
                          <div className="space-y-3">
                             <div className="flex justify-between text-[10px] font-black">
                                <span className="text-slate-500">Batch Progress</span>
                                <span className="text-indigo-600">{po.progress}%</span>
                             </div>
                             <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500 rounded-full transition-all duration-1000" style={{ width: `${po.progress}%` }} />
                             </div>
                             <p className="text-[9px] font-bold text-slate-400 italic">Expected Completion: {po.deliveryDate}</p>
                          </div>
                        </div>
                        <div className="flex flex-col justify-end gap-3">
                           <button className="px-4 py-2.5 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all">
                              Download PO Manifest
                           </button>
                           <button className="px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
                              Message Factory Liaison
                           </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="card-premium p-6 bg-slate-900 text-white border-0 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-indigo-500/20 transition-all" />
            <div className="flex items-center justify-between mb-4">
               <DollarSign className="w-5 h-5 text-indigo-400" />
               <h5 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest italic">Capital Deployment</h5>
            </div>
            <p className="text-2xl font-black italic">${pos.reduce((acc, curr) => acc + (curr.qty * curr.price), 0).toLocaleString()}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Active Factory Exposure (USD)</p>
         </div>
         <div className="card-premium p-6 border-slate-200/60 shadow-lg group">
            <div className="flex items-center justify-between mb-4">
               <Clock className="w-5 h-5 text-amber-500" />
               <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-widest italic">Lead Time Drift</h5>
            </div>
            <p className="text-2xl font-black text-slate-950 italic">2.4 Days</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Average Sourcing Delay</p>
         </div>
         <div className="card-premium p-6 border-slate-200/60 shadow-lg group">
            <div className="flex items-center justify-between mb-4">
               <CheckCircle2 className="w-5 h-5 text-emerald-500" />
               <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-widest italic">Compliance Status</h5>
            </div>
            <p className="text-2xl font-black text-slate-950 italic">100%</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Certified Manufacturing Units</p>
         </div>
      </div>
    </div>
  );
};
