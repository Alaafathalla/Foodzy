import React from "react";
import { useLocation } from "react-router-dom";
import { Check, ChefHat, Clock3, MapPin, PackageCheck, Phone, Store, Truck } from "lucide-react";

export default function OrderTracking() {
  const location = useLocation();
  const saved = JSON.parse(localStorage.getItem("foodzy-last-order") || "null");
  const order = location.state || saved || {};
  const orderId = order.orderId || "ORD-103846";
  const trackingNo = order.trackingNo || "TRK582104739";

  const steps = [
    { title: "Order confirmed", description: "We received your order", icon: PackageCheck, state: "done" },
    { title: "Preparing your order", description: "The store is packing your items", icon: ChefHat, state: "done" },
    { title: "Assigned to delivery", description: "Your driver is heading to the store", icon: Truck, state: "active" },
    { title: "Delivered", description: "Order arrives at your address", icon: MapPin, state: "pending" },
  ];

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-red-500">Live order</p><h1 className="text-3xl font-black text-gray-900 dark:text-white sm:text-4xl">Track your order</h1><p className="mt-2 text-gray-500">Order {orderId} · Tracking {trackingNo}</p></div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-orange-700 dark:bg-orange-500/10 dark:text-orange-400"><Clock3 size={17} /> Arriving in 24–35 min</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 p-6 dark:from-gray-900 dark:to-gray-800 sm:p-10">
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #9ca3af 1px, transparent 0)", backgroundSize: "24px 24px" }} />
              <div className="relative mx-auto flex min-h-[240px] max-w-xl items-center justify-between">
                <Location icon={Store} label="Store" sub="Foodzy Market" />
                <div className="mx-4 flex-1 border-t-2 border-dashed border-red-400" />
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-red-500 text-white shadow-xl shadow-red-500/30"><Truck size={30} /></div>
                <div className="mx-4 flex-1 border-t-2 border-dashed border-gray-300" />
                <Location icon={MapPin} label="Your address" sub="24 Green Street" />
              </div>
            </div>

            <h2 className="mb-6 mt-8 text-xl font-black text-gray-900 dark:text-white">Order progress</h2>
            <div className="space-y-0">
              {steps.map((step, index) => <TrackingStep key={step.title} {...step} last={index === steps.length - 1} />)}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <p className="text-sm font-bold uppercase tracking-wider text-gray-400">Your driver</p>
              <div className="mt-4 flex items-center gap-4"><div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-900 text-xl font-black text-white">AM</div><div><h2 className="font-black text-gray-900 dark:text-white">Ahmed Mostafa</h2><p className="text-sm text-gray-500">4.9 ★ · 278 deliveries</p></div></div>
              <button type="button" className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-3 font-bold text-white transition hover:bg-red-500 dark:bg-white dark:text-gray-900"><Phone size={18} /> Call driver</button>
            </div>
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"><h2 className="font-black text-gray-900 dark:text-white">Delivery details</h2><div className="mt-5 space-y-4 text-sm"><Detail label="Order total" value={`$${Number(order.total || 54.75).toFixed(2)}`} /><Detail label="Payment" value="Paid online" /><Detail label="Delivery address" value="24 Green Street" /></div></div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Location({ icon: Icon, label, sub }) { return <div className="relative z-10 text-center"><span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-red-500 shadow-lg dark:bg-gray-700"><Icon size={25} /></span><p className="mt-3 text-sm font-black text-gray-900 dark:text-white">{label}</p><p className="text-xs text-gray-500">{sub}</p></div>; }
function TrackingStep({ icon: Icon, title, description, state, last }) { const done = state === "done"; const active = state === "active"; return <div className="flex gap-4"><div className="flex flex-col items-center"><span className={`flex h-11 w-11 items-center justify-center rounded-xl ${done || active ? "bg-red-500 text-white" : "bg-gray-100 text-gray-400 dark:bg-gray-700"}`}>{done ? <Check size={20} /> : <Icon size={20} />}</span>{!last && <span className={`h-12 w-0.5 ${done ? "bg-red-500" : "bg-gray-200 dark:bg-gray-700"}`} />}</div><div className="pt-1"><h3 className={`font-black ${state === "pending" ? "text-gray-400" : "text-gray-900 dark:text-white"}`}>{title}</h3><p className="mt-1 text-sm text-gray-500">{description}</p></div></div>; }
function Detail({ label, value }) { return <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0 dark:border-gray-700"><span className="text-gray-500">{label}</span><span className="text-right font-bold text-gray-900 dark:text-white">{value}</span></div>; }
