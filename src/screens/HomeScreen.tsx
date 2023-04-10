import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, ScrollView, TouchableOpacity, Image } from 'react-native';
import { RootStackStackParams } from '../routes/types';
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
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setLoading, setError, clearError } from '../store/slices/view';
import { useUser } from '../contexts/UserContext';
import { supabase } from '../api/InitSupabse';

const HomeScreen = () => {
    //NOTE: måske NativeStackNavigationProp
    const navigation = useNavigation<StackNavigationProp<RootStackStackParams>>();
    const colors = useThemeColors();
    const dispatch = useAppDispatch();
    const viewState = useAppSelector((state) => state.viewState)
    const { user } = useUser();
    const [imgUrls, setImgUrls] = useState<string[]>([]);

    // useEffect(() => {
    //   dispatch(setLoading(true))
    //   const fetchData = () => {
    //     setTimeout(() => {
    //       dispatch(setLoading(false))
    //     }, 3000); // simulate a delay of 3 seconds
    //   };
  
    //   fetchData();
    // }, []);

    const getCars = async (userId: string) => {
      const { data, error } = await supabase.from('cars')
       .select('*')
       .eq('profile_id', userId)
       return {data, error};
    }

    useEffect(() => {
      setLoading(true);
      if (user) {
        let tmpImgUrl = "https://gfxtrcqmweyihhmyuzcl.supabase.co/storage/v1/object/public/image-bucket/"+ user.id + "/";
        getCars(user.id).then((cars) => {
          console.log(cars);
          if(cars.data){
            let carsUrls: string[] = []
            cars.data.forEach(element => {
              carsUrls.push(tmpImgUrl + element.img_url)
            });
            
            console.log(carsUrls)
            setImgUrls(carsUrls)
            setLoading(false)
          }
      
        })
      }
    }, [user]);

   
    if(viewState.loading){
      return (<LoadingAnimation/>)
    }


    return (
      <CustomSafeAreaView>
        <ScrollView>
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
      <View style={styles.imageContainer}>

      <ScrollView horizontal={true}>
          {imgUrls.map((imageUrl: string) => { 
            console.log(imageUrl);
            return(
            <TouchableOpacity
              onPress={() => {
               // navigation.navigate('SingleArticle', { postId: post.id });
               
              }}
              style={styles.touchableItems}
              key={imageUrl}>
              <Image
                source={{ uri: imageUrl }}
                style={styles.images}
              />
               <RegularText textStyles={styles.description}>Description..</RegularText> 
            </TouchableOpacity>
          )})}
        </ScrollView>




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
            </ScrollView>
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
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 18,
    alignSelf: 'center',
    marginLeft: 15.48,
  },
  touchableItems: {
    width: ScreenWidth * 0.68,
    marginRight: 10,
  },
  images: {
    width: ScreenWidth * 0.68,
    height: 320,
  },
  statsContainer: {
flexDirection: 'row',
paddingTop: 20,
paddingBottom: 20,
paddingLeft: 30,
paddingRight: 30,
justifyContent: 'space-between'
  },
  description:{
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 17,
    marginBottom: 22,
    marginLeft: 16,
    marginRight: 16,
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
