import React, { useState } from 'react';
import { User, Truck, CreditCard, Clock, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const CUSTOMER_DUES = [
  { id: 'DUE-001', name: 'Zara International', total: 125000, paid: 85000, balance: 40000, lastPay: '2024-04-20', status: 'Partial' },
  { id: 'DUE-002', name: 'GAP Inc.', total: 45000, paid: 0, balance: 45000, lastPay: '-', status: 'Due' },
  { id: 'DUE-003', name: 'Nordstrom', total: 32000, paid: 32000, balance: 0, lastPay: '2024-05-01', status: 'Paid' },
];

const SUPPLIER_PAYMENTS = [
  { id: 'PAY-101', name: 'Textile Pro Co', total: 25000, paid: 25000, balance: 0, lastPay: '2024-05-02', status: 'Paid' },
  { id: 'PAY-102', name: 'YKK Zippers Ltd', total: 12000, paid: 4000, balance: 8000, lastPay: '2024-04-15', status: 'Partial' },
  { id: 'PAY-103', name: 'Logistics Express', total: 8500, paid: 0, balance: 8500, lastPay: '-', status: 'Due' },
];

export const Payments: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'receivable' | 'payable'>('receivable');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center p-1 bg-slate-100 rounded-xl w-fit">
        <button 
          onClick={() => setActiveTab('receivable')}
          className={cn(
            "px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all",
            activeTab === 'receivable' ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
          )}
        >
          Accounts Receivable
        </button>
        <button 
          onClick={() => setActiveTab('payable')}
          className={cn(
            "px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all",
            activeTab === 'payable' ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
          )}
        >
          Accounts Payable
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card-premium overflow-hidden border-slate-200/60">
            <div className="bg-slate-50/50 p-4 border-b border-slate-100">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">
                {activeTab === 'receivable' ? 'Customer Outstanding Dues' : 'Supplier Pending Payments'}
              </h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white border-b border-slate-50">
                    <th className="table-header">Entity</th>
                    <th className="table-header text-right">Total</th>
                    <th className="table-header text-right">Paid</th>
                    <th className="table-header text-right">Balance</th>
                    <th className="table-header text-center">Status</th>
                    <th className="table-header"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 font-medium">
                  {(activeTab === 'receivable' ? CUSTOMER_DUES : SUPPLIER_PAYMENTS).map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/30 transition-colors group">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                            activeTab === 'receivable' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                          )}>
                            {activeTab === 'receivable' ? <User className="w-4 h-4" /> : <Truck className="w-4 h-4" />}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-900 italic">{p.name}</div>
                            <div className="text-[9px] text-slate-400 font-mono tracking-tighter uppercase">{p.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right tabular-nums text-xs font-black text-slate-500">
                        ${p.total.toLocaleString()}
                      </td>
                      <td className="px-4 py-4 text-right tabular-nums text-xs font-black text-emerald-600">
                        ${p.paid.toLocaleString()}
                      </td>
                      <td className="px-4 py-4 text-right tabular-nums text-sm font-black text-slate-950">
                        ${p.balance.toLocaleString()}
                      </td>
                      <td className="px-4 py-4 text-center">
                         <span className={cn(
                          "text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest",
                          p.status === 'Paid' ? "bg-emerald-100 text-emerald-700" :
                          p.status === 'Partial' ? "bg-blue-100 text-blue-700" : "bg-rose-100 text-rose-700"
                        )}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <button className="text-[10px] font-black text-indigo-600 hover:underline uppercase tracking-widest flex items-center justify-end gap-1">
                          Manage <ArrowRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card-premium p-6 border-indigo-100/50 bg-indigo-50/20">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Quick Actions</h4>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:border-indigo-600 transition-all group shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-black text-slate-900 uppercase italic">Record Payment</div>
                    <div className="text-[9px] font-bold text-slate-400 uppercase">External inflow/outflow</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-colors" />
              </button>
              
              <button className="w-full flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:border-indigo-600 transition-all group shadow-sm">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-black text-slate-900 uppercase italic">Reminders</div>
                    <div className="text-[9px] font-bold text-slate-400 uppercase">Alert past-due accounts</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-colors" />
              </button>
            </div>
          </div>

          <div className="card-premium p-6">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Payment Health</h4>
            <div className="space-y-6">
              <HealthStat icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />} label="Avg. Days to Pay" value="4.2 Days" sub="Excellent" />
              <HealthStat icon={<AlertTriangle className="w-4 h-4 text-amber-500" />} label="Late Payment Ratio" value="12%" sub="+2% this month" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HealthStat = ({ icon, label, value, sub }: any) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      {icon}
      <div>
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{label}</div>
        <div className="text-sm font-black text-slate-900 italic leading-none">{value}</div>
      </div>
    </div>
    <div className="text-[10px] font-bold text-slate-400 italic">{sub}</div>
  </div>
);
