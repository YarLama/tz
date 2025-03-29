/**
 * Long number formating.
 * @example formatNumber(100000) → "100 000"
 */
export const formatNumber = (num: number, locale = 'ru-RU'): string => {
  return new Intl.NumberFormat(locale).format(num);
};
