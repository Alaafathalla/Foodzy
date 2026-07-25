import api from "./api";
import p1 from "../assets/products/p1.png";
import p2 from "../assets/products/p2.png";
import p3 from "../assets/products/p3.png";
import p4 from "../assets/products/p4.png";
import p5 from "../assets/products/p5.png";
import p6 from "../assets/products/p6.png";
import p7 from "../assets/products/p7.png";
import p8 from "../assets/products/p8.png";
import p9 from "../assets/products/p9.png";
import item1 from "../assets/home/item1.png";
import item2 from "../assets/home/item2.png";
import item3 from "../assets/home/item3.png";
import item4 from "../assets/home/item4.png";
import item5 from "../assets/home/item5.png";
import item6 from "../assets/cart/6.png";
import item7 from "../assets/cart/7.png";

const MOCK_CATEGORIES = [
  { id: "main-dish", name: "Main Dish", image: item1, count: 98 },
  { id: "breakfast", name: "Breakfast", image: item2, count: 62 },
  { id: "dessert", name: "Dessert", image: item3, count: 48 },
  { id: "fruits", name: "Fruits & Vegetables", image: item5, count: 73 },
  { id: "dairy", name: "Milks & Dairies", image: p6, count: 41 },
  { id: "drinks", name: "Coffees & Teas", image: p7, count: 35 },
  { id: "meat", name: "Meats & Seafood", image: p2, count: 29 },
  { id: "snacks", name: "Snacks", image: item6, count: 67 },
];

const MOCK_PRODUCTS = [
  { id: 1, title: "Fresh organic villa farm lemon 500gm pack", category: "fruits", vendor: "NestFood", tag: "Hot", price: 28.85, oldPrice: 32.8, rating: 4.0, image: p1, stock: 50, description: "Fresh organic lemons directly from the farm. Perfect for juices, cooking, and garnishes." },
  { id: 2, title: "Best snacks with hazel nut pack 200gm", category: "snacks", vendor: "Stouffer", tag: "Sale", price: 52.85, oldPrice: 55.8, rating: 4.5, image: p2, stock: 34, description: "Premium hazelnut snacks, roasted to perfection with a touch of sea salt." },
  { id: 3, title: "Organic fresh vanilla farm watermelon 5kg", category: "fruits", vendor: "StarKist", tag: "New", price: 48.85, oldPrice: 52.8, rating: 4.0, image: p3, stock: 12, description: "Sweet, seedless watermelon freshly harvested from organic farms." },
  { id: 4, title: "Fresh organic apple 1kg simla marning", category: "fruits", vendor: "NestFood", price: 17.85, oldPrice: 19.8, rating: 4.0, image: p4, stock: 120, description: "Crisp, juicy Simla apples. Rich in fiber and antioxidants." },
  { id: 5, title: "Blue Diamond Almonds Lightly Salted Vegetables", category: "breakfast", vendor: "NestFood", tag: "-18%", price: 23.85, oldPrice: 25.8, rating: 4.0, image: p5, stock: 89, description: "Premium lightly salted almonds - perfect snack for any time of day." },
  { id: 6, title: "Chobani Complete Vanilla Greek Yogurt", category: "dairy", vendor: "NestFood", price: 54.85, oldPrice: 59.8, rating: 4.0, image: p6, stock: 45, description: "High protein complete vanilla Greek yogurt. Probiotic-rich for gut health." },
  { id: 7, title: "Canada Dry Ginger Ale 2L Bottle", category: "drinks", vendor: "NestFood", price: 32.85, oldPrice: 33.8, rating: 4.2, image: p7, stock: 200, description: "Classic ginger ale - crisp, refreshing taste with real ginger." },
  { id: 8, title: "Gorton's Beer Battered Fish Fillets", category: "meat", vendor: "Old El Paso", tag: "Hot", price: 23.85, oldPrice: 25.8, rating: 3.8, image: p8, stock: 0, description: "Crispy beer-battered fish fillets. Wild-caught Alaskan Pollock." },
  { id: 9, title: "Haagen-Dazs Caramel Cone Ice Cream", category: "dessert", vendor: "Tyson", price: 22.85, oldPrice: 24.8, rating: 4.1, image: p9, stock: 28, description: "Indulgent caramel cone ice cream with caramel swirls and chocolatey cone pieces." },
  { id: 10, title: "Organic Farm Fresh Eggs Dozen Pack", category: "breakfast", vendor: "FarmFresh", price: 12.99, oldPrice: 14.99, rating: 4.8, image: item2, stock: 150, description: "Farm-fresh cage-free organic eggs. Packed with protein and omega-3." },
  { id: 11, title: "Premium Beef Steak 1kg Pack", category: "meat", vendor: "ButcherCo", tag: "Sale", price: 39.99, oldPrice: 49.99, rating: 4.7, image: item1, stock: 18, description: "Grass-fed premium beef steak. Perfectly marbled for a juicy, tender bite." },
  { id: 12, title: "Artisan Chocolate Cake 500g", category: "dessert", vendor: "Bakery", tag: "New", price: 28.99, oldPrice: 32.99, rating: 4.9, image: item3, stock: 22, description: "Rich artisan chocolate cake made with Belgian chocolate and fresh cream." },
  { id: 13, title: "Assorted Fresh Fruit Basket 3kg", category: "fruits", vendor: "FreshMart", price: 45.0, oldPrice: 52.0, rating: 4.6, image: item4, stock: 65, description: "Beautifully arranged assortment of seasonal fresh fruits." },
  { id: 14, title: "Premium Hazelnut Cookies Pack 500g", category: "snacks", vendor: "Bakery", price: 18.5, oldPrice: 22.0, rating: 4.4, image: item6, stock: 110, description: "Buttery hazelnut cookies baked fresh daily. Perfect with tea or coffee." },
  { id: 15, title: "Crunchy Nut Mix 250gm", category: "snacks", vendor: "Stouffer", price: 14.99, oldPrice: 18.5, rating: 4.3, image: item7, stock: 140, description: "Sweet and salty nut mix - almonds, cashews, peanuts, and hazelnuts." },
];

