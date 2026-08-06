<<<<<<< HEAD
import React, { useMemo, useState } from "react";
import { Bell, CheckCheck, CreditCard, Gift, PackageCheck, ShoppingBag, Trash2, Truck, UserRound } from "lucide-react";
import { initialNotifications } from "../../data/notifications";
import { notify } from "../../Components/Toast/ToastProvider";

const iconMap = { order: PackageCheck, offer: Gift, delivery: Truck, payment: CreditCard, product: ShoppingBag, account: UserRound };
const filters = ["All", "Unread", "Orders", "Offers"];

export default function Notifications() {
  const [items, setItems] = useState(initialNotifications);
  const [activeFilter, setActiveFilter] = useState("All");
  const unreadCount = items.filter((item) => item.unread).length;

  const visibleItems = useMemo(() => items.filter((item) => {
    if (activeFilter === "Unread") return item.unread;
    if (activeFilter === "Orders") return ["order", "delivery", "payment"].includes(item.type);
    if (activeFilter === "Offers") return ["offer", "product"].includes(item.type);
    return true;
  }), [items, activeFilter]);

  const markAllRead = () => { setItems((current) => current.map((item) => ({ ...item, unread: false }))); notify("All notifications marked as read", "success"); };
  const markRead = (id) => setItems((current) => current.map((item) => item.id === id ? { ...item, unread: false } : item));
  const remove = (id) => { setItems((current) => current.filter((item) => item.id !== id)); notify("Notification deleted", "success"); };
  const clearAll = () => { setItems([]); notify("All notifications cleared", "success"); };

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-10 dark:bg-gray-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div><div className="mb-2 flex items-center gap-2 text-red-500"><Bell size={20} /><span className="text-sm font-bold uppercase tracking-[0.2em]">Updates</span></div><h1 className="text-3xl font-black text-gray-900 dark:text-white sm:text-4xl">Notifications</h1><p className="mt-2 text-gray-500 dark:text-gray-400">{unreadCount} unread notifications</p></div>
          <div className="flex flex-col gap-2 sm:flex-row"><button type="button" onClick={markAllRead} className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 transition hover:border-red-300 hover:text-red-500 dark:border-gray-800 dark:bg-gray-900 dark:text-white"><CheckCheck size={18} /> Mark all as read</button><button type="button" onClick={clearAll} className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 transition hover:border-red-300 hover:text-red-500 dark:border-gray-800 dark:bg-gray-900 dark:text-white"><Trash2 size={18} /> Clear all</button></div>
        </div>

        <div className="mb-5 flex gap-2 overflow-x-auto pb-1">{filters.map((filter) => <button type="button" key={filter} onClick={() => setActiveFilter(filter)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${activeFilter === filter ? "bg-red-500 text-white" : "border border-gray-200 bg-white text-gray-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"}`}>{filter}</button>)}</div>

        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
          {visibleItems.length ? visibleItems.map((item) => {
            const Icon = iconMap[item.type] || Bell;
            return <article key={item.id} onClick={() => markRead(item.id)} className={`group flex cursor-pointer gap-4 border-b border-gray-100 p-4 transition last:border-b-0 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/60 sm:p-6 ${item.unread ? "bg-red-50/60 dark:bg-red-500/5" : ""}`}>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-500 dark:bg-red-500/10"><Icon size={23} /></span>
              <div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><div><div className="flex flex-wrap items-center gap-2"><h2 className="font-black text-gray-900 dark:text-white">{item.title}</h2>{item.unread && <span className="h-2 w-2 rounded-full bg-red-500" />}</div><p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">{item.message}</p><div className="mt-3 flex flex-wrap items-center gap-3"><p className="text-xs font-medium text-gray-400">{item.time}</p>{item.unread && <button type="button" onClick={(event) => { event.stopPropagation(); markRead(item.id); }} className="text-xs font-bold text-red-500">Mark as read</button>}</div></div><button type="button" onClick={(event) => { event.stopPropagation(); remove(item.id); }} className="rounded-lg p-2 text-gray-400 transition hover:bg-white hover:text-red-500 dark:hover:bg-gray-700" aria-label="Delete notification"><Trash2 size={18} /></button></div></div>
            </article>;
          }) : <div className="p-12 text-center sm:p-16"><Bell size={44} className="mx-auto mb-4 text-gray-300" /><h2 className="text-xl font-black text-gray-900 dark:text-white">No notifications here</h2><p className="mt-2 text-gray-500 dark:text-gray-400">New order, delivery, and offer updates will appear here.</p></div>}
=======
import React, { useState } from "react";
import { Bell, CheckCheck, Gift, PackageCheck, Truck, Trash2 } from "lucide-react";
import { initialNotifications } from "../../data/notifications";
import { notify } from "../../Components/Toast/ToastProvider";

const iconMap = { order: PackageCheck, offer: Gift, delivery: Truck };

export default function Notifications() {
  const [items, setItems] = useState(initialNotifications);
  const unreadCount = items.filter((item) => item.unread).length;

  const markAllRead = () => {
    setItems((current) => current.map((item) => ({ ...item, unread: false })));
    notify("All notifications marked as read", "success");
  };

  const remove = (id) => setItems((current) => current.filter((item) => item.id !== id));

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-red-500"><Bell size={20} /><span className="text-sm font-bold uppercase tracking-[0.2em]">Updates</span></div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white sm:text-4xl">Notifications</h1>
            <p className="mt-2 text-gray-500 dark:text-gray-400">{unreadCount} unread notifications</p>
          </div>
          <button type="button" onClick={markAllRead} className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 transition hover:border-red-300 hover:text-red-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
            <CheckCheck size={18} /> Mark all as read
          </button>
        </div>

        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
          {items.length ? items.map((item) => {
            const Icon = iconMap[item.type] || Bell;
            return (
              <article key={item.id} className={`flex gap-4 border-b border-gray-100 p-5 last:border-b-0 dark:border-gray-700 sm:p-6 ${item.unread ? "bg-red-50/50 dark:bg-red-500/5" : ""}`}>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-500 dark:bg-red-500/10"><Icon size={23} /></span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2"><h2 className="font-black text-gray-900 dark:text-white">{item.title}</h2>{item.unread && <span className="h-2 w-2 rounded-full bg-red-500" />}</div>
                      <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">{item.message}</p>
                      <p className="mt-2 text-xs font-medium text-gray-400">{item.time}</p>
                    </div>
                    <button type="button" onClick={() => remove(item.id)} className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-red-500 dark:hover:bg-gray-700" aria-label="Delete notification"><Trash2 size={18} /></button>
                  </div>
                </div>
              </article>
            );
          }) : <div className="p-16 text-center"><Bell size={44} className="mx-auto mb-4 text-gray-300" /><h2 className="text-xl font-black text-gray-900 dark:text-white">No notifications yet</h2><p className="mt-2 text-gray-500">New order and offer updates will appear here.</p></div>}
>>>>>>> e58e0048bc8f63c97e42ffce1f315267b42aecc0
        </div>
      </div>
    </section>
  );
}
