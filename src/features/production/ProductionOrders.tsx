import React, { useState } from 'react';
import { ClipboardList, Filter, Search, MoreVertical, Plus, ChevronDown, ChevronUp, Clock, AlertTriangle, CheckCircle2, User, X, Package, DollarSign } from 'lucide-react';
import { cn } from '../../lib/utils';
import { WorkOrderDetails } from './WorkOrderDetails';

const PRODUCTION_ORDERS = [
  { 
    id: 'WO-2024-001', 
    client: 'Nordstrom', 
    item: 'Linen Summer Shirt', 
    qty: 5000, 
    status: 'Sewing', 
    date: '2024-05-10', 
    priority: 'High',
    progress: 45,
    bom: [
      { item: 'Linen Fabric (Navy)', qty: '2,500m' },
      { item: 'Pearl Buttons (12mm)', qty: '40,000 pcs' },
      { item: 'Brand Labels (Large)', qty: '5,000 pcs' }
    ],
    materials: [
      { name: 'Linen Fabric', expected: 2500, actual: 2580, unit: 'm' },
      { name: 'Pearl Buttons', expected: 40000, actual: 40120, unit: 'pcs' }
    ],
    workers: [
      { name: 'Althea Johnson', role: 'Lead Tailor' },
      { name: 'Marcus Wong', role: 'Machine Op' }
    ],
    issues: [
      { type: 'Machine Jam', desc: 'Auto-cutter maintenance scheduled for 2 hours.', date: 'May 09, 14:00', severity: 'medium' as const }
    ]
  },
  { 
    id: 'WO-2024-002', 
    client: 'Zara', 
    item: 'Slim Fit Chinos', 
    qty: 12000, 
    status: 'Cutting', 
    date: '2024-05-12', 
    priority: 'Medium',
    progress: 15,
    bom: [
      { item: 'Cotton Twill', qty: '8,000m' },
      { item: 'Zipper YKK 15cm', qty: '12,000 pcs' }
    ],
    materials: [
      { name: 'Cotton Twill', expected: 8000, actual: 8050, unit: 'm' }
    ],
    workers: [
      { name: 'Sarah Miller', role: 'Cutting Specialist' }
    ],
    issues: []
  },
  { 
    id: 'WO-2024-003', 
    client: 'H&M', 
    item: 'Basic Crew Neck', 
    qty: 45000, 
    status: 'Completed', 
    date: '2024-05-01', 
    priority: 'Normal',
    progress: 100,
    bom: [
       { item: 'Single Jersey', qty: '15,000kg' }
    ],
    materials: [
       { name: 'Single Jersey', expected: 15000, actual: 15150, unit: 'kg' }
    ],
    workers: [
       { name: 'James Wilson', role: 'QA Lead' }
    ],
    issues: []
  },
];

const STAGE_CONFIGS = {
  'Planned': { color: 'bg-slate-100 text-slate-500', icon: Clock },
  'Cutting': { color: 'bg-amber-100 text-amber-600', icon: AlertTriangle },
  'Sewing': { color: 'bg-indigo-100 text-indigo-600', icon: User },
  'Finishing': { color: 'bg-blue-100 text-blue-600', icon: ClipboardList },
  'Completed': { color: 'bg-emerald-100 text-emerald-600', icon: CheckCircle2 }
};

