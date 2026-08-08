import React from "react";

export default function TermsConditions() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 text-left text-gray-700 transition-colors dark:bg-gray-950 dark:text-gray-300 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-4xl rounded-3xl border border-gray-200 bg-white p-7 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">Foodzy</p>
        <h1 className="mt-3 text-4xl font-black text-gray-900 dark:text-white">Terms &amp; Conditions</h1>
        <p className="mt-4 leading-7">These terms outline the basic rules for using Foodzy, creating an account, ordering products, and using delivery services.</p>
        <div className="mt-8 space-y-7">
          <section><h2 className="text-xl font-bold text-gray-900 dark:text-white">Orders and availability</h2><p className="mt-2 leading-7">Products, prices, promotions, and delivery availability may change. An order is confirmed only after the checkout process is completed successfully.</p></section>
          <section><h2 className="text-xl font-bold text-gray-900 dark:text-white">Accounts</h2><p className="mt-2 leading-7">You are responsible for providing accurate account details and keeping your sign-in information secure.</p></section>
          <section><h2 className="text-xl font-bold text-gray-900 dark:text-white">Returns and support</h2><p className="mt-2 leading-7">Return eligibility depends on the product and order status. Contact support when an order requires review or assistance.</p></section>
        </div>
      </article>
    </main>
  );
}
