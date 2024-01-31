import { useAccount } from 'wagmi';

import { getCurrentUser, setUserHashLocal } from '@/services/user';
import useSaveUserLocal from '@/hooks/useSaveUserLocal';
import useOnAccountChange from '@/hooks/web3/useOnAccountChange';

// TODO: check all twice calls (rerenders)
export default function useOnAppLoad() {
  const saveUserLocal = useSaveUserLocal();
  const onAccountChange = useOnAccountChange();
  const { isConnected, address } = useAccount();

  return async () => {
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
