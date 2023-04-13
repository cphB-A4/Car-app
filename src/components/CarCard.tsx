import React from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';
import CustomText from './Texts/CustomText';
import { globalStyle } from '../themes/shared';
import { CarType } from '../types/collection';
import { formatDate, kWToHP } from '../utils/helper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParams, RootStackStackParams } from '../routes/types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useThemeColors from '../hooks/useThemeColors';
import { useUser } from '../contexts/UserContext';

interface CarCardProps {
    car: CarType;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
    const navigation = useNavigation<StackNavigationProp<HomeStackParams>>();
    const colors = useThemeColors();
    const { user } = useUser();
    return (
        <View>
            <Pressable
                onPress={() => navigation.push('SingleCar', { id: car.id })}
                style={styles.card}
            >
                <View>
                    <Image
                        style={styles.image}
                        source={{ uri: car.img_url! }}
                    />
                    <CustomText textStyles={styles.title}>
                        {car.nickname ? car.nickname : car.make}
                    </CustomText>
                    <CustomText textStyles={styles.subtitle}>
                        {car.variant}
                    </CustomText>

                    {car?.favourite === true && user ? (
                        <MaterialCommunityIcons
                            style={{ position: 'absolute', right: 10, top: 5 }}
                            name="heart"
                            color={'red'}
                            size={24}
                        />
                    ) : (
                        <MaterialCommunityIcons
                            style={{ position: 'absolute', right: 10, top: 5 }}
                            name="heart-outline"
                            color={colors.text}
                            size={24}
                        />
                    )}
                </View>
                <View style={styles.detailsContainer}>
                    <View>
                        <CustomText
                            textStyles={{ marginLeft: 100, color: 'white' }}
                        >
                            HK
                        </CustomText>
                        <CustomText
                            textStyles={{
                                marginLeft: 100,
                                color: 'white',
                                fontWeight: '700'
                            }}
                        >
                            {kWToHP(car.engine_power!)}HK
                        </CustomText>
                    </View>
                    <View
                        style={{
                            height: '100%',
                            width: 1,
                            backgroundColor: 'white',
                            marginLeft: 100
                        }}
                    ></View>
                    <View style={{ marginLeft: 10 }}>
                        <CustomText textStyles={{ color: 'white' }}>
                            Date
                        </CustomText>
                        <CustomText
                            textStyles={{ color: 'white', fontWeight: '700' }}
                        >
                            {formatDate(car.created_at?.toString()!)}
                        </CustomText>
                    </View>
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: globalStyle.primary.color,
        height: 140,
        width: 350,
        borderRadius: 10
    },
    image: {
        width: 100,
        height: 140,
        borderRadius: 10,
        position: 'absolute',
        top: -15,
        left: -10
    },
    title: {
        color: 'white',
        fontSize: 22,
        fontWeight: '700',
        marginLeft: 100
    },
    subtitle: {
        color: 'white',
        marginLeft: 100,
        fontSize: 17,
        fontWeight: '600'
    },
    detailsContainer: {
        flexDirection: 'row',
        paddingTop: 30,
        paddingBottom: 30
    }
});

export default CarCard;
