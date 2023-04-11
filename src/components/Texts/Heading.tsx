import React from 'react';
import { FunctionComponent } from 'react';
import { Text, StyleSheet } from 'react-native';
import useThemeColors from '../../hooks/useThemeColors';
import { globalStyle } from '../../themes/shared';

//types
import { TextProps } from './types';

const Heading: FunctionComponent<TextProps> = (props) => {
    const colors = useThemeColors();
    const styles = StyleSheet.create({
        text: {
            fontSize: 24,
            color: colors.text,
            fontWeight: '600'
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

export default Heading;
