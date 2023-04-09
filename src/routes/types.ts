import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackStackParams = {
  AuthStack: undefined;
  Home: undefined;
  Profile: undefined;
  CameraStack: NavigatorScreenParams<CameraStackParams>;
  Settings: undefined;
};

export type AuthStackParams = {
  Login: undefined;
  SignUp: undefined;
};

export type CameraStackParams = {
  Camera: undefined;
  UploadCar: {
    image: any;
  }
}