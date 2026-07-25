import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Send, ChevronRight, MessageCircle, Check, Loader2 } from "lucide-react";
import { contactService } from "../../services";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await contactService.submitContact(formData);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      alert("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const contactInfo = [
    { icon: MapPin, title: "Our Location", desc1: "51 Green St. Huntington chalo beach", desc2: "Ontario, NY 11746 KY 4783, USA.", color: "red", gradient: "from-red-500 to-orange-500" },
    { icon: Phone, title: "Phone Number", desc1: "+91 123 4567890", desc2: "+91 098 7654321", color: "green", gradient: "from-green-500 to-emerald-500" },
    { icon: Mail, title: "Email Address", desc1: "example@email.com", desc2: "support@foodzy.com", color: "blue", gradient: "from-blue-500 to-sky-500" },
    { icon: Clock, title: "Opening Hours", desc1: "Mon – Fri: 8AM – 8PM", desc2: "Sat – Sun: 9AM – 6PM", color: "purple", gradient: "from-purple-500 to-pink-500" },
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Link to="/" className="hover:text-red-500 transition">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900 dark:text-white font-medium">Contact Us</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-red-500 font-bold tracking-wider mb-2">CONTACT US</p>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-4">
            Get in Touch With Us
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Have a question, suggestion, or want to partner with us? We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {contactInfo.map((info, i) => (
            <div key={i} className="group relative p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${info.gradient} opacity-10 group-hover:opacity-20 transition`} />
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${info.gradient} flex items-center justify-center text-white shadow-lg mb-5`}>
                <info.icon size={26} />
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3">{info.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{info.desc1}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{info.desc2}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-500">
                <MessageCircle size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Send us a Message</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">We usually respond within 24 hours</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Your Name *</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent focus:bg-white dark:focus:bg-gray-800 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address *</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent focus:bg-white dark:focus:bg-gray-800 transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent focus:bg-white dark:focus:bg-gray-800 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Your Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Write your message here..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent focus:bg-white dark:focus:bg-gray-800 transition resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={submitted || sending}
                className={`w-full sm:w-auto px-10 py-4 rounded-xl font-bold text-white flex items-center gap-2 transition shadow-xl ${
                  submitted
                    ? "bg-green-500 shadow-green-500/20"
                    : sending
                    ? "bg-red-400 shadow-none"
                    : "bg-red-500 hover:bg-red-600 shadow-red-500/25 hover:shadow-red-500/40 hover:-translate-y-0.5"
                }`}
              >
                {sending ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> Sending...
                  </>
                ) : submitted ? (
                  <>
                    <Check size={20} /> Message Sent!
                  </>
                ) : (
                  <>
                    <Send size={18} /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304605!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1691999999999!5m2!1sen!2s"
              className="w-full h-full min-h-[500px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
