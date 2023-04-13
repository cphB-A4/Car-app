import React, { useState, useRef } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Button,
    Image,
    ImageBackground
} from 'react-native';
import useThemeColors from '../hooks/useThemeColors';
import { ScreenWidth, outerContainer } from '../themes/shared';
import { CustomSafeAreaView } from '../utils/CustomSafeAreaView';
import { Camera, CameraType } from 'expo-camera';
import SmallText from '../components/Texts/SmallText';
import AppButton from '../components/AppButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CameraStackParams, RootStackStackParams } from '../routes/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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

    const [zoom, setZoom] = useState(0);

    const handleZoomChange = (value: number) => {
        setZoom(value);
    };

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
                            <MaterialCommunityIcons
                                style={{
                                    position: 'absolute',
                                    right: 20,
                                    top: 20
                                }}
                                name="camera-flip-outline"
                                color={'white'}
                                size={26}
                                onPress={toggleCameraType}
                            />

                            <TouchableOpacity
                                style={{
                                    height: 80,
                                    width: 80,
                                    borderRadius: 40,
                                    borderColor: 'white',
                                    borderWidth: 5,
                                    position: 'absolute',
                                    bottom: 30,
                                    right: ScreenWidth / 2 - 40
                                }}
                                onPress={async () => {
                                    const r = await takePhoto();
                                    if (r) {
                                        setImage(r.uri);
                                    }
                                    setShowCamera(false);
                                }}
                            >
                                <View
                                    style={{
                                        flex: 1,
                                        backgroundColor: 'transparent',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                ></View>
                            </TouchableOpacity>
                        </Camera>
                    </View>
                ) : (
                    <View>
                        {image && (
                            <View style={{}}>
                                <ImageBackground
                                    style={{ width: '100%', height: '100%' }}
                                    source={{ uri: image }}
                                >
                                    <MaterialCommunityIcons
                                        style={{
                                            position: 'absolute',
                                            right: 20,
                                            bottom: 60
                                        }}
                                        name="arrow-right-thin-circle-outline"
                                        color={'white'}
                                        size={45}
                                        onPress={() => {
                                            navigation.navigate('UploadCar', {
                                                image
                                            });
                                        }}
                                    />
                                    <MaterialCommunityIcons
                                        style={{
                                            position: 'absolute',
                                            left: 10,
                                            top: 30
                                        }}
                                        name="close"
                                        color={'white'}
                                        size={45}
                                        onPress={() => {
                                            setShowCamera(true);
                                        }}
                                    />
                                </ImageBackground>
                            </View>
                        )}
                        <View
                            style={{
                                justifyContent: 'center',
                                flexDirection: 'row',
                                gap: 100,
                                padding: 20
                            }}
                        ></View>
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
        flexDirection: 'row',
        backgroundColor: 'red',
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
