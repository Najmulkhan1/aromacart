"use client";

import React, { useState, useEffect } from "react";
import { Eye, Undo, Redo } from "lucide-react";
import { Button } from "@/components/ui/button";

// Imports from our modular folders
import { Theme, PageSection, SectionType } from "@/types/editor.types";
import { useCart } from "@/hooks/useCart";
import { useEditorHistory } from "@/hooks/useEditorHistory";

import Sidebar from "@/components/editor/Sidebar";
import SectionList from "@/components/editor/SectionList";
import EditorModal from "@/components/editor/EditorModal";
import LivePreview from "@/components/preview/LivePreview";

// Dnd-kit array move
import { arrayMove } from "@dnd-kit/sortable";

export default function UltraProLandingPageBuilder() {
  // ==================== STATES ====================
  const [theme, setTheme] = useState<Theme>({
    primary: "#10b981", secondary: "#0f766e", background: "#ffffff",
    textColor: "#1e293b", headingColor: "#111827", accent: "#eab308", fontFamily: "Inter"
  });

  const {
    state: sections,
    set: setSections,
    undo,
    redo,
    canUndo,
    canRedo,
    reset
  } = useEditorHistory<PageSection[]>([]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  
  // Publish & Storage States
  const [isPublishing, setIsPublishing] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const { cart } = useCart();
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // ==================== AUTO SAVE & LOAD (LOCAL STORAGE) ====================
  useEffect(() => {
    setIsClient(true);
    const savedDraft = localStorage.getItem("probuilder_draft");
    if (savedDraft) {
      try {
        const { savedTheme, savedSections } = JSON.parse(savedDraft);
        if (savedTheme) setTheme(savedTheme);
        if (savedSections && savedSections.length > 0) {
           reset(savedSections);
        }
      } catch (error) {
        console.error("Error parsing local storage data", error);
      }
    }
  }, [reset]);

  useEffect(() => {
    if (!isClient) return;
    const timeout = setTimeout(() => {
      localStorage.setItem("probuilder_draft", JSON.stringify({
        savedTheme: theme,
        savedSections: sections
      }));
    }, 1000);
    return () => clearTimeout(timeout);
  }, [theme, sections, isClient]);

  // ==================== SECTION OPERATIONS ====================
  const updateContent = (id: string, newContent: any) => {
    setSections(prev => prev.map(sec => 
      sec.id === id ? { ...sec, content: { ...sec.content, ...newContent } } : sec
    ));
  };

  const toggleActive = (id: string) => {
    setSections(prev => prev.map(sec => 
      sec.id === id ? { ...sec, isActive: !sec.isActive } : sec
    ));
  };

  // ড্র্যাগ এন্ড ড্রপ লজিক (Dnd-Kit)
  const reorderSections = (activeId: string, overId: string) => {
    setSections((prev) => {
      const oldIndex = prev.findIndex((sec) => sec.id === activeId);
      const newIndex = prev.findIndex((sec) => sec.id === overId);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  const deleteSection = (id: string) => {
    setSections(prev => prev.filter(sec => sec.id !== id));
  };

  const duplicateSection = (id: string) => {
    setSections(prev => {
      const section = prev.find(s => s.id === id);
      if (!section) return prev;
      const newSec = { ...JSON.parse(JSON.stringify(section)), id: "dup_" + Date.now(), order: prev.length + 1 };
      return [...prev, newSec];
    });
  };

  const addSection = (type: SectionType, title: string) => {
    setSections(prev => {
      const newSection: PageSection = {
        id: "sec_" + Date.now(),
        type,
        title,
        isActive: true,
        order: prev.length + 1,
        content: {}
      };
      return [...prev, newSection];
    });
  };

  // ==================== PUBLISH LOGIC ====================
  const handlePublish = async () => {
    setIsPublishing(true);
    const pageData = {
      pageId: "my-landing-page",
      theme,
      sections,
      publishedAt: new Date().toISOString(),
    };

    try {
      // API Route এ পোস্ট রিকোয়েস্ট (আপনার ব্যাকএন্ড অনুযায়ী URL চেঞ্জ করে নিবেন)
      const response = await fetch("/api/pages/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pageData),
      });

      if (response.ok) {
        alert("🎉 Page published successfully!");
        // পাবলিশ হওয়ার পর চাইলে ড্রাফট মুছে ফেলতে পারেন:
        // localStorage.removeItem("probuilder_draft");
      } else {
        const data = await response.json();
        alert(`Error: ${data.message || "Failed to publish"}`);
      }
    } catch (error) {
      console.error("Publish error:", error);
      alert("Something went wrong while publishing. Check console.");
    } finally {
      setIsPublishing(false);
    }
  };

  const currentEditing = sections.find(s => s.id === editingId);

  // ==================== RENDER ====================
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white pb-20">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-900/95 p-4 flex justify-between items-center sticky top-0 z-40 shadow-md">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
          PROBUILDER
        </h1>
        
        <div className="flex gap-3 items-center">
          <div className="flex bg-gray-800 rounded-lg p-1 border border-gray-700">
            <Button onClick={undo} disabled={!canUndo} variant="ghost" size="sm" className="h-8 px-2 text-gray-400 hover:text-white disabled:opacity-30">
              <Undo size={16} />
            </Button>
            <div className="w-[1px] bg-gray-700 mx-1" />
            <Button onClick={redo} disabled={!canRedo} variant="ghost" size="sm" className="h-8 px-2 text-gray-400 hover:text-white disabled:opacity-30">
              <Redo size={16} />
            </Button>
          </div>
          
          <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)} className="border-gray-600 bg-gray-800/50 hover:bg-gray-700">
            <Eye size={16} className="mr-2"/> {showPreview ? "Hide Preview" : "Show Preview"}
          </Button>
          
          <Button 
            size="sm" 
            onClick={handlePublish}
            disabled={isPublishing}
            className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
          >
            {isPublishing ? "Publishing..." : "🚀 Publish"}
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 px-6 pt-6">
        {/* Sidebar */}
        <Sidebar 
          theme={theme} 
          setTheme={setTheme} 
          addSection={addSection} 
          cartLength={cart.length} 
          cartTotal={cartTotal} 
        />

        {/* Drag & Drop Section List */}
        <SectionList 
          sections={sections} 
          reorderSections={reorderSections} 
          toggleActive={toggleActive} 
          setEditingId={setEditingId} 
          duplicateSection={duplicateSection} 
          deleteSection={deleteSection} 
        />
      </div>

      {/* Live Preview */}
      {showPreview && (
        <div className="mt-16 px-6 relative">
           <div className="flex justify-center gap-2 mb-6 sticky top-20 z-30">
             <div className="bg-gray-800/90 backdrop-blur p-1.5 rounded-xl border border-gray-700 flex gap-1 shadow-xl">
               <Button variant={previewMode === "desktop" ? "secondary" : "ghost"} size="sm" onClick={() => setPreviewMode("desktop")} className={previewMode === "desktop" ? "bg-gray-700 text-white" : "text-gray-400"}>Desktop</Button>
               <Button variant={previewMode === "tablet" ? "secondary" : "ghost"} size="sm" onClick={() => setPreviewMode("tablet")} className={previewMode === "tablet" ? "bg-gray-700 text-white" : "text-gray-400"}>Tablet</Button>
               <Button variant={previewMode === "mobile" ? "secondary" : "ghost"} size="sm" onClick={() => setPreviewMode("mobile")} className={previewMode === "mobile" ? "bg-gray-700 text-white" : "text-gray-400"}>Mobile</Button>
             </div>
           </div>
           
           <LivePreview sections={sections} theme={theme} previewMode={previewMode} />
        </div>
      )}

      {/* Editor Modal */}
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