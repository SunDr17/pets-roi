import React from 'react';
import { useTranslation } from 'react-i18next';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { getShopData } from '@/services/data/items';
import ItemsGrid from '@/components/common/ItemsGrid';

export default function Shop() {
  const { t } = useTranslation();
  const items = getShopData();

  return (
    <Tabs
      defaultActiveKey={items[0].title}
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      {items.map((tabData) => (
        <Tab key={tabData.title} eventKey={tabData.title} title={t(`shop.tabs.${tabData.title}`)}>
          <ItemsGrid items={tabData.data} rowProps={{ xs: 2, sm: 3, md: 4, lg: 6 }} />
        </Tab>
      ))}
    </Tabs>
  );
}
