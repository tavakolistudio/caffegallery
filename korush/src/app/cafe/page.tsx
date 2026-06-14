import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BrandMenuPage from "@/components/brand-menu-page";
import MobileBrandNav from "@/components/mobile-brand-nav";
import { getBrand, getItemsByBrand } from "@/lib/menu-utils";

export const metadata: Metadata = {
  title: "کافه گالری کوروش مال",
  description: "منوی کامل کافه گالری کوروش مال — قهوه، نوشیدنی، شیک، کیک و دسر",
  openGraph: { title: "کافه گالری کوروش مال" },
};

export default function CafePage() {
  const brand = getBrand("cafe-gallery")!;
  const items = getItemsByBrand("cafe-gallery");

  return (
    <div style={{ backgroundColor: brand.background }}>
      {/* Sticky brand header */}
      <header
        className="sticky top-0 z-20 flex items-center justify-between h-16 px-4 backdrop-blur-sm"
        style={{
          backgroundColor: `${brand.background}EE`,
          borderBottom: `1px solid ${brand.accent}25`,
        }}
      >
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm font-medium min-h-[44px] px-1 transition-opacity hover:opacity-70 focus-visible:outline-2 rounded"
          style={{ color: brand.accent, outlineColor: brand.accent }}
          aria-label="بازگشت به صفحه اصلی"
        >
          <ArrowRight size={17} />
          بازگشت
        </Link>
        <h1 className="text-base font-bold absolute right-1/2 translate-x-1/2" style={{ color: brand.accent }}>
          {brand.title}
        </h1>
        <div className="w-16" aria-hidden />
      </header>

      <BrandMenuPage brand={brand} items={items} />
      <MobileBrandNav />
    </div>
  );
}
