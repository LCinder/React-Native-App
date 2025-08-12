import 'react-native-reanimated';
import {NavigationContainer} from '@react-navigation/native';
import Location from "./app/Location";
import QRScanner from "./app/QRScanner";
import ItemGridList from "./app/ItemGridList";
import HomeScreen from "./app/HomeScreen";
import {createNativeStackNavigator, NativeStackNavigationOptions} from "@react-navigation/native-stack";
import Target from "./app/Target";
import CameraRecognition from "@/app/CameraRecognition";
import PlaceSelectorScreen from "@/app/PlaceSelectorScreen";
import PlaceDifficultyScreen from "@/app/PlaceDifficultyScreen";
import MissionPathListScreen from './app/MissionPathListScreen';
import Items from './app/Items';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from "@/app/ProfileTabs";
import {Ionicons} from "@expo/vector-icons";
import {SelectedItemProvider} from "@/app/SelectedItemProvider";
import {TargetsProvider} from "@/app/TargetsContext";
import {SelectedLevelProvider} from "@/app/SelectedLevelContext";
import Map from "@/app/Map";
import ProfileTabs from "@/app/ProfileTabs";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const options: NativeStackNavigationOptions = { animation: "fade", title: "" };

function MainTabs() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Profile" component={ProfileTabs} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="person-outline" size={size} color={color} />
                )
            }}/>
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home-outline" size={size} color={color} />
                )
            }}/>
            <Tab.Screen name="Targets" component={PlaceDifficultyScreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="map-outline" size={size} color={color} />
                )
            }}/>
            <Tab.Screen name="Map" component={Map} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="map-outline" size={size} color={color} />
                )
            }}/>
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <TargetsProvider>
            <SelectedLevelProvider>
                <SelectedItemProvider>
                    <NavigationContainer>
                        <Stack.Navigator>
                            <Stack.Screen name="main-tabs" options={options} component={MainTabs} />
                            <Stack.Screen name="location" options={options} component={Location}/>
                            <Stack.Screen name="qrscanner" options={options} component={QRScanner}/>
                            <Stack.Screen name="table" options={options} component={ItemGridList}/>
                            <Stack.Screen name="map-all-places" options={options} component={PlaceSelectorScreen}/>
                            <Stack.Screen name="target" options={options} component={Target} />
                            <Stack.Screen name="camerarecognition" options={options} component={CameraRecognition} />
                            <Stack.Screen name="items" options={options} component={Items} />
                            <Stack.Screen name="mission-type" options={options} component={MissionPathListScreen} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </SelectedItemProvider>
            </SelectedLevelProvider>
        </TargetsProvider>
    );
}
