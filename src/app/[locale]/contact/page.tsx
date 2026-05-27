"use client";

import { MapPin, Phone, Mail, Send, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      
      {/* ── Header ── */}
      <div className="bg-secondary/30 py-16 px-4 text-center border-b border-border">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Get in Touch</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Have a question about an order, a product, or just want to say hi? We'd love to hear from you.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* ── Contact Info (Left) ── */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-black mb-6">Contact Information</h2>
              <p className="text-muted-foreground mb-8">
                Fill up the form and our team will get back to you within 24 hours.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: Phone, title: "Call Us", content: "+880 1945-548080", sub: "Sat-Thu, 10am - 8pm" },
                { icon: Mail, title: "Email Us", content: "support@yourdomain.com", sub: "Online support 24/7" },
                { icon: MapPin, title: "Head Office", content: "Level 4, City Center, Dhaka", sub: "Bangladesh" },
                { icon: Clock, title: "Delivery Hours", content: "10:00 AM - 06:00 PM", sub: "Standard working days" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{item.title}</h3>
                    <p className="text-sm font-medium text-foreground mt-1">{item.content}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Contact Form (Right) ── */}
          <div className="bg-card p-8 md:p-10 rounded-3xl border border-border shadow-sm">
            <h2 className="text-2xl font-black mb-6">Send a Message</h2>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Message sent successfully!"); }}>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Your Name</label>
                  <input type="text" required placeholder="John Doe" className="w-full h-12 px-4 rounded-xl border border-border bg-background text-sm focus:border-primary outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Phone Number</label>
                  <input type="tel" required placeholder="01XXXXXXXXX" className="w-full h-12 px-4 rounded-xl border border-border bg-background text-sm focus:border-primary outline-none transition-colors" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Address</label>
                <input type="email" placeholder="john@example.com" className="w-full h-12 px-4 rounded-xl border border-border bg-background text-sm focus:border-primary outline-none transition-colors" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Subject</label>
                <input type="text" required placeholder="How can we help?" className="w-full h-12 px-4 rounded-xl border border-border bg-background text-sm focus:border-primary outline-none transition-colors" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Message</label>
                <textarea required placeholder="Write your message here..." rows={5} className="w-full p-4 rounded-xl border border-border bg-background text-sm focus:border-primary outline-none transition-colors resize-none" />
              </div>

              <Button type="submit" className="w-full h-14 rounded-xl bg-primary text-primary-foreground font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.01] transition-all">
                Send Message <Send className="w-5 h-5" />
              </Button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}