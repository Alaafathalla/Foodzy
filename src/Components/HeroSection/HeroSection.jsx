import React from "react";
import { ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import heroFood from "../../assets/home/hero.png";
import bgImg from "../../assets/home/background.png";

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#07101f] text-white">
      <img src={bgImg} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-80" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/55 to-black/10" />
      <div className="mx-auto grid min-h-[620px] max-w-7xl grid-cols-1 items-center gap-8 px-4 py-16 sm:px-6 sm:py-20 lg:min-h-[680px] lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-24">
        <div className="order-2 max-w-2xl text-center lg:order-1 lg:text-left">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] backdrop-blur">Fresh food, delivered fast</span>
          <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">The best way to fill your table.</h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/75 sm:text-base lg:mx-0 lg:text-lg">Discover fresh groceries, daily deals, and delicious meals delivered right to your door.</p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
            <Link to="/products" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-orange-500 px-7 py-3 font-bold text-white transition hover:bg-orange-600">
              Order now <ArrowRight size={18} />
            </Link>
            <a href="tel:+1234567890" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 font-semibold backdrop-blur transition hover:bg-white/20">
              <Phone size={18} /> +123 (456) 7890
            </a>
          </div>
        </div>
        <div className="order-1 flex min-h-[260px] items-center justify-center lg:order-2 lg:min-h-[480px] lg:justify-end">
          <img src={heroFood} alt="Fresh roasted meal" className="h-auto w-[86%] max-w-[380px] object-contain drop-shadow-2xl sm:w-[70%] sm:max-w-[470px] lg:w-full lg:max-w-[610px]" />
        </div>
      </div>
    </section>
  );
}
