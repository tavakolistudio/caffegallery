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
import ParallaxDeco from "@/components/ParallaxDeco"
import { useLang } from "@/lib/i18n"

export default function Home() {
  const { lang, isRtl } = useLang()
  return (
    <div dir={isRtl ? "rtl" : "ltr"} lang={lang} className="bg-[#080604] text-[#F4E9D8] min-h-screen">
      <ParallaxDeco />
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
      {/* Footer */}
      <footer className="border-t border-white/10 py-6 text-center">
        <p className="text-xs tracking-[0.3em] text-[#B8A58F] uppercase">
          © {new Date().getFullYear()} Caffegallery — Designed & Developed by{" "}
          <span className="text-[#C58A45] font-semibold tracking-[0.4em]">TAVAKOLISTUDIO</span>
        </p>
      </footer>
    </div>
  )
}
