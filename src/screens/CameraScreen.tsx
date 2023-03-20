
import { SafeAreaView, Text, View } from 'react-native';
import useThemeColors from '../hooks/useThemeColors';
import { outerContainer } from '../themes/shared';

const CameraScreen = () => {
  const colors = useThemeColors()
  return (
    <SafeAreaView>
      <View style={[outerContainer.container,{backgroundColor: colors.background}]}>
    <Text style={{color: colors.text}}>Hello Camera!!</Text>
    </View>
    </SafeAreaView>
  );
};

export default CameraScreen;
