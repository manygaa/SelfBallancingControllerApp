import {BLUETOOTH} from '../constans/GlobalConstans.js';
import { bluetoothText, bluetoothColor, blinkingDelayTime } from '../constans/BluetoothConst.js';

const initialState = {
    isOn: false,
    text: bluetoothText.turnedOff,
    color: bluetoothColor.turnedOff,
    blinking: blinkingDelayTime.notBlinking
};

const bluetoothReducer = (state = initialState, action) => {
    switch (action.type) {
        case BLUETOOTH:
            const {payload} = action;
            return {
                ...state,
                ...payload,
            };
        default:
            return state;
    }
}
export default bluetoothReducer;