import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import useThemeColors from '../hooks/useThemeColors';
import { globalStyle, outerContainer } from '../themes/shared';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CameraScreen from '../screens/CameraScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { RootStackStackParams } from './types';

const RootStackNavigator = () => {
  const colors = useThemeColors();
  const Stack = createBottomTabNavigator<RootStackStackParams>();
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
};

export default RootStackNavigator;
