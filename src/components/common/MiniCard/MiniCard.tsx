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

  function renderCard() {
    return (
      <Card bsPrefix={cn(styles['card-flyer'], 'text-center flex-fill card')}>
        <div className="image-box d-flex flex-grow-1 flex-column justify-content-center align-items-center">
          {isSvg(item.imageSrc)
            ? <FilledSvg
              src={item.imageSrc}
              color={'color' in item ? (item.color as string)! : item.defaultColor!}
              className="pt-2"
              width={100}
            />
            : <Card.Img
              bsPrefix="card-img-top pt-2"
              variant="top"
              src={item.imageSrc}
              width={100}
            />
          }
        </div>
        <Card.Body className="d-flex flex-grow-0 flex-column justify-content-end align-items-center">
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>
            {t('miniCard.price', { price: item.price })}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return 'shopItem' in item ? renderCard() : (
    <LinkContainer className={styles['cursor-pointer']} to={`/shop/item/${item._id}`}>
      {renderCard()}
    </LinkContainer>
  );
}
