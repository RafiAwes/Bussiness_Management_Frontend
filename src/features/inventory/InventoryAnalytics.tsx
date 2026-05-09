import React from 'react';
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
  Cell,
  LineChart,
  Line
} from 'recharts';
import { TrendingUp, TrendingDown, Package, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const turnoverData = [
  { name: 'Week 1', sales: 400, stock: 2400 },
  { name: 'Week 2', sales: 600, stock: 2200 },
  { name: 'Week 3', sales: 800, stock: 1900 },
  { name: 'Week 4', sales: 1200, stock: 1500 },
];

const categoryData = [
  { name: 'Fabrics', value: 45 },
  { name: 'Essentials', value: 25 },
  { name: 'Accessories', value: 20 },
  { name: 'Specialty', value: 10 },
];

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

export const InventoryAnalytics: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 card-premium p-8 border-slate-200/60">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">Stock vs Sales Turnover</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Monthly Velocity Trend</p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={turnoverData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={3} dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="stock" stroke="#e2e8f0" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-premium p-8 border-slate-200/60 flex flex-col">
          <h3 className="text-sm font-bold text-slate-900 mb-2">Category Distribution</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8">Stock Value Allocation</p>
          
          <div className="h-[200px] w-full relative mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {categoryData.map((item, idx) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.name}</span>
                </div>
                <span className="text-[10px] font-black text-slate-950">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card-premium p-8 border-slate-200/60">
          <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            Fast Moving Products
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white border border-slate-100 rounded-lg flex items-center justify-center text-xs font-black">#0{i}</div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 italic">Premium Cotton Roll - {i === 1 ? 'White' : 'Black'}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Turnover: 12.5x / month</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-emerald-500" />
              </div>
            ))}
          </div>
        </div>

        <div className="card-premium p-8 border-slate-200/60">
          <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-rose-500" />
            Slow Moving Products
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-slate-100 opacity-75">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white border border-slate-100 rounded-lg flex items-center justify-center text-xs font-black">#L{i}</div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 italic">Specialty Lace - Grade {i}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Turnover: 0.2x / month</div>
                  </div>
                </div>
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
