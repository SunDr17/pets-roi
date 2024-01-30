import { useAppDispatch } from '@/store/hooks';
import { setUser } from '@/store/global-slice';
import { topUpUserBalance } from '@/services/user';

export default function useTopUpBalance() {
  const dispatch = useAppDispatch();

  return async function (sum: number) {
    const user = await topUpUserBalance(sum);

    if (user) {
      dispatch(setUser(user));
    }
  }
}
