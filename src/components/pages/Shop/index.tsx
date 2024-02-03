import React, { memo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { emptyInventory } from '@/types/ItemType';
import { getShopData } from '@/services/data/items';
import Spinner from '@/components/common/Spinner';
import ItemsGrid from '@/components/common/ItemsGrid';

function Shop() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([emptyInventory]);

  useEffect(() => {
    getShopData().then((items) => {
      setItems(items);
      setLoading(false);
    });
  }, []);

  return !loading ? (
    <Tabs
      defaultActiveKey={items[0].title}
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      {items.map((tabData) => (
        <Tab key={tabData.title} eventKey={tabData.title} title={t(`shop.tabs.${tabData.title}`)}>
          <ItemsGrid
            items={tabData.data.sort((it1, it2) => it1.price - it2.price)}
            rowProps={{ xs: 2, sm: 3, md: 4, lg: 6 }}
          />
        </Tab>
      ))}
    </Tabs>
  ) : <Spinner />;
}

export default memo(Shop);
