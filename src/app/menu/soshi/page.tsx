"use client"

import { useState } from "react"
import Link from "next/link"

interface MenuItem {
  name: string
  description: string
  price: number
}

interface Category {
  id: string
  name: string
  icon: string
  items: MenuItem[]
}

const categories: Category[] = [
  {
    id: "sushi",
    name: "سوشی",
    icon: "🍣",
    items: [
      { name: "پلاتر خام ۲۱ تکه", description: "کاری، خیارشور، آووکادو، سالمون", price: 229 },
      { name: "کاری رول", description: "کرب، سالمون، آووکادو، سبی ترنیاکی، سبی ماهوز", price: 295 },
      { name: "سویا رول", description: "سالمون، آووکادو، سبی ماهوز، سیب زمینی", price: 569 },
      { name: "دراگون ترنیاکی", description: "سالمون، آووکادو، سبی ترنیاکی", price: 360 },
      { name: "سالمون ترنیاکی", description: "سالمون، سبی ماهوز، سبی ترنیاکی، کنجد", price: 695 },
      { name: "فیلادلفیا رول", description: "کرب، آووکادو، سالمون، خیار، پنیر خامه‌ای", price: 750 },
      { name: "اسپیشیال سالمون", description: "سالمون آووکادو، سبی ماهوز، کنجد", price: 750 },
      { name: "توچیامو", description: "سیگو بخارپز، آووکادو، کنجد", price: 799 },
      { name: "نورئنو رول", description: "سیگو بخارپز، خیار، آووکادو، کنجد", price: 869 },
      { name: "شریمپ ماف", description: "سیگو بخارپز، آووکادو، ترت، نوکازلتش", price: 869 },
      { name: "اسپایسی رول", description: "سیگو، کرب، اسپایسی، سبوی", price: 975 },
      { name: "سالمون آووکادو", description: "سالمون، آووکادو، سبی ماهوز، نوکازلتش", price: 995 },
      { name: "اسپیشیال کالیفرنیا", description: "کرب، سیگو بخارپز، آووکادو، کنجد", price: 995 },
    ],
  },
  {
    id: "pishghaza",
    name: "پیش غذا",
    icon: "🥗",
    items: [
      { name: "مرغ سرخ کرده", description: "مرغ با پوشش ترد و ادویه مخصوص", price: 345 },
      { name: "میگو تمپورا", description: "میگو با پوشش ترد، سس ویژه", price: 245 },
      { name: "تمپورای سبزیجات", description: "سبزیجات تازه با پوشش تمپورا", price: 275 },
    ],
  },
  {
    id: "soup",
    name: "سوپ",
    icon: "🍲",
    items: [
      { name: "سوپ میسو", description: "سوپ سنتی ژاپنی با توفو و جلبک دریایی", price: 145 },
      { name: "سوپ تام یام", description: "سوپ تند تایلندی با میگو و قارچ", price: 195 },
    ],
  },
  {
    id: "salad",
    name: "سالاد",
    icon: "🥙",
    items: [
      { name: "چیانگ مایی", description: "مرغ، کاهو، خیار، گشنیز، آووکادو", price: 245 },
      { name: "سالاد هیکو آووکادو", description: "خیار، آووکادو، خیار خشک، سبزیجات تازه", price: 275 },
      { name: "سالاد تاکو", description: "مرغ، آووکادو، سالمون، گشنیز، سس مخصوص", price: 345 },
    ],
  },
  {
    id: "tom-yum",
    name: "خوراک تام یام",
    icon: "🍛",
    items: [
      { name: "تام یام مرغ", description: "مرغ، بروکلی، فلفل دلمه، ادویه تام یام", price: 795 },
      { name: "تام یام میگو", description: "میگو، بروکلی، فلفل دلمه، ادویه تام یام", price: 945 },
    ],
  },
  {
    id: "chap-sobi",
    name: "چاپ سوبی",
    icon: "🥘",
    items: [
      { name: "چاپ سوبی مرغ", description: "مرغ، سبزیجات، برنج، سس مخصوص", price: 175 },
      { name: "چاپ سوبی میگو", description: "میگو، سبزیجات، برنج، سس مخصوص", price: 135 },
    ],
  },
  {
    id: "nodel",
    name: "نودل",
    icon: "🍜",
    items: [
      { name: "نودل مرغ", description: "نودل با مرغ، سبزیجات و سس سویا", price: 195 },
      { name: "نودل میگو", description: "نودل با میگو، سبزیجات و سس اسپایسی", price: 245 },
    ],
  },
  {
    id: "kari-talai",
    name: "کاری طلایی ژاپنی",
    icon: "🍛",
    items: [
      { name: "کاری طلایی مرغ", description: "مرغ، سیب‌زمینی، هویج، سس کاری طلایی", price: 285 },
      { name: "کاری طلایی میگو", description: "میگو، سیب‌زمینی، هویج، سس کاری طلایی", price: 345 },
    ],
  },
  {
    id: "khorak",
    name: "خوراک",
    icon: "🍖",
    items: [
      { name: "خوراک مرغ", description: "مرغ گریل شده با سبزیجات بخارپز", price: 295 },
      { name: "خوراک میگو", description: "میگو گریل شده با سس مخصوص", price: 345 },
    ],
  },
  {
    id: "hitachi",
    name: "هیتاچی برنج سرخ‌کرده",
    icon: "🍚",
    items: [
      { name: "برنج سرخ‌کرده مرغ", description: "برنج، مرغ، سبزیجات، تخم‌مرغ، سس سویا", price: 285 },
      { name: "برنج سرخ‌کرده میگو", description: "برنج، میگو، سبزیجات، تخم‌مرغ، سس سویا", price: 325 },
    ],
  },
  {
    id: "sambal",
    name: "خوراک سامبال",
    icon: "🌶️",
    items: [
      { name: "سامبال مرغ", description: "مرغ با سس سامبال تند اندونزیایی", price: 359 },
      { name: "سامبال هیتاچی", description: "ترکیب ویژه هیتاچی با سس سامبال", price: 395 },
      { name: "سامبال میگو", description: "میگو با سس سامبال تند اندونزیایی", price: 395 },
    ],
  },
  {
    id: "kari-ghermez",
    name: "کاری قرمز تایلندی",
    icon: "🍲",
    items: [
      { name: "کاری قرمز مرغ", description: "مرغ، بادنجان، فلفل قرمز، شیر نارگیل", price: 295 },
      { name: "کاری قرمز میگو", description: "میگو، بادنجان، فلفل قرمز، شیر نارگیل", price: 365 },
    ],
  },
  {
    id: "jajang",
    name: "جاجانگمیون",
    icon: "🍝",
    items: [
      { name: "جاجانگمیون کره‌ای", description: "رشته، سس سیاه لوبیا، گوشت، پیاز، خیار", price: 295 },
    ],
  },
  {
    id: "sabzijat",
    name: "بشقاب سبزیجات",
    icon: "🥦",
    items: [
      { name: "بشقاب سبزیجات بخارپز", description: "ترکیب سبزیجات فصل با سس سویا", price: 195 },
      { name: "بشقاب سبزیجات گریل", description: "سبزیجات گریل شده با روغن زیتون", price: 225 },
    ],
  },
  {
    id: "chili",
    name: "خوراک چیلی",
    icon: "🌶️",
    items: [
      { name: "چیلی مرغ", description: "مرغ، سس چیلی تند، فلفل قرمز، پیاز", price: 295 },
      { name: "چیلی میگو", description: "میگو، سس چیلی تند، فلفل قرمز", price: 345 },
    ],
  },
  {
    id: "brocoli",
    name: "خوراک بروکلی",
    icon: "🥦",
    items: [
      { name: "بروکلی مرغ", description: "مرغ و بروکلی با سس سویا و زنجبیل", price: 275 },
      { name: "بروکلی میگو", description: "میگو و بروکلی با سس اویسطر", price: 325 },
    ],
  },
]

