import type { MenuItem, MenuBrand } from "@/types/menu";
import { formatToman } from "@/lib/format-price";

interface MenuCardProps {
  item: MenuItem;
  brand: MenuBrand;
}

function getBrandColors(brand: MenuBrand) {
  const isDark =
    brand.background.startsWith("#1") ||
    brand.background.startsWith("#0");
  return {
    isDark,
    cardBg: isDark ? "#172430" : "rgba(255,255,255,0.9)",
    cardText: isDark ? "#EBF5F5" : "#1A120B",
    mutedText: isDark ? "rgba(235,245,245,0.45)" : "rgba(26,18,11,0.45)",
    border: isDark
      ? `rgba(98,217,214,0.1)`
      : `${brand.accent}18`,
  };
}

export default function MenuCard({ item, brand }: MenuCardProps) {
  const { cardBg, cardText, mutedText, border } = getBrandColors(brand);

  return (
    <article
      className="flex flex-col rounded-xl border overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
      style={{ backgroundColor: cardBg, borderColor: border }}
      aria-label={item.name}
    >
      {/* Accent top bar */}
      <div className="h-[3px] w-full" style={{ backgroundColor: brand.accent }} />

      <div className="flex flex-col flex-1 p-4 gap-2">
        {/* Category chip */}
        <span
          className="self-start text-xs px-2.5 py-0.5 rounded-full font-medium leading-5"
          style={{
            backgroundColor: `${brand.accent}1A`,
            color: brand.accent,
          }}
        >
          {item.category}
        </span>

        {/* Name */}
        <h3
          className="text-base font-semibold leading-snug"
          style={{ color: cardText }}
        >
          {item.name}
        </h3>

        {/* Variant */}
        {item.variant && (
          <p className="text-sm" style={{ color: mutedText }}>
            {item.variant}
          </p>
        )}

        {/* Description */}
        {item.description && (
          <p
            className="text-xs leading-relaxed line-clamp-2"
            style={{ color: mutedText }}
          >
            {item.description}
          </p>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: border }}>
          {item.amount ? (
            <span className="text-xs" style={{ color: mutedText }}>
              {item.amount}
            </span>
          ) : (
            <span />
          )}
          <span
            className="text-base font-bold tracking-tight"
            style={{ color: brand.accent }}
          >
            {formatToman(item.price)}
          </span>
        </div>
      </div>
    </article>
  );
}
