// All prices are stored as normalized real toman values.
// Raw menu shorthand × 1000 = stored price.
// Display: 995000 → "۹۹۵٬۰۰۰ تومان"

export interface MenuItem {
  id: string
  category: string
  name: string
  ingredients: string
  price: number
  available: boolean
  /** Optional dish photo. Absolute path under /public, or a full URL (admin override). */
  image?: string
}

export interface MenuCategory {
  id: string
  name: string
  image?: string
}

export const menuCategories: MenuCategory[] = [
  { id: "salad",        name: "سالاد",               image: "/images/menu/cat/salad.webp" },
  { id: "soup",         name: "سوپ",                 image: "/images/menu/cat/soup.webp" },
  { id: "pishghaza",    name: "پیش غذا",             image: "/images/menu/cat/pishghaza.webp" },
  { id: "sushi",        name: "سوشی",                image: "/images/menu/cat/sushi.webp" },
  { id: "kari-talai",   name: "کاری طلایی ژاپنی",   image: "/images/menu/cat/kari-talai.webp" },
  { id: "nodel",        name: "نودل",                image: "/images/menu/cat/nodel.webp" },
  { id: "chap-soyi",    name: "چاپ سویی",            image: "/images/menu/cat/chap-soyi.webp" },
  { id: "tom-yum",      name: "خوراک تام یام",       image: "/images/menu/cat/tom-yum.webp" },
  { id: "khorak",       name: "خوراک",               image: "/images/menu/cat/khorak.webp" },
  { id: "hibachi",      name: "هیباچی برنج سرخ‌کرده", image: "/images/menu/cat/hibachi.webp" },
  { id: "sachbal",      name: "خوراک ساچبال",        image: "/images/menu/cat/sachbal.webp" },
  { id: "kari-ghermez", name: "کاری قرمز تایلندی",  image: "/images/menu/cat/kari-ghermez.webp" },
  { id: "brocoli",      name: "خوراک بروکلی",        image: "/images/menu/cat/brocoli.webp" },
  { id: "chili",        name: "خوراک چیلی",          image: "/images/menu/cat/chili.webp" },
  { id: "sabzijat",     name: "بشقاب سبزیجات",       image: "/images/menu/cat/sabzijat.webp" },
  { id: "jajang",       name: "جاجانگمیون",          image: "/images/menu/cat/jajang.webp" },
]

