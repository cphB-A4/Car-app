import React from 'react';
import { Text, View } from 'react-native';
import useThemeColors from '../hooks/useThemeColors';
import { outerContainer } from '../themes/shared';
import { CustomSafeAreaView } from '../utils/CustomSafeAreaView';

const ProfileScreen = () => {
    const colors = useThemeColors();
    return (
        <CustomSafeAreaView>
            <View
                style={[
                    outerContainer.container,
                    { backgroundColor: colors.background }
                ]}
            >
                <Text style={{ color: colors.text }}>Hello Profile!!</Text>
            </View>
        </CustomSafeAreaView>
    );
};

export default ProfileScreen;
