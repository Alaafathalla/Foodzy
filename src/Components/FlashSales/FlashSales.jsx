import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingCart,
  Star,
  Zap,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import p1 from "../../assets/products/p1.png";
import p2 from "../../assets/products/p2.png";
import p3 from "../../assets/products/p3.png";
import p4 from "../../assets/products/p4.png";
import p5 from "../../assets/products/p5.png";

import useCartStore from "../../store/cartStore";
import useWishlistStore from "../../store/wishlistStore";

const products = [
  {
    id: "flash-1",
    title: "Fresh Organic Lemon",
    price: 14.99,
    oldPrice: 24.99,
    rating: 4.8,
    image: p1,
    sold: 78,
  },
  {
    id: "flash-2",
    title: "Premium Mixed Vegetables",
    price: 19.5,
    oldPrice: 31,
    rating: 4.6,
    image: p2,
    sold: 61,
  },
  {
    id: "flash-3",
    title: "Crispy Snack Selection",
    price: 9.99,
    oldPrice: 16.5,
    rating: 4.7,
    image: p3,
    sold: 84,
  },
  {
    id: "flash-4",
    title: "Healthy Breakfast Pack",
    price: 22,
    oldPrice: 35,
    rating: 4.5,
    image: p4,
    sold: 55,
  },
  {
    id: "flash-5",
    title: "Family Grocery Bundle",
    price: 29.99,
    oldPrice: 46,
    rating: 4.9,
    image: p5,
    sold: 91,
  },
];

function getRemaining(target) {
  const total = Math.max(0, target - Date.now());

  const hours = Math.floor(total / 3600000);
  const minutes = Math.floor(
    (total % 3600000) / 60000
  );
  const seconds = Math.floor(
    (total % 60000) / 1000
  );

  return {
    hours,
    minutes,
    seconds,
  };
}

function getItemsPerView(width) {
  if (width >= 1280) {
    return 4;
  }

  if (width >= 1024) {
    return 3;
  }

  if (width >= 640) {
    return 2;
  }

  return 1;
}

