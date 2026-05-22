import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LayoutIcon, Box, Plus, Trash2 } from "lucide-react";

interface Props {
  content: any;
  updateContent: (newContent: any) => void;
}

export default function ProductsEditor({ content, updateContent }: Props) {
  const addProduct = () => {
    const newProducts = [
      ...(content?.products || []),
      { id: Date.now(), name: "New Product", price: 999, oldPrice: 1299, image: "", description: "", rating: 0, reviews: 0, inStock: true }
    ];
    updateContent({ products: newProducts });
  };

  const updateProduct = (index: number, key: string, value: any) => {
    const newProducts = [...content.products];
    newProducts[index] = { ...newProducts[index], [key]: value };
    updateContent({ products: newProducts });
  };

  const removeProduct = (index: number) => {
    const newProducts = content.products.filter((_: any, i: number) => i !== index);
    updateContent({ products: newProducts });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b">
          <LayoutIcon className="text-blue-600" size={20} />
          <h3 className="font-semibold text-lg text-gray-800">Section Header</h3>
        </div>
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-semibold text-gray-700 block mb-1">Section Title</Label>
            <Input
              value={content?.sectionTitle || ""}
              onChange={e => updateContent({ sectionTitle: e.target.value })}
              placeholder="Featured Products"
            />
          </div>
          <div>
            <Label className="text-sm font-semibold text-gray-700 block mb-1">Section Subtitle</Label>
            <Input
              value={content?.sectionSubtitle || ""}
              onChange={e => updateContent({ sectionSubtitle: e.target.value })}
              placeholder="Best quality products for you"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4 pb-2 border-b">
          <div className="flex items-center gap-2">
            <Box size={20} className="text-green-600" />
            <h3 className="font-semibold text-lg text-gray-800">Products List</h3>
          </div>
          <Button onClick={addProduct} size="sm">
            <Plus size={14} className="mr-1" /> Add Product
          </Button>
        </div>

        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {content?.products?.map((p: any, i: number) => (
            <div key={p.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-gray-50">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium text-gray-800">Product {i + 1}</h4>
                <Button variant="destructive" size="sm" onClick={() => removeProduct(i)}>
                  <Trash2 size={14} />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-gray-500">Name</Label>
                  <Input value={p.name} onChange={e => updateProduct(i, 'name', e.target.value)} className="text-sm" />
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Price (BDT)</Label>
                  <Input type="number" value={p.price} onChange={e => updateProduct(i, 'price', parseInt(e.target.value) || 0)} className="text-sm" />
                </div>
                <div className="col-span-2">
                  <Label className="text-xs text-gray-500">Image URL</Label>
                  <Input value={p.image} onChange={e => updateProduct(i, 'image', e.target.value)} className="text-sm" />
                </div>
              </div>
            </div>
          ))}
          {(!content?.products || content.products.length === 0) && (
            <div className="text-center py-8 text-gray-400">
              <p>No products added yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}