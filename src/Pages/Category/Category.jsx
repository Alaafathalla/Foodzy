import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ChevronRight, Filter, Heart, ShoppingCart, Star, Grid3X3, List } from "lucide-react";
import useCartStore from "../../store/cartStore";
import useWishlistStore from "../../store/wishlistStore";

import item1 from "../../assets/home/item1.png";
import item2 from "../../assets/home/item2.png";
import item3 from "../../assets/home/item3.png";
import item4 from "../../assets/home/item4.png";
import item5 from "../../assets/home/item5.png";
import p1 from "../../assets/products/p1.png";
import p2 from "../../assets/products/p2.png";
import p3 from "../../assets/products/p3.png";
import p4 from "../../assets/products/p4.png";
import p5 from "../../assets/products/p5.png";
import p6 from "../../assets/products/p6.png";
import p7 from "../../assets/products/p7.png";
import p8 from "../../assets/products/p8.png";
import p9 from "../../assets/products/p9.png";

const CATEGORIES = [
  { id: "all", name: "All Products", image: item4, count: 205 },
  { id: "main-dish", name: "Main Dish", image: item1, count: 98 },
  { id: "breakfast", name: "Breakfast", image: item2, count: 62 },
  { id: "dessert", name: "Dessert", image: item3, count: 48 },
  { id: "fruits", name: "Fruits & Vegetables", image: item5, count: 73 },
  { id: "dairy", name: "Milks & Dairies", image: p6, count: 41 },
  { id: "drinks", name: "Coffees & Teas", image: p7, count: 35 },
  { id: "meat", name: "Meats & Seafood", image: p2, count: 29 },
];

const PRODUCTS = [
  { id: 1, title: "Fresh organic villa farm lemon 500gm pack", category: "fruits", vendor: "NestFood", tag: "Hot", price: 28.85, oldPrice: 32.8, rating: 4.0, image: p1 },
  { id: 2, title: "Best snacks with hazel nut pack 200gm", category: "dessert", vendor: "Stouffer", tag: "Sale", price: 52.85, oldPrice: 55.8, rating: 4.5, image: p2 },
  { id: 3, title: "Organic fresh vanilla farm watermelon 5kg", category: "fruits", vendor: "StarKist", tag: "New", price: 48.85, oldPrice: 52.8, rating: 4.0, image: p3 },
  { id: 4, title: "Fresh organic apple 1kg simla marning", category: "fruits", vendor: "NestFood", price: 17.85, oldPrice: 19.8, rating: 4.0, image: p4 },
  { id: 5, title: "Blue Diamond Almonds Lightly Salted Vegetables", category: "breakfast", vendor: "NestFood", tag: "-18%", price: 23.85, oldPrice: 25.8, rating: 4.0, image: p5 },
  { id: 6, title: "Chobani Complete Vanilla Greek Yogurt", category: "dairy", vendor: "NestFood", price: 54.85, oldPrice: 59.8, rating: 4.0, image: p6 },
  { id: 7, title: "Canada Dry Ginger Ale 2L Bottle", category: "drinks", vendor: "NestFood", price: 32.85, oldPrice: 33.8, rating: 4.2, image: p7 },
  { id: 8, title: "Gorton’s Beer Battered Fish Fillets", category: "meat", vendor: "Old El Paso", tag: "Hot", price: 23.85, oldPrice: 25.8, rating: 3.8, image: p8 },
  { id: 9, title: "Haagen-Dazs Caramel Cone Ice Cream", category: "dessert", vendor: "Tyson", price: 22.85, oldPrice: 24.8, rating: 4.1, image: p9 },
  { id: 10, title: "Organic Farm Fresh Eggs Dozen Pack", category: "breakfast", vendor: "FarmFresh", price: 12.99, oldPrice: 14.99, rating: 4.8, image: item2 },
  { id: 11, title: "Premium Beef Steak 1kg Pack", category: "meat", vendor: "ButcherCo", tag: "Sale", price: 39.99, oldPrice: 49.99, rating: 4.7, image: item1 },
  { id: 12, title: "Artisan Chocolate Cake 500g", category: "dessert", vendor: "Bakery", tag: "New", price: 28.99, oldPrice: 32.99, rating: 4.9, image: item3 },
];

function Rating({ value }) {
  const full = Math.round(value);
  return (
    <div className="flex items-center gap-0.5 text-yellow-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} fill={i < full ? "currentColor" : "none"} strokeWidth={1.5} />
      ))}
      <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">({value.toFixed(1)})</span>
    </div>
  );
}

