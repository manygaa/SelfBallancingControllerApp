import { createStore, combineReducers } from 'redux';
import bluetoothReducer from '../reducers/BluetoothReducer.js';
import settingsReducer from '../reducers/SettingsReducer.js';
import logsReducer from '../reducers/LogsReducer.js';

const rootReducer = combineReducers({ 
        bluetoothState: bluetoothReducer,
        settingsReducer: settingsReducer,
        logsReducer: logsReducer
    }
);

const store = createStore(rootReducer);

export default store;
