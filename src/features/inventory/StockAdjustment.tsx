import React from 'react';
import { X, Save, AlertCircle, RefreshCw, Trash2, ShieldAlert, ArrowRight, Warehouse, Info } from 'lucide-react';
import { cn } from '../../lib/utils';

export const StockAdjustment: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black text-slate-900 italic tracking-tight underline decoration-amber-500/30 decoration-4 underline-offset-4">Stock Ledger Adjustment</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">Inventory Balancing / manual override</p>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex gap-4 items-start shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full -mr-16 -mt-16 blur-2xl" />
        <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-black text-white uppercase tracking-widest mb-2 flex items-center gap-2">
            Regulatory Compliance
          </h4>
          <p className="text-[10px] text-slate-400 leading-relaxed font-medium uppercase tracking-tight">
            Manual corrections bypass standard automated workflows. All entries are audited by the General Manager at EOD.
          </p>
        </div>
      </div>

      <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); onClose?.(); }}>
        <div className="card-premium p-8 space-y-8 border-slate-200/60 shadow-xl">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Target Resource</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Scan SKU or Search Registry..." 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-amber-500/5 transition-all italic"
                defaultValue="CTN-WHT-001 - Premium Cotton Roll / White"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Reason Code</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-amber-500/5 appearance-none cursor-pointer transition-all">
                <option>Damage / Wastage (DMG)</option>
                <option>Audit Correction (+) (AUD)</option>
                <option>Audit Correction (-) (AUD)</option>
                <option>Sample Allocation (SAM)</option>
                <option>Returns Processing (RET)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Delta Quantity</label>
              <div className="relative">
                <input 
                  type="number" 
                  placeholder="e.g. -12"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-black text-slate-900 outline-none focus:ring-4 focus:ring-rose-500/5 transition-all tabular-nums"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Physical Location</label>
            <div className="relative">
              <Warehouse className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-amber-500/5 appearance-none cursor-pointer transition-all">
                <option>Main Warehouse (Block A)</option>
                <option>Showroom Alpha Storage</option>
                <option>Logistics Hub Central</option>
                <option>Quarantine Zone (QA)</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Internal Note / Case ID</label>
            <textarea 
              rows={3}
              placeholder="Provide context for audit trailing..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-amber-500/5 transition-all resize-none"
            />
          </div>

          <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex gap-3">
            <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <p className="text-[10px] font-black text-rose-600 leading-relaxed uppercase tracking-tight">
              Action irreversible. This adjustment will instantly recalculate average unit cost and ledger valuations systems-wide.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            type="button" 
            onClick={onClose}
            className="flex-1 py-4 text-xs font-black text-slate-500 uppercase tracking-[0.2em] bg-slate-100 rounded-xl hover:bg-slate-200 transition-all font-mono"
          >
            Abort Protocol
          </button>
          <button 
            type="submit"
            className="flex-3 py-4 text-xs font-black text-white uppercase tracking-[0.2em] bg-slate-900 rounded-xl hover:bg-amber-600 transition-all shadow-xl shadow-slate-900/20 flex items-center justify-center gap-3"
          >
            <RefreshCw className="w-5 h-5" />
            Commit Ledger Correction
          </button>
        </div>
      </form>
    </div>
  );
};
