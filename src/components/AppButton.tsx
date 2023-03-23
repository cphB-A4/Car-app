import React from 'react';
import { Text, ViewStyle, StyleSheet, View, Pressable } from 'react-native';
import { globalStyle } from '../themes/shared';

interface ButtonProps {
    children?: React.ReactNode,
    onPress: () => void,
    style?: ViewStyle,
    disabled: boolean;
}

const AppButton = ({children, onPress, style, disabled}: ButtonProps) => {

    return (
        <View style={[styles.button, style]}>
        <Pressable
            disabled={disabled}
            onPress={onPress}
            style={({pressed}) => pressed && styles.pressed}
        >
                <Text style={styles.buttonText}>
                    {children}
                </Text>
        </Pressable>
    </View>
    );
    
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        padding: 8,
        backgroundColor: globalStyle.primary.color,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    pressed: {
        opacity: 0.75,
    },
});


export default AppButton;
