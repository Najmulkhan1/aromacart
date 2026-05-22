import { useState } from "react";
import { CartItem, OrderDetails } from "@/types/editor.types";

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    name: "", phone: "", email: "", address: "", city: "Dhaka",
    paymentMethod: "Cash on Delivery", notes: ""
  });
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [lastOrder, setLastOrder] = useState<any>(null);

  const addToCart = (product: any) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.productId === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, {
        id: Date.now().toString(), productId: product.id, name: product.name,
        price: product.price, quantity: 1, image: product.image, description: product.description
      }];
    });
  };

  const updateQuantity = (id: string, change: number) => {
    setCart(prevCart =>
      prevCart.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          if (newQuantity <= 0) return null;
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    setOrderDetails({
      name: "", phone: "", email: "", address: "", city: "Dhaka",
      paymentMethod: "Cash on Delivery", notes: ""
    });
  };

  return {
    cart, orderDetails, setOrderDetails, showOrderConfirmation, setShowOrderConfirmation,
    lastOrder, setLastOrder, addToCart, updateQuantity, removeFromCart, clearCart
  };
}