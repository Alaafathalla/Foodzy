import api from "./api";

const unwrap = (response) => response?.data?.data ?? response?.data ?? response;
const normalizeItems = (payload, key) => {
  const value = payload?.[key] ?? payload?.items ?? payload;
  return Array.isArray(value) ? value : [];
};

export const commerceService = {
  async getCart() {
    const payload = unwrap(await api.get("/cart"));
    return normalizeItems(payload, "cart");
  },
  async addToCart(productId, quantity = 1) {
    return unwrap(await api.post("/cart", { product_id: productId, quantity }));
  },
  async updateCartItem(productId, quantity) {
    return unwrap(await api.put(`/cart/${productId}`, { quantity }));
  },
  async removeCartItem(productId) {
    return unwrap(await api.delete(`/cart/${productId}`));
  },
  async clearCart() {
    return unwrap(await api.delete("/cart"));
  },
  async getWishlist() {
    const payload = unwrap(await api.get("/wishlist"));
    return normalizeItems(payload, "wishlist");
  },
  async addToWishlist(productId) {
    return unwrap(await api.post("/wishlist", { product_id: productId }));
  },
  async removeWishlistItem(productId) {
    return unwrap(await api.delete(`/wishlist/${productId}`));
  },
};
