import 'react-native-reanimated';
import {NavigationContainer} from '@react-navigation/native';
import Location from "./app/Location";
import QRScanner from "@/utils/QRScanner";
import ItemGridList from "./app/ItemGridList";
import HomeScreen from "./app/HomeScreen";
import {createNativeStackNavigator, NativeStackNavigationOptions} from "@react-navigation/native-stack";
import CameraRecognition from "@/utils/CameraRecognition";
import CitySelectorScreen from "@/app/screens/CitySelectorScreen";
import RouteListScreen from '@/app/screens/RouteListScreen';
import RouteScreen from './app/screens/RouteScreen';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileTabs from "@/app/screens/ProfileTabsScreen";
import {Ionicons} from "@expo/vector-icons";
import {SelectedItemProvider} from "@/app/contexts/SelectedItemContext";
import {MonumentProvider} from "@/app/contexts/LocationContext";
import {SelectedLevelProvider} from "@/app/contexts/SelectedLevelContext";
import Map from "@/app/Map";
import Monument from "@/app/Monument";
import SettingsScreen from './app/screens/SettingsScreen';
import ProfileSettingsScreen from './app/screens/settings/ProfileScreen';
import CloseSessionScreen from './app/screens/settings/CloseSessionScreen';
import FAQsScreen from './app/screens/settings/FAQsScreen';
import LanguageScreen from './app/screens/settings/LanguageScreen';
import NotificationsScreen from './app/screens/settings/NotificationsScreen';
import RemoveAccountScreen from './app/screens/settings/RemoveAccountScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const options: NativeStackNavigationOptions = {animation: "fade", title: ""};

function MainTabs() {
    return (
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name="Profile" component={ProfileTabs} options={{
                tabBarIcon: ({color, size}) => (
                    <Ionicons name="person-outline" size={size} color={color}/>
                )
            }}/>
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({color, size}) => (
                    <Ionicons name="home-outline" size={size} color={color}/>
                )
            }}/>
            <Tab.Screen name="Monuments" component={RouteListScreen} options={{
                tabBarIcon: ({color, size}) => (
                    <Ionicons name="map-outline" size={size} color={color}/>
                )
            }}/>
            <Tab.Screen name="Map" component={Map} options={{
                tabBarIcon: ({color, size}) => (
                    <Ionicons name="map-outline" size={size} color={color}/>
                )
            }}/>
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <MonumentProvider>
            <SelectedLevelProvider>
                <SelectedItemProvider>
                    <NavigationContainer>
                        <Stack.Navigator>
                            <Stack.Screen name="main-tabs" options={options} component={MainTabs}/>
                            <Stack.Screen name="location" options={options} component={Location}/>
                            <Stack.Screen name="qrscanner" options={options} component={QRScanner}/>
                            <Stack.Screen name="table" options={options} component={ItemGridList}/>
                            <Stack.Screen name="map-all-places" options={options} component={CitySelectorScreen}/>
                            <Stack.Screen name="monument" options={options} component={Monument}/>
                            <Stack.Screen name="camerarecognition" options={options} component={CameraRecognition}/>
                            <Stack.Screen name="routes" options={options} component={RouteScreen}/>
                            <Stack.Screen name="mission-type" options={options} component={RouteListScreen}/>
                            <Stack.Screen name="settings" options={options} component={SettingsScreen}/>
                            <Stack.Screen name="profile_settings" options={options} component={ProfileSettingsScreen}/>
                            <Stack.Screen name="language" options={options} component={LanguageScreen}/>
                            <Stack.Screen name="faqs" options={options} component={FAQsScreen}/>
                            <Stack.Screen name="notifications" options={options} component={NotificationsScreen}/>
                            <Stack.Screen name="remove_account" options={options} component={RemoveAccountScreen}/>
                            <Stack.Screen name="close_session" options={options} component={CloseSessionScreen}/>
                        </Stack.Navigator>
                    </NavigationContainer>
                </SelectedItemProvider>
            </SelectedLevelProvider>
        </MonumentProvider>
    );
}
