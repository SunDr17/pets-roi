import React from 'react';
import { useTranslation } from 'react-i18next';
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';

import { getData } from '@/services/data/getData';
import ItemsGrid from '@/components/common/ItemsGrid';

export default function Home() {
  const { t } = useTranslation();
  const boughtItems = getData();

  // TODO: remove mock data
  return (
    <Container>
      <Row>
        <Col sm="4">
          <div>{t('bought_amount')}: 1000000 PetCoins</div>
        </Col>
        <Col>
          <ItemsGrid items={boughtItems[0]} />
        </Col>
      </Row>
    </Container>
  );
}
