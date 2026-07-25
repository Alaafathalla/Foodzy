import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      
      addToCart: (product, qty = 1) => {
        const { cart } = get();
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
          set({
            cart: cart.map(item =>
              item.id === product.id
                ? { ...item, qty: item.qty + qty }
                : item
            )
          });
        } else {
          set({ cart: [...cart, { ...product, qty }] });
        }
      },
      
      removeFromCart: (productId) => {
        set(state => ({
          cart: state.cart.filter(item => item.id !== productId)
        }));
      },
      
      updateQuantity: (productId, delta) => {
        set(state => ({
          cart: state.cart.map(item =>
            item.id === productId
              ? { ...item, qty: Math.max(1, item.qty + delta) }
              : item
          )
        }));
      },
      
      setQuantity: (productId, qty) => {
        set(state => ({
          cart: state.cart.map(item =>
            item.id === productId
              ? { ...item, qty: Math.max(1, qty) }
              : item
          )
        }));
      },
      
      clearCart: () => {
        set({ cart: [] });
      },
      
      getSubtotal: () => {
        return get().cart.reduce((sum, item) => sum + item.price * item.qty, 0);
      },
      
      getItemCount: () => {
        return get().cart.reduce((sum, item) => sum + item.qty, 0);
      }
    }),
    {
      name: "foodzy-cart"
    }
  )
);

export default useCartStore;
