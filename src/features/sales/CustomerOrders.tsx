import React, { useState } from 'react';
import { Search, Download, ExternalLink, Filter, Calendar, Tag, User, CreditCard, Factory, CheckCircle2, ChevronDown, Plus, X, Package, DollarSign } from 'lucide-react';
import { cn } from '../../lib/utils';

const SUPPLIERS = [
  'Elite Apparels Ltd',
  'Oceanic Knitwear',
  'Global Denim Hub',
  'Smart Stitching',
];

const INITIAL_ORDERS = [
  { id: 'SO-4401', client: 'Zara Scandinavia', quantity: 15400, value: 124000.00, date: '2024-05-04', payment: 'L/C Pending', status: 'In Production', supplier: 'Elite Apparels Ltd' },
  { id: 'SO-4402', client: 'Nordstrom US', quantity: 5000, value: 45000.00, date: '2024-05-03', payment: 'Wire Recieved', status: 'Shipping', supplier: 'Oceanic Knitwear' },
  { id: 'SO-4403', client: 'H&M Global', quantity: 25000, value: 185000.00, date: '2024-05-01', payment: 'Cash Adv', status: 'Booked', supplier: null },
  { id: 'SO-4404', client: 'Private Label Co', quantity: 1200, value: 12000.00, date: '2024-04-28', payment: 'Paid', status: 'Delivered', supplier: 'Smart Stitching' },
];

