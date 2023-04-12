import React, { useEffect, useState } from 'react';
import {
    Alert,
    Text,
    TextInput,
    View,
    Image,
    ScrollView,
    StyleSheet,
    Pressable
} from 'react-native';
import { supabase } from '../api/InitSupabse';
import AppButton from '../components/AppButton';
import useThemeColors from '../hooks/useThemeColors';
import { ScreenHeight, ScreenWidth, outerContainer } from '../themes/shared';
import { CustomSafeAreaView } from '../utils/CustomSafeAreaView';
import { HomeStackParams } from '../routes/types';
import { StackScreenProps } from '@react-navigation/stack';
import { setLoading, setError, clearError } from '../store/slices/view';
import { CarType } from '../types/collection';
import { useUser } from '../contexts/UserContext';
import SmallText from '../components/Texts/SmallText';
import CarDetails from '../components/CarDetails';
import { kWToHP } from '../utils/helper';
import Heading from '../components/Texts/Heading';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import RegularText from '../components/Texts/RegularText';

type Props = StackScreenProps<HomeStackParams, 'SingleCar'>;
const SingleCarScreen = ({ route, navigation }: Props) => {
    const { id } = route.params;
    const colors = useThemeColors();
    const [car, setCar] = useState<CarType | null>();
    const { user } = useUser();

    const changeFavourite = async (userId: string, carId: number) => {
        const { data, error } = await supabase
            .from('cars')
            .update({ favourite: !car?.favourite })
            .eq('profile_id', userId)
            .eq('id', carId);
        if (error) {
            Alert.alert('An error occured');
            return error;
        }
        setCar((prevCar) =>
            prevCar ? { ...prevCar, favourite: !prevCar.favourite } : null
        );
        return { data, error };
    };

    useEffect(() => {
        // Changing  the header based on wether the user has favourited the car or not
        navigation.setOptions({
            headerShown: true,
            headerStyle: {
                backgroundColor: colors.background
            },
            headerTitle: () => (
                <RegularText textStyles={{ fontWeight: '600' }}>
                    {car?.nickname ? car?.nickname : car?.make}
                </RegularText>
            ),
            headerBackTitleVisible: false,
            headerTintColor: colors.text,
            headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                    {user && car && (
                        <>
                            {car?.favourite === true && user ? (
                                <Pressable
                                    onPress={() =>
                                        changeFavourite(user.id, car.id)
                                    }
                                    style={styles.icon}
                                >
                                    <MaterialCommunityIcons
                                        name="heart"
                                        color={'red'}
                                        size={24}
                                    />
                                </Pressable>
                            ) : (
                                <Pressable
                                    onPress={() =>
                                        changeFavourite(user.id, car.id)
                                    }
                                    style={styles.icon}
                                >
                                    <MaterialCommunityIcons
                                        name="heart-outline"
                                        color={colors.text}
                                        size={24}
                                    />
                                </Pressable>
                            )}
                        </>
                    )}

                    <Pressable style={styles.icon}>
                        <MaterialCommunityIcons
                            name="pencil-outline"
                            color={colors.text}
                            size={24}
                        />
                    </Pressable>
                </View>
            )
        });
    }, [car?.favourite]);

    const getCarById = async (userId: string, carId: number) => {
        const { data, error } = await supabase
            .from('cars')
            .select('*')
            .eq('profile_id', userId)
            .eq('id', carId);
        return { data, error };
    };

    useEffect(() => {
        setLoading(true);
        if (user) {
            getCarById(user.id, id)
                .then((car) => {
                    if (car.data) {
                        setCar(car.data[0]);
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    Alert.alert(error);
                });
        }
    }, [user]);

    return (
        <ScrollView style={{ backgroundColor: colors.background }}>
            {car?.img_url && (
                <Image
                    style={{ width: ScreenWidth, height: ScreenHeight * 0.4 }}
                    source={{ uri: car?.img_url }}
                />
            )}

            <View style={outerContainer.container}>
                <View style={[styles.headerSection, styles.mb]}>
                    <Heading>
                        {car?.nickname ? car.nickname : car?.make}
                    </Heading>
                </View>
                {/* <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <SmallText textStyles={{ fontWeight: '600' }}>
                                    PERSONAL NAME
                                </SmallText>
                            </View>
                            <View style={{ flex: 1 }}>
                                <SmallText textStyles={{ fontWeight: '400' }}>
                                    My Favourite Skoda
                                </SmallText>
                            </View>
                        </View> */}
                <View style={{ gap: 20 }}>
                    {car && (
                        <>
                            <CarDetails
                                property="REG NUMBER"
                                value={car.registration_number}
                            />
                            <CarDetails
                                property="TOTAL WEIGHT"
                                value={car.total_weight + ' KG'}
                            />
                            <CarDetails property="SEATS" value={car.seats} />
                            <CarDetails
                                property="COUPLING"
                                value={car.coupling ? 'NO' : 'YES'}
                            />
                            <CarDetails property="DOORS" value={car.doors} />
                            <CarDetails property="MAKE" value={car.make} />
                            <CarDetails property="MODEL" value={car.model} />
                            <CarDetails
                                property="VARIANT"
                                value={car.variant}
                            />
                            <CarDetails
                                property="HK"
                                value={
                                    kWToHP(car.engine_power!) +
                                    'HK (' +
                                    car.engine_power +
                                    'KW)'
                                }
                            />
                        </>
                    )}
                </View>
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    headerSection: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    mb: {
        marginBottom: 20
    },
    icon: {
        width: 55,
        height: 55,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default SingleCarScreen;
