import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useLinkProps } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';
import PhotosAlbum from './components/PhotosAlbum';
import PhotoDetail from './components/PhotoDetail';
import AppLoading from 'expo-app-loading';
import useFonts from './hooks/useFonts';


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

          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: 'white'
              },
              headerShadowVisible: false,
              

            }}>
            <Stack.Screen name="Home" component={Home} options={{ title: "My Albums" }} />
            <Stack.Screen name="PhotosAlbum" component={PhotosAlbum} options={({ route }) => ({ title: route.params.name })} />
            <Stack.Screen name="PhotoDetail" component={PhotoDetail} />
          </Stack.Navigator>
   
    </NavigationContainer >
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'center',
  },
});
