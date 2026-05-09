import React from 'react';
import { X, Save, AlertCircle } from 'lucide-react';

export const AddExpense: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="card-premium p-8 max-w-2xl mx-auto border-indigo-100/50 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-black text-slate-900 italic tracking-tight">Record New Expense</h3>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Accounts Payable Entry</p>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form 
        className="space-y-6" 
        onSubmit={(e) => {
          e.preventDefault();
          onClose();
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/10 outline-none font-bold text-slate-900 transition-all appearance-none cursor-pointer">
              <option>Raw Material (Fabric)</option>
              <option>Labor & Salary</option>
              <option>Utilities</option>
              <option>Rent & Lease</option>
              <option>Marketing</option>
              <option>Miscellaneous</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Amount (USD)</label>
            <input 
              type="number" 
              placeholder="0.00"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/10 outline-none font-bold text-slate-900 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Date</label>
            <input 
              type="date" 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/10 outline-none font-bold text-slate-900 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Payment Method</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/10 outline-none font-bold text-slate-900 transition-all appearance-none cursor-pointer">
              <option>Bank Transfer</option>
              <option>Credit Card</option>
              <option>Corporate Debit</option>
              <option>Cash / Petty Cash</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Description / Notes</label>
          <textarea 
            rows={3}
            placeholder="Details about this expense..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/10 outline-none font-bold text-slate-900 transition-all resize-none"
          />
        </div>

        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-3">
          <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
          <p className="text-[10px] font-bold text-amber-700 leading-relaxed uppercase tracking-tighter">
            Expenses over $5,000 require senior management approval. This entry will be marked as "Pending" until verified.
          </p>
        </div>

        <div className="flex gap-3 pt-4 border-t border-slate-100">
          <button 
            type="button"
            onClick={onClose}
            className="flex-1 py-4 text-xs font-black text-slate-500 uppercase tracking-[0.2em] bg-slate-50 rounded-xl hover:bg-slate-100 transition-all"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="flex-1 py-4 text-xs font-black text-white uppercase tracking-[0.2em] bg-slate-900 rounded-xl hover:bg-indigo-600 transition-all shadow-lg shadow-slate-900/10 flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            Submit Expense
          </button>
        </div>
      </form>
    </div>
  );
};
