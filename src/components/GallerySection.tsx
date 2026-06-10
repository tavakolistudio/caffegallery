"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useLang } from "@/lib/i18n"
import { siteData } from "@/data/site"

const categories = ["all", "interior", "art", "menu"] as const
type Category = (typeof categories)[number]

export default function GallerySection() {
  const { lang, isRtl } = useLang()
  const copy = siteData.copy[lang].gallery
  const [active, setActive] = useState<Category>("all")
  const [lightbox, setLightbox] = useState<string | null>(null)

  const categoryLabel: Record<Category, string> = {
    all: copy.all,
    interior: copy.interior,
    art: copy.art,
    menu: copy.menu,
  }

  const filtered =
    active === "all"
      ? siteData.gallery
      : siteData.gallery.filter((g) => g.category === active)

  return (
    <section
      id="gallery"
      dir={isRtl ? "rtl" : "ltr"}
      className="bg-[#fafffa] px-[50px] py-[120px]"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-[60px]">
          <div>
            <p className="text-[11px] text-[#516254] uppercase tracking-[0.11px] mb-[16px]">
              {lang === "fa" ? "گالری" : "Gallery"}
            </p>
            <h2
              className="font-editorial text-[#121613]"
              style={{ fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 0.90, letterSpacing: "-0.02em" }}
            >
              {copy.headline}
            </h2>
          </div>

          {/* Filter — ghost text links, not pills */}
          <div className="flex gap-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`text-[14px] transition-colors ${
                  active === cat
                    ? "text-[#121613] font-medium underline underline-offset-4"
                    : "text-[#516254] hover:text-[#121613]"
                }`}
              >
                {categoryLabel[cat]}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial masonry — images directly on Linen, no card chrome */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-[20px] space-y-[20px]">
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="break-inside-avoid cursor-pointer group"
                onClick={() => setLightbox(item.image)}
              >
                <div className="relative overflow-hidden rounded-[14px]">
                  <img
                    src={item.image}
                    alt={lang === "fa" ? item.titleFa : item.titleEn}
                    className="w-full h-56 object-cover block grayscale group-hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#121613]/0 group-hover:bg-[#121613]/20 transition-colors duration-300" />
                  {/* Caption — bottom-left, editorial style */}
                  <p className="absolute bottom-0 left-0 right-0 px-4 py-3 text-[12px] text-[#fafffa] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {lang === "fa" ? item.titleFa : item.titleEn}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#121613]/90 flex items-center justify-center p-8 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-[#fafffa]/20 flex items-center justify-center text-[#fafffa]/70 hover:text-[#fafffa] transition-colors"
              onClick={() => setLightbox(null)}
            >
              <X size={18} />
            </button>
            <motion.div
              initial={{ scale: 0.88 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.88 }}
              className="max-w-3xl w-full rounded-[14px] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox}
                alt=""
                className="w-full max-h-[80vh] object-contain bg-[#121613] block"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
