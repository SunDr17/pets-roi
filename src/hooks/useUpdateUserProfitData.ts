import { useAppDispatch } from '@/store/hooks';
import { setUserProfitData } from '@/store/global-slice';
import { getUserProfit } from '@/services/tokenomics';

export default function useUpdateUserProfitData() {
  const dispatch = useAppDispatch();

  return async function () {
    const userProfitData = await getUserProfit();
    dispatch(setUserProfitData(userProfitData));
  }
}
