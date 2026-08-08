import React from "react";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 text-left text-gray-700 transition-colors dark:bg-gray-950 dark:text-gray-300 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-4xl rounded-3xl border border-gray-200 bg-white p-7 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">Foodzy</p>
        <h1 className="mt-3 text-4xl font-black text-gray-900 dark:text-white">Privacy Policy</h1>
        <p className="mt-4 leading-7">This page explains how Foodzy handles account, order, delivery, and communication information used to provide the shopping experience.</p>
        <div className="mt-8 space-y-7">
          <section><h2 className="text-xl font-bold text-gray-900 dark:text-white">Information we use</h2><p className="mt-2 leading-7">We may use details you submit while registering, placing an order, contacting support, or subscribing to offers.</p></section>
          <section><h2 className="text-xl font-bold text-gray-900 dark:text-white">How information is used</h2><p className="mt-2 leading-7">Information is used to process purchases, arrange delivery, maintain your account, improve services, and send communications you request.</p></section>
          <section><h2 className="text-xl font-bold text-gray-900 dark:text-white">Your choices</h2><p className="mt-2 leading-7">You can update profile information and unsubscribe from promotional email at any time.</p></section>
        </div>
      </article>
    </main>
  );
}
