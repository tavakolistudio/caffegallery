import { menuItems, menuBrands } from "@/data/menu-data";

function priceOf(name: string): number | undefined {
  return menuItems.find((i) => i.name === name)?.price;
}

// ─── Counts ──────────────────────────────────────────────────────────────────

describe("تعداد آیتم‌ها", () => {
  const cafeItems = menuItems.filter((i) => i.brand === "cafe-gallery");
  const sushiItems = menuItems.filter((i) => i.brand === "sushi-gallery");
  const pastaItems = menuItems.filter((i) => i.brand === "pasta-gallery");

  test("کافه گالری: ۴۷ آیتم", () => {
    expect(cafeItems).toHaveLength(47);
  });

  test("سوشی گالری: ۹۵ آیتم", () => {
    expect(sushiItems).toHaveLength(95);
  });

  test("پاستا گالری: ۲۰ آیتم", () => {
    expect(pastaItems).toHaveLength(20);
  });

  test("مجموع: ۱۶۲ آیتم", () => {
    expect(menuItems).toHaveLength(162);
  });
});

// ─── Specific prices ──────────────────────────────────────────────────────────

describe("قیمت‌های شاخص", () => {
  test("کافه لاته — ۱۵۵٬۰۰۰ تومان", () => {
    expect(priceOf("کافه لاته")).toBe(155000);
  });

  test("پلاتر خام ۱۶ تکه — ۲٬۲۹۰٬۰۰۰ تومان", () => {
    expect(priceOf("پلاتر خام ۱۶ تکه")).toBe(2290000);
  });

  test("سوبایا رول — ۸۸۹٬۰۰۰ تومان (غیررُند)", () => {
    expect(priceOf("سوبایا رول")).toBe(889000);
  });

  test("دبل اسپایسی رول — ۹۵۹٬۰۰۰ تومان (غیررُند)", () => {
    expect(priceOf("دبل اسپایسی رول")).toBe(959000);
  });

  test("پاستا مرغ آلفردو — ۲۲۵٬۰۰۰ تومان", () => {
    expect(priceOf("پاستا مرغ آلفردو")).toBe(225000);
  });

  test("سالاد کرَب و آووکادو — ۶۱۰٬۰۰۰ تومان", () => {
    expect(priceOf("سالاد کرَب و آووکادو")).toBe(610000);
  });
});

// ─── Data integrity ───────────────────────────────────────────────────────────

describe("یکپارچگی داده‌ها", () => {
  test("همه قیمت‌ها عدد صحیح مثبت هستند", () => {
    menuItems.forEach((item) => {
      expect(Number.isInteger(item.price)).toBe(true);
      expect(item.price).toBeGreaterThan(0);
    });
  });

  test("همه آیتم‌ها currency: TOMAN دارند", () => {
    menuItems.forEach((item) => {
      expect(item.currency).toBe("TOMAN");
    });
  });

  test("ID‌ها تکراری نیستند", () => {
    const ids = menuItems.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test("route برندها تکراری نیستند", () => {
    const routes = menuBrands.map((b) => b.route);
    expect(new Set(routes).size).toBe(routes.length);
  });

  test("دسته‌بندی هر آیتم در برند خودش وجود دارد", () => {
    menuItems.forEach((item) => {
      const brand = menuBrands.find((b) => b.id === item.brand);
      expect(brand).toBeDefined();
      expect(brand!.categories).toContain(item.category);
    });
  });
});
