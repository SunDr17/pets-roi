import { useAppSelector } from '@/store/hooks';
import { selectConfig, selectUserProfitData } from '@/store/selectors';

export default function useCalculateCurrentProfit() {
  const config = useAppSelector(selectConfig);
  const userProfit = useAppSelector(selectUserProfitData);

  return function () {
    if (!userProfit) return 0;

    const timeCurProfit = new Date().getTime() - userProfit.boughtDate;
    const timeAvailableProfit = config.cycleDuration - (userProfit.boughtDate - userProfit.cycleStartDate);
    const timerBetweenProfitUpdates = Math.min(timeCurProfit, timeAvailableProfit);

    return userProfit.sum + timerBetweenProfitUpdates * (
      (userProfit.workingBalance / 100 * config.currentProfitPercent) / config.cycleDuration
    );
  }
}
