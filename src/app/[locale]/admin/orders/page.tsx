"use client";

import { useEffect, useState } from "react";
import { Loader2, Package, Search, Calendar, MapPin, Phone, AlertCircle, CheckCircle2, ChevronDown, ChevronUp, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";

// Types
type OrderItem = { name: string; quantity: number; price: number; size: string };
type Order = {
  _id: string;
  customerDetails: { 
    name: string; 
    phone: string; 
    address: string; 
    city: string;       // district হিসেবে save হয় 'city' field এ
    division?: string;
    upazila?: string;
    email?: string;
    note?: string;
  };
  items: OrderItem[];
  totalAmount: number;
  status: string;
  paymentMethod: string;
  transactionDetails?: {
    transactionId?: string;
    senderNumber?: string;
  };
  paymentStatus?: string;
  createdAt: string;
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ORDERS_PER_PAGE = 10;

  const toggleExpand = (orderId: string) => {
    setExpandedOrder(prev => prev === orderId ? null : orderId);
  };

  // Fetch real data from the API
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

  // Update order status
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

  // Payment status update (Paid / Unpaid)
  const [updatingPaymentId, setUpdatingPaymentId] = useState<string | null>(null);

  const handlePaymentStatusChange = async (orderId: string, newPaymentStatus: string) => {
    setUpdatingPaymentId(orderId);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentStatus: newPaymentStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, paymentStatus: newPaymentStatus } : order
          )
        );
      }
    } catch (error) {
      alert("Failed to update payment status");
    } finally {
      setUpdatingPaymentId(null);
    }
  };

  // Get badge color based on status
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

  // --- Analytics Calculations (Dynamic Data) ---
  const totalRevenue = orders.reduce((sum, order) => order.status !== "Cancelled" ? sum + order.totalAmount : sum, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === "Pending").length;
  const deliveredOrders = orders.filter(o => o.status === "Delivered").length;

  // Search Filter
  const filteredOrders = orders.filter(order =>
    (order.customerDetails?.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (order.customerDetails?.phone || "").includes(searchQuery) ||
    order._id.slice(-6).toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  );

  // Search করলে page 1 এ reset
  const handleSearch = (q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
    setExpandedOrder(null);
  };

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
                onChange={(e) => handleSearch(e.target.value)}
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
                  paginatedOrders.map((order) => (
                    <>
                      <tr 
                        key={order._id} 
                        className="hover:bg-secondary/10 transition-colors cursor-pointer"
                        onClick={() => toggleExpand(order._id)}
                      >
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
                          <div className="font-bold text-foreground">{order.customerDetails?.name || "—"}</div>
                          <div className="flex flex-col gap-1 mt-1.5">
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <Phone className="w-3.5 h-3.5" /> {order.customerDetails?.phone || "—"}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <MapPin className="w-3.5 h-3.5" /> 
                              {[order.customerDetails?.city, order.customerDetails?.division].filter(Boolean).join(", ") || "—"}
                            </div>
                          </div>
                        </td>
                        
                        {/* Amount & Items */}
                        <td className="px-6 py-4">
                          <div className="font-black text-foreground">৳ {order.totalAmount.toLocaleString()}</div>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-xs text-muted-foreground font-medium">{order.items.length} Items</span>
                            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                              order.paymentMethod === "bkash" 
                                ? "text-pink-600 bg-pink-500/10" 
                                : order.paymentMethod === "nagad"
                                ? "text-orange-600 bg-orange-500/10"
                                : "text-primary bg-primary/10"
                            }`}>
                              {order.paymentMethod === "cod" ? "COD" : order.paymentMethod === "bkash" ? "bKash" : "Nagad"}
                            </span>
                            {order.paymentStatus && (
                              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                                order.paymentStatus === "Paid" 
                                  ? "text-emerald-600 bg-emerald-500/10" 
                                  : "text-amber-600 bg-amber-500/10"
                              }`}>
                                {order.paymentStatus}
                              </span>
                            )}
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
                          <div className="flex items-center justify-end gap-2">
                            <div className="inline-block relative" onClick={(e) => e.stopPropagation()}>
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
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground">
                                {updatingId === order._id ? (
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                ) : (
                                  <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                                )}
                              </div>
                            </div>
                            <button 
                              onClick={(e) => { e.stopPropagation(); toggleExpand(order._id); }}
                              className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors"
                              title="View details"
                            >
                              {expandedOrder === order._id 
                                ? <ChevronUp className="w-4 h-4" /> 
                                : <ChevronDown className="w-4 h-4" />}
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* ── Expanded Details Row ── */}
                      {expandedOrder === order._id && (
                        <tr key={`${order._id}-expanded`} className="bg-secondary/5 border-t border-dashed border-border">
                          <td colSpan={5} className="px-6 py-5">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              
                              {/* Customer Full Details */}
                              <div className="bg-card rounded-2xl border border-border p-4 space-y-2">
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3">👤 Customer Details</p>
                                <div className="space-y-1.5">
                                  <p className="text-sm font-bold">{order.customerDetails?.name || "—"}</p>
                                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                                    <Phone className="w-3 h-3" /> {order.customerDetails?.phone || "—"}
                                  </p>
                                  {order.customerDetails?.email && (
                                    <p className="text-xs text-muted-foreground">✉️ {order.customerDetails.email}</p>
                                  )}
                                  <p className="text-xs text-muted-foreground flex items-start gap-1.5">
                                    <MapPin className="w-3 h-3 mt-0.5 shrink-0" />
                                    <span>
                                      {order.customerDetails?.address && <span className="block">{order.customerDetails.address}</span>}
                                      {[order.customerDetails?.upazila, order.customerDetails?.city, order.customerDetails?.division].filter(Boolean).join(", ")}
                                    </span>
                                  </p>
                                  {order.customerDetails?.note && (
                                    <p className="text-xs bg-amber-500/10 text-amber-700 dark:text-amber-400 px-2 py-1.5 rounded-lg mt-2">
                                      📝 {order.customerDetails.note}
                                    </p>
                                  )}
                                </div>
                              </div>

                              {/* Payment Details */}
                              <div className="bg-card rounded-2xl border border-border p-4 space-y-2">
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3">💳 Payment Details</p>
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase ${
                                      order.paymentMethod === "bkash" 
                                        ? "bg-pink-500/15 text-pink-600" 
                                        : order.paymentMethod === "nagad"
                                        ? "bg-orange-500/15 text-orange-600"
                                        : "bg-primary/10 text-primary"
                                    }`}>
                                      {order.paymentMethod === "cod" ? "Cash on Delivery" : order.paymentMethod === "bkash" ? "bKash" : "Nagad"}
                                    </span>
                                    {order.paymentStatus && (
                                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                                        order.paymentStatus === "Paid" 
                                          ? "bg-emerald-500/15 text-emerald-600" 
                                          : "bg-amber-500/15 text-amber-600"
                                      }`}>
                                        {order.paymentStatus}
                                      </span>
                                    )}
                                  </div>

                                  {/* bKash / Nagad Transaction Details + Payment Status Toggle */}
                                  {(order.paymentMethod === "bkash" || order.paymentMethod === "nagad") && (
                                    <div className={`mt-2 p-3 rounded-xl border space-y-3 ${
                                      order.paymentMethod === "bkash"
                                        ? "bg-pink-500/5 border-pink-200/40 dark:border-pink-800/30"
                                        : "bg-orange-500/5 border-orange-200/40 dark:border-orange-800/30"
                                    }`}>
                                      <div>
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Sender Number</p>
                                        <p className="text-sm font-mono font-bold mt-0.5">
                                          {order.transactionDetails?.senderNumber ||
                                            <span className="text-muted-foreground font-normal text-xs italic">Not provided</span>
                                          }
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Transaction ID</p>
                                        <p className="text-sm font-mono font-bold mt-0.5">
                                          {order.transactionDetails?.transactionId ||
                                            <span className="text-muted-foreground font-normal text-xs italic">Not provided</span>
                                          }
                                        </p>
                                      </div>

                                      {/* ── Payment Status Toggle ── */}
                                      <div className="pt-2 border-t border-border/30">
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Payment Status</p>
                                        <div className="flex gap-2">
                                          <button
                                            disabled={updatingPaymentId === order._id}
                                            onClick={() => handlePaymentStatusChange(order._id, "Paid")}
                                            className={`flex-1 h-9 rounded-xl text-xs font-bold border-2 transition-all flex items-center justify-center gap-1.5 ${
                                              order.paymentStatus === "Paid"
                                                ? "bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/20"
                                                : "bg-card border-border text-muted-foreground hover:border-emerald-400 hover:text-emerald-600"
                                            }`}
                                          >
                                            {updatingPaymentId === order._id && order.paymentStatus !== "Paid" ? (
                                              <Loader2 className="w-3 h-3 animate-spin" />
                                            ) : (
                                              <CheckCircle2 className="w-3 h-3" />
                                            )}
                                            Paid
                                          </button>
                                          <button
                                            disabled={updatingPaymentId === order._id}
                                            onClick={() => handlePaymentStatusChange(order._id, "Unpaid")}
                                            className={`flex-1 h-9 rounded-xl text-xs font-bold border-2 transition-all flex items-center justify-center gap-1.5 ${
                                              order.paymentStatus === "Unpaid"
                                                ? "bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/20"
                                                : "bg-card border-border text-muted-foreground hover:border-amber-400 hover:text-amber-600"
                                            }`}
                                          >
                                            {updatingPaymentId === order._id && order.paymentStatus !== "Unpaid" ? (
                                              <Loader2 className="w-3 h-3 animate-spin" />
                                            ) : (
                                              <AlertCircle className="w-3 h-3" />
                                            )}
                                            Unpaid
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {order.paymentMethod === "cod" && (
                                    <p className="text-xs text-muted-foreground mt-2 bg-secondary/40 px-3 py-2 rounded-lg">
                                      Delivery agent will collect ৳{order.totalAmount.toLocaleString()} at doorstep.
                                    </p>
                                  )}
                                </div>
                              </div>

                              {/* Order Items */}
                              <div className="bg-card rounded-2xl border border-border p-4">
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3">📦 Order Items ({order.items.length})</p>
                                <div className="space-y-2">
                                  {order.items.map((item, idx) => (
                                    <div key={idx} className="flex items-start justify-between gap-2 py-1.5 border-b border-border/50 last:border-0">
                                      <div className="flex-1 min-w-0">
                                        <p className="text-xs font-bold truncate">{item.name}</p>
                                        <p className="text-[10px] text-muted-foreground">Size: {item.size} • Qty: {item.quantity}</p>
                                      </div>
                                      <p className="text-xs font-bold shrink-0">৳{(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                  ))}
                                  <div className="flex items-center justify-between pt-1">
                                    <p className="text-xs font-bold text-muted-foreground">Total</p>
                                    <p className="text-sm font-black text-primary">৳{order.totalAmount.toLocaleString()}</p>
                                  </div>
                                </div>
                              </div>

                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Info text */}
              <p className="text-xs text-muted-foreground">
                Showing{" "}
                <span className="font-bold text-foreground">
                  {(currentPage - 1) * ORDERS_PER_PAGE + 1}–{Math.min(currentPage * ORDERS_PER_PAGE, filteredOrders.length)}
                </span>{" "}
                of <span className="font-bold text-foreground">{filteredOrders.length}</span> orders
              </p>

              {/* Page buttons */}
              <div className="flex items-center gap-1.5">
                {/* Prev */}
                <button
                  onClick={() => { setCurrentPage(p => p - 1); setExpandedOrder(null); }}
                  disabled={currentPage === 1}
                  className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Page numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page =>
                    page === 1 ||
                    page === totalPages ||
                    Math.abs(page - currentPage) <= 1
                  )
                  .reduce<(number | "...")[]>((acc, page, idx, arr) => {
                    if (idx > 0 && (page as number) - (arr[idx - 1] as number) > 1) acc.push("...");
                    acc.push(page);
                    return acc;
                  }, [])
                  .map((item, idx) =>
                    item === "..." ? (
                      <span key={`ellipsis-${idx}`} className="w-8 h-8 flex items-center justify-center text-xs text-muted-foreground">…</span>
                    ) : (
                      <button
                        key={item}
                        onClick={() => { setCurrentPage(item as number); setExpandedOrder(null); }}
                        className={`w-8 h-8 rounded-lg text-xs font-bold border transition-all ${
                          currentPage === item
                            ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                            : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                        }`}
                      >
                        {item}
                      </button>
                    )
                  )
                }

                {/* Next */}
                <button
                  onClick={() => { setCurrentPage(p => p + 1); setExpandedOrder(null); }}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}