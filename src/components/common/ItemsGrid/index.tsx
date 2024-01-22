import React from 'react';
import { useTranslation } from 'react-i18next';

import { Item } from '@/types/ItemType';
import MiniCard from '@/components/common/MiniCard/MiniCard';
import { Col, Row, RowProps } from 'react-bootstrap';

type Props = {
  items: Item[];
  rowProps?: RowProps;
  emptyPlaceholder?: React.ReactNode;
};

export default function ItemsGrid({
  items,
  rowProps = { xs: 1, sm: 2, md: 3, lg: 4 },
  emptyPlaceholder = '',
}: Props) {
  const { t } = useTranslation();

  return items.length ? (
    <Row xs={rowProps.xs} sm={rowProps.sm} md={rowProps.md} lg={rowProps.lg} className="g-4">
      {items.map((item, idx) => (
        <Col key={idx} className="d-flex align-items-stretch">
          <MiniCard key={`${item.name}-${item.id}`} item={item}/>
        </Col>
      ))}
    </Row>
  ) : emptyPlaceholder
    ? emptyPlaceholder
    : <div>{t('grid.empty')}</div>
}
