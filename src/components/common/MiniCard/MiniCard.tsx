import React from 'react';
import { useTranslation } from 'react-i18next';
import { LinkContainer } from 'react-router-bootstrap';
import Card from 'react-bootstrap/Card';
import cn from 'classnames';

import { Item } from '@/types/ItemType';
import { isSvg } from '@/utils/image';
import FilledSvg from '@/components/common/FilledSvg';

import styles from './MiniCard.module.css';

export default function MiniCard({ item }: { item: Item }) {
  const { t } = useTranslation();

  return (
    <LinkContainer to={`/shop/item/${item.id}/edit`}>
      <Card bsPrefix={cn(styles['card-flyer'], 'text-center flex-fill card')}>
        <div className="image-box pt-2">
          {isSvg(item.imageSrc)
            ? <FilledSvg
              src={item.imageSrc}
              color={item.color || item.defaultColor}
              height={100}
              width={100}
            />
            : <Card.Img
              bsPrefix="card-img-top pt-2"
              variant="top"
              src={item.imageSrc}
              width={100}
              height={100}
            />
          }
        </div>
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
