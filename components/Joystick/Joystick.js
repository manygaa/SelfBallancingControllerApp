import React, { useRef }  from 'react';
import {Text, View} from 'react-native';
import AxisPad from 'react-native-axis-pad';
import {Styles} from './JoystickStyles.js';
import {communicationWithDeviceWithoutResponse} from '../../service/BluetoothService.js';

const Joystick = ({dropDownAlertRef}) => {

  return (
    <View style={Styles.container}>
      <AxisPad
        handlerStyle={Styles.handler}
        wrapperStyle={Styles.wrapper}
        resetOnRelease={true}
        autoCenter={true}
        onValue={({ x, y }) => {
            communicationWithDeviceWithoutResponse(`move ${x}, ${y}`, dropDownAlertRef);
        }}>
        <Text style={Styles.text}>GO</Text>
      </AxisPad>
    </View>
  )
};

export default Joystick;
