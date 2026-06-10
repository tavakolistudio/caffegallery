"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { useLang } from "@/lib/i18n"
import { siteData } from "@/data/site"

export default function Hero() {
  const { lang, isRtl } = useLang()
  const copy = siteData.copy[lang].hero
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", delay: 0.1 }
      )
      gsap.fromTo(
        imgRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out", delay: 0.35 }
      )
      gsap.fromTo(
        bottomRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.65 }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      dir={isRtl ? "rtl" : "ltr"}
      className="min-h-screen bg-[#fafffa] flex flex-col justify-between pt-[60px]"
    >
      {/* Display headline area — fills the upper portion */}
      <div className="relative px-[50px] pt-[80px] flex-1 flex flex-col justify-center">
        <h1
          ref={headlineRef}
          className="font-editorial text-[clamp(90px,14vw,200px)] text-[#121613] select-none"
          style={{ lineHeight: 0.90, letterSpacing: "-0.025em" }}
        >
          {isRtl ? (
            <>
              <span className="block">{lang === "fa" ? "کافه" : "Caffe"}</span>
              <span className="block">{lang === "fa" ? "گالری" : "gallery"}</span>
            </>
          ) : (
            <>
              <span className="block italic">Caffe</span>
              <span className="block italic">gallery</span>
            </>
          )}
        </h1>

        {/* B&W image tile — tucked beside the second line */}
        <div
          ref={imgRef}
          className="absolute hidden md:block"
          style={{ top: "calc(80px + 50%)", [isRtl ? "left" : "right"]: "clamp(50px, 8vw, 120px)" }}
        >
          <div className="w-[200px] h-[280px] rounded-[14px] overflow-hidden">
            {siteData.gallery[0]?.image && (
              <img
                src={siteData.gallery[0].image}
                alt=""
                className="w-full h-full object-cover grayscale"
                loading="eager"
              />
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar — sub copy + CTA */}
      <div
        ref={bottomRef}
        dir={isRtl ? "rtl" : "ltr"}
        className="px-[50px] pb-[60px] flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8 border-t border-[#121613]/8 pt-8"
      >
        <div className="flex flex-col gap-2">
          <p className="text-[11px] text-[#516254] uppercase tracking-[0.11px]">
            {siteData.brand.experienceYears}
          </p>
          <p className="text-[16px] text-[#516254] leading-[1.4] max-w-[340px]">
            {copy.subtext}
          </p>
        </div>

        <a
          href="#branches"
          className="flex-shrink-0 px-[50px] py-[18px] bg-[#2bee4b] text-[#121613] text-[14px] font-semibold rounded-[10px] flex items-center gap-2 transition-opacity hover:opacity-90"
          style={{ boxShadow: "rgba(16,94,29,0.45) 1px 8px 20px 0px, rgba(18,146,39,0.25) 1px 8px 20px 0px" }}
        >
          {copy.ctaBranches}
          <span aria-hidden>{isRtl ? "←" : "→"}</span>
        </a>
      </div>
    </section>
  )
}