export default function SoshiMenuPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const selected = categories.find((c) => c.id === activeCategory)

  return (
    <div
      dir="rtl"
      className="min-h-screen"
      style={{ fontFamily: "'Vazirmatn', sans-serif", background: "#f5f5f0" }}
    >
      {/* Stripe header band */}
      <div
        style={{
          height: 18,
          background:
            "repeating-linear-gradient(-45deg, #f0f0f0 0px, #f0f0f0 10px, #9dc89e 10px, #9dc89e 20px)",
        }}
      />

      {/* Main green header */}
      <div style={{ background: "#2b7b32" }} className="px-6 py-8 text-center text-white">
        <p className="text-sm mb-2 opacity-80 tracking-widest">www.caffegallery.ir</p>
        <h1 className="text-4xl font-bold tracking-wide">منو سوشی گالری</h1>
      </div>

      {/* Stripe bottom band */}
      <div
        style={{
          height: 12,
          background:
            "repeating-linear-gradient(-45deg, #f0f0f0 0px, #f0f0f0 10px, #9dc89e 10px, #9dc89e 20px)",
        }}
      />

      {activeCategory === null ? (
        /* Category Grid */
        <div style={{ background: "#2b7b32" }} className="px-4 py-6 min-h-screen">
          <div className="grid grid-cols-4 gap-3 max-w-lg mx-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="flex flex-col items-center gap-1 group"
              >
                <div
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    border: "2px solid rgba(255,255,255,0.25)",
                  }}
                  className="w-full aspect-square rounded-xl flex items-center justify-center text-3xl transition-all group-hover:scale-105 group-hover:bg-white/20"
                >
                  {cat.icon}
                </div>
                <span
                  className="text-white text-center leading-tight"
                  style={{ fontSize: "0.65rem", fontWeight: 600 }}
                >
                  {cat.name}
                </span>
              </button>
            ))}
          </div>

          <p
            className="text-center mt-10 text-white/60 text-sm"
            style={{ letterSpacing: "0.1em" }}
          >
            ورق بزنید
          </p>
        </div>
      ) : (
        /* Category Items Page */
        <div style={{ background: "#e0f2e9", minHeight: "100vh" }} className="pb-12">
          {/* Category Header */}
          <div
            style={{ background: "#2b7b32" }}
            className="flex items-center justify-between px-4 py-3"
          >
            <button
              onClick={() => setActiveCategory(null)}
              className="text-white/80 hover:text-white text-sm flex items-center gap-1"
            >
              ← بازگشت
            </button>
            <h2 className="text-white font-bold text-lg">{selected?.name}</h2>
            <span className="text-white/60 text-xs">
              {selected?.icon}
            </span>
          </div>

          {/* Items */}
          <div className="max-w-xl mx-auto px-4 pt-6 space-y-4">
            {selected?.items.map((item, i) => (
              <div
                key={i}
                style={{
                  background: "white",
                  borderRight: "4px solid #2b7b32",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
                className="rounded-xl overflow-hidden flex"
              >
                {/* Photo placeholder */}
                <div
                  style={{
                    background: "linear-gradient(135deg, #c8e6c9, #a5d6a7)",
                    minWidth: 90,
                    width: 90,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 32,
                  }}
                >
                  {selected.icon}
                </div>

                {/* Info */}
                <div className="flex-1 px-4 py-3 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-gray-800 text-base leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center justify-end">
                    <span
                      style={{ background: "#2b7b32", color: "white" }}
                      className="text-xs font-bold px-3 py-1 rounded-full"
                    >
                      {item.price.toLocaleString("fa-IR")} هزار تومان
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Back to categories */}
          <div className="text-center mt-8">
            <button
              onClick={() => setActiveCategory(null)}
              style={{ background: "#2b7b32", color: "white" }}
              className="px-6 py-2 rounded-full text-sm font-bold"
            >
              بازگشت به منو
            </button>
          </div>
        </div>
      )}

      {/* Footer stripe */}
      <div
        style={{
          height: 12,
          background:
            "repeating-linear-gradient(-45deg, #f0f0f0 0px, #f0f0f0 10px, #9dc89e 10px, #9dc89e 20px)",
        }}
      />
    </div>
  )
}
