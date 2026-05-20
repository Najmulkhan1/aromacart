"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageUpload from "@/components/admin/ImageUpload";

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ফর্মের সব রিয়েল স্টেট হ্যান্ডেল করা হচ্ছে
  const [formData, setFormData] = useState({
    nameEn: "",
    nameBn: "",
    slug: "",
    descriptionEn: "",
    descriptionBn: "",
    regularPrice: "",
    compareAtPrice: "",
    totalStock: "",
    brand: "AromaCart",
    scentFamily: "",
    topNotes: "",
    heartNotes: "",
    baseNotes: "",
    images: [] as string[],
    size30: false,
    price30: "",
    size50: false,
    price50: "",
    size100: false,
    price100: "",
  });

  // ইনপুট চেঞ্জ হ্যান্ডলার
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [id]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  // সিলেক্ট ড্রপডাউন হ্যান্ডলার
  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // রিয়েল ফর্ম সাবমিট ফাংশন
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // ভ্যালিডেশন চেক
    if (!formData.nameEn || !formData.nameBn || !formData.regularPrice || !formData.totalStock || !formData.scentFamily) {
      setError("Please fill in all required fields (*)");
      setLoading(false);
      return;
    }

    // সাইজ ভ্যারিয়েন্ট অ্যারে তৈরি করা
    const sizes = [];
    if (formData.size30 && formData.price30) sizes.push({ size: "30ml", price: Number(formData.price30) });
    if (formData.size50 && formData.price50) sizes.push({ size: "50ml", price: Number(formData.price50) });
    if (formData.size100 && formData.price100) sizes.push({ size: "100ml", price: Number(formData.price100) });

    // ব্যাকএন্ডে পাঠানোর জন্য অবজেক্ট স্ট্রাকচার তৈরি করা
    const payload = {
      nameEn: formData.nameEn,
      nameBn: formData.nameBn,
      slug: formData.slug || undefined, // খালি থাকলে ব্যাকএন্ড নিজে জেনারেট করবে
      descriptionEn: formData.descriptionEn,
      descriptionBn: formData.descriptionBn,
      images: formData.images,
      regularPrice: Number(formData.regularPrice),
      compareAtPrice: formData.compareAtPrice ? Number(formData.compareAtPrice) : undefined,
      totalStock: Number(formData.totalStock),
      brand: formData.brand,
      scentFamily: formData.scentFamily,
      scentNotes: {
        top: formData.topNotes,
        heart: formData.heartNotes,
        base: formData.baseNotes,
      },
      sizes: sizes,
      status: "Active", // সরাসরি একটিভ হিসেবে পাবলিশ করছি
    };

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      // সফলভাবে সেভ হলে প্রোডাক্ট লিস্ট পেজে রিডাইরেক্ট করবে
      router.push("/en/admin/products");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="rounded-xl" asChild type="button">
            <Link href="/en/admin/products">
              <ChevronLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Add New Product</h1>
            <p className="text-sm text-muted-foreground">Create a new fragrance for your store.</p>
          </div>
        </div>
        <div className="flex gap-4">
          {error && <p className="text-sm text-destructive self-center font-medium">{error}</p>}
          <Button variant="outline" className="rounded-xl" type="button" disabled={loading}>Save as Draft</Button>
          <Button className="rounded-xl px-6" type="submit" disabled={loading}>
            {loading ? "Publishing..." : "Publish Product"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Main Info */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* General Information Card */}
          <Card className="rounded-2xl border-border shadow-sm">
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              <CardDescription>Basic details about the perfume.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nameEn">Product Name (English) *</Label>
                  <Input id="nameEn" value={formData.nameEn} onChange={handleChange} placeholder="e.g. Oud Wood Intense" className="h-11 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nameBn">Product Name (Bengali) *</Label>
                  <Input id="nameBn" value={formData.nameBn} onChange={handleChange} placeholder="e.g. ওউড উড ইন্টেন্স" className="h-11 rounded-xl" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descriptionEn">Description (English)</Label>
                <Textarea id="descriptionEn" value={formData.descriptionEn} onChange={handleChange} placeholder="Write a detailed description..." className="min-h-[120px] rounded-xl resize-none" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descriptionBn">Description (Bengali)</Label>
                <Textarea id="descriptionBn" value={formData.descriptionBn} onChange={handleChange} placeholder="বাংলায় বিস্তারিত বিবরণ লিখুন..." className="min-h-[120px] rounded-xl resize-none" />
              </div>
            </CardContent>
          </Card>

          {/* Product Images Card (নতুন যুক্ত করা হলো) */}
          <Card className="rounded-2xl border-border shadow-sm">
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
              <CardDescription>Upload high-quality images of the fragrance.</CardDescription>
            </CardHeader>
            <CardContent>
              <ImageUpload 
                value={formData.images} 
                onChange={(url) => setFormData(prev => ({ ...prev, images: [...prev.images, url] }))} 
                onRemove={(url) => setFormData(prev => ({ ...prev, images: prev.images.filter(img => img !== url) }))} 
              />
            </CardContent>
          </Card>

          {/* Pricing & Stock Card */}
          <Card className="rounded-2xl border-border shadow-sm">
            <CardHeader>
              <CardTitle>Pricing & Inventory</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="regularPrice">Regular Price (৳) *</Label>
                  <Input id="regularPrice" type="number" value={formData.regularPrice} onChange={handleChange} placeholder="0.00" className="h-11 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="compareAtPrice">Compare-at Price (৳)</Label>
                  <Input id="compareAtPrice" type="number" value={formData.compareAtPrice} onChange={handleChange} placeholder="0.00" className="h-11 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalStock">Total Stock *</Label>
                  <Input id="totalStock" type="number" value={formData.totalStock} onChange={handleChange} placeholder="0" className="h-11 rounded-xl" />
                </div>
              </div>

              {/* Size Variants */}
              <div className="p-4 bg-secondary/30 rounded-xl border border-border">
                <Label className="block mb-4 font-semibold text-base">Size Variants</Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Input type="checkbox" checked={formData.size30} onChange={handleChange} className="w-4 h-4 accent-primary" id="size30" />
                    <Label htmlFor="size30" className="font-normal">30ml</Label>
                    <Input type="number" id="price30" value={formData.price30} onChange={handleChange} placeholder="Price" className="h-8 text-sm w-24 ml-auto rounded-lg" disabled={!formData.size30} />
                  </div>
                  <div className="flex items-center gap-2">
                    <Input type="checkbox" checked={formData.size50} onChange={handleChange} className="w-4 h-4 accent-primary" id="size50" />
                    <Label htmlFor="size50" className="font-normal">50ml</Label>
                    <Input type="number" id="price50" value={formData.price50} onChange={handleChange} placeholder="Price" className="h-8 text-sm w-24 ml-auto rounded-lg" disabled={!formData.size50} />
                  </div>
                  <div className="flex items-center gap-2">
                    <Input type="checkbox" checked={formData.size100} onChange={handleChange} className="w-4 h-4 accent-primary" id="size100" />
                    <Label htmlFor="size100" className="font-normal">100ml</Label>
                    <Input type="number" id="price100" value={formData.price100} onChange={handleChange} placeholder="Price" className="h-8 text-sm w-24 ml-auto rounded-lg" disabled={!formData.size100} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
        </div>

        {/* Right Column: Organization & Notes */}
        <div className="space-y-6">
          <Card className="rounded-2xl border-border shadow-sm">
            <CardHeader>
              <CardTitle>Organization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Scent Family *</Label>
                <Select onValueChange={(value) => handleSelectChange("scentFamily", value as string)}>
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue placeholder="Select family" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Woody">Woody</SelectItem>
                    <SelectItem value="Floral">Floral</SelectItem>
                    <SelectItem value="Oriental">Oriental</SelectItem>
                    <SelectItem value="Fresh">Fresh</SelectItem>
                    <SelectItem value="Citrus">Citrus</SelectItem>
                    <SelectItem value="Spicy">Spicy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Input id="brand" value={formData.brand} onChange={handleChange} placeholder="e.g. Tom Ford" className="h-11 rounded-xl" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border shadow-sm">
            <CardHeader>
              <CardTitle>Scent Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="topNotes">Top Notes</Label>
                <Input id="topNotes" value={formData.topNotes} onChange={handleChange} placeholder="e.g. Bergamot, Lemon" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heartNotes">Heart Notes</Label>
                <Input id="heartNotes" value={formData.heartNotes} onChange={handleChange} placeholder="e.g. Rose, Jasmine" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="baseNotes">Base Notes</Label>
                <Input id="baseNotes" value={formData.baseNotes} onChange={handleChange} placeholder="e.g. Vanilla, Amber" className="rounded-xl" />
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </form>
  );
}