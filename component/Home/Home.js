import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Main from '../Main/Main.js';
import Logs from '../Logs/Logs.js';
import Settings from '../Settings/Settings.js';
import {StyleSheet, SafeAreaView} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';

const Tab = createBottomTabNavigator();

const Home = () => {
  return (

    <SafeAreaView style={styles.container}>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Main} />
        <Tab.Screen name="Logs" component={Logs} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
      <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default Home;
