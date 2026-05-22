"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingBag, Users, TrendingUp, Loader2, PackageCheck } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Order Type Definition
type OrderItem = { name: string; quantity: number; price: number; size: string };
type Order = {
  _id: string;
  customerDetails: { name: string; phone: string; address: string; district: string; email?: string };
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
};

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/admin/orders");
        const data = await res.json();
        if (data.success) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // --- Calculations for Dynamic Stats ---
  const totalRevenue = orders.reduce((sum, order) => order.status !== "Cancelled" ? sum + order.totalAmount : sum, 0);
  const totalOrders = orders.length;
  
  // Unique customers based on phone numbers
  const uniqueCustomers = new Set(orders.map(o => o.customerDetails.phone)).size;
  
  // Delivery Success Rate
  const deliveredOrders = orders.filter(o => o.status === "Delivered").length;
  const deliveryRate = totalOrders > 0 ? ((deliveredOrders / totalOrders) * 100).toFixed(1) : "0.0";

  // Recent 5 Sales
  const recentSales = orders.slice(0, 5);

  // --- Chart Data Logic (Last 7 Days) ---
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return {
      dateString: d.toDateString(),
      name: d.toLocaleDateString("en-US", { weekday: "short" }), // Mon, Tue, etc.
      revenue: 0,
    };
  });

  orders.forEach((order) => {
    if (order.status !== "Cancelled") {
      const orderDate = new Date(order.createdAt).toDateString();
      const dayMatch = last7Days.find(d => d.dateString === orderDate);
      if (dayMatch) {
        dayMatch.revenue += order.totalAmount;
      }
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back, Admin. Here&apos;s your store&apos;s real-time overview.</p>
      </div>

      {/* ── Stats Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="rounded-2xl border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <DollarSign className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">৳ {totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Lifetime total earnings</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all statuses</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Customers</CardTitle>
            <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
              <Users className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueCustomers}</div>
            <p className="text-xs text-muted-foreground mt-1">Unique buyers</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Delivery Success</CardTitle>
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <PackageCheck className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deliveryRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">{deliveredOrders} orders delivered</p>
          </CardContent>
        </Card>
      </div>

      {/* ── Charts & Recent Activity ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue Chart */}
        <Card className="lg:col-span-2 rounded-2xl border-border shadow-sm">
          <CardHeader>
            <CardTitle>Revenue (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={last7Days} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `৳${value}`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "8px" }}
                    itemStyle={{ color: "var(--primary)" }}
                    formatter={(value) => [`৳${value}`, "Revenue"]}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders Overview */}
        <Card className="rounded-2xl border-border shadow-sm overflow-hidden">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentSales.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-6">No sales yet.</p>
              ) : (
                recentSales.map((sale) => (
                  <div key={sale._id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold uppercase">
                        {sale.customerDetails.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold leading-none">{sale.customerDetails.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{sale.customerDetails.phone}</p>
                      </div>
                    </div>
                    <div className="font-black text-sm">৳ {sale.totalAmount.toLocaleString()}</div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}