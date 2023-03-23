import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react';
import AuthenticationStackNavigator from './src/routes/AuthenticationStackNavigator';
import { UserContextProvider } from './src/contexts/UserContext';

const App = () => {
  const [fontsLoaded] = useFonts({
    'Inter-Black': require('./assets/fonts/Inter-Black.otf'),
  });


  useEffect(()=> {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  },[])
  
if(!fontsLoaded){
  return undefined;
} else {
  SplashScreen.hideAsync();
}

    return (
      <UserContextProvider>
        <NavigationContainer>
          <AuthenticationStackNavigator />
      </NavigationContainer>
    </UserContextProvider>
    );
};

export default App;
