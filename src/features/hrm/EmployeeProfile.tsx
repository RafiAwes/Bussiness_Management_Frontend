import React from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase, 
  Award, 
  Clock, 
  DollarSign, 
  FileText, 
  ChevronLeft,
  ArrowUpRight,
  Shield,
  Zap
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface EmployeeProfileProps {
  onBack?: () => void;
  employeeId?: string;
}

const DUMMY_PROFILE = {
  id: 'EMP-001',
  name: 'John Doe',
  role: 'Manager',
  department: 'Admin',
  location: 'Showroom A',
  email: 'john.d@dresstown.com',
  phone: '+1 (555) 0123 4567',
  joined: 'Jan 15, 2022',
  status: 'Active',
  avatar: 'JD',
  stats: {
    attendance: '98.5%',
    performance: '4.8/5',
    projects: '12 Completed'
  },
  payroll: [
    { month: 'April 2024', amount: '$4,500.00', status: 'Paid', date: '2024-04-30' },
    { month: 'March 2024', amount: '$4,500.00', status: 'Paid', date: '2024-03-31' },
    { month: 'February 2024', amount: '$4,500.00', status: 'Paid', date: '2024-02-28' },
  ],
  reviews: [
    { date: 'Mar 15, 2024', score: 4.9, reviewer: 'David Boss', comment: 'Exceptional leadership during the Q1 expansion.' },
    { date: 'Dec 10, 2023', score: 4.7, reviewer: 'David Boss', comment: 'Consistent performance and great team management.' },
  ]
};

