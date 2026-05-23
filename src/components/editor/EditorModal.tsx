import React, { useState } from "react";
import { X, Type, Palette, Settings, TrendingUp, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageSection } from "@/types/editor.types";

// নতুন তৈরি করা ফর্ম কম্পোনেন্টগুলো ইমপোর্ট করা হলো
import HeroEditor from "./forms/HeroEditor";
import ProductsEditor from "./forms/ProductsEditor";
import CartPaymentEditor from "./forms/CartPaymentEditor";
import FaqEditor from "./forms/FaqEditor";
import GalleryEditor from "./forms/GalleryEditor";
import TestimonialEditor from "./forms/TestimonialEditor";
import CountdownEditor from "./forms/CountdownEditor";

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
              <p className="text-sm text-gray-500 mt-1 capitalize">Section Type: {currentEditing.type}</p>
            </div>
            <Button onClick={onClose} variant="ghost" size="icon" className="rounded-full">
              <X size={20} />
            </Button>
          </div>

          <div className="flex gap-2 mt-4">
            {/* Tab Buttons */}
            <Button
              variant={activeTab === "content" ? "default" : "outline"}
              onClick={() => setActiveTab("content")}
              className="flex items-center gap-2"
            >
              <Type size={16} /> Content
            </Button>
            <Button
              variant={activeTab === "design" ? "default" : "outline"}
              onClick={() => setActiveTab("design")}
              className="flex items-center gap-2"
            >
              <Palette size={16} /> Design
            </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="overflow-auto p-6 flex-1">
          {activeTab === "content" && (
            <>
              {/* কন্ডিশনাল রেন্ডারিং - সেকশন টাইপ অনুযায়ী ফর্ম দেখাবে */}
              {currentEditing.type === "hero" && (
                <HeroEditor content={currentEditing.content} updateContent={handleUpdate} />
              )}
              {currentEditing.type === "products" && (
                <ProductsEditor content={currentEditing.content} updateContent={handleUpdate} />
              )}
              {currentEditing.type === "cartPayment" && (
                <CartPaymentEditor content={currentEditing.content} updateContent={handleUpdate} />
              )}

              {/* যে সেকশনগুলোর এডিটর এখনো বানানো হয়নি, তাদের জন্য একটি মেসেজ */}

              {/* নতুন যুক্ত করা কম্পোনেন্টগুলো */}
              {currentEditing.type === "faq" && <FaqEditor content={currentEditing.content} updateContent={handleUpdate} />}
              {currentEditing.type === "gallery" && <GalleryEditor content={currentEditing.content} updateContent={handleUpdate} />}
              {currentEditing.type === "testimonials" && <TestimonialEditor content={currentEditing.content} updateContent={handleUpdate} />}
             {currentEditing.type === "countdown" && <CountdownEditor content={currentEditing.content} updateContent={handleUpdate} />}
              {!["hero", "products", "cartPayment", "faq", "gallery", "testimonials", "countdown"].includes(currentEditing.type) && (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Settings size={28} className="text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Coming Soon!</h3>
                  <p className="text-gray-500">Editor for the <span className="font-semibold text-gray-700 capitalize">{currentEditing.type}</span> section is under development.</p>
                </div>
              )}
            </>
          )}

          {activeTab === "design" && (
            <div className="text-center py-16 text-gray-500">
              <Palette size={48} className="mx-auto mb-4 opacity-20" />
              <p>Design settings for this section will be available soon.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t bg-white px-6 py-4 flex justify-end gap-3 mt-auto">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 text-white">
            <CheckCircle className="mr-2" size={16} /> Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}