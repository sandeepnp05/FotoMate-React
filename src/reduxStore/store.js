import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; 
import userReducer from './slices/userSlice'
import adminReducer from './slices/adminSlice'
import vendorReducer from './slices/vendorSlice'

import { persistReducer, persistStore,FLUSH,

  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};
const reducer = combineReducers({
    userReducer,
    adminReducer,
    vendorReducer,
})
const persistedReducer = persistReducer(persistConfig, reducer);

// export const store = configureStore({
//   reducer: persistedReducer,

// });
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})


export const persistor = persistStore(store);
