import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './reducers/globalReducer';

export const store = configureStore({
  reducer: {
    globalData: globalReducer,
  },
});

export default store;
