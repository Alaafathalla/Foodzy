import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Star, Plus, Tag, Heart, ShoppingCart, Loader2 } from "lucide-react";
import useCartStore from "../../store/cartStore";
import useWishlistStore from "../../store/wishlistStore";
import { productService } from "../../services";

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

function ProductCard({ p, onAdd, isInWishlist, toggleWishlist }) {
  const navigate = useNavigate();
  return (
    <div className="group rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800 mb-3">
        {p.tag && (
          <span className={`absolute left-2 top-2 text-[11px] font-bold px-2 py-0.5 rounded-full ${
            p.tag === "Hot" ? "bg-red-500 text-white" :
            p.tag === "Sale" ? "bg-orange-500 text-white" :
            p.tag === "New" ? "bg-green-500 text-white" :
            "bg-yellow-500 text-black"
          }`}>
            {p.tag}
          </span>
        )}
        <button
          onClick={toggleWishlist}
          className={`absolute right-2 top-2 w-8 h-8 rounded-lg flex items-center justify-center shadow transition ${
            isInWishlist
              ? "bg-red-500 text-white"
              : "bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:text-red-500"
          }`}
        >
          <Heart size={14} fill={isInWishlist ? "currentColor" : "none"} />
        </button>
        <img src={p.image} alt={p.title} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 p-2" />
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{p.category?.replace("-", " ")}</p>
      <h3 className="mt-1 text-sm font-semibold text-gray-800 dark:text-white line-clamp-2 h-10">
        {p.title}
      </h3>

      <div className="mt-1">
        <Rating value={p.rating || 4} />
      </div>

      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        By <span className="text-green-600 font-medium">{p.vendor}</span>
      </p>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-red-500 font-bold text-lg">${(p.price || 0).toFixed(2)}</span>
          {p.oldPrice && <span className="text-xs text-gray-400 line-through">${p.oldPrice.toFixed(2)}</span>}
        </div>
        <button
          onClick={() => {
            onAdd(p);
            navigate("/cart");
          }}
          className="inline-flex items-center gap-1 text-sm bg-black hover:bg-red-500 text-white rounded-xl px-3 py-2 transition"
        >
          <ShoppingCart size={14} />
          Add
        </button>
      </div>
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
      <div className="aspect-[4/3] rounded-xl bg-gray-100 dark:bg-gray-800 mb-3 animate-pulse" />
      <div className="h-3 w-1/3 rounded-full bg-gray-100 dark:bg-gray-800 mb-2 animate-pulse" />
      <div className="h-4 w-full rounded-full bg-gray-100 dark:bg-gray-800 mb-2 animate-pulse" />
      <div className="h-4 w-3/4 rounded-full bg-gray-100 dark:bg-gray-800 mb-2 animate-pulse" />
      <div className="h-3 w-1/2 rounded-full bg-gray-100 dark:bg-gray-800 mb-3 animate-pulse" />
      <div className="flex justify-between items-center">
        <div className="h-5 w-20 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
        <div className="h-9 w-20 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("popular");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore((state) => state.addToCart);
  const { isInWishlist, toggleWishlist } = useWishlistStore();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const cats = await productService.getCategories();
        const prods = await productService.getProducts({
          category: active === "all" ? undefined : active,
          search: query || undefined,
          sort,
        });
        setCategories(cats);
        setProducts(prods);
      } finally {
        setLoading(false);
      }
    })();
  }, [active, query, sort]);

  const catTabs = useMemo(() => {
    const tabs = [{ id: "all", name: "All" }, ...categories.map(c => ({ id: c.id, name: c.name }))];
    return tabs.length > 1 ? tabs : [
      { id: "all", name: "All" },
      { id: "main-dish", name: "Main Dish" },
      { id: "breakfast", name: "Breakfast" },
      { id: "dessert", name: "Dessert" },
      { id: "fruits", name: "Fruits" },
      { id: "dairy", name: "Dairy" },
      { id: "drinks", name: "Drinks" },
    ];
  }, [categories]);

  const filtered = useMemo(() => {
    let list = products;
    if (active !== "all") list = list.filter(p => p.category === active);
    if (query) list = list.filter(p => p.title?.toLowerCase().includes(query.toLowerCase()));
    if (sort === "alpha") list = [...list].sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    return list;
  }, [products, active, query, sort]);

  const handleAdd = (p) => addToCart(p);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Popular Products
          </h2>
          {!loading && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Showing {filtered.length} products
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="popular">Most popular</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Top Rated</option>
            <option value="alpha">Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Categories (tabs) */}
      <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
        {catTabs.map((c) => (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              active === c.id
                ? "bg-red-500 text-white shadow-lg shadow-red-500/25"
                : "border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Tag filter demo */}
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {["Hot", "Sale", "New"].map((t) => (
          <span
            key={t}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
          >
            <Tag size={12} /> {t}
          </span>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              p={p}
              onAdd={handleAdd}
              isInWishlist={isInWishlist(p.id)}
              toggleWishlist={() => toggleWishlist(p)}
            />
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center py-16">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400">
            <ShoppingCart size={36} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No products found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
            Try adjusting your filters or search query to find the products you're looking for.
          </p>
          <button
            onClick={() => { setActive("all"); setQuery(""); }}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
}
