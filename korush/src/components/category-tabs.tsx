"use client";

interface CategoryTabsProps {
  categories: readonly string[];
  selected: string;
  onSelect: (cat: string) => void;
  accent: string;
  isDark: boolean;
}

export default function CategoryTabs({
  categories,
  selected,
  onSelect,
  accent,
  isDark,
}: CategoryTabsProps) {
  const all = ["همه", ...categories];

  return (
    <div
      className="flex gap-2 overflow-x-auto scrollbar-hide py-1"
      role="tablist"
      aria-label="دسته‌بندی‌ها"
    >
      {all.map((cat) => {
        const active = cat === selected;
        return (
          <button
            key={cat}
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(cat)}
            className="flex-shrink-0 px-4 rounded-full text-sm font-medium transition-all duration-150 whitespace-nowrap focus-visible:outline-2"
            style={{
              minHeight: 44,
              backgroundColor: active
                ? accent
                : isDark
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.07)",
              color: active
                ? "#fff"
                : isDark
                ? "rgba(235,245,245,0.65)"
                : "rgba(26,18,11,0.65)",
              outlineColor: accent,
            }}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
