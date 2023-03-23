import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { supabase } from '../api/InitSupabse';
import AppButton from '../components/AppButton';
import useThemeColors from '../hooks/useThemeColors';
import { outerContainer } from '../themes/shared';

const SettingsScreen = () => {
    const colors = useThemeColors();
    return (
        <SafeAreaView style={{backgroundColor: colors.background}}>
            <View
                style={[
                    outerContainer.container,
                    { backgroundColor: colors.background }
                ]}
            >
                <Text style={{ color: colors.text }}>
                    Hello SettingsScreen!!
                </Text>
                <AppButton disabled={false} onPress={async ()=> await supabase.auth.signOut()
}>
    Logout
</AppButton>
            </View>
        </SafeAreaView>
    );
};

export default SettingsScreen;
