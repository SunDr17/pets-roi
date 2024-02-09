import { useAccount } from 'wagmi';

import useSaveUserLocal from '@/hooks/useSaveUserLocal';
import useOnAccountChange from '@/hooks/web3/useOnAccountChange';
import useUpdateConfig from '@/hooks/useUpdateConfig';
import { getCurrentUser, setUserHashLocal } from '@/services/user';

export default function useOnAppLoad() {
  const saveUserLocal = useSaveUserLocal();
  const updateConfig = useUpdateConfig();
  const onAccountChange = useOnAccountChange();
  const { isConnected, address } = useAccount();

  return async () => {
    await updateConfig();

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
