import React, { createContext, useContext, useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  stock: number;
  price: number;
}

interface ERPState {
  inventory: Product[];
  revenue: number;
  totalSales: number;
  attendanceCount: Record<string, number>; // empId -> days present
  payroll: any[];
}

interface StoreContextType {
  state: ERPState;
  recordSale: (productId: string, quantity: number) => void;
  recordAttendance: (empId: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ERPState>({
    inventory: [
      { id: 'item-1', name: 'Cotton Fabric', stock: 450, price: 15 },
      { id: 'item-2', name: 'Zippers', stock: 120, price: 2 },
      { id: 'item-3', name: 'Buttons', stock: 3000, price: 0.5 },
    ],
    revenue: 328000,
    totalSales: 1420,
    attendanceCount: { 'EMP-001': 20, 'EMP-002': 18 },
    payroll: [
      { id: 'PAY-001', name: 'John Doe', salary: 4500, status: 'Paid' },
      { id: 'PAY-002', name: 'Jane Smith', salary: 3800, status: 'Pending' },
    ]
  });

  const recordSale = (productId: string, quantity: number) => {
    setState(prev => {
      const product = prev.inventory.find(p => p.id === productId);
      if (!product || product.stock < quantity) return prev;

      const saleValue = product.price * quantity;
      
      return {
        ...prev,
        inventory: prev.inventory.map(p => 
          p.id === productId ? { ...p, stock: p.stock - quantity } : p
        ),
        revenue: prev.revenue + saleValue,
        totalSales: prev.totalSales + 1
      };
    });
  };

  const recordAttendance = (empId: string) => {
    setState(prev => ({
      ...prev,
      attendanceCount: {
        ...prev.attendanceCount,
        [empId]: (prev.attendanceCount[empId] || 0) + 1
      }
    }));
  };

  return (
    <StoreContext.Provider value={{ state, recordSale, recordAttendance }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
