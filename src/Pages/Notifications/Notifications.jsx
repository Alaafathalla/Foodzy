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
        </div>
      </div>
    </section>
  );
}
