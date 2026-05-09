import React, { useState } from 'react';
import { Search, ShoppingCart, Plus, Minus, Trash2, CreditCard, CheckCircle, Package, ArrowRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

// Showroom Products for POS Simulation
const SHOWROOM_PRODUCTS = [
  { id: 'SHR-001', name: 'Milan Silk Dress', price: 299, image: '👗', stock: 12, category: 'Women' },
  { id: 'SHR-002', name: 'Oxford Blazer', price: 450, image: '🧥', stock: 8, category: 'Unisex' },
  { id: 'SHR-003', name: 'Cachemere Scarf', price: 120, image: '🧣', stock: 25, category: 'Accessories' },
  { id: 'SHR-004', name: 'Linen Trousers', price: 180, image: '👖', stock: 15, category: 'Men' },
  { id: 'SHR-005', name: 'Leather Chelsea Boots', price: 320, image: '🥾', stock: 5, category: 'Footwear' },
  { id: 'SHR-006', name: 'Cotton Crew Neck', price: 65, image: '👕', stock: 40, category: 'Men' },
];

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

export const PosInterface: React.FC = () => {
  const [products, setProducts] = useState(SHOWROOM_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [search, setSearch] = useState('');

  const addToCart = (product: typeof SHOWROOM_PRODUCTS[0]) => {
    if (product.stock <= 0) return;

    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }];
    });

    // Instant UI feedback: reduce temporary stock
    setProducts(prev => prev.map(p => 
      p.id === product.id ? { ...p, stock: p.stock - 1 } : p
    ));
  };

  const removeFromCart = (id: string) => {
    const item = cart.find(i => i.id === id);
    if (!item) return;

    setCart(prev => prev.filter(i => i.id !== id));
    
    // Add stock back
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, stock: p.stock + item.qty } : p
    ));
  };

  const updateQty = (id: string, delta: number) => {
    const product = products.find(p => p.id === id);
    if (!product) return;

    if (delta > 0 && product.stock <= 0) return;

    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }).filter(i => i.qty > 0));

    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, stock: p.stock - delta } : p
    ));
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsSuccess(true);
    // Real App would sync with backend here
    setTimeout(() => {
      setIsSuccess(false);
      setCart([]);
    }, 2500);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  const subtotal = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-200px)] animate-in fade-in duration-500">
      {/* Left Wall: High Impact Product Grid */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-indigo-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Scan item or search showroom inventory..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-100 rounded-2xl text-base font-black text-slate-900 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all italic tracking-tight"
          />
        </div>

        <div className="flex-1 overflow-y-auto pr-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-12">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.button
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={product.id}
                onClick={() => addToCart(product)}
                disabled={product.stock <= 0}
                className={cn(
                  "relative card-premium p-6 group transition-all text-left flex flex-col justify-between overflow-hidden",
                  product.stock > 0 
                    ? "hover:border-indigo-500 hover:shadow-2xl hover:shadow-indigo-500/10 active:scale-95" 
                    : "opacity-60 grayscale cursor-not-allowed bg-slate-50 border-slate-200"
                )}
              >
                {/* Visual Flair */}
                <span className="absolute -right-4 -top-4 text-6xl opacity-10 group-hover:opacity-20 transition-opacity grayscale-0">
                  {product.image}
                </span>

                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block">{product.category}</span>
                  <h4 className="text-lg font-black text-slate-900 italic tracking-tight mb-1 group-hover:text-indigo-600 transition-colors">{product.name}</h4>
                  <p className="text-xs font-black text-indigo-500 font-mono italic">#{product.id}</p>
                </div>

                <div className="mt-8 flex items-end justify-between border-t border-slate-50 pt-4">
                  <div className="flex flex-col">
                    <span className="text-2xl font-black text-slate-900 tabular-nums">${product.price}</span>
                    <span className={cn(
                      "text-[9px] font-black uppercase tracking-widest mt-1",
                      product.stock < 5 ? "text-rose-500" : "text-slate-400"
                    )}>
                      {product.stock > 0 ? `${product.stock} in showroom` : 'Sold Out'}
                    </span>
                  </div>
                  {product.stock > 0 && (
                    <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center group-hover:bg-indigo-600 transition-colors shadow-lg">
                      <Plus className="w-5 h-5" />
                    </div>
                  )}
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Wall: High-Velocity Checkout Terminal */}
      <div className="w-full lg:w-[400px] flex flex-col">
        <div className="card-premium flex flex-col h-full border-2 border-slate-900 shadow-2xl relative overflow-hidden">
          {/* Header */}
          <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500 rounded-lg">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.2em]">Active Basket</h3>
                <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Terminal: POS-ALPHA</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-black tabular-nums">{cart.length}</span>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 relative bg-white">
            <AnimatePresence>
              {isSuccess && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white/95 z-50 flex flex-col items-center justify-center text-center p-8"
                >
                  <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/10">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 italic tracking-tight mb-2">Sale Complete</h4>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-loose">Receipt printed &<br/>Inventory Reconciled</p>
                </motion.div>
              )}
            </AnimatePresence>

            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center opacity-30">
                <Package className="w-16 h-16 text-slate-300 mb-4" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Basket empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {cart.map((item) => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex items-center justify-between group py-2"
                    >
                      <div className="flex-1">
                        <div className="text-sm font-black text-slate-900 italic tracking-tight">{item.name}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tabular-nums tracking-widest">${item.price} / each</div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center bg-slate-100 rounded-xl p-1 gap-1">
                          <button 
                            onClick={() => updateQty(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all text-slate-400 hover:text-slate-900"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm font-black italic">{item.qty}</span>
                          <button 
                            onClick={() => updateQty(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all text-slate-400 hover:text-slate-900"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-rose-300 hover:text-rose-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Footer: Summary & Giant Checkout */}
          <div className="p-8 bg-slate-50 border-t-2 border-slate-100 mt-auto space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span>Showroom Subtotal</span>
                <span className="text-slate-600">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span>Value Added Tax (8%)</span>
                <span className="text-slate-600">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t-2 border-slate-200">
                <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Grand Total</span>
                <span className="text-4xl font-black text-slate-950 italic tabular-nums tracking-tighter">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pb-2 text-slate-400">
               <button className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border border-slate-200 hover:bg-white hover:text-slate-900 transition-all font-black text-[9px] uppercase tracking-widest">
                  <Zap className="w-4 h-4" /> Express Pay
               </button>
               <button className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border border-slate-200 hover:bg-white hover:text-slate-900 transition-all font-black text-[9px] uppercase tracking-widest">
                  <Package className="w-4 h-4" /> Hold Item
               </button>
            </div>

            <button 
              onClick={handleCheckout}
              disabled={cart.length === 0}
              className={cn(
                "w-full flex items-center justify-between px-6 py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all transform active:scale-95 shadow-xl disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed",
                "bg-slate-900 text-white hover:bg-indigo-600 shadow-indigo-500/10"
              )}
            >
              <span>Initialize Checkout</span>
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
