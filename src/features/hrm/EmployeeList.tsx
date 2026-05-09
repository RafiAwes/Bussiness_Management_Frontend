import React, { useState, useEffect } from 'react';
import { Search, UserPlus, Mail, MoreHorizontal, Download, ChevronLeft, ChevronRight, Eye, MapPin, Briefcase, Filter } from 'lucide-react';
import { cn } from '../../lib/utils';
import { TableSkeleton } from '../../components/ui/Skeleton';

const ALL_EMPLOYEES = [
  { id: 'EMP-001', name: 'John Doe', role: 'Manager', department: 'Admin', location: 'Showroom A', email: 'john.d@dresstown.com', status: 'Active', joined: '2022-01-15' },
  { id: 'EMP-002', name: 'Jane Smith', role: 'Sales Executive', department: 'Sales', location: 'Showroom B', email: 'jane.s@dresstown.com', status: 'Active', joined: '2022-03-20' },
  { id: 'EMP-003', name: 'Robert Brown', role: 'Staff', department: 'Admin', location: 'Warehouse', email: 'r.brown@dresstown.com', status: 'On Leave', joined: '2021-11-10' },
  { id: 'EMP-004', name: 'Emily Davis', role: 'Accountant', department: 'Accounts', location: 'Showroom A', email: 'emily.d@dresstown.com', status: 'Active', joined: '2023-02-01' },
  { id: 'EMP-005', name: 'Michael Wilson', role: 'Manager', department: 'Accounts', location: 'Showroom B', email: 'm.wilson@dresstown.com', status: 'Active', joined: '2022-08-12' },
  { id: 'EMP-006', name: 'Sarah Miller', role: 'Sales Executive', department: 'Sales', location: 'Showroom A', email: 's.miller@dresstown.com', status: 'Active', joined: '2023-05-10' },
  { id: 'EMP-007', name: 'David Clark', role: 'Staff', department: 'Sales', location: 'Showroom B', email: 'd.clark@dresstown.com', status: 'Active', joined: '2023-06-15' },
];

const ITEMS_PER_PAGE = 5;

interface EmployeeListProps {
  onViewProfile?: (id: string) => void;
  onAddEmployee?: () => void;
}

export const EmployeeList: React.FC<EmployeeListProps> = ({ onViewProfile, onAddEmployee }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('All');

  // Simulate initial data fetch
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredEmployees = ALL_EMPLOYEES.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = filterLocation === 'All' || emp.location === filterLocation;
    return matchesSearch && matchesLocation;
  });

  const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (isLoading) return <TableSkeleton />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center flex-1 gap-4 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search by name, role, or ID..." 
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-slate-100 rounded-xl text-sm outline-none focus:border-indigo-500/50 transition-all font-black italic tracking-tight"
            />
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl shadow-inner">
             {['All', 'Showroom A', 'Showroom B', 'Warehouse'].map((loc) => (
               <button 
                key={loc}
                onClick={() => setFilterLocation(loc)}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
                  filterLocation === loc ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                )}
               >
                 {loc === 'All' ? 'Global' : loc}
               </button>
             ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-3 bg-white border-2 border-slate-100 rounded-xl text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all">
            <Download className="w-5 h-5" />
          </button>
          <button 
            onClick={onAddEmployee}
            className="btn-primary bg-slate-900 border-none flex items-center gap-2 shadow-xl hover:scale-105 transition-all text-white px-6 py-3 rounded-2xl"
          >
            <UserPlus className="w-4 h-4" />
            <span className="text-[10px] uppercase font-black tracking-widest">New Employee</span>
          </button>
        </div>
      </div>

      <div className="card-premium overflow-hidden border-2 border-slate-100 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] italic">Personnel Entity</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] italic">Org structure</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] italic">Geographic Site</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] italic text-center">Duty Status</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] italic text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center font-black text-slate-900 text-xs italic shadow-sm group-hover:scale-110 transition-transform">
                        {emp.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-sm font-black text-slate-900 italic tracking-tight">{emp.name}</div>
                        <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">{emp.id} • {emp.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-3 h-3 text-indigo-500" />
                        <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest italic">{emp.role}</span>
                      </div>
                      <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest pl-5">{emp.department} Unit</div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl w-fit">
                      <MapPin className="w-3 h-3 text-rose-500" />
                      <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{emp.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className={cn(
                      "text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border shadow-sm",
                      emp.status === 'Active' ? "bg-emerald-50 text-emerald-600 border-emerald-100 italic" :
                      "bg-amber-50 text-amber-600 border-amber-100 italic"
                    )}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => onViewProfile?.(emp.id)}
                        className="p-2 bg-white border border-slate-100 text-slate-400 hover:text-indigo-600 rounded-xl transition-all shadow-sm"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-white border border-slate-100 text-slate-400 hover:text-slate-900 rounded-xl transition-all shadow-sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Controls */}
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">
            Showing {Math.min(filteredEmployees.length, (currentPage - 1) * ITEMS_PER_PAGE + 1)} to {Math.min(filteredEmployees.length, currentPage * ITEMS_PER_PAGE)} of {filteredEmployees.length}
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded hover:bg-white disabled:opacity-30 transition-all border border-transparent hover:border-slate-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1 px-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={cn(
                    "w-6 h-6 rounded text-[10px] font-black transition-all",
                    currentPage === i + 1 ? "bg-slate-900 text-white" : "text-slate-400 hover:bg-white"
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-1 rounded hover:bg-white disabled:opacity-30 transition-all border border-transparent hover:border-slate-200"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
