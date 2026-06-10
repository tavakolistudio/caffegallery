"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLang } from "@/lib/i18n"
import { siteData } from "@/data/site"

export default function StorySection() {
  const { lang, isRtl } = useLang()
  const copy = siteData.copy[lang].story

  const sectionRef = useRef<HTMLElement>(null)
  const stat30Ref = useRef<HTMLSpanElement>(null)
  const stat9Ref = useRef<HTMLSpanElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

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

      const obj30 = { val: 0 }
      const el30 = stat30Ref.current
      if (el30) {
        gsap.to(obj30, {
          val: 30, duration: 2.5, ease: "power2.out",
          onUpdate: () => { el30.textContent = Math.round(obj30.val).toString() },
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        })
      }

      const obj9 = { val: 0 }
      const el9 = stat9Ref.current
      if (el9) {
        gsap.to(obj9, {
          val: 9, duration: 2, ease: "power2.out",
          onUpdate: () => { el9.textContent = Math.round(obj9.val).toString() },
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        })
      }
    })

    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="story"
      dir={isRtl ? "rtl" : "ltr"}
      className="bg-[#fafffa] px-[50px] py-[120px]"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Massive stat numbers — 140px editorial display */}
        <div className="flex gap-[60px] items-end mb-[80px]">
          <div>
            <div
              className="font-editorial text-[#121613] flex items-end"
              style={{ fontSize: "clamp(80px, 12vw, 140px)", lineHeight: 0.90, letterSpacing: "-0.025em" }}
            >
              <span ref={stat30Ref}>0</span>
              <span className="text-[#2bee4b]" style={{ fontSize: "0.55em" }}>+</span>
            </div>
            <p className="text-[14px] text-[#516254] mt-[12px]">
              {lang === "fa" ? "سال تجربه" : "Years experience"}
            </p>
          </div>

          <div>
            <div
              className="font-editorial text-[#121613]"
              style={{ fontSize: "clamp(80px, 12vw, 140px)", lineHeight: 0.90, letterSpacing: "-0.025em" }}
            >
              <span ref={stat9Ref}>0</span>
            </div>
            <p className="text-[14px] text-[#516254] mt-[12px]">
              {lang === "fa" ? "شعبه فعال" : "Active branches"}
            </p>
          </div>
        </div>

        {/* Body copy — asymmetric two-col */}
        <div ref={textRef} className="grid md:grid-cols-[200px_1fr] gap-[60px] max-w-[900px]">
          <div className="pt-1">
            <span className="text-[11px] text-[#516254] uppercase tracking-[0.11px]">{copy.badge}</span>
          </div>
          <div>
            <h2 className="text-[18px] leading-[1.4] text-[#121613] mb-[20px] font-medium">
              {copy.headline}
            </h2>
            <p className="text-[16px] leading-[1.4] text-[#516254]">{copy.body}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
