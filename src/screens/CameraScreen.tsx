import React, { useState, useRef } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Button } from 'react-native';
import useThemeColors from '../hooks/useThemeColors';
import { outerContainer } from '../themes/shared';
import { CustomSafeAreaView } from '../utils/CustomSafeAreaView';
import { Camera, CameraType } from 'expo-camera';

const CameraScreen = () => {
    const colors = useThemeColors();

    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [showCamera, setShowCamera] = useState(true);
    const [image, setImage] = useState<string | null>(null);

    //Camera ref to access camera
    const cameraRef = useRef<Camera>(null);
  
    if (!permission) {
      // Camera permissions are still loading
      return <View />;
    }
  
    if (!permission.granted) {
      // Camera permissions are not granted yet
      return (
        <View style={styles.container}>
          <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      );
    }
  
    function toggleCameraType() {
      setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const takePhoto = async () => {
        if(cameraRef.current){
            console.log('in take picture')
        
        try {
            let photo = await cameraRef.current.takePictureAsync({
                quality: 1
            })
            return photo;
        } catch (e) {
            console.log(e);
        }
    }
    } 
  
    return (
      <View style={styles.container}>
        {showCamera ? (
 <Camera style={styles.camera} type={type} ref={cameraRef}>
 <View style={styles.buttonContainer}>
   <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
     <Text style={styles.text}>Flip Camera</Text>
   </TouchableOpacity>
   <TouchableOpacity style={styles.button} onPress={async () => {
       const r = await takePhoto();
       if(r){
           setImage(r.uri)
       }
      
       console.log(r);
   }  }>
     <Text style={styles.text}>Take photo</Text>
   </TouchableOpacity>
 </View>
</Camera>
        ) : (<>hello</>)}
       
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      margin: 64,
    },
    button: {
      flex: 1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
  });

export default CameraScreen;
