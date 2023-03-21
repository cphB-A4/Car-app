import React from 'react';
import useThemeColors from './src/hooks/useThemeColors';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react';
import AuthenticationStackNavigator from './src/routes/AuthenticationStackNavigator';
import RootStackNavigator from './src/routes/RootStackNavigator';

const App = () => {
  const colors = useThemeColors();
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

    const renderContent = () => {
        const isLoggedIn = true;

        if (isLoggedIn) {
            return (
               <RootStackNavigator/>
            );
        }
        return <AuthenticationStackNavigator />;
    };

    return <NavigationContainer>{renderContent()}</NavigationContainer>;
};

export default App;
