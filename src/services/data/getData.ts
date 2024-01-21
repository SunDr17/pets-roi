import mockInventory from '@/mocks/mockInventory';
import { Item } from '@/types/ItemType';

export function getData() {
  return mockInventory;
}

export function getItemById(id: number) {
  return mockInventory.reduce((acc: (Item)[], subcategory) => {
    acc = acc.concat(subcategory.data);
    return acc;
  }, []).find((item) => item.id === id);
}
