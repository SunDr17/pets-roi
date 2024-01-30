import { useAccount } from 'wagmi';

import { getCurrentUser, setUserHashLocal } from '@/services/user';
import useSaveUserLocal from '@/hooks/useSaveUserLocal';

export default function useOnAppLoad() {
  const saveUserLocal = useSaveUserLocal();
  const { isConnected, address } = useAccount();

  return async () => {
    setUserHashLocal(address);

    if (isConnected) {
      const user = await getCurrentUser();

      if (user) {
        saveUserLocal(user);
      }
    }
  }
}
