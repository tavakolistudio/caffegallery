const faNumberFormatter = new Intl.NumberFormat("fa-IR", {
  maximumFractionDigits: 0,
});

export function formatToman(price: number): string {
  if (!Number.isInteger(price) || price < 0) {
    throw new Error(`Invalid toman price: ${price}`);
  }
  return `${faNumberFormatter.format(price)} تومان`;
}
