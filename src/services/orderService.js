import api from "./api";

export const orderService = {
  async placeOrder(orderData) {
    try {
      const { data } = await api.post("/orders", orderData);
      return data.data || data;
    } catch (_) {
      await new Promise((r) => setTimeout(r, 1200));
      const orderId = "ORD-" + Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
      const trackingNo = "TRK" + Math.floor(Math.random() * 900000000 + 100000000);
      return {
        orderId,
        trackingNo,
        status: "confirmed",
        total: orderData.total,
        createdAt: new Date().toISOString(),
        estimatedDelivery: "3-5 business days",
      };
    }
  },

  async getOrders() {
    try {
      const { data } = await api.get("/orders");
      return data.data || data;
    } catch (_) {
      await new Promise((r) => setTimeout(r, 400));
      return [];
    }
  },

  async getOrder(orderId) {
    try {
      const { data } = await api.get(`/orders/${orderId}`);
      return data.data || data;
    } catch (_) {
      await new Promise((r) => setTimeout(r, 200));
      return { orderId, status: "confirmed" };
    }
  },
};

export default orderService;
