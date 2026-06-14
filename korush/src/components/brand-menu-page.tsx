"use client";
import { Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { MenuItem, MenuBrand } from "@/types/menu";
import { filterItems, toPersianNum } from "@/lib/menu-utils";
import MenuSearch from "./menu-search";
import CategoryTabs from "./category-tabs";
import MenuGrid from "./menu-grid";
import EmptyState from "./empty-state";

interface BrandMenuPageProps {
  brand: MenuBrand;
  items: MenuItem[];
}

function isDarkBrand(brand: MenuBrand) {
  return brand.background.startsWith("#1") || brand.background.startsWith("#0");
}

function BrandMenuContent({ brand, items }: BrandMenuPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q") ?? "";
  const category = searchParams.get("cat") ?? "همه";
  const isDark = isDarkBrand(brand);

  function updateParams(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [k, v] of Object.entries(updates)) {
      if (v && v !== "همه") {
        params.set(k, v);
      } else {
        params.delete(k);
      }
    }
    const qs = params.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
  }

  const filtered = filterItems(items, query, category);
  const isFiltered = query.trim() !== "" || category !== "همه";

  const pageBg = brand.background;
  const pageText = isDark ? "#EBF5F5" : "#1A120B";
  const mutedText = isDark ? "rgba(235,245,245,0.45)" : "rgba(26,18,11,0.45)";
  const stickyBg = isDark
    ? `${brand.background}F0`
    : `${brand.background}F2`;

  return (
    <div
      className="min-h-screen pb-20 md:pb-8"
      style={{ backgroundColor: pageBg, color: pageText }}
    >
      {/* Sticky top bar: search + tabs — sits below the sticky brand header (h-16 = 64px) */}
      <div
        className="sticky top-16 z-10 px-4 pt-3 pb-2 space-y-2 backdrop-blur-sm"
        style={{ backgroundColor: stickyBg }}
      >
        <MenuSearch
          value={query}
          onChange={(q) => updateParams({ q })}
          accent={brand.accent}
          isDark={isDark}
        />
        <CategoryTabs
          categories={brand.categories}
          selected={category}
          onSelect={(cat) => updateParams({ cat })}
          accent={brand.accent}
          isDark={isDark}
        />
      </div>

      {/* Result count */}
      <div className="px-4 pt-3 pb-2">
        <p className="text-xs" style={{ color: mutedText }}>
          {isFiltered
            ? `${toPersianNum(filtered.length)} از ${toPersianNum(items.length)} آیتم`
            : `${toPersianNum(items.length)} آیتم`}
        </p>
      </div>

      {/* Content */}
      <div className="px-4">
        {filtered.length === 0 ? (
          <EmptyState query={query} accent={brand.accent} isDark={isDark} />
        ) : (
          <MenuGrid items={filtered} brand={brand} />
        )}
      </div>
    </div>
  );
}

function BrandMenuFallback({ brand }: { brand: MenuBrand }) {
  const isDark = isDarkBrand(brand);
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: brand.background }}
    >
      <div
        className="px-4 pt-3 pb-2 space-y-2"
        style={{ backgroundColor: brand.background }}
      >
        <div
          className="w-full h-12 rounded-xl animate-pulse"
          style={{
            backgroundColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)",
          }}
        />
        <div className="flex gap-2 overflow-hidden py-1">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex-shrink-0 w-24 h-11 rounded-full animate-pulse"
              style={{
                backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BrandMenuPage(props: BrandMenuPageProps) {
  return (
    <Suspense fallback={<BrandMenuFallback brand={props.brand} />}>
      <BrandMenuContent {...props} />
    </Suspense>
  );
}
