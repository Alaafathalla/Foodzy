import React, { useEffect, useState } from "react";
import { CheckCircle2, Heart, ShoppingCart, X } from "lucide-react";

const icons = {
  cart: ShoppingCart,
  wishlist: Heart,
  success: CheckCircle2,
};

export function notify(message, type = "success") {
  window.dispatchEvent(new CustomEvent("foodzy:toast", { detail: { message, type } }));
}

export default function ToastProvider() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handler = (event) => {
      const toast = {
        id: `${Date.now()}-${Math.random()}`,
        message: event.detail?.message || "Done successfully",
        type: event.detail?.type || "success",
      };
      setToasts((current) => [...current, toast]);
      window.setTimeout(() => {
        setToasts((current) => current.filter((item) => item.id !== toast.id));
      }, 2800);
    };

    window.addEventListener("foodzy:toast", handler);
    return () => window.removeEventListener("foodzy:toast", handler);
  }, []);

  const removeToast = (id) => {
    setToasts((current) => current.filter((item) => item.id !== id));
  };

  return (
    <div className="pointer-events-none fixed right-4 top-24 z-[100] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3">
      {toasts.map((toast) => {
        const Icon = icons[toast.type] || CheckCircle2;
        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl dark:border-gray-700 dark:bg-gray-800"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500 dark:bg-red-500/10">
              <Icon size={20} />
            </span>
            <p className="min-w-0 flex-1 text-sm font-semibold text-gray-800 dark:text-white">
              {toast.message}
            </p>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
              aria-label="Close notification"
            >
              <X size={17} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
