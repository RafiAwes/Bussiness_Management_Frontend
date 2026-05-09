import React from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  LineChart, 
  Line, 
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
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  Wallet, 
  CreditCard, 
  FileText,
  TrendingUp,
  Activity,
  PieChart as PieChartIcon
} from 'lucide-react';
import { cn } from '../../lib/utils';

const expenseDistribution = [
  { name: 'Raw Materials', value: 45 },
  { name: 'Labor', value: 30 },
  { name: 'Overhead', value: 15 },
  { name: 'Marketing', value: 10 },
];

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444'];

export const FinanceDashboard: React.FC<{ isNested?: boolean }> = ({ isNested }) => {
  const { state } = useStore();
  
  // Use store revenue in stats
  const currentRevenue = state.revenue;
  const financialData = [
    { name: 'Jan', revenue: 45000, expenses: 32000 },
    { name: 'Feb', revenue: 52000, expenses: 35000 },
    { name: 'Mar', revenue: 48000, expenses: 31000 },
    { name: 'Apr', revenue: 61000, expenses: 38000 },
    { name: 'May', revenue: currentRevenue, expenses: 40000 },
    { name: 'Jun', revenue: currentRevenue + 12000, expenses: 42000 },
  ];

  const content = (
    <>
      {!isNested && (
        <div className="grid-dashboard">
          <StatCard 
            title="Gross Profit" 
            value="$151,580" 
            trend="+22.1%" 
            icon={<TrendingUp className="w-5 h-5 text-emerald-600" />}
            color="emerald"
          />
          <StatCard 
            title="Operating Exp" 
            value="$176,420" 
            trend="+8.4%" 
            icon={<Activity className="w-5 h-5 text-rose-600" />}
            color="rose"
          />
          <StatCard 
            title="Pending Payables" 
            value="$42,850" 
            trend="+2.1%" 
            icon={<ArrowDownRight className="w-5 h-5 text-amber-600" />}
            color="amber"
          />
          <StatCard 
            title="Outstanding Dues" 
            value="$98,400" 
            trend="-5.4%" 
            icon={<ArrowUpRight className="w-5 h-5 text-indigo-600" />}
            color="indigo"
          />
        </div>
      )}

      <div className="grid-main">
        {/* Revenue vs Expenses Chart */}
        <div className="lg:col-span-2 card-premium">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest italic">Financial Performance</h3>
              <p className="text-subtitle mt-1 italic uppercase tracking-widest">Revenue vs Operating Expenses</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-600" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Expenses</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={financialData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#94a3b8' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#94a3b8' }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px'
                  }} 
                />
                <Line type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4, fill: '#4f46e5' }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={3} dot={{ r: 4, fill: '#ef4444' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expense Distribution */}
        <div className="card-premium flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2 italic">
              < PieChartIcon className="w-4 h-4 text-slate-400" />
              Expense Mix
            </h3>
          </div>
          <div className="h-[200px] w-full mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {expenseDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-auto">
            {expenseDistribution.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between p-2 bg-slate-50/50 rounded-lg border border-slate-100/50">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.name}</span>
                </div>
                <span className="text-xs font-black text-slate-900 italic tabular-nums">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Action Panels */}
      <div className="grid-main">
        <div className="lg:col-span-1 card-premium border-l-8 border-l-indigo-600">
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 italic">Urgent Fiscal Protocol</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100/50 group hover:border-slate-200 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100/50 text-amber-600 rounded-xl flex items-center justify-center border border-amber-200/50">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-black text-slate-900 italic truncate">Utility Bill Due</div>
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest whitespace-nowrap">Wasa Water • $1,240</div>
                </div>
              </div>
              <button className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] hover:underline whitespace-nowrap">Execute</button>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100/50 group hover:border-slate-200 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-rose-100/50 text-rose-600 rounded-xl flex items-center justify-center border border-rose-200/50">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-black text-slate-900 italic truncate">Tax Filing Deadline</div>
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest whitespace-nowrap">VAT Submission • 2 Days</div>
                </div>
              </div>
              <button className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] hover:underline whitespace-nowrap">Review</button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 card-premium bg-slate-900 text-white border-slate-800">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-600/20">
              <TrendingUp className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-xl font-black italic tracking-tighter uppercase whitespace-nowrap">Projected Net Profit</h4>
              <p className="text-[10px] text-slate-400 uppercase tracking-[0.3em] font-black italic">Q2 2024 Final Est.</p>
            </div>
          </div>
          <div className="text-5xl font-black mb-4 italic tracking-tighter tabular-nums">$842,500.00</div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm mb-10 italic">
            Based on current work orders in production and historically low overhead costs this fiscal quarter. Direct correlation with high conversion velocity.
          </p>
          <button className="btn-primary w-full bg-indigo-600 hover:bg-indigo-500 py-4 text-[11px] uppercase tracking-[0.3em] font-black border-0 shadow-lg shadow-indigo-600/20">
            Export Financial Forecast Report
          </button>
        </div>
      </div>
    </>
  );

  if (isNested) return <div className="space-y-6">{content}</div>;
  return <div className="page-container">{content}</div>;
};

const StatCard = ({ title, value, trend, icon, color }: any) => (
  <div className="card-premium p-6 hover:shadow-md transition-all duration-300">
    <div className="flex justify-between items-start mb-4">
      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shadow-sm">
        {icon}
      </div>
      <span className={cn(
        "text-[10px] font-bold px-2 py-0.5 rounded tabular-nums",
        trend.includes('+') ? "bg-emerald-50 text-emerald-600" : 
        trend.includes('-') ? "bg-rose-50 text-rose-600" : "bg-slate-50 text-slate-500"
      )}>
        {trend}
      </span>
    </div>
    <div className="space-y-1">
      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{title}</h4>
      <div className="text-2xl font-black text-slate-900 tabular-nums">{value}</div>
    </div>
  </div>
);
