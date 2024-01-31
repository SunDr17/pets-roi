import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '.';

const global = (state: RootState) => state.global;

export const selectConfig = createSelector(global, (state) => state.config);
export const selectUser = createSelector(global, (state) => state.user);
export const selectIsUserChanged = createSelector(global, (state) => state.isUserChangedToggler);
export const selectUserCurrentBalance = createSelector(
  global,
  (state) => Number(Number(state.userCurrentBalance).toFixed(2)),
);
export const selectUserWorkingBalance = createSelector(
  global,
  (state) => Number(Number(state.userWorkingBalance).toFixed(2)),
);
export const selectIsModalShown = createSelector(global, (state) => state.modal.show);
export const selectModal = createSelector(global, (state) => state.modal);
