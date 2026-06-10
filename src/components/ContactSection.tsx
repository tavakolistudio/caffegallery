"use client"
import { useState, useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Phone, AtSign, MessageCircle, Send } from "lucide-react"
import { useLang } from "@/lib/i18n"
import { siteData } from "@/data/site"

export default function ContactSection() {
  const { lang, isRtl } = useLang()
  const copy = siteData.copy[lang].contact
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")

  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 82%", once: true },
        }
      )

      if (cardsRef.current) {
        gsap.fromTo(
          Array.from(cardsRef.current.children),
          { opacity: 0, y: 25 },
          {
            opacity: 1, y: 0,
            stagger: 0.1,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: { trigger: cardsRef.current, start: "top 80%", once: true },
          }
        )
      }

      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: formRef.current, start: "top 80%", once: true },
        }
      )

      gsap.fromTo(
        footerRef.current,
        { opacity: 0 },
        {
          opacity: 1, duration: 0.7,
          scrollTrigger: { trigger: footerRef.current, start: "top 90%", once: true },
        }
      )
    })

    ScrollTrigger.refresh()

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setName("")
    setMessage("")
  }

  const contactCards = [
    {
      icon: Phone,
      label: copy.phone,
      value: lang === "fa" ? siteData.contact.phoneFa : siteData.contact.phone,
      href: `tel:${siteData.contact.phone}`,
      available: true,
    },
    {
      icon: AtSign,
      label: copy.instagram,
      value: siteData.contact.instagram || copy.instagramPlaceholder,
      href: siteData.contact.instagram
        ? `https://instagram.com/${siteData.contact.instagram}`
        : undefined,
      available: !!siteData.contact.instagram,
    },
    {
      icon: MessageCircle,
      label: copy.whatsapp,
      value: lang === "fa" ? siteData.contact.phoneFa : siteData.contact.whatsapp,
      href: `https://wa.me/${siteData.contact.whatsapp.replace(/^0/, "98")}`,
      available: true,
    },
  ]

  return (
    <>
      {/* Contact section — light */}
      <section
        id="contact"
        dir={isRtl ? "rtl" : "ltr"}
        className="relative py-28 px-6 bg-[#fafffa] overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#121613]/8" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div ref={headerRef} className="text-center mb-16">
            <h2 className="font-display text-[clamp(2rem,4.5vw,3rem)] font-bold text-[#121613] mb-4 leading-tight">
              {copy.headline}
            </h2>
            <p className="text-[#516254] text-lg">{copy.subtext}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact cards */}
            <div ref={cardsRef} className="flex flex-col gap-4">
              {contactCards.map((card, i) => {
                const Icon = card.icon
                const Inner = (
                  <div
                    className={`flex items-center gap-4 p-5 rounded-2xl bg-[#f0f4f0] border transition-all duration-200 ${
                      card.available
                        ? "border-[#121613]/8 hover:border-[#2bee4b]/35 cursor-pointer"
                        : "border-[#121613]/6 opacity-50"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#2bee4b]/10 border border-[#2bee4b]/20 flex items-center justify-center flex-shrink-0">
                      <Icon size={20} className="text-[#121613]" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs text-[#516254]">{card.label}</span>
                      <span
                        className={`font-semibold ${card.available ? "text-[#121613]" : "text-[#516254]"}`}
                        dir={lang === "fa" && card.href?.startsWith("tel") ? "ltr" : undefined}
                      >
                        {card.value}
                      </span>
                    </div>
                  </div>
                )

                return card.href && card.available ? (
                  <a
                    key={i}
                    href={card.href}
                    target={card.href.startsWith("http") ? "_blank" : undefined}
                    rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {Inner}
                  </a>
                ) : (
                  <div key={i}>{Inner}</div>
                )
              })}
            </div>

            {/* Contact form */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 p-6 rounded-2xl bg-[#f0f4f0] border border-[#121613]/8"
            >
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={copy.name}
                className="w-full px-4 py-3 bg-[#fafffa] border border-[#121613]/10 rounded-xl text-[#121613] placeholder-[#516254]/50 text-sm focus:outline-none focus:border-[#2bee4b]/50 transition-colors"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={copy.message}
                rows={5}
                className="w-full px-4 py-3 bg-[#fafffa] border border-[#121613]/10 rounded-xl text-[#121613] placeholder-[#516254]/50 text-sm focus:outline-none focus:border-[#2bee4b]/50 transition-colors resize-none"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 py-3.5 bg-[#2bee4b] hover:bg-[#20cc3e] text-[#121613] font-bold rounded-xl transition-all duration-200 text-sm"
              >
                <Send size={15} />
                {copy.send}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Obsidian footer panel */}
      <footer
        dir={isRtl ? "rtl" : "ltr"}
        className="bg-[#121613] px-6 py-12"
      >
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[#2bee4b] font-bold text-lg">{lang === "fa" ? "کافه" : "Caffe"}</span>
            <span className="text-[#fafffa] font-bold text-lg">{lang === "fa" ? "گالری" : "gallery"}</span>
          </div>
          <p className="text-[#516254] text-sm text-center">
            {lang === "fa"
              ? `© ${new Date().getFullYear()} کافه گالری — ${siteData.brand.manager.fa}`
              : `© ${new Date().getFullYear()} Caffegallery — ${siteData.brand.manager.en}`}
          </p>
          <p className="text-[#516254]/50 text-xs tracking-[0.3em] uppercase">
            Designed by <span className="text-[#2bee4b]">TAVAKOLISTUDIO</span>
          </p>
        </div>
      </footer>
    </>
  )
}
