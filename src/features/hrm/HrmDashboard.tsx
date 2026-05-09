import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { 
  Users, 
  Clock, 
  Calendar, 
  Award, 
  TrendingUp,
  UserCheck,
  UserX,
  Briefcase,
  Bell,
  ArrowUpRight,
  MoreHorizontal,
  Shield
} from 'lucide-react';
import { cn } from '../../lib/utils';

const attendanceData = [
  { day: 'Mon', present: 320, absent: 12 },
  { day: 'Tue', present: 315, absent: 17 },
  { day: 'Wed', present: 322, absent: 10 },
  { day: 'Thu', present: 318, absent: 14 },
  { day: 'Fri', present: 310, absent: 22 },
];

export const HrmDashboard: React.FC = () => {
  return (
    <div className="page-container">
      {/* Workforce KPIs */}
      <div className="grid-dashboard">
        <HrmStat 
          title="Consolidated Workforce" 
          value="342" 
          sub="Active Personnel" 
          icon={<Users className="w-5 h-5 text-indigo-600" />}
          trend="+4"
        />
        <HrmStat 
          title="Daily Participation" 
          value="96.4%" 
          sub="328 Reported" 
          icon={<UserCheck className="w-5 h-5 text-emerald-600" />}
          trend="+2.1%"
        />
        <HrmStat 
          title="Leave Capacity" 
          value="14" 
          sub="Authorized Absences" 
          icon={<UserX className="w-5 h-5 text-amber-600" />}
        />
        <HrmStat 
          title="Competency Rating" 
          value="4.2/5" 
          sub="Org. Aggregate" 
          icon={<Award className="w-5 h-5 text-indigo-600" />}
        />
      </div>

      <div className="grid-main">
        {/* Attendance Trends */}
        <div className="lg:col-span-2 card-premium relative">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
             <TrendingUp className="w-64 h-64" />
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest italic">Workforce Presence Analytics</h3>
              <p className="text-subtitle mt-1 italic">Cross-Location Engagement (Weekly Snapshot)</p>
            </div>
            <div className="flex gap-2">
               <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span className="text-[9px] font-black text-slate-500 uppercase">Present</span>
               </div>
               <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="w-2 h-2 rounded-full bg-rose-500" />
                  <span className="text-[9px] font-black text-slate-500 uppercase">Absent</span>
               </div>
            </div>
          </div>
          <div className="h-[300px] w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} />
                <Tooltip 
                   cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }}
                   contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)' }}
                />
                <Bar dataKey="present" fill="#1e293b" radius={[6, 6, 0, 0]} barSize={32} />
                <Bar dataKey="absent" fill="#f43f5e" radius={[6, 6, 0, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Notifications / Alerts Panel */}
        <div className="card-premium flex flex-col">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest italic flex items-center gap-3">
                 <Bell className="w-4 h-4 text-indigo-500" />
                 Intelligence Hub
              </h3>
              <div className="w-2 h-2 bg-rose-500 rounded-full animate-ping" />
           </div>
           <div className="space-y-4 flex-1">
              <AlertItem 
                type="Urgent" 
                title="Critical Staffing Gap" 
                msg="Showroom A Morning shift under-capacity." 
                icon={<UserX className="w-4 h-4" />}
                color="rose"
              />
              <AlertItem 
                type="Update" 
                title="Payroll Finalization" 
                msg="6 days remaining for disbursement." 
                icon={<Clock className="w-4 h-4" />}
                color="indigo"
              />
              <AlertItem 
                type="Request" 
                title="Leave Authorization" 
                msg="Jane Smith requested 5 days Annual Leave." 
                icon={<Calendar className="w-4 h-4" />}
                color="amber"
              />
           </div>
           <button className="btn-secondary w-full mt-8">
              Access Full Ledger
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
         {/* Department Activity */}
         <div className="card-premium group">
            <div className="flex items-center justify-between mb-8">
               <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest italic">Productivity Index</h4>
               <Briefcase className="w-5 h-5 text-slate-300" />
            </div>
            <div className="space-y-6">
               <DeptProgress name="Showroom Operations" percent={94} color="bg-indigo-500" />
               <FinancialSummary label="Accounts Dispatch" status="Optimized" count="08 Professionals" />
               <DeptProgress name="Logistics & Warehousing" percent={82} color="bg-amber-500" />
            </div>
         </div>

         {/* Upcoming Corporate events */}
         <div className="card-premium relative">
            <div className="absolute -bottom-10 -right-10 opacity-[0.02] pointer-events-none">
               <Calendar className="w-48 h-48" />
            </div>
            <div className="flex items-center justify-between mb-8">
               <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest italic">Institutional Timeline</h4>
               <span className="text-[9px] font-black bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full border border-indigo-100">May/Jun Cycle</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <EventCard title="Q2 Assessment" date="May 15" sub="Review Hub" icon={<Award className="w-4 h-4" />} />
               <EventCard title="Safety Protocol" date="May 18" sub="Training Hall" icon={<Shield className="w-4 h-4" />} />
            </div>
            <button className="btn-primary w-full mt-8">
               Operational Calendar
            </button>
         </div>
      </div>
    </div>
  );
};

