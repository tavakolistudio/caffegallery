"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLang } from "@/lib/i18n"
import { siteData } from "@/data/site"

export default function ConsultingSection() {
  const { lang, isRtl } = useLang()
  const copy = siteData.copy[lang].consulting

  const textRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: textRef.current, start: "top 85%", once: true },
        }
      )

      if (listRef.current) {
        gsap.fromTo(
          Array.from(listRef.current.children),
          { opacity: 0, y: 12 },
          {
            opacity: 1, y: 0,
            stagger: 0.06,
            duration: 0.5,
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
      id="consulting"
      dir={isRtl ? "rtl" : "ltr"}
      className="bg-[#fafffa] px-[50px] py-[120px]"
    >
      <div className="max-w-[1440px] mx-auto grid md:grid-cols-2 gap-[80px] items-start">
        {/* Left: headline + CTA */}
        <div ref={textRef} className="flex flex-col gap-[30px]">
          <p className="text-[11px] text-[#516254] uppercase tracking-[0.11px]">
            {lang === "fa" ? "خدمات مشاوره" : "Consulting"}
          </p>
          <h2
            className="font-editorial text-[#121613]"
            style={{ fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 0.90, letterSpacing: "-0.02em" }}
          >
            {copy.headline}
          </h2>
          <p className="text-[16px] text-[#516254] leading-[1.4] max-w-[400px]">{copy.subtext}</p>

          <a
            href={`tel:${siteData.management.phone}`}
            className="inline-flex items-center gap-2 px-[50px] py-[18px] bg-[#2bee4b] text-[#121613] text-[14px] font-semibold rounded-[10px] w-fit transition-opacity hover:opacity-90"
            style={{ boxShadow: "rgba(16,94,29,0.45) 1px 8px 20px 0px, rgba(18,146,39,0.25) 1px 8px 20px 0px" }}
          >
            {copy.cta}
            <span aria-hidden>{isRtl ? "←" : "→"}</span>
          </a>
        </div>

        {/* Right: service list — bullet text, no card backgrounds */}
        <ul ref={listRef} className="flex flex-col pt-[20px]">
          {copy.services.map((service, i) => (
            <li
              key={i}
              className="flex items-start gap-[16px] border-t border-[#121613]/10 py-[20px]"
            >
              {/* Voltage tick */}
              <span className="flex-shrink-0 w-[20px] h-[2px] bg-[#2bee4b] mt-[10px]" />
              <span className="text-[16px] text-[#121613] leading-[1.4]">{service}</span>
            </li>
          ))}
          <div className="border-t border-[#121613]/10" />
        </ul>
      </div>
    </section>
  )
}
