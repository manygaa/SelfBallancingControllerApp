import * as React from 'react';
import {Button, Text, View} from 'react-native';
import Bluetooth from '../Bluetooth/Bluetooth.js';
import Joystick from '../Joystick/Joystick.js';
import KeepAwake from 'react-native-keep-awake';

const Main = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Bluetooth />
      <Joystick />
      <KeepAwake />
    </View>
  );
};

export default Main;