const AlertItem = ({ type, title, msg, icon, color }: any) => (
  <div className={cn(
    "p-5 rounded-[24px] border-2 transition-all cursor-pointer group hover:shadow-lg",
    color === 'rose' ? "bg-rose-50/50 border-rose-100 hover:border-rose-200" :
    color === 'indigo' ? "bg-indigo-50/50 border-indigo-100 hover:border-indigo-200" :
    color === 'amber' ? "bg-amber-50/50 border-amber-100 hover:border-amber-200" :
    "bg-emerald-50/50 border-emerald-100 hover:border-emerald-200"
  )}>
    <div className="flex gap-4">
      <div className={cn(
        "w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-xl shadow-opacity-20",
        color === 'rose' ? "bg-rose-500" :
        color === 'indigo' ? "bg-indigo-500" :
        color === 'amber' ? "bg-amber-500" : "bg-emerald-500"
      )}>
        {icon}
      </div>
      <div>
         <div className="flex items-center gap-2">
            <span className={cn(
              "text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded",
              color === 'rose' ? "bg-rose-100 text-rose-600" :
              color === 'indigo' ? "bg-indigo-100 text-indigo-600" :
              color === 'amber' ? "bg-amber-100 text-amber-600" : "bg-emerald-100 text-emerald-600"
            )}>{type}</span>
            <h5 className="text-xs font-black text-slate-900 italic">{title}</h5>
         </div>
         <p className="text-[10px] font-medium text-slate-500 mt-1 line-clamp-1">{msg}</p>
      </div>
    </div>
  </div>
);

const DeptProgress = ({ name, percent, color }: any) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center px-1">
      <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest italic">{name}</span>
      <span className="text-[10px] font-black text-slate-900 italic">{percent}%</span>
    </div>
    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
      <div className={cn("h-full rounded-full transition-all duration-1000", color)} style={{ width: `${percent}%` }} />
    </div>
  </div>
);

const EventCard = ({ title, date, sub, icon }: any) => (
  <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-indigo-100 transition-all cursor-pointer">
    <div className="flex items-start justify-between mb-3 text-slate-400">
      {icon}
      <ArrowUpRight className="w-3 h-3" />
    </div>
    <h5 className="text-[11px] font-black text-slate-900 italic uppercase">{title}</h5>
    <div className="flex items-center justify-between mt-2">
      <span className="text-[9px] font-black text-indigo-600">{date}</span>
      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{sub}</span>
    </div>
  </div>
);

const FinancialSummary = ({ label, status, count }: any) => (
  <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl italic">
    <div className="flex flex-col">
       <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{label}</span>
       <span className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em]">{count}</span>
    </div>
    <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest bg-white px-2 py-1 rounded shadow-sm border border-slate-50">{status}</span>
  </div>
);

const HrmStat = ({ title, value, sub, icon, trend }: any) => (
  <div className="card-premium p-6 hover:shadow-2xl hover:border-indigo-100 transition-all group duration-300 border-2 border-slate-50 relative overflow-hidden">
    <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
       {icon}
    </div>
    <div className="flex justify-between items-start mb-6">
      <div className="p-3 bg-white border-2 border-slate-50 rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
        {icon}
      </div>
      {trend && (
        <span className="text-[10px] font-black px-2 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg tracking-widest uppercase italic">
          {trend}
        </span>
      )}
    </div>
    <div className="space-y-1">
      <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</h5>
      <div className="flex items-baseline gap-1">
        <div className="text-3xl font-black text-slate-900 italic tracking-tighter tabular-nums">{value}</div>
      </div>
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1 italic tracking-tight">{sub}</p>
    </div>
  </div>
);

