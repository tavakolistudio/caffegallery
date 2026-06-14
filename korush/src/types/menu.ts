export type BrandId = "cafe-gallery" | "sushi-gallery" | "pasta-gallery";
export type Currency = "TOMAN";

export interface MenuBrand {
  id: BrandId;
  title: string;
  shortTitle: string;
  description: string;
  route: string;
  accent: string;
  background: string;
  categories: readonly string[];
}

export interface MenuItem {
  id: string;
  brand: BrandId;
  category: string;
  name: string;
  price: number;
  currency: Currency;
  description?: string;
  amount?: string;
  variant?: string;
  image?: string;
}

export interface MenuDatabase {
  meta: {
    project: string;
    locale: "fa-IR";
    direction: "rtl";
    currency: Currency;
    priceUnitLabel: "تومان";
    counts: {
      cafe: number;
      sushi: number;
      pasta: number;
      total: number;
    };
    priceIntegrity: string;
  };
  brands: readonly MenuBrand[];
  items: readonly MenuItem[];
}
