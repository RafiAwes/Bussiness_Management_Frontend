import React, { useState } from 'react';
import { MoreVertical, DollarSign, Clock, User, ArrowRight, GripVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

interface Deal {
  id: string;
  customer: string;
  value: number;
  stage: 'Inquiry' | 'Quotation' | 'Order' | 'Completed';
  lastInteraction: string;
  assignee: string;
}

const INITIAL_DEALS: Deal[] = [
  { id: 'DL-001', customer: 'Urban Outfitters', value: 45000, stage: 'Inquiry', lastInteraction: '2h ago', assignee: 'Sarah J.' },
  { id: 'DL-002', customer: 'Nordstrom West', value: 125000, stage: 'Quotation', lastInteraction: '5h ago', assignee: 'Mike R.' },
  { id: 'DL-003', customer: 'Zara Global', value: 890000, stage: 'Order', lastInteraction: '1d ago', assignee: 'Sarah J.' },
  { id: 'DL-004', customer: 'Zalando SE', value: 32000, stage: 'Inquiry', lastInteraction: '3h ago', assignee: 'Elena B.' },
  { id: 'DL-005', customer: 'H&M Stockholm', value: 240000, stage: 'Quotation', lastInteraction: '1d ago', assignee: 'Mike R.' },
  { id: 'DL-006', customer: 'Selfridges', value: 15500, stage: 'Completed', lastInteraction: '2d ago', assignee: 'Elena B.' },
  { id: 'DL-007', customer: 'GAP Inc.', value: 68000, stage: 'Order', lastInteraction: '4h ago', assignee: 'Mike R.' },
];

const STAGES: Deal['stage'][] = ['Inquiry', 'Quotation', 'Order', 'Completed'];

export const SalesPipeline: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS);

  const moveDeal = (id: string, direction: 1 | -1) => {
    setDeals(prev => prev.map(deal => {
      if (deal.id === id) {
        const currentIndex = STAGES.indexOf(deal.stage);
        const nextIndex = currentIndex + direction;
        if (nextIndex >= 0 && nextIndex < STAGES.length) {
          return { ...deal, stage: STAGES[nextIndex] };
        }
      }
      return deal;
    }));
  };

  return (
    <div className="flex gap-6 overflow-x-auto pb-8 min-h-[600px] snap-x scroll-smooth">
      {STAGES.map((stage) => (
        <div key={stage} className="flex-1 min-w-[300px] flex flex-col snap-start">
          {/* Stage Header */}
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest italic">{stage}</h3>
              <span className="w-5 h-5 bg-slate-100 flex items-center justify-center rounded text-[10px] font-black text-slate-400">
                {deals.filter(d => d.stage === stage).length}
              </span>
            </div>
            <div className="text-[10px] font-black text-indigo-500 italic tabular-nums">
              ${deals.filter(d => d.stage === stage).reduce((sum, d) => sum + d.value, 0).toLocaleString()}
            </div>
          </div>

          {/* Column Surface */}
          <div className="flex-1 bg-slate-50/50 border border-slate-100 rounded-3xl p-3 space-y-4 shadow-inner">
            <AnimatePresence mode="popLayout">
              {deals
                .filter(d => d.stage === stage)
                .map((deal) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={deal.id}
                    className="card-premium p-5 space-y-4 hover:border-indigo-200 hover:shadow-xl transition-all cursor-grab active:cursor-grabbing group bg-white"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <GripVertical className="w-3.5 h-3.5 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="text-[10px] font-black text-indigo-500 font-mono italic">#{deal.id}</span>
                      </div>
                      <button className="p-1 hover:bg-slate-50 rounded text-slate-300 hover:text-slate-600 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <h4 className="text-sm font-black text-slate-900 italic tracking-tight">{deal.customer}</h4>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{deal.lastInteraction}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 rounded-lg border border-slate-100">
                        <DollarSign className="w-3 h-3 text-emerald-500" />
                        <span className="text-[11px] font-black text-slate-900 tabular-nums">
                          {deal.value > 1000 ? `${(deal.value / 1000).toFixed(0)}k` : deal.value}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 bg-indigo-50 rounded-full flex items-center justify-center border border-indigo-100">
                          <User className="w-2.5 h-2.5 text-indigo-600" />
                        </div>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{deal.assignee}</span>
                      </div>
                    </div>

                    {/* Quick Move Utility */}
                    <div className="flex justify-between gap-1 opacity-0 group-hover:opacity-100 transition-all pt-2">
                       <button 
                        onClick={() => moveDeal(deal.id, -1)}
                        className="flex-1 py-1.5 bg-slate-50 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-0"
                        disabled={STAGES.indexOf(stage) === 0}
                       >
                         Previous
                       </button>
                       <button 
                        onClick={() => moveDeal(deal.id, 1)}
                        className="flex-1 py-1.5 bg-slate-900 text-[9px] font-black uppercase tracking-widest text-white hover:bg-indigo-600 rounded-lg transition-colors disabled:opacity-0"
                        disabled={STAGES.indexOf(stage) === STAGES.length - 1}
                       >
                         Advance
                       </button>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
      ))}
    </div>
  );
};
