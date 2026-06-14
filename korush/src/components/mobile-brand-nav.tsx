"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuBrands } from "@/data/menu-data";

export default function MobileBrandNav() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden border-t"
      style={{ backgroundColor: "#0D1117", borderColor: "rgba(255,255,255,0.1)" }}
      aria-label="ناوبری برندها"
    >
      {menuBrands.map((brand) => {
        const active = pathname === brand.route;
        return (
          <Link
            key={brand.id}
            href={brand.route}
            className="flex-1 flex flex-col items-center justify-center py-3 gap-1 text-xs font-medium transition-colors"
            style={{
              color: active ? brand.accent : "rgba(255,255,255,0.45)",
              minHeight: 56,
            }}
            aria-current={active ? "page" : undefined}
          >
            <span
              className="w-1 h-1 rounded-full transition-all duration-200"
              style={{ backgroundColor: active ? brand.accent : "transparent" }}
            />
            {brand.shortTitle}
          </Link>
        );
      })}
    </nav>
  );
}
