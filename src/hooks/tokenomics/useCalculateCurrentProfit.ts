import config from '@/config';
import { selectUserWorkingBalance } from '@/store/selectors';
import { useAppSelector } from '@/store/hooks';
import useGetCurrentProfitPercent from '@/hooks/tokenomics/useGetCurrentProfitPercent';
import { getCycleStartTime } from '@/services/tokenomics';

export default function useCalculateCurrentProfit() {
  // TODO: fix bug: when current balance changes, current profit calculate according new value
  // but profit should be calculated with old balance all time it was,
  // and start calculate profit with new balance only from time when it was changed
  const workingBalance = useAppSelector(selectUserWorkingBalance);
  const currentProfitPercent = useGetCurrentProfitPercent();

  return function () {
    const timerAfterPrevCycleStarted = Date.now() - getCycleStartTime(); // TODO: get getCycleStartTime from BE
    const cycleTimer = timerAfterPrevCycleStarted < config.cycleDuration
      ? timerAfterPrevCycleStarted
      : config.cycleDuration;

    return cycleTimer * ((workingBalance / 100 * currentProfitPercent) / config.cycleDuration);
  }
}
