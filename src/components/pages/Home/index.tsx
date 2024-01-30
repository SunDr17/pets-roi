import React from 'react';
import { useTranslation } from 'react-i18next';
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';
import { useAccount } from 'wagmi';

import TokenomicInfo from './TokenomicInfo';
import BoughtItemsGrid from './BoughtItemsGrid';

export default function Home() {
  const { t } = useTranslation();
  const { isConnected: isWalletConnected } = useAccount();

  return (
    <Container fluid>
      <Row>
        {isWalletConnected ? (
          <>
            <Col sm="4">
              <TokenomicInfo />
            </Col>
            <Col>
              <BoughtItemsGrid />
            </Col>
          </>
        ) : <p className="display-8">{t('homepage.wallet_not_connected')}</p>}
      </Row>
    </Container>
  );
}
