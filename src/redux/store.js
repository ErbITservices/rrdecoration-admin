import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userRedux'
import Products from "./Products";
import UseersComponentRedux from "./UseersComponentRedux";
import MessageRedux from "./MessageRedux";
import AnnoucmentRedux from "./AnnoucmentRedux";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'

  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }
  
  const persistedReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
    reducer:{
        user: persistedReducer,
        users: UseersComponentRedux,
        Products : Products,
        error : MessageRedux,
        announcements : AnnoucmentRedux
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export let persistor = persistStore(store)