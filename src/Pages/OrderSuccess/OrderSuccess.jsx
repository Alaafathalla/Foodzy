import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { CheckCircle, Package, Truck, CreditCard, ChevronRight, Home, ShoppingBag, Receipt } from "lucide-react";

export default function OrderSuccessPage() {
  const location = useLocation();
  const orderId = location.state?.orderId || "ORD-" + Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
  const total = location.state?.total ?? 0;
  const trackingNo = "TRK" + Math.floor(Math.random() * 900000000 + 100000000);

  const steps = [
    { icon: CheckCircle, title: "Order Confirmed", desc: "Your order has been placed successfully", done: true },
    { icon: Package, title: "Packing", desc: "Your items are being packed", done: true, active: true },
    { icon: Truck, title: "Shipping", desc: "Your order will ship soon", done: false },
    { icon: CreditCard, title: "Delivered", desc: "Expected in 3-5 days", done: false },
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-2xl shadow-green-500/30 mb-6 animate-bounce">
            <CheckCircle size={64} className="text-white" strokeWidth={2} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-3">
            Order Placed! 🎉
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            Thank you for shopping with Foodzy. Your order is confirmed and will be on its way soon.
          </p>
        </div>

        <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden mb-8 shadow-xl">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-6 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-white/80 text-sm font-medium mb-1">Order Number</p>
                <p className="text-2xl font-black font-mono">{orderId}</p>
              </div>
              <div className="sm:text-right">
                <p className="text-white/80 text-sm font-medium mb-1">Total Amount Paid</p>
                <p className="text-2xl font-black">${total.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="rounded-2xl bg-gray-50 dark:bg-gray-900 p-5 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
                  <Receipt size={16} />
                  <span className="text-xs font-bold uppercase tracking-wide">Tracking No.</span>
                </div>
                <p className="text-lg font-bold text-gray-900 dark:text-white font-mono">{trackingNo}</p>
              </div>
              <div className="rounded-2xl bg-gray-50 dark:bg-gray-900 p-5 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
                  <Truck size={16} />
                  <span className="text-xs font-bold uppercase tracking-wide">Estimated Delivery</span>
                </div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">3 – 5 Business Days</p>
              </div>
            </div>

            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-6">Order Progress</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {steps.map((step, i) => (
                <div key={i} className="relative">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 ${
                    step.done
                      ? "bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-400"
                  }`}>
                    <step.icon size={26} fill={step.active ? "currentColor" : "none"} />
                  </div>
                  <p className={`text-center text-sm font-bold mb-1 ${
                    step.done ? "text-gray-900 dark:text-white" : "text-gray-400"
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-center text-xs text-gray-500 dark:text-gray-400">{step.desc}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 p-5 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-blue-500 flex-shrink-0 flex items-center justify-center text-white">
                <Package size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 dark:text-white mb-1">What's Next?</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  A confirmation email with your order details and tracking information has been sent to your email address.
                  You can track your order status from your account at any time.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white hover:border-black dark:hover:border-white font-bold transition">
              <Home size={18} /> Back to Home
            </button>
          </Link>
          <Link to="/products">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold transition shadow-2xl shadow-red-500/30 hover:shadow-red-500/50 hover:-translate-y-0.5">
              <ShoppingBag size={18} /> Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
