import {SETTINGS} from '../constans/GlobalConstans.js';

const initialState = {
    bluetoothIsOn: false
};

const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SETTINGS:
            const {payload} = action;
            return {
                ...state,
                ...payload,
            };
        default:
            return state;
    }
}
export default settingsReducer;