import { createStore, combineReducers } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import AsyncStorage from '@react-native-async-storage/async-storage';
import albumsReducer from "../03-reducer";
import { persistStore, persistReducer } from 'redux-persist'
import hardSet from "redux-persist/es/stateReconciler/hardSet";



const persistConfig = {
  key: "root",
  storage: AsyncStorage,

}

const rootReducer = combineReducers({ albumsReducer: persistReducer(persistConfig, albumsReducer) });

export const store = createStore(rootReducer, devToolsEnhancer())
export const persistor = persistStore(store)


