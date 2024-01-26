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

type convertedCurrencies = {
  amountFrom: number,
  amountTo: number,
  currencyFrom: string,
  currencyTo: string,
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

export function convertCurrencies(
  from: string,
  to: string,
  amount: number,
): convertedCurrencies {
  const amountFrom = Number(amount.toFixed(config.decimalPrecision[from]));
  const amountTo = Number(
    (amountFrom * EXCHANGE_RATES[from][to]).toFixed(config.decimalPrecision[to])
  );

  return {
    amountFrom,
    amountTo,
    currencyFrom: from,
    currencyTo: to,
  };
}
