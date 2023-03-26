import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react';
import AuthenticationStackNavigator from './src/routes/AuthenticationStackNavigator';
import { UserContextProvider } from './src/contexts/UserContext';
import { StatusBar } from 'expo-status-bar';
import useColorScheme from './src/hooks/useColorScheme';
import { store } from './src/store/store'
import { Provider } from 'react-redux'

const App = () => {
  const mode = useColorScheme();
  
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
      <Provider store={store}>
      <UserContextProvider>
        <NavigationContainer>
          <AuthenticationStackNavigator />
          <StatusBar style={mode === 'light' ? 'dark' : 'light'}/>
      </NavigationContainer>
    </UserContextProvider>
    </Provider>
    );
};

export default App;
