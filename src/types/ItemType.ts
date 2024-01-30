export const emptyInventory: Inventory = { title: '', data: [] };

export enum Genders {
  Male = 'male',
  Female = 'female',
}

export interface Inventory {
  title: string;
  data: (Item)[];
}

export interface Item {
  _id: string;
  name: string;
  price: number;
  imageSrc: string;
  type: string;
  defaultColor?: string;
}

export interface BoughtItem {
  _id: string;
  name: string;
  color?: string;
  gender?: Genders;
  shopItem: Item;
}

export type BoughtItemSaveFields = Pick<BoughtItem, 'name' | 'color' | 'gender'>
