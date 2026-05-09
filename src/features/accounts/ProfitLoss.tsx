import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, PieChart as PieIcon, Activity } from 'lucide-react';
import { cn } from '../../lib/utils';

const plData = [
  { month: 'Jan', income: 45000, expense: 32000, profit: 13000 },
  { month: 'Feb', income: 52000, expense: 35000, profit: 17000 },
  { month: 'Mar', income: 48000, expense: 31000, profit: 17000 },
  { month: 'Apr', income: 61000, expense: 38000, profit: 23000 },
  { month: 'May', income: 55000, expense: 40000, profit: 15000 },
];

const expenseBreakdown = [
  { name: 'Raw Materials', value: 45 },
  { name: 'Labor/HR', value: 30 },
  { name: 'Rent/Utils', value: 15 },
  { name: 'Marketing', value: 10 },
];

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

export const ProfitLoss: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PnlStat 
          label="Gross Income" 
          value="$328,000" 
          trend="+15.2%" 
          isPositive={true}
          icon={<DollarSign className="w-5 h-5 text-indigo-600" />} 
        />
        <PnlStat 
          label="Total Expenses" 
          value="$176,420" 
          trend="+8.4%" 
          isPositive={false}
          icon={<Activity className="w-5 h-5 text-rose-600" />} 
        />
        <PnlStat 
          label="Net Profit" 
          value="$151,580" 
          trend="+22.1%" 
          isPositive={true}
          icon={<TrendingUp className="w-5 h-5 text-emerald-600" />} 
          isHighlight={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 card-premium p-8 border-slate-200/60 h-[450px]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">Income vs Expenses</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Fiscal Performance Analysis</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-indigo-500" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Income</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-slate-200" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Expenses</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={plData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }} 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="income" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-premium p-8 border-slate-200/60 flex flex-col h-[450px]">
          <h3 className="text-sm font-bold text-slate-900 mb-2">Expense Breakdown</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8">Category Allocation</p>
          
          <div className="h-[200px] w-full relative mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {expenseBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(255,255,255,0)" />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-lg font-black text-slate-950">$176k</span>
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Total</span>
            </div>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto pr-2">
            {expenseBreakdown.map((item, idx) => (
              <div key={item.name} className="flex items-center justify-between group">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-slate-900 transition-colors">{item.name}</span>
                </div>
                <span className="text-[10px] font-black text-slate-950 italic tabular-nums">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const PnlStat = ({ label, value, trend, isPositive, icon, isHighlight }: any) => (
  <div className={cn(
    "card-premium p-6 border-slate-200/60 shadow-sm relative overflow-hidden",
    isHighlight && "bg-slate-900 border-slate-900"
  )}>
    <div className="flex items-center justify-between mb-4">
      <div className={cn(
        "w-10 h-10 rounded-xl flex items-center justify-center",
        isHighlight ? "bg-white/10" : "bg-slate-50 border border-slate-100"
      )}>
        {icon}
      </div>
      <div className={cn(
        "flex items-center gap-1 px-2 py-1 rounded text-[10px] font-black tracking-widest",
        isHighlight ? "bg-emerald-500/10 text-emerald-400" :
        isPositive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
      )}>
        {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        {trend}
      </div>
    </div>
    <div>
      <h5 className={cn(
        "text-[10px] font-black uppercase tracking-widest mb-1",
        isHighlight ? "text-slate-400" : "text-slate-500"
      )}>{label}</h5>
      <div className={cn(
        "text-2xl font-black italic tabular-nums",
        isHighlight ? "text-white" : "text-slate-950"
      )}>{value}</div>
    </div>
  </div>
);
