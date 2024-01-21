import React from 'react';
import { useTranslation } from 'react-i18next';
import { useConnect } from 'wagmi';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function WalletOptions() {
  const { t } = useTranslation();
  const { connectors, connect } = useConnect();

  return (
    <NavDropdown title={t('wallet.connect')} id="basic-nav-dropdown">
      {connectors.map((connector) => connector.id !== 'metaMaskSDK' && (
        <NavDropdown.Item key={connector.uid} onClick={() => connect({ connector })}>
          {connector.name}
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  );
}
