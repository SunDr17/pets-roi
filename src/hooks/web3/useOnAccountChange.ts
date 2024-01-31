import { watchAccount } from '@wagmi/core';

import { useAppDispatch } from '@/store/hooks';
import { setUser, toggleIsUserChanged } from '@/store/global-slice';
import { wagmiConfig } from '@/services/web3/wagmiConfig';
import { getUserHashLocal, registerUser, setUserHashLocal } from '@/services/user';

export default function useOnAccountChange() {
  const dispatch = useAppDispatch();

  return watchAccount(wagmiConfig, {
    onChange(data) {
      const currentUserHash = getUserHashLocal();
      setUserHashLocal(data.address);
      if (data.isConnected && data.address !== currentUserHash) {
        registerUser(data.address).then((user) => {
          if (user) {
            dispatch(setUser(user));
            dispatch(toggleIsUserChanged());
          }
        });
      }
    },
  });
}
