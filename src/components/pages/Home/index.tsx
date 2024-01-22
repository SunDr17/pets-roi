import React from 'react';
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';

import { getData } from '@/services/data/getData';
import ItemsGrid from '@/components/common/ItemsGrid';
import TokenomicInfo from '@/components/pages/Home/TokenomicInfo';

export default function Home() {
  const boughtItems = getData();

  // TODO: remove mock data
  return (
    <Container>
      <Row>
        <Col sm="4">
          <TokenomicInfo />
        </Col>
        <Col>
          <ItemsGrid items={boughtItems[0]} />
        </Col>
      </Row>
    </Container>
  );
}
