import React from 'react';
import { TrendingUp, TrendingDown, Target, Star, Award, Zap, Activity, Users, MoreHorizontal } from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  LineChart, 
  Line,
  Cell
} from 'recharts';
import { cn } from '../../lib/utils';

const PERFORMANCE_DATA = [
  { name: 'John D.', rating: 4.8, attendance: 98, tasks: 92, sales: 125000 },
  { name: 'Sarah S.', rating: 4.5, attendance: 95, tasks: 88, sales: 98000 },
  { name: 'Mike J.', rating: 4.9, attendance: 100, tasks: 95, sales: 156000 },
  { name: 'Emma W.', rating: 4.2, attendance: 92, tasks: 85, sales: 75000 },
  { name: 'Robert B.', rating: 3.8, attendance: 85, tasks: 78, sales: 45000 },
];

const salesTrend = [
  { month: 'Jan', value: 450000 },
  { month: 'Feb', value: 520000 },
  { month: 'Mar', value: 490000 },
  { month: 'Apr', value: 610000 },
  { month: 'May', value: 680000 },
];

export const Performance: React.FC = () => {
  return (
    <div className="space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <PerfMetric label="Efficiency index" value="94.8%" trend="+2.4%" icon={<Zap className="text-amber-500" />} />
        <PerfMetric label="Retention Goal" value="98.2%" trend="+0.5%" icon={<Target className="text-indigo-500" />} />
        <PerfMetric label="Avg. Perform Rating" value="4.4" sub="/ 5.0" icon={<Star className="text-yellow-500" />} />
        <PerfMetric label="Certified Lead" value="12" sub="Specialists" icon={<Award className="text-emerald-500" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Performance Chart */}
        <div className="lg:col-span-2 card-premium p-8 shadow-xl">
          <div className="flex items-center justify-between mb-8">
             <div>
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest italic">Organizational output Trend</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Aggregate Sales Capacity (Showroom Alpha + Beta)</p>
             </div>
             <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-2xl border border-emerald-100">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Optimized</span>
             </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} />
                <Tooltip 
                   contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', padding: '12px' }}
                />
                <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={5} dot={{ r: 6, fill: '#6366f1', strokeWidth: 3, stroke: '#fff' }} activeDot={{ r: 8, strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Performers */}
        <div className="card-premium p-8 shadow-xl flex flex-col">
           <div className="flex items-center justify-between mb-8">
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest italic">Elite Performers</h4>
              <Award className="w-5 h-5 text-indigo-500" />
           </div>
           <div className="space-y-6 flex-1">
              {PERFORMANCE_DATA.sort((a,b) => b.rating - a.rating).slice(0, 4).map((staff, idx) => (
                <div key={staff.name} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-200 transition-all">
                   <div className="flex items-center gap-4">
                      <div className="relative">
                         <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-xs font-black text-slate-900 italic shadow-sm group-hover:scale-110 transition-transform">
                           {staff.name.split(' ').map(n=>n[0]).join('')}
                         </div>
                         {idx === 0 && <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center shadow-lg"><Star className="w-3 h-3 text-white" /></div>}
                      </div>
                      <div>
                        <div className="text-sm font-black text-slate-900 italic">{staff.name}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Score: {staff.rating} / 5.0</div>
                      </div>
                   </div>
                   <div className="text-right">
                      <div className="text-xs font-black text-slate-900 italic tracking-tighter">${(staff.sales / 1000).toFixed(0)}k</div>
                      <div className="text-[8px] font-black text-emerald-500 uppercase tracking-widest mt-0.5">Value Generated</div>
                   </div>
                </div>
              ))}
           </div>
           <button className="w-full mt-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl italic">
              Access Full Assessment Hub
           </button>
        </div>
      </div>

      {/* Stats Breakdown Table Integration Style */}
      <div className="card-premium border-2 border-slate-100 overflow-hidden shadow-2xl">
         <div className="p-8 border-b-2 border-slate-100 bg-slate-50 flex items-center justify-between">
            <div>
               <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest italic">Multi-Factor capability Review</h4>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Cross-referencing Attendance, Tasks, and Commercial Output</p>
            </div>
            <button className="p-3 bg-white border border-slate-100 rounded-xl hover:bg-slate-50 transition-all text-slate-400 hover:text-slate-900">
               <MoreHorizontal className="w-5 h-5" />
            </button>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-white">
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Personnel Entity</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic text-center">Attendance Health</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic text-center">Task Completion</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic text-center">Sales Target</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic text-right">Aggregate index</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {PERFORMANCE_DATA.map((staff) => (
                    <tr key={staff.name} className="hover:bg-slate-50/50 transition-colors">
                       <td className="px-8 py-5">
                          <div className="text-sm font-black text-slate-900 italic">{staff.name}</div>
                       </td>
                       <td className="px-8 py-5">
                          <div className="flex flex-col items-center gap-1.5">
                             <span className="text-[10px] font-black text-slate-900 tabular-nums italic">{staff.attendance}%</span>
                             <div className="w-24 h-1 bg-slate-100 rounded-full overflow-hidden">
                                <div className={cn(
                                  "h-full rounded-full transition-all duration-1000",
                                  staff.attendance >= 95 ? "bg-emerald-500" : staff.attendance >= 85 ? "bg-amber-500" : "bg-rose-500"
                                )} style={{ width: `${staff.attendance}%` }} />
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-5">
                          <div className="flex flex-col items-center gap-1.5">
                             <span className="text-[10px] font-black text-slate-900 tabular-nums italic">{staff.tasks}%</span>
                             <div className="w-24 h-1 bg-slate-100 rounded-full overflow-hidden">
                                <div className={cn(
                                  "h-full rounded-full transition-all duration-1000",
                                  staff.tasks >= 90 ? "bg-indigo-500" : staff.tasks >= 80 ? "bg-amber-500" : "bg-rose-500"
                                )} style={{ width: `${staff.tasks}%` }} />
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-5 text-center">
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-lg border border-slate-100">
                             <Activity className="w-3 h-3 text-indigo-500" />
                             <span className="text-[10px] font-black text-slate-900 italic tracking-tight">${(staff.sales / 1000).toFixed(0)}k</span>
                          </div>
                       </td>
                       <td className="px-8 py-5 text-right">
                          <div className="inline-flex items-center gap-3">
                             <RatingStars rating={staff.rating} />
                             <span className="text-sm font-black text-slate-900 italic">{staff.rating}</span>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

const PerfMetric = ({ label, value, trend, sub, icon }: any) => (
  <div className="card-premium p-6 hover:shadow-xl transition-all border-2 border-slate-50 group duration-300">
    <div className="flex justify-between items-start mb-6">
      <div className="p-3 bg-white border border-slate-100 rounded-2xl group-hover:scale-110 transition-transform shadow-sm">
        {icon}
      </div>
      {trend && (
        <span className="text-[10px] font-black px-2.5 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg tracking-widest uppercase italic">
          {trend}
        </span>
      )}
    </div>
    <div className="space-y-1">
      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</h4>
      <div className="flex items-baseline gap-1">
        <div className="text-3xl font-black text-slate-900 italic tracking-tighter tabular-nums">{value}</div>
        {sub && <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{sub}</span>}
      </div>
    </div>
  </div>
);

const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "w-3 h-3",
            star <= rating ? "fill-amber-400 text-amber-400" : "fill-slate-100 text-slate-100"
          )}
        />
      ))}
    </div>
  );
};
