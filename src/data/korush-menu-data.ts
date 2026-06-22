import type { MenuDatabase } from "@/types/menu";

export const menuDatabase = {
  "meta": {
    "project": "منوی آنلاین غذای کوروش مال",
    "locale": "fa-IR",
    "direction": "rtl",
    "currency": "TOMAN",
    "priceUnitLabel": "تومان",
    "counts": {
      "cafe": 47,
      "sushi": 95,
      "pasta": 20,
      "total": 162
    },
    "priceIntegrity": "قیمت‌ها عدد صحیح و بر حسب تومان هستند و نباید گرد، تبدیل یا بازنویسی شوند."
  },
  "brands": [
    {
      "id": "cafe-gallery",
      "title": "کافه گالری کوروش مال",
      "shortTitle": "کافه گالری",
      "description": "قهوه، نوشیدنی‌های گرم و سرد، شیک، فراپه، کیک و دسر",
      "route": "/cafe",
      "accent": "#2F7A78",
      "background": "#F4EBDD",
      "categories": [
        "قهوه",
        "نوشیدنی‌های سرد بر پایه قهوه",
        "نوشیدنی‌های گرم",
        "نوشیدنی‌های سرد",
        "چای و دمنوش",
        "شیک و فراپه",
        "کیک و دسر"
      ]
    },
    {
      "id": "sushi-gallery",
      "title": "سوشی گالری",
      "shortTitle": "سوشی گالری",
      "description": "سوشی، رول، نودل، سوپ و غذاهای آسیایی",
      "route": "/sushi",
      "accent": "#62D9D6",
      "background": "#11181C",
      "categories": [
        "سوشی و رول",
        "سالاد",
        "سوپ",
        "پیش‌غذا",
        "نودل",
        "خوراک تام یام",
        "چاپ‌سویی",
        "هیباچی برنج سرخ‌شده",
        "کاری طلایی ژاپنی",
        "کاری قرمز تایلندی",
        "خوراک تایلندی",
        "خوراک تریاکی",
        "خوراک ساچبال",
        "خوراک چیلی",
        "خوراک بروکلی",
        "جاجانگ‌میون",
        "بشقاب سبزیجات"
      ]
    },
    {
      "id": "pasta-gallery",
      "title": "پاستا گالری",
      "shortTitle": "پاستا گالری",
      "description": "پاستا، سالاد و پیش‌غذا",
      "route": "/pasta",
      "accent": "#D85B59",
      "background": "#FFF4EB",
      "categories": [
        "پاستا",
        "سالاد",
        "پیش‌غذا"
      ]
    }
  ],
  "items": [
    {
      "id": "cafe-gallery-001",
      "brand": "cafe-gallery",
      "category": "قهوه",
      "name": "کافه لاته",
      "price": 155000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-002",
      "brand": "cafe-gallery",
      "category": "قهوه",
      "name": "کاپوچینو",
      "price": 135000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-003",
      "brand": "cafe-gallery",
      "category": "قهوه",
      "name": "کارامل ماکیاتو",
      "price": 185000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-004",
      "brand": "cafe-gallery",
      "category": "قهوه",
      "name": "موکا",
      "price": 185000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-005",
      "brand": "cafe-gallery",
      "category": "قهوه",
      "name": "آمریکانو",
      "price": 120000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-006",
      "brand": "cafe-gallery",
      "category": "قهوه",
      "name": "نسکافه با شیر",
      "price": 135000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-007",
      "brand": "cafe-gallery",
      "category": "نوشیدنی‌های سرد بر پایه قهوه",
      "name": "آیس لاته",
      "price": 145000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-008",
      "brand": "cafe-gallery",
      "category": "نوشیدنی‌های سرد بر پایه قهوه",
      "name": "آفوگاتو",
      "price": 135000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-009",
      "brand": "cafe-gallery",
      "category": "نوشیدنی‌های سرد بر پایه قهوه",
      "name": "آیس موکا",
      "price": 185000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-010",
      "brand": "cafe-gallery",
      "category": "نوشیدنی‌های سرد بر پایه قهوه",
      "name": "آیس کارامل ماکیاتو",
      "price": 185000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-011",
      "brand": "cafe-gallery",
      "category": "نوشیدنی‌های سرد بر پایه قهوه",
      "name": "آیس آمریکانو",
      "price": 135000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-012",
      "brand": "cafe-gallery",
      "category": "نوشیدنی‌های گرم",
      "name": "هات چاکلت",
      "price": 155000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-013",
      "brand": "cafe-gallery",
      "category": "نوشیدنی‌های گرم",
      "name": "دارک چاکلت",
      "price": 175000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-014",
      "brand": "cafe-gallery",
      "category": "نوشیدنی‌های گرم",
      "name": "چای انگلیسی",
      "price": 135000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-015",
      "brand": "cafe-gallery",
      "category": "نوشیدنی‌های گرم",
      "name": "ماسالا",
      "price": 135000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-016",
      "brand": "cafe-gallery",
      "category": "نوشیدنی‌های گرم",
      "name": "ماچا لاته",
      "price": 185000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-017",
      "brand": "cafe-gallery",
      "category": "نوشیدنی‌های گرم",
      "name": "ماچا لاته نارگیل",
      "price": 195000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-018",
      "brand": "cafe-gallery",
      "category": "نوشیدنی‌های گرم",
      "name": "وایت پینات",
      "price": 175000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-019",
      "brand": "cafe-gallery",
      "category": "نوشیدنی‌های سرد",
      "name": "آیس چاکلت",
      "price": 175000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-020",
      "brand": "cafe-gallery",
      "category": "نوشیدنی‌های سرد",
      "name": "آیس ماچا لاته بوبا",
      "price": 220000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-021",
      "brand": "cafe-gallery",
      "category": "نوشیدنی‌های سرد",
      "name": "آیس ماچا لاته نارگیل بوبا",
      "price": 250000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-022",
      "brand": "cafe-gallery",
      "category": "نوشیدنی‌های سرد",
      "name": "آیس وایت پینات بوبا",
      "price": 220000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-023",
      "brand": "cafe-gallery",
      "category": "نوشیدنی‌های سرد",
      "name": "آیس تی بوبا",
      "price": 280000,
      "currency": "TOMAN",
      "variant": "مدل آبی"
    },
    {
      "id": "cafe-gallery-024",
      "brand": "cafe-gallery",
      "category": "نوشیدنی‌های سرد",
      "name": "آیس تی بوبا",
      "price": 185000,
      "currency": "TOMAN",
      "variant": "مدل نارنجی"
    },
    {
      "id": "cafe-gallery-025",
      "brand": "cafe-gallery",
      "category": "نوشیدنی‌های سرد",
      "name": "موهیتو",
      "price": 210000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-026",
      "brand": "cafe-gallery",
      "category": "نوشیدنی‌های سرد",
      "name": "لیموناد",
      "price": 180000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-027",
      "brand": "cafe-gallery",
      "category": "نوشیدنی‌های سرد",
      "name": "جینجر لیموناد",
      "price": 195000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-028",
      "brand": "cafe-gallery",
      "category": "چای و دمنوش",
      "name": "چای لاهیجان",
      "price": 50000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-029",
      "brand": "cafe-gallery",
      "category": "چای و دمنوش",
      "name": "چای لیمو و زنجبیل",
      "price": 125000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-030",
      "brand": "cafe-gallery",
      "category": "چای و دمنوش",
      "name": "چای سبز و لیمو",
      "price": 125000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-031",
      "brand": "cafe-gallery",
      "category": "چای و دمنوش",
      "name": "چای گل گاوزبان",
      "price": 125000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-032",
      "brand": "cafe-gallery",
      "category": "چای و دمنوش",
      "name": "دمنوش لیدی گری",
      "price": 125000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-033",
      "brand": "cafe-gallery",
      "category": "چای و دمنوش",
      "name": "چای میوه‌های جنگلی",
      "price": 125000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-034",
      "brand": "cafe-gallery",
      "category": "شیک و فراپه",
      "name": "شیک وانیل",
      "price": 210000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-035",
      "brand": "cafe-gallery",
      "category": "شیک و فراپه",
      "name": "شیک شکلات",
      "price": 220000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-036",
      "brand": "cafe-gallery",
      "category": "شیک و فراپه",
      "name": "شیک نوتلا توت‌فرنگی",
      "price": 250000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-037",
      "brand": "cafe-gallery",
      "category": "شیک و فراپه",
      "name": "شیک اسپرسو",
      "price": 210000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-038",
      "brand": "cafe-gallery",
      "category": "شیک و فراپه",
      "name": "شیک بادام‌زمینی",
      "price": 220000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-039",
      "brand": "cafe-gallery",
      "category": "شیک و فراپه",
      "name": "فراپه کارامل",
      "price": 210000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-040",
      "brand": "cafe-gallery",
      "category": "شیک و فراپه",
      "name": "فراپه موکا",
      "price": 220000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-041",
      "brand": "cafe-gallery",
      "category": "شیک و فراپه",
      "name": "فراپه توت‌فرنگی",
      "price": 220000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-042",
      "brand": "cafe-gallery",
      "category": "شیک و فراپه",
      "name": "شیک و فراپه",
      "price": 220000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-043",
      "brand": "cafe-gallery",
      "category": "کیک و دسر",
      "name": "کیک سه‌شیر پسته",
      "price": 310000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-044",
      "brand": "cafe-gallery",
      "category": "کیک و دسر",
      "name": "کیک پسته",
      "price": 285000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-045",
      "brand": "cafe-gallery",
      "category": "کیک و دسر",
      "name": "کیک اکلر",
      "price": 210000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-046",
      "brand": "cafe-gallery",
      "category": "کیک و دسر",
      "name": "موچی",
      "price": 125000,
      "currency": "TOMAN"
    },
    {
      "id": "cafe-gallery-047",
      "brand": "cafe-gallery",
      "category": "کیک و دسر",
      "name": "کرامبل سیب",
      "price": 220000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-001",
      "brand": "sushi-gallery",
      "category": "سوشی و رول",
      "name": "پلاتر خام ۱۶ تکه",
      "price": 2290000,
      "currency": "TOMAN",
      "amount": "۱۶ تکه"
    },
    {
      "id": "sushi-gallery-002",
      "brand": "sushi-gallery",
      "category": "سوشی و رول",
      "name": "پلاتر پخته ۱۶ تکه",
      "price": 1990000,
      "currency": "TOMAN",
      "amount": "۱۶ تکه"
    },
    {
      "id": "sushi-gallery-003",
      "brand": "sushi-gallery",
      "category": "سوشی و رول",
      "name": "فیلادلفیا رول",
      "price": 995000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-004",
      "brand": "sushi-gallery",
      "category": "سوشی و رول",
      "name": "اینکرید رول",
      "price": 905000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-005",
      "brand": "sushi-gallery",
      "category": "سوشی و رول",
      "name": "تورچ ساکای",
      "price": 995000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-006",
      "brand": "sushi-gallery",
      "category": "سوشی و رول",
      "name": "اسپشیال رول",
      "price": 995000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-007",
      "brand": "sushi-gallery",
      "category": "سوشی و رول",
      "name": "اوکازو رول",
      "price": 965000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-008",
      "brand": "sushi-gallery",
      "category": "سوشی و رول",
      "name": "کالیفرنیا رول",
      "price": 875000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-009",
      "brand": "sushi-gallery",
      "category": "سوشی و رول",
      "name": "گالری رول",
      "price": 995000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-010",
      "brand": "sushi-gallery",
      "category": "سوشی و رول",
      "name": "کریسپی شریمپ",
      "price": 895000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-011",
      "brand": "sushi-gallery",
      "category": "سوشی و رول",
      "name": "سوبایا رول",
      "price": 889000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-012",
      "brand": "sushi-gallery",
      "category": "سوشی و رول",
      "name": "هایائشی رول",
      "price": 965000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-013",
      "brand": "sushi-gallery",
      "category": "سوشی و رول",
      "name": "سالمون آووکادو",
      "price": 995000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-014",
      "brand": "sushi-gallery",
      "category": "سوشی و رول",
      "name": "رینبو رول",
      "price": 995000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-015",
      "brand": "sushi-gallery",
      "category": "سوشی و رول",
      "name": "وجی هاگ",
      "price": 325000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-016",
      "brand": "sushi-gallery",
      "category": "سوشی و رول",
      "name": "توکیو رول",
      "price": 985000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-017",
      "brand": "sushi-gallery",
      "category": "سوشی و رول",
      "name": "کرب نیگیری",
      "price": 425000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-018",
      "brand": "sushi-gallery",
      "category": "سوشی و رول",
      "name": "سالمون هاگ رول",
      "price": 895000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-019",
      "brand": "sushi-gallery",
      "category": "سوشی و رول",
      "name": "دراگون رول",
      "price": 925000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-020",
      "brand": "sushi-gallery",
      "category": "سوشی و رول",
      "name": "سالمون تریاکی",
      "price": 895000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-021",
      "brand": "sushi-gallery",
      "category": "سوشی و رول",
      "name": "شریمپ هاگ",
      "price": 855000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-022",
      "brand": "sushi-gallery",
      "category": "سوشی و رول",
      "name": "تورنتو رول",
      "price": 899000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-023",
      "brand": "sushi-gallery",
      "category": "سوشی و رول",
      "name": "فوجیاهو",
      "price": 879000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-024",
      "brand": "sushi-gallery",
      "category": "سوشی و رول",
      "name": "اسپشیال کالیفرنیا",
      "price": 975000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-025",
      "brand": "sushi-gallery",
      "category": "سوشی و رول",
      "name": "ویتنام اسپرینگ رول",
      "price": 895000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-026",
      "brand": "sushi-gallery",
      "category": "سوشی و رول",
      "name": "چیکن هاگ اسپایسی",
      "price": 375000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-027",
      "brand": "sushi-gallery",
      "category": "سوشی و رول",
      "name": "تاکویا رول",
      "price": 891000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-028",
      "brand": "sushi-gallery",
      "category": "سوشی و رول",
      "name": "دبل شریمپ رول",
      "price": 965000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-029",
      "brand": "sushi-gallery",
      "category": "سوشی و رول",
      "name": "شف رول",
      "price": 865000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-030",
      "brand": "sushi-gallery",
      "category": "سوشی و رول",
      "name": "کریزی رول",
      "price": 865000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-031",
      "brand": "sushi-gallery",
      "category": "سوشی و رول",
      "name": "نیگیری سالمون",
      "price": 595000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-032",
      "brand": "sushi-gallery",
      "category": "سوشی و رول",
      "name": "تورچ نیگیری سالمون",
      "price": 595000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-033",
      "brand": "sushi-gallery",
      "category": "سوشی و رول",
      "name": "بیف تریاکی رول",
      "price": 785000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-034",
      "brand": "sushi-gallery",
      "category": "سوشی و رول",
      "name": "چیکن تریاکی رول",
      "price": 765000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-035",
      "brand": "sushi-gallery",
      "category": "سوشی و رول",
      "name": "دبل اسپایسی رول",
      "price": 959000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-036",
      "brand": "sushi-gallery",
      "category": "سوشی و رول",
      "name": "سالمون اسپایسی رول",
      "price": 995000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-037",
      "brand": "sushi-gallery",
      "category": "سالاد",
      "name": "چیکن جاپنیز",
      "price": 565000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-038",
      "brand": "sushi-gallery",
      "category": "سالاد",
      "name": "سالاد میگو و آووکادو",
      "price": 595000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-039",
      "brand": "sushi-gallery",
      "category": "سالاد",
      "name": "سالاد کرب و آووکادو",
      "price": 610000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-040",
      "brand": "sushi-gallery",
      "category": "سالاد",
      "name": "سالاد تای بیف",
      "price": 590000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-041",
      "brand": "sushi-gallery",
      "category": "سوپ",
      "name": "سوپ کیمچی گوشت",
      "price": 285000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-042",
      "brand": "sushi-gallery",
      "category": "سوپ",
      "name": "سوپ کیمچی مرغ",
      "price": 250000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-043",
      "brand": "sushi-gallery",
      "category": "سوپ",
      "name": "سوپ نودل",
      "price": 235000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-044",
      "brand": "sushi-gallery",
      "category": "سوپ",
      "name": "سوپ تام یام",
      "price": 215000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-045",
      "brand": "sushi-gallery",
      "category": "سوپ",
      "name": "سوپ میسو",
      "price": 295000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-046",
      "brand": "sushi-gallery",
      "category": "سوپ",
      "name": "سوپ مرغ و ذرت",
      "price": 285000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-047",
      "brand": "sushi-gallery",
      "category": "پیش‌غذا",
      "name": "کیمچی کره‌ای",
      "price": 225000,
      "currency": "TOMAN",
      "amount": "۲۵۰ گرم"
    },
    {
      "id": "sushi-gallery-048",
      "brand": "sushi-gallery",
      "category": "پیش‌غذا",
      "name": "اسپرینگ رول سبزیجات",
      "price": 240000,
      "currency": "TOMAN",
      "amount": "۴ تکه"
    },
    {
      "id": "sushi-gallery-049",
      "brand": "sushi-gallery",
      "category": "پیش‌غذا",
      "name": "پیراشکی ژاپنی",
      "price": 220000,
      "currency": "TOMAN",
      "amount": "۴ تکه"
    },
    {
      "id": "sushi-gallery-050",
      "brand": "sushi-gallery",
      "category": "پیش‌غذا",
      "name": "مرغ پفکی پرتقالی",
      "price": 565000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-051",
      "brand": "sushi-gallery",
      "category": "پیش‌غذا",
      "name": "مرغ پفکی چیلی",
      "price": 565000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-052",
      "brand": "sushi-gallery",
      "category": "پیش‌غذا",
      "name": "شریمپ داینامیت",
      "price": 625000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-053",
      "brand": "sushi-gallery",
      "category": "پیش‌غذا",
      "name": "میگو کاتسو",
      "price": 595000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-054",
      "brand": "sushi-gallery",
      "category": "پیش‌غذا",
      "name": "دوکبوکی کره‌ای",
      "price": 425000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-055",
      "brand": "sushi-gallery",
      "category": "پیش‌غذا",
      "name": "کالاماری سوخاری",
      "price": 725000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-056",
      "brand": "sushi-gallery",
      "category": "نودل",
      "name": "نودل میگو",
      "price": 795000,
      "currency": "TOMAN",
      "description": "ترکیبات پایه: نودل، کلم، هویج، قارچ، بروکلی، فلفل دلمه، بیبی‌کورن و جوانه ماش"
    },
    {
      "id": "sushi-gallery-057",
      "brand": "sushi-gallery",
      "category": "نودل",
      "name": "نودل گوشت",
      "price": 985000,
      "currency": "TOMAN",
      "description": "ترکیبات پایه: نودل، کلم، هویج، قارچ، بروکلی، فلفل دلمه، بیبی‌کورن و جوانه ماش"
    },
    {
      "id": "sushi-gallery-058",
      "brand": "sushi-gallery",
      "category": "نودل",
      "name": "نودل سبزیجات",
      "price": 925000,
      "currency": "TOMAN",
      "description": "ترکیبات پایه: نودل، کلم، هویج، قارچ، بروکلی، فلفل دلمه، بیبی‌کورن و جوانه ماش"
    },
    {
      "id": "sushi-gallery-059",
      "brand": "sushi-gallery",
      "category": "نودل",
      "name": "نودل مرغ",
      "price": 675000,
      "currency": "TOMAN",
      "description": "ترکیبات پایه: نودل، کلم، هویج، قارچ، بروکلی، فلفل دلمه، بیبی‌کورن و جوانه ماش"
    },
    {
      "id": "sushi-gallery-060",
      "brand": "sushi-gallery",
      "category": "خوراک تام یام",
      "name": "میگو",
      "price": 725000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-061",
      "brand": "sushi-gallery",
      "category": "خوراک تام یام",
      "name": "مرغ",
      "price": 695000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-062",
      "brand": "sushi-gallery",
      "category": "خوراک تام یام",
      "name": "گوشت",
      "price": 775000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-063",
      "brand": "sushi-gallery",
      "category": "چاپ‌سویی",
      "name": "مرغ",
      "price": 665000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-064",
      "brand": "sushi-gallery",
      "category": "چاپ‌سویی",
      "name": "گوشت",
      "price": 695000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-065",
      "brand": "sushi-gallery",
      "category": "چاپ‌سویی",
      "name": "میگو",
      "price": 725000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-066",
      "brand": "sushi-gallery",
      "category": "هیباچی برنج سرخ‌شده",
      "name": "استیم رایس",
      "price": 250000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-067",
      "brand": "sushi-gallery",
      "category": "هیباچی برنج سرخ‌شده",
      "name": "میگو",
      "price": 715000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-068",
      "brand": "sushi-gallery",
      "category": "هیباچی برنج سرخ‌شده",
      "name": "گوشت",
      "price": 695000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-069",
      "brand": "sushi-gallery",
      "category": "هیباچی برنج سرخ‌شده",
      "name": "مرغ",
      "price": 675000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-070",
      "brand": "sushi-gallery",
      "category": "هیباچی برنج سرخ‌شده",
      "name": "سبزیجات",
      "price": 525000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-071",
      "brand": "sushi-gallery",
      "category": "کاری طلایی ژاپنی",
      "name": "مرغ",
      "price": 625000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-072",
      "brand": "sushi-gallery",
      "category": "کاری طلایی ژاپنی",
      "name": "میگو",
      "price": 645000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-073",
      "brand": "sushi-gallery",
      "category": "کاری قرمز تایلندی",
      "name": "مرغ",
      "price": 625000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-074",
      "brand": "sushi-gallery",
      "category": "کاری قرمز تایلندی",
      "name": "میگو",
      "price": 645000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-075",
      "brand": "sushi-gallery",
      "category": "خوراک تایلندی",
      "name": "میگو",
      "price": 695000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-076",
      "brand": "sushi-gallery",
      "category": "خوراک تایلندی",
      "name": "گوشت",
      "price": 585000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-077",
      "brand": "sushi-gallery",
      "category": "خوراک تایلندی",
      "name": "مرغ",
      "price": 555000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-078",
      "brand": "sushi-gallery",
      "category": "خوراک تریاکی",
      "name": "میگو",
      "price": 665000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-079",
      "brand": "sushi-gallery",
      "category": "خوراک تریاکی",
      "name": "گوشت",
      "price": 625000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-080",
      "brand": "sushi-gallery",
      "category": "خوراک تریاکی",
      "name": "مرغ",
      "price": 585000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-081",
      "brand": "sushi-gallery",
      "category": "خوراک ساچبال",
      "name": "مرغ",
      "price": 665000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-082",
      "brand": "sushi-gallery",
      "category": "خوراک ساچبال",
      "name": "گوشت",
      "price": 665000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-083",
      "brand": "sushi-gallery",
      "category": "خوراک ساچبال",
      "name": "میگو",
      "price": 725000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-084",
      "brand": "sushi-gallery",
      "category": "خوراک چیلی",
      "name": "مرغ",
      "price": 525000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-085",
      "brand": "sushi-gallery",
      "category": "خوراک چیلی",
      "name": "گوشت",
      "price": 565000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-086",
      "brand": "sushi-gallery",
      "category": "خوراک چیلی",
      "name": "میگو",
      "price": 585000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-087",
      "brand": "sushi-gallery",
      "category": "خوراک بروکلی",
      "name": "مرغ",
      "price": 485000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-088",
      "brand": "sushi-gallery",
      "category": "خوراک بروکلی",
      "name": "گوشت",
      "price": 510000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-089",
      "brand": "sushi-gallery",
      "category": "خوراک بروکلی",
      "name": "میگو",
      "price": 540000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-090",
      "brand": "sushi-gallery",
      "category": "جاجانگ‌میون",
      "name": "مرغ",
      "price": 625000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-091",
      "brand": "sushi-gallery",
      "category": "جاجانگ‌میون",
      "name": "گوشت",
      "price": 650000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-092",
      "brand": "sushi-gallery",
      "category": "جاجانگ‌میون",
      "name": "میگو",
      "price": 695000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-093",
      "brand": "sushi-gallery",
      "category": "بشقاب سبزیجات",
      "name": "مرغ",
      "price": 580000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-094",
      "brand": "sushi-gallery",
      "category": "بشقاب سبزیجات",
      "name": "گوشت",
      "price": 615000,
      "currency": "TOMAN"
    },
    {
      "id": "sushi-gallery-095",
      "brand": "sushi-gallery",
      "category": "بشقاب سبزیجات",
      "name": "میگو",
      "price": 665000,
      "currency": "TOMAN"
    },
    {
      "id": "pasta-gallery-001",
      "brand": "pasta-gallery",
      "category": "پاستا",
      "name": "پاستا مرغ آلفردو",
      "price": 225000,
      "currency": "TOMAN",
      "description": "پنه، سینه مرغ، قارچ، خامه، سیر، پنیر پارمسان"
    },
    {
      "id": "pasta-gallery-002",
      "brand": "pasta-gallery",
      "category": "پاستا",
      "name": "پاستا بیف آلفردو",
      "price": 220000,
      "currency": "TOMAN",
      "description": "پنه، فیله گوساله، قارچ، خامه، سیر، پنیر پارمسان"
    },
    {
      "id": "pasta-gallery-003",
      "brand": "pasta-gallery",
      "category": "پاستا",
      "name": "پاستا مرغ پستو",
      "price": 280000,
      "currency": "TOMAN",
      "description": "پنه، سینه مرغ، قارچ، سس پستو، پنیر پارمسان"
    },
    {
      "id": "pasta-gallery-004",
      "brand": "pasta-gallery",
      "category": "پاستا",
      "name": "پاستا کاربونارا",
      "price": 280000,
      "currency": "TOMAN",
      "description": "اسپاگتی، سس آلفردو، بیکن گوشت، زرده تخم‌مرغ، پنیر پارمسان"
    },
    {
      "id": "pasta-gallery-005",
      "brand": "pasta-gallery",
      "category": "پاستا",
      "name": "مک‌اند‌چیز",
      "price": 220000,
      "currency": "TOMAN",
      "description": "پاستا مک، پنیر چدار، پنیر موزارلا، پنیر پارمسان"
    },
    {
      "id": "pasta-gallery-006",
      "brand": "pasta-gallery",
      "category": "پاستا",
      "name": "پاستا دریایی",
      "price": 260000,
      "currency": "TOMAN",
      "description": "پنه، سس قارچ، میگو، پنیر پارمسان"
    },
    {
      "id": "pasta-gallery-007",
      "brand": "pasta-gallery",
      "category": "پاستا",
      "name": "اسپاگتی مارینارا",
      "price": 240000,
      "currency": "TOMAN",
      "description": "اسپاگتی، سس مارینارا، گوجه گیلاسی، ریحان، سیر، پیاز، جعفری، پنیر پارمسان"
    },
    {
      "id": "pasta-gallery-008",
      "brand": "pasta-gallery",
      "category": "پاستا",
      "name": "مک‌اند‌چیز هالوپینو",
      "price": 260000,
      "currency": "TOMAN",
      "description": "پاستا مک، سس خامه، پنیر پارمسان، فلفل هالوپینو"
    },
    {
      "id": "pasta-gallery-009",
      "brand": "pasta-gallery",
      "category": "سالاد",
      "name": "سالاد مرغ ژاپنی",
      "price": 595000,
      "currency": "TOMAN",
      "description": "کاهو لیتل، سینه مرغ گریل، سس بادام‌زمینی"
    },
    {
      "id": "pasta-gallery-010",
      "brand": "pasta-gallery",
      "category": "سالاد",
      "name": "سالاد سزار با مرغ",
      "price": 390000,
      "currency": "TOMAN",
      "description": "کاهو پیچ، سینه مرغ گریل، گوجه گیلاسی، زیتون، نان سیر، پنیر پارمسان، سس سزار"
    },
    {
      "id": "pasta-gallery-011",
      "brand": "pasta-gallery",
      "category": "سالاد",
      "name": "سالاد سزار با مرغ سوخاری",
      "price": 510000,
      "currency": "TOMAN",
      "description": "کاهو پیچ، سینه مرغ سوخاری، گوجه گیلاسی، زیتون، نان سیر، پنیر پارمسان، سس سزار"
    },
    {
      "id": "pasta-gallery-012",
      "brand": "pasta-gallery",
      "category": "سالاد",
      "name": "سالاد کرَب و آووکادو",
      "price": 610000,
      "currency": "TOMAN",
      "description": "کاهو لیتل، آووکادو، سس کنجد، کرَب"
    },
    {
      "id": "pasta-gallery-013",
      "brand": "pasta-gallery",
      "category": "سالاد",
      "name": "سالاد میگو و آووکادو",
      "price": 595000,
      "currency": "TOMAN",
      "description": "کاهو لیتل، میگو، سس کنجد، آووکادو"
    },
    {
      "id": "pasta-gallery-014",
      "brand": "pasta-gallery",
      "category": "سالاد",
      "name": "سالاد اتراکت",
      "price": 280000,
      "currency": "TOMAN",
      "description": "کاهو پیچ، گردو، گوجه گیلاسی، سس اتراکت"
    },
    {
      "id": "pasta-gallery-015",
      "brand": "pasta-gallery",
      "category": "پیش‌غذا",
      "name": "سیب‌زمینی تنوری",
      "price": 180000,
      "currency": "TOMAN"
    },
    {
      "id": "pasta-gallery-016",
      "brand": "pasta-gallery",
      "category": "پیش‌غذا",
      "name": "سیب‌زمینی تنوری با سس قارچ",
      "price": 220000,
      "currency": "TOMAN"
    },
    {
      "id": "pasta-gallery-017",
      "brand": "pasta-gallery",
      "category": "پیش‌غذا",
      "name": "پیراشکی ژاپنی",
      "price": 220000,
      "currency": "TOMAN"
    },
    {
      "id": "pasta-gallery-018",
      "brand": "pasta-gallery",
      "category": "پیش‌غذا",
      "name": "مرغ پفکی",
      "price": 565000,
      "currency": "TOMAN"
    },
    {
      "id": "pasta-gallery-019",
      "brand": "pasta-gallery",
      "category": "پیش‌غذا",
      "name": "میگو کاتسو",
      "price": 595000,
      "currency": "TOMAN"
    },
    {
      "id": "pasta-gallery-020",
      "brand": "pasta-gallery",
      "category": "پیش‌غذا",
      "name": "دوکبوکی کره‌ای",
      "price": 425000,
      "currency": "TOMAN"
    }
  ]
} as const satisfies MenuDatabase;

export const menuBrands = menuDatabase.brands;
export const menuItems = menuDatabase.items;
