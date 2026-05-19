import mongoose, { Schema, Document, Model } from "mongoose";

// ১. সাইজ ভ্যারিয়েন্টের টাইপ ডিফাইন করছি
interface ISizeVariant {
  size: "30ml" | "50ml" | "100ml";
  price: number;
}

// ২. মেইন প্রোডাক্ট ডকুমেন্টের ইন্টারফেস তৈরি করছি (TypeScript-এর সুরক্ষার জন্য)
export interface IProduct extends Document {
  nameEn: string;
  nameBn: string;
  slug: string;
  descriptionEn?: string;
  descriptionBn?: string;
  regularPrice: number;
  compareAtPrice?: number;
  totalStock: number;
  images: string[];
  brand?: string;
  scentFamily: "Woody" | "Floral" | "Oriental" | "Fresh" | "Citrus" | "Spicy";
  scentNotes: {
    top?: string;
    heart?: string;
    base?: string;
  };
  sizes: ISizeVariant[];
  isFeatured: boolean;
  status: "Active" | "Draft" | "Out of Stock" | "Low Stock";
  createdAt: Date;
  updatedAt: Date;
}

// ৩. Mongoose Schema ডিজাইন
const ProductSchema: Schema<IProduct> = new Schema(
  {
    nameEn: { type: String, required: true, trim: true },
    nameBn: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    descriptionEn: { type: String },
    descriptionBn: { type: String },
    regularPrice: { type: Number, required: true, min: 0 },
    compareAtPrice: { type: Number, min: 0 },
    totalStock: { type: Number, required: true, min: 0, default: 0 },
    images: { type: [String], default: [] },
    brand: { type: String, default: "AromaCart" },
    scentFamily: {
      type: String,
      required: true,
      enum: ["Woody", "Floral", "Oriental", "Fresh", "Citrus", "Spicy"],
    },
    scentNotes: {
      top: { type: String, trim: true },
      heart: { type: String, trim: true },
      base: { type: String, trim: true },
    },
    sizes: [
      {
        size: { type: String, enum: ["30ml", "50ml", "100ml"], required: true },
        price: { type: Number, required: true, min: 0 },
      },
    ],
    isFeatured: { type: Boolean, default: false },
    status: {
      type: String,
      required: true,
      enum: ["Active", "Draft", "Out of Stock", "Low Stock"],
      default: "Draft",
    },
  },
  {
    timestamps: true, // এটি অটোমেটিক createdAt এবং updatedAt হ্যান্ডেল করবে
  }
);

// ৪. Next.js-এর হট রিলোডিংয়ের সময় মডেল ডুপ্লিকেশন রোধ করার মেকানিজম
const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;