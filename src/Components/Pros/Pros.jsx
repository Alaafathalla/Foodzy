import React, { useState } from "react"
import {
  ArrowRight,
  BadgePercent,
  Gift,
  Headphones,
  Mail,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Undo2,
} from "lucide-react"

import newsletterImage from "../../../dist/assets/home/newsletter-delivery.png"

const features = [
  {
    icon: BadgePercent,
    iconClasses: "bg-emerald-100 text-emerald-600",
    title: "Best prices & offers",
    description: "Orders $50 or more",
  },
  {
    icon: Truck,
    iconClasses: "bg-blue-100 text-blue-600",
    title: "Free delivery",
    description: "24/7 amazing services",
  },
  {
    icon: Gift,
    iconClasses: "bg-amber-100 text-amber-600",
    title: "Great daily deal",
    description: "When you sign up",
  },
  {
    icon: ShoppingBag,
    iconClasses: "bg-purple-100 text-purple-600",
    title: "Wide assortment",
    description: "Mega discounts",
  },
  {
    icon: Undo2,
    iconClasses: "bg-red-100 text-red-600",
    title: "Easy returns",
    description: "Within 30 days",
  },
  {
    icon: Headphones,
    iconClasses: "bg-orange-100 text-orange-600",
    title: "24/7 Support",
    description: "Help you anytime",
  },
]

