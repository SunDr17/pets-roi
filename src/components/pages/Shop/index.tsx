import React from 'react';
import { useTranslation } from 'react-i18next';

import { getShopData } from '@/services/data/items';
import ItemsGrid from '@/components/common/ItemsGrid';

export default function Shop() {
  const { t } = useTranslation();
  const items = getShopData();

  return (
    <>
      <p className="lead">{t('shop')}</p>
      <ItemsGrid items={items[0].data} rowProps={{ xs: 2, sm: 3, md: 4, lg: 6 }} />
    </>
  );
}