export const EmployeeProfile: React.FC<EmployeeProfileProps> = ({ onBack, employeeId }) => {
  // In a real app, fetch employeeId data
  const profile = DUMMY_PROFILE;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      {/* Header Actions */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-3 bg-white border-2 border-slate-100 rounded-2xl text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all shadow-sm"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h3 className="text-xl font-black text-slate-900 italic uppercase">Personnel Profile</h3>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{profile.id} • Detailed Dossier</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Basic Info Sidebar */}
        <div className="space-y-8">
          <div className="card-premium p-8 border-2 border-slate-100 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:rotate-12 transition-transform duration-700">
               <User className="w-48 h-48" />
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-[32px] bg-slate-900 text-white flex items-center justify-center text-3xl font-black italic shadow-2xl mb-6">
                {profile.avatar}
              </div>
              <h4 className="text-xl font-black text-slate-900 italic tracking-tight">{profile.name}</h4>
              <p className="text-xs font-black text-indigo-600 uppercase tracking-widest mt-1">{profile.role}</p>
              
              <div className="mt-8 space-y-4 w-full">
                <InfoRow icon={<Mail className="w-4 h-4" />} label="Email" value={profile.email} />
                <InfoRow icon={<Phone className="w-4 h-4" />} label="Phone" value={profile.phone} />
                <InfoRow icon={<MapPin className="w-4 h-4" />} label="Location" value={profile.location} />
                <InfoRow icon={<Calendar className="w-4 h-4" />} label="Joined" value={profile.joined} />
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100 w-full">
                 <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Duty Status</span>
                    <span className="text-[9px] font-black px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full italic shadow-sm uppercase">Deployed</span>
                 </div>
                 <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl italic">
                   Initiate Communication
                 </button>
              </div>
            </div>
          </div>

          <div className="card-premium p-6 border-2 border-slate-50 shadow-xl space-y-4">
             <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-widest italic border-l-4 border-indigo-500 pl-3">Security Clearances</h5>
             <div className="grid grid-cols-2 gap-3">
                <SecurityBadge label="Internal ERP" icon={<Shield className="w-3 h-3" />} />
                <SecurityBadge label="Financials" icon={<DollarSign className="w-3 h-3" />} />
                <SecurityBadge label="Logistics" icon={<Zap className="w-3 h-3" />} />
             </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatBox label="Attendance Rating" value={profile.stats.attendance} icon={<Clock className="w-4 h-4 text-emerald-500" />} />
            <StatBox label="Performance Score" value={profile.stats.performance} icon={<Award className="w-4 h-4 text-indigo-500" />} />
            <StatBox label="Projects Completed" value={profile.stats.projects} icon={<ArrowUpRight className="w-4 h-4 text-amber-500" />} />
          </div>

          {/* Detailed Tabs/Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {/* Payroll Ledger */}
             <div className="card-premium p-8 border-2 border-slate-100 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-[0.02]">
                   <FileText className="w-32 h-32" />
                </div>
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest italic mb-8">Financial Disbursement History</h4>
                <div className="space-y-4 relative z-10">
                   {profile.payroll.map((pay, i) => (
                     <div key={i} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-indigo-100 transition-all group cursor-default">
                        <div className="flex justify-between items-center">
                           <div>
                              <div className="text-[11px] font-black text-slate-900 italic uppercase">{pay.month}</div>
                              <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{pay.date}</div>
                           </div>
                           <div className="text-right">
                              <div className="text-xs font-black text-slate-900 tabular-nums">{pay.amount}</div>
                              <div className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Disbursed</div>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
                <button className="w-full mt-8 py-3 text-[10px] font-black text-slate-500 uppercase tracking-widest border border-slate-200 rounded-xl hover:bg-slate-50 transition-all italic">
                   View Full Ledger
                </button>
             </div>

             {/* Performance Reviews */}
             <div className="card-premium p-8 border-2 border-slate-100 shadow-xl bg-slate-900 text-white">
                <h4 className="text-sm font-black text-white uppercase tracking-widest italic mb-8">Performance Appraisals</h4>
                <div className="space-y-6">
                   {profile.reviews.map((rev, i) => (
                     <div key={i} className="relative pl-6 border-l border-white/10">
                        <div className="absolute left-0 top-0 -translate-x-1/2 w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,1)]" />
                        <div className="flex justify-between items-start mb-2">
                           <div>
                              <div className="text-[11px] font-black italic uppercase text-indigo-400">{rev.date}</div>
                              <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Reviewer: {rev.reviewer}</div>
                           </div>
                           <div className="text-2xl font-black italic">{rev.score}</div>
                        </div>
                        <p className="text-[10px] font-medium text-slate-400 leading-relaxed italic">"{rev.comment}"</p>
                     </div>
                   ))}
                </div>
             </div>
          </div>

          {/* Department Structure Visual */}
          <div className="card-premium p-8 border-2 border-slate-50 shadow-xl overflow-hidden group">
             <div className="flex items-center justify-between mb-8">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest italic">Organizational Context</h4>
                <Briefcase className="w-5 h-5 text-slate-200 group-hover:text-indigo-400 transition-colors" />
             </div>
             <div className="relative pt-8 pb-4 flex flex-col items-center">
                <div className="px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest italic shadow-xl z-10 relative">
                   Executive Management
                </div>
                <div className="w-px h-8 bg-slate-200 my-2" />
                <div className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest italic shadow-xl z-20 relative scale-110">
                   {profile.department} Unit
                </div>
                <div className="w-px h-8 bg-slate-200 my-2" />
                <div className="px-6 py-3 bg-white border-2 border-indigo-100 text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest italic shadow-lg z-30 relative ring-4 ring-indigo-50">
                   Active Node: {profile.name}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ icon, label, value }: any) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="p-1.5 bg-slate-50 text-slate-400 rounded-lg">
        {icon}
      </div>
      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
    </div>
    <span className="text-[10px] font-black text-slate-900 italic">{value}</span>
  </div>
);

const SecurityBadge = ({ label, icon }: any) => (
  <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl group hover:border-indigo-100 transition-all">
    <div className="text-slate-400 group-hover:text-indigo-500 transition-colors">
      {icon}
    </div>
    <span className="text-[8px] font-black text-slate-600 uppercase tracking-tight">{label}</span>
  </div>
);

const StatBox = ({ label, value, icon }: any) => (
  <div className="card-premium p-6 border-2 border-slate-50 shadow-lg hover:shadow-xl transition-all group">
    <div className="flex justify-between items-start mb-4">
       <div className="p-2.5 bg-white border-2 border-slate-50 rounded-xl shadow-sm text-slate-900 group-hover:scale-110 transition-transform">
          {icon}
       </div>
       <ArrowUpRight className="w-3 h-3 text-slate-300" />
    </div>
    <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 italic">{label}</h5>
    <div className="text-2xl font-black text-slate-900 italic tracking-tighter">{value}</div>
  </div>
);
