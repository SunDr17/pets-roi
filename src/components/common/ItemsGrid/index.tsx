import React from 'react';

import { Inventory } from '@/types/ItemType';
import MiniCard from '@/components/common/MiniCard/MiniCard';
import { Col, Row, RowProps } from 'react-bootstrap';

type Props = {
  items: Inventory;
  rowProps?: RowProps;
};

export default function ItemsGrid({ items, rowProps = { xs: 1, sm: 2, md: 3, lg: 4 } }: Props) {
  return (
    <Row xs={rowProps.xs} sm={rowProps.sm} md={rowProps.md} lg={rowProps.lg} className="g-4">
      {items.data.map((item, idx) => (
        <Col key={idx} className="d-flex align-items-stretch">
          <MiniCard key={`${item.name}-${item.id}`} item={item}/>
        </Col>
      ))}
    </Row>
  );
}
