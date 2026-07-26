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
  { label: "Main Dish", count: "98 Dishes", icon: item1, color: "from-red-500/10 to-orange-500/10 hover:from-red-500 hover:to-orange-500", iconBg: "bg-red-100 dark:bg-red-900/30", id: "main-dish" },
  { label: "Breakfast", count: "62 Items", icon: item2, color: "from-yellow-500/10 to-amber-500/10 hover:from-yellow-500 hover:to-amber-500", iconBg: "bg-yellow-100 dark:bg-yellow-900/30", id: "breakfast" },
  { label: "Dessert", count: "48 Items", icon: item3, color: "from-pink-500/10 to-rose-500/10 hover:from-pink-500 hover:to-rose-500", iconBg: "bg-pink-100 dark:bg-pink-900/30", id: "dessert" },
  { label: "All Products", count: "205 Items", icon: item4, color: "from-red-500/10 to-red-500/10 hover:from-red-500 hover:to-red-600", iconBg: "bg-red-50 dark:bg-red-900/20", id: "all" },
  { label: "Fruits & Veggies", count: "73 Items", icon: item5, color: "from-green-500/10 to-emerald-500/10 hover:from-green-500 hover:to-emerald-500", iconBg: "bg-green-100 dark:bg-green-900/30", id: "fruits" },
  { label: "Dairy", count: "41 Items", icon: p6, color: "from-blue-500/10 to-cyan-500/10 hover:from-blue-500 hover:to-cyan-500", iconBg: "bg-blue-100 dark:bg-blue-900/30", id: "dairy" },
  { label: "Coffees & Teas", count: "35 Items", icon: p7, color: "from-amber-700/10 to-yellow-700/10 hover:from-amber-700 hover:to-yellow-800", iconBg: "bg-amber-100 dark:bg-amber-900/30", id: "drinks" },
  { label: "Meats & Seafood", count: "29 Items", icon: p2, color: "from-red-700/10 to-rose-700/10 hover:from-red-700 hover:to-rose-800", iconBg: "bg-red-50 dark:bg-red-900/20", id: "meat" },
];

export default function CategoriesSection() {
  return (
    <section className="py-16 md:py-20 bg-white dark:bg-gray-900 text-center px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <p className="text-red-500 font-bold tracking-[0.2em] text-xs uppercase mb-3">CUSTOMER FAVORITES</p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-3 text-gray-800 dark:text-white">
          Popular Categories
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-base max-w-xl mx-auto mb-12">
          Explore our most-loved categories handpicked for your everyday needs
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-8 gap-4 md:gap-5">
          {categories.map((cat, index) => (
            <Link
              to={cat.id === "all" ? "/products" : "/category"}
              state={cat.id !== "all" ? { category: cat.id } : null}
              key={index}
              className="group w-full h-full min-h-[170px] sm:min-h-[190px] bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-white rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col items-center justify-center space-y-3 p-4 relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-all duration-500 z-0`} />

              <div className={`relative z-10 w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 rounded-2xl ${cat.iconBg} p-2 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-500`}>
                <img
                  src={cat.icon}
                  alt={cat.label}
                  className="w-full h-full object-contain drop-shadow"
                />
              </div>
              <div className="relative z-10 group-hover:text-white transition-colors duration-300">
                <h3 className="font-bold text-sm sm:text-base lg:text-lg">
                  {cat.label}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 group-hover:text-white/80 mt-1 font-medium">
                  {cat.count}
                </p>
              </div>

              <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                <div className="w-8 h-8 rounded-full bg-white/90 dark:bg-gray-900/90 shadow-lg flex items-center justify-center text-red-500">
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
