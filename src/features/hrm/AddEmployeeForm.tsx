import React, { useState } from 'react';
import { X, User, Briefcase, MapPin, Mail, Phone, Calendar, Shield, Save } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AddEmployeeFormProps {
  onClose: () => void;
  onSave?: (employee: any) => void;
}

export const AddEmployeeForm: React.FC<AddEmployeeFormProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: 'Staff',
    department: 'Sales',
    location: 'Showroom A',
    email: '',
    phone: '',
    joined: new Date().toISOString().split('T')[0],
    status: 'Active'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave?.(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[48px] w-full max-w-2xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-10 border-b-2 border-slate-50 relative bg-slate-50 flex items-center justify-between">
           <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-slate-900 text-white rounded-[24px] flex items-center justify-center shadow-xl">
                <User className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 italic tracking-tighter uppercase whitespace-nowrap">Personnel Enrollment</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-2">DressTown International Workforce Registry</p>
              </div>
           </div>
           <button 
            onClick={onClose}
            className="p-3 hover:bg-slate-200 rounded-full transition-all"
           >
             <X className="w-6 h-6 text-slate-400" />
           </button>
        </div>

        <form onSubmit={handleSubmit} className="p-12 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Full Legal Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  required
                  type="text" 
                  placeholder="e.g. Robert J. Oppenheimer"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-12 pr-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-slate-900 transition-all font-sans"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Operational Role</label>
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select 
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full pl-12 pr-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-slate-900 appearance-none transition-all cursor-pointer"
                >
                  <option>Manager</option>
                  <option>Sales Executive</option>
                  <option>Accountant</option>
                  <option>Staff</option>
                  <option>QC Inspector</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Department Unit</label>
              <div className="relative">
                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select 
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full pl-12 pr-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-slate-900 appearance-none transition-all cursor-pointer"
                >
                  <option>Sales</option>
                  <option>Accounts</option>
                  <option>Admin</option>
                  <option>Production</option>
                  <option>Logistics</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Primary Geographic Site</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select 
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full pl-12 pr-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-slate-900 appearance-none transition-all cursor-pointer"
                >
                  <option>Showroom A</option>
                  <option>Showroom B</option>
                  <option>Warehouse</option>
                  <option>Head Office</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Corporate Electronic Mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  required
                  type="email" 
                  placeholder="r.jones@dresstown.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-slate-900 transition-all font-sans"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Mobile Communications ID</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  required
                  type="tel" 
                  placeholder="+880 1234 567 890"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-12 pr-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-slate-900 transition-all font-sans"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Registry Commencement Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  required
                  type="date" 
                  value={formData.joined}
                  onChange={(e) => setFormData({ ...formData, joined: e.target.value })}
                  className="w-full pl-12 pr-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black italic outline-none focus:border-slate-900 transition-all font-sans"
                />
              </div>
            </div>
          </div>

          <div className="pt-8 flex gap-6">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 border-2 border-transparent hover:border-slate-100 rounded-3xl transition-all italic"
            >
              Abort Enrollment
            </button>
            <button 
              type="submit"
              className="flex-[2] py-5 bg-slate-900 text-white rounded-3xl text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl hover:scale-105 active:scale-95 transition-all italic flex items-center justify-center gap-3"
            >
              <Save className="w-4 h-4" />
              Finalize Personnel Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
