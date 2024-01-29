import { useEffect } from 'react';
import { useAccount } from 'wagmi';

import { setUserHashLocal } from '@/services/user';
import WalletOptions from './WalletOptions';
import Account from './Account';

export default function ConnectWallet() {
  const { isConnected, address } = useAccount();

  // TODO add register user api call
  useEffect(() => {
    setUserHashLocal(address);
  }, [isConnected, address]);

  if (isConnected){
    return <Account/>;
  }

  return <WalletOptions/>;
}
