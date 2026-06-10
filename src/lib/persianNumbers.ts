const FA = "۰۱۲۳۴۵۶۷۸۹"

export function toPersian(n: number | string): string {
  return String(n).replace(/\d/g, d => FA[+d])
}

export function toEnglish(str: string): string {
  return str.replace(/[۰-۹]/g, d => String(FA.indexOf(d)))
}
