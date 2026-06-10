// All prices are stored as normalized real toman values.
// Raw menu shorthand (e.g. ۹۹۵ تومان) × 1000 = stored price (995000).
// Display: 995000 → "۹۹۵٬۰۰۰ تومان"

export interface MenuItem {
  id: string
  category: string
  name: string
  ingredients: string
  price: number
  available: boolean
}

export interface MenuCategory {
  id: string
  name: string
}

export const menuCategories: MenuCategory[] = [
  { id: "sushi", name: "سوشی" },
  { id: "pishghaza", name: "پیش غذا" },
  { id: "soup", name: "سوپ" },
  { id: "salad", name: "سالاد" },
  { id: "tom-yum", name: "خوراک تام یام" },
  { id: "chap-sobi", name: "چاپ سوبی" },
  { id: "nodel", name: "نودل" },
  { id: "kari-talai", name: "کاری طلایی ژاپنی" },
  { id: "khorak", name: "خوراک" },
  { id: "hitachi", name: "هیتاچی برنج سرخ‌کرده" },
  { id: "sambal", name: "خوراک سامبال" },
  { id: "kari-ghermez", name: "کاری قرمز تایلندی" },
  { id: "jajang", name: "جاجانگمیون" },
  { id: "sabzijat", name: "بشقاب سبزیجات" },
  { id: "chili", name: "خوراک چیلی" },
  { id: "brocoli", name: "خوراک بروکلی" },
]

