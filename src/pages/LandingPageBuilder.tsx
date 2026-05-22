"use client";

import React, { useState,useEffect } from "react";
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


export default function UltraProLandingPageBuilder() {
  // Theme State
  const [theme, setTheme] = useState<Theme>({
    primary: "#10b981", secondary: "#0f766e", background: "#ffffff",
    textColor: "#1e293b", headingColor: "#111827", accent: "#eab308", fontFamily: "Inter"
  });
  const [isClient, setIsClient] = useState(false);

  // Editor History Hook (Replacing old sections & history useState)
  const {
    state: sections,
    set: setSections,
    undo,
    redo,
    canUndo,
    canRedo,
    reset
  } = useEditorHistory<PageSection[]>([
    // আপনার initial sections array এখানে দিতে পারেন
  ]);

  // 👉 ঠিক এখানে isPublishing স্টেটটি অ্যাড করবেন
  const [isPublishing, setIsPublishing] = useState(false);

  // UI States
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const { cart } = useCart();
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

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

  const moveSection = (index: number, dir: "up" | "down") => {
    setSections(prev => {
      const newSections = [...prev];
      if (dir === "up" && index > 0) {
        [newSections[index], newSections[index - 1]] = [newSections[index - 1], newSections[index]];
      } else if (dir === "down" && index < prev.length - 1) {
        [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
      }
      return newSections;
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
        content: {} // Default content will be handled by the forms
      };
      return [...prev, newSection];
    });
  };


  // ১. ইনিশিয়াল লোড: পেজ রিলোড দিলে Local Storage থেকে ডেটা আনবে
  useEffect(() => {
    setIsClient(true);
    const savedDraft = localStorage.getItem("probuilder_draft");
    
    if (savedDraft) {
      try {
        const { savedTheme, savedSections } = JSON.parse(savedDraft);
        if (savedTheme) setTheme(savedTheme);
        if (savedSections && savedSections.length > 0) {
           reset(savedSections); // useEditorHistory এর হিস্ট্রি ক্লিয়ার করে নতুন ডেটা বসাবে
        }
      } catch (error) {
        console.error("Error parsing local storage data", error);
      }
    }
  }, [reset]);

  // ২. অটো-সেভ: Theme বা Sections চেঞ্জ হলে ১ সেকেন্ড পর পর Local Storage আপডেট করবে
  useEffect(() => {
    if (!isClient) return; // সার্ভার সাইডে রেন্ডার হওয়া আটকাতে
    
    const timeout = setTimeout(() => {
      localStorage.setItem("probuilder_draft", JSON.stringify({
        savedTheme: theme,
        savedSections: sections
      }));
    }, 1000); // Debouncing: একনাগাড়ে টাইপ করলে যেন বারবার সেভ না হয়

    return () => clearTimeout(timeout);
  }, [theme, sections, isClient]);

  const currentEditing = sections.find(s => s.id === editingId);

  const handlePublish = async () => {
    setIsPublishing(true);
    
    const pageData = {
      pageId: "my-landing-page",
      theme: theme,
      sections: sections,
      publishedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch("/api/pages/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pageData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("🎉 Page published successfully!");
      } else {
        alert(`Error: ${data.message || "Failed to publish"}`);
      }
    } catch (error) {
      console.error("Publish error:", error);
      alert("Something went wrong while publishing.");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white pb-20">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-900/95 p-4 flex justify-between items-center sticky top-0 z-40">
        <h1 className="text-2xl font-bold text-emerald-400">PROBUILDER</h1>
        
        <div className="flex gap-2">
          {/* Undo / Redo Buttons */}
          <Button onClick={undo} disabled={!canUndo} variant="outline" size="sm" className="border-gray-600 disabled:opacity-50">
            <Undo className="mr-1" size={14} /> Undo
          </Button>
          <Button onClick={redo} disabled={!canRedo} variant="outline" size="sm" className="border-gray-600 disabled:opacity-50">
            <Redo className="mr-1" size={14} /> Redo
          </Button>
          
          <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)}>
            <Eye size={16} className="mr-2"/> Preview
          </Button>
          <Button 
            size="sm" 
            onClick={handlePublish}
            disabled={isPublishing}
            className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50"
          >
            {isPublishing ? "Publishing..." : "🚀 Publish"}
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 px-6 pt-6">
        {/* Modular Sidebar */}
        <Sidebar 
          theme={theme} 
          setTheme={setTheme} 
          addSection={addSection} 
          cartLength={cart.length} 
          cartTotal={cartTotal} 
        />

        {/* Modular Section List */}
        <SectionList 
          sections={sections} 
          moveSection={moveSection} 
          toggleActive={toggleActive} 
          setEditingId={setEditingId} 
          duplicateSection={duplicateSection} 
          deleteSection={deleteSection} 
        />
      </div>

      {/* Live Preview Wrapper */}
      {showPreview && (
        <div className="mt-12 px-6">
           <div className="flex justify-end gap-2 mb-4 max-w-7xl mx-auto">
             <Button variant={previewMode === "desktop" ? "default" : "outline"} size="sm" onClick={() => setPreviewMode("desktop")}>Desktop</Button>
             <Button variant={previewMode === "tablet" ? "default" : "outline"} size="sm" onClick={() => setPreviewMode("tablet")}>Tablet</Button>
             <Button variant={previewMode === "mobile" ? "default" : "outline"} size="sm" onClick={() => setPreviewMode("mobile")}>Mobile</Button>
           </div>
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