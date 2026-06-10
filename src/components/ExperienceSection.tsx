"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLang } from "@/lib/i18n"
import { siteData } from "@/data/site"

export default function ExperienceSection() {
  const { lang, isRtl } = useLang()
  const copy = siteData.copy[lang].experience

  const headlineRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: headlineRef.current, start: "top 85%", once: true },
        }
      )

      if (listRef.current) {
        gsap.fromTo(
          Array.from(listRef.current.children),
          { opacity: 0, y: 16 },
          {
            opacity: 1, y: 0,
            stagger: 0.07,
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: { trigger: listRef.current, start: "top 82%", once: true },
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
      className="bg-[#fafffa] px-[50px] py-[120px]"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Section label + heading in editorial scale */}
        <div ref={headlineRef} className="mb-[80px]">
          <p className="text-[11px] text-[#516254] uppercase tracking-[0.11px] mb-[20px]">
            {lang === "fa" ? "تجربه" : "Experience"}
          </p>
          <h2
            className="font-editorial text-[#121613]"
            style={{ fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 0.90, letterSpacing: "-0.02em", maxWidth: "700px" }}
          >
            {copy.headline}
          </h2>
        </div>

        {/* Feature list — type hierarchy, no cards */}
        <ul ref={listRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-0">
          {copy.items.map((card, i) => (
            <li
              key={i}
              className="border-t border-[#121613]/10 py-[30px] pr-[20px]"
            >
              {/* Voltage tick accent */}
              <span className="block w-[40px] h-[2px] bg-[#2bee4b] mb-[20px]" />
              <h3 className="text-[18px] text-[#121613] font-medium mb-[10px] leading-[1.3]">
                {card.title}
              </h3>
              <p className="text-[14px] text-[#516254] leading-[1.4]">{card.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
