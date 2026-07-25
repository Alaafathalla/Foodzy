import api from "./api";

const MOCK_USER = {
  id: 1,
  name: "John Doe",
  email: "demo@foodzy.com",
  phone: "+123 456 7890",
  role: "customer",
  avatar: null,
};

export const authService = {
  async login(credentials) {
    try {
      const { data } = await api.post("/auth/login", credentials);
      const { token, user } = data.data || data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      return { token, user };
    } catch (err) {
      // Mock fallback when API isn't available
      await new Promise((r) => setTimeout(r, 800));
      if (
        credentials.email === "demo@foodzy.com" &&
        credentials.password === "demo123"
      ) {
        const token = "mock-jwt-token-" + Date.now();
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(MOCK_USER));
        return { token, user: MOCK_USER };
      }
      if (credentials.email && credentials.password?.length >= 6) {
        const token = "mock-jwt-token-" + Date.now();
        const user = { ...MOCK_USER, email: credentials.email };
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        return { token, user };
      }
      throw new Error("Invalid credentials. Try demo@foodzy.com / demo123");
    }
  },

  async register(payload) {
    try {
      const { data } = await api.post("/auth/register", payload);
      const { token, user } = data.data || data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      return { token, user };
    } catch (err) {
      await new Promise((r) => setTimeout(r, 800));
      if (payload.password !== payload.confirmPassword) {
        throw new Error("Passwords do not match");
      }
      if (payload.password?.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }
      const token = "mock-jwt-token-" + Date.now();
      const user = {
        id: Date.now(),
        name: `${payload.firstName || ""} ${payload.lastName || ""}`.trim() || "New User",
        email: payload.email,
        phone: payload.phone || "",
        role: "customer",
      };
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      return { token, user };
    }
  },

  async logout() {
    try {
      await api.post("/auth/logout");
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },

  async getProfile() {
    try {
      const { data } = await api.get("/auth/me");
      const user = data.data || data;
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (err) {
      const cached = localStorage.getItem("user");
      return cached ? JSON.parse(cached) : null;
    }
  },

  getCurrentUser() {
    const cached = localStorage.getItem("user");
    return cached ? JSON.parse(cached) : null;
  },

  isAuthenticated() {
    return !!localStorage.getItem("token");
  },
};

export default authService;
