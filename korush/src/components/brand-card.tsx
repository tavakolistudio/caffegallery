import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { MenuBrand } from "@/types/menu";
import { toPersianNum } from "@/lib/menu-utils";

interface BrandCardProps {
  brand: MenuBrand;
  itemCount: number;
}

export default function BrandCard({ brand, itemCount }: BrandCardProps) {
  return (
    <Link
      href={brand.route}
      className="group flex flex-col justify-between rounded-2xl border overflow-hidden p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl focus-visible:outline-2"
      style={{
        backgroundColor: `${brand.accent}0D`,
        borderColor: `${brand.accent}30`,
        outlineColor: brand.accent,
        minHeight: 200,
      }}
      aria-label={`ورود به منوی ${brand.title}`}
    >
      {/* Top row: item count badge */}
      <div className="flex items-start justify-between gap-3">
        <span
          className="text-xs font-medium px-3 py-1 rounded-full"
          style={{ backgroundColor: `${brand.accent}20`, color: brand.accent }}
        >
          {toPersianNum(itemCount)} آیتم
        </span>
        <ChevronLeft
          size={20}
          className="transition-transform duration-200 group-hover:-translate-x-1"
          style={{ color: brand.accent }}
        />
      </div>

      {/* Brand name */}
      <div>
        <h2
          className="text-xl font-bold mb-1.5 leading-snug"
          style={{ color: brand.accent }}
        >
          {brand.title}
        </h2>
        <p className="text-sm leading-relaxed text-white/55">{brand.description}</p>
      </div>
    </Link>
  );
}
