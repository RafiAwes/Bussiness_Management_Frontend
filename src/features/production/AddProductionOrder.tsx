import React from 'react';
import { Save, Calendar, FileText, Info } from 'lucide-react';

export const AddProductionOrder: React.FC = () => {
  return (
    <div className="max-w-4xl space-y-8">
      {/* Informational Header */}
      <div className="p-6 bg-accent/5 border border-accent/10 rounded-2xl flex gap-4 items-start">
        <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-white flex-shrink-0">
          <Info className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-1">Production Planning Notice</h4>
          <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
            Creating a Production Order (PO) will automatically check raw material availability in the <strong>Inventory Module</strong>. 
            If materials are below 20% of required quantity, the order will be marked as "Pending Material" until replenished.
          </p>
        </div>
      </div>

      <form className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="card-premium p-8 space-y-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" />
              General Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Client / Buyer</label>
                <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all">
                  <option>Select Client</option>
                  <option>Nordstrom</option>
                  <option>Zara</option>
                  <option>H&M</option>
                  <option>GAP</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Item / Style Code</label>
                <input 
                  type="text" 
                  placeholder="e.g. LS-SHIRT-2024" 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Quantity (PCS)</label>
                <input 
                  type="number" 
                  placeholder="0" 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Production Line</label>
                <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all">
                  <option>Auto-assign Efficient Line</option>
                  <option>Line L-01 (Heavy)</option>
                  <option>Line L-02 (Medium)</option>
                  <option>Line L-03 (Light)</option>
                </select>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Technical Remarks</label>
              <textarea 
                rows={4}
                placeholder="Stitching requirements, QC specifics, or special handling instructions..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card-premium p-6 space-y-6">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-widest">
              <Calendar className="w-4 h-4 text-accent" />
              Scheduling
            </h3>

            <div className="space-y-4">
              <div className="space-y- label">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Target Start Date</label>
                <input type="date" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none" />
              </div>
              
              <div className="space-y- label">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Target Shipment Date</label>
                <input type="date" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none" />
              </div>

              <div className="space-y- label">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Priority Level</label>
                <div className="flex gap-2">
                  {['Normal', 'High', 'Urgent'].map(p => (
                    <button 
                      key={p}
                      type="button"
                      className={`flex-1 py-2 text-[10px] font-bold rounded-lg border transition-all ${
                        p === 'Normal' 
                          ? 'bg-slate-900 text-white border-slate-900' 
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex flex-col gap-3">
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-3">
                <Save className="w-4 h-4" />
                <span>Publish Order</span>
              </button>
              <button type="button" className="btn-secondary w-full py-3">Save as Draft</button>
            </div>
          </div>

          <div className="p-6 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center gap-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <FileText className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4">Drag Technical Files Here</p>
          </div>
        </div>
      </form>
    </div>
  );
};
