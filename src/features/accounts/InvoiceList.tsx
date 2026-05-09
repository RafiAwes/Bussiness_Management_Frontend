import React from 'react';
import { Search, Filter, Download, ExternalLink, MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { cn } from '../../lib/utils';

const DUMMY_INVOICES = [
  { id: 'INV-2024-001', client: 'Zara International', date: '2024-05-10', amount: 45000.00, dueDate: '2024-06-10', status: 'Paid' },
  { id: 'INV-2024-002', client: 'Nordstrom', date: '2024-05-12', amount: 12400.00, dueDate: '2024-06-12', status: 'Pending' },
  { id: 'INV-2024-003', client: 'GAP Inc.', date: '2024-05-15', amount: 8500.00, dueDate: '2024-06-15', status: 'Overdue' },
  { id: 'INV-2024-004', client: 'H&M Global', date: '2024-05-18', amount: 32000.00, dueDate: '2024-06-18', status: 'Pending' },
  { id: 'INV-2024-005', client: 'Private Label Co.', date: '2024-05-20', amount: 5600.00, dueDate: '2024-06-20', status: 'Paid' },
];

export const InvoiceList: React.FC<{ onCreateInvoice: () => void }> = ({ onCreateInvoice }) => {
  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search by Invoice ID, Client, or Amount..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-600/10 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <button 
            onClick={onCreateInvoice}
            className="btn-primary bg-slate-900 hover:bg-indigo-600"
          >
            Create Invoice
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="card-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="table-header">
                  <div className="flex items-center gap-2">
                    Invoice ID <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="table-header">Client</th>
                <th className="table-header">Issue Date</th>
                <th className="table-header text-right">Amount</th>
                <th className="table-header">Due Date</th>
                <th className="table-header text-center">Status</th>
                <th className="table-header"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {DUMMY_INVOICES.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-4 py-4 text-xs font-bold text-slate-500 font-mono italic">
                    {inv.id}
                  </td>
                  <td className="px-4 py-4 font-bold text-slate-900 text-sm">
                    {inv.client}
                  </td>
                  <td className="px-4 py-4 text-xs text-slate-500 font-medium">
                    {inv.date}
                  </td>
                  <td className="px-4 py-4 text-right tabular-nums text-sm font-black text-slate-950">
                    ${inv.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-4 text-xs text-slate-500 font-medium">
                    {inv.dueDate}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={cn(
                      "text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest border",
                      inv.status === 'Paid' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                      inv.status === 'Pending' ? "bg-amber-50 text-amber-600 border-amber-100" :
                      "bg-rose-50 text-rose-600 border-rose-100"
                    )}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex justify-end gap-1">
                      <button className="p-1 hover:bg-slate-200 rounded transition-colors text-slate-400 hover:text-indigo-600">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button className="p-1 hover:bg-slate-200 rounded transition-colors text-slate-400">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Simple Pagination */}
        <div className="px-4 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Page 1 of 12</span>
          <div className="flex gap-2">
            <button className="p-2 border border-slate-200 rounded-lg hover:bg-white disabled:opacity-50" disabled>
              <div className="w-4 h-4 border-t-2 border-l-2 border-slate-400 rotate-[-45deg] scale-75 ml-1" />
            </button>
            <button className="p-2 border border-slate-200 rounded-lg hover:bg-white">
              <div className="w-4 h-4 border-t-2 border-r-2 border-slate-400 rotate-[45deg] scale-75 mr-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
