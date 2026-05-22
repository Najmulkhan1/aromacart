import React from "react";
import { Edit3, Trash2, Copy, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageSection } from "@/types/editor.types";

// dnd-kit imports
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Switch } from "../ui/switch";

// --- আলাদা একটি Sortable Item কম্পোনেন্ট ---
interface SortableItemProps {
  section: PageSection;
  toggleActive: (id: string) => void;
  setEditingId: (id: string) => void;
  duplicateSection: (id: string) => void;
  deleteSection: (id: string) => void;
}

function SortableSectionItem({ section, toggleActive, setEditingId, duplicateSection, deleteSection }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group bg-gray-800/80 border ${isDragging ? "border-emerald-500 shadow-xl" : "border-gray-700"} rounded-xl p-4 flex items-center gap-4 hover:border-emerald-500 transition-all shadow-sm`}
    >
      {/* Drag Handle: এই আইকনে ধরে ড্র্যাগ করতে হবে */}
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-gray-500 hover:text-emerald-400 p-1">
        <GripVertical size={20} />
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
  );
}


// --- মেইন SectionList কম্পোনেন্ট ---
interface Props {
  sections: PageSection[];
  reorderSections: (activeId: string, overId: string) => void; // moveSection এর বদলে
  toggleActive: (id: string) => void;
  setEditingId: (id: string) => void;
  duplicateSection: (id: string) => void;
  deleteSection: (id: string) => void;
}

export default function SectionList({
  sections, reorderSections, toggleActive, setEditingId, duplicateSection, deleteSection
}: Props) {
  
  // ড্র্যাগ ইভেন্ট সেন্সর (মাউস এবং কীবোর্ড)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // ড্র্যাগ শেষ হলে কী হবে
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorderSections(active.id as string, over.id as string);
    }
  };

  return (
    <div className="col-span-12 lg:col-span-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Page Structure</h2>
        <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-full">
          {sections.length} sections
        </span>
      </div>

      {/* Dnd-Kit Context */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="space-y-3">
          <SortableContext items={sections.map(s => s.id)} strategy={verticalListSortingStrategy}>
            {sections.map((section) => (
              <SortableSectionItem
                key={section.id}
                section={section}
                toggleActive={toggleActive}
                setEditingId={setEditingId}
                duplicateSection={duplicateSection}
                deleteSection={deleteSection}
              />
            ))}
          </SortableContext>

          {sections.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed border-gray-700 rounded-xl text-gray-500">
              No sections added yet. Use the sidebar to add a new section.
            </div>
          )}
        </div>
      </DndContext>
    </div>
  );
}