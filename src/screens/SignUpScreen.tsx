import React from 'react';
import { Text, View } from 'react-native';
import useThemeColors from '../hooks/useThemeColors';
import { outerContainer } from '../themes/shared';
import { CustomSafeAreaView } from '../utils/CustomSafeAreaView';

const SignUpScreen = () => {
    const colors = useThemeColors();
    return (
        <CustomSafeAreaView>
            <View
                style={ outerContainer.container}
            >
                <Text style={{ color: colors.text }}>
                    Hello SignUp. We might not need this page!!
                </Text>
            </View>
        </CustomSafeAreaView>
    );
};

export default SignUpScreen;
