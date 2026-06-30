"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLang } from "@/lib/i18n"
import { siteData } from "@/data/site"

export default function AboutSection() {
  const { lang, isRtl } = useLang()
  const copy = siteData.copy[lang].about

  const badgeRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { opacity: 0, x: isRtl ? 40 : -40 },
          {
            opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: imgRef.current, start: "top 80%", once: true },
          }
        )
      }

      const targets = [
        badgeRef.current,
        headlineRef.current,
        bodyRef.current,
        cardRef.current,
      ].filter(Boolean) as HTMLElement[]

      if (targets.length && badgeRef.current) {
        gsap.fromTo(
          targets,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            stagger: 0.12,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: { trigger: badgeRef.current, start: "top 80%", once: true },
          }
        )
      }
    })

    ScrollTrigger.refresh()

    return () => ctx.revert()
  }, [isRtl])

  return (
    <section
      id="about"
      dir={isRtl ? "rtl" : "ltr"}
      className="relative py-28 px-6 bg-[#080604] overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C58A45]/30 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#C58A45]/4 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <div
            ref={imgRef}
            className={`relative rounded-2xl overflow-hidden order-last ${isRtl ? "md:order-last" : "md:order-first"}`}
          >
            <img
              src="/images/gallery/cafe-fountain.jpg"
              alt={lang === "fa" ? "کافه گالری" : "Caffegallery"}
              className="w-full h-[420px] object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080604]/50 to-transparent rounded-2xl" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-[1px] bg-[#C58A45]" />
                <span className="text-[#C58A45] text-xs tracking-widest uppercase font-medium">
                  {siteData.brand.experienceYears} {lang === "fa" ? "سال تجربه" : "Years of Experience"}
                </span>
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className={`flex flex-col gap-8 ${isRtl ? "text-right" : "text-left"}`}>
            <div ref={badgeRef} className="flex items-center gap-3">
              <span className="w-12 h-[1px] bg-[#C58A45]/50" />
              <span className="text-[#C58A45] text-xs tracking-[0.3em] uppercase font-medium">
                {siteData.brand.experienceYears}
              </span>
              <span className="w-12 h-[1px] bg-[#C58A45]/50" />
            </div>

            <h2
              ref={headlineRef}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F4E9D8] leading-snug"
            >
              {copy.headline}
            </h2>

            <p
              ref={bodyRef}
              className="text-[#B8A58F] text-lg leading-relaxed"
            >
              {copy.body}
            </p>

            <div
              ref={cardRef}
              className="inline-flex flex-col gap-4 px-8 py-6 bg-[#120E0A] border border-[rgba(244,233,216,0.1)] rounded-2xl w-full"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#C58A45]/20 to-[#D7A85B]/10 border border-[#C58A45]/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-[#C58A45]">{copy.manager.charAt(0)}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-lg font-bold text-[#F4E9D8]">{copy.manager}</h3>
                  <p className="text-sm text-[#B8A58F]">{copy.managerTitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 bg-[#C58A45]/10 border border-[#C58A45]/20 rounded-full w-fit">
                <span className="text-[#C58A45] font-bold text-sm">{copy.badge}</span>
                <span className="text-[#B8A58F] text-xs">{copy.badgeLabel}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
