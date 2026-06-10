"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLang } from "@/lib/i18n"
import { siteData } from "@/data/site"

export default function BranchesSection() {
  const { lang, isRtl } = useLang()
  const copy = siteData.copy[lang].branches

  const headlineRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

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
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0,
            stagger: 0.06,
            duration: 0.6,
            ease: "power3.out",
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
      id="branches"
      dir={isRtl ? "rtl" : "ltr"}
      className="bg-[#fafffa] px-[50px] py-[120px]"
    >
      <div className="max-w-[1440px] mx-auto">
        <div ref={headlineRef} className="mb-[80px]">
          <p className="text-[11px] text-[#516254] uppercase tracking-[0.11px] mb-[20px]">
            {lang === "fa" ? "شعبه‌ها" : "Branches"}
          </p>
          <h2
            className="font-editorial text-[#121613]"
            style={{ fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 0.90, letterSpacing: "-0.02em" }}
          >
            {copy.headline}
          </h2>
        </div>

        {/* Branch list — type hierarchy only, no cards */}
        <div ref={listRef} className="flex flex-col">
          {siteData.branches.map((branch) => {
            const name = lang === "fa" ? branch.nameFa : branch.nameEn
            const type = lang === "fa" ? branch.typeFa : branch.typeEn
            const address = lang === "fa" ? branch.addressFa : branch.addressEn
            const phone = lang === "fa" ? branch.phoneFa : branch.phone
            const hours = lang === "fa" ? branch.hoursFa : branch.hoursEn

            return (
              <div
                key={branch.id}
                className="grid grid-cols-[1fr_auto] gap-8 border-t border-[#121613]/10 py-[30px] group"
              >
                {/* Left: name + meta */}
                <div className="flex flex-col gap-[10px]">
                  <div className="flex flex-wrap items-baseline gap-4">
                    <h3 className="text-[18px] font-medium text-[#121613] leading-[1.2]">{name}</h3>
                    <span className="text-[11px] text-[#516254] uppercase tracking-[0.11px]">{type}</span>
                  </div>
                  <p className="text-[14px] text-[#516254] leading-[1.4]">{address}</p>
                  <div className="flex flex-wrap gap-[20px] text-[14px] text-[#516254]">
                    <span dir="ltr">{phone}</span>
                    <span className="text-[#121613]">{hours}</span>
                  </div>
                </div>

                {/* Right: ghost link actions */}
                <div className="flex flex-col gap-[10px] items-end justify-center">
                  <a
                    href={`tel:${branch.phone}`}
                    className="text-[13px] text-[#516254] hover:text-[#121613] underline underline-offset-4 transition-colors whitespace-nowrap"
                  >
                    {copy.call}
                  </a>
                  {branch.mapUrl ? (
                    <a
                      href={branch.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13px] text-[#516254] hover:text-[#121613] underline underline-offset-4 transition-colors whitespace-nowrap"
                    >
                      {copy.map}
                    </a>
                  ) : (
                    <span className="text-[13px] text-[#516254]/30 whitespace-nowrap">{copy.map}</span>
                  )}
                </div>
              </div>
            )
          })}
          {/* Closing rule */}
          <div className="border-t border-[#121613]/10" />
        </div>
      </div>
    </section>
  )
}
