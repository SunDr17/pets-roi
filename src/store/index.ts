import { configureStore } from '@reduxjs/toolkit';

import globalReducer from './global-slice';

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types
      ignoredActions: ['global/showModal'],
      // Ignore these paths in the state
      ignoredPaths: [
        'global.modal.onConfirm',
        'global.modal.body.$$typeof',
        'global.modal.body.type',
      ],
    },
  }),
  reducer: {
    global: globalReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
