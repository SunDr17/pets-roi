import React from 'react';
import { useTranslation } from 'react-i18next';
import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import { getBoughtData } from '@/services/data/items';
import ItemsGrid from '@/components/common/ItemsGrid';
import TokenomicInfo from '@/components/pages/Home/TokenomicInfo';

export default function Home() {
  const { t } = useTranslation();
  const boughtItems = getBoughtData();

  return (
    <Container fluid>
      <Row>
        <Col sm="4">
          <TokenomicInfo />
        </Col>
        <Col>
          <ItemsGrid
            items={boughtItems}
            emptyPlaceholder={(
              <div>
                <p>{t('homepage.grid.empty.header')}</p>
                <p>{t('homepage.grid.empty.body')}</p>
                <LinkContainer to="/shop">
                  <Button>{t('homepage.grid.empty.button')}</Button>
                </LinkContainer>
              </div>
            )}
          />
        </Col>
      </Row>
    </Container>
  );
}
