import { useNavigate } from 'react-router-dom';

import { BoughtItemSaveFields, Item } from '@/types/ItemType';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setUser } from '@/store/global-slice';
import { selectUserCurrentBalance } from '@/store/selectors';
import { buyItem } from '@/services/data/items';
import { getCurrentUser } from '@/services/user';

export default function useBuyItem() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUserBalance = useAppSelector(selectUserCurrentBalance);

  return async (itemToBuy: BoughtItemSaveFields, item: Item) => {
    try {
      if (currentUserBalance >= item.price) {
        await buyItem(item._id, itemToBuy);

        const user = await getCurrentUser();
        if (user) {
          dispatch(setUser(user));
        }

        navigate('/');
      } else {
        throw Error('insufficient_balance');
      }
    } catch (error: any) {
      throw Error(error.message);
    }
  }
}
