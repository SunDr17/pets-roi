import { useAppDispatch } from '@/store/hooks';
import { setConfig } from '@/store/global-slice';
import { getConfig } from '@/services/tokenomics';

export default function useUpdateConfig() {
  const dispatch = useAppDispatch();

  return async function () {
    const config = await getConfig();
    dispatch(setConfig(config));
  }
}
