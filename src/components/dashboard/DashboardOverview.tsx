import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { FinanceDashboard } from '../../features/accounts/FinanceDashboard';
import { InventoryDashboard } from '../../features/inventory/InventoryDashboard';
import { ProductionDashboard } from '../../features/production/ProductionDashboard';
import { SalesDashboard } from '../../features/sales/SalesDashboard';
import { CustomerOrders } from '../../features/sales/CustomerOrders';
import { InvoiceList } from '../../features/accounts/InvoiceList';
import { CrmDashboard } from '../../features/crm/CrmDashboard';
import { HrmDashboard } from '../../features/hrm/HrmDashboard';
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Package,
  Factory,
  Users,
  DollarSign
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const DashboardOverview: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  // Render role-specific dashboards
  switch (user.role) {
    case UserRole.ADMIN:
      return <AdminDashboard />;
    case UserRole.INVENTORY:
      return <InventoryDashboard />;
    case UserRole.PRODUCTION:
      return <ProductionDashboard />;
    case UserRole.SALES:
      return <SalesDashboard />;
    case UserRole.ACCOUNTS:
      return <FinanceDashboard />;
    case UserRole.HR:
      return <HrmDashboard />;
    default:
      return <AdminDashboard />;
  }
};


const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="page-container space-y-6">
      {/* A. TOP BAR (Fixed style) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-black text-slate-900 italic uppercase tracking-tighter">Command Overview</h2>
          <p className="text-subtitle mt-0.5">Enterprise Management Protocol</p>
        </div>
        <div className="flex items-center gap-4 text-right">
          <div className="hidden sm:block">
            <div className="text-[10px] font-black text-slate-900 uppercase tracking-widest leading-none">{user?.name}</div>
            <div className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">{currentDate}</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-black italic border-2 border-white shadow-sm">
            {user?.name?.[0]}
          </div>
        </div>
      </div>

      {/* B. KPI SECTION (FIRST ROW) */}
      <div className="grid-dashboard">
        <KPICard 
          title="Total Sales (YTD)" 
          value="$2.4M" 
          trend="+12.5%" 
          icon={<DollarSign className="w-5 h-5 text-indigo-600" />}
          description="Consolidated revenue"
        />
        <KPICard 
          title="Active Orders" 
          value="482" 
          trend="+8.2%" 
          icon={<Clock className="w-5 h-5 text-amber-600" />}
          description="In-progress work orders"
        />
        <KPICard 
          title="Total Customers" 
          value="1,284" 
          trend="+4.3%" 
          icon={<Users className="w-5 h-5 text-emerald-600" />}
          description="Active client accounts"
        />
        <KPICard 
          title="Total Revenue" 
          value="$1.24M" 
          trend="+18.4%" 
          icon={<TrendingUp className="w-5 h-5 text-blue-600" />}
          description="Net fiscal growth"
        />
      </div>

      {/* C. MAIN GRID SECTION (SECOND ROW) */}
      <div className="grid-main">
        {/* Left Side: Analytics (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          <SalesDashboard isNested />
        </div>

        {/* Right Side: Activity (1/3) */}
        <div className="lg:col-span-1">
           <RecentActivityCard />
        </div>
      </div>

      {/* D. LOWER SECTION (THIRD ROW) */}
      <div className="space-y-6 pb-20">
        <CustomerOrders minimal />
        <InvoiceList minimal />
      </div>
    </div>
  );
};

const RecentActivityCard: React.FC = () => (
  <div className="card-premium h-full flex flex-col">
    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2 italic mb-6">
      <Clock className="w-4 h-4 text-indigo-500" />
      Operational Stream
    </h3>
    <div className="space-y-6 flex-1">
      {[
        { user: "Sarah J.", action: "Authorized Deployment", ref: "WO-9921", time: "12m ago", color: "bg-emerald-500" },
        { user: "Mark R.", action: "Inventory Adjustment", ref: "SKU-442", time: "45m ago", color: "bg-amber-500" },
        { user: "System", action: "Automated Resupply", ref: "PO-102", time: "2h ago", color: "bg-blue-500" },
        { user: "David K.", action: "Client Onboarding", ref: "CRM-882", time: "4h ago", color: "bg-indigo-500" },
        { user: "Sales Bot", action: "Report Generated", ref: "FIN-Q2", time: "6h ago", color: "bg-slate-500" },
      ].map((activity, i) => (
        <div key={i} className="flex gap-4 group cursor-default">
          <div className="relative">
            <div className={cn("w-2 h-2 rounded-full mt-1.5 z-10 relative", activity.color)} />
            {i !== 4 && <div className="absolute top-3 left-[3.5px] w-[1px] h-full bg-slate-100" />}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-900 uppercase tracking-tighter">{activity.user}</span>
              <span className="text-[9px] font-bold text-slate-400 italic">{activity.time}</span>
            </div>
            <p className="text-[11px] font-medium text-slate-500 mt-0.5">{activity.action}</p>
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-tighter mt-1 block">{activity.ref}</span>
          </div>
        </div>
      ))}
    </div>
    <button className="mt-8 w-full py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest border border-dashed border-slate-200 rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-all">
      View All Protocols
    </button>
  </div>
);


interface KPICardProps {
  title: string;
  value: string;
  trend?: string;
  icon: React.ReactNode;
  description: string;
}

const KPICard: React.FC<KPICardProps> = ({ 
  title, value, trend, icon, description 
}) => (
  <div className="card-premium p-6 hover:shadow-md transition-all duration-300 group">
    <div className="flex justify-between items-start mb-4">
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 bg-white shadow-sm border border-slate-100 group-hover:scale-110">
        {icon}
      </div>
      {trend && (
        <div className={cn(
          "flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold tabular-nums",
          trend.includes('+') ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-500"
        )}>
          {trend}
        </div>
      )}
    </div>
    <div className="space-y-1">
      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</h4>
      <div className="text-2xl font-black text-slate-900">{value}</div>
      <p className="text-[10px] text-slate-400 font-medium mt-1">{description}</p>
    </div>
  </div>
);

