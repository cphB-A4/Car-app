import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import useThemeColors from '../hooks/useThemeColors';
import { globalStyle, outerContainer } from '../themes/shared';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UploadCarScreen from '../screens/UploadCarScreen';
import CameraScreen from '../screens/CameraScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { CameraStackParams, RootStackStackParams } from './types';
import { createStackNavigator } from '@react-navigation/stack';

const RootStackNavigator = () => {
    const colors = useThemeColors();
    const Tab = createBottomTabNavigator<RootStackStackParams>();
    const CameraStack = createStackNavigator<CameraStackParams>();

    const CameraScreenStack = () => {
        return (
            <CameraStack.Navigator initialRouteName="Camera">
                <CameraStack.Screen
                    name="Camera"
                    component={CameraScreen}
                    options={{ headerShown: false }}
                />
                <CameraStack.Screen
                    name="UploadCar"
                    component={UploadCarScreen}
                    options={{ headerShown: true }}
                />
            </CameraStack.Navigator>
        );
    };

    return (
        <Tab.Navigator
            initialRouteName={'Home'}
            screenOptions={{
                tabBarActiveTintColor: globalStyle.primary.color,
                headerShown: false,
                tabBarInactiveBackgroundColor: colors.background,
                tabBarActiveBackgroundColor: colors.background,
                tabBarStyle: {
                    backgroundColor: colors.background
                }
            }}
        >
            <Tab.Screen
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
            <Tab.Screen
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
            <Tab.Screen
                name="CameraStack"
                component={CameraScreenStack}
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
            <Tab.Screen
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
        </Tab.Navigator>
    );
};

export default RootStackNavigator;
