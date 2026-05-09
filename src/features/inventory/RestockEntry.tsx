import React, { useState } from 'react';
import { X, Save, Plus, Trash2, Truck, PackageCheck, ListPlus, Search, DollarSign, Calendar } from 'lucide-react';
import { cn } from '../../lib/utils';

interface RestockItem {
  id: string;
  sku: string;
  qty: number;
  unitCost: number;
}

export const RestockEntry: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [items, setItems] = useState<RestockItem[]>([
    { id: Math.random().toString(36).substr(2, 9), sku: 'CTN-WHT-001 (Premium Cotton)', qty: 500, unitCost: 4.50 }
  ]);

  const addItem = () => {
    setItems([...items, {
      id: Math.random().toString(36).substr(2, 9),
      sku: '',
      qty: 0,
      unitCost: 0
    }]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof RestockItem, value: string | number) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const grandTotal = items.reduce((sum, item) => sum + (item.qty * item.unitCost), 0);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black text-slate-900 italic tracking-tight underline decoration-emerald-500/30 decoration-4 underline-offset-4">Incoming Goods Receipt</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">Procurement Fulfillment / restock protocol</p>
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
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-16 -mt-16 blur-2xl" />
        <Truck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-black text-white uppercase tracking-widest mb-2 flex items-center gap-2">
            Inbound Logistics Notice
          </h4>
          <p className="text-[10px] text-slate-400 leading-relaxed font-medium uppercase tracking-tight">
            Verify shipment manifest against physical count before committing. Discrepancies exceeding 2% require mandatory adjustment filing.
          </p>
        </div>
      </div>

      <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); onClose?.(); }}>
        <div className="card-premium p-8 grid grid-cols-1 md:grid-cols-3 gap-8 border-slate-200/60">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Preferred Supplier</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-emerald-500/5 appearance-none cursor-pointer transition-all">
              <option>Textile Pro Co. (Primary)</option>
              <option>Asian Fabrics Ltd</option>
              <option>Buttons & More</option>
              <option>Direct Sourcing Hub</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Destination Facility</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-emerald-500/5 appearance-none cursor-pointer transition-all">
              <option>Main Warehouse (Block A)</option>
              <option>Showroom Alpha Storage</option>
              <option>Logistics Hub Central</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Verification Date</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all" defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
              <ListPlus className="w-4 h-4 text-emerald-500" />
              Goods Manifest
            </h4>
            <button 
              type="button" 
              onClick={addItem}
              className="text-[10px] font-black text-white px-4 py-2 bg-slate-900 rounded-lg uppercase tracking-widest flex items-center gap-2 hover:bg-emerald-600 transition-all shadow-lg"
            >
              <Plus className="w-3 h-3" /> Append SKU
            </button>
          </div>
          <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm bg-white">
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">SKU / Designation</th>
                  <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest w-32 text-center">Qty Recv.</th>
                  <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest w-32">Unit Cost</th>
                  <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest w-32 text-right">Computed Ext.</th>
                  <th className="px-6 py-3 w-12 text-center"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50/50">
                {items.map((item) => (
                  <tr key={item.id} className="group">
                    <td className="px-6 py-4">
                      <div className="relative">
                        <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                        <input 
                          type="text" 
                          className="w-full bg-transparent pl-7 text-sm font-bold text-slate-900 outline-none italic" 
                          placeholder="Scan or Type SKU..." 
                          value={item.sku}
                          onChange={(e) => updateItem(item.id, 'sku', e.target.value)}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input 
                        type="number" 
                        className="w-20 bg-slate-50 border border-slate-100 rounded-lg py-1 px-2 text-sm font-black text-slate-900 outline-none font-mono text-center" 
                        value={item.qty}
                        onChange={(e) => updateItem(item.id, 'qty', parseInt(e.target.value) || 0)}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative">
                        <DollarSign className="absolute left-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300" />
                        <input 
                          type="number" 
                          step="0.01"
                          className="w-full bg-transparent pl-5 text-sm font-bold text-slate-900 outline-none font-mono tabular-nums" 
                          value={item.unitCost}
                          onChange={(e) => updateItem(item.id, 'unitCost', parseFloat(e.target.value) || 0)}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-black text-slate-900 tabular-nums italic">
                        ${(item.qty * item.unitCost).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        type="button" 
                        onClick={() => removeItem(item.id)}
                        className="text-slate-300 hover:text-rose-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        disabled={items.length <= 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-50/50">
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Grand Total Ledger Value:</td>
                  <td className="px-6 py-4 text-right text-base font-black text-slate-900 tabular-nums italic">
                    ${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div className="flex gap-4 pt-8">
          <button 
            type="button" 
            onClick={onClose}
            className="flex-1 py-4 text-xs font-black text-slate-500 uppercase tracking-[0.2em] bg-slate-100 rounded-xl hover:bg-slate-200 transition-all font-mono"
          >
            Cancel Protocol
          </button>
          <button 
            type="submit"
            className="flex-3 py-4 text-xs font-black text-white uppercase tracking-[0.2em] bg-slate-900 rounded-xl hover:bg-emerald-600 transition-all shadow-xl shadow-slate-900/20 flex items-center justify-center gap-3"
          >
            <PackageCheck className="w-5 h-5" />
            Commit to Warehouse Registry
          </button>
        </div>
      </form>
    </div>
  );
};

