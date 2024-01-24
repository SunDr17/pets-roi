import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CURRENT_BALANCE_KEY } from '@/services/tokenomics';
import { ModalType } from '@/types/ModalType';

type GlobalSliceState = {
  userCurrentBalance: number;
  modal: ModalType,
};

const initialState: GlobalSliceState = {
  userCurrentBalance: Number(localStorage.getItem(CURRENT_BALANCE_KEY)) || 0,
  modal: {
    show: false,
  },
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setUserCurrentBalance(state, { payload }: PayloadAction<number>) {
      state.userCurrentBalance = payload;
    },
    addProfitToBalanceLocal(state, { payload }: PayloadAction<number>) {
      state.userCurrentBalance = state.userCurrentBalance + payload;
    },
    hideModal(state) {
      state.modal = { show: false };
    },
    showModal(state, { payload }: PayloadAction<ModalType>) {
      Object.assign(state.modal, { ...payload, show: true });
    },
  },
});

export const {
  setUserCurrentBalance,
  addProfitToBalanceLocal,
  hideModal,
  showModal,
} = globalSlice.actions;

export default globalSlice.reducer;
