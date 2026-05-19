"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Lock, CreditCard, Truck, ChevronLeft } from "lucide-react";

export default function CheckoutPage() {
  const { items, getCartTotal } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const subtotal = getCartTotal();
  const shippingFee = 120; // ডেলিভারি চার্জ (ধরে নিচ্ছি 120 টাকা)
  const total = subtotal + shippingFee;

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-8">
        <Link href="/shop" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" /> Continue Shopping
        </Link>
        <h1 className="text-3xl font-bold tracking-tight mt-4">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Form & Payment (Takes up 7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Contact & Shipping Form */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Truck className="w-5 h-5 mr-2 text-primary" /> Shipping Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="Enter your first name" className="h-12 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Enter your last name" className="h-12 rounded-xl" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="Enter your email" className="h-12 rounded-xl" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="e.g. +8801XXXXXXXXX" className="h-12 rounded-xl" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="address">Street Address</Label>
                <Input id="address" placeholder="House number and street name" className="h-12 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="e.g. Dhaka" className="h-12 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postal">Postal Code</Label>
                <Input id="postal" placeholder="e.g. 1205" className="h-12 rounded-xl" />
              </div>
            </div>
          </section>

          <Separator />

          {/* Payment Method */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-primary" /> Payment Method
            </h2>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
              
              {/* Cash on Delivery */}
              <div className={`flex items-center justify-between px-4 py-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-border'}`} onClick={() => setPaymentMethod('cod')}>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod" className="cursor-pointer font-medium">Cash on Delivery (COD)</Label>
                </div>
                <Truck className="w-5 h-5 text-muted-foreground" />
              </div>

              {/* SSLCommerz (Mobile Banking / Cards) */}
              <div className={`flex items-center justify-between px-4 py-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'sslcommerz' ? 'border-primary bg-primary/5' : 'border-border'}`} onClick={() => setPaymentMethod('sslcommerz')}>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="sslcommerz" id="sslcommerz" />
                  <div>
                    <Label htmlFor="sslcommerz" className="cursor-pointer font-medium block">Pay Online (SSLCommerz)</Label>
                    <span className="text-xs text-muted-foreground">bKash, Nagad, Visa, MasterCard</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  {/* Fake card icons */}
                  <div className="w-8 h-5 bg-pink-500 rounded text-[8px] text-white flex items-center justify-center font-bold">bKash</div>
                  <div className="w-8 h-5 bg-blue-600 rounded text-[8px] text-white flex items-center justify-center font-bold">VISA</div>
                </div>
              </div>

              {/* Stripe (International) */}
              <div className={`flex items-center justify-between px-4 py-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'stripe' ? 'border-primary bg-primary/5' : 'border-border'}`} onClick={() => setPaymentMethod('stripe')}>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="stripe" id="stripe" />
                  <Label htmlFor="stripe" className="cursor-pointer font-medium block">Credit/Debit Card (Stripe)</Label>
                </div>
                <CreditCard className="w-5 h-5 text-muted-foreground" />
              </div>

            </RadioGroup>
          </section>
        </div>

        {/* Right Column: Order Summary (Takes up 5 cols) */}
        <div className="lg:col-span-5">
          <Card className="sticky top-24 rounded-2xl shadow-sm border-border overflow-hidden">
            <CardHeader className="bg-secondary/30 pb-6">
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {items.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">Your cart is empty.</p>
              ) : (
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex justify-between items-start gap-4">
                      <div className="flex gap-3">
                        <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center text-[10px] text-muted-foreground shrink-0">
                          [Img]
                        </div>
                        <div>
                          <p className="font-medium text-sm leading-tight">{item.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">Size: {item.size}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-sm">৳ {(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              )}

              <Separator className="my-6" />

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">৳ {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">৳ {shippingFee.toLocaleString()}</span>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="flex justify-between items-end mb-6">
                <span className="font-semibold text-lg">Total</span>
                <span className="font-bold text-2xl text-primary">৳ {total.toLocaleString()}</span>
              </div>
            </CardContent>
            
            <CardFooter className="bg-secondary/10 flex-col pt-0 pb-6 px-6">
              <Button size="lg" className="w-full rounded-full h-14 text-base mb-4" disabled={items.length === 0}>
                Place Order <Lock className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" /> Secure checkout process
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}