import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { AuthStackParams } from './types';
import React, { useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import RootStackNavigator from './RootStackNavigator';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import LoadingAnimation from '../components/LoadingAnimation';

const AuthenticationStackNavigator = () => {
  const AuthStack = createStackNavigator<AuthStackParams>();
  const { user, session } = useUser(); 
  const loading = useAppSelector((state) => state.viewState.loading);

  const renderContent = () => {
    const isLoggedIn = session && session.user;

    if(!isLoggedIn){
      return (
       <>
        {loading ? <LoadingAnimation/>:  <AuthStack.Navigator
        screenOptions={{headerShown: false}}>
        <AuthStack.Screen name="Login" component={LoginScreen} />
        <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    </AuthStack.Navigator>}
       </>
        );
    }
    return (<RootStackNavigator/>)
    
};
  return (
      <>
        {/*Loading spinner with lottie animation goes here if loading state is true. If loading is false renderContent*/}
        <>{renderContent()}</>
      </>
  );
};

export default AuthenticationStackNavigator;
