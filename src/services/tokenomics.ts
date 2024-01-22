// TODO: replace localStorage with BE DB
import config from '@/config';

// total bought coins
export const CURRENT_BALANCE_KEY = 'current_balance';
// sum of items cost which will add profit, will increase when buy item
export const WORKING_BALANCE_KEY = 'working_balance';

export function getCurrentBalance(key: string = CURRENT_BALANCE_KEY) {
  let balance = Number(localStorage.getItem(key));

  // TODO: temp solution, mock balance
  if (!balance) {
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
  setCurrentBalance(getCurrentBalance(key) + profit);
}

export function getCycleStartTime() {
  let cycleStartTime = config.cycleDuration;
  const startTime = Number(localStorage.getItem('cycleStartTime'));

  // TODO: temp solution, setTimer in localStorage when buy item
  if (!startTime) {
    setCycleStartTime(new Date().getTime());
  } else {
    cycleStartTime = startTime;
  }

  return cycleStartTime;
}

export function setCycleStartTime(cycleStartTime: number | string | Date) {
  localStorage.setItem('cycleStartTime', JSON.stringify(cycleStartTime));
}

export function calculateCurrentProfit() {
  // TODO: fix bug: when current balance changes, current profit calculate according new value
  // but profit should be calculated with old balance all time it was,
  // and start calculate profit with new balance only from time when it was changed
  const timerAfterPrevCycleStarted = Date.now() - getCycleStartTime();
  const cycleTimer = timerAfterPrevCycleStarted < config.cycleDuration
    ? timerAfterPrevCycleStarted
    : config.cycleDuration;
  return cycleTimer * ((getCurrentBalance(WORKING_BALANCE_KEY) / 100 * config.basicProfitPercent)
    / config.cycleDuration);
}
