import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import 'react-native-reanimated';

import {useColorScheme} from '@/hooks/useColorScheme';
import Ubication from "@/app/Ubication";
import QRScanner from "@/app/QRScanner";
import ContainerList from "@/app/ContainerList";

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const data = [
        {id: '1', name: 'Element 1'},
        {id: '2', name: 'Element 2'},
        {id: '3', name: 'Element 3'},
        {id: '4', name: 'Element 4'},
        {id: '5', name: 'Element 5'},
        {id: '6', name: 'Element 6'},
        {id: '7', name: 'Element 7'},
        {id: '5', name: 'Element 5'},
        {id: '6', name: 'Element 6'},
        {id: '7', name: 'Element 7'},
        {id: '6', name: 'Element 6'},
        {id: '7', name: 'Element 7'},
        {id: '5', name: 'Element 5'},
        {id: '6', name: 'Element 6'},
        {id: '7', name: 'Element 7'},
    ];


    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Ubication/>
            <QRScanner/>
            <ContainerList data={data}/>
        </ThemeProvider>
    );
}
