import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useAccount } from 'wagmi';

import { getBoughtData } from '@/services/data/items';
import ItemsGrid from '@/components/common/ItemsGrid';
import TokenomicInfo from '@/components/pages/Home/TokenomicInfo';

export default function Home() {
  const { t } = useTranslation();
  const { isConnected: isWalletConnected } = useAccount();
  const boughtItems = getBoughtData();

  return (
    <Container fluid>
      <Row>
        {isWalletConnected ? (
          <>
            <Col sm="4">
              <TokenomicInfo />
            </Col>
            <Col>
              <ItemsGrid
                items={boughtItems}
                emptyPlaceholder={(
                  <div>
                    <p>{t('homepage.grid.empty.header')}</p>
                    <p>
                      <Trans
                        i18nKey="homepage.grid.empty.body"
                        components={{
                          tokenomicLink: <Link to="tokenomics" />,
                        }}
                      />
                    </p>
                    <LinkContainer to="/shop">
                      <Button>{t('homepage.grid.empty.button')}</Button>
                    </LinkContainer>
                  </div>
                )}
              />
            </Col>
          </>
        ) : <p className="display-8">{t('homepage.wallet_not_connected')}</p>}
      </Row>
    </Container>
  );
}
