import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';

export const ScreenWidth = Dimensions.get('screen').width;
export const ScreenHeight = Dimensions.get('screen').height;

//This is used to display the whole screen in dark, if darkmode is chosen.
export const outerContainer = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        padding: 20
    }
});

export const globalStyle = StyleSheet.create({
    primary: {
        color: '#008EDE'
    },
    font: {
        // fontFamily: 'Inter-Black'
    }
});
