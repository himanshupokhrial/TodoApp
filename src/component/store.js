import { combineReducers, configureStore } from '@reduxjs/toolkit';
import React from 'react'
import storage from 'redux-persist/lib/storage';
import TodoReducer from './TodoSlice';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';

const persistConfig = {
    key : 'Datas',
    storage
}

const rootReducer = combineReducers({
    data : TodoReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer : persistedReducer
}) 

export const persist = persistStore(store); 

export default store
