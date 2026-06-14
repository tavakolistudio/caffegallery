import { menuItems, menuBrands } from "@/data/menu-data";
import type { BrandId, MenuItem } from "@/types/menu";
import { normalizePersian } from "./normalize-persian";

export function getItemsByBrand(brandId: BrandId): MenuItem[] {
  return menuItems.filter((item) => item.brand === brandId) as MenuItem[];
}

export function getBrand(brandId: BrandId) {
  return menuBrands.find((b) => b.id === brandId);
}

export function filterItems(
  items: MenuItem[],
  query: string,
  category: string
): MenuItem[] {
  let result = items;

  if (category && category !== "همه") {
    result = result.filter((item) => item.category === category);
  }

  const trimmed = query.trim();
  if (trimmed) {
    const normalizedQuery = normalizePersian(trimmed);
    result = result.filter((item) => {
      const haystack = normalizePersian(
        [item.name, item.category, item.description ?? "", item.variant ?? ""].join(" ")
      );
      return haystack.includes(normalizedQuery);
    });
  }

  return result;
}

export function toPersianNum(n: number): string {
  return n.toLocaleString("fa-IR");
}
