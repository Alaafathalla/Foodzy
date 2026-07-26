import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { BadgePercent, Truck, Gift, ShoppingBag, Undo2, Headphones, Mail, ArrowRight } from 'lucide-react';
import ctaGuy from '../../assets/home/delivery.png';

const features = [
  { icon: <BadgePercent size={26} />, color: "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400", title: "Best prices & offers", desc: "Orders $50 or more" },
  { icon: <Truck size={26} />, color: "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400", title: "Free delivery", desc: "24/7 amazing services" },
  { icon: <Gift size={26} />, color: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400", title: "Great daily deal", desc: "When you sign up" },
  { icon: <ShoppingBag size={26} />, color: "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400", title: "Wide assortment", desc: "Mega Discounts" },
  { icon: <Undo2 size={26} />, color: "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400", title: "Easy returns", desc: "Within 30 days" },
  { icon: <Headphones size={26} />, color: "bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400", title: "24/7 Support", desc: "Help you anytime" },
];

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = (e) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setSubscribed(true);
      setTimeout(() => { setSubscribed(false); setEmail(""); }, 3000);
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-14">
        {/* CTA Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 dark:from-gray-800 dark:via-gray-700 dark:to-black shadow-2xl">
          {/* Decorative blurs */}
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-red-500/20 blur-3xl" />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-8 p-8 sm:p-10 lg:p-14">
            <div className="space-y-6 max-w-xl">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-white text-xs font-bold uppercase tracking-wider">
                ✨ Newsletter
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                Stay home & get your{" "}
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  daily needs
                </span>{" "}
                from our shop
              </h2>

              <p className="text-white/70 text-base sm:text-lg max-w-lg">
                Start Your Daily Shopping with <span className="text-green-400 font-semibold">Foodzy</span> and get amazing deals delivered straight to your inbox.
              </p>

              {/* Subscription Input */}
              <form onSubmit={subscribe} className="flex flex-col sm:flex-row items-stretch gap-3 w-full max-w-lg">
                <div className="flex-1 flex items-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-white/10">
                  <div className="pl-4 text-gray-400">
                    <Mail size={20} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="flex-1 px-3 py-3.5 text-sm text-gray-700 dark:text-white bg-transparent placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={subscribed}
                  className={`px-7 py-3.5 rounded-2xl font-bold transition-all duration-300 text-white shadow-xl ${
                    subscribed
                      ? "bg-green-500 shadow-green-500/30"
                      : "bg-red-500 hover:bg-red-600 shadow-red-500/30 hover:shadow-red-500/50 hover:-translate-y-0.5"
                  }`}
                >
                  {subscribed ? "✓ Subscribed!" : (
                    <span className="flex items-center gap-2">
                      Subscribe <ArrowRight size={16} />
                    </span>
                  )}
                </button>
              </form>

              <p className="text-xs text-white/50">
                🛡️ 100% Privacy Protected. Unsubscribe anytime.
              </p>
            </div>

            {/* Right Image */}
            <div className="relative hidden lg:flex items-end justify-end">
              <img
                src={ctaGuy}
                alt="Delivery"
                className="relative w-80 xl:w-96 drop-shadow-2xl -mb-14 -mr-4"
              />
            </div>
          </div>
        </div>

        {/* Feature Icons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {features.map((item, i) => (
            <div
              key={i}
              className="group bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-2xl hover:border-red-200 dark:hover:border-red-900/60 hover:-translate-y-1 transition-all duration-400"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${item.color}`}>
                {item.icon}
              </div>
              <p className="font-bold text-gray-900 dark:text-white text-sm sm:text-base mb-1 leading-snug">{item.title}</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm leading-snug">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
