import {BleManager} from 'react-native-ble-plx';
import React, {useState, useEffect} from 'react';
import {Platform} from 'react-native';
import {logInfo, logError} from './logsService.js';

export const scanningDevices = async () => {
  try {
    const blemanager = new BleManager();

    if (Platform.OS === 'ios') {
      blemanager.onStateChange(state => {
        if (state === 'PoweredOn') {
          scanAndConnect(blemanager);
        } else {
          console.log(`scanningDevices: state: ${state}`);
        }
      });
    } else {
      scanAndConnect(blemanager);
      console.log(`scanningDevices: unrecognized platfrom ${Platform.OS}`);
    }
  } catch (e) {
    console.log(`error: ${e.message}`);
  }
};

const scanAndConnect = blemanager => {
  blemanager.startDeviceScan(null, null, (error, device) => {
    console.log(device);

    if (error) {
      console.log(error.message);
      return;
    }

    if (device.name === 'Pi') {
      blemanager.stopDeviceScan();
      device
        .connect()
        .then(device => {
          console.log('Discovering services and characteristics');
        })
        .then(device => {
          console.log('Setting notifications');
        });
    }
  });
};
