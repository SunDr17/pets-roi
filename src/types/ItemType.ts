export interface Inventory {
  title: string;
  data: (Item)[];
}

export interface Item {
  id: number;
  name: string;
  price: number;
  imageSrc: string;
  defaultColor: string;
  color?: string;
  gender?: string;
  fullName?: string;
}
