import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from './reducers/authenticationReducer';
export const reduxStore = configureStore({
  reducer: {
    authentication: authenticationReducer,
  },
});

export type RootState = ReturnType<typeof reduxStore.getState>;

export type AppDispatch = typeof reduxStore.dispatch;
