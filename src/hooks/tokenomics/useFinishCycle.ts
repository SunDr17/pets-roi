import { useAppDispatch } from '@/store/hooks';
import { setUser } from '@/store/global-slice';
import { finishCycle } from '@/services/tokenomics';

export default function useFinishCycle() {
  const dispatch = useAppDispatch();

  return async function (profit: number) {
    const user = await finishCycle(profit);

    if (user) {
      dispatch(setUser(user));
    }
  }
}