"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Phone, MapPin, Clock, AlertTriangle, Map } from "lucide-react"
import { useLang } from "@/lib/i18n"
import { siteData } from "@/data/site"

export default function BranchesSection() {
  const { lang, isRtl } = useLang()
  const copy = siteData.copy[lang].branches

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
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0,
            stagger: 0.08,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: cardsRef.current, start: "top 78%", once: true },
          }
        )
      }
    })

    ScrollTrigger.refresh()

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="branches"
      dir={isRtl ? "rtl" : "ltr"}
      className="relative py-28 px-6 bg-[#f0f4f0]"
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#121613]/8" />

      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="font-display text-[clamp(2rem,4.5vw,3rem)] font-bold text-[#121613] mb-4 leading-tight">
            {copy.headline}
          </h2>
          <p className="text-[#516254] text-lg">{copy.subtext}</p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {siteData.branches.map((branch) => {
            const name = lang === "fa" ? branch.nameFa : branch.nameEn
            const type = lang === "fa" ? branch.typeFa : branch.typeEn
            const address = lang === "fa" ? branch.addressFa : branch.addressEn
            const phone = lang === "fa" ? branch.phoneFa : branch.phone
            const hours = lang === "fa" ? branch.hoursFa : branch.hoursEn
            const features = lang === "fa" ? branch.featuresFa : branch.featuresEn
            const note = lang === "fa" ? branch.noteFa : branch.noteEn

            return (
              <div
                key={branch.id}
                className="group flex flex-col rounded-2xl bg-[#fafffa] border border-[#121613]/8 hover:border-[#2bee4b]/40 transition-all duration-300 overflow-hidden"
              >
                <div className="w-full h-44 bg-[#f0f4f0] flex items-center justify-center relative overflow-hidden flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2bee4b]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="flex flex-col items-center gap-2 text-[#516254]/50">
                    <div className="w-12 h-12 rounded-xl border border-[#121613]/15 flex items-center justify-center">
                      <div className="w-6 h-6 rounded border-2 border-[#121613]/20" />
                    </div>
                    <span className="text-xs">{name.split("—")[0].trim()}</span>
                  </div>
                </div>

                <div className="p-5 flex flex-col gap-3 flex-1">
                  <div>
                    <h3 className="font-bold text-[#121613] leading-snug text-sm mb-2">{name}</h3>
                    <span className="inline-block px-3 py-0.5 bg-[#2bee4b]/10 border border-[#2bee4b]/20 text-[#121613] rounded-full text-xs font-medium">
                      {type}
                    </span>
                  </div>

                  <div className="flex gap-2 items-start text-xs text-[#516254]">
                    <MapPin size={12} className="text-[#2bee4b] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{address}</span>
                  </div>

                  <div className="flex gap-2 items-center text-xs text-[#516254]">
                    <Phone size={12} className="text-[#2bee4b] shrink-0" />
                    <span dir="ltr">{phone}</span>
                  </div>

                  <div className="flex gap-2 items-center text-xs">
                    <Clock size={12} className="text-[#2bee4b] shrink-0" />
                    <span className="text-[#121613] font-medium">{hours}</span>
                  </div>

                  {features.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {features.map((f, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-[#c8d2c8]/50 border border-[#121613]/10 text-[#516254] rounded-full text-[10px]"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  )}

                  {note && (
                    <div className="flex gap-2 items-start px-3 py-2 bg-[#2bee4b]/8 border border-[#2bee4b]/20 rounded-xl text-xs text-[#516254]">
                      <AlertTriangle size={11} className="shrink-0 mt-0.5 text-[#2bee4b]" />
                      <span>{note}</span>
                    </div>
                  )}

                  <div className="flex gap-2 mt-auto pt-2">
                    <a
                      href={`tel:${branch.phone}`}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#2bee4b]/10 border border-[#2bee4b]/25 hover:bg-[#2bee4b]/20 hover:border-[#2bee4b]/45 text-[#121613] rounded-xl text-xs font-medium transition-all duration-200"
                    >
                      <Phone size={12} />
                      {copy.call}
                    </a>

                    {branch.mapUrl ? (
                      <a
                        href={branch.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#121613]/6 border border-[#121613]/12 hover:bg-[#121613]/12 text-[#121613] rounded-xl text-xs font-medium transition-all duration-200"
                      >
                        <Map size={12} />
                        {copy.map}
                      </a>
                    ) : (
                      <button
                        disabled
                        title={copy.mapComingSoon}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#f0f4f0] border border-[#121613]/8 text-[#516254]/40 rounded-xl text-xs font-medium cursor-not-allowed"
                      >
                        <Map size={12} />
                        {copy.map}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
