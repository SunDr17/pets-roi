import { useEffect } from 'react';
import { useAccount } from 'wagmi';

import { useAppDispatch } from '@/store/hooks';
import { setUser } from '@/store/global-slice';
import { getUserHashLocal, registerUser, setUserHashLocal } from '@/services/user';
import WalletOptions from './WalletOptions';
import Account from './Account';

export default function ConnectWallet() {
  const { isConnected, address } = useAccount();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const currentUserHash = getUserHashLocal();
    setUserHashLocal(address);
    if (isConnected && address !== currentUserHash) {
      registerUser(address).then((user) => {
        if (user) {
          dispatch(setUser(user));
        }
      });
    }
  }, [isConnected, address]);

  if (isConnected){
    return <Account/>;
  }

  return <WalletOptions/>;
}
