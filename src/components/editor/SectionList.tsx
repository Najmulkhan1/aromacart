import React from "react";
import { MoveUp, MoveDown, Edit3, Trash2, Copy } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { PageSection } from "@/types/editor.types";

interface Props {
  sections: PageSection[];
  moveSection: (index: number, dir: "up" | "down") => void;
  toggleActive: (id: string) => void;
  setEditingId: (id: string) => void;
  duplicateSection: (id: string) => void;
  deleteSection: (id: string) => void;
}

export default function SectionList({
  sections, moveSection, toggleActive, setEditingId, duplicateSection, deleteSection
}: Props) {
  return (
    <div className="col-span-12 lg:col-span-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Page Structure</h2>
        <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-full">
          {sections.length} sections
        </span>
      </div>

      <div className="space-y-3">
        {sections.map((section, idx) => (
          <div key={section.id} className="group bg-gray-800/80 border border-gray-700 rounded-xl p-4 flex items-center gap-4 hover:border-emerald-500 transition-all shadow-sm">
            <div className="flex flex-col gap-1">
              <button onClick={() => moveSection(idx, "up")} disabled={idx === 0} className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white disabled:opacity-30">
                <MoveUp size={14} />
              </button>
              <button onClick={() => moveSection(idx, "down")} disabled={idx === sections.length - 1} className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white disabled:opacity-30">
                <MoveDown size={14} />
              </button>
            </div>

            <div className="flex-1">
              <div className="font-semibold capitalize text-sm text-white">{section.title}</div>
              <div className="text-xs text-gray-400 capitalize">{section.type}</div>
            </div>

            <Switch checked={section.isActive} onCheckedChange={() => toggleActive(section.id)} />

            <div className="flex gap-2">
              <Button onClick={() => setEditingId(section.id)} variant="secondary" size="sm" className="bg-gray-700 hover:bg-gray-600 text-xs">
                <Edit3 className="mr-1" size={12} /> Edit
              </Button>
              <Button variant="ghost" size="sm" onClick={() => duplicateSection(section.id)} className="text-xs text-gray-300 hover:text-white">
                <Copy size={14} />
              </Button>
              <Button variant="destructive" size="sm" onClick={() => deleteSection(section.id)}>
                <Trash2 size={14} />
              </Button>
            </div>
          </div>
        ))}
        {sections.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-gray-700 rounded-xl text-gray-500">
            No sections added yet. Use the sidebar to add a new section.
          </div>
        )}
      </div>
    </div>
  );
}