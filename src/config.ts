// TODO: move config to BE
const config = {
  percentsForBoughtBalance: {
    0: 2,
    60000: 2.1,
    70000: 2.2,
    80000: 2.3,
    90000: 2.4,
    100000: 2.5,
    110000: 2.6,
    120000: 2.7,
    130000: 2.8,
    140000: 2.9,
    150000: 3,
  } as { [index: string]: number },
  currencyInBNB: 1000000000,
  decimalPrecision: {
    primary_currency: 2,
    bnb: 8,
  } as { [index: string]: number },
  cycleDuration: 3 * 60 * 1000,
  socialLinks: {
    'twitter-x': 'https://twitter.com/',
    telegram: 'https://t.me/CrypTime_Channel',
    github: 'https://github.com',
    whitepaper: 'https://ethereum.org/en/whitepaper',
  } as { [index: string]: string },
};

export default config;
