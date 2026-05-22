import { Schema, model, models } from "mongoose";

const SiteSettingsSchema = new Schema({
  hero: {
    title: { type: String, default: "Discover Your Signature Scent" },
    subtitle: { type: String, default: "Luxury Perfumes Collection" },
    imageUrl: { type: String, default: "/hero-bg.jpg" },
    buttonText: { type: String, default: "Shop Now" }
  },
  announcement: {
    isActive: { type: Boolean, default: true },
    text: { type: String, default: "Free shipping on orders over ৳5000" }
  }
});

const SiteSettings = models.SiteSettings || model("SiteSettings", SiteSettingsSchema);
export default SiteSettings;