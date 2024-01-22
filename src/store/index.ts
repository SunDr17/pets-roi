import { configureStore } from '@reduxjs/toolkit';

import globalReducer from './global-slice';

const store = configureStore({
  reducer: {
    global: globalReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
