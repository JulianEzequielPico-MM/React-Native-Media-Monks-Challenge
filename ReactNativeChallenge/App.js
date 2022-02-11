import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';
import PhotosAlbum from './components/PhotosAlbum';
import PhotoDetail from './components/PhotoDetail';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import stores from './Redux/01-store';

const { store, persistor } = stores();


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="PhotosAlbum" component={PhotosAlbum} />
            <Stack.Screen name="PhotoDetail" component={PhotoDetail} />
          </Stack.Navigator>
        </PersistGate>
      </Provider>
    </NavigationContainer >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
