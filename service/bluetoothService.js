import {BleManager, Service} from 'react-native-ble-plx';
import {config} from '../config/config.js';
import React, {useState, useEffect} from 'react';
import {Platform} from 'react-native';
import {logInfo, logError} from './logsService.js';
import base64 from 'react-native-base64'

export const runBluetooth = async () => {
  try {
    const blemanager = new BleManager();
    const {platform} = config;

    console.log(`runBluetooth: SCANNING DEVICES`);

    if (Platform.OS === platform) {
      const subscription = blemanager.onStateChange(state => {
        if (state === 'PoweredOn') {
          console.log(`runBluetooth(): state: ${state}`);
          scanDevices(blemanager);
          subscription.remove();
        } else {
          console.log(`runBluetooth(): state: ${state}`);
        }
      });
    } else {
      scanAndConnect(blemanager);
      console.log(`runBluetooth(): unrecognized platfrom ${Platform.OS}`);
    }
  } catch (error) {
    console.log(`runBluetooth(): error: ${error.message}`);
  }
};

const scanDevices = async blemanager => {
  const devicesList = [];
  const {bluetoothPiName} = config;

  try {
    blemanager.startDeviceScan(null, null, (error, device) => {
      const {name, id} = device;
      const {bluetoothPiName} = config;

      if (name === bluetoothPiName) {
        console.log(`scanDevices(): Find Mr Roobot device: ${name} ${id}`);
        blemanager.stopDeviceScan();
        connectToDevice(device, blemanager);
      } else if (name !== null && !devicesList.includes(name)) {
        devicesList.push(name);
        console.log(`scanDevices(): Find device: name=${name} id${id}`);
      }
    });

  } catch (error) {
    console.log(`scanDevices(): error: ${error.message}`);
  }
}

const connectToDevice = async (device, blemanager) => {
  try {
    await device.connect();
    await device.discoverAllServicesAndCharacteristics();
    const services = await device.services();
    const [controllerService] = services;
    const characteristics = await controllerService.characteristics();
    const [controllerCharacteristic] = characteristics;
    await communicationWithDevice(device, controllerCharacteristic);

  } catch (error) {
    console.log(`connectToDevice():s error: ${error.message}`);
  }
}

const communicationWithDevice = async (connectedDevice, serviceAndCharacteristics) => {
  try {
    const response = await serviceAndCharacteristics.writeWithResponse('aGVsbG8gbWlzcyB0YXBweQ==');
    // const response1 = await connectedDevice.monitorCharacteristicForService(
    //   serviceAndCharacteristics.serviceUUID,
    //   serviceAndCharacteristics.uuid,
    //   listnerDevice);



    // const listener = await serviceAndCharacteristics.monitorCharacteristic(
    //   serviceAndCharacteristics.uuid,
    //   listnerDevice
    // )


    console.log(`communicationWithDevice(): ${response}`);
    // console.log(`communicationWithDevice(): ${listener}`);

  } catch (error) {
    console.log(`communicationWithDevice(): error: ${error.message}`);
  }
}

const listnerDevice = (error, value) => {
  console.log(`listnerDevice(): value: ${value} error: ${error}`);
}
