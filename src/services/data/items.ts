import { ErrorCodes } from '@/types/ApiClientType';
import {
  BoughtItem,
  BoughtItemSaveFields,
  emptyInventory,
  Inventory,
  Item,
} from '@/types/ItemType';
import { update, getById, list } from '@/services/api/client';

export function normalizeItem(item: Item): Item {
  return {
    ...item,
    imageSrc: `${process.env.PUBLIC_URL}/images/${item.imageSrc}`,
  }
}

export async function getShopData(): Promise<Inventory[]> {
  const response = await list('shop-items');
  if (response.data) {
    const items: Item[] = response.data.data;
    const itemsAggregatedByTypes: { [key: string]: Inventory } = items.reduce((acc, item) => {
      const normalizedItem = normalizeItem(item);

      if (!(normalizedItem.type in acc)) {
        // @ts-ignore
        acc[normalizedItem.type] = { title: normalizedItem.type, data: [normalizedItem] };
      } else {
        // @ts-ignore
        acc[normalizedItem.type].data.push(normalizedItem);
      }

      return acc;
    }, {});

    return Object.values(itemsAggregatedByTypes);
  }

  return [emptyInventory];
}

export async function getItemById(id: string) {
  const response = await getById('shop-items', id);
  return normalizeItem(response.data?.data);
}

export async function getBoughtData(): Promise<BoughtItem[]> {
  const response = await list('bought-items');

  if (response.error) return [];

  return response.data?.data;
}

export async function buyItem(id: string, item: BoughtItemSaveFields) {
  const response = await update(`shop-items/${id}/buy`, item);

  if (response.error) {
    if (response.response?.status === 401) {
      throw Error(ErrorCodes.UnAuthorized);
    } else {
      throw Error(response.response?.data?.error?.message);
    }
  }

  return response.data;
}
