import * as React from 'react';
import {Button, Text, View} from 'react-native';
import { NativeModules } from 'react-native';

const Settings = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Settings</Text>
      <Button title={'Show DevMenu'} onPress={showDevMenu}/>
    </View>
  );
};

const showDevMenu = () => {
  NativeModules.DevMenu.show();
}

export default Settings;
