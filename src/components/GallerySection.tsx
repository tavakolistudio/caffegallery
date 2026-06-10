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
      className="relative py-28 px-6 bg-[#fafffa]"
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#121613]/8" />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-[clamp(2rem,4.5vw,3rem)] font-bold text-[#121613] mb-4 leading-tight">
            {copy.headline}
          </h2>
          <p className="text-[#516254] text-lg">{copy.subtext}</p>
        </motion.div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                active === cat
                  ? "bg-[#2bee4b] text-[#121613]"
                  : "bg-[#f0f4f0] border border-[#121613]/10 text-[#516254] hover:border-[#2bee4b]/40 hover:text-[#121613]"
              }`}
            >
              {categoryLabel[cat]}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
        >
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="break-inside-avoid cursor-pointer group"
                onClick={() => setLightbox(item.image)}
              >
                <div className="relative overflow-hidden rounded-[14px] border border-[#121613]/8 group-hover:border-[#2bee4b]/40 transition-all duration-300">
                  <img
                    src={item.image}
                    alt={lang === "fa" ? item.titleFa : item.titleEn}
                    className="w-full h-56 object-cover block grayscale group-hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#121613]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
                    <span className="text-[#fafffa] text-sm font-medium drop-shadow">
                      {lang === "fa" ? item.titleFa : item.titleEn}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#fafffa]/90 border border-[#2bee4b]/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#121613" strokeWidth="2">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </div>
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
            className="fixed inset-0 z-[100] bg-[#121613]/85 flex items-center justify-center p-8 backdrop-blur-md"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-[#fafffa]/20 flex items-center justify-center text-[#fafffa]/70 hover:text-[#fafffa] hover:border-[#2bee4b] transition-all"
              onClick={() => setLightbox(null)}
            >
              <X size={18} />
            </button>
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              className="max-w-3xl w-full rounded-2xl overflow-hidden border border-[#fafffa]/15"
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
