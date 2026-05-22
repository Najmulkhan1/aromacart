// "use client";

import UltraProLandingPageBuilder from "@/pages/LandingPageBuilder";

// import React, { useState, useCallback, useEffect } from "react";
// import {
//   Layout, Eye, Save, MoveUp, MoveDown, Plus, Trash2, Palette, Edit3, Undo, Redo,
//   Download, Copy, ShoppingCart, CreditCard, Star, Clock, Users, Award, Play, Image as ImageIcon,
//   Minus, Plus as PlusIcon, X, Truck, ShieldCheck, Banknote, Gift, Coffee, Sparkles,
//   Zap, Heart, Shield, Award as AwardIcon, CheckCircle, AlertCircle, Info, ChevronRight,
//   Phone, Mail, MapPin, Calendar, FileText, Settings, Sliders, Type, Image, Layout as LayoutIcon,
//   Upload, Link2, AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline, Hash,
//   TrendingUp, Tag, Percent, Box, Layers, EyeOff, EyeOff as EyeOffIcon, Grid, List,
//   MessageCircle, ThumbsUp, Facebook, Twitter, Instagram, Youtube, Linkedin,
//   Moon, Sun, Monitor, Smartphone, Tablet, Maximize2, Minimize2
// } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";

// // ==================== TYPES ====================
// type SectionType =
//   | "hero" | "products" | "comboOffer" | "features" | "testimonials"
//   | "stats" | "about" | "gallery" | "faq" | "trustBadges" | "countdown"
//   | "video" | "team" | "newsletter" | "pricing" | "cartPayment" | "cta" | "footer";

// interface Theme {
//   primary: string;
//   secondary: string;
//   background: string;
//   textColor: string;
//   headingColor: string;
//   accent: string;
//   fontFamily: string;
// }

// interface PageSection {
//   id: string;
//   type: SectionType;
//   title: string;
//   isActive: boolean;
//   order: number;
//   content: Record<string, any>;
// }

// interface CartItem {
//   id: string;
//   productId: number;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string;
//   description?: string;
// }

// interface OrderDetails {
//   name: string;
//   phone: string;
//   email: string;
//   address: string;
//   city: string;
//   paymentMethod: string;
//   notes: string;
// }

// export default function UltraProLandingPageEditor() {
//   // ==================== GLOBAL STATES ====================
//   const [theme, setTheme] = useState<Theme>({
//     primary: "#10b981",
//     secondary: "#0f766e",
//     background: "#ffffff",
//     textColor: "#1e293b",
//     headingColor: "#111827",
//     accent: "#eab308",
//     fontFamily: "Inter"
//   });

//   const [sections, setSections] = useState<PageSection[]>([
//     {
//       id: "1", type: "hero", title: "Hero Banner", isActive: true, order: 1, content: {
//         heading: "যেখানে ঐতিহ্যের স্বাদ মেলে",
//         subHeading: "AromaCart Premium Collection",
//         ctaText: "এখনই কিনুন",
//         ctaLink: "#",
//         bgImage: "https://picsum.photos/id/1015/2000/1200",
//         secondCtaText: "অফার দেখুন",
//         secondCtaLink: "#",
//         alignment: "center",
//         overlayOpacity: 0.5
//       }
//     },
//     {
//       id: "2", type: "products", title: "Featured Products", isActive: true, order: 2, content: {
//         products: [
//           { id: 1, name: "Premium Oud Attar", price: 1290, oldPrice: 1990, image: "https://picsum.photos/id/20/300/300", description: "Premium quality Oud Attar from UAE", rating: 4.5, reviews: 128, inStock: true },
//           { id: 2, name: "French Perfume 100ml", price: 2490, oldPrice: 3490, image: "https://picsum.photos/id/201/300/300", description: "Imported French Perfume Long lasting", rating: 4.8, reviews: 256, inStock: true },
//           { id: 3, name: "Gift Box Set", price: 3490, oldPrice: 4990, image: "https://picsum.photos/id/26/300/300", description: "Complete gift box with 3 items", rating: 4.9, reviews: 89, inStock: true }
//         ],
//         sectionTitle: "আমাদের জনপ্রিয় পণ্য",
//         sectionSubtitle: "সেরা মানের প্রোডাক্ট সেরা দামে"
//       }
//     },
//     {
//       id: "3", type: "cartPayment", title: "Cart & Checkout", isActive: true, order: 3, content: {
//         methods: ["Cash on Delivery", "bKash", "Nagad", "Rocket", "Credit Card"],
//         deliveryCharge: 60,
//         freeDeliveryOver: 2000,
//         estimatedDelivery: "2-3 business days",
//         returnPolicy: "7 days easy return",
//         taxRate: 5
//       }
//     },
//   ]);

//   const [history, setHistory] = useState<PageSection[][]>([]);
//   const [redoStack, setRedoStack] = useState<PageSection[][]>([]);
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
//   const [showPreview, setShowPreview] = useState(true);
//   const [activeTab, setActiveTab] = useState<"content" | "design" | "advanced" | "seo">("content");