export const menuItems: MenuItem[] = [
  // ── سوشی ──────────────────────────────────────────────────────────
  { id: "sushi-01", category: "sushi", name: "پلاتر خام ۲۱ تکه", ingredients: "کاری، خیارشور، آووکادو، سالمون", price: 229000, available: true },
  { id: "sushi-02", category: "sushi", name: "کاری رول", ingredients: "کرب، سالمون، آووکادو، سبی ترنیاکی، سبی ماهوز", price: 295000, available: true },
  { id: "sushi-03", category: "sushi", name: "سویا رول", ingredients: "سالمون، آووکادو، سبی ماهوز، سیب زمینی", price: 569000, available: true },
  { id: "sushi-04", category: "sushi", name: "دراگون ترنیاکی", ingredients: "سالمون، آووکادو، سبی ترنیاکی", price: 360000, available: true },
  { id: "sushi-05", category: "sushi", name: "سالمون ترنیاکی", ingredients: "سالمون، سبی ماهوز، سبی ترنیاکی، کنجد", price: 695000, available: true },
  { id: "sushi-06", category: "sushi", name: "فیلادلفیا رول", ingredients: "کرب، آووکادو، سالمون، خیار، پنیر خامه‌ای", price: 750000, available: true },
  { id: "sushi-07", category: "sushi", name: "اسپیشیال سالمون", ingredients: "سالمون، آووکادو، سبی ماهوز، کنجد", price: 750000, available: true },
  { id: "sushi-08", category: "sushi", name: "توچیامو", ingredients: "سیگو بخارپز، آووکادو، کنجد", price: 799000, available: true },
  { id: "sushi-09", category: "sushi", name: "نورئنو رول", ingredients: "سیگو بخارپز، خیار، آووکادو، کنجد", price: 869000, available: true },
  { id: "sushi-10", category: "sushi", name: "شریمپ ماف", ingredients: "سیگو بخارپز، آووکادو، ترت، نوکازلتش", price: 869000, available: true },
  { id: "sushi-11", category: "sushi", name: "اسپایسی رول", ingredients: "سیگو، کرب، اسپایسی، سبوی", price: 975000, available: true },
  { id: "sushi-12", category: "sushi", name: "سالمون آووکادو", ingredients: "سالمون، آووکادو، سبی ماهوز، نوکازلتش", price: 995000, available: true },
  { id: "sushi-13", category: "sushi", name: "اسپیشیال کالیفرنیا", ingredients: "کرب، سیگو بخارپز، آووکادو، کنجد", price: 995000, available: true },

  // ── پیش غذا ───────────────────────────────────────────────────────
  // شریمپ داینامیت and میگو کاتسو: parsed from raw "شریمپ داینامیت ۶۴۵ تومانمیگو کاتسو ۵۹۵ تومان" (two items run together)
  { id: "pg-01", category: "pishghaza", name: "شریمپ داینامیت", ingredients: "", price: 645000, available: true },
  { id: "pg-02", category: "pishghaza", name: "میگو کاتسو", ingredients: "", price: 595000, available: true },
  { id: "pg-03", category: "pishghaza", name: "مرغ سرخ کرده", ingredients: "مرغ با پوشش ترد و ادویه مخصوص", price: 345000, available: true },
  { id: "pg-04", category: "pishghaza", name: "میگو تمپورا", ingredients: "میگو با پوشش ترد، سس ویژه", price: 245000, available: true },
  { id: "pg-05", category: "pishghaza", name: "تمپورای سبزیجات", ingredients: "سبزیجات تازه با پوشش تمپورا", price: 275000, available: true },

  // ── سوپ ───────────────────────────────────────────────────────────
  { id: "soup-01", category: "soup", name: "سوپ میسو", ingredients: "سوپ سنتی ژاپنی با توفو و جلبک دریایی", price: 145000, available: true },
  { id: "soup-02", category: "soup", name: "سوپ تام یام", ingredients: "سوپ تند تایلندی با میگو و قارچ", price: 195000, available: true },

  // ── سالاد ─────────────────────────────────────────────────────────
  { id: "salad-01", category: "salad", name: "چیانگ مایی", ingredients: "مرغ، کاهو، خیار، گشنیز، آووکادو", price: 245000, available: true },
  { id: "salad-02", category: "salad", name: "سالاد هیکو آووکادو", ingredients: "خیار، آووکادو، خیار خشک، سبزیجات تازه", price: 275000, available: true },
  { id: "salad-03", category: "salad", name: "سالاد تاکو", ingredients: "مرغ، آووکادو، سالمون، گشنیز، سس مخصوص", price: 345000, available: true },

  // ── خوراک تام یام ─────────────────────────────────────────────────
  { id: "ty-01", category: "tom-yum", name: "تام یام مرغ", ingredients: "مرغ، بروکلی، فلفل دلمه، ادویه تام یام", price: 795000, available: true },
  { id: "ty-02", category: "tom-yum", name: "تام یام میگو", ingredients: "میگو، بروکلی، فلفل دلمه، ادویه تام یام", price: 945000, available: true },

  // ── چاپ سوبی ──────────────────────────────────────────────────────
  { id: "cs-01", category: "chap-sobi", name: "چاپ سوبی مرغ", ingredients: "مرغ، سبزیجات، برنج، سس مخصوص", price: 175000, available: true },
  { id: "cs-02", category: "chap-sobi", name: "چاپ سوبی میگو", ingredients: "میگو، سبزیجات، برنج، سس مخصوص", price: 135000, available: true },

  // ── نودل ──────────────────────────────────────────────────────────
  { id: "nd-01", category: "nodel", name: "نودل مرغ", ingredients: "نودل با مرغ، سبزیجات و سس سویا", price: 195000, available: true },
  { id: "nd-02", category: "nodel", name: "نودل میگو", ingredients: "نودل با میگو، سبزیجات و سس اسپایسی", price: 245000, available: true },

  // ── کاری طلایی ژاپنی ──────────────────────────────────────────────
  { id: "kt-01", category: "kari-talai", name: "کاری طلایی مرغ", ingredients: "مرغ، سیب‌زمینی، هویج، سس کاری طلایی", price: 285000, available: true },
  { id: "kt-02", category: "kari-talai", name: "کاری طلایی میگو", ingredients: "میگو، سیب‌زمینی، هویج، سس کاری طلایی", price: 345000, available: true },

  // ── خوراک ─────────────────────────────────────────────────────────
  { id: "kh-01", category: "khorak", name: "خوراک مرغ", ingredients: "مرغ گریل شده با سبزیجات بخارپز", price: 295000, available: true },
  { id: "kh-02", category: "khorak", name: "خوراک میگو", ingredients: "میگو گریل شده با سس مخصوص", price: 345000, available: true },

  // ── هیتاچی برنج سرخ‌کرده ──────────────────────────────────────────
  { id: "ht-01", category: "hitachi", name: "برنج سرخ‌کرده مرغ", ingredients: "برنج، مرغ، سبزیجات، تخم‌مرغ، سس سویا", price: 285000, available: true },
  { id: "ht-02", category: "hitachi", name: "برنج سرخ‌کرده میگو", ingredients: "برنج، میگو، سبزیجات، تخم‌مرغ، سس سویا", price: 325000, available: true },

  // ── خوراک سامبال ──────────────────────────────────────────────────
  { id: "sb-01", category: "sambal", name: "سامبال مرغ", ingredients: "مرغ با سس سامبال تند اندونزیایی", price: 359000, available: true },
  { id: "sb-02", category: "sambal", name: "سامبال هیتاچی", ingredients: "ترکیب ویژه هیتاچی با سس سامبال", price: 395000, available: true },
  { id: "sb-03", category: "sambal", name: "سامبال میگو", ingredients: "میگو با سس سامبال تند اندونزیایی", price: 395000, available: true },

  // ── کاری قرمز تایلندی ─────────────────────────────────────────────
  { id: "kq-01", category: "kari-ghermez", name: "کاری قرمز مرغ", ingredients: "مرغ، بادنجان، فلفل قرمز، شیر نارگیل", price: 295000, available: true },
  { id: "kq-02", category: "kari-ghermez", name: "کاری قرمز میگو", ingredients: "میگو، بادنجان، فلفل قرمز، شیر نارگیل", price: 365000, available: true },

  // ── جاجانگمیون ────────────────────────────────────────────────────
  { id: "jj-01", category: "jajang", name: "جاجانگمیون کره‌ای", ingredients: "رشته، سس سیاه لوبیا، گوشت، پیاز، خیار", price: 295000, available: true },

  // ── بشقاب سبزیجات ─────────────────────────────────────────────────
  { id: "sv-01", category: "sabzijat", name: "بشقاب سبزیجات بخارپز", ingredients: "ترکیب سبزیجات فصل با سس سویا", price: 195000, available: true },
  { id: "sv-02", category: "sabzijat", name: "بشقاب سبزیجات گریل", ingredients: "سبزیجات گریل شده با روغن زیتون", price: 225000, available: true },

  // ── خوراک چیلی ───────────────────────────────────────────────────
  { id: "ch-01", category: "chili", name: "چیلی مرغ", ingredients: "مرغ، سس چیلی تند، فلفل قرمز، پیاز", price: 295000, available: true },
  { id: "ch-02", category: "chili", name: "چیلی میگو", ingredients: "میگو، سس چیلی تند، فلفل قرمز", price: 345000, available: true },

  // ── خوراک بروکلی ──────────────────────────────────────────────────
  { id: "br-01", category: "brocoli", name: "بروکلی مرغ", ingredients: "مرغ و بروکلی با سس سویا و زنجبیل", price: 275000, available: true },
  { id: "br-02", category: "brocoli", name: "بروکلی میگو", ingredients: "میگو و بروکلی با سس اویسطر", price: 325000, available: true },
]