export const ProductionOrders: React.FC = () => {
  const [orders, setOrders] = useState(PRODUCTION_ORDERS);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showDeployForm, setShowDeployForm] = useState(false);
  const [newOrder, setNewOrder] = useState({
    client: '',
    item: '',
    qty: '',
    priority: 'Normal'
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDeploy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrder.client || !newOrder.item || !newOrder.qty) return;

    const deployedOrder = {
      id: `WO-2024-${(orders.length + 1).toString().padStart(3, '0')}`,
      client: newOrder.client,
      item: newOrder.item,
      qty: parseInt(newOrder.qty),
      status: 'Planned',
      date: new Date().toISOString().split('T')[0],
      priority: newOrder.priority,
      progress: 0,
      bom: [],
      materials: [],
      workers: [],
      issues: []
    };

    setOrders([deployedOrder, ...orders]);
    setShowDeployForm(false);
    setNewOrder({ client: '', item: '', qty: '', priority: 'Normal' });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search work orders, styles, or labels..." 
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none italic shadow-sm"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all">
            <Filter className="w-3.5 h-3.5" /> Filter Dashboard
          </button>
          <button 
            onClick={() => setShowDeployForm(!showDeployForm)}
            className={cn(
              "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 transition-all shadow-lg",
              showDeployForm ? "bg-rose-500 text-white hover:bg-rose-600" : "bg-slate-900 text-white hover:bg-indigo-600"
            )}
          >
            {showDeployForm ? <Plus className="w-4 h-4 rotate-45" /> : <Plus className="w-4 h-4" />}
            {showDeployForm ? 'Cancel Deployment' : 'Deploy Work Order'}
          </button>
        </div>
      </div>

      {/* Deployment Modal */}
      {showDeployForm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[40px] w-full max-w-2xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-10 border-b-2 border-slate-50 relative bg-indigo-600 flex items-center justify-between overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
               <div className="relative z-10">
                  <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase whitespace-nowrap">Production Deployment</h3>
                  <p className="text-[10px] font-black text-indigo-200 uppercase tracking-[0.4em] mt-2 italic">Standardized Factory Work Order</p>
               </div>
               <button 
                onClick={() => setShowDeployForm(false)}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all relative z-10 text-white"
               >
                 <X className="w-6 h-6" />
               </button>
            </div>

            <form onSubmit={handleDeploy} className="p-12 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Target Client</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Zara, Nordstrom"
                    value={newOrder.client}
                    onChange={(e) => setNewOrder({ ...newOrder, client: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-indigo-600 transition-all font-sans"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Style Reference / Item</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Linen Dress V2"
                    value={newOrder.item}
                    onChange={(e) => setNewOrder({ ...newOrder, item: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-indigo-600 transition-all font-sans"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Batch Quantity (PCS)</label>
                  <input 
                    required
                    type="number" 
                    placeholder="e.g. 10000"
                    value={newOrder.qty}
                    onChange={(e) => setNewOrder({ ...newOrder, qty: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-indigo-600 transition-all font-sans tabular-nums"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Operational Priority</label>
                  <select 
                    value={newOrder.priority}
                    onChange={(e) => setNewOrder({ ...newOrder, priority: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-indigo-600 appearance-none transition-all cursor-pointer"
                  >
                    <option value="Normal">Normal Pipeline</option>
                    <option value="Medium">Medium Rush</option>
                    <option value="High">Critical / Express</option>
                  </select>
                </div>
              </div>

              <div className="pt-8 flex gap-6">
                <button 
                  type="button"
                  onClick={() => setShowDeployForm(false)}
                  className="flex-1 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 border-2 border-transparent hover:border-slate-100 rounded-3xl transition-all italic"
                >
                  Discard
                </button>
                <button 
                  type="submit"
                  className="flex-[2] py-5 bg-indigo-600 text-white rounded-3xl text-[10px] font-black uppercase tracking-[0.3em] shadow-[0_20px_40px_-5px_rgba(79,70,229,0.3)] hover:scale-105 active:scale-95 transition-all italic flex items-center justify-center gap-3"
                >
                  <Plus className="w-5 h-5" />
                  Finalize & Execute Deployment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card-premium border-slate-200/60 shadow-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Order Reference</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Client & Style</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Batch Size</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Protocol Progress</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Stage Status</th>
              <th className="px-6 py-5 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {orders.map((order) => (
              <React.Fragment key={order.id}>
                <tr 
                  onClick={() => toggleExpand(order.id)}
                  className={cn(
                    "hover:bg-slate-50/50 transition-all group cursor-pointer",
                    expandedId === order.id && "bg-slate-50/80"
                  )}
                >
                  <td className="px-6 py-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-indigo-500 font-mono tracking-tighter leading-none mb-1">#{order.id}</span>
                      <span className="text-[9px] font-black text-slate-400 uppercase tabular-nums">{order.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6 border-l border-slate-50/50">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-slate-950 italic tracking-tight">{order.item}</span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{order.client}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-1.5">
                       <span className="text-sm font-black text-slate-900 tabular-nums">{order.qty.toLocaleString()}</span>
                       <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">PCS</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                        <div 
                          className={cn(
                            "h-full transition-all duration-1000",
                            order.status === 'Completed' ? "bg-emerald-500" : "bg-indigo-500"
                          )} 
                          style={{ width: `${order.progress}%` }} 
                        />
                      </div>
                      <span className="text-[10px] font-black text-slate-900 tabular-nums">{order.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="flex justify-center">
                      <span className={cn(
                        "text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border shadow-sm flex items-center gap-1.5",
                        STAGE_CONFIGS[order.status as keyof typeof STAGE_CONFIGS]?.color || 'bg-slate-50 text-slate-500 border-slate-100'
                      )}>
                        {order.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <div className="flex items-center gap-2 justify-end">
                      {expandedId === order.id ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </div>
                  </td>
                </tr>
                {expandedId === order.id && (
                  <tr>
                    <td colSpan={6} className="p-0 border-b border-slate-200">
                      <WorkOrderDetails 
                        bom={order.bom}
                        materials={order.materials}
                        workers={order.workers}
                        issues={order.issues}
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

