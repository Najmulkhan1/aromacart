import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Type, Image as ImageIcon, Upload, LayoutIcon, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  content: any;
  updateContent: (newContent: any) => void;
}

export default function HeroEditor({ content, updateContent }: Props) {
  return (
    <div className="space-y-6">
      {/* Main Content */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b">
          <Type className="text-blue-600" size={20} />
          <h3 className="font-semibold text-lg text-gray-800">Main Content</h3>
        </div>
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-semibold text-gray-700 block mb-1">Heading</Label>
            <Input
              value={content?.heading || ""}
              onChange={e => updateContent({ heading: e.target.value })}
              className="w-full text-gray-600"
              placeholder="Enter main heading"
            />
          </div>
          <div>
            <Label className="text-sm font-semibold text-gray-700 block mb-1">Subheading</Label>
            <Textarea
            placeholder="Enter Your subheading"
              value={content?.subHeading || ""}
              onChange={e => updateContent({ subHeading: e.target.value })}
              className="w-full text-gray-600"
              rows={2}
            />
          </div>
          {/* CTA Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-semibold text-gray-700 block mb-1">Primary CTA Text</Label>
              <Input placeholder="Enter Your primary CTA text" className="text-gray-600" value={content?.ctaText || ""} onChange={e => updateContent({ ctaText: e.target.value })} />
            </div>
            <div>
              <Label className="text-sm font-semibold text-gray-700 block mb-1">Primary CTA Link</Label>
              <Input placeholder="Enter Your primary CTA link" className="text-gray-600" value={content?.ctaLink || ""} onChange={e => updateContent({ ctaLink: e.target.value })} />
            </div>
          </div>
        </div>
      </div>

      {/* Background Image Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b">
          <ImageIcon className="text-purple-600" size={20} />
          <h3 className="font-semibold text-lg text-gray-800">Background Image</h3>
        </div>
        <div>
          <Label className="text-sm font-semibold text-gray-700 block mb-1">Image URL</Label>
          <div className="flex gap-3">
            <Input
            placeholder="Enter Your Image URL"
              value={content?.bgImage || ""}
              onChange={e => updateContent({ bgImage: e.target.value })}
              className="flex-1 text-gray-600"
            />
            <Button variant="outline" className="shrink-0"><Upload size={16} className="mr-2" /> Upload</Button>
          </div>
        </div>
      </div>
    </div>
  );
}