"use client"
import { motion } from "framer-motion"
import { useLang } from "@/lib/i18n"
import { siteData } from "@/data/site"

export default function AboutSection() {
  const { lang, isRtl } = useLang()
  const copy = siteData.copy[lang].about

  return (
    <section
      id="about"
      dir={isRtl ? "rtl" : "ltr"}
      className="relative py-28 px-6 bg-[#080604] overflow-hidden"
    >
      {/* Decorative amber line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C58A45]/30 to-transparent" />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#C58A45]/4 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6 mb-10"
        >
          <div className="flex items-center gap-3">
            <span className="w-12 h-[1px] bg-[#C58A45]/50" />
            <span className="text-[#C58A45] text-xs tracking-[0.3em] uppercase font-medium">
              {siteData.brand.experienceYears}
            </span>
            <span className="w-12 h-[1px] bg-[#C58A45]/50" />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F4E9D8] mb-8 leading-snug"
        >
          {copy.headline}
        </motion.h2>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-[#B8A58F] text-lg leading-relaxed mb-12 max-w-2xl mx-auto"
        >
          {copy.body}
        </motion.p>

        {/* Manager card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="inline-flex flex-col items-center gap-4 px-10 py-8 bg-[#120E0A] border border-[rgba(244,233,216,0.1)] rounded-2xl"
        >
          {/* Avatar placeholder */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C58A45]/20 to-[#D7A85B]/10 border border-[#C58A45]/30 flex items-center justify-center">
            <span className="text-2xl font-bold text-[#C58A45]">
              {copy.manager.charAt(0)}
            </span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <h3 className="text-xl font-bold text-[#F4E9D8]">{copy.manager}</h3>
            <p className="text-sm text-[#B8A58F]">{copy.managerTitle}</p>
          </div>

          {/* Badge */}
          <div className="flex items-center gap-2 px-4 py-2 bg-[#C58A45]/10 border border-[#C58A45]/20 rounded-full">
            <span className="text-[#C58A45] font-bold text-sm">{copy.badge}</span>
            <span className="text-[#B8A58F] text-xs">{copy.badgeLabel}</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
