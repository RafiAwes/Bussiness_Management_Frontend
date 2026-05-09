import React from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Package, 
  AlertTriangle, 
  ArrowRightLeft, 
  Truck, 
  BarChart3,
  Box,
  Layers
} from 'lucide-react';
import { cn } from '../../lib/utils';

const COLORS = ['#6366f1', '#10b981', '#f59e0b'];

export const InventoryDashboard: React.FC<{ isNested?: boolean, onRestock: () => void }> = ({ isNested, onRestock }) => {
  const { state } = useStore();
  
  // Transform store data for charts
  const stockData = state.inventory.map(item => ({
    name: item.name.length > 15 ? item.name.substring(0, 15) + '...' : item.name,
    stock: item.stock,
    min: 50 // Mock threshold
  }));

  const categoryDistribution = [
    { name: 'Raw Materials', value: 65 },
    { name: 'Work in Progress', value: 20 },
    { name: 'Finished Goods', value: 15 },
  ];

  const content = (
    <>
      {!isNested && (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[8px] font-black">WH{i}</div>
                ))}
              </div>
              <p className="text-subtitle">Active Across 3 Locations</p>
            </div>
            <button 
              onClick={onRestock}
              className="btn-primary"
            >
              <Box className="w-4 h-4" />
              Quick Restock Entry
            </button>
          </div>

          <div className="grid-dashboard">
            <StatCard 
              title="Stock Valuation" 
              value="$142,500" 
              trend="+12% vs LW"
              icon={<Package className="w-5 h-5 text-indigo-600" />}
              color="indigo"
            />
            <StatCard 
              title="Low Stock Alerts" 
              value="12" 
              trend="Critical" 
              icon={<AlertTriangle className="w-5 h-5 text-rose-600" />}
              color="rose"
            />
            <StatCard 
              title="Avg. Days to Stockout" 
              value="18" 
              trend="Stable" 
              icon={<Layers className="w-5 h-5 text-amber-600" />}
              color="amber"
            />
            <StatCard 
              title="Inventory Turnover" 
              value="4.2x" 
              trend="Target 5x" 
              icon={<BarChart3 className="w-5 h-5 text-blue-600" />}
              color="blue"
            />
          </div>
        </>
      )}

      <div className="grid-main">
        {/* Stock Levels Chart */}
        <div className="lg:col-span-2 card-premium">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest italic">Stock Analytics</h3>
              <p className="text-subtitle mt-1 italic">Current Quantity vs Threshold</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-indigo-500" />
                <span className="text-[10px] font-bold text-slate-400 uppercase">Stock</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-rose-500 opacity-30" />
                <span className="text-[10px] font-bold text-slate-400 uppercase">Min</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stockData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="stock" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={32} />
                <Bar dataKey="min" fill="#f43f5e" radius={[6, 6, 0, 0]} opacity={0.15} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Mix */}
        <div className="card-premium">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest italic mb-2">Stock Composition</h3>
          <p className="text-subtitle mb-8 italic">Value by Processing Stage</p>
          <div className="h-[200px] w-full mb-8 relative">
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-black text-slate-900 italic tracking-tighter tabular-nums text-center leading-none">$142k<br/><span className="text-[10px] text-slate-400 tracking-widest">Total Value</span></span>
             </div>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  innerRadius={65}
                  outerRadius={85}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={4} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            {categoryDistribution.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.name}</span>
                </div>
                <span className="text-xs font-black text-slate-900 tabular-nums">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <div className="card-premium">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-50">
            <h4 className="text-subtitle italic">Recent Movements</h4>
            <ArrowRightLeft className="w-3.5 h-3.5 text-slate-300" />
          </div>
          <div className="space-y-5">
            <MovementRow type="IN" item="Japanese Selvedge Denim" qty="+500m" date="10 mins ago" />
            <MovementRow type="OUT" item="Summer Tee - Finished L" qty="-120 pcs" date="45 mins ago" />
            <MovementRow type="TRANS" item="Zipper YKK 20cm" qty="200 pcs" date="2 hours ago" subtitle="Main Whse -> Line C" />
            <MovementRow type="IN" item="Cotton Poly Blend" qty="+850m" date="3 hours ago" />
          </div>
        </div>

        <div className="card-premium bg-slate-900 border-slate-800 text-white relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full -mr-16 -mt-16 blur-2xl" />
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-rose-600/20 border border-rose-500/30 rounded-2xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-rose-500" />
            </div>
            <div>
              <h4 className="text-sm font-black italic tracking-tighter uppercase text-white">Critical Stock Alerts</h4>
              <p className="text-[10px] text-rose-500 font-black uppercase tracking-widest italic">Immediate procurement required</p>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { item: 'Black Thread (40/2)', status: 'Empty', desc: 'Schedules stalled for 3 production orders.' },
              { item: 'Main Brand Labels', status: '12 units', desc: 'Order from supplier expected in 3 days.' }
            ].map((alert, i) => (
              <div key={i} className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl backdrop-blur-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-100 italic">{alert.item}</span>
                  <span className={cn(
                    "text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest",
                    alert.status === 'Empty' ? "bg-rose-500/20 text-rose-400" : "bg-amber-500/20 text-amber-400"
                  )}>{alert.status}</span>
                </div>
                <div className="text-[10px] text-slate-500 font-medium leading-relaxed">{alert.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  if (isNested) return <div className="space-y-6">{content}</div>;
  return <div className="page-container">{content}</div>;
};

const MovementRow = ({ type, item, qty, date, subtitle }: any) => (
  <div className="flex items-center justify-between group">
    <div className="flex items-center gap-3">
      <div className={cn(
        "w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black uppercase tracking-tighter",
        type === 'IN' ? 'bg-emerald-50 text-emerald-600' : 
        type === 'OUT' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'
      )}>
        {type}
      </div>
      <div>
        <div className="text-xs font-bold text-slate-900 group-hover:text-accent transition-colors">{item}</div>
        <div className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
          {subtitle || date}
        </div>
      </div>
    </div>
    <div className={cn(
      "text-sm font-black tabular-nums",
      type === 'IN' ? 'text-emerald-600' : 
      type === 'OUT' ? 'text-rose-600' : 'text-blue-600'
    )}>
      {qty}
    </div>
  </div>
);

const StatCard = ({ title, value, trend, icon, color }: any) => (
  <div className="card-premium p-6 hover:shadow-md transition-all duration-300">
    <div className="flex justify-between items-start mb-4">
      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shadow-sm">
        {icon}
      </div>
      {trend && (
        <span className={cn(
          "text-[10px] font-bold px-2 py-0.5 rounded tabular-nums border",
          trend === 'Critical' ? "bg-rose-50 text-rose-600 border-rose-100" : 
          trend === 'Active' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-slate-50 text-slate-500 border-slate-100"
        )}>
          {trend}
        </span>
      )}
    </div>
    <div className="space-y-1">
      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{title}</h4>
      <div className="text-2xl font-black text-slate-900 tabular-nums">{value}</div>
    </div>
  </div>
);
