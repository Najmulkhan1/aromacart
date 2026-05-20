"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { bangladeshLocations, getDistricts, getUpazilas } from "@/lib/bangladesh-locations";
import {
  ChevronDown,
  Truck,
  Wallet,
  Shield,
  CheckCircle2,
  MapPin,
  Phone,
  User,
  Copy,
  Check,
  ArrowRight,
  Package,
  Sparkles,
  CreditCard,
  Clock,
  Info,
} from "lucide-react";

// --- Stepper ---
const STEPS = ["Delivery", "Payment", "Review"];

// --- Select Dropdown Component ---
function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
  disabled,
  icon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
        {icon && <span>{icon}</span>}
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`
            w-full h-12 pl-4 pr-10 rounded-2xl border-2 text-sm font-medium appearance-none
            bg-background transition-all duration-200 outline-none
            ${disabled ? "opacity-40 cursor-not-allowed border-border" : "cursor-pointer"}
            ${value ? "border-primary/60 text-foreground" : "border-border text-muted-foreground"}
            focus:border-primary focus:ring-2 focus:ring-primary/10
          `}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown
          className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors ${
            value ? "text-primary" : "text-muted-foreground"
          }`}
        />
      </div>
    </div>
  );
}

// --- Input Field Component ---
function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  icon,
  helperText,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  icon?: React.ReactNode;
  helperText?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
        {icon && <span className="text-primary/60">{icon}</span>}
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-12 px-4 rounded-2xl border-2 border-border bg-background text-sm font-medium text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/10"
      />
      {helperText && (
        <p className="text-[11px] text-muted-foreground/60">{helperText}</p>
      )}
    </div>
  );
}

// --- Payment Method Card ---
function PaymentCard({
  selected,
  onClick,
  icon,
  title,
  subtitle,
  badge,
}: {
  id: string;
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  badge?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full p-5 rounded-2xl border-2 text-left transition-all duration-200 relative overflow-hidden
        ${selected
          ? "border-primary bg-gradient-to-br from-primary/8 to-primary/3 shadow-lg shadow-primary/10"
          : "border-border hover:border-primary/40 hover:bg-secondary/30"
        }
      `}
    >
      {selected && (
        <div className="absolute top-0 right-0 w-16 h-16 -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/10 blur-xl" />
      )}
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
            selected ? "bg-primary text-primary-foreground shadow-md shadow-primary/30" : "bg-secondary/60 text-muted-foreground"
          }`}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`font-bold text-sm ${selected ? "text-foreground" : "text-foreground/80"}`}>
              {title}
            </span>
            {badge && (
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                {badge}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
        </div>
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
            selected ? "border-primary bg-primary" : "border-border"
          }`}
        >
          {selected && <Check className="w-3 h-3 text-primary-foreground" />}
        </div>
      </div>
    </button>
  );
}

