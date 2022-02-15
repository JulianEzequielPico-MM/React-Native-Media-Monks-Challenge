import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExpoFileSystemStorage from 'redux-persist-expo-filesystem';
import rootReducer from "../03-reducer";
import { persistStore, persistReducer } from 'redux-persist'


const persistConfig = {
  //...
  key:"root",
  storage: ExpoFileSystemStorage
}
const persistedReducer = persistReducer(persistConfig, rootReducer)




let store = createStore(persistedReducer);
let persistor = persistStore(store);

export default () => {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor }
}

