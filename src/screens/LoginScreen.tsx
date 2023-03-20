
import { SafeAreaView, Text, View } from 'react-native';
import useThemeColors from '../hooks/useThemeColors';
import { outerContainer } from '../themes/shared';

const LoginScreen = () => {
  const colors = useThemeColors()
  return (
    <SafeAreaView>
      <View style={[outerContainer.container,{backgroundColor: colors.background}]}>
    <Text style={{color: colors.text}}>Hello Login!!</Text>
    </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
