import React, { useState } from 'react';
import { Save, X, Info, Plus, Trash2, Tag, Layers } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Variant {
  id: string;
  size: string;
  color: string;
  sku: string;
}

export const AddProduct: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [variants, setVariants] = useState<Variant[]>([]);

  const addVariant = () => {
    setVariants([...variants, {
      id: Math.random().toString(36).substr(2, 9),
      size: 'M',
      color: '',
      sku: ''
    }]);
  };

  const removeVariant = (id: string) => {
    setVariants(variants.filter(v => v.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black text-slate-900 italic tracking-tight underline decoration-indigo-500/30 decoration-4 underline-offset-4">Register New Product</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">Inventory Management System / ERP Core</p>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex gap-4 items-start shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full -mr-16 -mt-16 blur-2xl" />
        <Info className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-black text-white uppercase tracking-widest mb-2 flex items-center gap-2">
            Protocol Notice
            <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-400 rounded text-[8px] border border-indigo-500/30">v4.2.0</span>
          </h4>
          <p className="text-[10px] text-slate-400 leading-relaxed font-medium uppercase tracking-tight">
            Ensure SKU alignment with DressTown Global Standards. Variant generation will automatically append suffix codes to base SKU.
          </p>
        </div>
      </div>

      <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
        <div className="card-premium p-8 grid grid-cols-1 md:grid-cols-2 gap-8 border-slate-200/60">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Base Product Name</label>
              <input 
                type="text" 
                placeholder="e.g. Premium Cotton Roll" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none italic"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none appearance-none cursor-pointer">
                  <option>Fabric</option>
                  <option>Trims</option>
                  <option>Hardware</option>
                  <option>Packaging</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Unit of Measure</label>
                <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none appearance-none cursor-pointer">
                  <option>Meters (m)</option>
                  <option>Pieces (pcs)</option>
                  <option>Rolls</option>
                  <option>Kilograms (kg)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Base SKU Number</label>
              <div className="relative">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="e.g. CTN-WHT-001" 
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono font-black text-slate-900 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none uppercase"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Stock Threshold</label>
                <input 
                  type="number" 
                  placeholder="Min. Level" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-black text-slate-900 focus:ring-4 focus:ring-rose-500/5 transition-all outline-none tabular-nums"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Avg. Unit Cost ($)</label>
                <input 
                  type="number" 
                  step="0.01" 
                  placeholder="0.00" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-black text-slate-900 focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none tabular-nums"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Variants Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-500" />
              Product Variants
            </h4>
            <button 
              type="button"
              onClick={addVariant}
              className="text-[10px] font-black text-white px-4 py-2 bg-slate-900 rounded-lg uppercase tracking-widest flex items-center gap-2 hover:bg-indigo-600 transition-all shadow-lg"
            >
              <Plus className="w-3 h-3" /> Add Variant
            </button>
          </div>

          {variants.length > 0 ? (
            <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm bg-white">
              <table className="w-full text-left">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Size/Spec</th>
                    <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Color/Attribute</th>
                    <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Variant SKU</th>
                    <th className="px-6 py-3 w-16"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {variants.map((v) => (
                    <tr key={v.id}>
                      <td className="px-6 py-4">
                        <select className="bg-transparent text-sm font-bold text-slate-900 outline-none w-full">
                          <option>S</option>
                          <option>M</option>
                          <option>L</option>
                          <option>XL</option>
                          <option>Custom</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <input type="text" placeholder="e.g. Sky Blue" className="bg-transparent text-sm font-bold text-slate-900 outline-none w-full italic" />
                      </td>
                      <td className="px-6 py-4">
                        <input type="text" placeholder="Auto-generated..." className="bg-transparent text-sm font-mono font-black text-slate-400 outline-none w-full uppercase" />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          type="button" 
                          onClick={() => removeVariant(v.id)}
                          className="text-slate-300 hover:text-rose-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-center bg-slate-50/50">
              <Layers className="w-12 h-12 text-slate-200 mb-4" />
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No variants defined</p>
              <p className="text-[10px] text-slate-300 font-medium mt-2">Add sizes or colors to create a robust inventory matrix</p>
            </div>
          )}
        </div>

        <div className="flex gap-4 pt-8">
          <button 
            type="button" 
            onClick={onClose}
            className="flex-1 py-4 text-xs font-black text-slate-500 uppercase tracking-[0.2em] bg-slate-100 rounded-xl hover:bg-slate-200 transition-all font-mono"
          >
            Abort Protocol
          </button>
          <button 
            type="submit"
            className="flex-3 py-4 text-xs font-black text-white uppercase tracking-[0.2em] bg-slate-900 rounded-xl hover:bg-emerald-600 transition-all shadow-xl shadow-slate-900/20 flex items-center justify-center gap-3"
          >
            <Save className="w-5 h-5" />
            Finalize Product Entry
          </button>
        </div>
      </form>
    </div>
  );
};

