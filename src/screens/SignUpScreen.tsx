import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import useThemeColors from '../hooks/useThemeColors';
import { outerContainer } from '../themes/shared';

const SignUpScreen = () => {
    const colors = useThemeColors();
    return (
        <SafeAreaView>
            <View
                style={[
                    outerContainer.container,
                    { backgroundColor: colors.background }
                ]}
            >
                <Text style={{ color: colors.text }}>
                    Hello SignUp. We might not need this page!!
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default SignUpScreen;
