"use client";
import { Search, X } from "lucide-react";

interface MenuSearchProps {
  value: string;
  onChange: (val: string) => void;
  accent: string;
  isDark: boolean;
}

export default function MenuSearch({ value, onChange, accent, isDark }: MenuSearchProps) {
  const bg = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)";
  const color = isDark ? "#EBF5F5" : "#1A120B";

  return (
    <div className="relative">
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <Search size={18} style={{ color: accent, opacity: 0.7 }} />
      </div>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="جستجو در منو…"
        className="w-full rounded-xl pr-10 pl-10 py-3 text-sm outline-none border border-transparent transition-all duration-150"
        style={{ backgroundColor: bg, color }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = `${accent}60`;
          e.currentTarget.style.boxShadow = `0 0 0 3px ${accent}20`;
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "transparent";
          e.currentTarget.style.boxShadow = "none";
        }}
        aria-label="جستجو در منو"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-1 rounded-full transition-opacity hover:opacity-80"
          aria-label="پاک کردن جستجو"
        >
          <X size={15} style={{ color, opacity: 0.5 }} />
        </button>
      )}
    </div>
  );
}
