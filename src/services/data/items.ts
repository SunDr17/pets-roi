import { ErrorCodes } from '@/types/ApiClientType';
import { emptyInventory, Inventory, Item } from '@/types/ItemType';
import { add, getById, list } from '@/services/api/client';

// TODO: remove mock data

export const USER_BOUGHT_DATA = 'user_bought_data';

function normalizeItem(item: Item): Item {
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

export function getItemById(id: string) {
  return getById('shop-items', id).then((response) => normalizeItem(response.data?.data));
}

export function getBoughtData(): (Item)[] {
  const boughtData = localStorage.getItem(USER_BOUGHT_DATA);
  return boughtData ? JSON.parse(boughtData) : [];
}

export async function buyItem(item: Item) {
  const response = await add(`shop-items/${item._id}/buy`, item);

  if (response.error && response.response?.status === 401) {
    throw Error(ErrorCodes.UnAuthorized);
  }

  return response.data;
}
