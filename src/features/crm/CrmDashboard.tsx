import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { 
  Users, 
  UserPlus, 
  Smile, 
  Heart, 
  MessageSquare,
  AlertCircle,
  TrendingUp,
  Search,
  Briefcase,
  Zap,
  Target,
  Globe
} from 'lucide-react';
import { cn } from '../../lib/utils';

const customerSegment = [
  { name: 'VIP', value: 15, color: '#f59e0b' },
  { name: 'Wholesale', value: 45, color: '#6366f1' },
  { name: 'Retail', value: 30, color: '#ec4899' },
  { name: 'Lead', value: 10, color: '#64748b' },
];

const conversionTrend = [
  { name: 'Jan', rate: 12 },
  { name: 'Feb', rate: 15 },
  { name: 'Mar', rate: 14 },
  { name: 'Apr', rate: 22 },
  { name: 'May', rate: 25 },
];

export const CrmDashboard: React.FC = () => {
  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700">
      {/* CRM KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CrmStat 
          title="Total Global Leads" 
          value="4,280" 
          trend="+12% WoW" 
          icon={<Target className="w-5 h-5 text-indigo-500" />}
        />
        <CrmStat 
          title="Conversion Velocity" 
          value="24.8%" 
          trend="+3.2%" 
          icon={<Zap className="w-5 h-5 text-amber-500" />}
        />
        <CrmStat 
          title="Active Deal Value" 
          value="$1.8M" 
          trend="High Cap" 
          icon={<Briefcase className="w-5 h-5 text-emerald-500" />}
        />
        <CrmStat 
          title="Repeat Cust. rate" 
          value="68.4%" 
          trend="Stable" 
          icon={<Heart className="w-5 h-5 text-rose-500" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Customer Segments */}
        <div className="card-premium p-8 flex flex-col shadow-xl">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2 italic mb-8">
            <Users className="w-4 h-4 text-indigo-500" />
            Market Segmentation
          </h3>
          <div className="h-[250px] w-full mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={customerSegment}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {customerSegment.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '10px', fontWeight: 900 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-auto">
            {customerSegment.map((item) => (
              <div key={item.name} className="flex flex-col p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.name}</span>
                </div>
                <span className="text-base font-black text-slate-900 italic">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Conversion Trends */}
        <div className="lg:col-span-2 card-premium p-8 shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest italic">Lead Conversion Velocity</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Cross-Platform Funnel Efficiency</p>
            </div>
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-lg border border-emerald-100">
                  <TrendingUp className="w-3 h-3 text-emerald-500" />
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Efficient</span>
               </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={conversionTrend}>
                <defs>
                  <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} />
                <Tooltip />
                <Area type="monotone" dataKey="rate" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorRate)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* At-Risk Accounts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card-premium p-8 border-l-8 border-l-rose-500 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 text-rose-500/10">
              <AlertCircle className="w-24 h-24" />
           </div>
           <h4 className="text-xs font-black text-rose-600 uppercase tracking-[0.2em] mb-6 flex items-center gap-3 italic">
            <AlertCircle className="w-5 h-5 animate-pulse" />
            Urgent: Retention Alert Pipeline
          </h4>
          <div className="space-y-4 relative z-10">
            <AtRiskRow name="Urban Outfitters" lastOrder="48 Days Ago" value="$42,000" health={32} />
            <AtRiskRow name="Nordstrom East" lastOrder="35 Days Ago" value="$185,000" health={45} />
            <AtRiskRow name="Private Label Co." lastOrder="32 Days Ago" value="$12,500" health={58} />
          </div>
        </div>

        <div className="card-premium p-8 shadow-2xl bg-slate-900 text-white">
          <div className="flex items-center justify-between mb-8">
             <h4 className="text-xs font-black text-indigo-400 uppercase tracking-[0.2em] italic">CRM Activity Stream</h4>
             <span className="text-[10px] font-black uppercase text-slate-500">Live Updates</span>
          </div>
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer group">
               <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white italic font-black shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                  LD
               </div>
               <div>
                  <div className="text-sm font-black italic">Lead Converted: Thomas Müller</div>
                  <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mt-0.5">Value: $85,000 • Closed by Sarah J.</div>
                  <div className="text-[10px] text-slate-500 italic mt-2 uppercase tracking-tighter">24 minutes ago</div>
               </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer group">
               <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white italic font-black shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
                  TK
               </div>
               <div>
                  <div className="text-sm font-black italic">Task Completed: Spring Finalization</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Entity: Zara International • Ref: TK-092</div>
                  <div className="text-[10px] text-slate-500 italic mt-2 uppercase tracking-tighter">2 hours ago</div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AtRiskRow = ({ name, lastOrder, value, health }: any) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
    <div className="flex-1">
      <div className="text-sm font-black text-slate-900 italic tracking-tight">{name}</div>
      <div className="flex items-center gap-3 mt-1">
         <span className="text-[9px] text-rose-500 font-black uppercase tracking-widest italic">{lastOrder}</span>
         <div className="w-24 h-1 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-rose-500 rounded-full" style={{ width: `${health}%` }} />
         </div>
      </div>
    </div>
    <div className="text-right">
      <div className="text-sm font-black text-slate-900 tabular-nums italic">{value}</div>
      <div className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Account Exposed</div>
    </div>
  </div>
);

const CrmStat = ({ title, value, trend, icon }: any) => (
  <div className="card-premium p-8 hover:shadow-2xl hover:border-indigo-100 transition-all duration-300 group">
    <div className="flex justify-between items-start mb-6">
      <div className="w-14 h-14 rounded-2xl bg-white border-2 border-slate-50 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <span className={cn(
        "text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase border",
        trend.includes('+') ? "bg-emerald-50 text-emerald-600 border-emerald-100" : 
        trend.includes('-') ? "bg-rose-50 text-rose-600 border-rose-100" : "bg-indigo-50 text-indigo-600 border-indigo-100"
      )}>
        {trend}
      </span>
    </div>
    <div className="space-y-1">
      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{title}</h4>
      <div className="text-3xl font-black text-slate-900 tabular-nums italic tracking-tighter">{value}</div>
    </div>
  </div>
);
