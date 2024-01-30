import config from '@/config';
import { useAppSelector } from '@/store/hooks';
import { selectUserWorkingBalance } from '@/store/selectors';

export default function useGetCurrentProfitPercent() {
  const currentWorkingBalance = useAppSelector(selectUserWorkingBalance);

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
