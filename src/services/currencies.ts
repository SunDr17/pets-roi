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

export function exchangeRates(currencyInBNB: number) {
  const createExchangeRates = () => {
    let exchangeRates = {} as ExchangeRates;

    exchangeRates[BNB] = {
      [PRIMARY_CURRENCY]: currencyInBNB,
    };

    exchangeRates[PRIMARY_CURRENCY] = {
      [BNB]: 1 / exchangeRates[BNB][PRIMARY_CURRENCY],
    };

    return exchangeRates;
  };

  const EXCHANGE_RATES = createExchangeRates();

  function convertCurrencies(from: string, to: string, amount: number): CurrencyAmount {
    return {
      amount: Number((amount * EXCHANGE_RATES[from][to]).toFixed(config.decimalPrecision[to])) || 0,
      currency: to,
    };
  }

  return { EXCHANGE_RATES, convertCurrencies };
}
