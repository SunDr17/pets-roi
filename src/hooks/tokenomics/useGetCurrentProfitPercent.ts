import { useAppSelector } from '@/store/hooks';
import { selectConfig, selectUserWorkingBalance } from '@/store/selectors';

export default function useGetCurrentProfitPercent() {
  const percentsForBoughtBalance = useAppSelector(selectConfig).percentsForBoughtBalance;
  const currentWorkingBalance = useAppSelector(selectUserWorkingBalance);

  const boughtValues = Object.keys(percentsForBoughtBalance).map(key => Number(key));
  const minBoughtBalance = Math.min(...boughtValues);
  const maxBoughtBalance = Math.max(...boughtValues);

  if (currentWorkingBalance < minBoughtBalance) {
    return percentsForBoughtBalance[minBoughtBalance];
  }

  if (currentWorkingBalance >= maxBoughtBalance) {
    return percentsForBoughtBalance[maxBoughtBalance];
  }

  let result = null;
  let previousValue = null;

  for (const balance in percentsForBoughtBalance) {
    if (currentWorkingBalance < Number(balance)) {
      result = previousValue;
      break;
    }

    previousValue = percentsForBoughtBalance[balance];
  }

  return result || 0;
}
