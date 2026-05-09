import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import { 
  Settings, 
  Activity, 
  Cpu, 
  Zap, 
  Wrench,
  AlertOctagon,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { cn } from '../../lib/utils';

const efficiencyData = [
  { time: '08:00', efficiency: 82 },
  { time: '10:00', efficiency: 88 },
  { time: '12:00', efficiency: 75 }, // Break time dip
  { time: '14:00', efficiency: 94 },
  { time: '16:00', efficiency: 91 },
  { time: '18:00', efficiency: 85 },
];

const maintenanceStats = [
  { subject: 'Hydraulics', A: 120, fullMark: 150 },
  { subject: 'Electrical', A: 98, fullMark: 150 },
  { subject: 'Conveyor', A: 86, fullMark: 150 },
  { subject: 'Sensors', A: 140, fullMark: 150 },
  { subject: 'Cooling', A: 110, fullMark: 150 },
];

export const ProductionDashboard: React.FC = () => {
  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700">
      {/* Factory KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductionStat 
          label="Total Output Today" 
          value="12,480" 
          status="On Track"
          icon={<Zap className="w-5 h-5 text-indigo-500" />}
          trend="+8%"
        />
        <ProductionStat 
          label="Active Work Orders" 
          value="24" 
          status="Optimal"
          icon={<Cpu className="w-5 h-5 text-emerald-500" />}
        />
        <ProductionStat 
          label="Orders Delayed" 
          value="03" 
          status="Warning"
          icon={<AlertOctagon className="w-5 h-5 text-rose-500" />}
          invert
          trend="Critical"
        />
        <ProductionStat 
          label="Global Efficiency" 
          value="91.2%" 
          status="Minimal"
          icon={<Activity className="w-5 h-5 text-amber-500" />}
          trend="+2.4%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Real-time Efficiency Area Chart */}
        <div className="lg:col-span-2 card-premium p-8 border-slate-200/60 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 blur-2xl" />
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-sm font-black text-slate-900 italic tracking-tight">Shift Efficiency Profile</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Daily Operational Velocity</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full">
                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[9px] font-black text-emerald-600 uppercase">Live Feed</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={efficiencyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="prodGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} domain={[0, 100]} />
                <Tooltip 
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="efficiency" stroke="#6366f1" fill="url(#prodGradient)" strokeWidth={4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Machine Health Radar */}
        <div className="card-premium p-8 border-slate-200/60 shadow-xl">
          <h3 className="text-sm font-black text-slate-900 mb-6 flex items-center gap-2 italic tracking-tight">
            <Settings className="w-4 h-4 text-slate-400" />
            Component Readiness
          </h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={maintenanceStats}>
                <PolarGrid stroke="#f1f5f9" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fontWeight: 700, fill: '#64748b' }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar name="Health" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.5} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 pt-6 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-tight">Predictive<br />Maintenance</span>
            <span className="text-[10px] font-black text-slate-900 bg-slate-100 px-3 py-1 rounded-lg italic">May 14th (Line B)</span>
          </div>
        </div>
      </div>

      {/* Production Line Overlays */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <LineStatusCard unit="Line A (Main)" item="T-Shirt XL" status="Optimized" load={85} />
        <LineStatusCard unit="Line B (Sec)" item="Cotton Pants" status="In Maintenance" load={0} isDown />
        <LineStatusCard unit="Line C (Batch)" item="Denim Jacket" status="Peak Performance" load={98} />
      </div>
    </div>
  );
};

const LineStatusCard = ({ unit, item, status, load, isDown }: any) => (
  <div className={cn(
    "card-premium p-6 flex flex-col gap-5 border-slate-200/60 shadow-lg group hover:scale-[1.02] transition-all",
    isDown && "border-2 border-rose-100 bg-rose-50/10"
  )}>
    <div className="flex justify-between items-start">
      <div>
        <h4 className="text-sm font-black text-slate-900 italic tracking-tight">{unit}</h4>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-0.5">{item}</p>
      </div>
      <div className={cn(
        "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
        isDown ? "bg-rose-100 text-rose-600 shadow-sm shadow-rose-200" : "bg-slate-50 text-slate-400 shadow-sm"
      )}>
        <Activity className="w-5 h-5" />
      </div>
    </div>
    
    <div className="space-y-3 mt-auto">
      <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
        <span className={isDown ? "text-rose-500" : "text-emerald-500"}>{status}</span>
        <span className="text-slate-900 tabular-nums">{load}% Output</span>
      </div>
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
        <div 
          className={cn(
            "h-full transition-all duration-1000",
            load > 90 ? "bg-amber-500" : isDown ? "bg-rose-500" : "bg-indigo-500"
          )}
          style={{ width: `${load}%` }}
        />
      </div>
    </div>
  </div>
);

const ProductionStat = ({ label, value, status, icon, invert, trend }: any) => (
  <div className="card-premium p-8 group hover:border-slate-300 transition-all shadow-xl bg-white border-slate-200/60">
    <div className="flex items-center justify-between mb-6">
      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center shadow-inner group-hover:bg-slate-100 transition-colors">
        {icon}
      </div>
      {trend && (
        <span className={cn(
          "text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest",
          trend.startsWith('+') ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
        )}>
          {trend}
        </span>
      )}
    </div>
    <div className="space-y-1">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{label}</p>
      <h4 className="text-3xl font-black text-slate-950 italic tracking-tighter tabular-nums">{value}</h4>
    </div>
    <div className="flex items-center gap-2 mt-6 pt-6 border-t border-slate-50">
      <div className={cn(
        "w-2 h-2 rounded-full shadow-sm",
        status === 'Optimal' || status === 'Minimal' || status === 'On Track' ? 'bg-emerald-500' : 'bg-rose-500'
      )} />
      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{status} Status</span>
    </div>
  </div>
);
