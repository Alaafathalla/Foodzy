import React, { useMemo, useState } from "react";
<<<<<<< HEAD
import { Camera, ChevronRight, Clock3, Mail, MapPin, PackageCheck, Phone, Save, ShieldCheck, ShoppingBag, Truck, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { authService } from "../../services";
import { notify } from "../../Components/Toast/ToastProvider";

const currentOrders = [
  { id: "FDZ-2048", date: "Aug 6, 2026", total: "$84.50", status: "On the way", icon: Truck, tone: "text-blue-600 bg-blue-50 dark:bg-blue-500/10 dark:text-blue-400" },
  { id: "FDZ-2042", date: "Aug 6, 2026", total: "$32.90", status: "Preparing", icon: Clock3, tone: "text-amber-600 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400" },
];

const recentOrders = [
  { id: "FDZ-1991", date: "Aug 2, 2026", total: "$64.25", status: "Delivered" },
  { id: "FDZ-1968", date: "Jul 29, 2026", total: "$101.40", status: "Delivered" },
  { id: "FDZ-1923", date: "Jul 22, 2026", total: "$48.75", status: "Delivered" },
];

=======
import { Camera, Mail, MapPin, Phone, Save, ShieldCheck, UserRound } from "lucide-react";
import { authService } from "../../services";
import { notify } from "../../Components/Toast/ToastProvider";

>>>>>>> e58e0048bc8f63c97e42ffce1f315267b42aecc0
export default function Profile() {
  const currentUser = useMemo(() => authService.getCurrentUser() || {}, []);
  const [form, setForm] = useState({
    name: currentUser.name || "John Doe",
    email: currentUser.email || "demo@foodzy.com",
    phone: currentUser.phone || "+123 456 7890",
    address: currentUser.address || "24 Green Street",
    city: currentUser.city || "New York",
  });

<<<<<<< HEAD
  const handleChange = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
=======
  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

>>>>>>> e58e0048bc8f63c97e42ffce1f315267b42aecc0
  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("user", JSON.stringify({ ...currentUser, ...form }));
    window.dispatchEvent(new Event("storage"));
    notify("Profile details updated successfully", "success");
  };

  return (
<<<<<<< HEAD
    <section className="min-h-screen bg-gray-50 px-4 py-10 dark:bg-gray-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-red-500">My account</p>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white sm:text-4xl">Profile dashboard</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">Manage your details and keep track of every Foodzy order.</p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Stat icon={ShoppingBag} label="Total orders" value="24" />
          <Stat icon={Truck} label="Active orders" value="2" />
          <Stat icon={PackageCheck} label="Delivered" value="21" />
          <Stat icon={Clock3} label="Pending reviews" value="3" />
        </div>

        <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="h-fit rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="relative mx-auto mb-5 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-red-400 to-orange-400 text-white shadow-xl">
              <UserRound size={54} />
              <button type="button" className="absolute bottom-1 right-1 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-gray-900 text-white dark:border-gray-900"><Camera size={16} /></button>
            </div>
            <h2 className="text-center text-xl font-black text-gray-900 dark:text-white">{form.name}</h2>
            <p className="mt-1 text-center text-sm text-gray-500 dark:text-gray-400">Foodzy customer</p>
            <div className="mt-6 space-y-3 border-t border-gray-100 pt-6 dark:border-gray-800">
=======
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
>>>>>>> e58e0048bc8f63c97e42ffce1f315267b42aecc0
              <Info icon={Mail} text={form.email} />
              <Info icon={Phone} text={form.phone} />
              <Info icon={MapPin} text={`${form.address}, ${form.city}`} />
            </div>
            <div className="mt-6 flex items-start gap-3 rounded-2xl bg-green-50 p-4 text-green-700 dark:bg-green-500/10 dark:text-green-400">
              <ShieldCheck className="mt-0.5 shrink-0" size={20} />
              <p className="text-sm font-medium">Your account information is protected and securely stored.</p>
            </div>
          </aside>

<<<<<<< HEAD
          <div className="space-y-8">
            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div><h2 className="text-xl font-black text-gray-900 dark:text-white">Active orders</h2><p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Orders currently being prepared or delivered.</p></div>
                <Link to="/order-tracking" className="text-sm font-bold text-red-500 hover:text-red-600">Track order</Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {currentOrders.map((order) => <ActiveOrder key={order.id} order={order} />)}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8">
              <h2 className="mb-7 text-xl font-black text-gray-900 dark:text-white">Personal information</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name" name="name" value={form.name} onChange={handleChange} />
                <Field label="Email address" name="email" type="email" value={form.email} onChange={handleChange} />
                <Field label="Phone number" name="phone" value={form.phone} onChange={handleChange} />
                <Field label="City" name="city" value={form.city} onChange={handleChange} />
                <div className="sm:col-span-2"><Field label="Delivery address" name="address" value={form.address} onChange={handleChange} /></div>
              </div>
              <div className="mt-8 flex justify-end"><button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-6 py-3 font-bold text-white transition hover:bg-red-600 sm:w-auto"><Save size={18} /> Save changes</button></div>
            </form>

            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8">
              <h2 className="text-xl font-black text-gray-900 dark:text-white">Recent orders</h2>
              <div className="mt-5 divide-y divide-gray-100 dark:divide-gray-800">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
                    <div><p className="font-black text-gray-900 dark:text-white">Order #{order.id}</p><p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{order.date} · {order.total}</p></div>
                    <div className="flex items-center justify-between gap-4 sm:justify-end"><span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-500/10 dark:text-green-400">{order.status}</span><button type="button" className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-red-500 dark:hover:bg-gray-800"><ChevronRight size={19} /></button></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
=======
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
>>>>>>> e58e0048bc8f63c97e42ffce1f315267b42aecc0
        </div>
      </div>
    </section>
  );
}

<<<<<<< HEAD
function Stat({ icon: Icon, label, value }) { return <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-500 dark:text-gray-400">{label}</p><p className="mt-2 text-2xl font-black text-gray-900 dark:text-white">{value}</p></div><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500 dark:bg-red-500/10"><Icon size={22} /></span></div></div>; }
function ActiveOrder({ order }) { const Icon = order.icon; return <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/70"><div className="flex items-start justify-between gap-4"><span className={`flex h-11 w-11 items-center justify-center rounded-xl ${order.tone}`}><Icon size={21} /></span><span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-gray-600 shadow-sm dark:bg-gray-900 dark:text-gray-300">{order.status}</span></div><p className="mt-4 font-black text-gray-900 dark:text-white">Order #{order.id}</p><p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{order.date} · {order.total}</p></div>; }
function Field({ label, ...props }) { return <label className="block"><span className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-200">{label}</span><input {...props} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/10 dark:border-gray-700 dark:bg-gray-950 dark:text-white" /></label>; }
function Info({ icon: Icon, text }) { return <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300"><Icon size={17} className="shrink-0 text-red-500" /><span className="truncate">{text}</span></div>; }
=======
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
>>>>>>> e58e0048bc8f63c97e42ffce1f315267b42aecc0
