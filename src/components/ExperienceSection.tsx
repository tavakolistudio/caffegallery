"use client"
import { motion } from "framer-motion"
import { Coffee, Palette, UtensilsCrossed, Star, MapPin } from "lucide-react"
import { useLang } from "@/lib/i18n"
import { siteData } from "@/data/site"

const icons = [Coffee, Palette, UtensilsCrossed, Star, MapPin]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function ExperienceSection() {
  const { lang, isRtl } = useLang()
  const copy = siteData.copy[lang].experience

  return (
    <section
      id="experience"
      dir={isRtl ? "rtl" : "ltr"}
      className="relative py-28 px-6 bg-[#080604]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F4E9D8] mb-4">
            {copy.headline}
          </h2>
          <p className="text-[#B8A58F] text-lg">{copy.subtext}</p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5"
        >
          {copy.items.map((card, i) => {
            const Icon = icons[i]
            return (
              <motion.div
                key={i}
                variants={item}
                className="group relative flex flex-col gap-4 p-6 rounded-2xl bg-[#120E0A] border border-[rgba(244,233,216,0.08)] hover:border-[#C58A45]/40 transition-all duration-300 hover:bg-[#1A1208] cursor-default"
              >
                {/* Amber glow on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#C58A45]/5 to-transparent" />

                <div className="relative w-10 h-10 rounded-xl bg-[#C58A45]/10 border border-[#C58A45]/20 flex items-center justify-center group-hover:bg-[#C58A45]/20 transition-colors">
                  <Icon size={18} className="text-[#C58A45]" />
                </div>

                <div className="relative">
                  <h3 className="font-semibold text-[#F4E9D8] mb-1.5">{card.title}</h3>
                  <p className="text-sm text-[#B8A58F] leading-relaxed">{card.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
