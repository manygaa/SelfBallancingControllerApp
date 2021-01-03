import { BleManager, Service } from 'react-native-ble-plx';
import * as Actions from '../actions/Bluetooth.js'
import { config } from '../config/config.js';
import { Platform } from 'react-native';
import base64 from 'react-native-base64'
import store from '../store/ConfigureStore.js';
import { bindActionCreators } from 'redux';
import { bluetoothText, bluetoothColor, blinkingDelayTime } from '../constans/BluetoothConst.js';
import { FileLogger, LogLevel } from "react-native-file-logger";

let CONNECTED_DEVICE = null;

export const runBluetooth = async () => {
	const actionCreators = bindActionCreators(Actions, store.dispatch);

	try {
		const blemanager = new BleManager();
		const { platform } = config;

		console.log(`runBluetooth(): SCANNING DEVICES`);
		FileLogger.write(LogLevel.Info, 'Bluetooth service - run bluetooth');

		if (Platform.OS === platform) {
			actionCreators.changeBluetoothStatus({
				text: bluetoothText.turnOn, 
				color: bluetoothColor.connecting, 
				blinking: blinkingDelayTime.connecting,
				isOn: true
			});

			const subscription = blemanager.onStateChange(state => {
				if (state === 'PoweredOn') {
					console.log(`runBluetooth(): state: ${state}`);
					FileLogger.write(LogLevel.Info, `Bluetooth service -  state: ${state}`);
					scanDevices(blemanager);
					subscription.remove();
				} else {
					FileLogger.write(LogLevel.Error, `Bluetooth service -  state: ${state}`);
					console.log(`runBluetooth(): state: ${state}`);
				}
			});
		} else {
			scanAndConnect(blemanager);
			FileLogger.write(LogLevel.Error, `Bluetooth service -  unrecognized platfrom ${Platform.OS}`);
			console.log(`runBluetooth(): unrecognized platfrom ${Platform.OS}`);
		}
	} catch (error) {
		actionCreators.changeBluetoothStatus({
			text: bluetoothText.failed, 
			color: bluetoothColor.failed, 
			blinking: blinkingDelayTime.notBlinking,
			isOn: false
		});
		FileLogger.write(LogLevel.Error, `Bluetooth service - ${error.message}`);
		console.log(`runBluetooth(): error: ${error.message}`);
	}
};

const scanDevices = async (blemanager) => {
	const devicesList = [];
	const actionCreators = bindActionCreators(Actions, store.dispatch);

	try {
		blemanager.startDeviceScan(null, null, (error, device) => {
			const { name, id } = device;
			const { bluetoothPiName, timeoutScanTime } = config;

			setTimeout(() => timeoutScan(blemanager), timeoutScanTime);

			actionCreators.changeBluetoothStatus({
				text: `${bluetoothText.looking} ${bluetoothPiName}`,
				color: bluetoothColor.connecting, 
				blinking: blinkingDelayTime.lookingDevice,
				isOn: true
			});

			if (name === bluetoothPiName) {
				FileLogger.write(LogLevel.Info, `Bluetooth service - Find Mr Roobot device: ${name} ${id}`);
				console.log(`scanDevices(): Find Mr Roobot device: ${name} ${id}`);
				blemanager.stopDeviceScan();
				connectToDevice(device);
			} else if (name !== null && !devicesList.includes(name)) {
				devicesList.push(name);
				FileLogger.write(LogLevel.Info, `Bluetooth service - Find device: name=${name} id${id}`);
				console.log(`scanDevices(): Find device: name=${name} id${id}`);
			} 
		});

	} catch (error) {
		actionCreators.changeBluetoothStatus({
			text: bluetoothText.failed, 
			color: bluetoothColor.failed, blinking: 
			blinkingDelayTime.notBlinking,
			isOn: false
		});
		FileLogger.write(LogLevel.Error, `Bluetooth service - ${error.message}`);
		console.log(`scanDevices(): error: ${error.message}`);
	}
}

const connectToDevice = async (device) => {
	const actionCreators = bindActionCreators(Actions, store.dispatch);

	try {
		await device.connect();
		await device.discoverAllServicesAndCharacteristics();
		const services = await device.services();
		const [controllerService] = services;
		const characteristics = await controllerService.characteristics();
		const [controllerCharacteristic] = characteristics;

		actionCreators.changeBluetoothStatus({
			text: bluetoothText.connect, 
			color: bluetoothColor.connect, 
			blinking: blinkingDelayTime.notBlinking,
			isOn: true
		});
		CONNECTED_DEVICE = controllerCharacteristic;
		connectionMonitoring();

	} catch (error) {
		actionCreators.changeBluetoothStatus({
			text: bluetoothText.failed, color: 
			bluetoothColor.failed, blinking: 
			blinkingDelayTime.notBlinking,
			isOn: false
		});
		FileLogger.write(LogLevel.Error, `Bluetooth service - ${error.message}`);
		console.log(`connectToDevice():s error: ${error.message}`);
	}
}

const connectionMonitoring = () => {
	const {pingIntervalTime} = config; 

	setInterval(() => {
		if (CONNECTED_DEVICE != null) {
			communicationWithDevice("ping");
		}
	}, pingIntervalTime);
}

const timeoutScan = (blemanager) => {
	const {bluetoothPiName} = config;
	const actionCreators = bindActionCreators(Actions, store.dispatch);

	blemanager.stopDeviceScan();
	actionCreators.changeBluetoothStatus({
		text: `${bluetoothPiName} ${bluetoothText.timeout}`, 
		color: bluetoothColor.failed, 
		blinking: blinkingDelayTime.notBlinking,
		isOn: false
	});
	FileLogger.write(LogLevel.Warning, `Bluetooth service - timeout scan!`);
}

const monitorDevice = () => {
	CONNECTED_DEVICE.monitor(listnerDevice);
}

const listnerDevice = (error, value) => {
	if (value != null) {
		console.log(`listnerDevice(): value: ${base64.decode(value)} error: ${error}`);
	}
}

export const communicationWithDevice = async (message) => {
	const actionCreators = bindActionCreators(Actions, store.dispatch);

	try {
		const response = await CONNECTED_DEVICE.writeWithResponse(base64.encode(message));
		console.log(response);
	} catch (error) {
		actionCreators.changeBluetoothStatus({
			text: bluetoothText.failed, 
			color: bluetoothColor.failed, 
			blinking: blinkingDelayTime.notBlinking,
			isOn: false
		});
		console.log(`communicationWithDevice(): error: ${error.message}`);
		FileLogger.write(LogLevel.Error, `Bluetooth service - ${error.message}`);
	}
}



