export const DEFAULT_CURRENCY = "EUR";
export const MIN_TRANSACTION_AMOUNT = 0.01;
export const MAX_TRANSACTION_AMOUNT = 4_000_000_000;

export const CURRENCY_OPTIONS = [
  { value: "EUR", label: "EUR - Euro" },
  { value: "USD", label: "USD - US Dollar" },
];

const EUR_EXCHANGE_RATES = {
  EUR: 1,
  USD: 1.08,
};

export const formatAmountLimit = () =>
  MAX_TRANSACTION_AMOUNT.toLocaleString("en-US");

export const formatMinimumAmount = () =>
  MIN_TRANSACTION_AMOUNT.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export const validateCurrencyAmount = (value, label = "Amount") => {
  const parsedValue = Number(value);

  if (!Number.isFinite(parsedValue)) {
    return "Only numbers are allowed";
  }

  if (parsedValue < MIN_TRANSACTION_AMOUNT) {
    return `${label} cannot be less than ${formatMinimumAmount()}`;
  }

  if (!/^\d+(\.\d{1,2})?$/.test(String(value).trim())) {
    return `${label} cannot have fractions smaller than 0.01`;
  }

  if (parsedValue > MAX_TRANSACTION_AMOUNT) {
    return `${label} cannot be more than ${formatAmountLimit()}`;
  }

  return true;
};

export const getApiErrorMessage = async (response) => {
  const fallback = await response.text();

  try {
    return JSON.parse(fallback).message || fallback;
  } catch {
    return fallback;
  }
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
  return normalizedCurrency === "EUR" ? "EUR 0.00" : "$ 0.00";
};
