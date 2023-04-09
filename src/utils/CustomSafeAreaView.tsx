import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { ReactNode } from 'react';
import React from 'react';
import useThemeColors from '../hooks/useThemeColors';

interface SafeAreaViewProps {
  children?: ReactNode;
}

export const CustomSafeAreaView = ({ children }: SafeAreaViewProps) => {
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      flex: 1,
     // paddingBottom: insets.bottom,
      paddingTop: insets.top
    }
  })
  return (
    <View style={styles.container}>
      {children}
    </View>
  );

};
