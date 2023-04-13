import React, { useEffect, useState } from 'react';
import { TextInput, View, StyleSheet, Alert } from 'react-native';
import useThemeColors from '../hooks/useThemeColors';
import { outerContainer } from '../themes/shared';
import { HomeStackParams } from '../routes/types';
import { StackScreenProps } from '@react-navigation/stack';
import AppButton from '../components/AppButton';
import { useAppSelector } from '../store/hooks';
import { supabase } from '../api/InitSupabse';
import { useDispatch } from 'react-redux';
import { updateNickname } from '../store/slices/car';
import RegularText from '../components/Texts/RegularText';

type Props = StackScreenProps<HomeStackParams, 'Edit'>;
const EditScreen = ({ route, navigation }: Props) => {
    const { id } = route.params;
    const colors = useThemeColors();
    const dispatch = useDispatch();
    const car = useAppSelector((state) => state.carState.car);
    const [nickname, setNickname] = useState(car?.nickname);
    console.log('nickname', nickname);

    const saveEditing = async () => {
        if (nickname && nickname.length < 1) {
            Alert.alert('Nickname must be longer than 1 character');
            return;
        }
        console.log(id, nickname);
        const { data, error } = await supabase
            .from('cars')
            .update({ nickname: nickname })
            .eq('id', id);
        if (error) {
            Alert.alert(error.message);
            return;
        }
        dispatch(updateNickname(nickname!));
        navigation.goBack();
    };

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerStyle: {
                backgroundColor: colors.background
            },

            headerBackTitleVisible: false,
            headerTintColor: colors.text

            //  headerRight: () => (<AppButton style={{marginRight: 10, backgroundColor:'red'}} onPress={saveEditing} disabled={false}>Save</AppButton>)
        });
    }, []);

    const styles = StyleSheet.create({
        inputField: {
            borderWidth: 1,
            paddingTop: 8,
            paddingBottom: 8,
            borderRadius: 10,
            padding: 10,
            backgroundColor: colors.inputField
        },
        verticallySpaced: {
            paddingTop: 8,
            paddingBottom: 8,
            alignSelf: 'stretch'
        },
        mt20: {
            marginTop: 20
        }
    });

    return (
        <View
            style={[
                outerContainer.container,
                { backgroundColor: colors.background }
            ]}
        >
            <View style={{ padding: 10 }}>
                <RegularText>Nickname</RegularText>
            </View>
            <TextInput
                style={styles.inputField}
                onChangeText={(text) => setNickname(text)}
                value={nickname ? nickname : ''}
            />
            <View style={{ padding: 20 }}>
                <AppButton style={{}} onPress={saveEditing} disabled={false}>
                    Save
                </AppButton>
            </View>
        </View>
    );
};

export default EditScreen;
