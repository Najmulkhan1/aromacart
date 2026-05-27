import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      addItem: (item) => set((state) => {
        const existingItem = state.items.find(i => i.id === item.id && i.size === item.size);
        if (existingItem) {
          return { 
            items: state.items.map(i => 
              i.id === item.id && i.size === item.size 
                ? { ...i, quantity: i.quantity + item.quantity } 
                : i
            ),
            isOpen: true 
          };
        }
        return { items: [...state.items, item], isOpen: true };
      }),
      removeItem: (id, size) => set((state) => ({ 
        items: state.items.filter(i => !(i.id === id && i.size === size)) 
      })),
      updateQuantity: (id, size, quantity) => set((state) => ({
        items: state.items.map(i => 
          i.id === id && i.size === size 
            ? { ...i, quantity: Math.max(1, quantity) } 
            : i
        )
      })),
      clearCart: () => set({ items: [] }),
      getCartTotal: () => {
        const state = get();
        return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
    }),
    { 
      name: "cart-storage",
      version: 1, // Incrementing the version clears old localStorage data
    }
  )
);
