import { ShieldCheck, Heart, Sparkles, Target } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* ── Hero Section ── */}
      <div className="relative bg-secondary/30 py-20 px-4 text-center overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[url('https://via.placeholder.com/1920x600?text=About+Banner')] bg-cover bg-center opacity-10 blur-sm" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            Our Story
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Born from a passion for authentic traditions and luxury, our journey started with a simple vision: to bring the finest quality products directly to your doorstep with absolute transparency and trust.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-20">
        
        {/* ── Mission Split Section ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="aspect-square md:aspect-auto md:h-[500px] rounded-3xl overflow-hidden bg-secondary border border-border">
            <img 
              src="https://via.placeholder.com/800x800?text=Our+Craft" 
              alt="Our Mission" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-black tracking-tight">Crafting Excellence, <br/> Delivering Trust.</h2>
            <p className="text-muted-foreground leading-relaxed">
              We believe that true luxury lies in authenticity. Every product in our collection goes through rigorous quality checks. We partner directly with artisans and original manufacturers to ensure that you receive nothing but the best.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our commitment goes beyond just selling products. We are building a community of conscious consumers who value quality, heritage, and excellent customer service.
            </p>
          </div>
        </div>

        {/* ── Core Values ── */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black tracking-tight mb-4">Why Choose Us?</h2>
            <p className="text-muted-foreground">The pillars that hold our brand together.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: "100% Authentic", desc: "We guarantee the authenticity of every single item we sell. No compromises on quality." },
              { icon: Heart, title: "Crafted with Love", desc: "Curated collections that speak to your heart, focusing on aesthetics and deep traditions." },
              { icon: Sparkles, title: "Premium Packaging", desc: "Every order is packed like a special gift, ensuring a delightful unboxing experience." }
            ].map((feature, idx) => (
              <div key={idx} className="bg-card p-8 rounded-3xl border border-border text-center hover:border-primary/50 transition-colors">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}