import React, { useState } from 'react';
import { X, Save, Plus, Trash2, Printer } from 'lucide-react';

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export const CreateInvoice: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [items, setItems] = useState<LineItem[]>([
    { id: '1', description: 'Linen Summer Dress - Bulk', quantity: 100, rate: 45 }
  ]);

  const addItem = () => {
    const newItem: LineItem = {
      id: Math.random().toString(36).substr(2, 9),
      description: '',
      quantity: 1,
      rate: 0
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof LineItem, value: any) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <div className="card-premium p-8 max-w-4xl mx-auto border-indigo-100/50 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-black text-slate-900 italic tracking-tight">Create New Invoice</h3>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Accounts Receivable Entry</p>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Customer</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/10 appearance-none cursor-pointer">
              <option>Zara International</option>
              <option>GAP Inc.</option>
              <option>Nordstrom</option>
              <option>New Customer...</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Invoice Date</label>
            <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/10" defaultValue={new Date().toISOString().split('T')[0]} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Due Date</label>
            <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/10" />
          </div>
        </div>

        {/* Line Items Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Line Items</h4>
            <button 
              type="button" 
              onClick={addItem}
              className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-1 hover:underline"
            >
              <Plus className="w-3 h-3" /> Add Item
            </button>
          </div>
          <div className="border border-slate-100 rounded-xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</th>
                  <th className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest w-24">Qty</th>
                  <th className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest w-32">Rate</th>
                  <th className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest w-32 text-right">Amount</th>
                  <th className="px-4 py-2 w-12 text-center"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3">
                      <input 
                        type="text" 
                        className="w-full bg-transparent text-sm font-bold text-slate-900 outline-none" 
                        placeholder="Item name or service..." 
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input 
                        type="number" 
                        className="w-full bg-transparent text-sm font-bold text-slate-900 outline-none" 
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input 
                        type="number" 
                        className="w-full bg-transparent text-sm font-bold text-slate-900 outline-none" 
                        value={item.rate}
                        onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                      />
                    </td>
                    <td className="px-4 py-3 text-right text-sm font-black text-slate-900 tabular-nums">
                      ${(item.quantity * item.rate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button 
                        type="button" 
                        onClick={() => removeItem(item.id)}
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Notes / Terms</label>
                <textarea rows={3} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/10 resize-none" placeholder="Payment terms, bank details..." />
              </div>
          </div>
          <div className="space-y-3 bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-widest">
              <span>Subtotal</span>
              <span className="tabular-nums font-black text-slate-900">${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-widest">
              <span>Tax (5%)</span>
              <span className="tabular-nums font-black text-slate-900">${tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
              <span className="text-xs font-black text-slate-900 uppercase tracking-widest">Total Amount</span>
              <span className="text-lg font-black text-indigo-600 tabular-nums italic">${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-6 border-t border-slate-100">
          <button 
            type="button" 
            onClick={onClose}
            className="flex-1 py-4 text-xs font-black text-slate-500 uppercase tracking-[0.2em] bg-slate-50 rounded-xl hover:bg-slate-100 transition-all font-mono"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="flex-3 py-4 text-xs font-black text-white uppercase tracking-[0.2em] bg-slate-900 rounded-xl hover:bg-indigo-600 transition-all shadow-lg shadow-slate-900/10 flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            Finalize & Save Invoice
          </button>
          <button type="button" className="p-4 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-all">
            <Printer className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

