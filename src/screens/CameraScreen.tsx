import React from 'react';
import { Text, View } from 'react-native';
import useThemeColors from '../hooks/useThemeColors';
import { outerContainer } from '../themes/shared';
import { CustomSafeAreaView } from '../utils/CustomSafeAreaView';

const CameraScreen = () => {
    const colors = useThemeColors();
    return (
        <CustomSafeAreaView>
            <View
                style={outerContainer.container}
            >
                <Text style={{ color: colors.text }}>Hello Camera!!</Text>
            </View>
            </CustomSafeAreaView>
    );
};

export default CameraScreen;
