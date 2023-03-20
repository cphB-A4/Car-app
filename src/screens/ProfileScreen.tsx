
import { SafeAreaView, Text, View } from 'react-native';
import useThemeColors from '../hooks/useThemeColors';
import { outerContainer } from '../themes/shared';

const ProfileScreen = () => {
  const colors = useThemeColors()
  return (
    <SafeAreaView>
      <View style={[outerContainer.container,{backgroundColor: colors.background}]}>
    <Text style={{color: colors.text}}>Hello Profile!!</Text>
    </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