export default function CategoryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [sort, setSort] = useState("popular");
  const [priceRange, setPriceRange] = useState("all");
  const addToCart = useCartStore((state) => state.addToCart);
  const { isInWishlist, toggleWishlist } = useWishlistStore();

  const filteredProducts = useMemo(() => {
    let list = PRODUCTS.filter((p) => selectedCategory === "all" || p.category === selectedCategory);
    
    if (priceRange === "under25") list = list.filter((p) => p.price < 25);
    else if (priceRange === "25to50") list = list.filter((p) => p.price >= 25 && p.price <= 50);
    else if (priceRange === "over50") list = list.filter((p) => p.price > 50);

    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    
    return list;
  }, [selectedCategory, sort, priceRange]);

  const activeCategory = CATEGORIES.find(c => c.id === selectedCategory);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Link to="/" className="hover:text-slate-400 transition">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900 dark:text-white font-medium">Categories</span>
            {selectedCategory !== "all" && (
              <>
                <ChevronRight size={14} />
                <span className="text-slate-300 font-medium">{activeCategory?.name}</span>
              </>
            )}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-10">
          <p className="text-slate-400 font-semibold tracking-wide mb-2">BROWSE BY CATEGORY</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Explore Our Categories
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-2xl">
            Discover fresh groceries, delicious meals, and everyday essentials organized just for you.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`group relative rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                selectedCategory === cat.id
                  ? "border-slate-500 shadow-xl shadow-slate-900/20 scale-[1.02]"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg"
              }`}
            >
              <div className="p-4 bg-white dark:bg-gray-800 h-full">
                <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-slate-500 to-slate-700 flex items-center justify-center shadow-lg shadow-slate-900/20">
                  <img src={cat.image} alt={cat.name} className="w-10 h-10 object-contain" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm text-center line-clamp-1">
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                  {cat.count} items
                </p>
              </div>
              {selectedCategory === cat.id && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-slate-600 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Featured Banner (Active Category) */}
        {selectedCategory !== "all" && activeCategory && (
          <div className="mb-10 rounded-3xl bg-gradient-to-r from-slate-600 to-slate-800 p-8 sm:p-12 overflow-hidden relative">
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-white max-w-lg">
                <p className="text-white/80 font-medium mb-2">{activeCategory.count} Products Available</p>
                <h2 className="text-3xl sm:text-4xl font-bold mb-3">{activeCategory.name}</h2>
                <p className="text-white/90 mb-5">
                  Fresh, high-quality products hand-picked for you. Special discounts available for a limited time!
                </p>
                <button className="bg-white text-gray-900 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition shadow-lg">
                  Shop Now →
                </button>
              </div>
              <div className="w-40 h-40 bg-white/15 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                <img src={activeCategory.image} alt={activeCategory.name} className="w-28 h-28 object-contain" />
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-16 -left-10 w-80 h-80 bg-black/10 rounded-full"></div>
          </div>
        )}

        {/* Filters + Products Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <div className="flex items-center gap-2 mb-5">
                <Filter size={18} className="text-slate-400" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Filters</h3>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Price Range</h4>
                <div className="space-y-2">
                  {[
                    { id: "all", label: "All Prices" },
                    { id: "under25", label: "Under $25" },
                    { id: "25to50", label: "$25 to $50" },
                    { id: "over50", label: "Over $50" },
                  ].map((pr) => (
                    <label key={pr.id} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        checked={priceRange === pr.id}
                        onChange={() => setPriceRange(pr.id)}
                        className="w-4 h-4 text-slate-500 accent-slate-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-slate-400 transition">
                        {pr.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Product Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {["Hot", "Sale", "New", "-18%"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-600 hover:text-slate-700 dark:hover:text-slate-100 cursor-pointer transition"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Promo Card */}
            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-slate-600 to-slate-800 p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Super Deal!</h3>
              <p className="text-white/90 text-sm mb-4">Get 20% off on your first order!</p>
              <p className="text-2xl font-black mb-4">SAVE20</p>
              <button className="w-full bg-white text-slate-700 py-2 rounded-xl font-bold text-sm hover:bg-gray-100 transition">
                Shop Now
              </button>
            </div>
          </aside>

          {/* Products */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {activeCategory?.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {filteredProducts.length} products found
                </p>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                  <option value="rating">Top Rated</option>
                </select>
                <div className="flex rounded-xl border border-gray-300 dark:border-gray-600 overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2.5 ${viewMode === "grid" ? "bg-black text-white dark:bg-white dark:text-black" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300"}`}
                    title="Grid view"
                  >
                    <Grid3X3 size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2.5 ${viewMode === "list" ? "bg-black text-white dark:bg-white dark:text-black" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300"}`}
                    title="List view"
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className={`grid gap-5 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                  : "grid-cols-1"
              }`}>
                {filteredProducts.map((p) => (
                  viewMode === "grid" ? (
                    <ProductCard key={p.id} product={p} onAddToCart={addToCart} isInWishlist={isInWishlist(p.id)} toggleWishlist={() => toggleWishlist(p)} />
                  ) : (
                    <ProductListCard key={p.id} product={p} onAddToCart={addToCart} isInWishlist={isInWishlist(p.id)} toggleWishlist={() => toggleWishlist(p)} />
                  )
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
                <div className="text-6xl mb-4">🛒</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No products found</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">Try adjusting your filters to find what you need.</p>
                <button
                  onClick={() => { setSelectedCategory("all"); setPriceRange("all"); }}
                  className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, onAddToCart, isInWishlist, toggleWishlist }) {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/products/${product.id}`, { state: { product } })} className="group cursor-pointer rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative bg-gray-50 dark:bg-gray-900 p-5 aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
        />
        {product.tag && (
          <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-lg ${
            product.tag === "Hot" ? "bg-slate-600 text-white" :
            product.tag === "Sale" ? "bg-orange-500 text-white" :
            product.tag === "New" ? "bg-green-500 text-white" :
            "bg-yellow-500 text-black"
          }`}>
            {product.tag}
          </span>
        )}
        <button
          onClick={(event) => { event.stopPropagation(); toggleWishlist(); }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-xl flex items-center justify-center shadow-md transition ${
            isInWishlist
              ? "bg-slate-600 text-white"
              : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-slate-500"
          }`}
        >
          <Heart size={16} fill={isInWishlist ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="p-5">
        <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1 capitalize">{product.category.replace("-", " ")}</p>
        <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2 h-11">
          {product.title}
        </h3>
        <Rating value={product.rating} />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 mb-3">
          By <span className="text-green-600 font-medium">{product.vendor}</span>
        </p>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              ${product.price.toFixed(2)}
            </span>
            {product.oldPrice && (
              <span className="text-sm text-gray-400 line-through ml-2">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>
          <button
            onClick={(event) => { event.stopPropagation(); onAddToCart(product); }}
            className="w-10 h-10 rounded-xl bg-black hover:bg-slate-600 text-white flex items-center justify-center transition"
            title="Add to Cart"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductListCard({ product, onAddToCart, isInWishlist, toggleWishlist }) {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/products/${product.id}`, { state: { product } })} className="group cursor-pointer rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col sm:flex-row gap-0">
        <div className="relative bg-gray-50 dark:bg-gray-900 p-5 sm:w-56 aspect-square sm:aspect-auto overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
          {product.tag && (
            <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-lg ${
              product.tag === "Hot" ? "bg-slate-600 text-white" :
              product.tag === "Sale" ? "bg-orange-500 text-white" :
              product.tag === "New" ? "bg-green-500 text-white" :
              "bg-yellow-500 text-black"
            }`}>
              {product.tag}
            </span>
          )}
        </div>

        <div className="flex-1 p-5 sm:p-6 flex flex-col">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1 capitalize">{product.category.replace("-", " ")}</p>
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
            {product.title}
          </h3>
          <Rating value={product.rating} />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 mb-4">
            By <span className="text-green-600 font-medium">{product.vendor}</span>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-5 flex-1 line-clamp-2">
            Fresh, high-quality product from trusted vendors. Perfect for your daily grocery needs.
          </p>

          <div className="flex items-center justify-between gap-4 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
            <div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                ${product.price.toFixed(2)}
              </span>
              {product.oldPrice && (
                <span className="text-sm text-gray-400 line-through ml-2">
                  ${product.oldPrice.toFixed(2)}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(event) => { event.stopPropagation(); toggleWishlist(); }}
                className={`w-11 h-11 rounded-xl border-2 flex items-center justify-center transition ${
                  isInWishlist
                    ? "border-slate-500 bg-slate-50 text-slate-600 dark:bg-slate-900/30 dark:text-slate-300"
                    : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-slate-500 hover:text-slate-500"
                }`}
              >
                <Heart size={18} fill={isInWishlist ? "currentColor" : "none"} />
              </button>
              <button
                onClick={(event) => { event.stopPropagation(); onAddToCart(product); }}
                className="px-6 py-3 rounded-xl bg-black hover:bg-slate-600 text-white font-semibold flex items-center gap-2 transition"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}