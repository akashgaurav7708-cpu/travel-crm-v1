/**
 * Formats a number or string as Indian Rupee (INR) currency.
 * @param amount The amount to format (number or string with commas)
 * @returns Formatted currency string with ₹ symbol
 */
export const formatCurrency = (amount: number | string): string => {
  const numericValue = typeof amount === 'string'
    ? parseFloat(amount.replace(/,/g, ''))
    : amount;

  if (isNaN(numericValue)) return '₹0';

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(numericValue);
};
