import { createStore, combineReducers } from 'redux';
import bluetoothReducer from '../reducers/BluetoothReducer.js';

const rootReducer = combineReducers(
    { bluetoothState: bluetoothReducer }
);

const store = createStore(rootReducer);

export default store;