export const menuItems: MenuItem[] = [
  // ── سالاد ─────────────────────────────────────────────────────────
  { id: "salad-01", category: "salad", name: "چیکن چاپنیز",          ingredients: "",                                                                      price: 565000, available: true },
  { id: "salad-02", category: "salad", name: "سالاد میگو آووکادو",   ingredients: "کاهو لیتل، خیار، هویج، جوانه ماش، میگو، آووکادو، سس کنجد",            price: 595000, available: true },
  { id: "salad-03", category: "salad", name: "سالاد کرب آووکادو",    ingredients: "کرب، آووکادو، خیار، هویج، سس کنجد",                                    price: 610000, available: true },
  { id: "salad-04", category: "salad", name: "سالاد تاک بیف",         ingredients: "",                                                                      price: 560000, available: true },

  // ── سوپ ───────────────────────────────────────────────────────────
  { id: "soup-01", category: "soup", name: "سوپ کیم چی گوشت",        ingredients: "",                                                                      price: 385000, available: true },
  { id: "soup-02", category: "soup", name: "سوپ کیم چی مرغ",          ingredients: "",                                                                      price: 350000, available: true },
  { id: "soup-03", category: "soup", name: "سوپ نودل",                 ingredients: "",                                                                      price: 325000, available: true },
  { id: "soup-04", category: "soup", name: "سوپ تام یام",              ingredients: "میگو، فلفل دلمه، قارچ، هویج، شیر نارگیل",                             price: 415000, available: true },
  { id: "soup-05", category: "soup", name: "سوپ میسو",                 ingredients: "",                                                                      price: 295000, available: true },
  { id: "soup-06", category: "soup", name: "سوپ مرغ و ذرت",           ingredients: "کدو، هویج، قارچ، ذرت، خامه، جعفری",                                   price: 385000, available: true },

  // ── پیش غذا ───────────────────────────────────────────────────────
  { id: "pg-01", category: "pishghaza", name: "کیم چی کره‌ای",        ingredients: "۲۵۰ گرم",                                                               price: 345000, available: true },
  { id: "pg-02", category: "pishghaza", name: "اسپرینگ رول سبزیجات",  ingredients: "۴ تیکه",                                                               price: 340000, available: true },
  { id: "pg-03", category: "pishghaza", name: "پیراشکی ژاپنی",        ingredients: "۴ تیکه",                                                               price: 420000, available: true },
  { id: "pg-04", category: "pishghaza", name: "مرغ پفکی پرتقالی",      ingredients: "",                                                                      price: 565000, available: true },
  { id: "pg-05", category: "pishghaza", name: "مرغ پفکی چیلی",         ingredients: "",                                                                      price: 565000, available: true },
  { id: "pg-06", category: "pishghaza", name: "شریمپ داینامیت",        ingredients: "",                                                                      price: 645000, available: true },
  { id: "pg-07", category: "pishghaza", name: "میگو کاتسو",            ingredients: "",                                                                      price: 595000, available: true },
  { id: "pg-08", category: "pishghaza", name: "دوکبوک کره‌ای",         ingredients: "کیک برنج، نودل، پیازچه، فلفل دلمه، رب کره‌ای",                       price: 425000, available: true },
  { id: "pg-09", category: "pishghaza", name: "کالاماری سوخاری",       ingredients: "",                                                                      price: 745000, available: true },

  // ── سوشی ──────────────────────────────────────────────────────────
  { id: "sushi-01", category: "sushi", name: "پلاتر خام ۱۶ تیکه",      ingredients: "گالری، هایاشی، اوکازو، سالمون آووکادو",                               price: 2290000, available: true },
  { id: "sushi-02", category: "sushi", name: "پلاتر پخته ۱۶ تیکه",     ingredients: "اینکرید، سوبایا، کریسپی شریمپ، تورنتو",                              price: 1990000, available: true },
  { id: "sushi-03", category: "sushi", name: "گالری رول",               ingredients: "کرب، سالمون، آووکادو، سس تریاکی، سس مایونز",                         price: 995000, available: true },
  { id: "sushi-04", category: "sushi", name: "کریسپی شریمپ",            ingredients: "میگو کاتسو، آووکادو، سس سیراچا",                                      price: 895000, available: true },
  { id: "sushi-05", category: "sushi", name: "سوبایا رول",              ingredients: "میگو کاتسو، آووکادو، سس مایونز، سیب‌زمینی",                          price: 889000, available: true },
  { id: "sushi-06", category: "sushi", name: "هایائشی رول",             ingredients: "کرب، میگو، آووکادو، سالمون، توبیکو، سس اسپایسی",                     price: 965000, available: true },
  { id: "sushi-07", category: "sushi", name: "دراکون رول",              ingredients: "میگو، خیار، آووکادو، سس مایونز، سس اسپایسی",                         price: 935000, available: true },
  { id: "sushi-08", category: "sushi", name: "سالمون تریاکی",           ingredients: "سالمون، سس تریاکی، کنجد",                                             price: 895000, available: true },
  { id: "sushi-09", category: "sushi", name: "شریمپ هاگ",               ingredients: "میگو بخارپز، آووکادو، ذرت، توگاراشی",                                price: 865000, available: true },
  { id: "sushi-10", category: "sushi", name: "تورنتو رول",              ingredients: "میگو بخارپز، خیار، آووکادو، کنجد",                                    price: 869000, available: true },
  { id: "sushi-11", category: "sushi", name: "فوجیاهو",                 ingredients: "میگو بخارپز، آووکادو، کنجد، سس اسپایسی",                             price: 879000, available: true },
  { id: "sushi-12", category: "sushi", name: "اسپشیال کالیفرنیا",       ingredients: "کرب، آووکادو، سالمون، سس کنجد",                                      price: 975000, available: true },
  { id: "sushi-13", category: "sushi", name: "رینبو رول",               ingredients: "میگو کاتسو، خیار، آووکادو، سالمون، تونا، مایونز، توبیکو",            price: 995000, available: true },
  { id: "sushi-14", category: "sushi", name: "سالمون آووکادو",          ingredients: "سالمون، آووکادو، سس مایونز، توگاراشی",                               price: 995000, available: true },
  { id: "sushi-15", category: "sushi", name: "توکیو رول",               ingredients: "میگو کاتسو، آووکادو، سالمون، سس تریاکی",                             price: 985000, available: true },
  { id: "sushi-16", category: "sushi", name: "وجی هاگ",                 ingredients: "کاهو، هویج، خیار، آووکادو، کلم قرمز",                                price: 425000, available: true },
  { id: "sushi-17", category: "sushi", name: "سالمون هاگ رول",          ingredients: "ماهی سالمون",                                                          price: 895000, available: true },
  { id: "sushi-18", category: "sushi", name: "کرب نیگری",               ingredients: "",                                                                      price: 645000, available: true },
  { id: "sushi-19", category: "sushi", name: "نیگری سالمون",            ingredients: "",                                                                      price: 595000, available: true },
  { id: "sushi-20", category: "sushi", name: "تورچ نیگری سالمون",       ingredients: "",                                                                      price: 595000, available: true },
  { id: "sushi-21", category: "sushi", name: "بیف تریاکی رول",          ingredients: "",                                                                      price: 785000, available: true },
  { id: "sushi-22", category: "sushi", name: "چیکن تریاکی رول",         ingredients: "",                                                                      price: 765000, available: true },
  { id: "sushi-23", category: "sushi", name: "دبل اسپایسی رول",         ingredients: "کرب، آووکادو، خیار، کنجد، توگاراشی، سس اسپایسی مایو",               price: 959000, available: true },
  { id: "sushi-24", category: "sushi", name: "سالمون اسپایسی رول",      ingredients: "سالمون، توگاراشی، سس اسپایسی مایو",                                  price: 995000, available: true },
  { id: "sushi-25", category: "sushi", name: "ویتنام اسپرینگ رول",      ingredients: "ورق برنج، میگو سوخاری، آووکادو، خیار، توبیکو، مایونز ژاپنی",        price: 895000, available: true },
  { id: "sushi-26", category: "sushi", name: "چیکن هاگ اسپایسی",        ingredients: "مرغ سوخاری، هویج، سس سیراچا",                                        price: 775000, available: true },
  { id: "sushi-27", category: "sushi", name: "دبل شریمپ رول",           ingredients: "میگو بخارپز، میگو گریل، خیار، ذرت، توبیکو، سس تریاکی",              price: 965000, available: true },
  { id: "sushi-28", category: "sushi", name: "تاکویا رول",              ingredients: "مرغ سوخاری، گوشت گریل، کنجد، سس مایونز ژاپنی، سس تریاکی",          price: 859000, available: true },
  { id: "sushi-29", category: "sushi", name: "کریزی رول",               ingredients: "سالمون سوخاری، آووکادو، هویج، سس مایونز ژاپنی، سس چیلی تای",       price: 865000, available: true },
  { id: "sushi-30", category: "sushi", name: "شف رول",                  ingredients: "کرب کاتسو، خیار، آووکادو، کنجد، سس تریاکی، سس مایونز ژاپنی",       price: 865000, available: true },

  // ── کاری طلایی ژاپنی ──────────────────────────────────────────────
  { id: "kt-01", category: "kari-talai", name: "کاری طلایی مرغ",       ingredients: "مرغ، قارچ، پیازچه، خامه، سس کاری طلایی",                             price: 625000, available: true },
  { id: "kt-02", category: "kari-talai", name: "کاری طلایی میگو",      ingredients: "میگو، قارچ، پیازچه، خامه، سس کاری طلایی",                            price: 645000, available: true },

  // ── نودل ──────────────────────────────────────────────────────────
  { id: "nd-01", category: "nodel", name: "نودل میگو",                  ingredients: "نودل، کدو، هویج، قارچ، بروکلی، فلفل دلمه رنگی، بی‌بی کورن، جوانه ماش و میگو",   price: 795000, available: true },
  { id: "nd-02", category: "nodel", name: "نودل گوشت",                  ingredients: "نودل، کدو، هویج، قارچ، بروکلی، فلفل دلمه رنگی، بی‌بی کورن، جوانه ماش و گوشت",  price: 695000, available: true },
  { id: "nd-03", category: "nodel", name: "نودل سبزیجات",               ingredients: "نودل، کدو، هویج، قارچ، بروکلی، فلفل دلمه رنگی، بی‌بی کورن، جوانه ماش",         price: 425000, available: true },
  { id: "nd-04", category: "nodel", name: "نودل مرغ",                   ingredients: "نودل، کدو، هویج، قارچ، بروکلی، فلفل دلمه رنگی، بی‌بی کورن، جوانه ماش و مرغ",  price: 675000, available: true },

  // ── چاپ سویی ──────────────────────────────────────────────────────
  // TODO: items not provided yet

  // ── خوراک تام یام ─────────────────────────────────────────────────
  // TODO: items not provided yet

  // ── خوراک ─────────────────────────────────────────────────────────
  // TODO: items not provided yet

  // ── هیباچی برنج سرخ‌کرده ──────────────────────────────────────────
  { id: "hb-01", category: "hibachi", name: "استیم رایس",               ingredients: "برنج بخارپز ژاپنی",                                                    price: 350000, available: true },
  { id: "hb-02", category: "hibachi", name: "هیباچی میگو",              ingredients: "برنج بخارپز ژاپنی، کدو، هویج، تخم مرغ، پیازچه",                     price: 715000, available: true },
  { id: "hb-03", category: "hibachi", name: "هیباچی گوشت",              ingredients: "برنج بخارپز ژاپنی، کدو، هویج، تخم مرغ، پیازچه",                     price: 695000, available: true },
  { id: "hb-04", category: "hibachi", name: "هیباچی مرغ",               ingredients: "برنج بخارپز ژاپنی، کدو، هویج، تخم مرغ، پیازچه",                     price: 675000, available: true },
  { id: "hb-05", category: "hibachi", name: "هیباچی سبزیجات",           ingredients: "برنج بخارپز ژاپنی، کدو، هویج، تخم مرغ، پیازچه",                     price: 535000, available: true },

  // ── خوراک ساچبال ──────────────────────────────────────────────────
  { id: "sb-01", category: "sachbal", name: "ساچبال مرغ",               ingredients: "مرغ، قارچ، بروکلی، فلفل دلمه، هویج، پیازچه، سس تام یام تند و ترش",  price: 645000, available: true },
  { id: "sb-02", category: "sachbal", name: "ساچبال گوشت",              ingredients: "گوشت، قارچ، بروکلی، فلفل دلمه، هویج، پیازچه، سس تام یام تند و ترش", price: 665000, available: true },
  { id: "sb-03", category: "sachbal", name: "ساچبال میگو",              ingredients: "میگو، قارچ، بروکلی، فلفل دلمه، هویج، پیازچه، سس تام یام تند و ترش",  price: 345000, available: true },

  // ── کاری قرمز تایلندی ─────────────────────────────────────────────
  { id: "kq-01", category: "kari-ghermez", name: "کاری قرمز مرغ",      ingredients: "مرغ، فلفل دلمه، قارچ، سس کاری قرمز، پیازچه",                        price: 635000, available: true },
  { id: "kq-02", category: "kari-ghermez", name: "کاری قرمز میگو",     ingredients: "میگو، فلفل دلمه، قارچ، سس کاری قرمز، پیازچه",                       price: 665000, available: true },

  // ── خوراک بروکلی ──────────────────────────────────────────────────
  { id: "br-01", category: "brocoli", name: "بروکلی مرغ",               ingredients: "بروکلی، قارچ، پیازچه، برنج بخارپز",                                  price: 485000, available: true },
  { id: "br-02", category: "brocoli", name: "بروکلی گوشت",              ingredients: "بروکلی، قارچ، پیازچه، برنج بخارپز",                                  price: 510000, available: true },
  { id: "br-03", category: "brocoli", name: "بروکلی میگو",              ingredients: "بروکلی، قارچ، پیازچه، برنج بخارپز",                                  price: 540000, available: true },

  // ── خوراک چیلی ───────────────────────────────────────────────────
  { id: "ch-01", category: "chili", name: "چیلی مرغ",                   ingredients: "فلفل دلمه رنگی، بروکلی، کدو، فلفل کره‌ای، بادام هندی",              price: 535000, available: true },
  { id: "ch-02", category: "chili", name: "چیلی گوشت",                  ingredients: "فلفل دلمه رنگی، بروکلی، کدو، فلفل کره‌ای، بادام هندی",              price: 565000, available: true },
  { id: "ch-03", category: "chili", name: "چیلی میگو",                  ingredients: "فلفل دلمه رنگی، بروکلی، کدو، فلفل کره‌ای، بادام هندی",              price: 595000, available: true },

  // ── بشقاب سبزیجات ─────────────────────────────────────────────────
  // TODO: items not provided yet

  // ── جاجانگمیون ────────────────────────────────────────────────────
  // TODO: items not provided yet
]

