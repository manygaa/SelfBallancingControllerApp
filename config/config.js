import RNFS from'react-native-fs';

export const config = {

  // bluetooth
  platform: 'ios',
  bluetoothPiName: 'raspberrypi',
  pingIntervalTime: 7000,
  timeoutScanTime: 10000,

  // logs
  loggerOptions: {
    maxLogFiles: 7,
    logsDirectory: `${RNFS.DocumentDirectoryPath}/logs`
  }
}
