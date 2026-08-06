import React from "react";
import { ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";

import heroFood from "../../assets/home/pastaImg.png";
import bgImg from "../../assets/home/background.png";

const heroContent = {
  label: "Fresh food, delivered fast",
  title: "The best way to fill your table.",
  description:
    "Discover fresh groceries, daily deals, and delicious meals delivered right to your door.",
  phone: "+123 (456) 7890",
};

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#07101f] text-white">
      {/* Background image */}
      <img
        src={bgImg}
        alt=""
        aria-hidden="true"
        className="
          absolute
          inset-0
          -z-30
          h-full
          w-full
          object-cover
          object-center
          opacity-80

          lg:object-right
        "
      />

      {/* General dark layer */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          -z-20
          bg-black/30
        "
      />

      {/* Hides the text already included inside background.png */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-y-0
          left-0
          -z-10
          w-full
          bg-gradient-to-r
          from-[#05090d]
          from-0%
          via-[#05090d]/95
          via-42%
          to-transparent
          to-78%

          lg:w-[72%]
        "
      />

      {/* Additional soft shadow behind the real text */}
      <div
        aria-hidden="true"
        className="
          absolute
          left-0
          top-0
          -z-[5]
          h-full
          w-full
          bg-[radial-gradient(circle_at_25%_50%,rgba(3,7,12,0.98)_0%,rgba(3,7,12,0.9)_32%,transparent_66%)]
        "
      />

      <div
        className="
          mx-auto
          grid
          min-h-[620px]
          max-w-7xl
          grid-cols-1
          items-center
          gap-8
          px-4
          py-16

          sm:px-6
          sm:py-20

          lg:min-h-[680px]
          lg:grid-cols-[0.9fr_1.1fr]
          lg:px-8
          lg:py-24
        "
      >
        {/* Content */}
        <div
          className="
            order-2
            relative
            z-10
            mx-auto
            max-w-2xl
            text-center

            lg:order-1
            lg:mx-0
            lg:text-left
          "
        >
          <span
            className="
              inline-flex
              rounded-full
              border
              border-white/20
              bg-white/10
              px-4
              py-2
              text-xs
              font-bold
              uppercase
              tracking-[0.18em]
              backdrop-blur-md
            "
          >
            {heroContent.label}
          </span>

          <h1
            className="
              mt-5
              text-4xl
              font-black
              leading-[1.05]
              tracking-tight

              sm:text-5xl
              lg:text-6xl
              xl:text-7xl
            "
          >
            {heroContent.title}
          </h1>

          <p
            className="
              mx-auto
              mt-5
              max-w-xl
              text-sm
              leading-7
              text-white/75

              sm:text-base

              lg:mx-0
              lg:text-lg
            "
          >
            {heroContent.description}
          </p>

          <div
            className="
              mt-8
              flex
              flex-col
              items-stretch
              justify-center
              gap-3

              sm:flex-row
              sm:items-center

              lg:justify-start
            "
          >
            <Link
              to="/products"
              className="
                inline-flex
                min-h-12
                items-center
                justify-center
                gap-2
                rounded-full
                bg-orange-500
                px-7
                py-3
                font-bold
                text-white
                transition-colors
                duration-300

                hover:bg-orange-600
              "
            >
              Order now
              <ArrowRight size={18} />
            </Link>

            <a
              href="tel:+1234567890"
              className="
                inline-flex
                min-h-12
                items-center
                justify-center
                gap-2
                rounded-full
                border
                border-white/25
                bg-white/10
                px-6
                py-3
                font-semibold
                backdrop-blur-md
                transition-colors
                duration-300

                hover:bg-white/20
              "
            >
              <Phone size={18} />
              {heroContent.phone}
            </a>
          </div>
        </div>

        {/* Product image */}
        <div
          className="
            order-1
            relative
            z-10
            flex
            min-h-[260px]
            items-center
            justify-center

            lg:order-2
            lg:min-h-[480px]
            lg:justify-end
          "
        >
          <div
            aria-hidden="true"
            className="
              absolute
              left-1/2
              top-1/2
              -z-10
              h-[70%]
              w-[80%]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-black/30
              blur-3xl
            "
          />

          <img
            src={heroFood}
            alt="Fresh roasted meal"
            className="
              h-auto
              w-[86%]
              max-w-[380px]
              object-contain
              drop-shadow-2xl

              sm:w-[70%]
              sm:max-w-[470px]

              lg:w-full
              lg:max-w-[610px]
            "
          />
        </div>
      </div>
    </section>
  );
}