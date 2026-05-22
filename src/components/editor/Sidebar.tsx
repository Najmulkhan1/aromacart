import React from "react";
import { Palette, Plus, ShoppingCart } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Theme, SectionType } from "@/types/editor.types";

interface Props {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  addSection: (type: SectionType, title: string) => void;
  cartLength: number;
  cartTotal: number;
}

export default function Sidebar({ theme, setTheme, addSection, cartLength, cartTotal }: Props) {
  const sectionTypes = ["hero", "products", "cartPayment", "features", "testimonials", "gallery", "faq", "countdown"];

  return (
    <div className="col-span-12 lg:col-span-4 space-y-6">
      {/* Theme Customizer */}
      <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-6 border border-gray-700">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Palette className="text-emerald-400" size={18} /> Theme Customizer
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(theme).map(([key, value]) => {
            if (key === "fontFamily") return null;
            return (
              <div key={key}>
                <Label className="text-xs uppercase tracking-wider mb-1 block text-gray-400">{key}</Label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={value as string}
                    onChange={(e) => setTheme(t => ({ ...t, [key]: e.target.value }))}
                    className="w-10 h-8 rounded cursor-pointer border-0 bg-transparent"
                  />
                  <Input
                    value={value as string}
                    onChange={(e) => setTheme(t => ({ ...t, [key]: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-white text-xs h-8 px-2"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Sections */}
      <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-6 border border-gray-700">
        <h2 className="text-lg font-bold mb-4">Add New Section</h2>
        <div className="grid grid-cols-2 gap-2">
          {sectionTypes.map(t => (
            <Button
              key={t}
              variant="outline"
              size="sm"
              className="border-gray-600 hover:border-emerald-400 capitalize text-sm bg-transparent hover:bg-gray-700"
              onClick={() => addSection(t as SectionType, t)}
            >
              <Plus size={12} className="mr-1" /> {t}
            </Button>
          ))}
        </div>
      </div>

      {/* Cart Summary */}
      {cartLength > 0 && (
        <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl p-4 border border-emerald-400/30">
          <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm text-white">
            <ShoppingCart size={14} /> Current Cart
          </h3>
          <p className="text-xl font-bold text-emerald-400">৳{cartTotal}</p>
          <p className="text-xs text-gray-300">{cartLength} items</p>
        </div>
      )}
    </div>
  );
}