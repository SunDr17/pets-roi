import { useAccount } from 'wagmi';

import { useAppDispatch } from '@/store/hooks';
import { setConfig } from '@/store/global-slice';
import useSaveUserLocal from '@/hooks/useSaveUserLocal';
import useOnAccountChange from '@/hooks/web3/useOnAccountChange';
import { getConfig } from '@/services/tokenomics';
import { getCurrentUser, setUserHashLocal } from '@/services/user';

export default function useOnAppLoad() {
  const dispatch = useAppDispatch();
  const saveUserLocal = useSaveUserLocal();
  const onAccountChange = useOnAccountChange();
  const { isConnected, address } = useAccount();

  return async () => {
    const config = await getConfig();
    dispatch(setConfig(config));

    onAccountChange();

    setUserHashLocal(address);

    if (isConnected) {
      const user = await getCurrentUser();

      if (user) {
        saveUserLocal(user);
      }
    }
  }
}
