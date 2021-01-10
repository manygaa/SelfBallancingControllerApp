import React from "react";
import { Text, Button, NativeModules } from 'react-native';
import { SectionRow, SettingsPage, NavigateRow, BaseRow, SwitchRow } from 'react-native-settings-view';
import { runBluetooth, disconnectBluetooth } from '../../service/BluetoothService.js';
import { connect } from 'react-redux';

const Settings = ({ navigation, status:{bluetoothIsOn}, dropDownAlertRef}) => {

    const showDevMenu = () => {
        NativeModules.DevMenu.show();
    }

    const toggleBluetooth = (isEnabled) => {
        isEnabled ? runBluetooth() : disconnectBluetooth();
    }
    
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
                <NavigateRow
                    text="Logs"
                    leftIcon={{
                        name: 'users',
                        type: 'font-awesome',
                    }}
                    onPress={() => navigation.push("Logs", {dropDownAlertRef: dropDownAlertRef})}
                />
                <SwitchRow
                    text="Bluetooth"
                    enabled={bluetoothIsOn}
                    leftIcon={{
                        name: 'do-not-disturb',
                        type: 'material-community',
                    }}
                    onValueChange={(isEnabled) => toggleBluetooth(isEnabled)}
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
            {
                __DEV__ ?
                 <Button
                    title="Developer menu"
                    onPress={() => showDevMenu()}
                />
                :
                null
            }


        </SettingsPage>
    );
};

const mapStateToProps = state => ({
	status: state.settingsReducer
});

export default connect(mapStateToProps)(Settings);
