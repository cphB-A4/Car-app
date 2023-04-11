import React, { useState, useRef } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Button,
    Image
} from 'react-native';
import useThemeColors from '../hooks/useThemeColors';
import { outerContainer } from '../themes/shared';
import { CustomSafeAreaView } from '../utils/CustomSafeAreaView';
import { Camera, CameraType } from 'expo-camera';
import SmallText from '../components/Texts/SmallText';
import AppButton from '../components/AppButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CameraStackParams, RootStackStackParams } from '../routes/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<CameraStackParams, 'Camera'>;
const CameraScreen = ({ navigation }: Props) => {
    const colors = useThemeColors();
    //const navigation = useNavigation<StackNavigationProp<RootStackStackParams>>();
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
                <Text style={{ textAlign: 'center' }}>
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraType() {
        setType((current) =>
            current === CameraType.back ? CameraType.front : CameraType.back
        );
    }

    const takePhoto = async () => {
        if (cameraRef.current) {
            try {
                let photo = await cameraRef.current.takePictureAsync({
                    quality: 1
                });
                return photo;
            } catch (e) {
                console.log(e);
            }
        }
    };

    return (
        <CustomSafeAreaView>
            <View style={styles.container}>
                {showCamera ? (
                    <View style={styles.cameraContainer}>
                        <Camera
                            style={styles.camera}
                            type={type}
                            ref={cameraRef}
                        >
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={toggleCameraType}
                                >
                                    <Text style={styles.text}>Flip Camera</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={async () => {
                                        const r = await takePhoto();
                                        if (r) {
                                            setImage(r.uri);
                                        }
                                        setShowCamera(false);
                                    }}
                                >
                                    <Text style={styles.text}>Take photo</Text>
                                </TouchableOpacity>
                            </View>
                        </Camera>
                    </View>
                ) : (
                    <View style={{ flex: 1 }}>
                        {image && (
                            <Image
                                style={{ width: '100%', height: '90%' }}
                                source={{ uri: image }}
                            />
                        )}
                        <View
                            style={{
                                justifyContent: 'center',
                                flexDirection: 'row',
                                gap: 100,
                                padding: 20
                            }}
                        >
                            <AppButton
                                onPress={() => {
                                    setShowCamera(true);
                                }}
                                disabled={false}
                            >
                                Take New Picture!
                            </AppButton>
                            <AppButton
                                onPress={() => {
                                    //setShowCamera(true);
                                    //Upload image
                                    navigation.navigate('UploadCar', { image });
                                }}
                                disabled={false}
                            >
                                Use picture
                            </AppButton>
                        </View>
                    </View>
                )}
            </View>
        </CustomSafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cameraContainer: {
        height: '100%',
        width: '100%'
    },
    camera: {
        flex: 1,
        borderRadius: 20
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center'
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
    }
});

export default CameraScreen;
