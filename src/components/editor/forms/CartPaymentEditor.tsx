import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CreditCard, Truck } from "lucide-react";

interface Props {
  content: any;
  updateContent: (newContent: any) => void;
}

export default function CartPaymentEditor({ content, updateContent }: Props) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b">
          <CreditCard className="text-blue-600" size={20} />
          <h3 className="font-semibold text-lg text-gray-800">Payment Methods</h3>
        </div>
        <div>
          <Label className="text-sm font-semibold text-gray-700 block mb-1">Payment Methods (one per line)</Label>
          <Textarea
            value={content?.methods?.join("\n") || ""}
            onChange={e => updateContent({ methods: e.target.value.split("\n").filter(Boolean) })}
            rows={4}
            className="font-mono text-sm text-gray-600"
            placeholder="Cash on Delivery&#10;bKash&#10;Nagad"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b">
          <Truck className="text-green-600" size={20} />
          <h3 className="font-semibold text-lg text-gray-800">Delivery Settings</h3>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-semibold text-gray-700 block mb-1">Delivery Charge (BDT)</Label>
              <Input
                type="number"
                className="text-gray-600"
                value={content?.deliveryCharge ?? 60}
                onChange={e => updateContent({ deliveryCharge: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <Label className="text-sm font-semibold text-gray-700 block mb-1">Free Delivery Over (BDT)</Label>
              <Input
                type="number"
                className="text-gray-600"
                value={content?.freeDeliveryOver ?? 2000}
                onChange={e => updateContent({ freeDeliveryOver: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>
          <div>
            <Label className="text-sm font-semibold text-gray-700 block mb-1">Tax Rate (%)</Label>
            <Input
              type="number"
              step="0.5"
              className="text-gray-600"
              value={content?.taxRate ?? 5}
              onChange={e => updateContent({ taxRate: parseFloat(e.target.value) || 0 })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}