"use client";

import { useState } from "react";
import { GripVertical, Eye, Save, Image as ImageIcon, Type, Link as LinkIcon, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// ডেমো সেকশন ডাটা
const initialSections = [
  { id: "hero", name: "Hero Section", isActive: true },
  { id: "scent-journey", name: "Scent Journey", isActive: true },
  { id: "featured", name: "Featured Products", isActive: true },
  { id: "category", name: "Category Grid", isActive: true },
  { id: "brand-story", name: "Brand Story", isActive: true },
  { id: "testimonials", name: "Testimonials", isActive: false },
  { id: "newsletter", name: "Newsletter", isActive: true },
];

export default function CmsEditorPage() {
  const [sections, setSections] = useState(initialSections);
  const [activeSection, setActiveSection] = useState("hero");

  // সেকশন অন/অফ টোগল করার ফাংশন
  const toggleSection = (id: string) => {
    setSections(sections.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Landing Page Editor</h1>
          <p className="text-muted-foreground mt-1">Customize your storefront without touching code.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="rounded-xl h-11">
            <Eye className="w-4 h-4 mr-2" /> Live Preview
          </Button>
          <Button className="rounded-xl h-11 px-6">
            <Save className="w-4 h-4 mr-2" /> Publish Changes
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-0">
        
        {/* Left Column: Draggable Sections List */}
        <Card className="w-full lg:w-80 shrink-0 flex flex-col rounded-2xl border-border shadow-sm overflow-hidden">
          <CardHeader className="bg-secondary/20 pb-4 shrink-0">
            <CardTitle className="text-lg">Page Sections</CardTitle>
            <CardDescription>Drag to reorder. Toggle to show/hide.</CardDescription>
          </CardHeader>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {sections.map((section) => (
              <div 
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                  activeSection === section.id 
                    ? "border-primary bg-primary/5 shadow-[0_0_15px_rgba(201,149,106,0.1)] dark:shadow-[0_0_15px_rgba(212,168,83,0.1)]" 
                    : "border-border hover:border-primary/50 bg-card"
                }`}
              >
                <div className="flex items-center gap-3">
                  <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab active:cursor-grabbing hover:text-foreground" />
                  <span className={`font-medium text-sm ${!section.isActive && 'text-muted-foreground line-through'}`}>
                    {section.name}
                  </span>
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                  <Switch 
                    checked={section.isActive} 
                    onCheckedChange={() => toggleSection(section.id)} 
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right Column: Section Editor */}
        <Card className="flex-1 rounded-2xl border-border shadow-sm flex flex-col overflow-hidden">
          <CardHeader className="bg-secondary/20 shrink-0 border-b border-border">
            <div className="flex items-center gap-2 text-primary mb-1">
              <Type className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Editing Section</span>
            </div>
            <CardTitle className="text-2xl">
              {sections.find(s => s.id === activeSection)?.name || "Select a section"}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-y-auto p-6 md:p-8">
            {/* Editor fields map dynamically based on activeSection. Here we mockup the "Hero" section editor. */}
            
            {activeSection === "hero" ? (
              <div className="space-y-8 max-w-3xl">
                
                {/* Text Content */}
                <section>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Type className="w-5 h-5 text-muted-foreground" /> Text Content
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Headline (English)</Label>
                        <Input defaultValue="Discover Your Signature Scent" className="h-11 rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <Label>Subheadline (English)</Label>
                        <Textarea defaultValue="Explore our curated collection of luxury perfumes..." className="h-24 rounded-xl resize-none" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Headline (Bengali)</Label>
                        <Input defaultValue="আপনার স্বতন্ত্র সুগন্ধ খুঁজুন" className="h-11 rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <Label>Subheadline (Bengali)</Label>
                        <Textarea defaultValue="আমাদের লাক্সারি পারফিউমের এক্সক্লুসিভ কালেকশন এক্সপ্লোর করুন..." className="h-24 rounded-xl resize-none" />
                      </div>
                    </div>
                  </div>
                </section>

                <Separator />

                {/* Call to Action */}
                <section>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <LinkIcon className="w-5 h-5 text-muted-foreground" /> Call to Action (CTA)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label>Button Text (EN)</Label>
                      <Input defaultValue="Explore Now" className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label>Button Text (BN)</Label>
                      <Input defaultValue="এখনই দেখুন" className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label>Button Link</Label>
                      <Input defaultValue="/shop" className="rounded-xl text-primary" />
                    </div>
                  </div>
                </section>

                <Separator />

                {/* Background & Styling */}
                <section>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-muted-foreground" /> Background Image & Styling
                  </h3>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/2 aspect-video bg-secondary rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:bg-secondary/80 transition-colors">
                      <ImageIcon className="w-8 h-8 text-muted-foreground mb-2" />
                      <span className="text-sm font-medium">Upload Hero Background</span>
                      <span className="text-xs text-muted-foreground">1920x1080px recommended</span>
                    </div>
                    <div className="w-full md:w-1/2 space-y-4">
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2"><Palette className="w-4 h-4" /> Overlay Color</Label>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-background border border-border shadow-inner"></div>
                          <Input defaultValue="var(--background)" className="flex-1 font-mono text-sm" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Overlay Opacity</Label>
                        <Input type="range" min="0" max="100" defaultValue="60" className="w-full accent-primary" />
                      </div>
                    </div>
                  </div>
                </section>

              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                <Palette className="w-16 h-16 mb-4 opacity-20" />
                <p className="text-lg font-medium text-foreground">Select a section to edit</p>
                <p className="text-sm mt-1">Fields for {sections.find(s => s.id === activeSection)?.name} will appear here.</p>
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}