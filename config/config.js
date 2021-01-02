import RNFS from'react-native-fs';

export const config = {

  // bluetooth
  platform: 'ios',
  bluetoothPiName: 'raspberrypi',
  pingIntervalTime: 3000,
  timeoutScanTime: 30000,

  // logs
  loggerOptions: {
    maxLogFiles: 7,
    logsDirectory: `${RNFS.DocumentDirectoryPath}/logs`
  }
}
