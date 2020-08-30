import React, {useState, useEffect} from 'react';
import {Button, Text, View} from 'react-native';
import GamepadController from 'react-native-gamepad-controller';


const Joystick = () => {
  const [joystick, setJoystick] = useState(false);

  onGamepadData = (data) => {
    setJoystick(JSON.stringify(data));
  }


  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <GamepadController onData={(data)=>{ onGamepadData(data) }} />
      <Text>{this.state.joystick}</Text>
    </View>
  );
};

export default Bluetooth;
