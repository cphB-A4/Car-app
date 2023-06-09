import React from 'react';
import { FunctionComponent } from 'react';
import { Text, StyleSheet } from 'react-native';
import useThemeColors from '../../hooks/useThemeColors';
import { globalStyle } from '../../themes/shared';

//types
import { TextProps } from './types';

const RegularText: FunctionComponent<TextProps> = (props) => {
    const colors = useThemeColors();
    const styles = StyleSheet.create({
        text: {
            fontSize: 18,
            color: colors.text
            //  fontFamily: globalStyle.font.fontFamily,
        }
    });

    return (
        <>
            <Text style={[props.textStyles, styles.text]}>
                {props.children}
            </Text>
        </>
    );
};

export default RegularText;
