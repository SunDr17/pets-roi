import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ModalType } from '@/types/ModalType';
import { UserType } from '@/types/UserType';
import { ConfigType } from '@/types/ConfigType';
import { UserProfitType } from '@/types/UserProfitType';

type GlobalSliceState = {
  config: ConfigType;
  user: UserType | null;
  userProfitData: UserProfitType | null;
  userCurrentBalance: number;
  userWorkingBalance: number;
  isUserChangedToggler: boolean;
  modal: ModalType;
};

const initialState: GlobalSliceState = {
  config: {
    percentsForBoughtBalance: { '0': 0 },
    currencyInBNB: 0,
    cycleDuration: 0,
    currentProfitPercent: 0,
  },
  user: null,
  userProfitData: {
    cycleStartDate: 0,
    boughtDate: 0,
    sum: 0,
    workingBalance: 0,
  },
  userCurrentBalance: 0,
  userWorkingBalance: 0,
  isUserChangedToggler: false,
  modal: {
    show: false,
  },
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setConfig(state, { payload }: PayloadAction<ConfigType | null>) {
      if (payload) {
        state.config = payload;
      }
    },
    setUser(state, { payload }: PayloadAction<UserType | null>) {
      state.user = payload;
      state.userCurrentBalance = payload?.balance || 0;
      state.userWorkingBalance = payload?.workingBalance || 0;
    },
    setUserProfitData(state, { payload }: PayloadAction<UserProfitType>) {
      state.userProfitData = payload;
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
    toggleIsUserChanged(state) {
      state.isUserChangedToggler = !state.isUserChangedToggler;
    },
  },
});

export const {
  setConfig,
  setUser,
  setUserProfitData,
  setUserCurrentBalance,
  setUserWorkingBalance,
  toggleIsUserChanged,
  hideModal,
  showModal,
} = globalSlice.actions;

export default globalSlice.reducer;
