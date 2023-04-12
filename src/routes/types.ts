import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackStackParams = {
    AuthStack: undefined;
    Home: undefined;
    Profile: undefined;
    CameraStack: NavigatorScreenParams<CameraStackParams>;
    Settings: undefined;
    HomeStack: NavigatorScreenParams<HomeStackParams>;
};

export type AuthStackParams = {
    Login: undefined;
    SignUp: undefined;
};

export type CameraStackParams = {
    Camera: undefined;
    UploadCar: {
        image: any;
    };
};

export type HomeStackParams = {
    Home: undefined;
    SingleCar: {
        id: number;
    };
};
