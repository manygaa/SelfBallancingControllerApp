import {getCurrentDate, getDate} from './timeService.js'
const RNFS = require('react-native-fs');

const logsFile = `${RNFS.DocumentDirectoryPath}/${getCurrentDate()}.txt`;

const addLog = async(text, type) => {

  switch (type) {
    case 'info': {
      text = `${getDate()} Info: ${text}`; break;
    }
    case 'warning': {
      text = `${getDate()} Warrnig: ${text}`; break;
    }
    case 'error': {
      text = `${getDate()} Error: ${text}`; break;
    }
  }

  if (await RNFS.exists(logsFile)) {
    text = `${await readLogsFile()}\n${text}`;
  }

  await RNFS.writeFile(logsFile, `${text}`, 'utf8')
    .then((success) => {
      console.log('FILE WRITTEN!');
    })
    .catch((err) => {
      console.log(err.message);
      throw err.message
  });
}

export const logInfo = async(text) => {
  await addLog(text, 'info');
}

export const logWarning = async(text) => {
  await addLog(text, 'warning');
}

export const logError = async(text) => {
  await addLog(text, 'error');
}

export const readLogsFile = async() => {

  if (await RNFS.exists(logsFile)) {

    try {
      return await RNFS.readFile(logsFile, 'utf8');
    } catch (err) {
      console.log(err.message);
      throw err.message;
    }
  } else {
    return null;
  }


}
