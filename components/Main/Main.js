import * as React from 'react';
import {View} from 'react-native';
import Bluetooth from '../Bluetooth/Bluetooth.js';
import Joystick from '../Joystick/Joystick.js';
import KeepAwake from 'react-native-keep-awake';
import {Styles} from './MainStyles.js';

const Main = ({navigation, dropDownAlertRef}) => {
  return (
    <View style={Styles.container}>
      <Bluetooth />
      <Joystick dropDownAlertRef={dropDownAlertRef} />
      <KeepAwake />
    </View>
  );
};

export default Main;
