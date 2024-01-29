import config from '@/config';

const USDT = 'usdt';
const BNB = 'bnb';
const PRIMARY_CURRENCY = 'primary_currency';

export const CURRENCIES = {
  BNB,
  USDT,
  PRIMARY_CURRENCY,
};

interface currencyPrice {
  [key: string]: number,
}

interface exchangeRates {
  [key: string]: currencyPrice,
}

type currencyAmount = {
  amount: number;
  currency: string;
}

const createExchangeRates = () => {
  let exchangeRates = {} as exchangeRates;

  exchangeRates[BNB] = {
    [PRIMARY_CURRENCY]: config.currencyInBNB,
  };

  exchangeRates[PRIMARY_CURRENCY] = {
    [BNB]: 1 / exchangeRates[BNB][PRIMARY_CURRENCY],
  };

  return exchangeRates;
};

export const EXCHANGE_RATES = createExchangeRates();

export function convertCurrencies(from: string, to: string, amount: number): currencyAmount {
  return {
    amount: Number((amount * EXCHANGE_RATES[from][to]).toFixed(config.decimalPrecision[to])) || 0,
    currency: to,
  };
}
