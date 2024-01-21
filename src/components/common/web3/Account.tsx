import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount, useDisconnect, useEnsName } from 'wagmi';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Account() {
  const { t } = useTranslation();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });

  const concatAddress = address ? `${address.slice(0, 4)}...${address.slice(-4)}` : '';

  return (
    <NavDropdown title={ensName ? `${ensName} (${concatAddress})` : concatAddress} id="basic-nav-dropdown">
      <NavDropdown.Item key="wallet-address" onClick={() => disconnect()}>
        {t('wallet.disconnect')}
      </NavDropdown.Item>
    </NavDropdown>
  );
}
