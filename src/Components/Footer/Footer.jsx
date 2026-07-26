import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import img1 from "../../assets/footer/1.png";
import img2 from "../../assets/footer/2.png";
import img3 from "../../assets/footer/3.png";
import img4 from "../../assets/footer/4.png";
import img5 from "../../assets/footer/5.png";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  const companyLinks = [
    { label: "About Us", to: "/about" },
    { label: "Delivery Information", to: "/faq" },
    { label: "Privacy Policy", to: "#" },
    { label: "Terms & Conditions", to: "#" },
    { label: "Contact Us", to: "/contact" },
    { label: "Support Center", to: "/contact" },
  ];

  const categoryLinks = [
    { label: "Dairy & Bakery", to: "/category" },
    { label: "Fruits & Vegetable", to: "/category" },
    { label: "Snack & Spice", to: "/category" },
    { label: "Juice & Drinks", to: "/category" },
    { label: "Chicken & Meat", to: "/category" },
    { label: "Fast Food", to: "/products" },
  ];

  const socialLinks = [
    { Icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
    { Icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
    { Icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  ];

  return (
    <footer className="bg-gradient-to-r from-[#fdfdfd] to-[#f4f4f4] dark:from-gray-900 dark:to-gray-800 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 shadow-inner transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo + Info */}
        <div className="space-y-4 text-start">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Foody" className="w-12 h-12 rounded-full" />
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Foodzy</h2>
              <p className="text-sm text-gray-400">A Product of Tomato</p>
            </div>
          </Link>
          <p className="text-sm leading-relaxed">
            FoodTree is the biggest market of grocery products. Get your daily
            needs from our store.
          </p>
          <div className="flex items-start gap-3 text-sm">
            <FaMapMarkerAlt className="mt-1 text-red-500 flex-shrink-0" />
            <p>51 Green St. Huntington chalo beach ontario, NY 11746 KY 4783, USA.</p>
          </div>
          <a href="mailto:example@email.com" className="flex items-center gap-3 text-sm hover:text-red-500 transition">
            <FaEnvelope className="text-red-500 flex-shrink-0" />
            <p>example@email.com</p>
          </a>
          <a href="tel:+911234567890" className="flex items-center gap-3 text-sm hover:text-red-500 transition">
            <FaPhoneAlt className="text-red-500 flex-shrink-0" />
            <p>+91 123 4567890</p>
          </a>
        </div>

        {/* Company Links */}
        <div className="space-y-4 text-start">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Company</h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            {companyLinks.map((item, i) => (
              <li key={i}>
                <Link to={item.to} className="hover:text-red-500 transition flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div className="space-y-4 text-start">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Category</h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            {categoryLinks.map((item, i) => (
              <li key={i}>
                <Link to={item.to} className="hover:text-red-500 transition flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Subscribe Our Newsletter</h3>
          <form onSubmit={(e) => e.preventDefault()} className="flex items-center border border-gray-300 dark:border-gray-600 rounded-full overflow-hidden shadow-sm">
            <input
              type="email"
              placeholder="Your email address.."
              className="w-full px-4 py-2 text-sm outline-none bg-white dark:bg-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
            <button type="submit" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 transition">
              ➤
            </button>
          </form>

          {/* Social Icons */}
          <div className="flex space-x-3">
            {socialLinks.map(({ Icon, href, label }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="bg-white dark:bg-gray-700 p-3 rounded-2xl shadow hover:text-red-500 hover:-translate-y-0.5 transition text-black dark:text-white"
              >
                <Icon className="text-xl" />
              </a>
            ))}
          </div>

          {/* Gallery Images */}
          <div>
            <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">Our Gallery</h4>
            <div className="grid grid-cols-5 gap-2">
              {[img1, img2, img3, img4, img5].map((img, index) => (
                <Link to="/products" key={index} aria-label={`Gallery ${index + 1}`}>
                  <img
                    src={img}
                    alt={`thumb-${index + 1}`}
                    className="w-full h-14 object-cover rounded-lg shadow hover:ring-2 hover:ring-red-500 hover:-translate-y-0.5 transition"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-4 border-t border-gray-200 dark:border-gray-700 mt-8">
        © 2025 <Link to="/" className="text-red-500 font-medium hover:underline">Foodzy</Link>, All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;


