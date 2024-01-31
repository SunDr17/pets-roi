import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ModalType } from '@/types/ModalType';
import { UserType } from '@/types/UserType';

type GlobalSliceState = {
  user: UserType | null;
  userCurrentBalance: number;
  userWorkingBalance: number;
  isUserChanged: boolean;
  modal: ModalType;
};

const initialState: GlobalSliceState = {
  user: null,
  userCurrentBalance: 0,
  userWorkingBalance: 0,
  isUserChanged: false,
  modal: {
    show: false,
  },
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<UserType | null>) {
      state.user = payload;
      state.userCurrentBalance = payload?.balance || 0;
      state.userWorkingBalance = payload?.workingBalance || 0;
    },
    setUserCurrentBalance(state, { payload }: PayloadAction<number>) {
      state.userCurrentBalance = payload;
    },
    setUserWorkingBalance(state, { payload }: PayloadAction<number>) {
      state.userWorkingBalance = payload;
    },
    hideModal(state) {
      state.modal = { show: false };
    },
    showModal(state, { payload }: PayloadAction<ModalType>) {
      Object.assign(state.modal, { ...payload, show: true });
    },
    toggleIsUserChanged(state, { payload }: PayloadAction<boolean>) {
      state.isUserChanged = payload;
    },
  },
});

export const {
  setUser,
  setUserCurrentBalance,
  setUserWorkingBalance,
  toggleIsUserChanged,
  hideModal,
  showModal,
} = globalSlice.actions;

export default globalSlice.reducer;
