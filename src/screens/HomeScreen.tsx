import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { RootStackStackParams } from '../routes/types';
import BigText from '../components/Texts/BigText';
import SmallText from '../components/Texts/SmallText';
import useThemeColors from '../hooks/useThemeColors';
import { globalStyle, outerContainer } from '../themes/shared';
import LottieView from 'lottie-react-native';
import RegularText from '../components/Texts/RegularText';
import CustomText from '../components/Texts/CustomText';
import Heading from '../components/Texts/Heading';
import React from 'react';
import { CustomSafeAreaView } from '../utils/CustomSafeAreaView';
import LoadingAnimation from '../components/LoadingAnimation';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setLoading, setError, clearError } from '../store/slices/view';

const HomeScreen = () => {
    //NOTE: måske NativeStackNavigationProp
    const navigation = useNavigation<StackNavigationProp<RootStackStackParams>>();
    const colors = useThemeColors();
    const dispatch = useAppDispatch();
    const viewState = useAppSelector((state) => state.viewState)

    useEffect(() => {
      dispatch(setLoading(true))
      const fetchData = () => {
        setTimeout(() => {
          dispatch(setLoading(false))
        }, 3000); // simulate a delay of 3 seconds
      };
  
      fetchData();
    }, []);

   
    if(viewState.loading){
      return (<LoadingAnimation/>)
    }


    return (
      <CustomSafeAreaView>
            <View
                style={outerContainer.container}
            >
              <View style={styles.headerSection}>
               
           <BigText textStyles={styles.headerTextSection}>Hello, User!</BigText>
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
      <RegularText>Here are you current stats:</RegularText>
      <View style={styles.statsContainer}>
<View style={styles.statContainer}>
<RegularText textStyles={{fontWeight: '600'}}>Total:</RegularText>
<CustomText textStyles={styles.statsText}>100</CustomText>
</View>
<View style={styles.statContainer}>
<RegularText textStyles={{fontWeight: '600'}}>Max HK:</RegularText>
<CustomText  textStyles={styles.statsText}>100</CustomText>
</View>

      </View>
      <Heading>Your favourite cars</Heading>
            </View>
            </CustomSafeAreaView>
       
    );
};

const styles = StyleSheet.create({
  mainContainer: {
     
  },
  statsText: {
    fontSize: 64,
    color: globalStyle.primary.color,
     fontWeight: '600'
  },
  statsContainer: {
flexDirection: 'row',
paddingTop: 20,
paddingBottom: 20,
paddingLeft: 30,
paddingRight: 30,
justifyContent: 'space-between'
  },
  statContainer: {
    alignItems: 'center'
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTextSection: {
    width: '60%',
    fontWeight: 'bold'
  }
});


export default HomeScreen;
