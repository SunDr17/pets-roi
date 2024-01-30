import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';

import { Item } from '@/types/ItemType';
import { getBoughtData, normalizeItem } from '@/services/data/items';
import Spinner from '@/components/common/Spinner';
import ItemsGrid from '@/components/common/ItemsGrid';

export default function BoughtItemsGrid() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    // TODO: getBoughtData when changing user
    getBoughtData().then((items) => {
      const normalizedItems = items.map((it) => {
        return normalizeItem({
          ...it.shopItem,
          ...it,
        });
      });
      setItems(normalizedItems);
      setLoading(false);
    });
  }, []);

  return !loading ? (
    <ItemsGrid
      items={items}
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
  ) : <Spinner />;
}
