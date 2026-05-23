import React, { useState, useEffect } from "react";
import { ChevronRight, CreditCard, Truck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageSection, Theme } from "@/types/editor.types";
import DraggableBox from "./DraggableBox";

// ==========================================
// লাইভ টাইমার কম্পোনেন্ট (প্রতি সেকেন্ডে আপডেট হবে)
// ==========================================
const RealTimeTimer = ({ endDate }: { endDate: string }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // যদি ইউজার কোনো ডেট না দেয়, তবে ডিফল্ট ৩ দিন সেট হবে
    const targetDate = endDate ? new Date(endDate).getTime() : new Date().getTime() + 3 * 24 * 60 * 60 * 1000;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  // নাম্বারগুলোকে ডাবল ডিজিট করার ফাংশন (যেমন: 5 কে 05 করা)
  const formatTime = (time: number) => time < 10 ? `0${time}` : time;

  return (
    <div className="flex justify-center gap-4 md:gap-8">
      {/* Days */}
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 md:w-24 md:h-24 bg-white text-gray-900 rounded-2xl flex items-center justify-center text-2xl md:text-4xl font-bold shadow-lg">
          {formatTime(timeLeft.days)}
        </div>
        <span className="mt-2 text-sm md:text-base font-medium uppercase tracking-wider">Days</span>
      </div>
      {/* Hours */}
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 md:w-24 md:h-24 bg-white text-gray-900 rounded-2xl flex items-center justify-center text-2xl md:text-4xl font-bold shadow-lg">
          {formatTime(timeLeft.hours)}
        </div>
        <span className="mt-2 text-sm md:text-base font-medium uppercase tracking-wider">Hours</span>
      </div>
      {/* Minutes */}
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 md:w-24 md:h-24 bg-white text-gray-900 rounded-2xl flex items-center justify-center text-2xl md:text-4xl font-bold shadow-lg">
          {formatTime(timeLeft.minutes)}
        </div>
        <span className="mt-2 text-sm md:text-base font-medium uppercase tracking-wider">Mins</span>
      </div>
      {/* Seconds */}
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 md:w-24 md:h-24 bg-white text-gray-900 rounded-2xl flex items-center justify-center text-2xl md:text-4xl font-bold shadow-lg text-red-500">
          {formatTime(timeLeft.seconds)}
        </div>
        <span className="mt-2 text-sm md:text-base font-medium uppercase tracking-wider">Secs</span>
      </div>
    </div>
  );
};


// ==========================================
// মেইন LivePreview কম্পোনেন্ট
// ==========================================
interface Props {
  sections: PageSection[];
  theme: Theme;
  previewMode: "desktop" | "tablet" | "mobile";
}

