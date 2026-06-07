"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, AtSign, MessageCircle, Send } from "lucide-react"
import { useLang } from "@/lib/i18n"
import { siteData } from "@/data/site"

export default function ContactSection() {
  const { lang, isRtl } = useLang()
  const copy = siteData.copy[lang].contact
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // UI only — no backend
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
      href: siteData.contact.instagram ? `https://instagram.com/${siteData.contact.instagram}` : undefined,
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
    <section
      id="contact"
      dir={isRtl ? "rtl" : "ltr"}
      className="relative py-28 px-6 bg-[#0C0906] overflow-hidden"
    >
      {/* Decorative amber line top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C58A45]/30 to-transparent" />

      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#C58A45]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F4E9D8] mb-4">
            {copy.headline}
          </h2>
          <p className="text-[#B8A58F] text-lg">{copy.subtext}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact cards */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-4"
          >
            {contactCards.map((card, i) => {
              const Icon = card.icon
              const Inner = (
                <div
                  className={`flex items-center gap-4 p-5 rounded-2xl bg-[#120E0A] border transition-all duration-200 ${
                    card.available
                      ? "border-[rgba(244,233,216,0.1)] hover:border-[#C58A45]/35 cursor-pointer"
                      : "border-[rgba(244,233,216,0.06)] opacity-50"
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-[#C58A45]/10 border border-[#C58A45]/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-[#C58A45]" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs text-[#B8A58F]">{card.label}</span>
                    <span className={`font-semibold ${card.available ? "text-[#F4E9D8]" : "text-[#B8A58F]"}`} dir={lang === "fa" && card.href?.startsWith("tel") ? "ltr" : undefined}>
                      {card.value}
                    </span>
                  </div>
                </div>
              )

              return card.href && card.available ? (
                <motion.a
                  key={i}
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  {Inner}
                </motion.a>
              ) : (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  {Inner}
                </motion.div>
              )
            })}
          </motion.div>

          {/* Contact form */}
          <motion.form
            initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 p-6 rounded-2xl bg-[#120E0A] border border-[rgba(244,233,216,0.08)]"
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={copy.name}
              className="w-full px-4 py-3 bg-[#0C0906] border border-[rgba(244,233,216,0.1)] rounded-xl text-[#F4E9D8] placeholder-[#B8A58F]/50 text-sm focus:outline-none focus:border-[#C58A45]/50 transition-colors"
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={copy.message}
              rows={5}
              className="w-full px-4 py-3 bg-[#0C0906] border border-[rgba(244,233,216,0.1)] rounded-xl text-[#F4E9D8] placeholder-[#B8A58F]/50 text-sm focus:outline-none focus:border-[#C58A45]/50 transition-colors resize-none"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 py-3.5 bg-[#C58A45] hover:bg-[#D7A85B] text-[#080604] font-bold rounded-xl transition-all duration-200 text-sm"
            >
              <Send size={15} />
              {copy.send}
            </button>
          </motion.form>
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center mt-20 pt-8 border-t border-[rgba(244,233,216,0.06)]"
        >
          <p className="text-[#B8A58F]/60 text-sm">
            {lang === "fa"
              ? `© ${new Date().getFullYear()} کافه گالری — ${siteData.brand.manager.fa}`
              : `© ${new Date().getFullYear()} Caffegallery — ${siteData.brand.manager.en}`}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
