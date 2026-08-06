import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import dish1 from '../../assets/home/dish1.png';
import dish2 from '../../assets/home/dish2.png';
import dish3 from '../../assets/home/dish3.png';
import dish4 from '../../assets/home/dish4.png';
import dish5 from '../../assets/home/dish5.png';
import { Heart, ShoppingCart } from 'lucide-react';
import useWishlistStore from '../../store/wishlistStore';
import useCartStore from '../../store/cartStore';

const dishes = [
  { id: 'dish-1', title: 'Fattoush salad', price: 12.5, description: 'A refreshing Levantine salad.', image: dish1 },
  { id: 'dish-2', title: 'Vegetable salad', price: 10.0, description: 'Fresh garden vegetables.', image: dish2 },
  { id: 'dish-3', title: 'Egg vegi salad', price: 11.75, description: 'Boiled egg and greens combo.', image: dish3 },
  { id: 'dish-4', title: 'Grilled veggie bowl', price: 14.0, description: 'Charred vegetables with herbs.', image: dish4 },
  { id: 'dish-5', title: 'Caesar salad', price: 13.5, description: 'Classic Caesar with a twist.', image: dish5 },
];

export default function SpecialDishesSlider() {
  const addToCart = useCartStore((state) => state.addToCart);
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-2 lg:px-4 py-12 bg-white dark:bg-gray-900 transition-colors duration-300">
      <p className="text-sm text-red-500 font-semibold tracking-wide uppercase mb-2">
        Special Dishes
      </p>
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 leading-tight text-gray-800 dark:text-white">
        Standout Dishes<br />From Our Menu
      </h2>

      <Splide
        options={{
          perPage: 3,
          gap: '1rem',
          arrows: true,
          pagination: false,
          rewind: true,
          breakpoints: {
            1280: { perPage: 2 },
            768: { perPage: 1 },
          },
        }}
        aria-label="Special Dishes Slider"
      >
        {dishes.map((dish, idx) => (
          <SplideSlide key={idx}>
            <div className="relative bg-white dark:bg-gray-800 shadow-md dark:shadow-none hover:shadow-lg dark:hover:shadow-md transition rounded-xl p-4 sm:p-10 flex flex-col items-center text-center h-full text-gray-800 dark:text-white">
              <button type="button" onClick={() => toggleWishlist(dish)} aria-label="Toggle wishlist" className={`absolute top-0 right-0 p-2 rounded-bl-xl text-white ${isInWishlist(dish.id) ? "bg-red-500" : "bg-gray-700 hover:bg-red-500"}`}>
                <Heart size={16} fill={isInWishlist(dish.id) ? "currentColor" : "none"} />
              </button>
              <img
                src={dish.image}
                alt={dish.title}
                className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-full shadow dark:shadow-md mb-4"
              />
              <h3 className="font-semibold text-lg sm:text-xl mb-1">{dish.title}</h3>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-300">
                {dish.description}
              </p>
              <button type="button" onClick={() => addToCart(dish)} className="mt-5 inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500">
                <ShoppingCart size={16} /> Add to Cart
              </button>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </section>
  );
}


