import mockInventory from '@/mocks/mockInventory';
import { Item } from '@/types/ItemType';

// TODO: remove mock data

export const USER_BOUGHT_DATA = 'user_bought_data';

export function getShopData() {
  return mockInventory;
}

export function getItemById(id: number) {
  return mockInventory.reduce((acc: (Item)[], subcategory) => {
    acc = acc.concat(subcategory.data);
    return acc;
  }, []).find((item) => item.id === id);
}

export function getBoughtData(): (Item)[] {
  const boughtData = localStorage.getItem(USER_BOUGHT_DATA);
  return boughtData ? JSON.parse(boughtData) : [];
}

export function buyItem(item: Item) {
  const boughtData = getBoughtData();
  boughtData.push(item);
  localStorage.setItem(USER_BOUGHT_DATA, JSON.stringify(boughtData));
}
