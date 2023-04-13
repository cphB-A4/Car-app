import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Alert,
    ScrollView,
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native';
import { HomeStackParams } from '../routes/types';
import BigText from '../components/Texts/BigText';
import SmallText from '../components/Texts/SmallText';
import useThemeColors from '../hooks/useThemeColors';
import { ScreenWidth, globalStyle, outerContainer } from '../themes/shared';
import LottieView from 'lottie-react-native';
import RegularText from '../components/Texts/RegularText';
import CustomText from '../components/Texts/CustomText';
import Heading from '../components/Texts/Heading';
import React from 'react';
import { CustomSafeAreaView } from '../utils/CustomSafeAreaView';
import LoadingAnimation from '../components/LoadingAnimation';
import { useAppDispatch } from '../store/hooks';
import { useUser } from '../contexts/UserContext';
import { supabase } from '../api/InitSupabse';
import { CarType } from '../types/collection';
import { kWToHP } from '../utils/helper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CarCard from '../components/CarCard';

type Props = NativeStackScreenProps<HomeStackParams, 'Home'>;
const HomeScreen = ({ navigation }: Props) => {

    const colors = useThemeColors();
    const { user } = useUser();
    const isFocused = useIsFocused(); //Used to reload the page if user uploads a photo
    const [cars, setCars] = useState<CarType[]>([]);
    const [favCars, setFavCars] = useState<CarType[]>([]);
    const [maxHK, setMaxHk] = useState<number | null>(0);
    const [totalCars, setTotalCars] = useState<number | null>(0);
    const [loading, setLoading] = useState(true);

    const getFavouriteCars = async (userId: string) => {
        const { data, error } = await supabase
            .from('cars')
            .select('*')
            .eq('profile_id', userId)
            .eq('favourite', true)
            .order('created_at', { ascending: false });
        const totalCars = data?.length;
        return { data, error, totalCars };
    };
    
    const getCars = async (userId: string) => {
        const { data, error } = await supabase
            .from('cars')
            .select('*')
            .eq('profile_id', userId)
            .order('created_at', { ascending: false });
        const totalCars = data?.length;
        return { data, error, totalCars };
    };

    const getCarWithMostHK = async (userId: string) => {
        const { data, error } = await supabase
            .from('cars')
            .select('*')
            .eq('profile_id', userId)
            .order('engine_power', { ascending: false })
            .limit(1);
        return { data, error };
    };

    useEffect(() => {
        if (isFocused) {
            setLoading(true);
            if (user) {
                getCars(user.id)
                    .then((cars) => {
                        if (cars.data && cars.totalCars) {
                            setCars(cars.data);
                            setTotalCars(cars.totalCars);
                            setLoading(false);
                        }
                    })
                    .catch((error) => {
                        setLoading(false);
                        Alert.alert(error);
                    });

                getFavouriteCars(user.id)
                    .then((cars) => {
                        if (cars.data && cars.totalCars) {
                            setFavCars(cars.data);
                            setTotalCars(cars.totalCars);
                            setLoading(false);
                        }
                    })
                    .catch((error) => {
                        setLoading(false);
                        Alert.alert(error);
                    });
                getCarWithMostHK(user.id).then((car) => {
                    if (car.data) {
                        setMaxHk(car.data[0].engine_power);
                    }
                });
            }
        }
    }, [isFocused, user]);

    if (loading) {
        return <LoadingAnimation />;
    }

    return (
        <CustomSafeAreaView>
            <ScrollView>
                <View style={outerContainer.container}>
                    <View style={styles.headerSection}>
                        <BigText textStyles={styles.headerTextSection}>
                            Hello, User!
                        </BigText>
                        <LottieView
                            autoPlay
                            style={{
                                height: 150,
                                backgroundColor: colors.background
                            }}
                            // Find more Lottie files at https://lottiefiles.com/featured
                            source={require('../../assets/animations/red-car.json')}
                        />
                    </View>
                    <View style={styles.imageContainer}>
                        <ScrollView horizontal={true}>
                            {cars.map((car) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.push('SingleCar', {
                                                id: car.id
                                            });
                                        }}
                                        style={styles.touchableItems}
                                        key={car.id}
                                    >
                                        <Image
                                            source={{ uri: car.img_url! }}
                                            style={styles.images}
                                        />
                                        <RegularText
                                            textStyles={styles.description}
                                        >
                                            {car.nickname}
                                        </RegularText>
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    </View>
                    <RegularText>Here are you current stats:</RegularText>
                    <View style={styles.statsContainer}>
                        <View style={styles.statContainer}>
                            <RegularText textStyles={{ fontWeight: '600' }}>
                                Total cars:
                            </RegularText>
                            <CustomText textStyles={styles.statsText}>
                                {totalCars}
                            </CustomText>
                        </View>
                        <View style={styles.statContainer}>
                            <RegularText textStyles={{ fontWeight: '600' }}>
                                Max HK:
                            </RegularText>
                            <CustomText textStyles={styles.statsText}>
                                {kWToHP(maxHK!)}
                            </CustomText>
                        </View>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Heading>Your favourite cars</Heading>
                    </View>
                    {favCars.map((car) => {
                        return (
                            <View style={{ marginBottom: 20 }} key={car.id}>
                                <CarCard car={car} />
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </CustomSafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {},
    statsText: {
        fontSize: 64,
        color: globalStyle.primary.color,
        fontWeight: '600'
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 18,
        alignSelf: 'center',
        marginLeft: 15.48
    },
    touchableItems: {
        width: ScreenWidth * 0.68,
        marginRight: 10
    },
    images: {
        width: ScreenWidth * 0.68,
        height: 320
    },
    statsContainer: {
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'space-between'
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'center',
        marginTop: 17,
        marginBottom: 22,
        marginLeft: 16,
        marginRight: 16
    },
    statContainer: {
        alignItems: 'center'
    },
    headerSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerTextSection: {
        width: '60%',
        fontWeight: 'bold'
    }
});

export default HomeScreen;
