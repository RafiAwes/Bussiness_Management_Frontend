import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Plus, Download, ArrowUpDown } from 'lucide-react';
import { cn } from '../../lib/utils';

const DUMMY_PRODUCTS = [
  { id: 'PRD-001', name: 'Cotton Fabric - Red', category: 'Fabric', stock: 1200, unit: 'm', status: 'In Stock', price: 5.50 },
  { id: 'PRD-002', name: 'Polyester Thread - Black', category: 'Trims', stock: 450, unit: 'spools', status: 'Low Stock', price: 1.20 },
  { id: 'PRD-003', name: 'Standard Buttons - Pearl', category: 'Trims', stock: 5000, unit: 'pcs', status: 'In Stock', price: 0.15 },
  { id: 'PRD-004', name: 'Nylon Zipper - 20cm', category: 'Trims', stock: 85, unit: 'pcs', status: 'Critical', price: 0.45 },
  { id: 'PRD-005', name: 'Denim Fabric - Heavy', category: 'Fabric', stock: 800, unit: 'm', status: 'In Stock', price: 12.00 },
];

export const ProductList: React.FC<{ onAdd: () => void, onAdjust: () => void }> = ({ onAdd, onAdjust }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterLocation, setFilterLocation] = useState('All');

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search SKU or Name..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-600/10 transition-all outline-none font-medium italic"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <select 
              className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-[10px] font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-indigo-600/10 cursor-pointer"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option>All Categories</option>
              <option>Fabric</option>
              <option>Trims</option>
              <option>Finishing</option>
            </select>
            <select 
              className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-[10px] font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-indigo-600/10 cursor-pointer"
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
            >
              <option>All Locations</option>
              <option>Main Warehouse</option>
              <option>Showroom Alpha</option>
              <option>B-Block Storage</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onAdjust}
            className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-slate-50 transition-colors"
          >
            <ArrowUpDown className="w-4 h-4 text-slate-400" />
            Adjust Stock
          </button>
          <button 
            onClick={onAdd}
            className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-indigo-600 transition-all shadow-lg shadow-slate-900/10"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="card-premium border-slate-200/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="table-header">Product & SKU</th>
                <th className="table-header">Category</th>
                <th className="table-header">Variants</th>
                <th className="table-header">Global Stock</th>
                <th className="table-header">Distribution</th>
                <th className="table-header">Status</th>
                <th className="table-header"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {DUMMY_PRODUCTS.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/30 transition-colors group">
                  <td className="px-4 py-5">
                    <div className="font-bold text-slate-900 text-sm italic">
                      {product.name}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 mt-0.5 uppercase tracking-tighter">
                      {product.id}
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <span className="text-[10px] font-black px-2 py-1 bg-slate-100 text-slate-500 rounded uppercase tracking-widest">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-4 py-5">
                    <div className="flex gap-1">
                      {['S', 'M', 'L'].map(v => (
                        <div key={v} className="w-5 h-5 flex items-center justify-center text-[8px] font-black bg-white border border-slate-200 rounded text-slate-400 uppercase">
                          {v}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <div className="text-sm font-black text-slate-900 tabular-nums">
                      {product.stock.toLocaleString()} 
                      <span className="text-[9px] text-slate-400 uppercase font-black ml-1 tracking-tighter">{product.unit}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="h-1 bg-slate-100 flex-1 rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full transition-all duration-1000",
                            product.status === 'In Stock' ? "bg-emerald-500 w-3/4" :
                            product.status === 'Low Stock' ? "bg-amber-500 w-1/4" : "bg-rose-500 w-[5%]"
                          )}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                        <span>Whse A</span>
                        <span className="tabular-nums">{Math.floor(product.stock * 0.7)}</span>
                      </div>
                      <div className="flex justify-between text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                        <span>Shrm A</span>
                        <span className="tabular-nums">{Math.floor(product.stock * 0.3)}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <span className={cn(
                      "text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest border",
                      product.status === 'In Stock' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                      product.status === 'Low Stock' ? "bg-amber-50 text-amber-600 border-amber-100" :
                      "bg-rose-50 text-rose-600 border-rose-100"
                    )}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-4 py-5 text-right">
                    <button className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-300 hover:text-slate-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Showing 5 of 142 items</span>
          <div className="flex gap-2">
            <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-white transition-all disabled:opacity-30" disabled>
              <Download className="w-3.5 h-3.5" />
            </button>
            <div className="flex gap-1">
              <button className="w-8 h-8 flex items-center justify-center bg-slate-900 text-white rounded-lg text-xs font-black">1</button>
              <button className="w-8 h-8 flex items-center justify-center border border-slate-200 text-slate-400 rounded-lg text-xs font-black hover:bg-white">2</button>
              <button className="w-8 h-8 flex items-center justify-center border border-slate-200 text-slate-400 rounded-lg text-xs font-black hover:bg-white">3</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
