import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { AuthStackParams } from './types';

const AuthenticationStackNavigator = () => {
  const AuthStack = createStackNavigator<AuthStackParams>();
  return (
      <AuthStack.Navigator>
          <AuthStack.Screen name="Login" component={LoginScreen} />
          <AuthStack.Screen name="SignUp" component={SignUpScreen} />
      </AuthStack.Navigator>
  );
};

export default AuthenticationStackNavigator;
