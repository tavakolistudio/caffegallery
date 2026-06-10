"use client"
import { useState, useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLang } from "@/lib/i18n"
import { siteData } from "@/data/site"

export default function ContactSection() {
  const { lang, isRtl } = useLang()
  const copy = siteData.copy[lang].contact
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")

  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      if (sectionRef.current) {
        gsap.fromTo(
          Array.from(sectionRef.current.querySelectorAll("[data-reveal]")),
          { opacity: 0, y: 25 },
          {
            opacity: 1, y: 0,
            stagger: 0.1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 82%", once: true },
          }
        )
      }
    })

    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setName("")
    setMessage("")
  }

  return (
    <>
      {/* Contact section — Linen, no card panels */}
      <section
        ref={sectionRef}
        id="contact"
        dir={isRtl ? "rtl" : "ltr"}
        className="bg-[#fafffa] px-[50px] py-[120px]"
      >
        <div className="max-w-[1440px] mx-auto">
          {/* Header */}
          <div data-reveal className="mb-[80px]">
            <p className="text-[11px] text-[#516254] uppercase tracking-[0.11px] mb-[20px]">
              {lang === "fa" ? "تماس" : "Contact"}
            </p>
            <h2
              className="font-editorial text-[#121613]"
              style={{ fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 0.90, letterSpacing: "-0.02em" }}
            >
              {copy.headline}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-[80px] items-start">
            {/* Contact info — text links only */}
            <div data-reveal className="flex flex-col border-t border-[#121613]/10">
              {[
                {
                  label: copy.phone,
                  value: lang === "fa" ? siteData.contact.phoneFa : siteData.contact.phone,
                  href: `tel:${siteData.contact.phone}`,
                },
                {
                  label: copy.instagram,
                  value: siteData.contact.instagram || copy.instagramPlaceholder,
                  href: siteData.contact.instagram
                    ? `https://instagram.com/${siteData.contact.instagram}`
                    : undefined,
                },
                {
                  label: copy.whatsapp,
                  value: lang === "fa" ? siteData.contact.phoneFa : siteData.contact.whatsapp,
                  href: `https://wa.me/${siteData.contact.whatsapp.replace(/^0/, "98")}`,
                },
              ].map((item, i) => (
                <div key={i} className="border-b border-[#121613]/10 py-[20px]">
                  <p className="text-[11px] text-[#516254] uppercase tracking-[0.11px] mb-[6px]">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-[18px] text-[#121613] hover:text-[#2bee4b] transition-colors font-medium"
                      dir={item.href.startsWith("tel") ? "ltr" : undefined}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-[18px] text-[#516254] font-medium">{item.value}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Form — minimal, no card background */}
            <form data-reveal onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
              <div className="border-b border-[#121613]/15 pb-[4px] focus-within:border-[#121613]">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={copy.name}
                  className="w-full bg-transparent text-[16px] text-[#121613] placeholder-[#516254]/50 py-[10px] focus:outline-none"
                />
              </div>
              <div className="border-b border-[#121613]/15 pb-[4px] focus-within:border-[#121613]">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={copy.message}
                  rows={5}
                  className="w-full bg-transparent text-[16px] text-[#121613] placeholder-[#516254]/50 py-[10px] focus:outline-none resize-none"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="px-[50px] py-[18px] bg-[#2bee4b] text-[#121613] text-[14px] font-semibold rounded-[10px] flex items-center gap-2 transition-opacity hover:opacity-90 w-fit"
                  style={{ boxShadow: "rgba(16,94,29,0.45) 1px 8px 20px 0px, rgba(18,146,39,0.25) 1px 8px 20px 0px" }}
                >
                  {copy.send}
                  <span aria-hidden>{isRtl ? "←" : "→"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Obsidian footer panel */}
      <footer
        dir={isRtl ? "rtl" : "ltr"}
        className="bg-[#121613] px-[50px] py-[60px]"
      >
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-baseline gap-0">
            <span className="text-[16px] font-semibold text-[#fafffa]">
              {lang === "fa" ? "کافه" : "Caffe"}
            </span>
            <span className="text-[16px] font-semibold text-[#2bee4b]">
              {lang === "fa" ? "گالری" : "gallery"}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <p className="text-[13px] text-[#516254]">
              {lang === "fa"
                ? `© ${new Date().getFullYear()} — ${siteData.brand.manager.fa}`
                : `© ${new Date().getFullYear()} — ${siteData.brand.manager.en}`}
            </p>
            <p className="text-[11px] text-[#516254]/50 uppercase tracking-[0.11px]">
              TAVAKOLISTUDIO
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
