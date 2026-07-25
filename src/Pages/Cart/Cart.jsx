import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, Truck, Shield, Headphones, ChevronRight } from "lucide-react";
import useCartStore from "../../store/cartStore";
import cart6 from "../../assets/cart/6.png";
import cart7 from "../../assets/cart/7.png";
import cart8 from "../../assets/cart/8.png";
import cart9 from "../../assets/cart/9.png";

const popularProducts = [
  {
    id: 201,
    title: "Best snacks with hazel nut mix pack 200gm",
    price: 120.25,
    oldPrice: 123.0,
    image: cart6,
    tag: "Snacks",
  },
  {
    id: 202,
    title: "Sweet snacks crunchy nut mix 250gm pack",
    price: 100.0,
    oldPrice: 110.0,
    image: cart7,
    tag: "Snacks",
  },
  {
    id: 203,
    title: "Best snacks with hazel nut mix pack 200gm",
    price: 120.25,
    oldPrice: 123.0,
    image: cart8,
    tag: "Snacks",
  },
  {
    id: 204,
    title: "Sweet snacks crunchy nut mix 250gm pack",
    price: 100.0,
    oldPrice: 110.0,
    image: cart9,
    tag: "Snacks",
  },
];

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, addToCart } = useCartStore();
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const subtotal = useMemo(
    () => cart.reduce((s, it) => s + it.price * it.qty, 0),
    [cart]
  );

  const discount = useMemo(
    () => couponApplied ? Math.round(subtotal * 0.1 * 100) / 100 : 0,
    [subtotal, couponApplied]
  );

  const shipping = subtotal > 200 ? 0 : 10;
  const tax = Math.round((subtotal - discount) * 0.05 * 100) / 100;
  const total = subtotal - discount + shipping + tax;

  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === "SAVE10") {
      setCouponApplied(true);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Link to="/" className="hover:text-red-500 transition">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900 dark:text-white font-medium">Shopping Cart</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Features Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { icon: Truck, title: "Free Shipping", desc: "On orders over $200" },
            { icon: Shield, title: "Secure Payment", desc: "100% secure checkout" },
            { icon: Headphones, title: "24/7 Support", desc: "Dedicated support" },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500">
                <f.icon size={22} />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{f.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <ShoppingBag size={22} />
                    Shopping Cart ({cart.length})
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-sm text-red-500 hover:text-red-600 font-medium transition"
                  >
                    Clear All
                  </button>
                </div>

                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {cart.map((item) => (
                    <div key={item.id} className="px-6 py-5">
                      <div className="flex flex-col sm:flex-row items-start gap-5">
                        <div className="w-full sm:w-24 h-24 rounded-xl bg-gray-50 dark:bg-gray-900 flex-shrink-0 overflow-hidden border border-gray-200 dark:border-gray-700">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-contain p-2"
                          />
                        </div>

                        <div className="flex-1 w-full">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                            <div className="flex-1">
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                {item.category || "Grocery"}
                              </p>
                              <h3 className="font-semibold text-gray-900 dark:text-white text-base">
                                {item.title}
                              </h3>
                              <p className="text-red-500 font-bold text-lg mt-1">
                                ${item.price.toFixed(2)}
                              </p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition self-start"
                              aria-label="remove item"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>

                          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="inline-flex items-center rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 overflow-hidden">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 min-w-[50px] text-center">
                                {item.qty}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                              >
                                <Plus size={14} />
                              </button>
                            </div>

                            <div className="text-right">
                              <p className="text-xs text-gray-500 dark:text-gray-400">Subtotal</p>
                              <p className="text-xl font-bold text-gray-900 dark:text-white">
                                ${(item.price * item.qty).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coupon */}
              <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  Apply Coupon
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Enter coupon code to get discounts. Try <span className="font-semibold text-red-500">SAVE10</span> for 10% off!
                </p>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <button
                    onClick={applyCoupon}
                    className={`px-6 py-3 rounded-xl font-semibold text-sm transition ${
                      couponApplied
                        ? "bg-green-500 text-white"
                        : "bg-black hover:bg-gray-800 text-white"
                    }`}
                    disabled={couponApplied}
                  >
                    {couponApplied ? "✓ Applied" : "Apply"}
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm p-6 sticky top-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-5">
                  Order Summary
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Shipping</span>
                    <span className={`font-semibold ${shipping === 0 ? "text-green-500" : "text-gray-900 dark:text-white"}`}>
                      {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Tax (5%)</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ${tax.toFixed(2)}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-green-600 font-medium">Discount (10%)</span>
                      <span className="font-semibold text-green-600">
                        -${discount.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 mt-5 pt-5 mb-5">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                    <span className="text-2xl font-bold text-red-500">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Link to="/checkout" className="block">
                  <button className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl font-bold text-base transition shadow-lg shadow-red-500/20">
                    Proceed to Checkout
                  </button>
                </Link>

                <Link to="/products" className="block mt-3">
                  <button className="w-full border-2 border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-white text-gray-900 dark:text-white py-3 rounded-xl font-semibold text-sm transition">
                    Continue Shopping
                  </button>
                </Link>

                <div className="mt-5 flex items-center justify-center gap-3">
                  <div className="text-xs text-gray-400 dark:text-gray-500">Secure Checkout</div>
                </div>
                <div className="mt-2 flex justify-center gap-2 text-gray-400 dark:text-gray-500 text-xs">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">VISA</span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">MC</span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">AMEX</span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">PAYPAL</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm text-center py-20">
            <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-700 mx-auto flex items-center justify-center mb-6">
              <ShoppingBag size={48} className="text-gray-400 dark:text-gray-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Your Cart is Empty
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Looks like you haven't added any products to your cart yet. Start shopping to fill it up!
            </p>
            <Link to="/products">
              <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl font-bold transition shadow-lg shadow-red-500/20">
                Start Shopping
              </button>
            </Link>
          </div>
        )}

        {/* Popular Products */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              You May Also Like
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Don't miss out on these popular products
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map((p) => (
              <ProductCard key={p.id} product={p} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="group rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden hover:shadow-xl transition duration-300">
      <div className="relative bg-gray-50 dark:bg-gray-900 p-4">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-contain group-hover:scale-105 transition duration-300"
        />
        {product.oldPrice && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -${(product.oldPrice - product.price).toFixed(0)}
          </span>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs text-red-500 font-semibold mb-1">{product.tag}</p>
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white line-clamp-2 mb-3 h-10">
          {product.title}
        </h3>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-red-500 font-bold text-lg">
            ${product.price.toFixed(2)}
          </span>
          {product.oldPrice && (
            <span className="text-xs text-gray-400 line-through">
              ${product.oldPrice.toFixed(2)}
            </span>
          )}
        </div>

        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-black group-hover:bg-red-500 text-white py-2.5 rounded-xl font-semibold text-sm transition duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
