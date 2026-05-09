import React from 'react';
import { Truck, Package, Clock, ShieldCheck, Factory, AlertTriangle } from 'lucide-react';
import { cn } from '../../lib/utils';

const PRODUCTION_TRACKS = [
  { 
    id: 'TRK-9001', 
    supplier: 'Elite Apparels Ltd', 
    product: 'Men Polo Sport', 
    qty: 5000,
    currentStage: 2, // 0: PO Sent, 1: Production, 2: QC, 3: Delivered
    status: 'On Track',
    lastUpdate: '2h ago',
    eta: 'May 20, 2024',
    delay: 0
  },
  { 
    id: 'TRK-9002', 
    supplier: 'Oceanic Knitwear', 
    product: 'Summer Tee Black', 
    qty: 1200,
    currentStage: 1,
    status: 'Delayed',
    lastUpdate: '5h ago',
    eta: 'May 25, 2024',
    delay: 3
  },
  { 
    id: 'TRK-9003', 
    supplier: 'Global Denim Hub', 
    product: 'Straight Cut Jean', 
    qty: 8000,
    currentStage: 0,
    status: 'On Track',
    lastUpdate: '1d ago',
    eta: 'June 05, 2024',
    delay: 0
  },
  { 
    id: 'TRK-9004', 
    supplier: 'Smart Stitching', 
    product: 'Formal White Shirt', 
    qty: 2500,
    currentStage: 3,
    status: 'Completed',
    lastUpdate: '2d ago',
    eta: 'May 10, 2024',
    delay: 0
  },
];

const STAGES = ['PO Sent', 'In Production', 'Quality Check', 'Delivered'];

export const ExternalProduction: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-black text-slate-900 italic tracking-tight underline decoration-indigo-500/30 decoration-4 underline-offset-8">Global Supply Pipeline</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-3">External Production Tracking / Stage-Gate Monitoring</p>
        </div>
        <div className="flex gap-3">
           <div className="px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">3 Systems Optimal</span>
           </div>
           <div className="px-4 py-2 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-2">
              <div className="w-2 h-2 bg-rose-500 rounded-full" />
              <span className="text-[10px] font-black text-rose-700 uppercase tracking-widest">1 Pipeline Delayed</span>
           </div>
        </div>
      </div>

      <div className="space-y-6">
        {PRODUCTION_TRACKS.map((track) => (
          <div key={track.id} className="card-premium p-8 border-slate-200/60 shadow-xl group hover:border-indigo-200 transition-all">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Lead Info */}
              <div className="lg:w-64 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black text-indigo-500 font-mono italic">#{track.id}</span>
                    {track.delay > 0 && (
                      <span className="flex items-center gap-1 text-[8px] font-black bg-rose-100 text-rose-600 px-1.5 py-0.5 rounded uppercase tracking-tighter">
                        <AlertTriangle className="w-2 h-2" /> {track.delay}D Delay
                      </span>
                    )}
                  </div>
                  <h4 className="text-base font-black text-slate-900 italic tracking-tight">{track.product}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mt-1">
                    <Factory className="w-3 h-3" /> {track.supplier}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                    <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Volume</p>
                    <p className="text-xs font-black text-slate-700 tabular-nums">{track.qty.toLocaleString()}</p>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                    <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Target ETA</p>
                    <p className="text-xs font-black text-indigo-600 italic">{track.eta}</p>
                  </div>
                </div>
              </div>

              {/* Stepper Implementation */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="relative">
                  {/* Progress Line Background */}
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-1 bg-slate-100 rounded-full" />
                  
                  {/* Active Progress Line */}
                  <div 
                    className={cn(
                      "absolute top-1/2 -translate-y-1/2 left-0 h-1 rounded-full transition-all duration-1000",
                      track.status === 'Delayed' ? "bg-rose-400" : "bg-indigo-500"
                    )}
                    style={{ width: `${(track.currentStage / (STAGES.length - 1)) * 100}%` }}
                  />

                  {/* Nodes */}
                  <div className="relative flex justify-between">
                    {STAGES.map((stage, idx) => {
                      const isCompleted = idx < track.currentStage;
                      const isCurrent = idx === track.currentStage;
                      
                      return (
                        <div key={stage} className="flex flex-col items-center gap-3">
                          <div className={cn(
                            "w-8 h-8 rounded-full border-4 flex items-center justify-center transition-all z-10",
                            isCompleted ? "bg-indigo-500 border-indigo-100 text-white" :
                            isCurrent ? (track.status === 'Delayed' ? "bg-white border-rose-500 text-rose-500 animate-pulse" : "bg-white border-indigo-500 text-indigo-500") :
                            "bg-white border-slate-100 text-slate-300"
                          )}>
                            {isCompleted ? <ShieldCheck className="w-4 h-4" /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                          </div>
                          <div className="text-center">
                            <p className={cn(
                              "text-[9px] font-black uppercase tracking-widest",
                              isCurrent ? "text-slate-900" : "text-slate-400"
                            )}>{stage}</p>
                            {isCurrent && (
                              <span className="text-[8px] font-bold text-slate-400 italic">Stage Active</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Actions/Metrics */}
              <div className="lg:w-48 flex flex-col justify-between items-end gap-4">
                 <div className="text-right">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Last Telemetry Sync</p>
                    <p className="text-xs font-black text-slate-700 italic">{track.lastUpdate}</p>
                 </div>
                 <button className="w-full px-4 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-2">
                    <Package className="w-3.5 h-3.5" /> Full Logistics Log
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
