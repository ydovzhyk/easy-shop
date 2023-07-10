import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import auth from 'redux/auth/auth-slice';
import productsSlice from 'redux/product/product-slice';
import otherUserSlice from './otherUser/otherUser.slice';
import verifyEmailSlice from './verifyEmail/verifyEmail-slice';
import dialogueSlice from './dialogue/dialogue-slice';

const persistConfig = {
  key: 'auth-sid',
  storage,
  whitelist: ['sid', 'accessToken', 'refreshToken'],
};

const persistedReducer = persistReducer(persistConfig, auth);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    products: productsSlice,
    otherUser: otherUserSlice,
    verifyEmail: verifyEmailSlice,
    dialogue: dialogueSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
