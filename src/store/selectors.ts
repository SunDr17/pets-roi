import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '.';

const global = (state: RootState) => state.global;

export const selectUserCurrentBalance = createSelector(
  global,
  (state) => Number(Number(state.userCurrentBalance).toFixed(2)),
);
export const selectIsModalShown = createSelector(global, (state) => state.modal.show);
export const selectModal = createSelector(global, (state) => state.modal);