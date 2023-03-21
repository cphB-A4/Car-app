import React from 'react';
import { View, Text, ViewStyle, TextStyle, StyleSheet } from 'react-native';

import useThemeColors from './src/hooks/useThemeColors';
import HomeScreen from './src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import ProfileScreen from './src/screens/ProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CameraScreen from './src/screens/CameraScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { globalStyle } from './src/themes/shared';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react';
import { colors } from './src/themes/colors';

export type StackParams = {
    AuthStack: undefined;
    Home: undefined;
    Profile: undefined;
    Camera: undefined;
    Settings: undefined;
};

const Stack = createBottomTabNavigator<StackParams>();

export type AuthStackParams = {
    Login: undefined;
    SignUp: undefined;
};

const AuthStack = createStackNavigator();

const AuthScreenStack = () => {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name="Login" component={LoginScreen} />
            <AuthStack.Screen name="SignUp" component={SignUpScreen} />
        </AuthStack.Navigator>
    );
};

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
                <Stack.Navigator
                    initialRouteName={'Home'}
                    screenOptions={{
                        tabBarActiveTintColor: globalStyle.primary.color,
                        headerShown: false,
                        tabBarInactiveBackgroundColor: colors.background,
                        tabBarActiveBackgroundColor: colors.background
                    }}
                >
                    <Stack.Screen
                        options={{
                            tabBarLabel: 'Home',
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )
                        }}
                        name="Home"
                        component={HomeScreen}
                    />
                    <Stack.Screen
                        name="Profile"
                        component={ProfileScreen}
                        options={{
                            tabBarLabel: 'Profile',
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons
                                    name="car-outline"
                                    color={color}
                                    size={size}
                                />
                            )
                        }}
                    />
                    <Stack.Screen
                        name="Camera"
                        component={CameraScreen}
                        options={{
                            tabBarLabel: 'Camera',
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons
                                    name="camera-outline"
                                    color={color}
                                    size={size}
                                />
                            )
                        }}
                    />
                    <Stack.Screen
                        name="Settings"
                        component={SettingsScreen}
                        options={{
                            tabBarLabel: 'Settings',
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons
                                    name="cog-outline"
                                    color={color}
                                    size={size}
                                />
                            )
                        }}
                    />
                </Stack.Navigator>
            );
        }
        return <AuthScreenStack />;
    };

    return <NavigationContainer>{renderContent()}</NavigationContainer>;
};

export default App;
