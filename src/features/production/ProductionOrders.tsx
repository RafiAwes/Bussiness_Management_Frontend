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
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="relative w-full lg:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search work orders, styles..." 
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all outline-none italic shadow-sm"
          />
        </div>
        <div className="flex items-center gap-2 w-full lg:w-auto">
          <button className="btn-secondary flex-1 lg:flex-none">
            <Filter className="w-4 h-4 text-slate-400" /> Filter
          </button>
          <button 
            onClick={() => setShowDeployForm(true)}
            className="btn-primary flex-1 lg:flex-none"
          >
            <Plus className="w-4 h-4" /> Deploy
          </button>
        </div>
      </div>

      {/* Deployment Modal */}
      {showDeployForm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
               <div>
                  <h3 className="text-lg font-black text-slate-900 italic uppercase tracking-tight">New Production Order</h3>
                  <p className="text-subtitle mt-1">Standardized Factory Work Order</p>
               </div>
               <button 
                onClick={() => setShowDeployForm(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-400 hover:text-slate-900"
               >
                 <X className="w-5 h-5" />
               </button>
            </div>

            <form onSubmit={handleDeploy} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-label ml-1">Target Client</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Zara, Nordstrom"
                    value={newOrder.client}
                    onChange={(e) => setNewOrder({ ...newOrder, client: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-black italic outline-none focus:border-accent transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-label ml-1">Style Reference</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Linen Dress V2"
                    value={newOrder.item}
                    onChange={(e) => setNewOrder({ ...newOrder, item: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-black italic outline-none focus:border-accent transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-label ml-1">Batch Quantity (PCS)</label>
                  <input 
                    required
                    type="number" 
                    placeholder="e.g. 10000"
                    value={newOrder.qty}
                    onChange={(e) => setNewOrder({ ...newOrder, qty: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-black italic outline-none focus:border-accent transition-all tabular-nums"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-label ml-1">Priority</label>
                  <select 
                    value={newOrder.priority}
                    onChange={(e) => setNewOrder({ ...newOrder, priority: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-black italic outline-none focus:border-accent cursor-pointer appearance-none"
                  >
                    <option value="Normal">Normal</option>
                    <option value="Medium">Medium Rush</option>
                    <option value="High">Critical</option>
                  </select>
                </div>
              </div>

              <div className="pt-6 flex flex-col-reverse sm:flex-row gap-3">
                <button 
                  type="button"
                  onClick={() => setShowDeployForm(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-[2] btn-primary"
                >
                  <Plus className="w-4 h-4" />
                  Finalize & Deploy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="table-container shadow-sm">
        <table className="table-standard">
          <thead>
            <tr>
              <th className="table-header">Reference</th>
              <th className="table-header">Client & Style</th>
              <th className="table-header">Batch Size</th>
              <th className="table-header text-center">Progress</th>
              <th className="table-header text-center">Status</th>
              <th className="table-header w-12"></th>
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
                  <td className="table-cell">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-indigo-500 font-mono tracking-tighter leading-none mb-1">#{order.id}</span>
                      <span className="text-[9px] font-black text-slate-400 uppercase tabular-nums">{order.date}</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-slate-950 italic tracking-tight">{order.item}</span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{order.client}</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center gap-1.5">
                       <span className="text-sm font-black text-slate-900 tabular-nums">{order.qty.toLocaleString()}</span>
                       <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">PCS</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="flex flex-col items-center gap-2 max-w-[120px] mx-auto">
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
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
                  <td className="table-cell">
                    <div className="flex justify-center">
                      <span className={cn(
                        "text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border shadow-sm flex items-center gap-1.5 whitespace-nowrap",
                        STAGE_CONFIGS[order.status as keyof typeof STAGE_CONFIGS]?.color || 'bg-slate-50 text-slate-500 border-slate-100'
                      )}>
                        {order.status}
                      </span>
                    </div>
                  </td>
                  <td className="table-cell text-right">
                    <div className="flex items-center justify-end">
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

