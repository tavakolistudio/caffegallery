import type { MenuItem, MenuBrand } from "@/types/menu";
import MenuCard from "./menu-card";

interface MenuGridProps {
  items: MenuItem[];
  brand: MenuBrand;
}

export default function MenuGrid({ items, brand }: MenuGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <MenuCard key={item.id} item={item} brand={brand} />
      ))}
    </div>
  );
}
