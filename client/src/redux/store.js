import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// Persist configuration
const persistConfig = {
    key: 'root', // Key for the persist
    storage, // Storage method (localStorage by default)
    version: 1, // Version of the persisted state
};

// Combine reducers
const rootReducer = combineReducers({ user: userReducer });

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
export const store = configureStore({
    reducer: persistedReducer,
});

// Create a persistor for the store
export const persistor = persistStore(store);

export default store;