export default function CTASection() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [error, setError] = useState("")

  const handleSubscribe = (event) => {
    event.preventDefault()

    const normalizedEmail = email.trim()

    if (!normalizedEmail || !normalizedEmail.includes("@")) {
      setError("Please enter a valid email address.")
      return
    }

    setError("")
    setSubscribed(true)

    window.setTimeout(() => {
      setSubscribed(false)
      setEmail("")
    }, 3000)
  }

  return (
    <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Newsletter banner */}
        <div
          className="
            relative isolate overflow-hidden
            rounded-[24px] bg-[#07101f]
            shadow-[0_25px_70px_rgba(2,8,23,0.24)]
            sm:rounded-[30px]
          "
        >
          {/* Background layers */}
          <div
            className="
              pointer-events-none absolute inset-0
              bg-[linear-gradient(105deg,#344155_0%,#253246_42%,#0d1b30_72%,#020711_100%)]
            "
          />

          <div
            className="
              pointer-events-none absolute
              -left-24 -top-28 h-[360px] w-[360px]
              rounded-full bg-rose-500/20 blur-[100px]
            "
          />

          <div
            className="
              pointer-events-none absolute
              right-[-100px] top-[-100px]
              h-[400px] w-[400px]
              rounded-full bg-blue-500/15 blur-[120px]
            "
          />

          <div
            className="
              relative z-10 grid min-h-[480px]
              grid-cols-1 items-center gap-8
              px-5 py-10
              sm:px-8 sm:py-12
              md:px-12
              lg:min-h-[535px] lg:grid-cols-[1.08fr_0.92fr]
              lg:px-14 lg:py-12
              xl:px-20
            "
          >
            {/* Content */}
            <div className="relative z-20 mx-auto w-full max-w-[610px] text-center lg:mx-0">
              <div
                className="
                  mb-7 inline-flex items-center gap-2
                  rounded-full border border-white/20
                  bg-white/10 px-4 py-2
                  text-[11px] font-extrabold uppercase
                  tracking-[0.06em] text-white
                  backdrop-blur-md
                "
              >
                <span aria-hidden="true">✨</span>
                Newsletter
              </div>

              <h2
                className="
                  text-[34px] font-black leading-[1.15]
                  tracking-[-0.02em] text-white
                  sm:text-[44px]
                  lg:text-[48px]
                  xl:text-[52px]
                "
              >
                Stay home & get your{" "}
                <span className="text-[#00d783]">
                  daily needs
                </span>{" "}
                from our shop
              </h2>

              <p
                className="
                  mx-auto mt-6 max-w-[570px]
                  text-sm leading-7 text-white/75
                  sm:text-base
                  lg:text-[17px]
                "
              >
                Start Your Daily Shopping with{" "}
                <span className="font-bold text-[#00d783]">
                  Foodzy
                </span>{" "}
                and get amazing deals delivered straight to your inbox.
              </p>

              <form
                onSubmit={handleSubscribe}
                className="
                  mx-auto mt-7 flex max-w-[520px]
                  flex-col gap-3
                  sm:flex-row
                "
                noValidate
              >
                <label
                  className="
                    flex min-h-[54px] flex-1 items-center
                    rounded-[17px] border border-white/10
                    bg-[#1b2639]/90 px-4
                    shadow-[0_10px_25px_rgba(0,0,0,0.16)]
                    transition
                    focus-within:border-white/25
                    focus-within:bg-[#202d43]
                  "
                >
                  <Mail
                    className="h-5 w-5 shrink-0 text-slate-400"
                    aria-hidden="true"
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value)
                      setError("")
                    }}
                    placeholder="Your email address"
                    aria-label="Your email address"
                    className="
                      h-full w-full bg-transparent
                      px-3 py-4 text-sm text-white
                      outline-none
                      placeholder:text-slate-500
                    "
                  />
                </label>

                <button
                  type="submit"
                  disabled={subscribed}
                  className={`
                    inline-flex min-h-[54px] items-center
                    justify-center gap-3 rounded-[17px]
                    px-7 text-sm font-extrabold text-white
                    shadow-[0_12px_28px_rgba(255,48,65,0.3)]
                    transition duration-300
                    disabled:cursor-not-allowed
                    ${
                      subscribed
                        ? "bg-emerald-500"
                        : "bg-[#ff3041] hover:bg-[#e92536] active:scale-[0.98]"
                    }
                  `}
                >
                  {subscribed ? (
                    "Subscribed!"
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              {error && (
                <p className="mt-3 text-sm font-medium text-red-300">
                  {error}
                </p>
              )}

              <div
                className="
                  mt-6 flex items-center justify-center gap-2
                  text-[11px] text-white/55
                "
              >
                <ShieldCheck
                  className="h-4 w-4 text-blue-400"
                  aria-hidden="true"
                />

                <span>
                  100% Privacy Protected. Unsubscribe anytime.
                </span>
              </div>
            </div>

            {/* Image */}
            <div
              className="
                relative hidden h-full min-h-[420px]
                items-end justify-center lg:flex
              "
            >
              <div
                className="
                  pointer-events-none absolute
                  bottom-6 left-1/2 h-24 w-[75%]
                  -translate-x-1/2 rounded-full
                  bg-black/55 blur-[34px]
                "
              />

              <img
                src={newsletterImage}
                alt="Grocery delivery service"
                className="
                  relative z-10 max-h-[435px]
                  w-full max-w-[500px]
                  object-contain object-bottom
                  drop-shadow-[0_24px_28px_rgba(0,0,0,0.45)]
                "
              />
            </div>
          </div>
        </div>

        {/* Features */}
        <div
          className="
            mt-10 grid grid-cols-2 gap-4
            sm:grid-cols-3
            lg:mt-14 lg:grid-cols-6
          "
        >
          {features.map((feature) => {
            const Icon = feature.icon

            return (
              <article
                key={feature.title}
                className="
                  group rounded-[18px]
                  border border-slate-100
                  bg-[#fafafa] p-4
                  shadow-[0_7px_24px_rgba(15,23,42,0.04)]
                  transition duration-300
                  hover:-translate-y-1
                  hover:border-slate-200
                  hover:shadow-[0_16px_35px_rgba(15,23,42,0.08)]
                  sm:p-5
                "
              >
                <div
                  className={`
                    mb-4 flex h-12 w-12
                    items-center justify-center
                    rounded-[15px]
                    transition-transform duration-300
                    group-hover:scale-105
                    ${feature.iconClasses}
                  `}
                >
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="text-sm font-extrabold leading-5 text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {feature.description}
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}