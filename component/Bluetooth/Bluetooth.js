import React, {useState, useEffect} from 'react';
import {Button, Text, View} from 'react-native';
import {scanningDevices} from '../../service/bluetoothService.js';

const Bluetooth = () => {
  const [connect, setConnect] = useState(false);

  scanningDevices();

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Blutuche</Text>
    </View>
  );
};

export default Bluetooth;
