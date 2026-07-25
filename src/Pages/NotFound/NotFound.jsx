import React from "react";
import { Link } from "react-router-dom";
import { Home, Search, ShoppingBag } from "lucide-react";

export default function NotFoundPage() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      <div className="relative max-w-4xl mx-auto text-center w-full">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <h1 className="text-[200px] sm:text-[300px] font-black text-gray-100 dark:text-gray-800 leading-none tracking-tighter">
            404
          </h1>
        </div>

        <div className="relative z-10">
          <div className="inline-block w-24 h-24 rounded-3xl bg-gradient-to-br from-red-500 to-orange-500 shadow-2xl shadow-red-500/30 flex items-center justify-center text-white mb-8 rotate-6 hover:rotate-0 transition-transform duration-500">
            <Search size={48} strokeWidth={2.2} />
          </div>

          <h2 className="relative z-10 text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-10">
            Oops! The page you are looking for doesn't exist or has been moved.
            Let's get you back to shopping!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white hover:border-black dark:hover:border-white font-bold transition">
                <Home size={18} /> Back to Home
              </button>
            </Link>
            <Link to="/products">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold transition shadow-2xl shadow-red-500/30 hover:shadow-red-500/50 hover:-translate-y-0.5">
                <ShoppingBag size={18} /> Browse Products
              </button>
            </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left max-w-3xl mx-auto relative z-10">
          {[
            { num: "01", title: "Check the URL", desc: "Make sure the URL is spelled correctly." },
            { num: "02", title: "Clear cache", desc: "Try clearing your browser cache and cookies." },
            { num: "03", title: "Contact us", desc: "If the issue persists, reach out to our support team." },
          ].map((t, i) => (
            <div key={i} className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 hover:border-red-500 dark:hover:border-red-500 transition">
              <span className="text-xs font-black text-red-500 mb-2 block">{t.num}</span>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">{t.title}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
