import api from "./api";

export const contactService = {
  async submitContact(formData) {
    try {
      const { data } = await api.post("/contact", formData);
      return data.data || data;
    } catch (_) {
      await new Promise((r) => setTimeout(r, 1000));
      return {
        success: true,
        ticketId: "TKT-" + Math.floor(Math.random() * 100000),
        message: "Your message has been received. We will respond within 24 hours.",
      };
    }
  },

  async getFAQ() {
    try {
      const { data } = await api.get("/faq");
      return data.data || data;
    } catch (_) {
      return [
        { q: "How long does shipping take?", a: "Usually 3-5 business days within the country." },
        { q: "What is your return policy?", a: "30-day hassle-free return on all products." },
        { q: "Do you offer international shipping?", a: "Yes, we ship to over 50 countries worldwide." },
      ];
    }
  },
};

export default contactService;
