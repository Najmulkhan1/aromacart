import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LayoutIcon, Image as ImageIcon, Plus, Trash2 } from "lucide-react";

interface Props {
  content: any;
  updateContent: (newContent: any) => void;
}

export default function GalleryEditor({ content, updateContent }: Props) {
  const addImage = () => {
    const newImages = [
      ...(content?.images || []),
      { id: Date.now(), url: "", caption: "New Image" }
    ];
    updateContent({ images: newImages });
  };

  const updateImage = (index: number, key: string, value: string) => {
    const newImages = [...content.images];
    newImages[index] = { ...newImages[index], [key]: value };
    updateContent({ images: newImages });
  };

  const removeImage = (index: number) => {
    const newImages = content.images.filter((_: any, i: number) => i !== index);
    updateContent({ images: newImages });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b">
          <LayoutIcon className="text-blue-600" size={20} />
          <h3 className="font-semibold text-lg text-gray-800">Gallery Details</h3>
        </div>
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-semibold text-gray-700 block mb-1">Section Title</Label>
            <Input
              value={content?.sectionTitle || ""}
              onChange={e => updateContent({ sectionTitle: e.target.value })}
              placeholder="Our Photo Gallery"
            />
          </div>
          <div>
            <Label className="text-sm font-semibold text-gray-700 block mb-1">Columns (Desktop)</Label>
            <select 
              className="w-full p-2 border rounded-md"
              value={content?.columns || "3"}
              onChange={e => updateContent({ columns: e.target.value })}
            >
              <option value="2">2 Columns</option>
              <option value="3">3 Columns</option>
              <option value="4">4 Columns</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4 pb-2 border-b">
          <div className="flex items-center gap-2">
            <ImageIcon size={20} className="text-purple-600" />
            <h3 className="font-semibold text-lg text-gray-800">Images</h3>
          </div>
          <Button onClick={addImage} size="sm">
            <Plus size={14} className="mr-1" /> Add Image
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2">
          {content?.images?.map((img: any, i: number) => (
            <div key={img.id || i} className="border rounded-lg p-3 bg-gray-50 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-gray-500">Image {i + 1}</span>
                <Button variant="ghost" size="sm" onClick={() => removeImage(i)} className="h-6 w-6 p-0 text-red-500">
                  <Trash2 size={14} />
                </Button>
              </div>
              
              {img.url ? (
                <img src={img.url} alt="preview" className="w-full h-24 object-cover rounded border" />
              ) : (
                <div className="w-full h-24 bg-gray-200 rounded border flex items-center justify-center text-xs text-gray-400">No Image</div>
              )}

              <div>
                <Label className="text-[10px] text-gray-500">Image URL</Label>
                <Input value={img.url} onChange={e => updateImage(i, 'url', e.target.value)} className="h-7 text-xs" />
              </div>
              <div>
                <Label className="text-[10px] text-gray-500">Caption (Optional)</Label>
                <Input value={img.caption} onChange={e => updateImage(i, 'caption', e.target.value)} className="h-7 text-xs" />
              </div>
            </div>
          ))}
        </div>
        {(!content?.images || content.images.length === 0) && (
          <div className="text-center py-8 text-gray-400 border rounded-lg mt-4 border-dashed">
            <p>No images in gallery.</p>
          </div>
        )}
      </div>
    </div>
  );
}