import { BleManager } from 'react-native-ble-plx';
import * as ActionsBluetooth from '../actions/Bluetooth.js'
import * as ActionsSettings from '../actions/Settings.js'
import { config } from '../config/config.js';
import { Platform } from 'react-native';
import base64 from 'react-native-base64'
import store from '../store/ConfigureStore.js';
import { bindActionCreators } from 'redux';
import { bluetoothText, bluetoothColor, blinkingDelayTime } from '../constans/BluetoothConst.js';
import { FileLogger, LogLevel } from "react-native-file-logger";

let CONNECTED_DEVICE = null;
let CONNECTED_DEVICE_CHARACTERISTIC = null;
let MONITORING_DEVICE = null;

export const runBluetooth = async () => {
	const actionsBluetooth = bindActionCreators(ActionsBluetooth, store.dispatch);
	const actionsSettings = bindActionCreators(ActionsSettings, store.dispatch);

	try {
		const blemanager = new BleManager();
		const { platform } = config;

		console.log(`runBluetooth(): SCANNING DEVICES`);
		FileLogger.write(LogLevel.Info, 'Bluetooth service - run bluetooth');

		if (Platform.OS === platform) {
			actionsSettings.changeSettingsStatus({bluetoothIsOn: true});
			actionsBluetooth.changeBluetoothStatus({
				text: bluetoothText.turnOn, 
				color: bluetoothColor.connecting, 
				blinking: blinkingDelayTime.connecting
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
		actionsSettings.changeSettingsStatus({bluetoothIsOn: false});
		actionsBluetooth.changeBluetoothStatus({
			text: bluetoothText.failed, 
			color: bluetoothColor.failed, 
			blinking: blinkingDelayTime.notBlinking
		});
		FileLogger.write(LogLevel.Error, `Bluetooth service - ${error.message}`);
		console.log(`runBluetooth(): error: ${error.message}`);
	}
};

export const communicationWithDevice = async (message) => {
	const actionsBluetooth = bindActionCreators(ActionsBluetooth, store.dispatch);
	const actionsSettings = bindActionCreators(ActionsSettings, store.dispatch);

	try {
		if (CONNECTED_DEVICE.isConnected()) {
			const response = await CONNECTED_DEVICE_CHARACTERISTIC.writeWithResponse(base64.encode(message));
			console.log(response);
		} else {
			actionsSettings.changeSettingsStatus({bluetoothIsOn: false});
			actionsBluetooth.changeBluetoothStatus({
				text: bluetoothText.lostConnection, 
				color: bluetoothColor.failed, 
				blinking: blinkingDelayTime.notBlinking
			});
		}

	} catch (error) {
		actionsSettings.changeSettingsStatus({bluetoothIsOn: false});
		actionsBluetooth.changeBluetoothStatus({
			text: bluetoothText.failed, 
			color: bluetoothColor.failed, 
			blinking: blinkingDelayTime.notBlinking
		});
		console.log(`communicationWithDevice(): error: ${error.message}`);
		FileLogger.write(LogLevel.Error, `Bluetooth service - ${error.message}`);
	}
}

export const communicationWithDeviceWithoutResponse = (message, dropDownAlertRef) => {
	if (CONNECTED_DEVICE_CHARACTERISTIC) {
		CONNECTED_DEVICE_CHARACTERISTIC.writeWithoutResponse(base64.encode(message));
	} else {
		dropDownAlertRef.current.alertWithType('error', 'Error', 'No bluetooth connection - control is not possible');
	}
}

export const disconnectBluetooth = () => {
	const actionsSettings = bindActionCreators(ActionsSettings, store.dispatch);
	const actionsBluetooth = bindActionCreators(ActionsBluetooth, store.dispatch);

	if (!!CONNECTED_DEVICE) {
		CONNECTED_DEVICE.cancelConnection();
		CONNECTED_DEVICE = null;
		CONNECTED_DEVICE_CHARACTERISTIC = null;
	}

	clearInterval(MONITORING_DEVICE);

	actionsSettings.changeSettingsStatus({bluetoothIsOn: false});
	actionsBluetooth.changeBluetoothStatus({
		text: bluetoothText.disconnect, 
		color: bluetoothColor.failed, 
		blinking: blinkingDelayTime.notBlinking
	});
}

const scanDevices = async (blemanager) => {
	const actionsBluetooth = bindActionCreators(ActionsBluetooth, store.dispatch);
	const actionsSettings = bindActionCreators(ActionsSettings, store.dispatch);
	const { bluetoothPiName, timeoutScanTime } = config;
	const timeOut = setTimeout(() => timeoutScan(blemanager), timeoutScanTime);
	
	try {
		blemanager.startDeviceScan(null, null, (error, device) => {
			const { name, id } = device;
			const devicesList = [];

			actionsBluetooth.changeBluetoothStatus({
				text: `${bluetoothText.looking} ${bluetoothPiName}`,
				color: bluetoothColor.connecting, 
				blinking: blinkingDelayTime.lookingDevice
			});

			if (name === bluetoothPiName) {
				clearTimeout(timeOut);
				FileLogger.write(LogLevel.Info, `Bluetooth service - Find Mr Roobot device: ${name} ${id}`);
				console.log(`scanDevices(): Find Mr Roobot device: ${name} ${id}`);
				blemanager.stopDeviceScan();
				CONNECTED_DEVICE = device;
				connectToDevice();
			} else if (name !== null && !devicesList.includes(name)) {
				devicesList.push(name);
				FileLogger.write(LogLevel.Info, `Bluetooth service - Find device: name=${name} id${id}`);
				console.log(`scanDevices(): Find device: name=${name} id${id}`);
			} 
		});

	} catch (error) {
		actionsSettings.changeSettingsStatus({bluetoothIsOn: false});
		actionsBluetooth.changeBluetoothStatus({
			text: bluetoothText.failed, 
			color: bluetoothColor.failed, blinking: 
			blinkingDelayTime.notBlinking
		});
		FileLogger.write(LogLevel.Error, `Bluetooth service - ${error.message}`);
		console.log(`scanDevices(): error: ${error.message}`);
	}
}

const connectToDevice = async () => {
	const actionsBluetooth = bindActionCreators(ActionsBluetooth, store.dispatch);
	const actionsSettings = bindActionCreators(ActionsSettings, store.dispatch);

	try {
		await CONNECTED_DEVICE.connect();
		await CONNECTED_DEVICE.discoverAllServicesAndCharacteristics();
		const services = await CONNECTED_DEVICE.services();
		const [controllerService] = services;
		const characteristics = await controllerService.characteristics();
		const [controllerCharacteristic] = characteristics;
		CONNECTED_DEVICE_CHARACTERISTIC = controllerCharacteristic;

		actionsBluetooth.changeBluetoothStatus({
			text: bluetoothText.connect, 
			color: bluetoothColor.connect, 
			blinking: blinkingDelayTime.notBlinking
		});

		connectionMonitoring();

	} catch (error) {
		actionsSettings.changeSettingsStatus({bluetoothIsOn: false});
		actionsBluetooth.changeBluetoothStatus({
			text: bluetoothText.failed, color: 
			bluetoothColor.failed, blinking: 
			blinkingDelayTime.notBlinking
		});
		FileLogger.write(LogLevel.Error, `Bluetooth service - ${error.message}`);
		console.log(`connectToDevice():s error: ${error.message}`);
	}
}

const connectionMonitoring = () => {
	const {pingIntervalTime} = config; 

	MONITORING_DEVICE = setInterval(() => {
		if (CONNECTED_DEVICE != null) {
			communicationWithDevice("ping");
		}
	}, pingIntervalTime);
}

const timeoutScan = (blemanager) => {
	const actionsBluetooth = bindActionCreators(ActionsBluetooth, store.dispatch);
	const actionsSettings = bindActionCreators(ActionsSettings, store.dispatch);

	const {bluetoothPiName} = config;

	blemanager.stopDeviceScan();

	actionsSettings.changeSettingsStatus({bluetoothIsOn: false});
	actionsBluetooth.changeBluetoothStatus({
		text: `${bluetoothPiName} ${bluetoothText.timeout}`, 
		color: bluetoothColor.failed, 
		blinking: blinkingDelayTime.notBlinking
	});
	
	FileLogger.write(LogLevel.Warning, `Bluetooth service - timeout scan!`);
	console.log(`timeoutScan(): timeout scan!`);
}

const monitorDevice = () => {
	CONNECTED_DEVICE.monitor(listnerDevice);
}

const listnerDevice = (error, value) => {
	if (value != null) {
		console.log(`listnerDevice(): value: ${base64.decode(value)} error: ${error}`);
	}
}