export const productService = {
  async getCategories() {
    try {
      const { data } = await api.get("/categories");
      return data.data || data;
    } catch (_) {
      await new Promise((r) => setTimeout(r, 400));
      return MOCK_CATEGORIES;
    }
  },

  async getProducts(params = {}) {
    try {
      const { data } = await api.get("/products", { params });
      return data.data || data;
    } catch (_) {
      await new Promise((r) => setTimeout(r, 500));
      let list = [...MOCK_PRODUCTS];
      if (params?.category && params.category !== "all") {
        list = list.filter((p) => p.category === params.category);
      }
      if (params?.search) {
        const q = params.search.toLowerCase();
        list = list.filter(
          (p) => p.title.toLowerCase().includes(q) || p.vendor.toLowerCase().includes(q)
        );
      }
      if (params?.minPrice) list = list.filter((p) => p.price >= params.minPrice);
      if (params?.maxPrice) list = list.filter((p) => p.price <= params.maxPrice);

      if (params?.sort === "price-asc") list.sort((a, b) => a.price - b.price);
      if (params?.sort === "price-desc") list.sort((a, b) => b.price - a.price);
      if (params?.sort === "rating") list.sort((a, b) => b.rating - a.rating);
      return list;
    }
  },

  async getProduct(id) {
    try {
      const { data } = await api.get(`/products/${id}`);
      return data.data || data;
    } catch (_) {
      await new Promise((r) => setTimeout(r, 300));
      return MOCK_PRODUCTS.find((p) => p.id === Number(id)) || MOCK_PRODUCTS[0];
    }
  },

  async getFeaturedProducts() {
    try {
      const { data } = await api.get("/products/featured");
      return data.data || data;
    } catch (_) {
      await new Promise((r) => setTimeout(r, 400));
      return MOCK_PRODUCTS.filter((p) => p.tag).slice(0, 8);
    }
  },

  async getBestSellers() {
    try {
      const { data } = await api.get("/products/best-sellers");
      return data.data || data;
    } catch (_) {
      await new Promise((r) => setTimeout(r, 350));
      return MOCK_PRODUCTS.slice(0, 6);
    }
  },

  async getDeals() {
    try {
      const { data } = await api.get("/products/deals");
      return data.data || data;
    } catch (_) {
      await new Promise((r) => setTimeout(r, 300));
      return MOCK_PRODUCTS.filter((p) => p.oldPrice && p.oldPrice - p.price > 2).slice(0, 6);
    }
  },

  getMock() {
    return { MOCK_PRODUCTS, MOCK_CATEGORIES };
  },
};

export default productService;
