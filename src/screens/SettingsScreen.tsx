import React from 'react';
import { Text, View } from 'react-native';
import { supabase } from '../api/InitSupabse';
import AppButton from '../components/AppButton';
import useThemeColors from '../hooks/useThemeColors';
import { outerContainer } from '../themes/shared';
import { CustomSafeAreaView } from '../utils/CustomSafeAreaView';

const SettingsScreen = () => {
    const colors = useThemeColors();
    return (
        <CustomSafeAreaView>
            <View
                style={ outerContainer.container}
            >
                <Text style={{ color: colors.text }}>
                    Hello SettingsScreen!!
                </Text>
                <AppButton disabled={false} onPress={async ()=> {
                    const {error} = await supabase.auth.signOut()
                    console.log(error);
                }
}>
    Logout
</AppButton>
            </View>
            </CustomSafeAreaView>
    );
};

export default SettingsScreen;
