import { createStore, combineReducers } from 'redux';
import bluetoothReducer from '../reducers/BluetoothReducer.js';
import settingsReducer from '../reducers/SettingsReducer.js';

const rootReducer = combineReducers({ 
        bluetoothState: bluetoothReducer,
        settingsReducer: settingsReducer
    }
);

const store = createStore(rootReducer);

export default store;
