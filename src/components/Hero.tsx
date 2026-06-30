"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import { useLang } from "@/lib/i18n"
import { siteData } from "@/data/site"

const heroImages = [
  "/images/gallery/cafe-day-1.jpg",
  "/images/gallery/cafe-night-1.jpg",
  "/images/gallery/cafe-day-2.jpg",
  "/images/gallery/cafe-fountain.jpg",
  "/images/gallery/cafe-tea.jpg",
]

export default function Hero() {
  const { lang, isRtl } = useLang()
  const copy = siteData.copy[lang].hero
  const [currentImg, setCurrentImg] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((i) => (i + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section
      id="hero"
      dir={isRtl ? "rtl" : "ltr"}
      className="relative min-h-screen flex flex-col items-center overflow-hidden bg-[#080604]"
    >
      {/* Photo slideshow background */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              i === currentImg ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 z-[1] bg-[#080604]/65" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#080604]/50 via-transparent to-[#080604]" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#080604]/30 via-transparent to-[#080604]/30" />

      {/* Content */}
      <div className="flex-1 flex items-center justify-center w-full pt-24 pb-8">
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center mb-6"
          >
            <Image
              src="/images/brand/cafe-gallery-logo.png"
              alt={lang === "fa" ? "کافه گالری" : "Caffegallery"}
              width={340}
              height={333}
              priority
              className="h-20 sm:h-24 md:h-28 w-auto drop-shadow-2xl"
            />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="w-8 h-[1px] bg-[#C58A45]" />
            <span className="text-[#C58A45] text-xs tracking-[0.25em] uppercase font-medium">
              {siteData.brand.experienceYears}
            </span>
            <span className="w-8 h-[1px] bg-[#C58A45]" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#F4E9D8] leading-tight mb-6 drop-shadow-lg"
          >
            {copy.headline}
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-[#B8A58F] leading-relaxed max-w-2xl mx-auto mb-10"
          >
            {copy.subtext}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#branches"
              className="px-8 py-3.5 bg-[#C58A45] hover:bg-[#D7A85B] text-[#080604] font-semibold rounded-full transition-all duration-200 text-sm tracking-wide"
            >
              {copy.ctaBranches}
            </a>
            <a
              href="#gallery"
              className="px-8 py-3.5 border border-[rgba(244,233,216,0.25)] text-[#F4E9D8] hover:border-[#C58A45] hover:text-[#C58A45] font-medium rounded-full transition-all duration-200 text-sm tracking-wide backdrop-blur-sm"
            >
              {copy.ctaGallery}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Slideshow dots */}
      <div className="relative z-10 flex gap-2 mb-6">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImg(i)}
            className={`rounded-full transition-all duration-300 ${
              i === currentImg
                ? "w-6 h-1.5 bg-[#C58A45]"
                : "w-1.5 h-1.5 bg-[#B8A58F]/40 hover:bg-[#B8A58F]/70"
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="relative z-10 flex flex-col items-center gap-2 pb-10"
      >
        <span className="text-[#B8A58F] text-xs tracking-widest uppercase">{copy.scroll}</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={18} className="text-[#C58A45]" />
        </motion.div>
      </motion.div>
    </section>
  )
}
