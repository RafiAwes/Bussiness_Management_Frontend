import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { FinanceDashboard } from '../../features/accounts/FinanceDashboard';
import { InventoryDashboard } from '../../features/inventory/InventoryDashboard';
import { ProductionDashboard } from '../../features/production/ProductionDashboard';
import { SalesDashboard } from '../../features/sales/SalesDashboard';
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
  return (
    <div className="space-y-8 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Consolidated Revenue" 
          value="$1.24M" 
          trend="+18.4%" 
          icon={<DollarSign className="w-5 h-5 text-indigo-600" />}
          description="Total group earnings"
        />
        <KPICard 
          title="Overall Efficiency" 
          value="92.1%" 
          trend="+2.5%" 
          icon={<Factory className="w-5 h-5 text-emerald-600" />}
          description="Global factory average"
        />
        <KPICard 
          title="Total Inventory" 
          value="$4.8M" 
          trend="Stable" 
          icon={<Package className="w-5 h-5 text-amber-600" />}
          description="Current asset valuation"
        />
        <KPICard 
          title="Group Headcount" 
          value="1,842" 
          trend="+12" 
          icon={<Users className="w-5 h-5 text-blue-600" />}
          description="Across all locations"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SalesDashboard />
        <FinanceDashboard />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProductionDashboard />
        <InventoryDashboard />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CrmDashboard />
        <HrmDashboard />
      </div>
    </div>
  );
};


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

