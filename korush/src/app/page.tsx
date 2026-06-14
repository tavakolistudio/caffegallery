import type { Metadata } from "next";
import { menuBrands, menuItems } from "@/data/menu-data";
import { siteConfig } from "@/config/site";
import BrandCard from "@/components/brand-card";
import SiteHeader from "@/components/site-header";

export const metadata: Metadata = {
  title: "منوی غذای کوروش مال",
};

export default function HomePage() {
  const counts = {
    "cafe-gallery": menuItems.filter((i) => i.brand === "cafe-gallery").length,
    "sushi-gallery": menuItems.filter((i) => i.brand === "sushi-gallery").length,
    "pasta-gallery": menuItems.filter((i) => i.brand === "pasta-gallery").length,
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#0D1117", color: "#E6EDF3" }}>
      <SiteHeader />

      <main className="flex-1 flex flex-col items-center px-4 py-10 max-w-2xl mx-auto w-full">
        {/* Hero */}
        <section className="text-center mb-12 space-y-3">
          <h1 className="text-3xl font-bold tracking-tight">منوی غذای کوروش مال</h1>
          <p className="text-sm text-white/45">تمام قیمت‌ها به تومان است.</p>
        </section>

        {/* Brand cards */}
        <section className="grid grid-cols-1 gap-4 w-full" aria-label="برندها">
          {menuBrands.map((brand) => (
            <BrandCard
              key={brand.id}
              brand={brand}
              itemCount={counts[brand.id]}
            />
          ))}
        </section>
      </main>

      <footer className="border-t border-white/8 px-6 py-8 text-sm text-white/35 space-y-1.5 text-center">
        {siteConfig.address && <p>{siteConfig.address}</p>}
        {siteConfig.phone && (
          <p>
            <a
              href={`tel:${siteConfig.phone}`}
              className="hover:text-white/60 transition-colors"
            >
              {siteConfig.phone}
            </a>
          </p>
        )}
        {(siteConfig.instagram || siteConfig.telegram) && (
          <div className="flex justify-center gap-4 pt-1">
            {siteConfig.instagram && (
              <a
                href={`https://instagram.com/${siteConfig.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/60 transition-colors"
                aria-label="اینستاگرام"
              >
                Instagram
              </a>
            )}
            {siteConfig.telegram && (
              <a
                href={`https://t.me/${siteConfig.telegram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/60 transition-colors"
                aria-label="تلگرام"
              >
                Telegram
              </a>
            )}
          </div>
        )}
        {!siteConfig.address && !siteConfig.phone && (
          <p className="text-white/20 text-xs">اطلاعات تماس — به‌زودی</p>
        )}
      </footer>
    </div>
  );
}
