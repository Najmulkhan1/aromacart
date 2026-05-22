import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LayoutIcon, MessageCircle, Plus, Trash2 } from "lucide-react";

interface Props {
  content: any;
  updateContent: (newContent: any) => void;
}

export default function FaqEditor({ content, updateContent }: Props) {
  const addFaq = () => {
    const newFaqs = [
      ...(content?.faqs || []),
      { id: Date.now(), question: "নতুন প্রশ্ন?", answer: "এখানে উত্তর লিখুন..." }
    ];
    updateContent({ faqs: newFaqs });
  };

  const updateFaq = (index: number, key: string, value: string) => {
    const newFaqs = [...content.faqs];
    newFaqs[index] = { ...newFaqs[index], [key]: value };
    updateContent({ faqs: newFaqs });
  };

  const removeFaq = (index: number) => {
    const newFaqs = content.faqs.filter((_: any, i: number) => i !== index);
    updateContent({ faqs: newFaqs });
  };

  return (
    <div className="space-y-6">
      {/* Section Header Settings */}
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
              placeholder="Frequently Asked Questions"
            />
          </div>
          <div>
            <Label className="text-sm font-semibold text-gray-700 block mb-1">Section Subtitle</Label>
            <Input
              value={content?.sectionSubtitle || ""}
              onChange={e => updateContent({ sectionSubtitle: e.target.value })}
              placeholder="আপনার সাধারণ প্রশ্নের উত্তরগুলো এখানে দেওয়া হলো"
            />
          </div>
        </div>
      </div>

      {/* FAQ Items List */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4 pb-2 border-b">
          <div className="flex items-center gap-2">
            <MessageCircle size={20} className="text-green-600" />
            <h3 className="font-semibold text-lg text-gray-800">Questions & Answers</h3>
          </div>
          <Button onClick={addFaq} size="sm">
            <Plus size={14} className="mr-1" /> Add FAQ
          </Button>
        </div>

        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {content?.faqs?.map((faq: any, i: number) => (
            <div key={faq.id || i} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-start mb-3">
                <span className="font-medium text-gray-700 text-sm">FAQ {i + 1}</span>
                <Button variant="destructive" size="sm" onClick={() => removeFaq(i)}>
                  <Trash2 size={14} />
                </Button>
              </div>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-gray-500">Question</Label>
                  <Input 
                    value={faq.question} 
                    onChange={e => updateFaq(i, 'question', e.target.value)} 
                    placeholder="e.g., How long does delivery take?" 
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Answer</Label>
                  <Textarea 
                    value={faq.answer} 
                    onChange={e => updateFaq(i, 'answer', e.target.value)} 
                    rows={3} 
                    placeholder="Write the answer here..." 
                  />
                </div>
              </div>
            </div>
          ))}
          {(!content?.faqs || content.faqs.length === 0) && (
            <div className="text-center py-8 text-gray-400">
              <p>No FAQs added yet. Click "Add FAQ" to start.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}