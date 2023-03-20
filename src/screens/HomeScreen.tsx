
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { StackParams } from '../../App';
import useThemeColors from '../hooks/useThemeColors';
import { outerContainer } from '../themes/shared';

const HomeScreen = () => {
  //NOTE: måske NativeStackNavigationProp
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const colors = useThemeColors()
  return (
    <SafeAreaView>
      <View style={[outerContainer.container,{backgroundColor: colors.background}]}>
    <Text style={{color: colors.text}}>Hello HOMESCREN!!</Text>
    <TouchableOpacity
    onPress={()=> {
      navigation.navigate('Home')

    }}>
      <Text>Home</Text>
    </TouchableOpacity>
  <TouchableOpacity
    onPress={()=> {
      navigation.navigate('Profile')
    }}>
      <Text>Profile</Text>
    </TouchableOpacity>
    <TouchableOpacity
    onPress={()=> {
      navigation.navigate('Camera')
    }}>
      <Text>Camera</Text>
    </TouchableOpacity>
    <TouchableOpacity
    onPress={()=> {
      navigation.navigate('Settings')
    }}>
      <Text>Settings</Text>
    </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
