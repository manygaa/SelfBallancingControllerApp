import React, { useState } from "react";
import { Text } from 'react-native';
import { NativeModules } from 'react-native';
import { SectionRow, SettingsPage, NavigateRow, BaseRow, SwitchRow } from 'react-native-settings-view';
import store from '../../store/ConfigureStore.js';
import { runBluetooth } from '../../service/BluetoothService.js';

const Settings = ({ navigation }) => {

    const {bluetoothState} = store.getState();
    const [bluetoothIsOn, setBluetoothIsOn] = useState(bluetoothState.isOn);
    
    return (
        <SettingsPage>
            <SectionRow title="Settings">
                <NavigateRow
                    text="Contact us"
                    leftIcon={{
                        name: 'users',
                        type: 'font-awesome',
                    }}
                    onPress={() => navigation.navigate("ContactUs")}
                />

                <SwitchRow
                    text="Bluetooth"
                    enabled={bluetoothIsOn}
                    enabled={false}
                    leftIcon={{
                        name: 'do-not-disturb',
                        type: 'material-community',
                    }}
                    onValueChange={(isEnabled) => runBluetooth()}
                />
                <BaseRow
                    text={'version'}
                    leftIcon={{
                        name: 'tag',
                        type: 'font-awesome',
                    }}
                    rightContent={<Text>0.1.0</Text>}
                />
            </SectionRow>
        </SettingsPage>
        // <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        //   <Text>Settings</Text>
        //   <Button title={'Show DevMenu'} onPress={showDevMenu}/>
        // </View>
    );
};

const showDevMenu = () => {
    NativeModules.DevMenu.show();
}

export default Settings;
