import React, { useState } from 'react';
import { Clock, Sun, Moon, Sunrise, Coffee, Calendar, User, Search, MapPin } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Shift {
  id: string;
  name: string;
  type: 'Morning' | 'Evening' | 'Night';
  time: string;
  location: string;
  staff: string[];
}

const DUMMY_SHIFTS: Shift[] = [
  { id: 'S1', name: 'Showroom A Morning', type: 'Morning', time: '08:00 - 16:00', location: 'Showroom A', staff: ['John Doe', 'Sarah Smith'] },
  { id: 'S2', name: 'Showroom A Evening', type: 'Evening', time: '16:00 - 00:00', location: 'Showroom A', staff: ['Emma Wilson', 'Mike Johnson'] },
  { id: 'S3', name: 'Warehouse Rotation', type: 'Night', time: '00:00 - 08:00', location: 'Warehouse', staff: ['Robert Brown'] },
  { id: 'S4', name: 'Showroom B Morning', type: 'Morning', time: '08:00 - 16:00', location: 'Showroom B', staff: ['Alice Cooper'] },
  { id: 'S5', name: 'Showroom B Evening', type: 'Evening', time: '16:00 - 00:00', location: 'Showroom B', staff: ['Bob Dylan'] },
];

export const ShiftSchedule: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState('Mon');
  const [shifts] = useState<Shift[]>(DUMMY_SHIFTS);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="space-y-8 pb-20">
      {/* Week Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-black text-slate-900 italic tracking-tighter">Operational Roster</h3>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Multi-Location Workflow Schedule</p>
        </div>
        <div className="flex bg-slate-100 p-1.5 rounded-2xl shadow-inner overflow-x-auto">
          {days.map((day) => (
            <button 
              key={day}
              onClick={() => setSelectedDay(day)}
              className={cn(
                "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap",
                selectedDay === day ? "bg-white text-indigo-600 shadow-xl scale-105" : "text-slate-400 hover:text-slate-600"
              )}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Summary Stats */}
        <div className="space-y-6">
           <div className="card-premium p-8 bg-slate-900 text-white relative flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Calendar className="w-40 h-40" />
              </div>
              <div className="relative z-10">
                 <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-2">Selected Snapshot</p>
                 <h4 className="text-3xl font-black italic tracking-tighter">{selectedDay}, May 12</h4>
              </div>
              <div className="relative z-10 grid grid-cols-2 gap-4 mt-12">
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Total On-Duty</p>
                    <p className="text-xl font-black italic">14 Staff</p>
                 </div>
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Active Zones</p>
                    <p className="text-xl font-black italic">3 Sites</p>
                 </div>
              </div>
           </div>

           <div className="card-premium p-8 border-2 border-slate-50">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-4">Shift Type Distribution</h4>
              <div className="space-y-4">
                 <ShiftDist type="Morning" count={3} color="text-amber-500" bg="bg-amber-50" icon={<Sunrise className="w-4 h-4" />} />
                 <ShiftDist type="Evening" count={2} color="text-indigo-500" bg="bg-indigo-50" icon={<Sun className="w-4 h-4" />} />
                 <ShiftDist type="Night" count={1} color="text-slate-900" bg="bg-slate-100" icon={<Moon className="w-4 h-4" />} />
              </div>
           </div>
        </div>

        {/* Right: Roster Grid */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shifts.map((shift) => (
              <div key={shift.id} className="card-premium p-6 hover:shadow-2xl transition-all border-2 border-slate-50 hover:border-indigo-100 group">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "p-3 rounded-2xl transition-transform group-hover:scale-110",
                      shift.type === 'Morning' ? "bg-amber-50 text-amber-500" :
                      shift.type === 'Evening' ? "bg-indigo-50 text-indigo-500" : "bg-slate-900 text-white"
                    )}>
                      {shift.type === 'Morning' && <Sunrise className="w-5 h-5" />}
                      {shift.type === 'Evening' && <Sun className="w-5 h-5" />}
                      {shift.type === 'Night' && <Moon className="w-5 h-5" />}
                    </div>
                    <div>
                      <h5 className="text-sm font-black text-slate-900 italic">{shift.name}</h5>
                      <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">
                        <MapPin className="w-3 h-3" />
                        {shift.location}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-black text-slate-900 tabular-nums italic">{shift.time}</div>
                    <div className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Shift window</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest pl-1">Personnel Assigned</p>
                  <div className="flex flex-wrap gap-2">
                    {shift.staff.map((person) => (
                      <div key={person} className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl group-hover:border-indigo-100 transition-colors">
                        <div className="w-5 h-5 bg-white border border-slate-200 rounded-full flex items-center justify-center text-[8px] font-black text-slate-900 italic">
                          {person.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-[10px] font-black text-slate-700 italic">{person}</span>
                      </div>
                    ))}
                    <button className="w-8 h-8 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition-all">
                      <User className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full py-5 border-2 border-dashed border-slate-200 rounded-[32px] text-slate-400 flex items-center justify-center gap-3 hover:bg-slate-50 hover:border-indigo-300 hover:text-indigo-600 transition-all group">
            <Clock className="w-5 h-5 group-hover:animate-spin" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Configure New Slot Authorization</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const ShiftDist = ({ type, count, color, bg, icon }: any) => (
  <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-100 italic">
    <div className="flex items-center gap-3">
      <div className={cn("p-2 rounded-lg", bg, color)}>{icon}</div>
      <span className="text-xs font-black text-slate-700">{type}</span>
    </div>
    <span className="text-sm font-black text-slate-900 tabular-nums">{count} Blocks</span>
  </div>
);
