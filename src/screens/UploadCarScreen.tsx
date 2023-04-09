import React, { useState } from 'react';
import { Image, Text, View, StyleSheet, TextInput, Alert, ScrollView} from 'react-native';
import useThemeColors from '../hooks/useThemeColors';
import { outerContainer } from '../themes/shared';
import { CustomSafeAreaView } from '../utils/CustomSafeAreaView';
import { StackScreenProps } from '@react-navigation/stack';
import { CameraStackParams, RootStackStackParams } from '../routes/types';
import { motorAPI } from '../api/motorApi/motorAPI';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MotorAPIResponse } from '../api/motorApi/types';
import RegularText from '../components/Texts/RegularText';
import SmallText from '../components/Texts/SmallText';

type Props = StackScreenProps<CameraStackParams, 'UploadCar'>

const UploadCarScreen = ({ route, navigation}: Props) => {
  const { image } = route.params;
    const colors = useThemeColors();
    const [numberplate, setNumberplate] = useState('');
    const [searchReady, setSearchReady] = useState(false);
    const [car, setCar] = useState<MotorAPIResponse>();
    

    const getVehiclesByRegNumber = async () => {
      try {
        const regex = /^[A-Z]{2}\d{5}$/i;
        if (!regex.test(numberplate)) {
          throw new Error('Invalid numberplate format');
        }
        const response = await motorAPI.getVehiclesByRegNumber(numberplate);
        const { registration_number, total_weight, seats, coupling, doors, make, model, variant, model_type, model_year, color, chassis_type, engine_cylinders, engine_volume, engine_power, fuel_type }: MotorAPIResponse = response[0];
        const vehicleData = { registration_number, total_weight, seats, coupling, doors, make, model, variant, model_type, model_year, color, chassis_type, engine_cylinders, engine_volume, engine_power, fuel_type };
        setCar(vehicleData);
      } catch (error) {
        const err = error as Error;
        Alert.alert(err.message)
        console.log(error);
      }
    };
    
    
    const onChange = (e: string) => {
      const regex = /^[A-Z]{2}\d{5}$/i;
      setNumberplate(e);
      if (!regex.test(e)) {
        setSearchReady(false);
      } else {
        setSearchReady(true);
      }
    };
    
    
    const styles = StyleSheet.create({
      imageContainer: {
        padding: 15,
        flex: 1
      },
      container: {
          flex: 1
      },
      inputField: {
        borderWidth: 1,
        paddingTop: 8,
        paddingBottom: 8,
        borderRadius: 10,
        padding: 10,
        height: 50,
        backgroundColor: colors.inputField,
      },
      icon: {
        position: 'absolute',
        right: 10,
        padding: 10
      },
      verticallySpaced: {
        paddingTop: 8,
        paddingBottom: 8,
        alignSelf: 'stretch',
      },
      mt20: {
        marginTop: 20,
      },
    })
    return (
        <>
      
            <View
                style={[
                    {flex: 1, backgroundColor: colors.background }]
                }
            >
        
              <View style={styles.imageContainer}>
               
              <Image
              style={{ width: "100%", height: '100%', borderRadius: 10}}
              source={{ uri: image}}/>
               </View>
               <ScrollView>
               <View style={[styles.container, outerContainer.container]}>
               <View style={{justifyContent: "center",alignItems: "center"}}>
               <RegularText textStyles={{fontWeight: '600', padding: 10}}>Registration number:</RegularText>
</View>

                <View >
               <TextInput
          style={[styles.inputField, {}]}
          onChangeText={(text) => onChange(text)}
          value={numberplate}
          placeholder="eg. AB12345..."
          autoCapitalize={'none'}
          onSubmitEditing={getVehiclesByRegNumber}
        />
        {!searchReady && <MaterialCommunityIcons style={styles.icon} size={30} color={'red'} name='alpha-x-circle-outline'/>}
        {searchReady && <MaterialCommunityIcons style={styles.icon} size={30} color={'green'} name='check-circle-outline'/>}
        </View>

        <View style={{flexDirection:"row"}}>
                    <View style={{flex:1}}>
                        <SmallText textStyles={{fontWeight: '600'}}>REG NUMBER</SmallText>
                    </View>
                    <View style={{flex:1}}>
                        <TextInput placeholder="Test" style={{justifyContent: 'flex-end',}} />
                    </View>
                </View>

        </View>
        </ScrollView>
            </View>
        </>
    );
};

export default UploadCarScreen;
