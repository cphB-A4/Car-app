import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { AuthStackParams } from './types';
import React from 'react';
import { useUser } from '../contexts/UserContext';
import RootStackNavigator from './RootStackNavigator';

const AuthenticationStackNavigator = () => {
  const AuthStack = createStackNavigator<AuthStackParams>();
  const { user, session } = useUser(); 

  const renderContent = () => {
    const isLoggedIn = session && session.user;

    if(!isLoggedIn){
      return (
        <AuthStack.Navigator
        screenOptions={{headerShown: false}}>
        <AuthStack.Screen name="Login" component={LoginScreen} />
        <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    </AuthStack.Navigator>
        );
    }
    return (<RootStackNavigator/>)
    
};
  return (
      <>{renderContent()}</>
  );
};

export default AuthenticationStackNavigator;
