import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Award, Zap, BarChart3, Clock, Target } from 'lucide-react';
import { cn } from '../../lib/utils';

const PRODUCTIVITY_TREND = [
  { day: 'Mon', output: 4500 },
  { day: 'Tue', output: 5200 },
  { day: 'Wed', output: 4800 },
  { day: 'Thu', output: 6100 },
  { day: 'Fri', output: 5900 },
  { day: 'Sat', output: 3200 },
];

const LINE_OUTPUT = [
  { name: 'Line A', output: 2400 },
  { name: 'Line B', output: 1800 },
  { name: 'Line C', output: 3200 },
  { name: 'Line D', output: 1500 },
];

const ORDER_STATUS_MIX = [
  { name: 'Scheduled', value: 15, color: '#6366f1' },
  { name: 'In Progress', value: 45, color: '#10b981' },
  { name: 'Delayed', value: 10, color: '#f43f5e' },
  { name: 'Completed', value: 30, color: '#f59e0b' },
];

export const ProductionAnalytics: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black text-slate-900 italic tracking-tight underline decoration-indigo-500/30 decoration-4 underline-offset-4">Advanced Analytics Engine</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">Operational Intelligence / Factory Floor Telemetry</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Production Today', value: '12,480', trend: '+8.4%', icon: Zap, color: 'indigo' },
          { label: 'Active Production Lines', value: '04 / 06', trend: 'Optimal', icon: Target, color: 'emerald' },
          { label: 'Avg Line Efficiency', value: '91.2%', trend: '+2.1%', icon: Award, color: 'amber' },
          { label: 'Delayed Work Orders', value: '03', trend: '-20%', icon: Clock, color: 'rose' },
        ].map((stat, i) => (
          <div key={i} className="card-premium p-6 border-slate-200/60 shadow-lg group hover:scale-[1.02] transition-all">
             <div className="flex items-center justify-between mb-4">
                <div className={cn(
                  "w-10 h-10 rounded-2xl flex items-center justify-center transition-all shadow-sm",
                  stat.color === 'indigo' ? "bg-indigo-50 text-indigo-600" :
                  stat.color === 'emerald' ? "bg-emerald-50 text-emerald-600" :
                  stat.color === 'amber' ? "bg-amber-50 text-amber-600" :
                  "bg-rose-50 text-rose-600"
                )}>
                   <stat.icon className="w-5 h-5" />
                </div>
                <span className={cn(
                  "text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest",
                  stat.trend.startsWith('+') ? "bg-emerald-50 text-emerald-600" :
                  stat.trend.startsWith('-') ? "bg-rose-50 text-rose-600" :
                  "bg-slate-100 text-slate-500"
                )}>{stat.trend}</span>
             </div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
             <h4 className="text-2xl font-black text-slate-900 italic tracking-tighter tabular-nums">{stat.value}</h4>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card-premium p-8 border-slate-200/60 shadow-xl">
           <h4 className="text-sm font-black text-slate-900 mb-6 italic tracking-tight">Daily Production Trend</h4>
           <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={PRODUCTIVITY_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                    <Tooltip 
                       contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Line type="monotone" dataKey="output" stroke="#6366f1" strokeWidth={3} dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }} />
                 </LineChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="card-premium p-8 border-slate-200/60 shadow-xl">
           <h4 className="text-sm font-black text-slate-900 mb-6 italic tracking-tight">Output per Production Line</h4>
           <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={LINE_OUTPUT} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                    <Bar dataKey="output" fill="#10b981" radius={[4, 4, 0, 0]} />
                 </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="lg:col-span-2 card-premium p-8 border-slate-200/60 shadow-xl flex flex-col items-center">
           <h4 className="text-sm font-black text-slate-900 mb-8 italic tracking-tight self-start">Work Order Status Distribution</h4>
           <div className="flex flex-col md:flex-row items-center gap-12 w-full">
              <div className="h-[250px] w-[300px] relative">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                       <Pie data={ORDER_STATUS_MIX} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                          {ORDER_STATUS_MIX.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                       </Pie>
                       <Tooltip />
                    </PieChart>
                 </ResponsiveContainer>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                 {ORDER_STATUS_MIX.map((item) => (
                    <div key={item.name} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
                       <div className="flex items-center gap-2 mb-2">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.name}</span>
                       </div>
                       <div className="text-xl font-black text-slate-900 italic">{item.value}%</div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