export default function FlashSales() {
  const navigate = useNavigate();

  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  const {
    isInWishlist,
    toggleWishlist,
  } = useWishlistStore();

  const target = useMemo(
    () => Date.now() + 8 * 60 * 60 * 1000,
    []
  );

  const [remaining, setRemaining] = useState(() =>
    getRemaining(target)
  );

  const [itemsPerView, setItemsPerView] =
    useState(() => {
      if (typeof window === "undefined") {
        return 4;
      }

      return getItemsPerView(window.innerWidth);
    });

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const maxIndex = Math.max(
    0,
    products.length - itemsPerView
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemaining(getRemaining(target));
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [target]);

  useEffect(() => {
    const handleResize = () => {
      const nextItemsPerView = getItemsPerView(
        window.innerWidth
      );

      setItemsPerView(nextItemsPerView);
    };

    handleResize();

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  useEffect(() => {
    setCurrentIndex((current) =>
      Math.min(
        current,
        Math.max(
          0,
          products.length - itemsPerView
        )
      )
    );
  }, [itemsPerView]);

  const goToPrevious = () => {
    setCurrentIndex((current) =>
      Math.max(0, current - 1)
    );
  };

  const goToNext = () => {
    setCurrentIndex((current) =>
      Math.min(maxIndex, current + 1)
    );
  };

  const slideWidth = 100 / itemsPerView;

  return (
    <section className="bg-gray-50 px-4 py-14 transition-colors dark:bg-gray-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-red-100 bg-white shadow-sm dark:border-red-500/20 dark:bg-gray-900">
        {/* Header */}
        <div className="relative overflow-hidden border-b border-gray-100 bg-gradient-to-r from-red-500 via-red-500 to-orange-500 px-5 py-7 text-white dark:border-gray-800 sm:px-8 lg:px-10">
          <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />

          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-yellow-300/20 blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-white/90">
                <Zap
                  size={18}
                  fill="currentColor"
                />

                Flash sales
              </div>

              <h2 className="mt-2 text-3xl font-black sm:text-4xl">
                Deals ending soon
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
                Save more on popular grocery
                products before these limited
                offers expire.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="mr-1 text-sm font-bold text-white/90">
                Ends in
              </span>

              {[
                remaining.hours,
                remaining.minutes,
                remaining.seconds,
              ].map((value, index) => (
                <React.Fragment key={index}>
                  <span className="flex h-12 min-w-12 items-center justify-center rounded-xl bg-white px-3 text-lg font-black text-red-500 shadow-lg shadow-red-900/10">
                    {String(value).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  {index < 2 && (
                    <span className="text-xl font-black">
                      :
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Slider section */}
        <div className="p-5 sm:p-8 lg:p-10">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white sm:text-2xl">
                Today&apos;s best deals
              </h3>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Limited quantities available
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={goToPrevious}
                disabled={currentIndex === 0}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-red-500 hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-gray-200 disabled:hover:bg-white disabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:disabled:hover:border-gray-700 dark:disabled:hover:bg-gray-800 dark:disabled:hover:text-white"
                aria-label="Previous flash sale products"
              >
                <ChevronLeft size={21} />
              </button>

              <button
                type="button"
                onClick={goToNext}
                disabled={
                  currentIndex >= maxIndex
                }
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-red-500 hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-gray-200 disabled:hover:bg-white disabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:disabled:hover:border-gray-700 dark:disabled:hover:bg-gray-800 dark:disabled:hover:text-white"
                aria-label="Next flash sale products"
              >
                <ChevronRight size={21} />
              </button>
            </div>
          </div>

          {/* Slider viewport */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentIndex * slideWidth
                }%)`,
              }}
            >
              {products.map((product) => {
                const discount = Math.round(
                  ((product.oldPrice -
                    product.price) /
                    product.oldPrice) *
                    100
                );

                const inWishlist =
                  isInWishlist(product.id);

                return (
                  <div
                    key={product.id}
                    className="shrink-0 px-2"
                    style={{
                      width: `${slideWidth}%`,
                    }}
                  >
                    <article
                      onClick={() =>
                        navigate(
                          `/products/${product.id}`,
                          {
                            state: {
                              product,
                            },
                          }
                        )
                      }
                      className="group h-full cursor-pointer overflow-hidden rounded-3xl border border-gray-100 bg-white transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:hover:border-red-500/30"
                    >
                      <div className="relative aspect-[1.05/1] overflow-hidden bg-gray-50 dark:bg-gray-800">
                        <span className="absolute left-3 top-3 z-10 rounded-full bg-red-500 px-3 py-1.5 text-xs font-black text-white shadow-sm">
                          -{discount}%
                        </span>

                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleWishlist(product);
                          }}
                          className={`absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full shadow-md transition hover:scale-105 ${
                            inWishlist
                              ? "bg-red-500 text-white"
                              : "bg-white text-gray-500 dark:bg-gray-900 dark:text-gray-300"
                          }`}
                          aria-label="Toggle wishlist"
                        >
                          <Heart
                            size={17}
                            fill={
                              inWishlist
                                ? "currentColor"
                                : "none"
                            }
                          />
                        </button>

                        <img
                          src={product.image}
                          alt={product.title}
                          className="h-full w-full object-contain p-6 transition duration-500 group-hover:scale-110"
                        />
                      </div>

                      <div className="flex h-full flex-col p-5">
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star
                            size={15}
                            fill="currentColor"
                          />

                          <span className="text-xs font-bold text-gray-600 dark:text-gray-300">
                            {product.rating}
                          </span>
                        </div>

                        <h3 className="mt-2 min-h-12 text-base font-black leading-6 text-gray-900 dark:text-white">
                          {product.title}
                        </h3>

                        <div className="mt-3 flex flex-wrap items-baseline gap-2">
                          <span className="text-xl font-black text-red-500">
                            $
                            {product.price.toFixed(
                              2
                            )}
                          </span>

                          <span className="text-sm text-gray-400 line-through">
                            $
                            {product.oldPrice.toFixed(
                              2
                            )}
                          </span>
                        </div>

                        <div className="mt-5">
                          <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-orange-400 to-red-500 transition-all"
                              style={{
                                width: `${product.sold}%`,
                              }}
                            />
                          </div>

                          <div className="mt-2 flex items-center justify-between gap-3">
                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                              {product.sold}%
                              claimed
                            </p>

                            <p className="text-xs font-bold text-red-500">
                              {100 -
                                product.sold}{" "}
                              left
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            addToCart(product);
                          }}
                          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-600"
                        >
                          <ShoppingCart
                            size={17}
                          />

                          Add to cart
                        </button>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dots */}
          {maxIndex > 0 && (
            <div className="mt-7 flex items-center justify-center gap-2">
              {Array.from({
                length: maxIndex + 1,
              }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() =>
                    setCurrentIndex(index)
                  }
                  className={`h-2.5 rounded-full transition-all ${
                    currentIndex === index
                      ? "w-8 bg-red-500"
                      : "w-2.5 bg-gray-200 hover:bg-red-300 dark:bg-gray-700"
                  }`}
                  aria-label={`Go to slide ${
                    index + 1
                  }`}
                />
              ))}
            </div>
          )}

          <div className="mt-7 flex justify-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-5 py-3 font-bold text-red-500 transition hover:border-red-500 hover:bg-red-500 hover:text-white dark:border-red-500/20 dark:bg-red-500/10"
            >
              See all deals
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}