// --- bKash / Nagad Payment Instructions ---
function ManualPaymentGuide({
  method,
  total,
  senderNumber,
  setSenderNumber,
  transactionId,
  setTransactionId,
}: {
  method: "bkash" | "nagad";
  total: number;
  senderNumber: string;
  setSenderNumber: (val: string) => void;
  transactionId: string;
  setTransactionId: (val: string) => void;
}) {
  const [copied, setCopied] = useState("");
  const accountNumber = method === "bkash" ? "01XXXXXXXXX (bKash)" : "01XXXXXXXXX (Nagad)";
  const rawNumber = method === "bkash" ? "01XXXXXXXXX" : "01XXXXXXXXX";

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="mt-5 rounded-2xl border border-border overflow-hidden">
      {/* Header */}
      <div
        className={`px-5 py-3 flex items-center gap-3 ${
          method === "bkash"
            ? "bg-gradient-to-r from-pink-500/15 to-rose-500/10 border-b border-pink-200/30 dark:border-pink-800/30"
            : "bg-gradient-to-r from-orange-500/15 to-amber-500/10 border-b border-orange-200/30 dark:border-orange-800/30"
        }`}
      >
        <div
          className={`w-8 h-8 rounded-xl flex items-center justify-center text-base font-black ${
            method === "bkash" ? "bg-pink-500 text-white" : "bg-orange-500 text-white"
          }`}
        >
          {method === "bkash" ? "b" : "N"}
        </div>
        <div>
          <p className={`text-sm font-black ${method === "bkash" ? "text-pink-600 dark:text-pink-400" : "text-orange-600 dark:text-orange-400"}`}>
            {method === "bkash" ? "bKash" : "Nagad"} Payment Guide
          </p>
          <p className="text-[11px] text-muted-foreground">Follow these steps carefully</p>
        </div>
      </div>

      {/* Steps */}
      <div className="p-5 space-y-3 bg-card">
        {[
          {
            step: "1",
            title: "Open your app",
            desc: `Open your ${method === "bkash" ? "bKash" : "Nagad"} app on your phone`,
          },
          {
            step: "2",
            title: 'Tap "Send Money"',
            desc: "Choose the Send Money option from the menu",
          },
          {
            step: "3",
            title: "Enter our number",
            desc: accountNumber,
            action: () => handleCopy(rawNumber, "number"),
            actionLabel: copied === "number" ? "Copied!" : "Copy",
            actionIcon: copied === "number" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />,
          },
          {
            step: "4",
            title: "Enter exact amount",
            desc: `Send exactly ৳${total.toLocaleString()}`,
            action: () => handleCopy(total.toString(), "amount"),
            actionLabel: copied === "amount" ? "Copied!" : "Copy",
            actionIcon: copied === "amount" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />,
          },
          {
            step: "5",
            title: "Note the Transaction ID",
            desc: 'After payment, note the TrxID shown in the app',
          },
        ].map((item) => (
          <div key={item.step} className="flex items-start gap-3">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black shrink-0 mt-0.5 ${
                method === "bkash"
                  ? "bg-pink-500/15 text-pink-600 dark:text-pink-400"
                  : "bg-orange-500/15 text-orange-600 dark:text-orange-400"
              }`}
            >
              {item.step}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-foreground">{item.title}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <p className="text-xs text-muted-foreground flex-1">{item.desc}</p>
                {item.action && (
                  <button
                    type="button"
                    onClick={item.action}
                    className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg border transition-all ${
                      method === "bkash"
                        ? "border-pink-200 text-pink-600 hover:bg-pink-50 dark:border-pink-800 dark:text-pink-400 dark:hover:bg-pink-950/30"
                        : "border-orange-200 text-orange-600 hover:bg-orange-50 dark:border-orange-800 dark:text-orange-400 dark:hover:bg-orange-950/30"
                    }`}
                  >
                    {item.actionIcon}
                    {item.actionLabel}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TrxID Input */}
      <div className="p-5 pt-0">
        <div
          className={`p-4 rounded-xl border-2 border-dashed space-y-3 ${
            method === "bkash" ? "border-pink-200/60 dark:border-pink-800/40 bg-pink-500/3" : "border-orange-200/60 dark:border-orange-800/40 bg-orange-500/3"
          }`}
        >
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
            <Info className="w-3 h-3" /> Enter payment details
          </p>
          <div className="grid grid-cols-1 gap-3">
            <input
              type="tel"
              value={senderNumber}
              onChange={(e) => setSenderNumber(e.target.value)}
              placeholder={`Your ${method === "bkash" ? "bKash" : "Nagad"} number (e.g. 01XXXXXXXXX)`}
              className="w-full h-11 px-4 rounded-xl border border-border bg-background text-sm outline-none focus:border-primary transition-colors"
            />
            <input
              type="text"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="Transaction ID (e.g. 8F3KX2J9P)"
              className="w-full h-11 px-4 rounded-xl border border-border bg-background text-sm font-mono outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Order Summary Item ---
function OrderItem({ name, size, quantity, price }: { name: string; size: string; quantity: number; price: number }) {
  return (
    <div className="flex items-start gap-3 py-3">
      <div className="w-10 h-10 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center shrink-0">
        <Package className="w-4 h-4 text-primary/60" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">{name}</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {size} &bull; Qty {quantity}
        </p>
      </div>
      <span className="text-sm font-bold text-foreground shrink-0">
        ৳{(price * quantity).toLocaleString()}
      </span>
    </div>
  );
}

// ==============================
// MAIN CHECKOUT PAGE
// ==============================
export default function CheckoutPage() {
  const { items,clearCart } = useCartStore();
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [step, setStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bkash" | "nagad">("cod");

  // Delivery form
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const deliveryCharge = district === "Dhaka" ? 60 : 120;
  const grandTotal = total + deliveryCharge;
const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({ 
    name: "", 
    phone: "", 
    email: "", 
    division: "", 
    district: "", 
    upazila: "", 
    address: "", 
    note: "", 
    senderNumber: "", 
    trxId: ""
  });

  // Reset dependent selects - deferred to avoid synchronous setState in effect
  useEffect(() => {
    const t = setTimeout(() => { setDistrict(""); setUpazila(""); }, 0);
    return () => clearTimeout(t);
  }, [division]);
  useEffect(() => {
    const t = setTimeout(() => setUpazila(""), 0);
    return () => clearTimeout(t);
  }, [district]);

  const districts = getDistricts(division).map((d) => d.name);
  const upazilas = getUpazilas(division, district);

  const canProceedStep1 = name && phone && division && district && upazila && address;


  const handleConfirmOrder = async () => {
    setIsSubmitting(true);
    try {
      const customerDetails = {
        name,
        phone,
        email,
        address,
        city: district,
        upazila,
        division,
        note,
      };

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.id,
            name: item.name,
            size: item.size,
            quantity: item.quantity,
            price: item.price,
          })),
          total: grandTotal,
          customerDetails,
          paymentMethod,
          transactionId: formData.trxId || undefined,
          senderNumber: formData.senderNumber || undefined,
        }),
      });

      const data = await res.json();
      if (data.success) {
        clearCart();
        window.location.href = `/en/thank-you?orderId=${data.orderId}`;
      } else {
        alert("Something went wrong, please try again.");
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("Failed to place order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ── Page Header ── */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-md shadow-primary/30">
                <Shield className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-base font-black tracking-tight">Secure Checkout</h1>
                <p className="text-[11px] text-muted-foreground">256-bit SSL encrypted</p>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="hidden sm:flex items-center gap-1">
              {STEPS.map((s, i) => (
                <div key={s} className="flex items-center gap-1">
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    i === step
                      ? "bg-primary text-primary-foreground shadow-sm shadow-primary/30"
                      : i < step
                      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                      : "bg-secondary/60 text-muted-foreground"
                  }`}>
                    {i < step ? <CheckCircle2 className="w-3 h-3" /> : <span>{i + 1}</span>}
                    {s}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`w-5 h-px ${i < step ? "bg-emerald-400" : "bg-border"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* ══ LEFT: FORM ══ */}
          <div className="lg:col-span-3 space-y-6">

            {/* ── STEP 1: Delivery Info ── */}
            {step === 0 && (
              <div className="space-y-6">
                {/* Contact Card */}
                <div className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-border/60 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-sm font-black tracking-tight">Contact Information</h2>
                      <p className="text-[11px] text-muted-foreground">Who is this order for?</p>
                    </div>
                  </div>
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputField
                      label="Full Name"
                      value={name}
                      onChange={setName}
                      placeholder="Enter your full name"
                      icon={<User className="w-3.5 h-3.5" />}
                    />
                    <InputField
                      label="Phone Number"
                      value={phone}
                      onChange={setPhone}
                      placeholder="01XXXXXXXXX"
                      type="tel"
                      icon={<Phone className="w-3.5 h-3.5" />}
                      helperText="We'll send order updates to this number"
                    />
                    <div className="md:col-span-2">
                      <InputField
                        label="Email (Optional)"
                        value={email}
                        onChange={setEmail}
                        placeholder="your@email.com"
                        type="email"
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Address Card */}
                <div className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-border/60 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-sm font-black tracking-tight">Delivery Address</h2>
                      <p className="text-[11px] text-muted-foreground">Where should we deliver?</p>
                    </div>
                  </div>
                  <div className="p-6 space-y-5">
                    {/* Division / District / Upazila */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <SelectField
                        label="Division"
                        value={division}
                        onChange={setDivision}
                        options={bangladeshLocations.map((d) => d.name)}
                        placeholder="Select Division"
                        icon={<MapPin className="w-3.5 h-3.5" />}
                      />
                      <SelectField
                        label="District"
                        value={district}
                        onChange={setDistrict}
                        options={districts}
                        placeholder="Select District"
                        disabled={!division}
                      />
                      <SelectField
                        label="Upazila / Thana"
                        value={upazila}
                        onChange={setUpazila}
                        options={upazilas}
                        placeholder="Select Upazila"
                        disabled={!district}
                      />
                    </div>

                    {/* Street Address */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        Street Address
                      </label>
                      <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="House no, Road, Area, Landmark..."
                        className="w-full h-12 px-4 rounded-2xl border-2 border-border bg-background text-sm font-medium text-foreground placeholder:text-muted-foreground/50 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
                      />
                    </div>

                    {/* Order Note */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        Order Note (Optional)
                      </label>
                      <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Any special instructions for delivery..."
                        rows={3}
                        className="w-full px-4 py-3 rounded-2xl border-2 border-border bg-background text-sm font-medium text-foreground placeholder:text-muted-foreground/50 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10 resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery estimate banner */}
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/8 border border-emerald-500/20">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Estimated Delivery</p>
                    <p className="text-xs text-emerald-600/70 dark:text-emerald-500">
                      Dhaka: 2–3 working days &bull; Outside Dhaka: 3–5 working days
                    </p>
                  </div>
                                  <span className="ml-auto text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 px-3 py-1 rounded-full whitespace-nowrap">
                    ৳{deliveryCharge} Delivery Charge
                  </span>
                </div>

                <button
                  type="button"
                  disabled={!canProceedStep1}
                  onClick={() => setStep(1)}
                  className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  Continue to Payment <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* ── STEP 2: Payment ── */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-border/60 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-sm font-black tracking-tight">Payment Method</h2>
                      <p className="text-[11px] text-muted-foreground">Choose how you want to pay</p>
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <PaymentCard
                      id="cod"
                      selected={paymentMethod === "cod"}
                      onClick={() => setPaymentMethod("cod")}
                      icon={<Truck className="w-5 h-5" />}
                      title="Cash on Delivery"
                      subtitle="Pay when your order arrives"
                      badge="Most Popular"
                    />
                    <PaymentCard
                      id="bkash"
                      selected={paymentMethod === "bkash"}
                      onClick={() => setPaymentMethod("bkash")}
                      icon={
                        <span className="text-base font-black text-white">b</span>
                      }
                      title="bKash"
                      subtitle="Pay via bKash mobile banking"
                    />
                    <PaymentCard
                      id="nagad"
                      selected={paymentMethod === "nagad"}
                      onClick={() => setPaymentMethod("nagad")}
                      icon={
                        <span className="text-base font-black text-white">N</span>
                      }
                      title="Nagad"
                      subtitle="Pay via Nagad mobile banking"
                    />

                    {/* Mobile Banking Guide */}
                    {(paymentMethod === "bkash" || paymentMethod === "nagad") && (
                      <ManualPaymentGuide
                        method={paymentMethod}
                        total={grandTotal}
                        senderNumber={formData.senderNumber}
                        setSenderNumber={(val) => setFormData((prev) => ({ ...prev, senderNumber: val }))}
                        transactionId={formData.trxId}
                        setTransactionId={(val) => setFormData((prev) => ({ ...prev, trxId: val }))}
                      />
                    )}

                    {/* COD Info */}
                    {paymentMethod === "cod" && (
                      <div className="mt-3 p-4 rounded-2xl bg-secondary/30 border border-border flex items-start gap-3">
                        <Info className="w-4 h-4 text-primary/60 mt-0.5 shrink-0" />
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Please keep the exact amount ready when your order arrives. Our delivery agent will collect ৳{grandTotal.toLocaleString()} at the time of delivery.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className="h-14 px-6 rounded-2xl border-2 border-border text-foreground font-bold text-sm flex items-center justify-center gap-2 transition-all hover:border-primary/40 hover:bg-secondary/30"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 h-14 rounded-2xl bg-primary text-primary-foreground font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
                  >
                    Review Order <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 3: Review & Confirm ── */}
            {step === 2 && (
              <div className="space-y-6">
                {/* Delivery Summary */}
                <div className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-border/60 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-primary" />
                      </div>
                      <h2 className="text-sm font-black">Delivery Details</h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(0)}
                      className="text-xs font-semibold text-primary hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="p-6 space-y-2">
                    <p className="font-bold text-foreground">{name || "—"}</p>
                    <p className="text-sm text-muted-foreground">{phone}</p>
                    <p className="text-sm text-muted-foreground">
                      {[address, upazila, district, division].filter(Boolean).join(", ")}
                    </p>
                  </div>
                </div>

                {/* Payment Summary */}
                <div className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-border/60 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Wallet className="w-4 h-4 text-primary" />
                      </div>
                      <h2 className="text-sm font-black">Payment Method</h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs font-semibold text-primary hover:underline"
                    >
                      Change
                    </button>
                  </div>
                  <div className="p-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      {paymentMethod === "cod" ? (
                        <Truck className="w-5 h-5 text-primary" />
                      ) : paymentMethod === "bkash" ? (
                        <span className="text-sm font-black text-pink-600">b</span>
                      ) : (
                        <span className="text-sm font-black text-orange-600">N</span>
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-sm capitalize">
                        {paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod === "bkash" ? "bKash" : "Nagad"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {paymentMethod === "cod" ? "Pay when delivered" : "Manual bank transfer"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: <Shield className="w-4 h-4" />, label: "100% Authentic" },
                    { icon: <Truck className="w-4 h-4" />, label: "Fast Delivery" },
                    { icon: <Sparkles className="w-4 h-4" />, label: "Premium Pack" },
                  ].map((b) => (
                    <div
                      key={b.label}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-secondary/30 border border-border text-center"
                    >
                      <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        {b.icon}
                      </div>
                      <p className="text-[11px] font-semibold text-foreground">{b.label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="h-14 px-6 rounded-2xl border-2 border-border text-foreground font-bold text-sm flex items-center justify-center gap-2 transition-all hover:border-primary/40 hover:bg-secondary/30"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmOrder}
                    disabled={isSubmitting}
                    className="flex-1 h-14 rounded-2xl bg-primary text-primary-foreground font-bold text-base flex items-center justify-center gap-2 shadow-xl shadow-primary/25 transition-all hover:scale-[1.01] hover:shadow-2xl hover:shadow-primary/30 active:scale-[0.99]"
                  >
                    {isSubmitting ? "Processing..." : (
    <>
      <CheckCircle2 className="w-5 h-5" />
      Confirm Order — ৳{grandTotal.toLocaleString()}
    </>
  )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ══ RIGHT: ORDER SUMMARY ══ */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-4">
              <div className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-border/60 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Package className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-sm font-black">Order Summary</h2>
                    <p className="text-[11px] text-muted-foreground">{items.length} item{items.length !== 1 ? "s" : ""} in cart</p>
                  </div>
                </div>

                {/* Items */}
                <div className="px-6 divide-y divide-border/60">
                  {items.length === 0 ? (
                    <div className="py-8 text-center text-muted-foreground text-sm">
                      Your cart is empty.
                    </div>
                  ) : (
                    items.map((item) => (
                      <OrderItem
                        key={`${item.id}-${item.size}`}
                        name={item.name}
                        size={item.size}
                        quantity={item.quantity}
                        price={item.price}
                      />
                    ))
                  )}
                </div>

                {/* Totals */}
                <div className="px-6 py-5 space-y-3 border-t border-border/60 bg-secondary/10">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">৳{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="font-semibold">৳{deliveryCharge}</span>
                  </div>
                  <div className="pt-3 border-t border-border/60 flex justify-between items-center">
                    <span className="text-base font-black">Total</span>
                    <div className="text-right">
                      <span className="text-xl font-black text-primary">৳{grandTotal.toLocaleString()}</span>
                      <p className="text-[11px] text-muted-foreground">Incl. all taxes</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Badges */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground/60">
                <Shield className="w-3.5 h-3.5" />
                <span>Secured by 256-bit SSL encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}