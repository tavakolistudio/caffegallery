export function normalizePersian(text: string): string {
  return text
    .replace(/‌/g, " ")
    .replace(/​/g, "")
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}
