import { useAppDispatch } from '@/store/hooks';
import { setUser } from '@/store/global-slice';
import { finishCycle } from '@/services/tokenomics';
import useUpdateConfig from '@/hooks/useUpdateConfig';
import useUpdateUserProfitData from '@/hooks/useUpdateUserProfitData';

export default function useFinishCycle() {
  const dispatch = useAppDispatch();
  const updateConfig = useUpdateConfig();
  const updateUserProfit = useUpdateUserProfitData();

  return async function () {
    const user = await finishCycle();

    if (user) {
      await updateConfig();

      dispatch(setUser(user));

      await updateUserProfit();
    }
  }
}