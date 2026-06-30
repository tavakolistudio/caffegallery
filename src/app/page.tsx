"use client"
import Image from "next/image"
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
      <footer className="border-t border-white/10 py-8 text-center flex flex-col items-center gap-4">
        <Image
          src="/images/brand/cafe-gallery-logo.png"
          alt={lang === "fa" ? "کافه گالری" : "Caffegallery"}
          width={340}
          height={333}
          className="h-9 w-auto opacity-80"
        />
        <p className="text-xs tracking-[0.3em] text-[#B8A58F] uppercase">
          © {new Date().getFullYear()} Caffegallery — Designed & Developed by{" "}
          <a
            href="https://tavakolistudio.vercel.app/en"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C58A45] font-semibold tracking-[0.4em] hover:text-[#D7A85B] transition-colors duration-200 underline underline-offset-2 decoration-[#C58A45]/40"
          >
            TAVAKOLISTUDIO
          </a>
        </p>
      </footer>
    </div>
  )
}
