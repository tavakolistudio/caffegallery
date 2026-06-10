"use client"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useLang } from "@/lib/i18n"
import { siteData } from "@/data/site"

export default function Hero() {
  const { lang, isRtl } = useLang()
  const copy = siteData.copy[lang].hero

  return (
    <section
      id="hero"
      dir={isRtl ? "rtl" : "ltr"}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#fafffa]"
    >
      {/* Faint ruled lines — editorial texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, #121613 0px, #121613 1px, transparent 1px, transparent 64px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full pt-32 pb-24">
        <div className="grid md:grid-cols-[1fr_auto] gap-12 items-center">

          {/* Text column */}
          <div className="flex flex-col gap-8">
            {/* Experience tag */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <span className="h-[2px] w-10 bg-[#2bee4b]" />
              <span className="text-xs tracking-[0.28em] text-[#516254] uppercase font-medium">
                {siteData.brand.experienceYears}
              </span>
            </motion.div>

            {/* Display headline */}
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.2 }}
              className="font-display text-[clamp(3.5rem,10vw,8rem)] font-bold leading-[0.92] text-[#121613]"
            >
              {lang === "fa" ? (
                <>
                  <span className="block">کافه</span>
                  <span className="block italic text-[#2bee4b]">گالری</span>
                </>
              ) : (
                <>
                  <span className="block">Caffe</span>
                  <span className="block italic text-[#2bee4b]">gallery</span>
                </>
              )}
            </motion.h1>

            {/* Sub text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="text-[#516254] text-lg leading-relaxed max-w-md"
            >
              {copy.subtext}
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#branches"
                className="px-8 py-4 bg-[#2bee4b] hover:bg-[#20cc3e] text-[#121613] font-bold rounded-full transition-all duration-200 text-sm tracking-wide"
                style={{ boxShadow: "rgba(16,94,29,0.35) 0px 8px 24px 0px" }}
              >
                {copy.ctaBranches}
              </a>
              <a
                href="#gallery"
                className="px-8 py-4 border border-[#121613]/20 text-[#121613] hover:border-[#121613]/60 font-medium rounded-full transition-all duration-200 text-sm tracking-wide"
              >
                {copy.ctaGallery}
              </a>
            </motion.div>
          </div>

          {/* Photo tile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="hidden md:block relative"
          >
            <div className="w-[320px] h-[420px] rounded-[14px] overflow-hidden border border-[#121613]/8">
              <img
                src={siteData.gallery[0]?.image ?? ""}
                alt="کافه گالری"
                className="w-full h-full object-cover grayscale"
              />
            </div>
            {/* Floating stat chip */}
            <div className="absolute -bottom-5 -left-6 bg-[#fafffa] border border-[#121613]/10 rounded-2xl px-5 py-4 shadow-sm">
              <p className="text-3xl font-bold text-[#121613] leading-none">30<span className="text-[#2bee4b]">+</span></p>
              <p className="text-xs text-[#516254] mt-1">
                {lang === "fa" ? "سال تجربه" : "Years experience"}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[#516254] text-[10px] tracking-[0.28em] uppercase">{copy.scroll}</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={18} className="text-[#2bee4b]" />
        </motion.div>
      </motion.div>
    </section>
  )
}
