import { create } from "zustand";
import { persist } from "zustand/middleware";
import { commerceService } from "../services/commerceService";

const productId = (item) => item?.product_id ?? item?.product?.id ?? item?.id;
const normalizeItem = (item) => ({ ...(item.product || item), ...item, id: productId(item) });
const hasToken = () => Boolean(localStorage.getItem("token"));

const useWishlistStore = create(persist((set, get) => ({
  wishlist: [], loading: false,
  hydrateWishlist: async () => {
    if (!hasToken()) return;
    set({ loading: true });
    try { set({ wishlist: (await commerceService.getWishlist()).map(normalizeItem) }); } catch (_) {} finally { set({ loading: false }); }
  },
  addToWishlist: async (product) => {
    const id = productId(product); if (id == null || get().wishlist.some((i) => productId(i) === id)) return;
    set((s) => ({ wishlist: [...s.wishlist, { ...product, id }] }));
    if (hasToken()) try { await commerceService.addToWishlist(id); } catch (_) {}
  },
  removeFromWishlist: async (id) => { set((s) => ({ wishlist: s.wishlist.filter((i) => productId(i) !== id) })); if (hasToken()) try { await commerceService.removeWishlistItem(id); } catch (_) {} },
  toggleWishlist: async (product) => { const id = productId(product); if (get().wishlist.some((i) => productId(i) === id)) await get().removeFromWishlist(id); else await get().addToWishlist(product); },
  isInWishlist: (id) => get().wishlist.some((i) => productId(i) === id),
  clearWishlist: () => set({ wishlist: [] }),
}), { name: "foodzy-wishlist" }));
export default useWishlistStore;
