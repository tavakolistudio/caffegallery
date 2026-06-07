"use client"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import StorySection from "@/components/StorySection"
import ExperienceSection from "@/components/ExperienceSection"
import GallerySection from "@/components/GallerySection"
import BranchesSection from "@/components/BranchesSection"
import ConsultingSection from "@/components/ConsultingSection"
import AboutSection from "@/components/AboutSection"
import ContactSection from "@/components/ContactSection"
import ScrollProgress from "@/components/ScrollProgress"
import { useLang } from "@/lib/i18n"

export default function Home() {
  const { lang, isRtl } = useLang()
  return (
    <div dir={isRtl ? "rtl" : "ltr"} lang={lang} className="bg-[#080604] text-[#F4E9D8] min-h-screen">
      <ScrollProgress />
      <Header />
      <Hero />
      <StorySection />
      <ExperienceSection />
      <GallerySection />
      <BranchesSection />
      <ConsultingSection />
      <AboutSection />
      <ContactSection />
    </div>
  )
}
