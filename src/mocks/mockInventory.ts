import { Inventory } from '@/types/ItemType';

export default [
  {
    title: 'dogs',
    data: [
      {
        id: 1,
        name: 'French Bulldog',
        price: 10000,
        imageSrc: process.env.PUBLIC_URL + '/images/dog-1.svg',
      },
      {
        id: 2,
        name: 'German Shepherd',
        price: 12000,
        imageSrc: process.env.PUBLIC_URL + '/images/dog-2.svg',
      },
      {
        id: 3,
        name: 'Shiba Inu',
        price: 15000,
        imageSrc: process.env.PUBLIC_URL + '/images/dog-3.svg',
      },
      {
        id: 4,
        name: 'Pharaoh Hound',
        price: 17000,
        imageSrc: process.env.PUBLIC_URL + '/images/dog-4.svg',
      },
      {
        id: 5,
        name: 'Bull Terrier',
        price: 20000,
        imageSrc: process.env.PUBLIC_URL + '/images/dog-5.svg',
      },
      {
        id: 6,
        name: 'Jack Russel Terrier',
        price: 25000,
        imageSrc: process.env.PUBLIC_URL + '/images/dog-6.svg',
      },
      {
        id: 7,
        name: 'Dalmatian',
        price: 27000,
        imageSrc: process.env.PUBLIC_URL + '/images/dog-7.svg',
      },
      {
        id: 8,
        name: 'Hasky',
        price: 30000,
        imageSrc: process.env.PUBLIC_URL + '/images/dog-8.svg',
      },
      {
        id: 9,
        name: 'Border Collie',
        price: 33000,
        imageSrc: process.env.PUBLIC_URL + '/images/dog-9.svg',
      },
      {
        id: 10,
        name: 'Cane Corso',
        price: 35000,
        imageSrc: process.env.PUBLIC_URL + '/images/dog-10.svg',
      },
    ],
  },
  {
    title: 'cats',
    data: [
      {
        id: 11,
        name: 'Semen',
        price: 10000,
        imageSrc: process.env.PUBLIC_URL + '/images/cat.jpg',
      },
      {
        id: 12,
        name: 'Marcus',
        price: 12000,
        imageSrc: process.env.PUBLIC_URL + '/images/cat.jpg',
      },
      {
        id: 13,
        name: 'Kurwa',
        price: 15000,
        imageSrc: process.env.PUBLIC_URL + '/images/cat.jpg',
      },
      {
        id: 14,
        name: 'John',
        price: 18000,
        imageSrc: process.env.PUBLIC_URL + '/images/cat.jpg',
      },
      {
        id: 15,
        name: 'Jimmy',
        price: 20000,
        imageSrc: process.env.PUBLIC_URL + '/images/cat.jpg',
      },
      {
        id: 16,
        name: 'Jillian',
        price: 25000,
        imageSrc: process.env.PUBLIC_URL + '/images/cat.jpg',
      },
    ],
  },
] as Inventory[];
