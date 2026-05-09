import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  Target, 
  Users, 
  Briefcase, 
  Globe,
  Award,
  Zap,
  ArrowUpRight,
  Package,
  Factory,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { cn } from '../../lib/utils';

const salesTrendData = [
  { month: 'Jan', sales: 42000, supply: 38000 },
  { month: 'Feb', sales: 38000, supply: 41000 },
  { month: 'Mar', sales: 51200, supply: 48000 },
  { month: 'Apr', sales: 48500, supply: 52000 },
  { month: 'May', sales: 62000, supply: 58000 },
];

const supplierPerformance = [
  { name: 'Elite Apparels', score: 98, leadTime: 14 },
  { name: 'Oceanic Knit', score: 92, leadTime: 18 },
  { name: 'Global Denim', score: 85, leadTime: 22 },
  { name: 'Smart Stitch', score: 95, leadTime: 15 },
];

const orderStatusData = [
  { name: 'Delivered', value: 45, color: '#10b981' },
  { name: 'In Production', value: 22, color: '#f59e0b' },
  { name: 'PO Sent', value: 15, color: '#6366f1' },
  { name: 'QC Check', value: 8, color: '#ec4899' },
];

export const SalesDashboard: React.FC = () => {
  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700">
      {/* Top Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPIBox 
          label="Total Sales (YTD)" 
          value="$2.4M" 
          sub="+12% from projected" 
          icon={<TrendingUp className="w-5 h-5 text-indigo-600" />} 
          trend="up"
        />
        <KPIBox 
          label="Active Po Pipeline" 
          value="45 Orders" 
          sub="Value: $420,500" 
          icon={<Package className="w-5 h-5 text-emerald-600" />} 
        />
        <KPIBox 
          label="Supplier Health" 
          value="94.2%" 
          sub="Avg. Performance Score" 
          icon={<Factory className="w-5 h-5 text-blue-600" />} 
          trend="up"
        />
        <KPIBox 
          label="Completed Orders" 
          value="1,240" 
          sub="98.5% On-Time delivery" 
          icon={<CheckCircle2 className="w-5 h-5 text-amber-600" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Performance Chart */}
        <div className="lg:col-span-2 card-premium p-8 shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest italic">Sales vs Supply Velocity</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Cross-Functional Integration</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Supply Cost</span>
              </div>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={salesTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} 
                  dy={10} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                    fontSize: '10px',
                    fontWeight: 900,
                    textTransform: 'uppercase'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  fill="#6366f1" 
                  stroke="#6366f1" 
                  fillOpacity={0.05} 
                  strokeWidth={4} 
                />
                <Bar 
                  dataKey="supply" 
                  fill="#e2e8f0" 
                  radius={[4, 4, 0, 0]} 
                  barSize={30} 
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="card-premium p-8 shadow-xl flex flex-col">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2 italic mb-8">
            <AlertCircle className="w-4 h-4 text-indigo-500" />
            Supply Pipeline
          </h3>
          <div className="h-[240px] w-full flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            {orderStatusData.map((status) => (
              <div key={status.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: status.color }} />
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-900 uppercase tracking-tighter italic">{status.name}</span>
                  <span className="text-[10px] font-bold text-slate-400">{status.value} Orders</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Supplier Performance */}
        <div className="card-premium p-8 shadow-xl">
           <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest italic mb-8">Factory Audit Performance</h3>
           <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={supplierPerformance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 900, fill: '#64748b' }} 
                  width={100}
                />
                <Tooltip 
                   cursor={{ fill: 'transparent' }}
                   contentStyle={{ borderRadius: '12px', border: 'none', fontWeight: 900 }}
                />
                <Bar 
                  dataKey="score" 
                  fill="#6366f1" 
                  radius={[0, 4, 4, 0]} 
                  barSize={20} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Global Market Share */}
        <div className="grid grid-cols-2 gap-6">
          <RegionalCard region="North America" value="$842k" share={45} up />
          <RegionalCard region="European Union" value="$632k" share={32} up />
          <RegionalCard region="Asia Pacific" value="$284k" share={15} down />
          <RegionalCard region="Others" value="$142k" share={8} />
        </div>
      </div>
    </div>
  );
};

const RegionalCard = ({ region, value, share, up, down }: any) => (
  <div className="card-premium p-5 hover:bg-slate-50 transition-colors">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm text-slate-400">
        <Globe className="w-4 h-4" />
      </div>
      {up && <ArrowUpRight className="w-4 h-4 text-emerald-500" />}
    </div>
    <div className="space-y-1">
      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{region}</h4>
      <div className="text-lg font-black text-slate-900">{value}</div>
      <div className="flex items-center gap-2 mt-2">
        <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-accent rounded-full" style={{ width: `${share}%` }} />
        </div>
        <span className="text-[10px] font-bold text-slate-500">{share}%</span>
      </div>
    </div>
  </div>
);

const KPIBox = ({ label, value, sub, icon, trend }: any) => (
  <div className="card-premium p-6">
    <div className="flex justify-between items-start mb-4">
      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 italic font-black text-indigo-600">
        {icon}
      </div>
      {trend === 'up' && (
        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 flex items-center gap-1">
          <TrendingUp className="w-3 h-3" /> Growth
        </span>
      )}
    </div>
    <div className="space-y-0.5">
      <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</h5>
      <div className="text-2xl font-black text-slate-900 tabular-nums">{value}</div>
      <p className="text-[10px] text-slate-500 font-medium">{sub}</p>
    </div>
  </div>
);
