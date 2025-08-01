import 'react-native-reanimated';
import {NavigationContainer} from '@react-navigation/native';
import Location from "./app/Location";
import QRScanner from "./app/QRScanner";
import ContainerList from "./app/ContainerList";
import HomeScreen from "./app/HomeScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Item from "./app/Item";
import CameraRecognition from "@/app/CameraRecognition";
import MapAllPlaces from "@/app/MapAllPlaces";
import PlaceLevel from "@/app/PlaceLevel";

const Stack = createNativeStackNavigator();
const options = {headerShown: false, animation: 'fade'};

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="home">
                <Stack.Screen name="home" options={options} component={HomeScreen}/>
                <Stack.Screen name="location" options={options} component={Location}/>
                <Stack.Screen name="qrscanner" options={options} component={QRScanner}/>
                <Stack.Screen name="table" options={options} component={ContainerList}/>
                <Stack.Screen name="map-all-places" options={options} component={MapAllPlaces}/>
                <Stack.Screen name="place-level" options={options} component={PlaceLevel}/>
                <Stack.Screen name="item" options={options} component={Item}/>
                <Stack.Screen name="camerarecognition" options={options} component={CameraRecognition}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
