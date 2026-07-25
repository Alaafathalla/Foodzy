import { create } from "zustand";
import { persist } from "zustand/middleware";

const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlist: [],
      
      addToWishlist: (product) => {
        const { wishlist } = get();
        const exists = wishlist.some(item => item.id === product.id);
        if (!exists) {
          set({ wishlist: [...wishlist, product] });
        }
      },
      
      removeFromWishlist: (productId) => {
        set(state => ({
          wishlist: state.wishlist.filter(item => item.id !== productId)
        }));
      },
      
      toggleWishlist: (product) => {
        const { wishlist } = get();
        const exists = wishlist.some(item => item.id === product.id);
        if (exists) {
          get().removeFromWishlist(product.id);
        } else {
          get().addToWishlist(product);
        }
      },
      
      isInWishlist: (productId) => {
        return get().wishlist.some(item => item.id === productId);
      },
      
      clearWishlist: () => {
        set({ wishlist: [] });
      }
    }),
    {
      name: "foodzy-wishlist"
    }
  )
);

export default useWishlistStore;
