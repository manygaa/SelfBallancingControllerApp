import {BLUETOOTH} from '../constans/GlobalConstans.js';

export const changeBluetoothStatus = (status) => {
    return {
        type: BLUETOOTH,
        payload: status
    }
}