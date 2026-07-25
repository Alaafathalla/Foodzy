import React from "react";
import { Link } from "react-router-dom";
import { Heart, Trash2, ShoppingCart, ChevronLeft } from "lucide-react";
import useWishlistStore from "../../store/wishlistStore";
import cart6 from "../../assets/cart/6.png";
import cart7 from "../../assets/cart/7.png";
import cart8 from "../../assets/cart/8.png";
import cart9 from "../../assets/cart/9.png";

function ProductCard({ product }) {
  const { addToWishlist, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);
  
  return (
    <div
      className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 hover:shadow-md transition"
    >
      <div className="w-full rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="mt-3">
        <p className="text-xs text-gray-500 dark:text-gray-400">{product.tag}</p>
        <h3 className="mt-1 text-sm font-semibold text-gray-800 dark:text-white line-clamp-2">
          {product.title}
        </h3>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-red-500 font-semibold">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-xs text-gray-400 line-through">
            ${product.oldPrice.toFixed(2)}
          </span>
        </div>

        <div className="mt-3 flex gap-2">
          <button className="flex-1 rounded-md border border-gray-200 dark:border-gray-700 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800">
            Add to Cart
          </button>
          <button
            onClick={() => addToWishlist(product)}
            className={`p-2 rounded-md border ${inWishlist ? 'border-red-500 text-red-500' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
          >
            <Heart size={16} fill={inWishlist ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlistStore();

  const popularProducts = [
    {
      id: 101,
      title: "Best snacks with hazel nut mix pack 200gm",
      price: 120.25,
      oldPrice: 123.0,
      image: cart6,
      tag: "Snacks",
    },
    {
      id: 102,
      title: "Sweet snacks crunchy nut mix 250gm pack",
      price: 100.0,
      oldPrice: 110.0,
      image: cart7,
      tag: "Snacks",
    },
    {
      id: 103,
      title: "Best snacks with hazel nut mix pack 200gm",
      price: 120.25,
      oldPrice: 123.0,
      image: cart8,
      tag: "Snacks",
    },
    {
      id: 104,
      title: "Sweet snacks crunchy nut mix 250gm pack",
      price: 100.0,
      oldPrice: 110.0,
      image: cart9,
      tag: "Snacks",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          My Wishlist
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          {wishlist.length === 0 ? "Your wishlist is empty" : `You have ${wishlist.length} item(s) in your wishlist`}
        </p>
      </div>

      {wishlist.length > 0 ? (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="hidden md:grid grid-cols-12 bg-gray-50 dark:bg-gray-800 text-xs font-semibold text-gray-600 dark:text-gray-300 px-4 py-3">
            <div className="col-span-6">Product</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-2">Stock Status</div>
            <div className="col-span-2 text-center">Actions</div>
          </div>

          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {wishlist.map((item) => (
              <li key={item.id} className="px-4 md:px-4 py-4">
                {/* Desktop Row */}
                <div className="hidden md:grid grid-cols-12 items-center gap-4">
                  <div className="col-span-6 flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-14 object-contain rounded bg-white"
                    />
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {item.title}
                      </p>
                    </div>
                  </div>

                  <div className="col-span-2 text-gray-700 dark:text-gray-300">
                    ${item.price.toFixed(2)}
                  </div>

                  <div className="col-span-2 text-green-600 font-medium text-sm">
                    In Stock
                  </div>

                  <div className="col-span-2 flex items-center justify-center gap-2">
                    <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md text-sm flex items-center gap-1">
                      <ShoppingCart size={16} />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
                      aria-label="remove from wishlist"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Mobile Card */}
                <div className="md:hidden flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-contain rounded bg-white"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 dark:text-white">
                        {item.title}
                      </p>
                      <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        ${item.price.toFixed(2)}
                      </div>
                      <div className="mt-1 text-green-600 font-medium text-xs">
                        In Stock
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <button className="w-full bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md text-sm flex items-center justify-center gap-1">
                    <ShoppingCart size={16} />
                    Add to Cart
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <Heart size={64} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Add some products to your wishlist to see them here.</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm text-white bg-black px-5 py-2 rounded-md hover:bg-gray-800"
          >
            <ChevronLeft size={16} /> Browse Products
          </Link>
        </div>
      )}

      {/* Popular Products */}
      <section className="mt-14">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Popular Products
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Check out these popular products you might like
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {popularProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </section>
  );
}
