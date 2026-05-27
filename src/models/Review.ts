import mongoose, { Schema, Document, Model } from "mongoose";

export interface IReview extends Document {
  product: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  userName: string;
  rating: number;         // 1–5
  comment: string;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true, index: true },
    user:    { type: Schema.Types.ObjectId, ref: "User",    required: true },
    userName:{ type: String, required: true },
    rating:  { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

// একজন user একটি product এ একবারের বেশি review দিতে পারবে না
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

const Review: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);

export default Review;
