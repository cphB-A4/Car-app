import React from 'react';
import useThemeColors from '../hooks/useThemeColors';
import LottieView from 'lottie-react-native';

const LoadingAnimation = () => {
  const colors = useThemeColors();
    return (
      <LottieView
      autoPlay
      style={{
        alignItems: 'center',
        backgroundColor: colors.background
      }}
      source={require('../../assets/animations/new-car-loading-animation.json')}
    />
    );
};
export default LoadingAnimation;
