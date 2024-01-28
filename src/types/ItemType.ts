export const emptyInventory: Inventory = { title: '', data: [] };

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
  price: number;
  imageSrc: string;
  type: string;
  defaultColor?: string;
  color?: string;
  gender?: string;
  fullName?: string;
}
