import React, {useState, useEffect} from 'react';
import {Button, Text, View} from 'react-native';
import AxisPad from 'react-native-axis-pad';

const Joystick = () => {

  return (
    <AxisPad
      resetOnRelease={true}
      autoCenter={true}
      onValue={({ x, y }) => {
          console.log(x, y);
      }}>
      <Text>GO</Text>
    </AxisPad>
  )

};

export default Joystick;
