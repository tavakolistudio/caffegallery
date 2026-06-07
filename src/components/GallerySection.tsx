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
      className="relative py-28 px-6 bg-[#0C0906]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F4E9D8] mb-4">
            {copy.headline}
          </h2>
          <p className="text-[#B8A58F] text-lg">{copy.subtext}</p>
        </motion.div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                active === cat
                  ? "bg-[#C58A45] text-[#080604]"
                  : "bg-[#120E0A] border border-[rgba(244,233,216,0.12)] text-[#B8A58F] hover:border-[#C58A45]/40 hover:text-[#F4E9D8]"
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
                <div className="relative overflow-hidden rounded-2xl border border-[rgba(244,233,216,0.08)] group-hover:border-[#C58A45]/40 transition-all duration-300">
                  {/* Placeholder with gradient */}
                  <div className="w-full h-56 bg-gradient-to-br from-[#1A1208] to-[#120E0A] flex flex-col items-center justify-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#C58A45]/10 border border-[#C58A45]/20 flex items-center justify-center">
                      <div className="w-5 h-5 rounded border-2 border-[#C58A45]/50" />
                    </div>
                    <span className="text-xs text-[#B8A58F]">
                      {lang === "fa" ? item.titleFa : item.titleEn}
                    </span>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#C58A45]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-[#080604]/80 border border-[#C58A45] flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C58A45" strokeWidth="2">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                    </div>
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
            className="fixed inset-0 z-[100] bg-[#080604]/95 flex items-center justify-center p-8 backdrop-blur-md"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-[rgba(244,233,216,0.2)] flex items-center justify-center text-[#B8A58F] hover:text-[#F4E9D8] hover:border-[#C58A45] transition-all"
              onClick={() => setLightbox(null)}
            >
              <X size={18} />
            </button>
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              className="max-w-3xl w-full rounded-2xl overflow-hidden border border-[rgba(244,233,216,0.15)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full h-80 bg-gradient-to-br from-[#1A1208] to-[#120E0A] flex items-center justify-center">
                <div className="text-[#B8A58F] text-sm">
                  {lang === "fa" ? "تصویر در دسترس نیست" : "Image not available"}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
