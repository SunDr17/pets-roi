import React, { memo } from 'react';
import { useParams } from 'react-router-dom';

import { getItemById } from '@/services/data/getData';
import NotFound from '@/components/pages/NotFound';
import FullCard from '@/components/common/FullCard';

function ShopItem() {
  const { id } = useParams();
  const item = getItemById(Number(id));

  return item ? <FullCard item={item} /> : <NotFound />;
}

export default memo(ShopItem);