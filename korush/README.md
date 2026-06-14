# منوی آنلاین غذای کوروش مال

وب‌سایت منوی دیجیتال برای مجموعه غذایی کوروش مال شامل سه برند:

- **کافه گالری کوروش مال** — ۴۷ آیتم
- **سوشی گالری** — ۹۵ آیتم
- **پاستا گالری** — ۲۰ آیتم

## فناوری

- Next.js 15 (App Router، Static Generation)
- TypeScript (strict)
- Tailwind CSS
- Framer Motion
- Lucide React

## نصب و اجرا

```bash
npm install
npm run dev
```

سپس مرورگر را روی [http://localhost:3000](http://localhost:3000) باز کنید.

## دستورات

| دستور | توضیح |
|-------|-------|
| `npm run dev` | اجرای محیط توسعه |
| `npm run build` | ساخت نسخه production |
| `npm start` | اجرای نسخه production |
| `npm test` | اجرای تست‌ها |

## ساختار پروژه

```
src/
  app/              صفحات Next.js (App Router)
  components/       کامپوننت‌های React
  config/           تنظیمات سایت (آدرس، تماس)
  data/             menu-data.ts — منبع اصلی داده‌ها
  lib/              توابع کمکی (format-price, menu-utils)
  types/            تعریف TypeScript
tests/
  menu-data.test.ts تست‌های داده
```

## تکمیل اطلاعات تماس

فایل `src/config/site.ts` را ویرایش کنید:

```ts
export const siteConfig = {
  address: "آدرس کوروش مال",
  phone: "021XXXXXXXX",
  instagram: "koroushmall_food",
  telegram: "koroushmall_menu",
};
```

## موارد placeholder

- اطلاعات تماس (آدرس، تلفن، شبکه‌های اجتماعی) در `src/config/site.ts` خالی هستند.
- تصویر برای آیتم‌ها وجود ندارد؛ فیلد اختیاری `image` در `MenuItem` برای آینده آماده است.
- URL سایت در `src/app/sitemap.ts` و `src/app/robots.ts` نیاز به تنظیم دارد.
- فایل manifest.webmanifest آیکن ندارد.
