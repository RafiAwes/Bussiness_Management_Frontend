import { UserRole } from './types';

export const MODULE_CONFIGS = {
  inventory: {
    label: 'Inventory',
    roles: [UserRole.ADMIN, UserRole.INVENTORY],
    path: 'inventory',
    subPages: [
      { id: 'dashboard', label: 'Stock Overview' },
      { id: 'items', label: 'Item Directory' },
      { id: 'movements', label: 'Stock Movements' },
      { id: 'adjustments', label: 'Stock Adjustment' },
      { id: 'restock', label: 'Restock Entry' },
      { id: 'analytics', label: 'Inventory Analytics' },
      { id: 'history', label: 'Product Stock History' },
    ]
  },
  production: {
    label: 'Production',
    roles: [UserRole.ADMIN, UserRole.PRODUCTION],
    path: 'production',
    subPages: [
      { id: 'dashboard', label: 'Plant Dashboard' },
      { id: 'orders', label: 'Work Orders' },
      { id: 'planning', label: 'Production Planning' },
      { id: 'tracking', label: 'Line Tracking' },
      { id: 'assignments', label: 'Worker Assignment' },
      { id: 'analytics', label: 'Production Analytics' },
      { id: 'history', label: 'Production History' },
    ]
  },
  sales: {
    label: 'Sales & Supply',
    roles: [UserRole.ADMIN, UserRole.SALES],
    path: 'sales',
    subPages: [
      { id: 'dashboard', label: 'Sales Insights' },
      { id: 'pos', label: 'Showroom POS' },
      { id: 'customer-orders', label: 'Customer Orders' },
      { id: 'suppliers', label: 'Supplier Directory' },
      { id: 'factory-pos', label: 'Factory Purchase Orders' },
      { id: 'external-production', label: 'External Production' },
      { id: 'qc', label: 'Quality Control' },
    ]
  },
  crm: {
    label: 'CRM',
    roles: [UserRole.ADMIN, UserRole.SALES],
    path: 'crm',
    subPages: [
      { id: 'dashboard', label: 'CRM Insights' },
      { id: 'list', label: 'Customer List' },
      { id: 'leads', label: 'Opportunity Hub' },
      { id: 'pipeline', label: 'Sales Pipeline' },
      { id: 'tasks', label: 'Follow-ups' },
      { id: 'profile', label: 'Customer Profile' },
    ]
  },
  accounts: {
    label: 'Accounts',
    roles: [UserRole.ADMIN, UserRole.ACCOUNTS],
    path: 'accounts',
    subPages: [
      { id: 'dashboard', label: 'Finance Dashboard' },
      { id: 'invoices', label: 'Invoices' },
      { id: 'expenses', label: 'Expense List' },
      { id: 'payments', label: 'Payments' },
      { id: 'profit-loss', label: 'Profit & Loss' },
      { id: 'ledger', label: 'General Ledger' },
    ]
  },
  hrm: {
    label: 'HRM',
    roles: [UserRole.ADMIN, UserRole.HR],
    path: 'hrm',
    subPages: [
      { id: 'dashboard', label: 'HR Insights' },
      { id: 'employee-list', label: 'Employee List' },
      { id: 'attendance', label: 'Attendance' },
      { id: 'payroll', label: 'Payroll' },
      { id: 'leave-management', label: 'Leave Control' },
      { id: 'shift-schedule', label: 'Shift Roster' },
      { id: 'departments', label: 'Org Chart' },
      { id: 'performance', label: 'Performance' },
    ]
  },
};
