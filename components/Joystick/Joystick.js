import React from 'react';
import {Text, View} from 'react-native';
import AxisPad from 'react-native-axis-pad';
import {Styles} from './JoystickStyles.js';
import {communicationWithDevice} from '../../service/BluetoothService.js';

const Joystick = () => {

  return (
    <View style={Styles.container}>
      <AxisPad
        handlerStyle={Styles.handler}
        wrapperStyle={Styles.wrapper}
        resetOnRelease={true}
        autoCenter={true}
        onValue={({ x, y }) => {
            communicationWithDevice(`move ${x}, ${y}`);
        }}>
        <Text style={Styles.text}>GO</Text>
      </AxisPad>
    </View>
  )
};

export default Joystick;
