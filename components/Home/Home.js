import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Main from '../Main/Main.js';
import Logs from '../Logs/Logs.js';
import Settings from '../Settings/Settings.js';
import {StyleSheet, SafeAreaView} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import {Styles} from './HomeStyles.js';

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <SafeAreaView style={Styles.container}>
      <Tab.Navigator sceneContainerStyle={Styles.bottomMenu}>
        <Tab.Screen name="Home" component={Main} />
        <Tab.Screen name="Logs" component={Logs} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
      <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
    </SafeAreaView>
  );
};

export default Home;
