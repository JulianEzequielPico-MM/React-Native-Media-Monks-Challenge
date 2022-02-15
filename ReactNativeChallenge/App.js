import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useLinkProps } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';
import PhotosAlbum from './components/PhotosAlbum';
import PhotoDetail from './components/PhotoDetail';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import stores from './Redux/01-store';
import AppLoading from 'expo-app-loading';
import useFonts from './hooks/useFonts';


const { store, persistor } = stores();

const Stack = createNativeStackNavigator();

export default function App() {
  const [IsReady, SetIsReady] = useState(false);

  const LoadFonts = async () => {
    await useFonts();
  }

  if (!IsReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => SetIsReady(true)}
        onError={() => { }}
      />
    );
  }
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} options={{title:"My Albums"}}/>
            <Stack.Screen name="PhotosAlbum"  component={PhotosAlbum} options={({ route }) => ({ title: route.params.name })} />
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
