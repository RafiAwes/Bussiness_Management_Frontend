import React, { Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield } from 'lucide-react';
import { cn } from '../../lib/utils';
import { DashboardSkeleton, TableSkeleton } from '../../components/ui/Skeleton';

const HrmDashboard = lazy(() => import('./HrmDashboard').then(m => ({ default: m.HrmDashboard })));
const EmployeeList = lazy(() => import('./EmployeeList').then(m => ({ default: m.EmployeeList })));
const Attendance = lazy(() => import('./Attendance').then(m => ({ default: m.Attendance })));
const Payroll = lazy(() => import('./Payroll').then(m => ({ default: m.Payroll })));
const LeaveManagement = lazy(() => import('./LeaveManagement').then(m => ({ default: m.LeaveManagement })));
const ShiftSchedule = lazy(() => import('./ShiftSchedule').then(m => ({ default: m.ShiftSchedule })));
const DepartmentRoles = lazy(() => import('./DepartmentRoles').then(m => ({ default: m.DepartmentRoles })));
const Performance = lazy(() => import('./Performance').then(m => ({ default: m.Performance })));
const EmployeeProfile = lazy(() => import('./EmployeeProfile').then(m => ({ default: m.EmployeeProfile })));
const AddEmployeeForm = lazy(() => import('./AddEmployeeForm').then(m => ({ default: m.AddEmployeeForm })));

export const HrmModule: React.FC<{ activePage: string }> = ({ activePage }) => {
  const [selectedEmployeeId, setSelectedEmployeeId] = React.useState<string | null>(null);
  const [isAddingEmployee, setIsAddingEmployee] = React.useState(false);
  const [simulatedRole, setSimulatedRole] = React.useState<'Admin' | 'Manager' | 'Employee'>('Admin');

  // Reset selected employee when page changes, unless we are on employee-list and going to profile
  React.useEffect(() => {
    if (activePage !== 'employee-list') {
      setSelectedEmployeeId(null);
    }
  }, [activePage]);

  // If role is Employee, they shouldn't see most pages, so redirect them to their profile if they try to access others
  // In a real app, this would be handled at a higher level
  React.useEffect(() => {
    if (simulatedRole === 'Employee' && activePage !== 'dashboard' && activePage !== 'main') {
      // Just for simulation, if employee tries to see list, show their profile instead
      if (activePage === 'employee-list' && !selectedEmployeeId) {
        setSelectedEmployeeId('EMP-001');
      }
    }
  }, [simulatedRole, activePage]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 capitalize italic tracking-tight">
            {selectedEmployeeId ? 'Personnel Dossier' : `Human Resources ${activePage.replace('-', ' ')}`}
          </h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">
            {selectedEmployeeId ? `Detailed Insights for ${selectedEmployeeId}` : 'DressTown Workforce & Compliance'}
          </p>
        </div>

        {/* Role Simulator Component */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border-2 border-slate-50 shadow-inner">
           {(['Admin', 'Manager', 'Employee'] as const).map((role) => (
             <button 
              key={role}
              onClick={() => {
                setSimulatedRole(role);
                setSelectedEmployeeId(null);
              }}
              className={cn(
                "px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all italic",
                simulatedRole === role 
                  ? "bg-slate-900 text-white shadow-lg scale-105" 
                  : "text-slate-400 hover:text-slate-600"
              )}
             >
               {role}
             </button>
           ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activePage + (selectedEmployeeId || '') + simulatedRole + isAddingEmployee}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Suspense fallback={
            activePage === 'dashboard' || activePage === 'main' 
              ? <DashboardSkeleton /> 
              : <TableSkeleton />
          }>
            {/* Restricted Access Message for non-admins on certain pages */}
            {simulatedRole === 'Employee' && ['attendance', 'payroll', 'departments'].includes(activePage) ? (
              <div className="card-premium p-12 text-center border-2 border-rose-50 shadow-2xl">
                 <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-rose-100">
                    <Shield className="w-8 h-8" />
                 </div>
                 <h3 className="text-xl font-black text-slate-900 italic uppercase">Access Restricted</h3>
                 <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-2">Privileged credentials required for this secure data node.</p>
                 <button 
                  onClick={() => setSimulatedRole('Admin')}
                  className="mt-8 px-8 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest italic hover:scale-105 transition-all shadow-xl"
                 >
                    Upgrade Simulation to Admin
                 </button>
              </div>
            ) : (
              <>
                {isAddingEmployee && <AddEmployeeForm onClose={() => setIsAddingEmployee(false)} />}
                {(activePage === 'dashboard' || activePage === 'main') && <HrmDashboard />}
                {activePage === 'employee-list' && !selectedEmployeeId && (
                  <EmployeeList 
                    onViewProfile={(id) => setSelectedEmployeeId(id)} 
                    onAddEmployee={() => setIsAddingEmployee(true)}
                  />
                )}
                {activePage === 'employee-list' && selectedEmployeeId && (
                  <EmployeeProfile employeeId={selectedEmployeeId} onBack={() => setSelectedEmployeeId(null)} />
                )}
                {activePage === 'attendance' && <Attendance />}
                {activePage === 'payroll' && <Payroll />}
                {activePage === 'leave-management' && <LeaveManagement />}
                {activePage === 'shift-schedule' && <ShiftSchedule />}
                {activePage === 'departments' && <DepartmentRoles />}
                {activePage === 'performance' && <Performance />}
              </>
            )}
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