export default function LivePreview({ sections, theme, previewMode }: Props) {
  const activeSections = sections.filter(s => s.isActive).sort((a, b) => a.order - b.order);

  const renderSection = (section: PageSection) => {
    const style = {
      backgroundColor: theme.background,
      color: theme.textColor,
      fontFamily: theme.fontFamily,
    };

    switch (section.type) {
      case "hero":
        return (
          <div className="min-h-[500px] flex items-center justify-center text-center relative"
            style={{ ...style, backgroundImage: `url(${section.content.bgImage})`, backgroundSize: 'cover' }}>
            <div className="absolute inset-0" style={{ backgroundColor: `rgba(0,0,0,${section.content.overlayOpacity ?? 0.5})` }} />
            <div className="relative z-10 px-6">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">{section.content.heading}</h1>
              <p className="text-xl mb-8 text-white/95">{section.content.subHeading}</p>
              <Button style={{ backgroundColor: theme.primary }}>{section.content.ctaText}</Button>
            </div>
          </div>
        );

      case "products": {
        const products = section.content.products || [];
        const hasProducts = products.length > 0;

        return (
          <div className="py-12 px-4" style={style}>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">{section.content.sectionTitle || "Featured Products"}</h2>
                <p className="opacity-70">{section.content.sectionSubtitle || "Discover our best products"}</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {hasProducts ? products.map((p: any) => (
                  <div key={p.id} className="bg-white rounded-xl shadow-sm border overflow-hidden text-gray-800">
                    <div className="aspect-square relative">
                      <img src={p.image || "https://placehold.co/400"} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium">{p.name}</h3>
                      <p className="font-bold mt-1" style={{ color: theme.primary }}>BDT {p.price}</p>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-full text-center py-8 opacity-50">No products available.</div>
                )}
              </div>
            </div>
          </div>
        );
      }

      case "cartPayment": {
        const delCharge = section.content.deliveryCharge || 60;
        const freeOver = section.content.freeDeliveryOver || 2000;
        const methods = section.content.methods || ["Cash on Delivery", "bKash", "Nagad"];

        return (
          <div className="py-12 px-4" style={style}>
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Payment Methods</h2>
                  <div className="space-y-3">
                    {methods.map((m: string) => (
                      <div key={m} className="flex items-center gap-3 bg-white text-gray-800 p-4 rounded-xl shadow-sm border">
                        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                          <CreditCard className="text-green-600" />
                        </div>
                        <span className="font-medium text-lg">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-4">Delivery Information</h2>
                  <div className="bg-white text-gray-800 p-6 rounded-xl shadow-sm border">
                    <div className="mb-4">
                      <Truck className="text-blue-600 mb-2" size={32} />
                      <h3 className="font-semibold text-lg mb-2">Standard Delivery</h3>
                      <p className="text-gray-600">Delivery within 2-4 working days.</p>
                      <p className="font-bold mt-2">Charge: <span style={{ color: theme.primary }}>BDT {delCharge}</span></p>
                      <p className="text-sm font-semibold mt-2" style={{ color: theme.primary }}>Free delivery over BDT {freeOver}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case "faq": {
        const faqs = section.content.faqs || [];
        return (
          <div className="py-16 px-6" style={style}>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">{section.content.sectionTitle || "FAQ"}</h2>
                <p className="opacity-70">{section.content.sectionSubtitle}</p>
              </div>
              <div className="space-y-4">
                {faqs.map((faq: any, idx: number) => (
                  <div key={idx} className="bg-white/10 border border-black/10 rounded-lg p-5 shadow-sm text-left backdrop-blur-sm">
                    <h4 className="font-bold text-lg flex items-center gap-2">
                      <ChevronRight size={20} style={{ color: theme.primary }} />
                      {faq.question || "Question here?"}
                    </h4>
                    <p className="mt-2 pl-7 opacity-80 leading-relaxed">{faq.answer || "Answer goes here."}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }

      case "gallery": {
        const images = section.content.images || [];
        const cols = section.content.columns || "3";
        const gridCols = cols === "2" ? "md:grid-cols-2" : cols === "4" ? "md:grid-cols-4" : "md:grid-cols-3";

        return (
          <div className="py-16 px-6" style={style}>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">{section.content.sectionTitle || "Gallery"}</h2>
              <div className={`grid grid-cols-2 ${gridCols} gap-4`}>
                {images.map((img: any, idx: number) => (
                  <div key={idx} className="relative group overflow-hidden rounded-xl aspect-square bg-gray-100 border border-black/5">
                    {img.url ? (
                      <img src={img.url} alt={img.caption || `Gallery image ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                    )}
                    {img.caption && (
                      <div className="absolute inset-x-0 bottom-0 bg-black/60 text-white p-3 text-sm text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        {img.caption}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }

      case "testimonials": {
        const testimonials = section.content.testimonials || [];
        return (
          <div className="py-16 px-6 bg-black/5" style={style}>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">{section.content.sectionTitle || "Testimonials"}</h2>
                <p className="opacity-70">{section.content.sectionSubtitle}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((testi: any, idx: number) => (
                  <div key={idx} className="bg-white text-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 text-left">
                    <div className="flex gap-1 mb-4 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill={i < (testi.rating || 5) ? "currentColor" : "none"} className={i < (testi.rating || 5) ? "" : "text-gray-300"} />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-6 italic leading-relaxed">"{testi.message || "Great product!"}"</p>
                    <div className="flex items-center gap-3">
                      {testi.avatar ? (
                        <img src={testi.avatar} alt={testi.name} className="w-12 h-12 rounded-full object-cover border" />
                      ) : (
                        <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl text-white" style={{ backgroundColor: theme.primary }}>
                          {(testi.name || "U")[0]}
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold">{testi.name || "User"}</h4>
                        <p className="text-sm text-gray-500">{testi.role || "Customer"}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }

      // 👉 এখানেই কাউন্টডাউন সেকশন কল করা হয়েছে
      case "countdown": {
        return (
          <div className="py-16 px-6 relative overflow-hidden" style={{ backgroundColor: theme.secondary, color: "#fff" }}>
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
            
            <div className="max-w-4xl mx-auto relative z-10 text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                {section.content.sectionTitle || "Flash Sale Ends In!"}
              </h2>
              {section.content.sectionSubtitle && (
                <p className="text-lg opacity-80 mb-10">{section.content.sectionSubtitle}</p>
              )}
              
              {/* লাইভ টাইমার কম্পোনেন্ট এখানে রেন্ডার হচ্ছে */}
              <RealTimeTimer endDate={section.content.endDate} />
            </div>
          </div>
        );
      }

      default: return null;
    }
  };

  const maxWidthClass = previewMode === "mobile" ? "max-w-[375px]" : previewMode === "tablet" ? "max-w-[768px]" : "max-w-6xl";

  return (
    <div className={`mx-auto border-[8px] border-gray-700 rounded-3xl overflow-hidden shadow-2xl bg-white transition-all duration-300 ${maxWidthClass}`}>
      {activeSections.map(sec => (
        <React.Fragment key={sec.id}>
          {renderSection(sec)}
        </React.Fragment>
      ))}

      <DraggableBox initialText="Special Offer Badge!" />
    </div>
  );
}