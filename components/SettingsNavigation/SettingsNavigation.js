import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from '../Settings/Settings.js';
import ContactUs from '../ContactUs/ContactUs.js';
import SettingsLogs from '../SettingsLogs/SettingsLogs.js';

const SettingsNavigation = ({ navigation }) => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator initialRouteName="Settings">
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="ContactUs" component={ContactUs} />
            <Stack.Screen name="Logs" component={SettingsLogs} />
        </Stack.Navigator>
    )
}

export default SettingsNavigation;