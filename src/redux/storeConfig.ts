import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import createSagaMiddleware from '@redux-saga/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import coinReducer from './reducers/coins';
import productReducer from './reducers/products';
import myProductReducer from './reducers/myProducts';
import viewReducer from './reducers/view';
import productSaga from './saga/handler/productSaga';

const rootReducer = combineReducers({
  coin: coinReducer,
  product: productReducer,
  isFlatList: viewReducer,
  myProduct: myProductReducer,
});

const persistedReducer = persistReducer(
  {key: 'root', storage: AsyncStorage},
  rootReducer,
);

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(productSaga);
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
