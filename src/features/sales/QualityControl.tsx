import React, { useState } from 'react';
import { ShieldCheck, Search, Filter, CheckCircle2, XCircle, AlertCircle, Eye, Download, X, Plus, ClipboardCheck, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import { cn } from '../../lib/utils';

interface QCReport {
  id: string;
  factory: string;
  order: string;
  inspector: string;
  passRate: number;
  status: 'Passed' | 'Failed' | 'Minor Issues';
  date: string;
  notes: string;
}

const INITIAL_REPORTS: QCReport[] = [
  { id: 'QC-9912', factory: 'Elite Apparels Ltd', order: 'FPO-2024-001', inspector: 'Hassan Ali', passRate: 98.4, status: 'Passed', date: '2024-05-04', notes: 'Excellent finishing on all units. No loose threads.' },
  { id: 'QC-9913', factory: 'Oceanic Knitwear', order: 'FPO-2024-002', inspector: 'Sara Kabir', passRate: 92.1, status: 'Minor Issues', date: '2024-05-03', notes: 'Slight color variance on batch B. Acceptable within 5%.' },
  { id: 'QC-9914', factory: 'Elite Apparels Ltd', order: 'FPO-2024-004', inspector: 'Hassan Ali', passRate: 100, status: 'Passed', date: '2024-05-02', notes: 'Perfect AQL 1.0 fulfillment.' },
  { id: 'QC-9915', factory: 'Global Denim Hub', order: 'FPO-2024-003', inspector: 'Rahat Chen', passRate: 74.5, status: 'Failed', date: '2024-04-30', notes: 'Critical shrinkage issue detected. Bulk rejected.' },
  { id: 'QC-9916', factory: 'Smart Stitching', order: 'FPO-2024-006', inspector: 'Sara Kabir', passRate: 95.0, status: 'Passed', date: '2024-04-29', notes: 'Packaged and labeled according to retail standards.' },
];

export const QualityControl: React.FC = () => {
  const [reports, setReports] = useState<QCReport[]>(INITIAL_REPORTS);
  const [showForm, setShowForm] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  
  const [newReport, setNewReport] = useState({
    order: '',
    factory: 'Elite Apparels Ltd',
    result: 'Passed' as 'Passed' | 'Failed',
    notes: '',
  });

  const handleBookInspection = (e: React.FormEvent) => {
    e.preventDefault();
    const report: QCReport = {
      id: `QC-${Math.floor(1000 + Math.random() * 9000)}`,
      factory: newReport.factory,
      order: newReport.order,
      inspector: 'Session Auditor',
      passRate: newReport.result === 'Passed' ? 95 : 45,
      status: newReport.result === 'Passed' ? 'Passed' : 'Failed',
      date: new Date().toISOString().split('T')[0],
      notes: newReport.notes
    };
    setReports([report, ...reports]);
    setShowForm(false);
    setNewReport({ order: '', factory: 'Elite Apparels Ltd', result: 'Passed', notes: '' });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-black text-slate-900 italic tracking-tight underline decoration-rose-500/30 decoration-4 underline-offset-8">Compliance & Integrity</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-3">Quality Assurance / Third Party Inspection Ledger</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-6 py-3 bg-white border-2 border-slate-900 text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-slate-50 transition-all">
             <Download className="w-4 h-4" /> Global Certifications
           </button>
           <button 
            onClick={() => setShowForm(!showForm)}
            className={cn(
              "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 transition-all shadow-lg",
              showForm ? "bg-rose-500 text-white" : "bg-slate-900 text-white hover:bg-rose-600"
            )}
           >
             {showForm ? <X className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
             {showForm ? 'Cancel Audit' : 'Book New Inspection'}
           </button>
        </div>
      </div>

      {showForm && (
        <div className="card-premium p-8 border-slate-200/60 shadow-xl bg-slate-50/50 animate-in slide-in-from-top-4 duration-300">
          <form onSubmit={handleBookInspection} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Target Purchase Order</label>
                <input 
                  type="text" required
                  value={newReport.order}
                  onChange={(e) => setNewReport({...newReport, order: e.target.value})}
                  placeholder="Ex: FPO-2024-007"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-rose-500/5 transition-all italic" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Audit Result</label>
                <div className="grid grid-cols-2 gap-2">
                   <button 
                    type="button"
                    onClick={() => setNewReport({...newReport, result: 'Passed'})}
                    className={cn(
                      "flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border",
                      newReport.result === 'Passed' ? "bg-emerald-500 text-white border-emerald-600 shadow-md" : "bg-white text-slate-400 border-slate-200"
                    )}
                   >
                     <ThumbsUp className="w-3.5 h-3.5" /> Pass
                   </button>
                   <button 
                    type="button"
                    onClick={() => setNewReport({...newReport, result: 'Failed'})}
                    className={cn(
                      "flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border",
                      newReport.result === 'Failed' ? "bg-rose-500 text-white border-rose-600 shadow-md" : "bg-white text-slate-400 border-slate-200"
                    )}
                   >
                     <ThumbsDown className="w-3.5 h-3.5" /> Fail
                   </button>
                </div>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Critical Audit Notes</label>
                <div className="relative">
                   <MessageSquare className="absolute left-4 top-4 text-slate-300 w-4 h-4" />
                   <textarea 
                    value={newReport.notes}
                    onChange={(e) => setNewReport({...newReport, notes: e.target.value})}
                    placeholder="Document findings, AQL variances, or batch defects..."
                    className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-rose-500/5 transition-all italic min-h-[46px] resize-none"
                   />
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
               <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                 <ClipboardCheck className="w-4 h-4 text-rose-500" /> Integrity Checklist
               </h5>
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {['Stitching', 'Labeling', 'Measurement', 'Packaging'].map((item) => (
                    <label key={item} className="flex items-center gap-3 cursor-pointer group">
                       <input 
                        type="checkbox" 
                        defaultChecked={true}
                        className="w-4 h-4 rounded border-slate-300 text-rose-500 focus:ring-rose-500"
                       />
                       <span className="text-xs font-black text-slate-600 uppercase tracking-tight group-hover:text-slate-900 transition-colors uppercase tracking-widest">{item}</span>
                    </label>
                  ))}
               </div>
            </div>

            <div className="flex justify-end">
               <button type="submit" className="px-12 py-4 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-rose-600 transition-all shadow-lg flex items-center gap-2">
                 <Plus className="w-4 h-4" /> Publish Audit Report
               </button>
            </div>
          </form>
        </div>
      )}

      <div className="card-premium overflow-hidden shadow-2xl border-slate-200/60">
        <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
           <div className="flex items-center gap-4">
             <Search className="w-4 h-4 text-slate-400" />
             <input type="text" placeholder="Search PO or Report ID..." className="bg-transparent text-sm font-bold text-slate-900 outline-none w-64 italic" />
           </div>
           <div className="flex items-center gap-4">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Filter by:</span>
              <select className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-[10px] font-black text-indigo-600 outline-none">
                 <option>All Reports</option>
                 <option>Critical Rejections</option>
                 <option>In-Production Audit</option>
              </select>
           </div>
        </div>

        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-200/60">
            <tr>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Inspection ID</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Origin Factory</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Auditor</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">AQL Score</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Findings</th>
              <th className="px-8 py-5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {reports.map((report) => (
              <React.Fragment key={report.id}>
                <tr className="hover:bg-slate-50/30 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-slate-900 font-mono tracking-tight italic">{report.id}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">PO: {report.order}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-black text-slate-700 italic tracking-tight">{report.factory}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-slate-900 italic mb-0.5">{report.date}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{report.inspector}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full transition-all",
                            report.passRate > 90 ? "bg-emerald-500" :
                            report.passRate > 80 ? "bg-amber-500" :
                            "bg-rose-500"
                          )}
                          style={{ width: `${report.passRate}%` }} 
                        />
                      </div>
                      <span className="text-xs font-black text-slate-900 tabular-nums">{report.passRate}%</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      {report.status === 'Passed' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                      {report.status === 'Minor Issues' && <AlertCircle className="w-3.5 h-3.5 text-amber-500" />}
                      {report.status === 'Failed' && <XCircle className="w-3.5 h-3.5 text-rose-500" />}
                      <span className={cn(
                        "text-[10px] font-black uppercase tracking-widest",
                        report.status === 'Passed' ? "text-emerald-600" :
                        report.status === 'Minor Issues' ? "text-amber-600" :
                        "text-rose-600"
                      )}>
                        {report.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      onClick={() => setSelectedReportId(selectedReportId === report.id ? null : report.id)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 border rounded-lg text-[10px] font-black transition-all uppercase tracking-widest",
                        selectedReportId === report.id ? "bg-slate-900 text-white border-slate-900" : "bg-white border-slate-200 text-slate-400 hover:text-slate-900"
                      )}
                    >
                      <Eye className="w-3.5 h-3.5" /> {selectedReportId === report.id ? 'Close' : 'Audit'}
                    </button>
                  </td>
                </tr>
                {selectedReportId === report.id && (
                  <tr className="bg-slate-50/50">
                    <td colSpan={6} className="px-12 py-6 animate-in slide-in-from-top-2 duration-200">
                      <div className="flex gap-4 items-start">
                         <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                            <MessageSquare className="w-5 h-5 text-indigo-500" />
                         </div>
                         <div className="flex-1">
                            <h6 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Summary of Findings</h6>
                            <p className="text-sm font-black text-slate-900 italic tracking-tight underline decoration-slate-200 decoration-1 underline-offset-4">
                              {report.notes}
                            </p>
                         </div>
                         <div className="flex gap-2">
                            <button className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all">
                               Assign Rectification
                            </button>
                            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-400 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all">
                               Flag for Re-Inspection
                            </button>
                         </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
