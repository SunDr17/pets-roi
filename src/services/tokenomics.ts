// TODO: replace localStorage with BE DB
import config from '@/config';

// total bought coins
export const CURRENT_BALANCE_KEY = 'current_balance';
// sum of items cost which will add profit, will increase when buy item
export const WORKING_BALANCE_KEY = 'working_balance';

export function getCurrentBalance(key: string = CURRENT_BALANCE_KEY) {
  let balance = Number(localStorage.getItem(key));

  // TODO: temp solution, mock balance
  if (!balance && key === CURRENT_BALANCE_KEY) {
    balance = 100000;
    setCurrentBalance(balance, key);
  }

  return balance;
}

export function setCurrentBalance(balance: number, key: string = CURRENT_BALANCE_KEY) {
  localStorage.setItem(key, JSON.stringify(balance));
}

// work in both sides: if pass profit < 0 it will decrease balance
export function addProfitToBalance(profit: number, key: string = CURRENT_BALANCE_KEY) {
  setCurrentBalance(getCurrentBalance(key) + profit, key);
}

export function topUpBalance(amount: number, key: string = CURRENT_BALANCE_KEY) {
  setCurrentBalance(getCurrentBalance(key) + amount, key);
}

export function getCycleStartTime() {
  return Number(localStorage.getItem('cycleStartTime'));
}

export function setCycleStartTime(cycleStartTime: number | string | Date) {
  localStorage.setItem('cycleStartTime', JSON.stringify(cycleStartTime));
}

export function getCurrentProfitPercent() {
  const currentWorkingBalance = getCurrentBalance(WORKING_BALANCE_KEY);

  const boughtValues = Object.keys(config.percentsForBoughtBalance).map(key => Number(key));
  const minBoughtBalance = Math.min(...boughtValues);
  const maxBoughtBalance = Math.max(...boughtValues);

  if (currentWorkingBalance < minBoughtBalance) {
    return config.percentsForBoughtBalance[minBoughtBalance];
  }

  if (currentWorkingBalance >= maxBoughtBalance) {
    return config.percentsForBoughtBalance[maxBoughtBalance];
  }

  let result = null;
  let previousValue = null;

  for (const balance in config.percentsForBoughtBalance) {
    if (currentWorkingBalance < Number(balance)) {
      result = previousValue;
      break;
    }

    previousValue = config.percentsForBoughtBalance[balance];
  }

  return result || 0;
}

export function calculateCurrentProfit() {
  // TODO: fix bug: when current balance changes, current profit calculate according new value
  // but profit should be calculated with old balance all time it was,
  // and start calculate profit with new balance only from time when it was changed
  const timerAfterPrevCycleStarted = Date.now() - getCycleStartTime();
  const cycleTimer = timerAfterPrevCycleStarted < config.cycleDuration
    ? timerAfterPrevCycleStarted
    : config.cycleDuration;
  return cycleTimer * ((getCurrentBalance(WORKING_BALANCE_KEY) / 100 * getCurrentProfitPercent())
    / config.cycleDuration);
}
