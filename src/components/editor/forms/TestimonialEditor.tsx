import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LayoutIcon, Users, Plus, Trash2, Star } from "lucide-react";

interface Props {
  content: any;
  updateContent: (newContent: any) => void;
}

export default function TestimonialEditor({ content, updateContent }: Props) {
  const addTestimonial = () => {
    const newTestimonials = [
      ...(content?.testimonials || []),
      { id: Date.now(), name: "John Doe", role: "Customer", message: "Great service!", rating: 5, avatar: "" }
    ];
    updateContent({ testimonials: newTestimonials });
  };

  const updateTestimonial = (index: number, key: string, value: any) => {
    const newTestimonials = [...content.testimonials];
    newTestimonials[index] = { ...newTestimonials[index], [key]: value };
    updateContent({ testimonials: newTestimonials });
  };

  const removeTestimonial = (index: number) => {
    const newTestimonials = content.testimonials.filter((_: any, i: number) => i !== index);
    updateContent({ testimonials: newTestimonials });
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
              placeholder="What Our Customers Say"
            />
          </div>
          <div>
            <Label className="text-sm font-semibold text-gray-700 block mb-1">Section Subtitle</Label>
            <Input
              value={content?.sectionSubtitle || ""}
              onChange={e => updateContent({ sectionSubtitle: e.target.value })}
              placeholder="Real reviews from real people"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4 pb-2 border-b">
          <div className="flex items-center gap-2">
            <Users size={20} className="text-yellow-600" />
            <h3 className="font-semibold text-lg text-gray-800">Reviews</h3>
          </div>
          <Button onClick={addTestimonial} size="sm">
            <Plus size={14} className="mr-1" /> Add Review
          </Button>
        </div>

        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {content?.testimonials?.map((testi: any, i: number) => (
            <div key={testi.id || i} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-start mb-3">
                <span className="font-medium text-gray-700 text-sm">Review {i + 1}</span>
                <Button variant="destructive" size="sm" onClick={() => removeTestimonial(i)}>
                  <Trash2 size={14} />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <Label className="text-xs text-gray-500">Customer Name</Label>
                  <Input value={testi.name} onChange={e => updateTestimonial(i, 'name', e.target.value)} />
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Role / Location</Label>
                  <Input value={testi.role} onChange={e => updateTestimonial(i, 'role', e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <Label className="text-xs text-gray-500">Avatar URL (Optional)</Label>
                  <Input value={testi.avatar} onChange={e => updateTestimonial(i, 'avatar', e.target.value)} />
                </div>
                <div>
                  <Label className="text-xs text-gray-500 flex items-center gap-1"><Star size={12}/> Rating (1-5)</Label>
                  <Input type="number" min="1" max="5" value={testi.rating} onChange={e => updateTestimonial(i, 'rating', parseInt(e.target.value))} />
                </div>
              </div>
              <div>
                <Label className="text-xs text-gray-500">Review Message</Label>
                <Textarea 
                  value={testi.message} 
                  onChange={e => updateTestimonial(i, 'message', e.target.value)} 
                  rows={2} 
                />
              </div>
            </div>
          ))}
          {(!content?.testimonials || content.testimonials.length === 0) && (
            <div className="text-center py-8 text-gray-400 border rounded-lg border-dashed mt-2">
              <p>No testimonials added yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}