//   // ==================== CART STATE ====================
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [orderDetails, setOrderDetails] = useState<OrderDetails>({
//     name: "",
//     phone: "",
//     email: "",
//     address: "",
//     city: "Dhaka",
//     paymentMethod: "Cash on Delivery",
//     notes: ""
//   });
//   const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
//   const [lastOrder, setLastOrder] = useState<any>(null);

//   // Add to cart function
//   const addToCart = (product: any) => {
//     setCart(prevCart => {
//       const existingItem = prevCart.find(item => item.productId === product.id);
//       if (existingItem) {
//         return prevCart.map(item =>
//           item.productId === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [...prevCart, {
//         id: Date.now().toString(),
//         productId: product.id,
//         name: product.name,
//         price: product.price,
//         quantity: 1,
//         image: product.image,
//         description: product.description
//       }];
//     });
//   };

//   // Update cart quantity
//   const updateQuantity = (id: string, change: number) => {
//     setCart(prevCart =>
//       prevCart.map(item => {
//         if (item.id === id) {
//           const newQuantity = item.quantity + change;
//           if (newQuantity <= 0) return null;
//           return { ...item, quantity: newQuantity };
//         }
//         return item;
//       }).filter(Boolean) as CartItem[]
//     );
//   };

//   // Remove from cart
//   const removeFromCart = (id: string) => {
//     setCart(prevCart => prevCart.filter(item => item.id !== id));
//   };

//   // Calculate totals
//   const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//   const cartSection = sections.find(s => s.type === "cartPayment");
//   const deliveryCharge = cartSection?.content?.deliveryCharge ?? 60;
//   const freeDeliveryOver = cartSection?.content?.freeDeliveryOver ?? 2000;
//   const taxRate = cartSection?.content?.taxRate ?? 5;
//   const isFreeDelivery = subtotal >= freeDeliveryOver;
//   const deliveryCost = isFreeDelivery ? 0 : deliveryCharge;
//   const tax = Math.round(subtotal * (taxRate / 100));
//   const total = subtotal + deliveryCost + tax;

//   // Handle order submission
//   const handlePlaceOrder = () => {
//     if (!orderDetails.name || !orderDetails.phone || !orderDetails.address) {
//       alert("Please fill in all required fields (Name, Phone, Address)");
//       return;
//     }
//     if (cart.length === 0) {
//       alert("Your cart is empty!");
//       return;
//     }

//     const orderData = {
//       orderId: "ORD-" + Date.now().toString().slice(-8),
//       items: cart,
//       customer: orderDetails,
//       subtotal,
//       delivery: deliveryCost,
//       tax: tax,
//       total,
//       orderDate: new Date().toISOString(),
//       estimatedDelivery: cartSection?.content?.estimatedDelivery || "2-3 business days"
//     };

//     setLastOrder(orderData);
//     setShowOrderConfirmation(true);
//     console.log("Order Placed:", orderData);

//     setTimeout(() => {
//       setCart([]);
//       setOrderDetails({
//         name: "", phone: "", email: "", address: "", city: "Dhaka",
//         paymentMethod: "Cash on Delivery", notes: ""
//       });
//       setShowOrderConfirmation(false);
//     }, 3000);
//   };

//   // ==================== HISTORY MANAGEMENT ====================
//   const saveHistory = useCallback(() => {
//     setHistory(prev => [...prev.slice(-15), JSON.parse(JSON.stringify(sections))]);
//     setRedoStack([]);
//   }, [sections]);

//   const undo = () => {
//     if (history.length === 0) return;
//     const prevState = history[history.length - 1];
//     setRedoStack(r => [...r, JSON.parse(JSON.stringify(sections))]);
//     setSections(prevState);
//     setHistory(h => h.slice(0, -1));
//   };

//   const redo = () => {
//     if (redoStack.length === 0) return;
//     const nextState = redoStack[redoStack.length - 1];
//     setHistory(h => [...h, JSON.parse(JSON.stringify(sections))]);
//     setSections(nextState);
//     setRedoStack(r => r.slice(0, -1));
//   };

//   // ==================== SECTION OPERATIONS ====================
//   const moveSection = (index: number, dir: "up" | "down") => {
//     saveHistory();
//     const newSections = [...sections];
//     if (dir === "up" && index > 0) {
//       [newSections[index], newSections[index - 1]] = [newSections[index - 1], newSections[index]];
//     } else if (dir === "down" && index < newSections.length - 1) {
//       [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
//     }
//     setSections(newSections);
//   };

//   const toggleActive = (id: string) => {
//     saveHistory();
//     setSections(s => s.map(sec => sec.id === id ? { ...sec, isActive: !sec.isActive } : sec));
//   };

//   const deleteSection = (id: string) => {
//     saveHistory();
//     setSections(s => s.filter(sec => sec.id !== id));
//   };

//   const duplicateSection = (id: string) => {
//     saveHistory();
//     const section = sections.find(s => s.id === id);
//     if (!section) return;
//     const newSec = { ...JSON.parse(JSON.stringify(section)), id: "dup_" + Date.now(), order: sections.length + 1 };
//     setSections([...sections, newSec]);
//   };

//   const addSection = (type: SectionType, title: string) => {
//     saveHistory();
//     const newSection: PageSection = {
//       id: "sec_" + Date.now(),
//       type,
//       title,
//       isActive: true,
//       order: sections.length + 1,
//       content: getDefaultContent(type)
//     };
//     setSections([...sections, newSection]);
//   };

//   const getDefaultContent = (type: SectionType) => {
//     const defaults: Record<SectionType, any> = {
//       hero: { heading: "New Hero", subHeading: "Subtitle", ctaText: "Shop Now", bgImage: "", secondCtaText: "Learn More", alignment: "center", overlayOpacity: 0.5 },
//       products: { products: [], sectionTitle: "Our Products", sectionSubtitle: "Best quality products" },
//       comboOffer: { title: "Special Combo", price: 999, oldPrice: 1499, items: [] },
//       features: { features: [] },
//       testimonials: { testimonials: [] },
//       stats: { stats: [] },
//       gallery: { images: [] },
//       faq: { faqs: [] },
//       countdown: { endDate: "2026-12-31", title: "Limited Offer" },
//       cartPayment: {
//         methods: ["Cash on Delivery", "bKash", "Nagad"],
//         deliveryCharge: 60,
//         freeDeliveryOver: 2000,
//         taxRate: 5
//       },
//       about: {}, video: {}, team: {}, newsletter: {}, pricing: {}, trustBadges: {}, cta: {}, footer: {}
//     };
//     return defaults[type] || {};
//   };

//   const updateContent = (id: string, newContent: any) => {
//     saveHistory();
//     setSections(s => s.map(sec => sec.id === id ? { ...sec, content: { ...sec.content, ...newContent } } : sec));
//   };

//   // ==================== EDITOR MODAL ====================
//   const currentEditing = sections.find(s => s.id === editingId);

//   const renderHeroEditor = () => (
//     <div className="space-y-6">
//       {/* Main Content */}
//       <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
//         <div className="flex items-center gap-2 mb-4 pb-2 border-b">
//           <Type className="text-blue-600" size={20} />
//           <h3 className="font-semibold text-lg text-gray-800">Main Content</h3>
//         </div>
//         <div className="space-y-4">
//           <div>
//             <Label className="text-sm font-semibold text-gray-700 block mb-1">Heading</Label>
//             <Input
//               value={currentEditing?.content.heading || ""}
//               onChange={e => updateContent(currentEditing!.id, { heading: e.target.value })}
//               className="w-full"
//               placeholder="Enter main heading"
//             />
//             <p className="text-xs text-gray-400 mt-1">Main headline for your hero section</p>
//           </div>
//           <div>
//             <Label className="text-sm font-semibold text-gray-700 block mb-1">Subheading</Label>
//             <Textarea
//               value={currentEditing?.content.subHeading || ""}
//               onChange={e => updateContent(currentEditing!.id, { subHeading: e.target.value })}
//               className="w-full"
//               rows={2}
//               placeholder="Enter supporting text"
//             />
//             <p className="text-xs text-gray-400 mt-1">Secondary text that appears below the heading</p>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <Label className="text-sm font-semibold text-gray-700 block mb-1">Primary CTA Text</Label>
//               <Input
//                 value={currentEditing?.content.ctaText || ""}
//                 onChange={e => updateContent(currentEditing!.id, { ctaText: e.target.value })}
//                 placeholder="Shop Now"
//               />
//             </div>
//             <div>
//               <Label className="text-sm font-semibold text-gray-700 block mb-1">Primary CTA Link</Label>
//               <Input
//                 value={currentEditing?.content.ctaLink || ""}
//                 onChange={e => updateContent(currentEditing!.id, { ctaLink: e.target.value })}
//                 placeholder="https://example.com"
//               />
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <Label className="text-sm font-semibold text-gray-700 block mb-1">Secondary CTA Text</Label>
//               <Input
//                 value={currentEditing?.content.secondCtaText || ""}
//                 onChange={e => updateContent(currentEditing!.id, { secondCtaText: e.target.value })}
//                 placeholder="Learn More"
//               />
//             </div>
//             <div>
//               <Label className="text-sm font-semibold text-gray-700 block mb-1">Secondary CTA Link</Label>
//               <Input
//                 value={currentEditing?.content.secondCtaLink || ""}
//                 onChange={e => updateContent(currentEditing!.id, { secondCtaLink: e.target.value })}
//                 placeholder="https://example.com"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Background Image */}
//       <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
//         <div className="flex items-center gap-2 mb-4 pb-2 border-b">
//           <ImageIcon className="text-purple-600" size={20} />
//           <h3 className="font-semibold text-lg text-gray-800">Background Image</h3>
//         </div>
//         <div>
//           <Label className="text-sm font-semibold text-gray-700 block mb-1">Image URL</Label>
//           <div className="flex gap-3">
//             <Input
//               value={currentEditing?.content.bgImage || ""}
//               onChange={e => updateContent(currentEditing!.id, { bgImage: e.target.value })}
//               className="flex-1"
//               placeholder="https://example.com/background-image.jpg"
//             />
//             <Button variant="outline" className="shrink-0">
//               <Upload size={16} className="mr-2" />
//               Upload
//             </Button>
//           </div>
//           {currentEditing?.content.bgImage && (
//             <div className="mt-3 rounded-lg overflow-hidden border border-gray-200">
//               <img src={currentEditing.content.bgImage} alt="Background preview" className="w-full h-32 object-cover" />
//               <div className="p-2 bg-gray-50 text-xs text-gray-500 flex justify-between items-center">
//                 <span>Image Preview</span>
//                 <button
//                   className="text-red-500 hover:text-red-700"
//                   onClick={() => updateContent(currentEditing!.id, { bgImage: "" })}
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Layout Settings */}
//       <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
//         <div className="flex items-center gap-2 mb-4 pb-2 border-b">
//           <LayoutIcon className="text-green-600" size={20} />
//           <h3 className="font-semibold text-lg text-gray-800">Layout Settings</h3>
//         </div>
//         <div className="space-y-4">
//           <div>
//             <Label className="text-sm font-semibold text-gray-700 block mb-2">Text Alignment</Label>
//             <div className="flex gap-2">
//               {[
//                 { icon: AlignLeft, value: "left", label: "Left" },
//                 { icon: AlignCenter, value: "center", label: "Center" },
//                 { icon: AlignRight, value: "right", label: "Right" }
//               ].map(align => (
//                 <button
//                   key={align.value}
//                   onClick={() => updateContent(currentEditing!.id, { alignment: align.value })}
//                   className={`p-2 rounded-lg border-2 transition-all ${currentEditing?.content.alignment === align.value
//                       ? "border-green-500 bg-green-50 text-green-600"
//                       : "border-gray-200 hover:border-gray-300"
//                     }`}
//                 >
//                   <align.icon size={20} />
//                 </button>
//               ))}
//             </div>
//           </div>
//           <div>
//             <Label className="text-sm font-semibold text-gray-700 block mb-2">
//               Overlay Opacity: {Math.round((currentEditing?.content.overlayOpacity ?? 0.5) * 100)}%
//             </Label>
//             <input
//               type="range"
//               min="0"
//               max="1"
//               step="0.05"
//               value={currentEditing?.content.overlayOpacity ?? 0.5}
//               onChange={e => updateContent(currentEditing!.id, { overlayOpacity: parseFloat(e.target.value) })}
//               className="w-full"
//             />
//             <div className="flex justify-between text-xs text-gray-400 mt-1">
//               <span>Transparent</span>
//               <span>Dark</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderProductsEditor = () => (
//     <div className="space-y-6">
//       <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
//         <div className="flex items-center gap-2 mb-4 pb-2 border-b">
//           <LayoutIcon className="text-blue-600" size={20} />
//           <h3 className="font-semibold text-lg text-gray-800">Section Header</h3>
//         </div>
//         <div className="space-y-4">
//           <div>
//             <Label className="text-sm font-semibold text-gray-700 block mb-1">Section Title</Label>
//             <Input
//               value={currentEditing?.content.sectionTitle || ""}
//               onChange={e => updateContent(currentEditing!.id, { sectionTitle: e.target.value })}
//               placeholder="Featured Products"
//             />
//           </div>
//           <div>
//             <Label className="text-sm font-semibold text-gray-700 block mb-1">Section Subtitle</Label>
//             <Input
//               value={currentEditing?.content.sectionSubtitle || ""}
//               onChange={e => updateContent(currentEditing!.id, { sectionSubtitle: e.target.value })}
//               placeholder="Best quality products for you"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
//         <div className="flex justify-between items-center mb-4 pb-2 border-b">
//           <div className="flex items-center gap-2">
//             <Box size={20} className="text-green-600" />
//             <h3 className="font-semibold text-lg text-gray-800">Products List</h3>
//           </div>
//           <Button
//             onClick={() => {
//               const newProducts = [...(currentEditing?.content.products || []),
//               { id: Date.now(), name: "New Product", price: 999, oldPrice: 1299, image: "", description: "", rating: 0, reviews: 0, inStock: true }];
//               updateContent(currentEditing!.id, { products: newProducts });
//             }}
//             size="sm"
//           >
//             <Plus size={14} className="mr-1" /> Add Product
//           </Button>
//         </div>

//         <div className="space-y-3 max-h-[400px] overflow-y-auto">
//           {currentEditing?.content.products?.map((p: any, i: number) => (
//             <div key={i} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
//               <div className="flex justify-between items-start mb-3">
//                 <h4 className="font-medium text-gray-800">Product {i + 1}: {p.name || "Unnamed"}</h4>
//                 <Button variant="destructive" size="sm" onClick={() => {
//                   const newProducts = currentEditing.content.products.filter((_: any, idx: number) => idx !== i);
//                   updateContent(currentEditing!.id, { products: newProducts });
//                 }}>
//                   <Trash2 size={14} />
//                 </Button>
//               </div>
//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <Label className="text-xs text-gray-500">Name</Label>
//                   <Input value={p.name} onChange={e => {
//                     const newProducts = [...currentEditing.content.products];
//                     newProducts[i] = { ...newProducts[i], name: e.target.value };
//                     updateContent(currentEditing!.id, { products: newProducts });
//                   }} className="text-sm" />
//                 </div>
//                 <div>
//                   <Label className="text-xs text-gray-500">Price (BDT)</Label>
//                   <Input type="number" value={p.price} onChange={e => {
//                     const newProducts = [...currentEditing.content.products];
//                     newProducts[i] = { ...newProducts[i], price: parseInt(e.target.value) || 0 };
//                     updateContent(currentEditing!.id, { products: newProducts });
//                   }} className="text-sm" />
//                 </div>
//                 <div className="col-span-2">
//                   <Label className="text-xs text-gray-500">Image URL</Label>
//                   <Input value={p.image} onChange={e => {
//                     const newProducts = [...currentEditing.content.products];
//                     newProducts[i] = { ...newProducts[i], image: e.target.value };
//                     updateContent(currentEditing!.id, { products: newProducts });
//                   }} className="text-sm" />
//                 </div>
//               </div>
//             </div>
//           ))}
//           {(!currentEditing?.content.products || currentEditing.content.products.length === 0) && (
//             <div className="text-center py-8 text-gray-400">
//               <Box size={48} className="mx-auto mb-2 opacity-30" />
//               <p>No products added yet</p>
//               <p className="text-sm">Click "Add Product" to get started</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );

//   const renderCartEditor = () => (
//     <div className="space-y-6">
//       <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
//         <div className="flex items-center gap-2 mb-4 pb-2 border-b">
//           <CreditCard className="text-blue-600" size={20} />
//           <h3 className="font-semibold text-lg text-gray-800">Payment Methods</h3>
//         </div>
//         <div>
//           <Label className="text-sm font-semibold text-gray-700 block mb-1">Payment Methods (one per line)</Label>
//           <Textarea
//             value={currentEditing?.content.methods?.join("\n") || ""}
//             onChange={e => updateContent(currentEditing!.id, { methods: e.target.value.split("\n").filter(Boolean) })}
//             rows={4}
//             className="font-mono text-sm"
//             placeholder="Cash on Delivery&#10;bKash&#10;Nagad&#10;Rocket&#10;Credit Card"
//           />
//         </div>
//       </div>

//       <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
//         <div className="flex items-center gap-2 mb-4 pb-2 border-b">
//           <Truck className="text-green-600" size={20} />
//           <h3 className="font-semibold text-lg text-gray-800">Delivery Settings</h3>
//         </div>
//         <div className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <Label className="text-sm font-semibold text-gray-700 block mb-1">Delivery Charge (BDT)</Label>
//               <Input
//                 type="number"
//                 value={currentEditing?.content.deliveryCharge ?? 60}
//                 onChange={e => updateContent(currentEditing!.id, { deliveryCharge: parseInt(e.target.value) || 0 })}
//               />
//             </div>
//             <div>
//               <Label className="text-sm font-semibold text-gray-700 block mb-1">Free Delivery Over (BDT)</Label>
//               <Input
//                 type="number"
//                 value={currentEditing?.content.freeDeliveryOver ?? 2000}
//                 onChange={e => updateContent(currentEditing!.id, { freeDeliveryOver: parseInt(e.target.value) || 0 })}
//               />
//             </div>
//           </div>
//           <div>
//             <Label className="text-sm font-semibold text-gray-700 block mb-1">Estimated Delivery Message</Label>
//             <Input
//               value={currentEditing?.content.estimatedDelivery || "2-3 business days"}
//               onChange={e => updateContent(currentEditing!.id, { estimatedDelivery: e.target.value })}
//             />
//           </div>
//           <div>
//             <Label className="text-sm font-semibold text-gray-700 block mb-1">Return Policy</Label>
//             <Input
//               value={currentEditing?.content.returnPolicy || "7 days easy return"}
//               onChange={e => updateContent(currentEditing!.id, { returnPolicy: e.target.value })}
//             />
//           </div>
//           <div>
//             <Label className="text-sm font-semibold text-gray-700 block mb-1">Tax Rate (%)</Label>
//             <Input
//               type="number"
//               step="0.5"
//               value={currentEditing?.content.taxRate ?? 5}
//               onChange={e => updateContent(currentEditing!.id, { taxRate: parseFloat(e.target.value) || 0 })}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderSectionEditor = () => {
//     if (!currentEditing) return null;

//     return (
//       <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 overflow-auto">
//         <div className="bg-gray-50 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
//           {/* Modal Header */}
//           <div className="bg-white border-b px-6 py-5 sticky top-0 z-10">
//             <div className="flex justify-between items-center">
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-800">Edit {currentEditing.title}</h2>
//                 <p className="text-sm text-gray-500 mt-1 capitalize">Section Type: {currentEditing.type}</p>
//               </div>
//               <Button onClick={() => setEditingId(null)} variant="ghost" size="icon" className="rounded-full">
//                 <X size={20} />
//               </Button>
//             </div>

//             {/* Tabs */}
//             <div className="flex gap-1 mt-4">
//               {[
//                 { id: "content", label: "Content", icon: Type },
//                 { id: "design", label: "Design", icon: Palette },
//                 { id: "advanced", label: "Advanced", icon: Settings },
//                 { id: "seo", label: "SEO", icon: TrendingUp }
//               ].map(tab => (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id as any)}
//                   className={`px-5 py-2 rounded-lg transition-all capitalize flex items-center gap-2 text-sm font-medium ${activeTab === tab.id
//                       ? "bg-blue-600 text-white shadow-md"
//                       : "text-gray-600 hover:bg-gray-100"
//                     }`}
//                 >
//                   <tab.icon size={16} />
//                   {tab.label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Modal Content */}
//           <div className="overflow-auto max-h-[65vh] p-6">
//             {activeTab === "content" && (
//               <>
//                 {currentEditing.type === "hero" && renderHeroEditor()}
//                 {currentEditing.type === "products" && renderProductsEditor()}
//                 {currentEditing.type === "cartPayment" && renderCartEditor()}
//                 {!["hero", "products", "cartPayment"].includes(currentEditing.type) && (
//                   <div className="text-center py-12">
//                     <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                       <Settings size={28} className="text-gray-400" />
//                     </div>
//                     <h3 className="text-lg font-semibold text-gray-700 mb-1">Coming Soon!</h3>
//                     <p className="text-gray-500 text-sm">Editor for {currentEditing.type} section is under development.</p>
//                   </div>
//                 )}
//               </>
//             )}

//             {activeTab === "design" && (
//               <div className="bg-white rounded-xl border border-gray-200 p-6">
//                 <div className="flex items-center gap-2 mb-4 pb-2 border-b">
//                   <Palette className="text-purple-600" size={20} />
//                   <h3 className="font-semibold text-lg text-gray-800">Design Settings</h3>
//                 </div>
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between">
//                     <Label className="text-gray-700">Use Global Theme Colors</Label>
//                     <Switch
//                       checked={currentEditing?.content.useGlobalTheme ?? true}
//                       onCheckedChange={(checked) => updateContent(currentEditing!.id, { useGlobalTheme: checked })}
//                     />
//                   </div>
//                   {!(currentEditing?.content.useGlobalTheme ?? true) && (
//                     <>
//                       <div>
//                         <Label className="text-gray-700 block mb-2">Custom Background Color</Label>
//                         <div className="flex gap-2">
//                           <input type="color" value={currentEditing?.content.backgroundColor || "#ffffff"} onChange={e => updateContent(currentEditing!.id, { backgroundColor: e.target.value })} className="w-12 h-10 rounded border" />
//                           <Input value={currentEditing?.content.backgroundColor || ""} onChange={e => updateContent(currentEditing!.id, { backgroundColor: e.target.value })} placeholder="#ffffff" className="flex-1" />
//                         </div>
//                       </div>
//                       <div>
//                         <Label className="text-gray-700 block mb-2">Custom Text Color</Label>
//                         <div className="flex gap-2">
//                           <input type="color" value={currentEditing?.content.textColor || "#000000"} onChange={e => updateContent(currentEditing!.id, { textColor: e.target.value })} className="w-12 h-10 rounded border" />
//                           <Input value={currentEditing?.content.textColor || ""} onChange={e => updateContent(currentEditing!.id, { textColor: e.target.value })} placeholder="#000000" className="flex-1" />
//                         </div>
//                       </div>
//                     </>
//                   )}
//                   <div>
//                     <Label className="text-gray-700 block mb-2">Spacing (Padding)</Label>
//                     <div className="grid grid-cols-2 gap-3">
//                       <Input value={currentEditing?.content.paddingTop || ""} onChange={e => updateContent(currentEditing!.id, { paddingTop: e.target.value })} placeholder="Top padding (e.g. 40px)" />
//                       <Input value={currentEditing?.content.paddingBottom || ""} onChange={e => updateContent(currentEditing!.id, { paddingBottom: e.target.value })} placeholder="Bottom padding (e.g. 40px)" />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === "advanced" && (
//               <div className="bg-white rounded-xl border border-gray-200 p-6">
//                 <div className="flex items-center gap-2 mb-4 pb-2 border-b">
//                   <Settings className="text-gray-600" size={20} />
//                   <h3 className="font-semibold text-lg text-gray-800">Advanced Settings</h3>
//                 </div>
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between">
//                     <Label className="text-gray-700">Lazy Load Section</Label>
//                     <Switch
//                       checked={currentEditing?.content.lazyLoad ?? false}
//                       onCheckedChange={(checked) => updateContent(currentEditing!.id, { lazyLoad: checked })}
//                     />
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <Label className="text-gray-700">Enable Animation</Label>
//                     <Switch
//                       checked={currentEditing?.content.enableAnimation ?? true}
//                       onCheckedChange={(checked) => updateContent(currentEditing!.id, { enableAnimation: checked })}
//                     />
//                   </div>
//                   <div>
//                     <Label className="text-gray-700 block mb-1">Custom CSS Class</Label>
//                     <Input
//                       value={currentEditing?.content.customClass || ""}
//                       onChange={e => updateContent(currentEditing!.id, { customClass: e.target.value })}
//                       placeholder="custom-section-class"
//                     />
//                   </div>
//                   <div>
//                     <Label className="text-gray-700 block mb-1">Section ID</Label>
//                     <Input
//                       value={currentEditing?.content.customId || ""}
//                       onChange={e => updateContent(currentEditing!.id, { customId: e.target.value })}
//                       placeholder="section-id"
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === "seo" && (
//               <div className="bg-white rounded-xl border border-gray-200 p-6">
//                 <div className="flex items-center gap-2 mb-4 pb-2 border-b">
//                   <TrendingUp className="text-blue-600" size={20} />
//                   <h3 className="font-semibold text-lg text-gray-800">SEO Settings</h3>
//                 </div>
//                 <div className="space-y-4">
//                   <div>
//                     <Label className="text-gray-700 block mb-1">Meta Title</Label>
//                     <Input
//                       value={currentEditing?.content.metaTitle || ""}
//                       onChange={e => updateContent(currentEditing!.id, { metaTitle: e.target.value })}
//                       placeholder="Page title for search engines"
//                     />
//                     <p className="text-xs text-gray-400 mt-1">Recommended: 50-60 characters</p>
//                   </div>
//                   <div>
//                     <Label className="text-gray-700 block mb-1">Meta Description</Label>
//                     <Textarea
//                       rows={2}
//                       value={currentEditing?.content.metaDescription || ""}
//                       onChange={e => updateContent(currentEditing!.id, { metaDescription: e.target.value })}
//                       placeholder="Brief description for search results"
//                     />
//                     <p className="text-xs text-gray-400 mt-1">Recommended: 150-160 characters</p>
//                   </div>
//                   <div>
//                     <Label className="text-gray-700 block mb-1">Keywords</Label>
//                     <Input
//                       value={currentEditing?.content.metaKeywords || ""}
//                       onChange={e => updateContent(currentEditing!.id, { metaKeywords: e.target.value })}
//                       placeholder="keyword1, keyword2, keyword3"
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Modal Footer */}
//           <div className="border-t bg-white px-6 py-4 sticky bottom-0 flex justify-end gap-3">
//             <Button variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
//             <Button onClick={() => setEditingId(null)} className="bg-blue-600 hover:bg-blue-700">
//               <CheckCircle className="mr-2" size={16} /> Save Changes
//             </Button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // ==================== LIVE PREVIEW RENDERER ====================
//   const renderPreviewSection = (section: PageSection) => {
//     const useGlobalTheme = section.content.useGlobalTheme ?? true;
//     const style = {
//       backgroundColor: useGlobalTheme ? theme.background : (section.content.backgroundColor || theme.background),
//       color: useGlobalTheme ? theme.textColor : (section.content.textColor || theme.textColor),
//       fontFamily: theme.fontFamily,
//       paddingTop: section.content.paddingTop || undefined,
//       paddingBottom: section.content.paddingBottom || undefined
//     };

//     switch (section.type) {
//       case "hero":
//         const overlayOpacity = section.content.overlayOpacity ?? 0.5;
//         const alignClass = section.content.alignment === 'left' ? 'text-left' : section.content.alignment === 'right' ? 'text-right' : 'text-center';
//         return (
//           <div className="min-h-[500px] flex items-center justify-center text-center relative overflow-hidden"
//             style={{ ...style, backgroundImage: `url(${section.content.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
//             <div className="absolute inset-0" style={{ backgroundColor: `rgba(0,0,0,${overlayOpacity})` }} />
//             <div className={`relative z-10 px-6 max-w-4xl mx-auto ${alignClass}`}>
//               <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">{section.content.heading}</h1>
//               <p className="text-xl md:text-2xl mb-8 text-white/95">{section.content.subHeading}</p>
//               <div className="flex gap-4 justify-center flex-wrap">
//                 <Button size="lg" style={{ backgroundColor: theme.primary, color: "white" }}>
//                   {section.content.ctaText} <ChevronRight className="ml-2" size={18} />
//                 </Button>
//                 {section.content.secondCtaText && (
//                   <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur border-white text-white hover:bg-white/20">
//                     {section.content.secondCtaText}
//                   </Button>
//                 )}
//               </div>
//             </div>
//           </div>
//         );

//       case "products":
//         return (
//           <div className="py-20 px-6" style={style}>
//             <div className="max-w-7xl mx-auto">
//               <div className="text-center mb-12">
//                 <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: theme.headingColor }}>
//                   {section.content.sectionTitle || "Our Products"}
//                 </h2>
//                 <p className="text-xl opacity-75">{section.content.sectionSubtitle}</p>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                 {section.content.products?.map((product: any) => (
//                   <div key={product.id} className="rounded-2xl overflow-hidden shadow-lg border" style={{ borderColor: theme.secondary + "20" }}>
//                     <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
//                     <div className="p-6">
//                       <h3 className="text-xl font-bold mb-2">{product.name}</h3>
//                       <p className="text-sm mb-3 opacity-75">{product.description}</p>
//                       <div className="flex items-baseline gap-2 mb-4">
//                         <span className="text-2xl font-bold" style={{ color: theme.primary }}>৳{product.price}</span>
//                         {product.oldPrice && (
//                           <span className="text-sm line-through opacity-50">৳{product.oldPrice}</span>
//                         )}
//                       </div>
//                       <Button
//                         onClick={() => addToCart(product)}
//                         style={{ backgroundColor: theme.primary }}
//                         className="w-full"
//                         disabled={!product.inStock}
//                       >
//                         <ShoppingCart className="mr-2" size={18} />
//                         {product.inStock ? "Add to Cart" : "Out of Stock"}
//                       </Button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         );

//       case "cartPayment": {
//         const isCartEmpty = cart.length === 0;
//         return (
//           <div className="py-20 px-6 bg-gray-50">
//             {showOrderConfirmation && lastOrder && (
//               <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
//                 <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center shadow-2xl">
//                   <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <CheckCircle className="text-green-600" size={48} />
//                   </div>
//                   <h3 className="text-2xl font-bold mb-2">Order Placed Successfully!</h3>
//                   <p className="text-gray-600 mb-4">Order ID: {lastOrder.orderId}</p>
//                   <p className="text-sm text-gray-500">Total Amount: ৳{lastOrder.total}</p>
//                   <div className="mt-6 pt-4 border-t">
//                     <Button className="w-full" onClick={() => setShowOrderConfirmation(false)}>Continue Shopping</Button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             <div className="max-w-7xl mx-auto">
//               <h2 className="text-4xl font-bold text-center mb-12 flex items-center justify-center gap-3">
//                 <ShoppingCart size={40} /> Your Cart
//               </h2>

//               <div className="grid lg:grid-cols-3 gap-8">
//                 <div className="lg:col-span-2">
//                   <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//                     <div className="p-6 border-b bg-gray-50">
//                       <h3 className="text-2xl font-bold">Cart Items ({cart.length})</h3>
//                     </div>

//                     {isCartEmpty ? (
//                       <div className="text-center py-16">
//                         <ShoppingCart className="mx-auto mb-4 opacity-30" size={80} />
//                         <p className="text-xl font-semibold mb-2">Your cart is empty</p>
//                         <p className="text-gray-500">Add some products to get started</p>
//                       </div>
//                     ) : (
//                       <div className="divide-y">
//                         {cart.map((item) => (
//                           <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
//                             <div className="flex gap-4">
//                               <img src={item.image} alt={item.name} className="w-24 h-24 rounded-lg object-cover" />
//                               <div className="flex-1">
//                                 <div className="flex justify-between items-start">
//                                   <div>
//                                     <h4 className="font-bold text-lg">{item.name}</h4>
//                                     <p className="text-sm text-gray-500">{item.description}</p>
//                                   </div>
//                                   <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
//                                     <Trash2 size={18} />
//                                   </button>
//                                 </div>
//                                 <div className="flex justify-between items-end mt-4">
//                                   <div className="flex items-center gap-3 border rounded-lg px-3 py-2">
//                                     <button onClick={() => updateQuantity(item.id, -1)} className="hover:bg-gray-100 p-1 rounded">
//                                       <Minus size={16} />
//                                     </button>
//                                     <span className="font-semibold w-8 text-center">{item.quantity}</span>
//                                     <button onClick={() => updateQuantity(item.id, 1)} className="hover:bg-gray-100 p-1 rounded">
//                                       <PlusIcon size={16} />
//                                     </button>
//                                   </div>
//                                   <div className="text-right">
//                                     <p className="text-xl font-bold" style={{ color: theme.primary }}>৳{item.price * item.quantity}</p>
//                                     <p className="text-sm text-gray-500">৳{item.price} each</p>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div>
//                   <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
//                     <h3 className="text-xl font-bold mb-4 pb-3 border-b">Order Summary</h3>

//                     <div className="space-y-3 mb-4">
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Subtotal</span>
//                         <span className="font-semibold">৳{subtotal}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Delivery Charge</span>
//                         <span className="font-semibold">
//                           {isFreeDelivery ? <span className="text-green-600">FREE</span> : `৳${deliveryCharge}`}
//                         </span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Tax ({taxRate}%)</span>
//                         <span className="font-semibold">৳{tax}</span>
//                       </div>
//                       <div className="border-t pt-3 mt-3">
//                         <div className="flex justify-between text-xl font-bold">
//                           <span>Total</span>
//                           <span style={{ color: theme.primary }}>৳{total}</span>
//                         </div>
//                       </div>
//                     </div>

//                     {!isCartEmpty && (
//                       <>
//                         <div className="border-t pt-4 mt-4">
//                           <h4 className="font-semibold mb-3">Delivery Information</h4>
//                           <div className="space-y-3">
//                             <Input
//                               placeholder="Full Name *"
//                               value={orderDetails.name}
//                               onChange={(e) => setOrderDetails({ ...orderDetails, name: e.target.value })}
//                             />
//                             <Input
//                               placeholder="Phone Number *"
//                               value={orderDetails.phone}
//                               onChange={(e) => setOrderDetails({ ...orderDetails, phone: e.target.value })}
//                             />
//                             <Input
//                               placeholder="Email"
//                               type="email"
//                               value={orderDetails.email}
//                               onChange={(e) => setOrderDetails({ ...orderDetails, email: e.target.value })}
//                             />
//                             <Textarea
//                               placeholder="Delivery Address *"
//                               value={orderDetails.address}
//                               onChange={(e) => setOrderDetails({ ...orderDetails, address: e.target.value })}
//                               rows={2}
//                             />
//                             <select
//                               className="w-full p-2 rounded-lg border bg-white"
//                               value={orderDetails.city}
//                               onChange={(e) => setOrderDetails({ ...orderDetails, city: e.target.value })}
//                             >
//                               <option>Dhaka</option>
//                               <option>Chattogram</option>
//                               <option>Khulna</option>
//                               <option>Rajshahi</option>
//                               <option>Sylhet</option>
//                               <option>Barishal</option>
//                             </select>
//                             <select
//                               className="w-full p-2 rounded-lg border bg-white"
//                               value={orderDetails.paymentMethod}
//                               onChange={(e) => setOrderDetails({ ...orderDetails, paymentMethod: e.target.value })}
//                             >
//                               {cartSection?.content?.methods?.map((method: string) => (
//                                 <option key={method}>{method}</option>
//                               ))}
//                             </select>
//                           </div>
//                         </div>

//                         <Button
//                           onClick={handlePlaceOrder}
//                           style={{ backgroundColor: theme.primary }}
//                           className="w-full mt-6 py-6 text-lg font-semibold"
//                         >
//                           <CreditCard className="mr-2" /> Place Order (৳{total})
//                         </Button>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//       }

//       default:
//         return (
//           <div className="py-16 text-center border-b" style={style}>
//             <h3 className="text-2xl font-bold" style={{ color: theme.headingColor }}>{section.title}</h3>
//             <p className="text-sm opacity-70 mt-2">Content goes here</p>
//           </div>
//         );
//     }
//   };

//   // ==================== MAIN RENDER ====================
//   const activeSections = React.useMemo(() =>
//     sections.filter(s => s.isActive).sort((a, b) => a.order - b.order),
//     [sections]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white pb-20">
//       {/* Header */}
//       <div className="border-b border-gray-700 bg-gray-900/95 backdrop-blur sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center flex-wrap gap-4">
//           <div className="flex items-center gap-3">
//             <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
//               PROBUILDER
//             </div>
//             <div className="text-gray-400 text-sm hidden md:block">Professional Page Builder</div>
//           </div>

//           <div className="flex items-center gap-2">
//             <Button onClick={undo} disabled={history.length === 0} variant="outline" size="sm" className="border-gray-600">
//               <Undo className="mr-1" size={14} /> Undo
//             </Button>
//             <Button onClick={redo} disabled={redoStack.length === 0} variant="outline" size="sm" className="border-gray-600">
//               <Redo className="mr-1" size={14} /> Redo
//             </Button>
//             <Button onClick={() => setShowPreview(!showPreview)} variant="outline" size="sm" className="border-gray-600">
//               <Eye size={14} /> Preview
//             </Button>
//             <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-sm">
//               🚀 Publish
//             </Button>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 px-6 pt-6">
//         {/* Sidebar */}
//         <div className="col-span-12 lg:col-span-4 space-y-6">
//           {/* Theme Editor */}
//           <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-6 border border-gray-700">
//             <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
//               <Palette className="text-emerald-400" size={18} /> Theme Customizer
//             </h2>
//             <div className="grid grid-cols-2 gap-3">
//               {Object.entries(theme).map(([key, value]) => {
//                 if (key === "fontFamily") return null;
//                 return (
//                   <div key={key}>
//                     <Label className="text-xs uppercase tracking-wider mb-1 block text-gray-400">{key}</Label>
//                     <div className="flex gap-2">
//                       <input type="color" value={value as string} onChange={(e) => setTheme(t => ({ ...t, [key]: e.target.value }))} className="w-10 h-8 rounded cursor-pointer" />
//                       <Input value={value as string} onChange={(e) => setTheme(t => ({ ...t, [key]: e.target.value }))} className="bg-gray-700 border-gray-600 text-white text-xs h-8" />
//                     </div>
//                   </div>
//                 )
//               })}
//             </div>
//           </div>

//           {/* Add Sections */}
//           <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-6 border border-gray-700">
//             <h2 className="text-lg font-bold mb-4">Add New Section</h2>
//             <div className="grid grid-cols-2 gap-2">
//               {["hero", "products", "cartPayment", "features", "testimonials", "gallery", "faq", "countdown"].map(t => (
//                 <Button key={t} variant="outline" size="sm" className="border-gray-600 hover:border-emerald-400 capitalize text-sm" onClick={() => addSection(t as SectionType, t)}>
//                   <Plus size={12} className="mr-1" /> {t}
//                 </Button>
//               ))}
//             </div>
//           </div>

//           {/* Cart Summary */}
//           {cart.length > 0 && (
//             <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl p-4 border border-emerald-400/30">
//               <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm"><ShoppingCart size={14} /> Current Cart</h3>
//               <p className="text-xl font-bold text-emerald-400">৳{total}</p>
//               <p className="text-xs text-gray-300">{cart.length} items</p>
//             </div>
//           )}
//         </div>

//         {/* Sections List */}
//         <div className="col-span-12 lg:col-span-8">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold">Page Structure</h2>
//             <span className="text-xs text-gray-400">{sections.length} sections</span>
//           </div>

//           <div className="space-y-3">
//             {sections.map((section, idx) => (
//               <div key={section.id} className="group bg-gray-800/50 border border-gray-700 rounded-xl p-4 flex items-center gap-4 hover:border-emerald-500 transition-all">
//                 <div className="flex flex-col gap-0.5">
//                   <button onClick={() => moveSection(idx, "up")} disabled={idx === 0} className="p-1 hover:bg-gray-700 rounded disabled:opacity-30">
//                     <MoveUp size={14} />
//                   </button>
//                   <button onClick={() => moveSection(idx, "down")} disabled={idx === sections.length - 1} className="p-1 hover:bg-gray-700 rounded disabled:opacity-30">
//                     <MoveDown size={14} />
//                   </button>
//                 </div>

//                 <div className="flex-1">
//                   <div className="font-semibold capitalize text-sm">{section.title}</div>
//                   <div className="text-xs text-gray-400 capitalize">{section.type}</div>
//                 </div>

//                 <Switch checked={section.isActive} onCheckedChange={() => toggleActive(section.id)} />

//                 <Button onClick={() => setEditingId(section.id)} variant="outline" size="sm" className="border-gray-600 text-xs">
//                   <Edit3 className="mr-1" size={12} /> Edit
//                 </Button>
//                 <Button variant="ghost" size="sm" onClick={() => duplicateSection(section.id)} className="text-xs">
//                   Duplicate
//                 </Button>
//                 <Button variant="destructive" size="sm" onClick={() => deleteSection(section.id)}>
//                   <Trash2 size={12} />
//                 </Button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Live Preview */}
//       {showPreview && (
//         <div className="max-w-7xl mx-auto mt-12 px-6">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
//               Live Preview
//             </h3>
//             <div className="flex gap-1">
//               <Button variant={previewMode === "desktop" ? "default" : "outline"} size="sm" onClick={() => setPreviewMode("desktop")}>
//                 <Monitor size={12} className="mr-1" /> Desktop
//               </Button>
//               <Button variant={previewMode === "tablet" ? "default" : "outline"} size="sm" onClick={() => setPreviewMode("tablet")}>
//                 <Tablet size={12} className="mr-1" /> Tablet
//               </Button>
//               <Button variant={previewMode === "mobile" ? "default" : "outline"} size="sm" onClick={() => setPreviewMode("mobile")}>
//                 <Smartphone size={12} className="mr-1" /> Mobile
//               </Button>
//             </div>
//           </div>

//           <div className={`mx-auto border-[8px] border-gray-700 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 bg-white ${previewMode === "mobile" ? "max-w-[375px]" : previewMode === "tablet" ? "max-w-[768px]" : "max-w-6xl"}`}>
//             {activeSections.map(sec => (
//               <React.Fragment key={sec.id}>
//                 {renderPreviewSection(sec)}
//               </React.Fragment>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Edit Modal */}
//       {editingId && renderSectionEditor()}
//     </div>
//   );
// }







export default function EditorPage() {
  return (
    <div>
      <UltraProLandingPageBuilder/>
    </div>
  );
}