import { BleManager } from "react-native-ble-plx";
import React, { useState, useEffect } from 'react';
import { logInfo, logError } from './logsService.js'

export const scanningDevices = async() => {
  const [state, setState] = useState({ info: "", values: {}});

  const bleManager = new BleManager({
    restoreStateIdentifier: 'identifier',
    restoreStateFunction: (bleRestoredState: BleRestoredState) => {
      if (bleRestoredState == null) {
        // BleManager was constructed for the first time.
      } else {
        // BleManager was restored. Check `bleRestoredState.connectedPeripherals` property.
      }
    },
  })
  await logInfo('Run bluetooth scanning');

  manager.onStateChange(async(state) => {

      if (state === 'PoweredOn') {
          await logInfo('Run bluetooth scanning' + state);
          manager.destroy();
      } else {
        await logError('Run bluetooth scanning' + state);
        manager.destroy();
      }
  }, true);


};
