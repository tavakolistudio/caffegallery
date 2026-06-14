import { SearchX } from "lucide-react";

interface EmptyStateProps {
  query: string;
  accent: string;
  isDark: boolean;
}

export default function EmptyState({ query, accent, isDark }: EmptyStateProps) {
  const text = isDark ? "rgba(235,245,245,0.5)" : "rgba(26,18,11,0.5)";
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center gap-4">
      <SearchX size={40} style={{ color: accent, opacity: 0.4 }} />
      <p className="text-base leading-relaxed" style={{ color: text }}>
        {query
          ? `نتیجه‌ای برای «${query}» پیدا نشد`
          : "آیتمی در این دسته‌بندی موجود نیست"}
      </p>
    </div>
  );
}
