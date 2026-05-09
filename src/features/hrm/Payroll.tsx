import React, { useState } from 'react';
import { DollarSign, FileText, Download, TrendingUp, CreditCard, Wallet, Search, Eye, Filter, CheckCircle2, MoreVertical, XCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useStore } from '../../context/StoreContext';

const INITIAL_PAYROLL_DATA = [
  { empId: 'EMP-001', name: 'John Doe', role: 'Manager', salary: 4500, status: 'Paid', dept: 'Admin' },
  { empId: 'EMP-002', name: 'Jane Smith', role: 'Sales Executive', salary: 3800, status: 'Pending', dept: 'Sales' },
  { empId: 'EMP-003', name: 'Robert Brown', role: 'Staff', salary: 2800, status: 'Sent', dept: 'Admin' },
  { empId: 'EMP-004', name: 'Emily Davis', role: 'Accountant', salary: 4200, status: 'Paid', dept: 'Accounts' },
  { empId: 'EMP-005', name: 'Michael Wilson', role: 'Manager', salary: 5200, status: 'Paid', dept: 'Accounts' },
];

export const Payroll: React.FC = () => {
  const { state } = useStore();
  const [selectedPay, setSelectedPay] = useState<any>(null);

  const getCalculatedPayroll = () => {
    return INITIAL_PAYROLL_DATA.map(p => {
      const attendance = state.attendanceCount[p.empId] || 0;
      const baseDailyRate = p.salary / 22;
      const deductionDays = Math.max(0, 22 - attendance);
      const attendanceDeduction = baseDailyRate * deductionDays;
      
      const bonus = attendance > 20 ? 500 : attendance > 15 ? 200 : 0;
      const allowances = 300; // House + Transport
      const tax = (p.salary + bonus + allowances - attendanceDeduction) * 0.1;
      const net = (p.salary + bonus + allowances - attendanceDeduction) - tax;
      
      return {
        ...p,
        attendance,
        attendanceDeduction,
        bonus,
        allowances,
        tax,
        net,
        cycle: 'May 1 - May 31, 2026'
      };
    });
  };

  const calculatedData = getCalculatedPayroll();
  const totalPayout = calculatedData.reduce((sum, p) => sum + p.net, 0);

  return (
    <div className="space-y-8 pb-12">
      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <PayoutStat label="Monthly Disbursement" value={`$${totalPayout.toLocaleString()}`} detail="Budget Utilization" icon={<Wallet className="text-indigo-600" />} />
        <PayoutStat label="Outstanding Dues" value="$4,620" detail="3 Pending Items" icon={<CreditCard className="text-rose-600" />} />
        <PayoutStat label="Total Bonuses Paid" value={`$${calculatedData.reduce((acc,p)=>acc+p.bonus,0)}`} detail="Performance Incentives" icon={<TrendingUp className="text-emerald-600" />} />
        <PayoutStat label="Tax Compliance" value={`$${calculatedData.reduce((acc,p)=>acc+p.tax,0).toFixed(0)}`} detail="Payable Q2" icon={<FileText className="text-amber-500" />} />
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-center bg-white p-6 rounded-[32px] border-2 border-slate-100 shadow-xl gap-6">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Active Payroll Cycle</span>
            <div className="flex items-center gap-2">
              <span className="text-base font-black text-slate-900 italic tracking-tight tracking-tight">May 01 - May 31, 2026</span>
              <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[8px] font-black uppercase rounded border border-indigo-100">Live</span>
            </div>
          </div>
          <div className="hidden md:block h-10 w-0.5 bg-slate-100" />
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Distribution Hub</span>
            <div className="flex items-center gap-2">
              <span className="text-base font-black text-emerald-600 italic tracking-tight">4 Days To Release</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none p-3 bg-white border-2 border-slate-100 text-slate-400 hover:text-indigo-600 hover:border-indigo-100 rounded-2xl transition-all shadow-sm">
            <Download className="w-5 h-5 mx-auto" />
          </button>
          <button className="flex-[2] lg:flex-none px-8 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all italic">
            Authorize Disbursement
          </button>
        </div>
      </div>

      <div className="card-premium overflow-hidden border-2 border-slate-100 shadow-2xl">
        <div className="bg-slate-900 p-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
               <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] italic">Personnel Payment Matrix</h3>
               <div className="h-4 w-px bg-slate-700" />
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">All values in USD Nominal</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-3.5 h-3.5" />
                <input type="text" placeholder="Filter Ledger..." className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase text-white outline-none focus:bg-white/10 transition-all" />
              </div>
            </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Personnel Entity</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic text-center">Gross Base</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic text-center">Adjustments</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic text-center">Statutory Ded.</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-900 uppercase tracking-widest italic text-center shadow-inner">Net Payable</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest italic text-center">Process</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {calculatedData.map((p) => (
                <tr key={p.empId} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="text-sm font-black text-slate-900 italic tracking-tight">{p.name}</div>
                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{p.attendance} Duty Days Logged</div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-xs font-black text-slate-600 tabular-nums italic">${p.salary.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-black text-emerald-600 italic">+${p.bonus + p.allowances}</span>
                      <span className="text-[8px] font-bold text-rose-400 italic">-${p.attendanceDeduction.toFixed(0)} Attn.</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-xs font-black text-rose-500 tabular-nums italic">-${p.tax.toFixed(0)}</span>
                  </td>
                  <td className="px-6 py-5 text-center bg-slate-50/50">
                    <span className="text-sm font-black text-slate-950 tabular-nums italic tracking-tighter">${p.net.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="flex justify-center">
                      <span className={cn(
                        "text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border shadow-sm italic",
                        p.status === 'Paid' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                        p.status === 'Sent' ? "bg-indigo-50 text-indigo-600 border-indigo-100" : "bg-amber-50 text-amber-600 border-amber-100 animate-pulse"
                      )}>
                        {p.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button 
                      onClick={() => setSelectedPay(p)}
                      className="p-2 bg-white border border-slate-100 text-slate-400 hover:text-indigo-600 rounded-xl transition-all shadow-sm opacity-0 group-hover:opacity-100"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payslip View Modal */}
      {selectedPay && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[48px] w-full max-w-2xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-12 border-b-2 border-slate-50 relative bg-slate-50">
               <button 
                onClick={() => setSelectedPay(null)}
                className="absolute top-10 right-10 p-2 hover:bg-slate-200 rounded-full transition-all"
               >
                 <XCircle className="w-8 h-8 text-slate-300" />
               </button>
               <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-slate-900 text-white rounded-[32px] flex items-center justify-center font-black italic text-4xl shadow-2xl">DT</div>
                  <div>
                    <h3 className="text-3xl font-black text-slate-900 italic tracking-tighter uppercase whitespace-nowrap">Official Earnings Statement</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-2">DressTown International • {selectedPay.cycle}</p>
                  </div>
               </div>
            </div>
            <div className="p-16 space-y-12">
               <div className="grid grid-cols-2 gap-16">
                  <div className="space-y-6">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 border-b-2 border-slate-100 pb-3">Personnel Information</p>
                     <div className="space-y-4">
                        <InfoItem label="Entity name" value={selectedPay.name} />
                        <InfoItem label="Role Classification" value={selectedPay.role} />
                        <InfoItem label="Dept Unit" value={selectedPay.dept} />
                        <InfoItem label="Account ID" value={selectedPay.empId} />
                     </div>
                  </div>
                  <div className="space-y-6">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 border-b-2 border-slate-100 pb-3">Compensation breakdown</p>
                     <div className="space-y-4">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-slate-400 uppercase tracking-widest">Base Earnings</span>
                          <span className="font-black text-slate-900 italic">${selectedPay.salary.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-slate-400 uppercase tracking-widest">Allowances</span>
                          <span className="font-black text-emerald-600 italic">+${selectedPay.allowances}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-slate-400 uppercase tracking-widest">Performance Bonus</span>
                          <span className="font-black text-emerald-600 italic">+${selectedPay.bonus}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-slate-400 uppercase tracking-widest">Absence Deduction</span>
                          <span className="font-black text-rose-500 italic">-${selectedPay.attendanceDeduction.toFixed(0)}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-slate-400 uppercase tracking-widest">Tax (10% PAYE)</span>
                          <span className="font-black text-rose-500 italic">-${selectedPay.tax.toFixed(0)}</span>
                        </div>
                     </div>
                  </div>
               </div>
               
               <div className="bg-slate-50 p-10 rounded-[40px] border-2 border-slate-100 flex items-center justify-between shadow-inner">
                  <div className="space-y-1">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Consolidated Net Payable</p>
                     <p className="text-xs font-bold text-slate-500 uppercase">Released via Bank Transfer</p>
                  </div>
                  <div className="text-right">
                     <div className="text-5xl font-black text-slate-900 italic tracking-tighter tabular-nums">${selectedPay.net.toLocaleString()}</div>
                     <div className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] mt-2 italic shadow-emerald-500/10 underline underline-offset-4 decoration-2">Status: {selectedPay.status}</div>
                  </div>
               </div>

               <div className="flex gap-6">
                  <button className="flex-1 py-5 bg-slate-100 text-slate-400 rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all italic">
                    Contact Payroll Admin
                  </button>
                  <button className="flex-1 py-5 bg-slate-900 text-white rounded-3xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-3 italic">
                    <Download className="w-4 h-4" />
                    Download Official PDF
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const InfoItem = ({ label, value }: { label: string, value: string }) => (
  <div className="space-y-0.5">
    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
    <p className="text-sm font-black text-slate-900 italic tracking-tight">{value}</p>
  </div>
);

const PayoutStat = ({ label, value, detail, icon }: any) => (
  <div className="card-premium p-6 hover:shadow-2xl hover:border-indigo-100 transition-all group duration-300">
    <div className="flex justify-between items-start mb-6">
      <div className="w-12 h-12 bg-white border-2 border-slate-50 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">{detail}</div>
    </div>
    <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</h5>
    <div className="text-3xl font-black text-slate-900 tabular-nums italic tracking-tighter">{value}</div>
  </div>
);

