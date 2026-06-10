"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLang } from "@/lib/i18n"
import { siteData } from "@/data/site"

export default function AboutSection() {
  const { lang, isRtl } = useLang()
  const copy = siteData.copy[lang].about

  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      if (sectionRef.current) {
        gsap.fromTo(
          Array.from(sectionRef.current.querySelectorAll("[data-reveal]")),
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            stagger: 0.12,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 82%", once: true },
          }
        )
      }
    })

    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      dir={isRtl ? "rtl" : "ltr"}
      className="bg-[#fafffa] px-[50px] py-[120px]"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Section label */}
        <p data-reveal className="text-[11px] text-[#516254] uppercase tracking-[0.11px] mb-[20px]">
          {lang === "fa" ? "درباره ما" : "About"}
        </p>

        {/* Two-col: large display headline + body copy */}
        <div className="grid md:grid-cols-2 gap-[80px] items-start">
          <div>
            {/* Voltage tick accent */}
            <span data-reveal className="block w-[50px] h-[2px] bg-[#2bee4b] mb-[30px]" />
            <h2
              data-reveal
              className="font-editorial text-[#121613]"
              style={{ fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 0.90, letterSpacing: "-0.02em" }}
            >
              {copy.headline}
            </h2>
          </div>

          <div className="flex flex-col gap-[30px] pt-[20px]">
            <p data-reveal className="text-[16px] text-[#516254] leading-[1.4]">{copy.body}</p>

            {/* Manager card — type only, no filled panel */}
            <div data-reveal className="border-t border-[#121613]/10 pt-[30px] flex flex-col gap-[8px]">
              <p className="text-[11px] text-[#516254] uppercase tracking-[0.11px]">
                {copy.managerTitle}
              </p>
              <p className="text-[18px] font-medium text-[#121613]">{copy.manager}</p>
              <p className="text-[14px] text-[#516254]">
                <span className="text-[#2bee4b] font-semibold">{copy.badge}</span>
                {" "}{copy.badgeLabel}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
