import React from 'react';
import { useTranslation } from 'react-i18next';
import { LinkContainer } from 'react-router-bootstrap';
import Card from 'react-bootstrap/Card';
import cn from 'classnames';

import { Item } from '@/types/ItemType';

import styles from './MiniCard.module.css';

export default function MiniCard({ item }: { item: Item }) {
  const { t } = useTranslation();

  return (
    <LinkContainer to={`/shop/item/${item.id}/edit`}>
      <Card bsPrefix={cn(styles['card-flyer'], 'text-center flex-fill card')}>
        {item.imageSrc && (
          <div className="image-box pt-2">
            <Card.Img bsPrefix="card-img-top pt-2" variant="top" src={item.imageSrc} width={100} height={100} />
          </div>
        )}
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>
            {t('miniCard.price', { price: item.price })}
          </Card.Text>
        </Card.Body>
      </Card>
    </LinkContainer>
  );
}
