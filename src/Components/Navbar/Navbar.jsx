import React, { useState, useEffect } from "react";
import {
  Menu,
  Search,
  Phone,
  User,
  Heart,
  ShoppingCart,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import useWishlistStore from "../../store/wishlistStore";
import useCartStore from "../../store/cartStore";
import { authService } from "../../services";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.isAuthenticated());
  const [userName, setUserName] = useState(authService.getCurrentUser()?.name);
  const navigate = useNavigate();
  const wishlistCount = useWishlistStore((state) => state.wishlist.length);
  const cartCount = useCartStore((state) => state.getItemCount());

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(authService.isAuthenticated());
      setUserName(authService.getCurrentUser()?.name);
    };
    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setIsLoggedIn(false);
      setUserName(null);
      navigate("/login");
    }
  };

  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 transition-colors duration-300 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 lg:px-8">
          {/* Logo & Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-700 dark:text-gray-200"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>

            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="logo" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full" />
              <div className="leading-tight">
                <p className="text-lg font-bold text-gray-800 dark:text-white">
                  Foodzy
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                  A Treasure of Tastes
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-700 dark:text-gray-200">
            <Link to="/" className="hover:text-red-500 transition">Home</Link>
            <Link to="/category" className="hover:text-red-500 transition flex items-center gap-1">
              Category
            </Link>
            <Link to="/products" className="hover:text-red-500 transition flex items-center gap-1">
              Products  
            </Link>
            <Link to="/blog" className="hover:text-red-500 transition">Blog</Link>
            <Link to="/about" className="hover:text-red-500 transition">About</Link>
            <Link to="/faq" className="hover:text-red-500 transition">FAQ</Link>
          </nav>

          {/* Phone */}
          <div className="hidden lg:flex items-center gap-1 text-sm text-gray-500 dark:text-gray-300">
            <Phone size={16} className="text-red-500" />
            <span>+123 (456) 7890</span>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden px-4 py-3 space-y-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 text-sm font-medium">
            <Link to="/" className="block py-2" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/category" className="block py-2" onClick={() => setIsMobileMenuOpen(false)}>Category</Link>
            <Link to="/products" className="block py-2" onClick={() => setIsMobileMenuOpen(false)}>Products</Link>
            <Link to="/blog" className="block py-2" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
            <Link to="/about" className="block py-2" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            <Link to="/faq" className="block py-2" onClick={() => setIsMobileMenuOpen(false)}>FAQ</Link>
            <div className="pt-2 border-t dark:border-gray-700 space-y-2 mt-4">
              {!isLoggedIn ? (
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-red-600 font-semibold">Login</Link>
              ) : (
                <button onClick={logout} className="block text-left text-red-600 w-full py-2 font-semibold">Logout</button>
              )}
              <Link to="/wishlist" className="block py-2 flex items-center justify-between" onClick={() => setIsMobileMenuOpen(false)}>
                <span>Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="block py-2 flex items-center justify-between" onClick={() => setIsMobileMenuOpen(false)}>
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}

        {/* Desktop Search + Actions */}
        <div className="px-4 pb-3 lg:px-8 hidden lg:flex items-center justify-between gap-6">
          {/* Search */}
          <div className="flex w-full max-w-4xl border border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden bg-white dark:bg-gray-800 focus-within:ring-2 focus-within:ring-red-500 focus-within:border-transparent transition">
            <input
              type="text"
              placeholder="Search For Items..."
              className="px-4 py-2.5 w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none"
            />
            <select className="text-sm border-l border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-3 outline-none">
              <option>All Categories</option>
              <option>Snacks</option>
              <option>Drinks</option>
              <option>Fruits & Vegetables</option>
              <option>Dairy</option>
            </select>
            <button className="bg-black hover:bg-red-500 text-white px-5 flex items-center justify-center transition">
              <Search size={16} />
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-5 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
            {!isLoggedIn ? (
              <Link to="/login" className="flex items-center gap-1.5 hover:text-red-500 transition font-medium">
                <User size={18} />
                <span>Login</span>
              </Link>
            ) : (
              <button onClick={logout} className="flex items-center gap-1.5 hover:text-red-500 transition font-medium">
                <User size={18} />
                <span>Logout</span>
              </button>
            )}
            <Link to="/wishlist" className="flex items-center gap-1.5 hover:text-red-500 transition font-medium relative">
              <Heart size={18} />
              <span>Wishlist</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center ring-2 ring-white dark:ring-gray-900">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link to="/cart" className="flex items-center gap-1.5 hover:text-red-500 transition font-medium relative">
              <ShoppingCart size={18} />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center ring-2 ring-white dark:ring-gray-900">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;