// Dish photos that ship with the site (in /public/images/menu/items/<id>.webp).
// Admins can override or remove per-item images at runtime via the overrides API.
const ITEM_IDS_WITH_IMAGE = new Set<string>([
  "hb-01", "hb-02", "hb-03", "hb-04", "hb-05",
  "kq-01", "kq-02", "kt-01", "kt-02",
  "nd-01", "nd-02", "nd-03", "nd-04",
  "pg-01", "pg-02", "pg-03", "pg-04", "pg-05", "pg-06", "pg-07", "pg-09",
  "salad-01", "salad-02", "salad-03", "salad-04",
  "sb-01", "sb-02", "sb-03",
  "soup-01", "soup-02", "soup-03", "soup-04", "soup-05",
  "sushi-01", "sushi-02", "sushi-03", "sushi-04", "sushi-05", "sushi-06", "sushi-07",
  "sushi-08", "sushi-09", "sushi-10", "sushi-11", "sushi-12", "sushi-13", "sushi-14",
  "sushi-15", "sushi-16", "sushi-17", "sushi-18", "sushi-20", "sushi-21", "sushi-22",
  "sushi-23", "sushi-24",
])

/** Built-in default photo for an item, if one shipped with the site. */
export function defaultItemImage(id: string): string | undefined {
  return ITEM_IDS_WITH_IMAGE.has(id) ? `/images/menu/items/${id}.webp` : undefined
}

for (const item of menuItems) {
  const img = defaultItemImage(item.id)
  if (img) item.image = img
}
