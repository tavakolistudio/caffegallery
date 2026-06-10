"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CheckCircle2, Phone } from "lucide-react"
import { useLang } from "@/lib/i18n"
import { siteData } from "@/data/site"

export default function ConsultingSection() {
  const { lang, isRtl } = useLang()
  const copy = siteData.copy[lang].consulting

  const textRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: textRef.current, start: "top 80%", once: true },
        }
      )

      if (listRef.current) {
        gsap.fromTo(
          Array.from(listRef.current.children),
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0,
            stagger: 0.07,
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: { trigger: listRef.current, start: "top 78%", once: true },
          }
        )
      }
    })

    ScrollTrigger.refresh()

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="consulting"
      dir={isRtl ? "rtl" : "ltr"}
      className="relative py-28 px-6 bg-[#fafffa] overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#121613]/8" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <div ref={textRef} className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 w-fit">
              <span className="px-4 py-1.5 bg-[#2bee4b]/10 border border-[#2bee4b]/25 text-[#121613] text-xs font-semibold rounded-full">
                {lang === "fa" ? "خدمات مشاوره" : "Consulting Services"}
              </span>
            </div>

            <h2 className="font-display text-[clamp(2rem,4.5vw,3rem)] font-bold text-[#121613] leading-[1.05]">
              {copy.headline}
            </h2>

            <p className="text-[#516254] text-lg leading-relaxed">{copy.subtext}</p>

            <a
              href={`tel:${siteData.management.phone}`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#2bee4b] hover:bg-[#20cc3e] text-[#121613] font-bold rounded-full transition-all duration-200 w-fit text-sm"
              style={{ boxShadow: "rgba(16,94,29,0.35) 0px 8px 24px 0px" }}
            >
              <Phone size={16} />
              {copy.cta}
            </a>
          </div>

          {/* Services list */}
          <div ref={listRef} className="flex flex-col gap-3">
            {copy.services.map((service, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 rounded-xl bg-[#f0f4f0] border border-[#121613]/8 hover:border-[#2bee4b]/30 transition-all duration-200 group"
              >
                <CheckCircle2
                  size={16}
                  className="text-[#2bee4b] shrink-0 group-hover:scale-110 transition-transform"
                />
                <span className="text-[#121613] text-sm">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
