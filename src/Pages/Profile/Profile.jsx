import React, { useMemo, useState } from "react";
import { Camera, Mail, MapPin, Phone, Save, ShieldCheck, UserRound } from "lucide-react";
import { authService } from "../../services";
import { notify } from "../../Components/Toast/ToastProvider";

export default function Profile() {
  const currentUser = useMemo(() => authService.getCurrentUser() || {}, []);
  const [form, setForm] = useState({
    name: currentUser.name || "John Doe",
    email: currentUser.email || "demo@foodzy.com",
    phone: currentUser.phone || "+123 456 7890",
    address: currentUser.address || "24 Green Street",
    city: currentUser.city || "New York",
  });

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("user", JSON.stringify({ ...currentUser, ...form }));
    window.dispatchEvent(new Event("storage"));
    notify("Profile details updated successfully", "success");
  };

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-red-500">My account</p>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white sm:text-4xl">Profile settings</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">Manage your personal details and delivery information.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <aside className="h-fit rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="relative mx-auto mb-5 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-red-400 to-orange-400 text-white shadow-xl">
              <UserRound size={54} />
              <button type="button" className="absolute bottom-1 right-1 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-gray-900 text-white dark:border-gray-800">
                <Camera size={16} />
              </button>
            </div>
            <h2 className="text-center text-xl font-black text-gray-900 dark:text-white">{form.name}</h2>
            <p className="mt-1 text-center text-sm text-gray-500 dark:text-gray-400">Foodzy customer</p>
            <div className="mt-6 space-y-3 border-t border-gray-100 pt-6 dark:border-gray-700">
              <Info icon={Mail} text={form.email} />
              <Info icon={Phone} text={form.phone} />
              <Info icon={MapPin} text={`${form.address}, ${form.city}`} />
            </div>
            <div className="mt-6 flex items-start gap-3 rounded-2xl bg-green-50 p-4 text-green-700 dark:bg-green-500/10 dark:text-green-400">
              <ShieldCheck className="mt-0.5 shrink-0" size={20} />
              <p className="text-sm font-medium">Your account information is protected and securely stored.</p>
            </div>
          </aside>

          <form onSubmit={handleSubmit} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-8">
            <h2 className="mb-7 text-xl font-black text-gray-900 dark:text-white">Personal information</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" name="name" value={form.name} onChange={handleChange} />
              <Field label="Email address" name="email" type="email" value={form.email} onChange={handleChange} />
              <Field label="Phone number" name="phone" value={form.phone} onChange={handleChange} />
              <Field label="City" name="city" value={form.city} onChange={handleChange} />
              <div className="sm:col-span-2">
                <Field label="Delivery address" name="address" value={form.address} onChange={handleChange} />
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-6 py-3 font-bold text-white transition hover:bg-red-600">
                <Save size={18} /> Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-200">{label}</span>
      <input {...props} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white" />
    </label>
  );
}

function Info({ icon: Icon, text }) {
  return <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300"><Icon size={17} className="shrink-0 text-red-500" /><span className="truncate">{text}</span></div>;
}
