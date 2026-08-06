import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, Star, Sparkles, ArrowRight } from 'lucide-react';
import product1 from "../../assets/home/product1.png";
import product2 from "../../assets/home/product2.png";
import product3 from "../../assets/home/product3.png";
import product4 from "../../assets/home/product4.png";
import p1 from "../../assets/products/p1.png";
import useCartStore from "../../store/cartStore";
import useWishlistStore from "../../store/wishlistStore";

const products = [
  { id: "db-1", title: "Aegle marmelos Fruit", price: 32.0, oldPrice: 40.0, rating: 4.6, vendor: "NestFood", tag: "Hot", category: "Fruits", image: product1 },
  { id: "db-2", title: "Organic Tomato Chips", price: 18.0, oldPrice: 25.0, rating: 4.3, vendor: "Stouffer", tag: "Sale", category: "Snacks", image: product2 },
  { id: "db-3", title: "Toasted Turmeric Crispy", price: 22.0, oldPrice: 28.0, rating: 4.5, vendor: "FarmFresh", tag: "New", category: "Snacks", image: product3 },
  { id: "db-4", title: "Avocado Lighting", price: 16.0, oldPrice: 20.0, rating: 4.2, vendor: "FreshMart", category: "Fruits", image: product4 },
  { id: "db-5", title: "Fresh Organic Lemon 500gm", price: 28.85, oldPrice: 32.8, rating: 4.0, vendor: "NestFood", tag: "-15%", category: "Fruits", image: p1 },
];

function Rating({ value }) {
  const full = Math.round(value);
  return (
    <div className="flex items-center gap-0.5 text-yellow-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={13} fill={i < full ? "currentColor" : "none"} strokeWidth={1.5} />
      ))}
      <span className="ml-1.5 text-[11px] text-gray-500 dark:text-gray-400 font-semibold">({value.toFixed(1)})</span>
    </div>
  );
}

export default function DailyBestsellers() {
  const navigate = useNavigate();
  const addToCart = useCartStore((s) => s.addToCart);
  const { isInWishlist, toggleWishlist } = useWishlistStore();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-red-500 font-bold tracking-[0.2em] text-xs uppercase mb-3">
              <Sparkles size={16} />
              <span>DAILY PICKS</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-800 dark:text-white">
              Daily Best Sellers
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-base max-w-xl">
              Top-rated products our customers are loving right now
            </p>
          </div>
          <Link to="/products" className="group inline-flex items-center gap-2 font-semibold text-red-500 hover:text-red-600 transition self-start sm:self-end">
            View All Products
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Promo card */}
          <div className="lg:col-span-1 relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700 text-white p-7 shadow-2xl min-h-[320px] flex flex-col justify-between group">
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white/10 blur-3xl group-hover:bg-white/20 transition" />
            <div className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full bg-yellow-300/20 blur-2xl" />

            <div className="relative z-10">
              <span className="inline-block bg-yellow-300 text-yellow-950 text-[11px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full mb-5">
                🌿 New Collection
              </span>
              <h3 className="text-2xl sm:text-3xl font-black leading-tight mb-2">
                Bring Nature Into Your Home
              </h3>
              <p className="text-white/80 text-sm">
                100% natural, hand-picked fresh products delivered daily.
              </p>
            </div>

            <div className="relative z-10 space-y-4">
              <div className="flex items-end gap-2">
                <span className="text-5xl font-black">30%</span>
                <span className="text-sm font-bold pb-2 text-yellow-200 uppercase tracking-wider">OFF</span>
              </div>
              <Link to="/products">
                <button className="w-full flex items-center justify-center gap-2 bg-white text-green-700 hover:bg-yellow-300 hover:text-green-800 font-bold py-3.5 rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                  Shop Now
                  <ArrowRight size={18} />
                </button>
              </Link>
            </div>
          </div>

          {/* Product cards */}
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {products.map((p) => {
              const inWishlist = isInWishlist(p.id);
              const discount = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;
              return (
                <div
                  key={p.id}
                  onClick={() => navigate(`/products/${p.id}`, { state: { product: p } })}
                  className="group cursor-pointer relative bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                    {p.tag && (
                      <span className={`absolute left-3 top-3 z-10 text-[11px] font-bold px-2.5 py-1 rounded-full shadow ${
                        p.tag === "Hot" ? "bg-red-500 text-white" :
                        p.tag === "Sale" ? "bg-orange-500 text-white" :
                        p.tag === "New" ? "bg-green-500 text-white" :
                        "bg-yellow-500 text-black"
                      }`}>
                        {p.tag}
                      </span>
                    )}
                    {discount > 0 && !p.tag && (
                      <span className="absolute left-3 top-3 z-10 text-[11px] font-bold px-2.5 py-1 rounded-full bg-red-500 text-white shadow">
                        -{discount}%
                      </span>
                    )}
                    <button
                      onClick={(event) => { event.stopPropagation(); toggleWishlist(p); }}
                      aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                      className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center shadow transition-all duration-300 hover:scale-110 ${
                        inWishlist
                          ? "bg-red-500 text-white"
                          : "bg-white/95 dark:bg-gray-800/95 text-gray-600 dark:text-gray-300 hover:text-red-500"
                      }`}
                    >
                      <Heart size={16} fill={inWishlist ? "currentColor" : "none"} />
                    </button>

                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-contain p-3 group-hover:scale-110 transition-transform duration-700 ease-out"
                    />

                    {/* Quick Add */}
                    <button
                      type="button"
                      onClick={(event) => { event.stopPropagation(); addToCart(p); }}
                      className="absolute bottom-3 left-1/2 z-10 inline-flex min-w-[132px] -translate-x-1/2 translate-y-2 items-center justify-center gap-2 rounded-full bg-red-500 px-5 py-2.5 text-xs font-bold text-white opacity-0 shadow-lg transition-all duration-300 hover:bg-red-600 hover:shadow-xl group-hover:translate-y-0 group-hover:opacity-100 active:scale-95"
                    >
                      <ShoppingCart size={14} />
                      Add to Cart
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-2">
                    <p className="text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">{p.category}</p>
                    <h4 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white line-clamp-2 leading-snug min-h-[44px]">
                      {p.title}
                    </h4>
                    <Rating value={p.rating} />
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      By <span className="text-green-600 dark:text-green-400 font-semibold">{p.vendor}</span>
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-red-500 font-black text-lg">${p.price.toFixed(2)}</span>
                        {p.oldPrice && <span className="text-xs text-gray-400 line-through">${p.oldPrice.toFixed(2)}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
