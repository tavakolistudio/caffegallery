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

      // Animated counters
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
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="story"
      dir={isRtl ? "rtl" : "ltr"}
      className="relative py-28 px-6 overflow-hidden bg-[#080604]"
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#C58A45 1px, transparent 1px), linear-gradient(90deg, #C58A45 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Text side */}
        <div ref={textRef} className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 w-fit">
            <span className="px-4 py-1.5 bg-[#C58A45]/15 border border-[#C58A45]/30 text-[#C58A45] text-xs font-semibold rounded-full tracking-wide">
              {copy.badge}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F4E9D8] leading-snug">
            {copy.headline}
          </h2>

          <p className="text-[#B8A58F] text-lg leading-relaxed">{copy.body}</p>

          <div className="flex gap-8 pt-4">
            <div className="flex flex-col gap-1">
              <span ref={stat30Ref} className="text-4xl font-bold text-[#C58A45]">0+</span>
              <span className="text-sm text-[#B8A58F]">
                {lang === "fa" ? "سال تجربه" : "Years experience"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span ref={stat9Ref} className="text-4xl font-bold text-[#C58A45]">0</span>
              <span className="text-sm text-[#B8A58F]">
                {lang === "fa" ? "شعبه فعال" : "Active branches"}
              </span>
            </div>
          </div>
        </div>

        {/* Visual side — GSAP handles the reveal, Framer Motion handles the bounce loop */}
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
              className="rounded-2xl border border-[rgba(197,138,69,0.25)] bg-[#120E0A]/80 backdrop-blur-sm flex items-center justify-center"
            >
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#C58A45]/10 to-[#D7A85B]/5 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border border-[#C58A45]/40 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#C58A45]/60" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
