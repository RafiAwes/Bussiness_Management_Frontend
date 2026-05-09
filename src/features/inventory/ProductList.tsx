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
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row gap-4 items-center flex-1 w-full lg:w-auto">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search SKU or Name..." 
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all outline-none font-medium italic"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
             <select 
              className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-[10px] font-black uppercase tracking-widest outline-none focus:border-accent cursor-pointer min-w-[140px]"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option>All Categories</option>
              <option>Fabric</option>
              <option>Trims</option>
              <option>Finishing</option>
            </select>
            <select 
              className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-[10px] font-black uppercase tracking-widest outline-none focus:border-accent cursor-pointer min-w-[140px]"
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
        <div className="flex items-center gap-2 w-full lg:w-auto">
          <button 
            onClick={onAdjust}
            className="btn-secondary flex-1 lg:flex-none"
          >
            <ArrowUpDown className="w-4 h-4 text-slate-400" />
            Adjust
          </button>
          <button 
            onClick={onAdd}
            className="btn-primary flex-1 lg:flex-none"
          >
            <Plus className="w-4 h-4" />
            Product
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="table-container shadow-sm">
        <table className="table-standard">
          <thead>
            <tr>
              <th className="table-header">Product & SKU</th>
              <th className="table-header">Category</th>
              <th className="table-header hidden md:table-cell">Variants</th>
              <th className="table-header">Stock Level</th>
              <th className="table-header hidden lg:table-cell">Distribution</th>
              <th className="table-header">Status</th>
              <th className="table-header"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {DUMMY_PRODUCTS.map((product) => (
              <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="table-cell min-w-[180px]">
                  <div className="font-bold text-slate-900 text-sm italic">
                    {product.name}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 mt-0.5 uppercase tracking-tighter">
                    {product.id}
                  </div>
                </td>
                <td className="table-cell">
                  <span className="text-[10px] font-black px-2 py-1 bg-slate-100 text-slate-500 rounded uppercase tracking-widest whitespace-nowrap">
                    {product.category}
                  </span>
                </td>
                <td className="table-cell hidden md:table-cell">
                  <div className="flex gap-1">
                    {['S', 'M', 'L'].map(v => (
                      <div key={v} className="w-5 h-5 flex items-center justify-center text-[8px] font-black bg-white border border-slate-200 rounded text-slate-400 uppercase">
                        {v}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="table-cell min-w-[140px]">
                  <div className="text-sm font-black text-slate-900 tabular-nums">
                    {product.stock.toLocaleString()} 
                    <span className="text-[9px] text-slate-400 uppercase font-black ml-1 tracking-tighter">{product.unit}</span>
                  </div>
                  <div className="h-1 w-24 bg-slate-100 rounded-full mt-1 overflow-hidden">
                    <div 
                      className={cn(
                        "h-full rounded-full transition-all duration-1000",
                        product.status === 'In Stock' ? "bg-emerald-500 w-3/4" :
                        product.status === 'Low Stock' ? "bg-amber-500 w-1/4" : "bg-rose-500 w-[5%]"
                      )}
                    />
                  </div>
                </td>
                <td className="table-cell hidden lg:table-cell min-w-[120px]">
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
                <td className="table-cell">
                  <span className={cn(
                    "inline-flex text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest border whitespace-nowrap",
                    product.status === 'In Stock' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                    product.status === 'Low Stock' ? "bg-amber-50 text-amber-600 border-amber-100" :
                    "bg-rose-50 text-rose-600 border-rose-100"
                  )}>
                    {product.status}
                  </span>
                </td>
                <td className="table-cell text-right">
                  <button className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-300 hover:text-slate-600">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination */}
        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Showing 5 of 142 items</span>
          <div className="flex items-center gap-3">
            <button className="p-2.5 border border-slate-200 rounded-lg text-slate-400 hover:bg-white transition-all disabled:opacity-30" disabled>
              <Download className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1">
              <button className="w-9 h-9 flex items-center justify-center bg-slate-900 text-white rounded-lg text-xs font-black">1</button>
              <button className="w-9 h-9 flex items-center justify-center border border-slate-200 text-slate-400 rounded-lg text-xs font-black hover:bg-white transition-colors">2</button>
              <button className="w-9 h-9 flex items-center justify-center border border-slate-200 text-slate-400 rounded-lg text-xs font-black hover:bg-white transition-colors">3</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
