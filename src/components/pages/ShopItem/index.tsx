import React, { memo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Item } from '@/types/ItemType';
import { getItemById } from '@/services/data/items';
import Spinner from '@/components/common/Spinner';
import NotFound from '@/components/pages/NotFound';
import FullCard from '@/components/common/FullCard';

function ShopItem() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<Item>();

  useEffect(() => {
    getItemById(id!).then((item) => {
      setItem(item);
      setLoading(false);
    });
  }, [id]);

  return !loading
    ? (item ? <FullCard item={item} /> : <NotFound />)
    : <Spinner />;
}

export default memo(ShopItem);
