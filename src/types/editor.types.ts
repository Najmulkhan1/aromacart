export type SectionType =
  | "hero" | "products" | "comboOffer" | "features" | "testimonials"
  | "stats" | "about" | "gallery" | "faq" | "trustBadges" | "countdown"
  | "video" | "team" | "newsletter" | "pricing" | "cartPayment" | "cta" | "footer";

export interface Theme {
  primary: string;
  secondary: string;
  background: string;
  textColor: string;
  headingColor: string;
  accent: string;
  fontFamily: string;
}

export interface PageSection {
  id: string;
  type: SectionType;
  title: string;
  isActive: boolean;
  order: number;
  content: Record<string, any>;
}

export interface CartItem {
  id: string;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description?: string;
}

export interface OrderDetails {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  paymentMethod: string;
  notes: string;
}