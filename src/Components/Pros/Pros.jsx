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

const features = [
  {
    icon: BadgePercent,
    iconClasses: "bg-white/10 text-white",
    title: "Best prices & offers",
    description: "Orders $50 or more",
  },
  {
    icon: Truck,
    iconClasses: "bg-white/10 text-white",
    title: "Free delivery",
    description: "24/7 amazing services",
  },
  {
    icon: Gift,
    iconClasses: "bg-white/10 text-white",
    title: "Great daily deal",
    description: "When you sign up",
  },
  {
    icon: ShoppingBag,
    iconClasses: "bg-white/10 text-white",
    title: "Wide assortment",
    description: "Mega discounts",
  },
  {
    icon: Undo2,
    iconClasses: "bg-white/10 text-white",
    title: "Easy returns",
    description: "Within 30 days",
  },
  {
    icon: Headphones,
    iconClasses: "bg-white/10 text-white",
    title: "24/7 Support",
    description: "Help you anytime",
  },
]

const highlights = [
  { value: "10k+", label: "Happy customers" },
  { value: "30m", label: "Average delivery" },
  { value: "99%", label: "Fresh product rate" },
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
    <section className="bg-[#020817] px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Newsletter banner */}
        <div
          className="
            relative isolate overflow-hidden
            rounded-[24px] border border-white/10
            bg-[#07101f]
            shadow-[0_25px_70px_rgba(2,8,23,0.45)]
            sm:rounded-[30px]
          "
        >
          {/* Background layers */}
          <div
            className="
              pointer-events-none absolute inset-0
              bg-[linear-gradient(130deg,#142033_0%,#0d1727_42%,#08111e_72%,#040914_100%)]
            "
          />

          <div
            className="
              pointer-events-none absolute
              -left-24 -top-28 h-[360px] w-[360px]
              rounded-full bg-white/10 blur-[100px]
            "
          />

          <div
            className="
              pointer-events-none absolute
              right-[-100px] top-[-100px]
              h-[400px] w-[400px]
              rounded-full bg-white/5 blur-[120px]
            "
          />

          <div
            className="
              relative z-10 px-5 py-10
              sm:px-8 sm:py-12
              md:px-12
              lg:px-14 lg:py-14
              xl:px-20
            "
          >
            <div
              className="
                mx-auto grid max-w-5xl
                grid-cols-1 gap-10
                lg:grid-cols-[1.1fr_0.9fr]
                lg:items-center
              "
            >
              {/* Content */}
              <div className="relative z-20 w-full max-w-[610px] text-center lg:text-left">
                <div
                  className="
                    mb-7 inline-flex items-center gap-2
                    rounded-full border border-white/15
                    bg-white/8 px-4 py-2
                    text-[11px] font-extrabold uppercase
                    tracking-[0.08em] text-white
                    backdrop-blur-md
                  "
                >
                  <span aria-hidden="true">✨</span>
                  Newsletter & Offers
                </div>

                <h2
                  className="
                    text-[34px] font-black leading-[1.12]
                    tracking-[-0.02em] text-white
                    sm:text-[44px]
                    lg:text-[50px]
                    xl:text-[56px]
                  "
                >
                  Fresh groceries, exclusive deals,
                  <span className="mt-1 block text-white/85">
                    and faster delivery
                  </span>
                </h2>

                <p
                  className="
                    mx-auto mt-6 max-w-[570px]
                    text-sm leading-7 text-slate-300
                    sm:text-base
                    lg:mx-0 lg:text-[17px]
                  "
                >
                  Subscribe to get weekly discounts, seasonal offers, and
                  product updates from{" "}
                  <span className="font-bold text-white">Foodzy</span> right in
                  your inbox.
                </p>

                <form
                  onSubmit={handleSubscribe}
                  className="
                    mx-auto mt-7 flex max-w-[560px]
                    flex-col gap-3
                    sm:flex-row
                    lg:mx-0
                  "
                  noValidate
                >
                  <label
                    className="
                      flex min-h-[56px] flex-1 items-center
                      rounded-[18px] border border-white/10
                      bg-white/5 px-4
                      shadow-[0_10px_25px_rgba(0,0,0,0.18)]
                      transition
                      focus-within:border-white/25
                      focus-within:bg-white/[0.07]
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
                      placeholder="Enter your email address"
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
                      inline-flex min-h-[56px] items-center
                      justify-center gap-3 rounded-[18px]
                      px-7 text-sm font-extrabold text-white
                      shadow-[0_12px_28px_rgba(15,23,42,0.35)]
                      transition duration-300
                      disabled:cursor-not-allowed
                      ${
                        subscribed
                          ? "bg-slate-500"
                          : "bg-slate-600 hover:bg-slate-700 active:scale-[0.98]"
                      }
                    `}
                  >
                    {subscribed ? (
                      "Subscribed!"
                    ) : (
                      <>
                        Subscribe Now
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
                    text-[11px] text-slate-400
                    lg:justify-start
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

              {/* Highlights */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {highlights.map((item) => (
                  <div
                    key={item.label}
                    className="
                      rounded-[22px] border border-white/10
                      bg-white/[0.04] p-6
                      backdrop-blur-sm
                      shadow-[0_12px_32px_rgba(0,0,0,0.18)]
                    "
                  >
                    <p className="text-3xl font-black tracking-[-0.03em] text-white">
                      {item.value}
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-300">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
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
                  border border-white/10
                  bg-[#0b1424] p-4
                  shadow-[0_7px_24px_rgba(0,0,0,0.22)]
                  transition duration-300
                  hover:-translate-y-1
                  hover:border-white/15
                  hover:bg-[#101b2d]
                  hover:shadow-[0_16px_35px_rgba(0,0,0,0.3)]
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

                <h3 className="text-sm font-extrabold leading-5 text-white">
                  {feature.title}
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-400">
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
