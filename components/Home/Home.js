import React, {useRef} from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from '../Main/Main.js';
import Logs from '../Logs/Logs.js';
import SettingsNavigation from '../SettingsNavigation/SettingsNavigation.js';
import { SafeAreaView } from 'react-native';
import { Styles } from './HomeStyles.js';
import { BOTTOM_MENU } from '../../constans/GlobalConstans.js';
import { HomeIcon, LogsIcon, SettingsIcon } from '../../icon/SvgIcon.js';
import { NavigationContainer } from '@react-navigation/native';
import DropdownAlert from 'react-native-dropdownalert';

const Tab = createBottomTabNavigator();

const Home = () => {

    const dropDownAlertRef = useRef(null);
    
    const selectIconToMenu = (route, color, size) => {
        const { name } = route;

        switch (name) {
            case BOTTOM_MENU.home:
                return <HomeIcon color={color} size={size} />;
            case BOTTOM_MENU.logs:
                return <LogsIcon color={color} size={size} />; 
            case BOTTOM_MENU.settings:
                return <SettingsIcon color={color} size={size} />; 
        }
    }

    return (
        <SafeAreaView style={Styles.container}>
            <NavigationContainer>
                <Tab.Navigator sceneContainerStyle={Styles.bottomMenu}
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ color, size }) => {
                            return selectIconToMenu(route, color, size);
                        },
                    })}
                    tabBarOptions={{
                        activeTintColor: '#32CD32',
                        inactiveTintColor: '#808080',
                    }}
                >
                    <Tab.Screen name="Home" children={() => <Main dropDownAlertRef={dropDownAlertRef} />} />
                    <Tab.Screen name="Logs" component={Logs} />
                    <Tab.Screen name="Settings" children={() => <SettingsNavigation dropDownAlertRef={dropDownAlertRef} />} />
                    
                </Tab.Navigator>
            </NavigationContainer>
            <DropdownAlert ref={dropDownAlertRef} />
        </SafeAreaView>
    );
};

export default Home;
