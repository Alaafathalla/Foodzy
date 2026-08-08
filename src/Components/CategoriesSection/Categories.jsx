import React from 'react';
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import item1 from "../../assets/home/item1.png";
import item2 from "../../assets/home/item2.png";
import item3 from "../../assets/home/item3.png";
import item4 from "../../assets/home/item4.png";
import item5 from "../../assets/home/item5.png";
import p6 from "../../assets/products/p6.png";
import p7 from "../../assets/products/p7.png";
import p2 from "../../assets/products/p2.png";

const categories = [
  { label: "Main Dish", count: "98 Dishes", icon: item1, hoverBg: "from-red-500 to-orange-500", iconBg: "bg-red-100 dark:bg-red-900/30", id: "main-dish" },
  { label: "Breakfast", count: "62 Items", icon: item2, hoverBg: "from-amber-500 to-orange-500", iconBg: "bg-yellow-100 dark:bg-yellow-900/30", id: "breakfast" },
  { label: "Dessert", count: "48 Items", icon: item3, hoverBg: "from-pink-500 to-rose-600", iconBg: "bg-pink-100 dark:bg-pink-900/30", id: "dessert" },
  { label: "All Products", count: "205 Items", icon: item4, hoverBg: "from-red-500 to-red-600", iconBg: "bg-red-50 dark:bg-red-900/20", id: "all" },
  { label: "Fruits & Veggies", count: "73 Items", icon: item5, hoverBg: "from-emerald-500 to-green-600", iconBg: "bg-green-100 dark:bg-green-900/30", id: "fruits" },
  { label: "Dairy", count: "41 Items", icon: p6, hoverBg: "from-blue-500 to-cyan-600", iconBg: "bg-blue-100 dark:bg-blue-900/30", id: "dairy" },
  { label: "Coffees & Teas", count: "35 Items", icon: p7, hoverBg: "from-amber-600 to-yellow-700", iconBg: "bg-amber-100 dark:bg-amber-900/30", id: "drinks" },
  { label: "Meats & Seafood", count: "29 Items", icon: p2, hoverBg: "from-red-700 to-rose-800", iconBg: "bg-red-50 dark:bg-red-900/20", id: "meat" },
];

export default function CategoriesSection() {
  return (
    <section className="bg-white px-4 py-16 text-center transition-colors duration-300 dark:bg-gray-900 md:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-red-500">CUSTOMER FAVORITES</p>
        <h2 className="mb-3 text-3xl font-black text-gray-800 dark:text-white md:text-4xl lg:text-5xl">Popular Categories</h2>
        <p className="mx-auto mb-12 max-w-xl text-base text-gray-500 dark:text-gray-400">Explore our most-loved categories handpicked for your everyday needs</p>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-5 xl:grid-cols-8">
          {categories.map((cat) => (
            <Link
              to={cat.id === "all" ? "/products" : "/category"}
              state={cat.id !== "all" ? { category: cat.id } : null}
              key={cat.id}
              className="group relative flex min-h-[170px] h-full w-full flex-col items-center justify-center space-y-3 overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 p-4 text-gray-800 transition-all duration-500 hover:-translate-y-2 hover:border-transparent hover:shadow-2xl dark:border-gray-700 dark:from-gray-800 dark:to-gray-900 dark:text-white sm:min-h-[190px]"
            >
              <div className={`absolute inset-0 z-0 bg-gradient-to-br ${cat.hoverBg} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

              <div className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl p-2 shadow-md transition-transform duration-500 group-hover:scale-110 sm:h-18 sm:w-18 lg:h-20 lg:w-20 ${cat.iconBg}`}>
                <img src={cat.icon} alt={cat.label} className="h-full w-full object-contain drop-shadow" />
              </div>

              <div className="relative z-10 transition-colors duration-300 group-hover:text-white">
                <h3 className="text-sm font-bold drop-shadow-none group-hover:drop-shadow-sm sm:text-base lg:text-lg">{cat.label}</h3>
                <p className="mt-1 text-xs font-medium text-gray-500 transition-colors group-hover:text-white/90 dark:text-gray-400 sm:text-sm">{cat.count}</p>
              </div>

              <div className="absolute bottom-3 right-3 z-10 translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-red-500 shadow-lg">
                  <ChevronRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
