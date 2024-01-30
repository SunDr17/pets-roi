import React from 'react';
import { useTranslation } from 'react-i18next';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAccount, useDisconnect, useEnsName } from 'wagmi';

import { setUser } from '@/store/global-slice';
import { useAppDispatch } from '@/store/hooks';

export default function Account() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });

  const concatAddress = address ? `${address.slice(0, 4)}...${address.slice(-4)}` : '';

  const onDisconnect = () => {
    disconnect();
    dispatch(setUser(null));
  };

  return (
    <NavDropdown title={ensName ? `${ensName} (${concatAddress})` : concatAddress} id="basic-nav-dropdown">
      <NavDropdown.Item key="wallet-address" onClick={onDisconnect}>
        {t('wallet.disconnect')}
      </NavDropdown.Item>
    </NavDropdown>
  );
}
