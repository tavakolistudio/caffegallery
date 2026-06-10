"use client"
import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLang } from "@/lib/i18n"
import { siteData } from "@/data/site"

const floatingFrames = [
  { x: 0, y: 0, w: 180, h: 130, delay: 0 },
  { x: 150, y: 60, w: 140, h: 100, delay: 0.3 },
  { x: 30, y: 160, w: 120, h: 90, delay: 0.6 },
  { x: 170, y: 180, w: 100, h: 140, delay: 0.2 },
]

export default function StorySection() {
  const { lang, isRtl } = useLang()
  const copy = siteData.copy[lang].story

  const textRef = useRef<HTMLDivElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)
  const stat30Ref = useRef<HTMLSpanElement>(null)
  const stat9Ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: textRef.current, start: "top 82%", once: true },
        }
      )

      gsap.fromTo(
        visualRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: visualRef.current, start: "top 82%", once: true },
        }
      )

      const obj30 = { val: 0 }
      const el30 = stat30Ref.current
      if (el30) {
        gsap.to(obj30, {
          val: 30, duration: 2.5, ease: "power2.out",
          onUpdate: () => { el30.textContent = Math.round(obj30.val) + "+" },
          scrollTrigger: { trigger: textRef.current, start: "top 75%", once: true },
        })
      }

      const obj9 = { val: 0 }
      const el9 = stat9Ref.current
      if (el9) {
        gsap.to(obj9, {
          val: 9, duration: 2, ease: "power2.out",
          onUpdate: () => { el9.textContent = Math.round(obj9.val).toString() },
          scrollTrigger: { trigger: textRef.current, start: "top 75%", once: true },
        })
      }
    })

    ScrollTrigger.refresh()

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="story"
      dir={isRtl ? "rtl" : "ltr"}
      className="relative py-28 px-6 overflow-hidden bg-[#fafffa]"
    >
      {/* Subtle horizontal rule */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#121613]/8" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Text side */}
        <div ref={textRef} className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 w-fit">
            <span className="px-4 py-1.5 bg-[#2bee4b]/12 border border-[#2bee4b]/30 text-[#121613] text-xs font-semibold rounded-full tracking-wide">
              {copy.badge}
            </span>
          </div>

          <h2 className="font-display text-[clamp(2.2rem,5vw,3.5rem)] font-bold text-[#121613] leading-[1.05]">
            {copy.headline}
          </h2>

          <p className="text-[#516254] text-lg leading-relaxed">{copy.body}</p>

          <div className="flex gap-10 pt-4 border-t border-[#121613]/8">
            <div className="flex flex-col gap-1">
              <span ref={stat30Ref} className="text-4xl font-bold text-[#2bee4b] leading-none">0+</span>
              <span className="text-sm text-[#516254] mt-1">
                {lang === "fa" ? "سال تجربه" : "Years experience"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span ref={stat9Ref} className="text-4xl font-bold text-[#2bee4b] leading-none">0</span>
              <span className="text-sm text-[#516254] mt-1">
                {lang === "fa" ? "شعبه فعال" : "Active branches"}
              </span>
            </div>
          </div>
        </div>

        {/* Visual side */}
        <div ref={visualRef} className="relative h-80 md:h-96">
          {floatingFrames.map((f, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 2 + f.delay,
                repeat: Infinity,
                ease: "easeInOut",
                delay: f.delay,
              }}
              style={{ left: f.x, top: f.y, width: f.w, height: f.h, position: "absolute" }}
              className="rounded-2xl border border-[#121613]/10 bg-white/60 backdrop-blur-sm flex items-center justify-center"
            >
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#2bee4b]/8 to-[#93b799]/5 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border border-[#2bee4b]/40 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#2bee4b]/60" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
