import { useNavigate } from 'react-router-dom';

import { Item } from '@/types/ItemType';
import { buyItem } from '@/services/data/items';
import { useAppDispatch } from '@/store/hooks';
import { addProfitToBalance, getCurrentBalance, WORKING_BALANCE_KEY } from '@/services/tokenomics';
import { addProfitToBalanceLocal } from '@/store/global-slice';

export default function useBuyItem() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (itemToBuy: Item) => {
    const currentUserBalance = getCurrentBalance();

    if (currentUserBalance >= itemToBuy.price) {
      buyItem(itemToBuy);
      // revoke price from user balance
      addProfitToBalance(-itemToBuy.price);
      dispatch(addProfitToBalanceLocal(-itemToBuy.price));
      // add price to user working balance
      addProfitToBalance(itemToBuy.price, WORKING_BALANCE_KEY);
      navigate('/');
    } else {
      throw Error('insufficient_balance');
    }
  }
}
