const USDT = 'usdt';
const PETCOINS = 'petCoins';

export const CURRENCIES = {
    USDT,
    PETCOINS,
};

const PETCOINS_IN_USDT = 1000;

interface currencyPrice {
    [key: string]: number,
}
interface exchangeRates {
    [key: string]: currencyPrice,
}
interface currencyAmount {
    amount: number,
    currency: string,
}

const createExchangeRates = () => {
    let exchangeRates = {} as exchangeRates;

    exchangeRates[USDT] = {
        [PETCOINS]: PETCOINS_IN_USDT,
    };

    exchangeRates[PETCOINS] = {
        [USDT]: 1 / exchangeRates[USDT][PETCOINS],
    };

    return exchangeRates;
};

const EXCHANGE_RATES = createExchangeRates();

export function convertCurrencies(from: string, to: string, amount: number): currencyAmount {
    return {
        amount: amount * EXCHANGE_RATES[from][to],
        currency: to,
    };
}
