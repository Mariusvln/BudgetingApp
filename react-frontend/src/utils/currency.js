export const DEFAULT_CURRENCY = "EUR";

export const CURRENCY_OPTIONS = [
  { value: "EUR", label: "EUR - Euro" },
  { value: "USD", label: "USD - US Dollar" },
];

const EUR_EXCHANGE_RATES = {
  EUR: 1,
  USD: 1.08,
};

export const normalizeCurrency = (currency) =>
  EUR_EXCHANGE_RATES[currency] ? currency : DEFAULT_CURRENCY;

export const convertFromEuro = (amount, currency = DEFAULT_CURRENCY) => {
  const normalizedCurrency = normalizeCurrency(currency);
  return (Number(amount) || 0) * EUR_EXCHANGE_RATES[normalizedCurrency];
};

export const convertToEuro = (amount, currency = DEFAULT_CURRENCY) => {
  const normalizedCurrency = normalizeCurrency(currency);
  return (Number(amount) || 0) / EUR_EXCHANGE_RATES[normalizedCurrency];
};

export const formatCurrency = (amount, currency = DEFAULT_CURRENCY) => {
  const normalizedCurrency = normalizeCurrency(currency);
  const locale = normalizedCurrency === "EUR" ? "lt-LT" : "en-US";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: normalizedCurrency,
  }).format(convertFromEuro(amount, normalizedCurrency));
};

export const getCurrencyPlaceholder = (currency = DEFAULT_CURRENCY) => {
  const normalizedCurrency = normalizeCurrency(currency);
  return normalizedCurrency === "EUR" ? "€ 0.00" : "$ 0.00";
};
