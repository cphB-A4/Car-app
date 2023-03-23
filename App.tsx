import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react';
import AuthenticationStackNavigator from './src/routes/AuthenticationStackNavigator';
import RootStackNavigator from './src/routes/RootStackNavigator';
import { supabase } from './src/api/InitSupabse';
import { Session } from '@supabase/supabase-js';

const App = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [fontsLoaded] = useFonts({
    'Inter-Black': require('./assets/fonts/Inter-Black.otf'),
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, []);

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
        const isLoggedIn = session && session.user;

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
