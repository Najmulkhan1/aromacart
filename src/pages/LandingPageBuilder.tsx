"use client";

import React, { useState, useCallback } from "react";
import { Eye, Undo, Redo, Palette, Plus, MoveUp, MoveDown, Trash2, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

// Imports from our new folders
import { Theme, PageSection, SectionType } from "@/types/editor.types";
import { useCart } from "@/hooks/useCart";
import EditorModal from "@/components/editor/EditorModal";
import LivePreview from "@/components/preview/LivePreview";

export default function UltraProLandingPageBuilder() {
  const [theme, setTheme] = useState<Theme>({
    primary: "#10b981", secondary: "#0f766e", background: "#ffffff",
    textColor: "#1e293b", headingColor: "#111827", accent: "#eab308", fontFamily: "Inter"
  });

  const [sections, setSections] = useState<PageSection[]>([
    /* আপনার initial sections array এখানে থাকবে */
  ]);

  const [history, setHistory] = useState<PageSection[][]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const { cart, addToCart } = useCart();

  // History & Logic Functions
  const saveHistory = useCallback(() => {
    setHistory(prev => [...prev.slice(-15), JSON.parse(JSON.stringify(sections))]);
  }, [sections]);

  const updateContent = (id: string, newContent: any) => {
    saveHistory();
    setSections(s => s.map(sec => sec.id === id ? { ...sec, content: { ...sec.content, ...newContent } } : sec));
  };

  const toggleActive = (id: string) => {
    setSections(s => s.map(sec => sec.id === id ? { ...sec, isActive: !sec.isActive } : sec));
  };

  const currentEditing = sections.find(s => s.id === editingId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white pb-20">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-900/95 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-emerald-400">PROBUILDER</h1>
        <div className="flex gap-2">
           <Button variant="outline" onClick={() => setShowPreview(!showPreview)}><Eye size={16} className="mr-2"/> Preview</Button>
           <Button className="bg-emerald-500">🚀 Publish</Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 px-6 pt-6">
        {/* Sidebar (Theme & Tools) */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Palette size={18} /> Theme Editor</h2>
            {/* Theme inputs here */}
          </div>
        </div>

        {/* Section List Area */}
        <div className="col-span-12 lg:col-span-8">
           <h2 className="text-xl font-bold mb-4">Page Structure</h2>
           <div className="space-y-3">
             {sections.map(section => (
                <div key={section.id} className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex items-center gap-4">
                   <div className="flex-1 capitalize font-semibold">{section.title}</div>
                   <Switch checked={section.isActive} onCheckedChange={() => toggleActive(section.id)} />
                   <Button onClick={() => setEditingId(section.id)} variant="outline" size="sm"><Edit3 size={14} className="mr-1"/> Edit</Button>
                </div>
             ))}
           </div>
        </div>
      </div>

      {/* Live Preview Wrapper */}
      {showPreview && (
        <div className="mt-12 px-6">
           {/* Preview Mode Buttons (Desktop/Tablet/Mobile) */}
           <LivePreview sections={sections} theme={theme} previewMode={previewMode} />
        </div>
      )}

      {/* Pop-up Editor Modal */}
      {currentEditing && (
        <EditorModal 
          currentEditing={currentEditing} 
          onClose={() => setEditingId(null)} 
          updateContent={updateContent} 
        />
      )}
    </div>
  );
}