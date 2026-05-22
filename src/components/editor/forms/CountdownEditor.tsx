import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LayoutIcon, Clock } from "lucide-react";

interface Props {
  content: any;
  updateContent: (newContent: any) => void;
}

export default function CountdownEditor({ content, updateContent }: Props) {
  return (
    <div className="space-y-6">
      {/* Section Header */}
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
              placeholder="e.g. Flash Sale! Limited Time Offer"
            />
          </div>
          <div>
            <Label className="text-sm font-semibold text-gray-700 block mb-1">Section Subtitle (Optional)</Label>
            <Input
              value={content?.sectionSubtitle || ""}
              onChange={e => updateContent({ sectionSubtitle: e.target.value })}
              placeholder="Grab your favorite products before the timer runs out."
            />
          </div>
        </div>
      </div>

      {/* Timer Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b">
          <Clock className="text-red-500" size={20} />
          <h3 className="font-semibold text-lg text-gray-800">Timer Settings</h3>
        </div>
        <div>
          <Label className="text-sm font-semibold text-gray-700 block mb-1">End Date & Time</Label>
          <Input
            type="datetime-local"
            value={content?.endDate || ""}
            onChange={e => updateContent({ endDate: e.target.value })}
            className="w-full"
          />
          <p className="text-xs text-gray-400 mt-2">
            Select the date and time when this offer will expire.
          </p>
        </div>
      </div>
    </div>
  );
}