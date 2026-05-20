import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false, // গেস্ট ইউজার চেকআউট করলে এটি অপশনাল হতে পারে
  },
  items: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      size: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    }
  ],
  totalAmount: { type: Number, required: true },
  customerDetails: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    email: { type: String, required: false },
    division: { type: String, required: false },
    upazila: { type: String, required: false },
    note: { type: String, required: false },
  },
  paymentMethod: { type: String, enum: ["cod", "bkash", "nagad"], default: "cod" },
  transactionDetails: {
    transactionId: { type: String },
    senderNumber: { type: String },
  },
  status: { 
    type: String, 
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"], 
    default: "Pending" 
  },
  paymentStatus: {
    type: String,
    enum: ["Unpaid", "Paid"],
    default: "Unpaid"
  },
  createdAt: { type: Date, default: Date.now },
});

const Order = models.Order || model("Order", OrderSchema);

export default Order;