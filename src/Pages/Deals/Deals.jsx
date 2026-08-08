import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BadgePercent, Clock3, ShoppingCart, Star } from "lucide-react";
import deal1 from "../../assets/home/deal1.png";
import deal2 from "../../assets/home/deal2.png";
import deal3 from "../../assets/home/deal3.png";
import deal4 from "../../assets/home/deal4.png";

const deals = [
  { title: "Seeds of Change Organic Quinoa, Brown, & Red Rice", brand: "NestFood", price: 32.85, oldPrice: 33.8, image: deal1, badge: "Save 12%" },
  { title: "Perdue Simply Smart Organics Gluten Free", brand: "Old El Paso", price: 24.85, oldPrice: 26.8, image: deal2, badge: "Hot deal" },
  { title: "Signature Wood-Fired Mushroom and Caramelized", brand: "Progresso", price: 12.85, oldPrice: 15.8, image: deal3, badge: "Save 19%" },
  { title: "Simply Lemonade with Raspberry Juice", brand: "Yoplait", price: 15.85, oldPrice: 16.8, image: deal4, badge: "Limited" },
];

export default function Deals() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 text-gray-900 transition-colors dark:bg-gray-950 dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl bg-gradient-to-r from-red-500 to-orange-500 p-7 text-left text-white shadow-xl sm:p-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold uppercase tracking-widest"><BadgePercent size={15}/> Today&apos;s offers</div>
          <h1 className="mt-4 text-4xl font-black sm:text-5xl">Deals of the Day</h1>
          <p className="mt-3 max-w-2xl text-white/85">Fresh picks, limited-time prices, and popular groceries selected for today.</p>
          <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold"><Clock3 size={17}/> Offers refresh regularly</div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {deals.map((deal) => (
            <article key={deal.title} className="overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900">
              <div className="relative bg-gray-50 p-5 dark:bg-gray-800/60">
                <span className="absolute left-4 top-4 z-10 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">{deal.badge}</span>
                <img src={deal.image} alt={deal.title} className="mx-auto h-48 w-full object-contain" />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-green-600 dark:text-green-400">{deal.brand}</p>
                <h2 className="mt-2 min-h-12 font-bold text-gray-900 dark:text-white">{deal.title}</h2>
                <div className="mt-3 flex items-center gap-1 text-amber-500"><Star size={15} fill="currentColor"/><Star size={15} fill="currentColor"/><Star size={15} fill="currentColor"/><Star size={15} fill="currentColor"/><Star size={15}/></div>
                <div className="mt-4 flex items-end gap-2"><span className="text-xl font-black text-red-500">${deal.price.toFixed(2)}</span><span className="text-sm text-gray-400 line-through">${deal.oldPrice.toFixed(2)}</span></div>
                <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-3 text-sm font-bold text-white transition hover:bg-red-500 dark:bg-white dark:text-gray-900 dark:hover:bg-red-500 dark:hover:text-white"><ShoppingCart size={17}/> Add to cart</button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center"><Link to="/products" className="inline-flex items-center gap-2 font-bold text-red-500 hover:text-red-600">Browse all products <ArrowRight size={18}/></Link></div>
      </div>
    </main>
  );
}
