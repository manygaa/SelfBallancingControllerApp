import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { runBluetooth } from '../../service/BluetoothService.js';
import { BluetoothIcon } from '../../icon/SvgIcon.js';
import { Styles } from './BluetoothStyles.js';
import BlinkView from 'react-native-blink-view';

const Bluetooth = ({status}) => {
	useEffect(() => {
		runBluetooth();
	}, []);

	const {color, text, blinking} = status;

	return (
		<View style={Styles.container}>
			{Boolean(blinking) ?
				<BlinkView blinking={true} delay={blinking}>
					<BluetoothIcon color={color} />
				</BlinkView>
				:
				<BluetoothIcon color={color} />
			}
			<Text style={Styles.text}>{text}</Text>
		</View>
	);
};

const mapStateToProps = state => ({
	status: state.bluetoothState
});

export default connect(mapStateToProps)(Bluetooth);
