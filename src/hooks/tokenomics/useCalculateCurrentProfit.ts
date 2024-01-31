import config from '@/config';
import { selectUser, selectUserWorkingBalance } from '@/store/selectors';
import { useAppSelector } from '@/store/hooks';
import useGetCurrentProfitPercent from '@/hooks/tokenomics/useGetCurrentProfitPercent';

export default function useCalculateCurrentProfit() {
  // TODO: move profit calculation to BE
  // TODO: fix bug: when current balance changes, current profit calculate according new value
  // but profit should be calculated with old balance all time it was,
  // and start calculate profit with new balance only from time when it was changed
  const currentUser = useAppSelector(selectUser)!;
  const cycleStartTime = currentUser.cycleStartTime
    ? new Date(currentUser.cycleStartTime).getTime()
    : 0;
  const workingBalance = useAppSelector(selectUserWorkingBalance);
  const currentProfitPercent = useGetCurrentProfitPercent();

  return function () {
    const timerAfterPrevCycleStarted = Date.now() - cycleStartTime;
    const cycleTimer = timerAfterPrevCycleStarted < config.cycleDuration
      ? timerAfterPrevCycleStarted
      : config.cycleDuration;

    return cycleTimer * ((workingBalance / 100 * currentProfitPercent) / config.cycleDuration);
  }
}
