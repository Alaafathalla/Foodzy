import React from "react";
import {
  ArrowRight,
  BadgePercent,
  Clock3,
  Sparkles,
  Truck,
} from "lucide-react";
import { Link } from "react-router-dom";

const posters = [
  {
    eyebrow: "Weekend offers",
    title: "Fresh groceries, better prices",
    copy:
      "Save up to 40% on selected groceries and everyday essentials.",
    action: "Shop offers",
    badge: "40% OFF",
    icon: BadgePercent,
    background:
      "from-[#FFF4EC] via-[#FFF9F5] to-[#FFFFFF]",
    border: "border-orange-100",
    accent: "bg-orange-500",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
  },
  {
    eyebrow: "Fast delivery",
    title: "Everything you need, right on time",
    copy:
      "Free delivery on eligible orders with real-time order tracking.",
    action: "Start shopping",
    badge: "FREE DELIVERY",
    icon: Truck,
    background:
      "from-[#EEF9FF] via-[#F7FCFF] to-[#FFFFFF]",
    border: "border-sky-100",
    accent: "bg-sky-500",
    iconBg: "bg-sky-100",
    iconColor: "text-sky-500",
  },
  {
    eyebrow: "Kitchen favourites",
    title: "Stock up for less",
    copy:
      "Popular grocery picks and family favourites at better prices.",
    action: "Explore products",
    badge: "TOP PICKS",
    icon: Clock3,
    background:
      "from-[#F8F2FF] via-[#FCFAFF] to-[#FFFFFF]",
    border: "border-violet-100",
    accent: "bg-violet-500",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-500",
  },
];

export default function PromoPosters() {
  return (
    <section className="bg-white px-4 py-12 transition-colors dark:bg-[#0F172A] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-red-500">
              <Sparkles size={16} />
              Featured deals
            </div>

            <h2 className="mt-3 text-3xl font-black text-gray-900 dark:text-white sm:text-4xl">
              Offers made for your basket
            </h2>

            <p className="mt-3 max-w-2xl text-gray-500 dark:text-gray-400">
              Discover limited-time offers and exclusive discounts on your
              favourite grocery products.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 font-bold text-red-500 transition hover:text-red-600"
          >
            View all products
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {posters.map((poster) => {
            const Icon = poster.icon;

            return (
              <article
                key={poster.title}
                className={`group relative overflow-hidden rounded-3xl border ${poster.border} bg-gradient-to-br ${poster.background} p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800`}
              >
                {/* soft decorative circles */}

                <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-white/60 blur-2xl dark:bg-white/5" />

                <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full border border-gray-200/60 dark:border-white/5" />

                {/* badge */}

                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${poster.iconBg}`}
                  >
                    <Icon
                      size={22}
                      className={poster.iconColor}
                    />
                  </div>

                  <span
                    className={`rounded-full ${poster.accent} px-3 py-1.5 text-xs font-bold text-white`}
                  >
                    {poster.badge}
                  </span>
                </div>

                <div className="mt-8">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                    {poster.eyebrow}
                  </p>

                  <h3 className="mt-3 text-3xl font-black leading-tight text-gray-900 dark:text-white">
                    {poster.title}
                  </h3>

                  <p className="mt-4 leading-7 text-gray-600 dark:text-gray-400">
                    {poster.copy}
                  </p>
                </div>

                <Link
                  to="/products"
                  className={`mt-8 inline-flex items-center gap-2 rounded-xl ${poster.accent} px-5 py-3 text-sm font-bold text-white transition hover:scale-[1.03]`}
                >
                  {poster.action}

                  <ArrowRight size={17} />
                </Link>

                {/* bottom decoration */}

                <div className="absolute bottom-7 right-7 flex gap-2 opacity-30">
                  <span className="h-2 w-2 rounded-full bg-gray-400"></span>
                  <span className="h-2 w-2 rounded-full bg-gray-400"></span>
                  <span className="h-2 w-2 rounded-full bg-gray-400"></span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}