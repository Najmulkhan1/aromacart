import React, { useState } from "react";
import { X, Type, Palette, Settings, TrendingUp, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageSection } from "@/types/editor.types";
import HeroEditor from "./forms/HeroEditor";
// import ProductsEditor from "./forms/ProductsEditor";

interface Props {
  currentEditing: PageSection;
  onClose: () => void;
  updateContent: (id: string, newContent: any) => void;
}

export default function EditorModal({ currentEditing, onClose, updateContent }: Props) {
  const [activeTab, setActiveTab] = useState<"content" | "design" | "advanced" | "seo">("content");

  const handleUpdate = (newContent: any) => {
    updateContent(currentEditing.id, newContent);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 overflow-auto">
      <div className="bg-gray-50 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header & Tabs */}
        <div className="bg-white border-b px-6 py-5 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Edit {currentEditing.title}</h2>
            </div>
            <Button onClick={onClose} variant="ghost" size="icon" className="rounded-full"><X size={20} /></Button>
          </div>
          
          <div className="flex gap-1 mt-4">
             {/* Tab Buttons (Content, Design, Advanced, SEO) */}
             <Button variant={activeTab === "content" ? "default" : "outline"} onClick={() => setActiveTab("content")}>Content</Button>
             <Button variant={activeTab === "design" ? "default" : "outline"} onClick={() => setActiveTab("design")}>Design</Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="overflow-auto p-6 flex-1">
          {activeTab === "content" && (
            <>
              {currentEditing.type === "hero" && <HeroEditor content={currentEditing.content} updateContent={handleUpdate} />}
              {/* Add other forms here like ProductsEditor */}
            </>
          )}
          {activeTab === "design" && <p>Design settings here...</p>}
        </div>

        {/* Footer */}
        <div className="border-t bg-white px-6 py-4 flex justify-end gap-3 mt-auto">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700">
            <CheckCircle className="mr-2" size={16} /> Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}