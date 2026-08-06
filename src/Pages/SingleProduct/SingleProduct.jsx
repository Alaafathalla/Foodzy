import React, { useMemo, useState } from "react";
import { Heart, Minus, Plus, Share2, ShoppingCart, Star } from "lucide-react";
import { useLocation } from "react-router-dom";
import productFallback from "../../assets/products/p7.png";
import useCartStore from "../../store/cartStore";
import useWishlistStore from "../../store/wishlistStore";
import { notify } from "../../Components/Toast/ToastProvider";

export default function SingleProduct() {
  const location = useLocation();
  const selectedProduct = location.state?.product || {};
  const addToCart = useCartStore((state) => state.addToCart);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist);

  const currentProduct = useMemo(
    () => ({
      id: selectedProduct.id ?? 7,
      title: selectedProduct.title || selectedProduct.name || "Seeds Of Change Organic Quinoa, Brown",
      name: selectedProduct.name || selectedProduct.title || "Seeds Of Change Organic Quinoa, Brown",
      image: selectedProduct.image || productFallback,
      price: Number(selectedProduct.price ?? 120.25),
      oldPrice: Number(selectedProduct.oldPrice ?? 123.25),
      rating: Number(selectedProduct.rating ?? 4.8),
      vendor: selectedProduct.vendor || "Foodzy Fresh Market",
      category: selectedProduct.category || "Organic Food",
    }),
    [selectedProduct]
  );

  const gallery = [currentProduct.image, currentProduct.image, currentProduct.image, currentProduct.image];
  const [activeImg, setActiveImg] = useState(0);
  const [sizeSel, setSizeSel] = useState("100g");
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("description");
  const favorite = isInWishlist(currentProduct.id);

  const specs = [
    ["Brand", currentProduct.vendor],
    ["Category", currentProduct.category],
    ["Diet type", "Vegetarian"],
    ["Origin", "Locally sourced"],
    ["Storage", "Keep in a cool, dry place"],
  ];

  const handleShare = async () => {
    try {
      if (navigator.share) await navigator.share({ title: currentProduct.title, url: window.location.href });
      else await navigator.clipboard.writeText(window.location.href);
      notify("Product link copied successfully", "success");
    } catch (_) {}
  };

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-8 text-gray-900 transition-colors dark:bg-gray-950 dark:text-white sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <p className="text-sm font-semibold text-red-500">Products / {currentProduct.category}</p>
          <h1 className="mt-2 text-2xl font-black sm:text-3xl">Product details</h1>
        </div>

        <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="order-2 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 xl:order-1">
            <h2 className="text-lg font-black">Why shop with Foodzy?</h2>
            <div className="mt-5 space-y-4 text-sm text-gray-600 dark:text-gray-300">
              {["Fresh products checked daily", "Secure checkout and payments", "Fast delivery from nearby stores", "Easy return and support process"].map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl bg-gray-50 p-3 dark:bg-gray-800/70">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-dashed border-red-300 bg-red-50 p-4 dark:border-red-500/40 dark:bg-red-500/10">
              <p className="text-xs font-bold uppercase tracking-wider text-red-500">Today only</p>
              <p className="mt-2 font-black">Free delivery on orders above $80</p>
            </div>
          </aside>

          <div className="order-1 space-y-6 xl:order-2">
            <div className="grid gap-6 rounded-3xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6 lg:grid-cols-2 lg:p-8">
              <div className="min-w-0">
                <div className="flex min-h-[320px] items-center justify-center rounded-3xl bg-gray-50 p-5 dark:bg-gray-800/70 sm:min-h-[420px]">
                  <img src={gallery[activeImg]} alt={currentProduct.title} className="max-h-[380px] w-full object-contain" />
                </div>
                <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                  {gallery.map((src, index) => (
                    <button
                      type="button"
                      key={index}
                      onClick={() => setActiveImg(index)}
                      className={`h-20 w-20 shrink-0 rounded-2xl border bg-gray-50 p-2 transition dark:bg-gray-800 ${activeImg === index ? "border-red-500 ring-2 ring-red-500/20" : "border-gray-200 dark:border-gray-700"}`}
                    >
                      <img src={src} alt="Product preview" className="h-full w-full object-contain" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <span className="w-fit rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-500/10 dark:text-green-400">In stock</span>
                <h2 className="mt-4 text-2xl font-black leading-tight sm:text-3xl">{currentProduct.title}</h2>
                <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
                  A carefully selected product with reliable quality, clear product information, and fast delivery from trusted Foodzy sellers.
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <div className="flex text-amber-400">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={17} fill="currentColor" />)}</div>
                  <span className="text-sm font-bold">{currentProduct.rating.toFixed(1)}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">(75 customer reviews)</span>
                </div>

                <div className="mt-6 flex items-end gap-3">
                  <span className="text-3xl font-black text-red-500">${currentProduct.price.toFixed(2)}</span>
                  <span className="pb-1 text-sm text-gray-400 line-through">${currentProduct.oldPrice.toFixed(2)}</span>
                </div>

                <div className="mt-6">
                  <p className="mb-3 text-sm font-bold">Choose size</p>
                  <div className="flex flex-wrap gap-2">
                    {["50g", "80g", "100g", "200g"].map((size) => (
                      <button type="button" key={size} onClick={() => setSizeSel(size)} className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${sizeSel === size ? "border-red-500 bg-red-500 text-white" : "border-gray-200 bg-white text-gray-700 hover:border-red-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"}`}>{size}</button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-1 dark:border-gray-700 dark:bg-gray-800 sm:w-36">
                    <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="rounded-lg p-2 hover:bg-white dark:hover:bg-gray-700"><Minus size={17} /></button>
                    <span className="font-black">{qty}</span>
                    <button type="button" onClick={() => setQty((q) => Math.min(99, q + 1))} className="rounded-lg p-2 hover:bg-white dark:hover:bg-gray-700"><Plus size={17} /></button>
                  </div>
                  <button type="button" onClick={() => addToCart(currentProduct, qty)} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-3 font-bold text-white transition hover:bg-red-600"><ShoppingCart size={19} /> Add to cart</button>
                  <button type="button" onClick={() => toggleWishlist(currentProduct)} className={`inline-flex h-12 w-12 items-center justify-center rounded-xl border transition ${favorite ? "border-red-500 bg-red-500 text-white" : "border-gray-200 bg-white text-gray-600 hover:text-red-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"}`}><Heart size={20} fill={favorite ? "currentColor" : "none"} /></button>
                  <button type="button" onClick={handleShare} className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition hover:text-red-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"><Share2 size={20} /></button>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-7">
              <div className="flex gap-2 overflow-x-auto border-b border-gray-200 dark:border-gray-800">
                {[['description','Description'], ['information','Information'], ['review','Reviews']].map(([id, label]) => (
                  <button type="button" key={id} onClick={() => setTab(id)} className={`shrink-0 border-b-2 px-3 pb-4 text-sm font-bold ${tab === id ? "border-red-500 text-red-500" : "border-transparent text-gray-500 dark:text-gray-400"}`}>{label}</button>
                ))}
              </div>
              <div className="pt-6 text-sm leading-7 text-gray-600 dark:text-gray-300">
                {tab === "description" && <><p>This product is selected to deliver dependable quality, convenient packaging, and a smooth everyday shopping experience.</p><h3 className="mt-5 font-black text-gray-900 dark:text-white">Packaging & delivery</h3><p className="mt-2">Items are securely packed and handled carefully throughout preparation and delivery.</p></>}
                {tab === "information" && <div className="grid gap-3 sm:grid-cols-2">{specs.map(([key, value]) => <div key={key} className="flex justify-between gap-4 rounded-xl bg-gray-50 p-3 dark:bg-gray-800"><span className="font-bold text-gray-900 dark:text-white">{key}</span><span className="text-right">{value}</span></div>)}</div>}
                {tab === "review" && <div className="rounded-2xl bg-gray-50 p-5 dark:bg-gray-800"><p className="font-bold text-gray-900 dark:text-white">Excellent quality and fast delivery</p><p className="mt-2">Customers appreciate the fresh condition, accurate description, and secure packaging.</p></div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
