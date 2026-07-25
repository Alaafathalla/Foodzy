import React, { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CreditCard, Truck, ChevronRight, MapPin, ShieldCheck, Package, Check, ChevronDown, Loader2 } from "lucide-react";
import useCartStore from "../../store/cartStore";
import { orderService } from "../../services";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, getSubtotal, clearCart } = useCartStore();
  
  const [delivery, setDelivery] = useState("free");
  const [payment, setPayment] = useState("card");
  const [step, setStep] = useState(1);
  const [couponApplied] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postCode: "",
    country: "",
    state: "",
  });

  const subtotal = getSubtotal();
  const discount = couponApplied ? Math.round(subtotal * 0.1 * 100) / 100 : 0;
  const shippingCost = delivery === "free" ? 0 : delivery === "express" ? 15 : 5;
  const tax = Math.round((subtotal - discount) * 0.05 * 100) / 100;
  const total = subtotal - discount + shippingCost + tax;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    setPlacingOrder(true);
    try {
      const orderData = {
        items: cart.map(i => ({ productId: i.id, qty: i.qty, price: i.price })),
        address: formData,
        paymentMethod: payment,
        shippingMethod: delivery,
        subtotal,
        discount,
        shippingCost,
        tax,
        total,
      };
      const result = await orderService.placeOrder(orderData);
      clearCart();
      navigate("/order-success", {
        state: {
          orderId: result.orderId,
          total,
          trackingNo: result.trackingNo,
        },
      });
    } catch (err) {
      console.error("Order error:", err);
      alert("Failed to place order. Please try again.");
    } finally {
      setPlacingOrder(false);
    }
  };

  if (cart.length === 0) {
    return (
      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 mx-auto flex items-center justify-center mb-6">
            <Package size={48} className="text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Your cart is empty</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
            You need to add some products to your cart before you can checkout.
          </p>
          <Link to="/products">
            <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3.5 rounded-xl font-bold transition shadow-lg shadow-red-500/20">
              Browse Products
            </button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Link to="/" className="hover:text-red-500 transition">Home</Link>
            <ChevronRight size={14} />
            <Link to="/cart" className="hover:text-red-500 transition">Cart</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900 dark:text-white font-medium">Checkout</span>
          </nav>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="max-w-2xl mx-auto flex items-center justify-between mb-10">
          {["Cart Review", "Shipping", "Payment"].map((label, i) => (
            <div key={i} className="flex items-center">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition ${
                  step >= i + 1
                    ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                }`}>
                  {step > i + 1 ? <Check size={18} /> : i + 1}
                </div>
                <span className={`text-sm font-semibold hidden sm:block ${
                  step >= i + 1 ? "text-gray-900 dark:text-white" : "text-gray-400"
                }`}>
                  {label}
                </span>
              </div>
              {i < 2 && (
                <div className={`w-12 sm:w-24 h-0.5 mx-2 sm:mx-4 ${
                  step >= i + 2 ? "bg-red-500" : "bg-gray-200 dark:bg-gray-700"
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT - Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-500">
                  <MapPin size={18} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Shipping Address</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">First Name *</label>
                    <input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Last Name *</label>
                    <input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address *</label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone Number *</label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Street Address *</label>
                    <input
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123 Main Street, Apt 4B"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">City *</label>
                    <div className="relative">
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="appearance-none w-full pr-10 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                      >
                        <option value="">Select city</option>
                        <option>New York</option>
                        <option>Los Angeles</option>
                        <option>Chicago</option>
                        <option>Houston</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" size={18} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Postal Code *</label>
                    <input
                      name="postCode"
                      value={formData.postCode}
                      onChange={handleChange}
                      placeholder="10001"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Country *</label>
                    <div className="relative">
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="appearance-none w-full pr-10 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                      >
                        <option value="">Select country</option>
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                        <option>Australia</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" size={18} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">State / Region</label>
                    <input
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="NY"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Method */}
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                  <Truck size={18} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Shipping Method</h3>
              </div>
              <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: "free", title: "Free Shipping", time: "5-7 Business Days", price: "$0.00", color: "green" },
                  { id: "standard", title: "Standard", time: "3-4 Business Days", price: "$5.00", color: "blue" },
                  { id: "express", title: "Express", time: "1-2 Business Days", price: "$15.00", color: "red" },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                      delivery === opt.id
                        ? opt.color === "green" ? "border-green-500 bg-green-50 dark:bg-green-900/10"
                          : opt.color === "blue" ? "border-blue-500 bg-blue-50 dark:bg-blue-900/10"
                          : "border-red-500 bg-red-50 dark:bg-red-900/10"
                        : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      checked={delivery === opt.id}
                      onChange={() => setDelivery(opt.id)}
                      className="sr-only"
                    />
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">{opt.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{opt.time}</p>
                      </div>
                      <p className={`font-bold ${
                        opt.color === "green" ? "text-green-600" :
                        opt.color === "blue" ? "text-blue-600" :
                        "text-red-500"
                      }`}>
                        {opt.price}
                      </p>
                    </div>
                    {delivery === opt.id && (
                      <div className={`absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center ${
                        opt.color === "green" ? "bg-green-500" :
                        opt.color === "blue" ? "bg-blue-500" :
                        "bg-red-500"
                      } text-white`}>
                        <Check size={12} />
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center text-purple-600">
                  <CreditCard size={18} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Payment Method</h3>
                <div className="ml-auto flex items-center gap-2 text-xs text-green-600 bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-full">
                  <ShieldCheck size={14} />
                  <span className="font-semibold">Secure Checkout</span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { id: "card", title: "Credit / Debit Card", desc: "Visa, Mastercard, Amex", icon: "💳" },
                  { id: "paypal", title: "PayPal", desc: "Pay with your PayPal account", icon: "🅿️" },
                  { id: "cod", title: "Cash On Delivery", desc: "Pay when you receive your order", icon: "💵" },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      payment === opt.id
                        ? "border-red-500 bg-red-50 dark:bg-red-900/10"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={payment === opt.id}
                      onChange={() => setPayment(opt.id)}
                      className="sr-only"
                    />
                    <div className="w-11 h-11 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-2xl">
                      {opt.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 dark:text-white">{opt.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{opt.desc}</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      payment === opt.id ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                    }`}>
                      {payment === opt.id && <div className="w-3 h-3 rounded-full bg-red-500" />}
                    </div>
                  </label>
                ))}

                {payment === "card" && (
                  <div className="mt-6 p-5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Card Number</label>
                      <input placeholder="1234 5678 9012 3456" className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Expiry Date</label>
                        <input placeholder="MM/YY" className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">CVV</label>
                        <input placeholder="123" className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT - Order Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden sticky top-24 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Order Summary ({cart.reduce((s,i)=>s+i.qty,0)} items)
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4 max-h-80 overflow-y-auto pr-2 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex-shrink-0 overflow-hidden relative">
                        <img src={item.image} alt={item.title} className="w-full h-full object-contain p-1" />
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-gray-900 dark:bg-gray-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                          {item.qty}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2">{item.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Qty: {item.qty}</p>
                      </div>
                      <p className="font-bold text-gray-900 dark:text-white text-sm">
                        ${(item.price * item.qty).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 text-sm border-t border-gray-200 dark:border-gray-700 pt-5">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                    <span className="font-semibold text-gray-900 dark:text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Shipping</span>
                    <span className={`font-semibold ${shippingCost === 0 ? "text-green-600" : "text-gray-900 dark:text-white"}`}>
                      {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Tax (5%)</span>
                    <span className="font-semibold text-gray-900 dark:text-white">${tax.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-green-600 font-medium">Discount</span>
                      <span className="font-semibold text-green-600">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 mt-5 pt-5 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                    <span className="text-2xl font-black text-red-500">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={placeOrder}
                  disabled={placingOrder}
                  className="w-full bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white py-4 rounded-xl font-black text-base transition shadow-xl shadow-red-500/25 disabled:shadow-none flex items-center justify-center gap-2"
                >
                  {placingOrder ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> Placing Order...
                    </>
                  ) : (
                    "Place Order →"
                  )}
                </button>

                <div className="mt-5 flex flex-wrap justify-center gap-2 text-gray-400 dark:text-gray-500 text-xs">
                  <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 rounded font-semibold">VISA</span>
                  <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 rounded font-semibold">MC</span>
                  <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 rounded font-semibold">AMEX</span>
                  <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 rounded font-semibold">PAYPAL</span>
                  <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 rounded font-semibold">GPay</span>
                </div>

                <Link to="/cart" className="block text-center mt-4">
                  <button className="text-sm text-gray-500 hover:text-red-500 font-medium transition">
                    ← Back to Cart
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
