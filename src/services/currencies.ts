import config from '@/config';

const USDT = 'usdt';
const BNB = 'bnb';
const PRIMARY_CURRENCY = 'primary_currency';

export const CURRENCIES = {
  BNB,
  USDT,
  PRIMARY_CURRENCY,
};

interface CurrencyPrice {
  [key: string]: number,
}

interface ExchangeRates {
  [key: string]: CurrencyPrice,
}

type CurrencyAmount = {
  amount: number;
  currency: string;
}

const createExchangeRates = () => {
  let exchangeRates = {} as ExchangeRates;

  exchangeRates[BNB] = {
    [PRIMARY_CURRENCY]: config.currencyInBNB, // TODO: get config from redux
  };

  exchangeRates[PRIMARY_CURRENCY] = {
    [BNB]: 1 / exchangeRates[BNB][PRIMARY_CURRENCY],
  };

  return exchangeRates;
};

export const EXCHANGE_RATES = createExchangeRates();

export function convertCurrencies(from: string, to: string, amount: number): CurrencyAmount {
  return {
    amount: Number((amount * EXCHANGE_RATES[from][to]).toFixed(config.decimalPrecision[to])) || 0,
    currency: to,
  };
}
