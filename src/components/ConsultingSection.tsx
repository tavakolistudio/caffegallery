"use client"
import { motion } from "framer-motion"
import { CheckCircle2, Phone } from "lucide-react"
import { useLang } from "@/lib/i18n"
import { siteData } from "@/data/site"

export default function ConsultingSection() {
  const { lang, isRtl } = useLang()
  const copy = siteData.copy[lang].consulting

  return (
    <section
      id="consulting"
      dir={isRtl ? "rtl" : "ltr"}
      className="relative py-28 px-6 bg-[#0C0906] overflow-hidden"
    >
      {/* Blueprint grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#C58A45 1px, transparent 1px), linear-gradient(90deg, #C58A45 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Larger grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#C58A45 1px, transparent 1px), linear-gradient(90deg, #C58A45 1px, transparent 1px)",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Glow */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-[#C58A45]/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 w-fit">
              <span className="px-4 py-1.5 bg-[#C58A45]/10 border border-[#C58A45]/25 text-[#C58A45] text-xs font-semibold rounded-full">
                {lang === "fa" ? "خدمات مشاوره" : "Consulting Services"}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F4E9D8] leading-snug">
              {copy.headline}
            </h2>

            <p className="text-[#B8A58F] text-lg leading-relaxed">
              {copy.subtext}
            </p>

            <a
              href={`tel:${siteData.management.phone}`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#C58A45] hover:bg-[#D7A85B] text-[#080604] font-bold rounded-full transition-all duration-200 w-fit text-sm"
            >
              <Phone size={16} />
              {copy.cta}
            </a>
          </motion.div>

          {/* Services list */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-3"
          >
            {copy.services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-[#120E0A] border border-[rgba(244,233,216,0.07)] hover:border-[#C58A45]/25 transition-all duration-200 group"
              >
                <CheckCircle2 size={16} className="text-[#C58A45] shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-[#F4E9D8] text-sm">{service}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
