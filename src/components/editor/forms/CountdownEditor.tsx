import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LayoutIcon, Clock, Calendar } from "lucide-react"; // Calendar icon added

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
              className="text-gray-600"
              value={content?.sectionTitle || ""}
              onChange={e => updateContent({ sectionTitle: e.target.value })}
              placeholder="e.g. Flash Sale! Limited Time Offer"
            />
          </div>
          <div>
            <Label className="text-sm font-semibold text-gray-700 block mb-1">Section Subtitle (Optional)</Label>
            <Input
              className="text-gray-600"
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
          
          {/* Calendar Input Wrapper */}
          <div className="relative">
            <Input
              type="datetime-local"
              value={content?.endDate || ""}
              onChange={e => updateContent({ endDate: e.target.value })}
              className="w-full text-gray-600 cursor-pointer pl-10" // cursor-pointer and left padding for the icon
              onClick={(e) => {
                // Opens the calendar picker when clicking anywhere in the input
                if ('showPicker' in HTMLInputElement.prototype) {
                  (e.target as HTMLInputElement).showPicker();
                }
              }}
            />
            {/* Calendar icon displayed inside the input field */}
            <Calendar 
              size={18} 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" 
            />
          </div>
          
          <p className="text-xs text-gray-400 mt-2">
            Select the date and time when this offer will expire.
          </p>
        </div>
      </div>
    </div>
  );
}