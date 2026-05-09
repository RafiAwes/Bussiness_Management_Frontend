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

export const FinanceDashboard: React.FC = () => {
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

  return (
    <div className="space-y-8 pb-12">
      {/* Financial KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Gross Profit" 
          value="$151,580" 
          trend="+22.1%" 
          icon={<TrendingUp className="w-5 h-5 text-emerald-600" />}
          color="emerald"
        />
        <StatCard 
          title="Operating Expenses" 
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue vs Expenses Chart */}
        <div className="lg:col-span-2 card-premium p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-bold text-slate-900">Financial Performance</h3>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">Revenue vs Operating Expenses</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-600" />
                <span className="text-[10px] font-bold text-slate-500 uppercase">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="text-[10px] font-bold text-slate-500 uppercase">Expenses</span>
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
        <div className="card-premium p-6 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
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
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span className="text-xs font-medium text-slate-600">{item.name}</span>
                </div>
                <span className="text-xs font-bold text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Action Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card-premium p-6 border-l-4 border-l-indigo-600">
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Urgent Tasks</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Utility Bill Due</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Wasa Water Dept • $1,240</div>
                </div>
              </div>
              <button className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest hover:underline">Pay Now</button>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-rose-100 text-rose-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Tax Filing Deadline</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">VAT Submission • In 2 Days</div>
                </div>
              </div>
              <button className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest hover:underline">Review</button>
            </div>
          </div>
        </div>

        <div className="card-premium p-6 bg-slate-900 text-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold">Projected Net Profit</h4>
              <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">Q2 2024 Estimates</p>
            </div>
          </div>
          <div className="text-4xl font-black mb-2">$842,500.00</div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-xs mb-8">
            Based on current work orders in production and historically low overhead costs this quarter.
          </p>
          <button className="w-full btn-primary bg-indigo-600 border-0 hover:bg-indigo-500 py-3 text-xs uppercase tracking-widest font-black">
            Download Financial Outlook
          </button>
        </div>
      </div>
    </div>
  );
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