export const CustomerOrders: React.FC = () => {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [assigningId, setAssigningId] = useState<string | null>(null);
  const [generatedPoIds, setGeneratedPoIds] = useState<Set<string>>(new Set());
  const [isBookingOrder, setIsBookingOrder] = useState(false);
  const [newOrder, setNewOrder] = useState({
    client: '',
    quantity: '',
    value: '',
    payment: 'L/C Pending'
  });

  const handleBookOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const order = {
      id: `SO-${4400 + orders.length + 1}`,
      client: newOrder.client,
      quantity: parseInt(newOrder.quantity) || 0,
      value: parseFloat(newOrder.value) || 0,
      date: new Date().toISOString().split('T')[0],
      payment: newOrder.payment,
      status: 'Booked',
      supplier: null
    };
    setOrders([order, ...orders]);
    setIsBookingOrder(false);
    setNewOrder({ client: '', quantity: '', value: '', payment: 'L/C Pending' });
  };

  const handleAssignSupplier = (orderId: string, supplier: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, supplier, status: order.status === 'Booked' ? 'In Production' : order.status } : order
    ));
    setAssigningId(null);
  };

  const handleGeneratePo = (orderId: string) => {
    setGeneratedPoIds(prev => new Set(prev).add(orderId));
    // Simulate navigation or success
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search global clients / orders..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-accent/20 transition-all font-medium italic"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all">
            <Filter className="w-3.5 h-3.5" /> Advance Filters
          </button>
          <button 
            onClick={() => setIsBookingOrder(true)}
            className="px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-emerald-600 transition-all shadow-lg"
          >
            <Plus className="w-4 h-4" /> Book New Order
          </button>
          <button className="px-6 py-3 bg-slate-100 text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-slate-200 transition-all">
            <Download className="w-4 h-4" /> Export Manifest
          </button>
        </div>
      </div>

      <div className="card-premium overflow-hidden border-slate-200/60 shadow-xl">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Order Ref</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Client</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Units</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contract Value</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Lead Supplier</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Lifecycle</th>
              <th className="px-6 py-5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-5">
                  <span className="text-xs font-black text-slate-900 font-mono tracking-tighter italic">#{order.id}</span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-300" />
                    <span className="text-sm font-black text-slate-900 italic tracking-tight">{order.client}</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="text-sm font-black text-slate-700 tabular-nums">{order.quantity.toLocaleString()} <span className="text-[9px] text-slate-400">PCS</span></div>
                </td>
                <td className="px-6 py-5">
                  <div className="text-sm font-black text-indigo-600 tabular-nums">${order.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">{order.payment}</div>
                </td>
                <td className="px-6 py-5">
                  {order.supplier ? (
                    <div className="flex flex-col gap-2">
                      <div className="w-fit p-1 px-2.5 bg-indigo-50 border border-indigo-100 rounded-lg flex items-center gap-2">
                        <Factory className="w-3 h-3 text-indigo-500" />
                        <span className="text-[10px] font-black text-indigo-700 uppercase italic tracking-tight">{order.supplier}</span>
                      </div>
                      {!generatedPoIds.has(order.id) ? (
                        <button 
                          onClick={() => handleGeneratePo(order.id)}
                          className="w-fit text-[9px] font-black text-indigo-500 hover:text-indigo-700 underline decoration-indigo-300 decoration-2 underline-offset-2 uppercase tracking-widest"
                        >
                          Generate PO
                        </button>
                      ) : (
                        <div className="flex items-center gap-1 text-[9px] font-black text-emerald-500 uppercase tracking-widest">
                           <CheckCircle2 className="w-3 h-3" /> PO Generated
                        </div>
                      )}
                    </div>
                  ) : (
                    assigningId === order.id ? (
                      <div className="relative animate-in zoom-in-95 duration-200">
                        <select 
                          autoFocus
                          onBlur={() => setAssigningId(null)}
                          onChange={(e) => handleAssignSupplier(order.id, e.target.value)}
                          className="w-full px-3 py-1.5 bg-white border border-indigo-300 rounded-lg text-[10px] font-black text-indigo-600 outline-none shadow-lg appearance-none cursor-pointer"
                        >
                          <option value="">Select Factory...</option>
                          {SUPPLIERS.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setAssigningId(order.id)}
                        className="flex items-center gap-1.5 px-3 py-1 text-[9px] font-black text-slate-400 border border-dashed border-slate-300 rounded-lg hover:border-indigo-400 hover:text-indigo-600 transition-all uppercase tracking-[0.1em]"
                      >
                        <Plus className="w-3 h-3" /> Assign Supplier
                      </button>
                    )
                  )}
                </td>
                <td className="px-6 py-5 text-center">
                  <span className={cn(
                    "text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border shadow-sm",
                    order.status === 'Delivered' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                    order.status === 'Booked' ? "bg-indigo-50 text-indigo-600 border-indigo-100" :
                    "bg-amber-50 text-amber-600 border-amber-100"
                  )}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-indigo-600 transition-all">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Booking Modal */}
      {isBookingOrder && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[40px] w-full max-w-2xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-10 border-b-2 border-slate-50 relative bg-slate-900 flex items-center justify-between overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-32 -mt-32 blur-3xl" />
               <div className="relative z-10">
                  <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase whitespace-nowrap">Order Reservation</h3>
                  <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em] mt-2 italic">Official DressTown Sales Entry</p>
               </div>
               <button 
                onClick={() => setIsBookingOrder(false)}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all relative z-10 text-white"
               >
                 <X className="w-6 h-6" />
               </button>
            </div>

            <form onSubmit={handleBookOrder} className="p-12 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Global Client Identity</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Nordstrom SE"
                      value={newOrder.client}
                      onChange={(e) => setNewOrder({ ...newOrder, client: e.target.value })}
                      className="w-full pl-12 pr-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-emerald-500 transition-all font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Target Volume (Units)</label>
                  <div className="relative">
                    <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      required
                      type="number" 
                      placeholder="e.g. 5000"
                      value={newOrder.quantity}
                      onChange={(e) => setNewOrder({ ...newOrder, quantity: e.target.value })}
                      className="w-full pl-12 pr-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-emerald-500 transition-all font-sans tabular-nums"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Gross Contract Value ($)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      required
                      type="number" 
                      placeholder="e.g. 125000"
                      value={newOrder.value}
                      onChange={(e) => setNewOrder({ ...newOrder, value: e.target.value })}
                      className="w-full pl-12 pr-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-emerald-500 transition-all font-sans tabular-nums"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Financial Instrument (Payment)</label>
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select 
                      value={newOrder.payment}
                      onChange={(e) => setNewOrder({ ...newOrder, payment: e.target.value })}
                      className="w-full pl-12 pr-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-emerald-500 appearance-none transition-all cursor-pointer"
                    >
                      <option>L/C Pending</option>
                      <option>Wire Confirmed</option>
                      <option>Cash Advance</option>
                      <option>Credit Terms</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-8 flex gap-6">
                <button 
                  type="button"
                  onClick={() => setIsBookingOrder(false)}
                  className="flex-1 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 border-2 border-transparent hover:border-slate-100 rounded-3xl transition-all italic"
                >
                  Discard Entry
                </button>
                <button 
                  type="submit"
                  className="flex-[2] py-5 bg-emerald-500 text-white rounded-3xl text-[10px] font-black uppercase tracking-[0.3em] shadow-[0_20px_40px_-5px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95 transition-all italic flex items-center justify-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Finalize Contract Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
