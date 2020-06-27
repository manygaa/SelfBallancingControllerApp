import * as React from 'react';
import {Button, Text, View} from 'react-native';
import Bluetooth from '../Bluetooth/Bluetooth.js';

const Main = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Blutuche</Text>
      <Bluetooth />
    </View>
  );
};

export default Main;
