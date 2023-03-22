import React from 'react';
import { FunctionComponent } from 'react';
import { Text, StyleSheet } from 'react-native';
import useThemeColors from '../../hooks/useThemeColors';
import { globalStyle } from '../../themes/shared'

//types
import { TextProps } from './types';


const CustomText: FunctionComponent<TextProps> = (props) => {
  const colors = useThemeColors();
  
    return (
            <>
            <Text style={props.textStyles}>{props.children}</Text>
            </>
    );
   
};



export default CustomText;
