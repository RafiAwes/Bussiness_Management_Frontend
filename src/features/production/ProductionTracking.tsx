import React from 'react';
import { Activity, Play, Pause, AlertCircle, Clock, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';

const TRACKING_DATA = [
  { id: 'BATCH-421', order: 'PO-2024-001', item: 'Linen Summer Shirt', line: 'L-01', progress: 65, status: 'On Track', lastUpdate: '10 mins ago' },
  { id: 'BATCH-422', order: 'PO-2024-004', item: 'Knit Pullover', line: 'L-03', progress: 28, status: 'Delayed', lastUpdate: '2 mins ago' },
  { id: 'BATCH-423', order: 'PO-2024-001', item: 'Linen Summer Shirt', line: 'L-02', progress: 89, status: 'On Track', lastUpdate: '1 hr ago' },
  { id: 'BATCH-425', order: 'PO-2024-006', item: 'Slim Fit Chinos', line: 'S-01', progress: 12, status: 'Setup', lastUpdate: 'Just now' },
];

export const ProductionTracking: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black text-slate-900 italic tracking-tight underline decoration-emerald-500/30 decoration-4 underline-offset-4">Live Execution Feed</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">Real-time Telemetry / Floor Monitoring</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-premium p-8 bg-slate-900 text-white border-0 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-emerald-500/20 transition-all" />
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="px-3 py-1 bg-emerald-500/20 rounded-full flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
               <span className="text-[9px] font-black text-emerald-400 uppercase">Live</span>
            </div>
          </div>
          <div className="text-4xl font-black italic tracking-tighter mb-2">84.2%</div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">Aggregate Floor Efficiency</p>
        </div>

        <div className="card-premium p-8 border-slate-200/60 shadow-xl flex flex-col justify-center">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Active Capacity Distribution</div>
          <div className="flex items-baseline gap-2 mb-1">
             <span className="text-3xl font-black text-slate-900 italic">12</span>
             <span className="text-sm font-black text-slate-300">/ 16 Cells</span>
          </div>
          <div className="h-2 bg-slate-100 mt-6 rounded-full overflow-hidden shadow-inner flex">
            <div className="h-full bg-indigo-500 w-[75%] rounded-r-full" />
          </div>
          <p className="text-[10px] text-slate-500 mt-4 italic font-medium">4 production lines in scheduled maintenance</p>
        </div>

        <div className="card-premium p-8 border-slate-200/60 shadow-xl flex flex-col justify-center relative">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Critical Latency Alerts</div>
          <div className="text-3xl font-black text-rose-600 italic tracking-tighter flex items-center gap-3">
            <AlertCircle className="w-8 h-8 opacity-20" />
            02 Events
          </div>
          <div className="mt-6 p-3 bg-rose-50 border border-rose-100 rounded-xl">
             <p className="text-[10px] text-rose-800 font-bold italic leading-tight uppercase">High variance on Line L-03: Material shortage detected</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
           <Zap className="w-4 h-4 text-emerald-500" />
           <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest italic">Syncing Production Queue</h3>
        </div>
        <div className="grid gap-6">
          {TRACKING_DATA.map((batch) => (
            <div key={batch.id} className="card-premium p-6 border-slate-200/60 shadow-lg group hover:shadow-2xl hover:border-emerald-500/20 transition-all border-l-4 border-l-slate-200 hover:border-l-emerald-500">
              <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                <div className="min-w-[180px] border-r border-slate-100 pr-8">
                  <div className="text-[10px] font-black text-emerald-600 font-mono tracking-tighter italic mb-1">#{batch.id}</div>
                  <div className="text-sm font-black text-slate-900 italic tracking-tight">{batch.item}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">Rel: {batch.order}</div>
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <div className="w-5 h-5 rounded-lg bg-slate-900 flex items-center justify-center text-[9px] font-black text-white italic">
                         {batch.line.split('-')[1]}
                      </div>
                      Cell Identity: {batch.line}
                    </span>
                    <span className="text-[10px] font-black text-slate-900 tabular-nums italic">{batch.progress}% Committed</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className={cn(
                        "h-full rounded-full transition-all duration-1000",
                        batch.status === 'Delayed' ? "bg-rose-500" : "bg-emerald-500"
                      )}
                      style={{ width: `${batch.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-8 px-8 border-l border-slate-100">
                  <div className="text-center">
                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Protocol Status</div>
                    <span className={cn(
                      "text-[9px] font-black px-3 py-1 rounded-full tracking-widest uppercase border shadow-sm",
                      batch.status === 'On Track' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                      batch.status === 'Delayed' ? "bg-rose-50 text-rose-600 border-rose-100" : "bg-slate-50 text-slate-500 border-slate-100"
                    )}>
                      {batch.status}
                    </span>
                  </div>
                  <div className="text-center">
                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1 justify-center">
                      <Clock className="w-3 h-3" /> Telemetry
                    </div>
                    <div className="text-[10px] font-black text-slate-900 italic tracking-tighter whitespace-nowrap">{batch.lastUpdate}</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-900 shadow-sm transition-all">
                      <Pause className="w-4 h-4" />
                    </button>
                    <button className="p-3 bg-slate-900 hover:bg-emerald-600 rounded-xl text-white shadow-lg transition-all">
                      <Play className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
