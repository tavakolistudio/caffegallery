"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Coffee, Palette, UtensilsCrossed, Star, MapPin } from "lucide-react"
import { useLang } from "@/lib/i18n"
import { siteData } from "@/data/site"

const icons = [Coffee, Palette, UtensilsCrossed, Star, MapPin]

export default function ExperienceSection() {
  const { lang, isRtl } = useLang()
  const copy = siteData.copy[lang].experience

  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 82%", once: true },
        }
      )

      if (cardsRef.current) {
        gsap.fromTo(
          Array.from(cardsRef.current.children),
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1,
            stagger: 0.1,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: { trigger: cardsRef.current, start: "top 80%", once: true },
          }
        )
      }
    })

    ScrollTrigger.refresh()

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="experience"
      dir={isRtl ? "rtl" : "ltr"}
      className="relative py-28 px-6 bg-[#080604]"
    >
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F4E9D8] mb-4">
            {copy.headline}
          </h2>
          <p className="text-[#B8A58F] text-lg">{copy.subtext}</p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5"
        >
          {copy.items.map((card, i) => {
            const Icon = icons[i]
            return (
              <div
                key={i}
                className="group relative flex flex-col gap-4 p-6 rounded-2xl bg-[#120E0A] border border-[rgba(244,233,216,0.08)] hover:border-[#C58A45]/40 transition-all duration-300 hover:bg-[#1A1208] cursor-default"
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#C58A45]/5 to-transparent" />
                <div className="relative w-10 h-10 rounded-xl bg-[#C58A45]/10 border border-[#C58A45]/20 flex items-center justify-center group-hover:bg-[#C58A45]/20 transition-colors">
                  <Icon size={18} className="text-[#C58A45]" />
                </div>
                <div className="relative">
                  <h3 className="font-semibold text-[#F4E9D8] mb-1.5">{card.title}</h3>
                  <p className="text-sm text-[#B8A58F] leading-relaxed">{card.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
