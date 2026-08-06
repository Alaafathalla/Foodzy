import { create } from "zustand";
import { persist } from "zustand/middleware";
import { commerceService } from "../services/commerceService";

const productId = (item) => item?.product_id ?? item?.product?.id ?? item?.id;
const normalizeItem = (item) => ({ ...(item.product || item), ...item, id: productId(item), qty: Number(item.qty ?? item.quantity ?? 1) });
const hasToken = () => Boolean(localStorage.getItem("token"));

const useCartStore = create(persist((set, get) => ({
  cart: [], loading: false,
  hydrateCart: async () => {
    if (!hasToken()) return;
    set({ loading: true });
    try { set({ cart: (await commerceService.getCart()).map(normalizeItem) }); } catch (_) {} finally { set({ loading: false }); }
  },
  addToCart: async (product, qty = 1) => {
    const id = productId(product); if (id == null) return;
    set((state) => {
      const found = state.cart.find((item) => productId(item) === id);
      return { cart: found ? state.cart.map((item) => productId(item) === id ? { ...item, qty: item.qty + qty } : item) : [...state.cart, { ...product, id, qty }] };
    });
    if (hasToken()) try { await commerceService.addToCart(id, qty); } catch (_) {}
  },
  removeFromCart: async (id) => { set((s) => ({ cart: s.cart.filter((i) => productId(i) !== id) })); if (hasToken()) try { await commerceService.removeCartItem(id); } catch (_) {} },
  updateQuantity: async (id, delta) => {
    const item = get().cart.find((i) => productId(i) === id); if (!item) return;
    const qty = Math.max(1, item.qty + delta); set((s) => ({ cart: s.cart.map((i) => productId(i) === id ? { ...i, qty } : i) }));
    if (hasToken()) try { await commerceService.updateCartItem(id, qty); } catch (_) {}
  },
  setQuantity: async (id, value) => { const qty = Math.max(1, Number(value) || 1); set((s) => ({ cart: s.cart.map((i) => productId(i) === id ? { ...i, qty } : i) })); if (hasToken()) try { await commerceService.updateCartItem(id, qty); } catch (_) {} },
  clearCart: async () => { set({ cart: [] }); if (hasToken()) try { await commerceService.clearCart(); } catch (_) {} },
  getSubtotal: () => get().cart.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 1), 0),
  getItemCount: () => get().cart.reduce((sum, item) => sum + Number(item.qty || 1), 0),
}), { name: "foodzy-cart" }));
export default useCartStore;
