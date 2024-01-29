import { useEffect } from 'react';
import { useAccount } from 'wagmi';

import { getUserHashLocal, registerUser, setUserHashLocal } from '@/services/user';
import WalletOptions from './WalletOptions';
import Account from './Account';

export default function ConnectWallet() {
  const { isConnected, address } = useAccount();

  useEffect(() => {
    const currentUserHash = getUserHashLocal();
    setUserHashLocal(address);
    if (isConnected && address !== currentUserHash) {
      registerUser(address).then((user) => {
        // TODO: save in redux balances from user
      });
    }
  }, [isConnected, address]);

  if (isConnected){
    return <Account/>;
  }

  return <WalletOptions/>;
}
