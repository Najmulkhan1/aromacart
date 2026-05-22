"use client";

import { useEffect, useState } from "react";
import { Loader2, Package, Search, Calendar, MapPin, Phone, DollarSign, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";

// Types
type OrderItem = { name: string; quantity: number; price: number; size: string };
type Order = {
  _id: string;
  customerDetails: { name: string; phone: string; address: string; district: string };
  items: OrderItem[];
  totalAmount: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // API থেকে রিয়েল ডাটা ফেচ করা
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/admin/orders");
        const data = await res.json();
        if (data.success) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // স্ট্যাটাস আপডেট করা
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      
      if (data.success) {
        setOrders((prev) =>
          prev.map((order) => (order._id === orderId ? { ...order, status: newStatus } : order))
        );
      }
    } catch (error) {
      alert("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  // স্ট্যাটাস অনুযায়ী ব্যাজ কালার
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-amber-500/15 text-amber-600 border-amber-500/20";
      case "Processing": return "bg-blue-500/15 text-blue-600 border-blue-500/20";
      case "Shipped": return "bg-purple-500/15 text-purple-600 border-purple-500/20";
      case "Delivered": return "bg-emerald-500/15 text-emerald-600 border-emerald-500/20";
      case "Cancelled": return "bg-rose-500/15 text-rose-600 border-rose-500/20";
      default: return "bg-secondary/50 text-muted-foreground border-border";
    }
  };

  // --- Analytics Calculations (ডায়নামিক ডাটা) ---
  const totalRevenue = orders.reduce((sum, order) => order.status !== "Cancelled" ? sum + order.totalAmount : sum, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === "Pending").length;
  const deliveredOrders = orders.filter(o => o.status === "Delivered").length;

  // Search Filter
  const filteredOrders = orders.filter(order => 
    order.customerDetails.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customerDetails.phone.includes(searchQuery) ||
    order._id.slice(-6).toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/10 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* ── Page Header ── */}
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-2">
            Order Management <TrendingUp className="w-6 h-6 text-primary" />
          </h1>
          <p className="text-muted-foreground mt-1">Overview and Order Management</p>
        </div>

        {/* ── Analytics Cards (Dynamic) ── */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card p-6 rounded-3xl border border-border shadow-sm flex items-start justify-between">
            <div>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">Total Revenue</p>
              <h3 className="text-2xl font-black text-primary">৳{totalRevenue.toLocaleString()}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><DollarSign /></div>
          </div>
          
          <div className="bg-card p-6 rounded-3xl border border-border shadow-sm flex items-start justify-between">
            <div>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">Total Orders</p>
              <h3 className="text-2xl font-black">{totalOrders}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500"><Package /></div>
          </div>

          <div className="bg-card p-6 rounded-3xl border border-border shadow-sm flex items-start justify-between">
            <div>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">Pending</p>
              <h3 className="text-2xl font-black text-amber-500">{pendingOrders}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500"><AlertCircle /></div>
          </div>

          <div className="bg-card p-6 rounded-3xl border border-border shadow-sm flex items-start justify-between">
            <div>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">Delivered</p>
              <h3 className="text-2xl font-black text-emerald-500">{deliveredOrders}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500"><CheckCircle2 /></div>
          </div>
        </div> */}

        {/* ── Orders Management Section ── */}
        <div className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
          
          {/* Table Header & Search */}
          <div className="p-6 border-b border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" /> Recent Orders
            </h2>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search by ID, Name or Phone..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-9 pr-4 rounded-xl border border-border bg-secondary/30 text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-xs text-muted-foreground uppercase bg-secondary/20">
                <tr>
                  <th className="px-6 py-4 font-bold tracking-wider">Order Info</th>
                  <th className="px-6 py-4 font-bold tracking-wider">Customer</th>
                  <th className="px-6 py-4 font-bold tracking-wider">Amount</th>
                  <th className="px-6 py-4 font-bold tracking-wider">Status</th>
                  <th className="px-6 py-4 font-bold tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                      No orders found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-secondary/10 transition-colors">
                      {/* Order Info */}
                      <td className="px-6 py-4">
                        <div className="font-mono font-bold text-primary uppercase">#{order._id.slice(-6)}</div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(order.createdAt).toLocaleDateString('en-GB')}
                        </div>
                      </td>
                      
                      {/* Customer Info */}
                      <td className="px-6 py-4">
                        <div className="font-bold text-foreground">{order.customerDetails.name}</div>
                        <div className="flex flex-col gap-1 mt-1.5">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Phone className="w-3.5 h-3.5" /> {order.customerDetails.phone}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <MapPin className="w-3.5 h-3.5" /> {order.customerDetails.district}
                          </div>
                        </div>
                      </td>
                      
                      {/* Amount & Items */}
                      <td className="px-6 py-4">
                        <div className="font-black text-foreground">৳ {order.totalAmount.toLocaleString()}</div>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-xs text-muted-foreground font-medium">{order.items.length} Items</span>
                          <span className="text-[10px] uppercase font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                            {order.paymentMethod}
                          </span>
                        </div>
                      </td>
                      
                      {/* Status */}
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1.5 rounded-full text-[11px] font-bold border uppercase tracking-wider inline-flex items-center gap-1.5 ${getStatusColor(order.status)}`}>
                          {order.status === "Pending" && <AlertCircle className="w-3 h-3" />}
                          {order.status === "Delivered" && <CheckCircle2 className="w-3 h-3" />}
                          {order.status}
                        </span>
                      </td>
                      
                      {/* Action Dropdown */}
                      <td className="px-6 py-4 text-right">
                        <div className="inline-block relative">
                          <select
                            disabled={updatingId === order._id}
                            value={order.status}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            className="appearance-none bg-background border-2 border-border hover:border-primary/50 text-xs font-bold rounded-xl pl-4 pr-8 py-2 focus:outline-none focus:border-primary cursor-pointer disabled:opacity-50 transition-colors"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                          {/* Custom Dropdown Arrow */}
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground">
                            {updatingId === order._id ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}