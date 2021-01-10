import RNFS from'react-native-fs';
import { config } from '../config/config.js';
import { FileLogger, LogLevel } from "react-native-file-logger";
import { bindActionCreators } from 'redux';
import store from '../store/ConfigureStore.js';
import * as ActionsBluetooth from '../actions/Logs.js'

export const getAllLogs = async () => {
    const allFiles = await getFilesList();

    const readAllFiles = [];

    for (const file of allFiles) {
        const {path} = file;
        const statResult = await Promise.all([RNFS.stat(path), path]);
        const [tempIsFile, tempFile] = statResult;

        if (tempIsFile.isFile()) {
            try {
                const content = await RNFS.readFile(tempFile, 'utf8');
                    if (typeof content === 'string') {
                        readAllFiles.push({
                            content: content,
                            filePath: tempFile,
                            fileShortName: getFileShortName(tempIsFile),
                        });
                    }
            } catch (error) {
                console.log(`readFile() ${error}`);
            } 
        }
    }

    return readAllFiles;
}

export const readFile = async (path) => {
    const statResult = await Promise.all([RNFS.stat(path), path]);
    const [tempIsFile, tempFile] = statResult;

    if (tempIsFile.isFile()) {
        try {
            const content = await RNFS.readFile(tempFile, 'utf8');
                if (typeof content === 'string') {
                    const readFile = {
                        content: content,
                        filePath: tempFile,
                        fileShortName: getFileShortName(tempIsFile)
                        
                    }

                    return readFile;
                }
        } catch (error) {
            console.log(`readFile() ${error}`);
        } 
    }    
}

export const getFilesList = async () => {
    return sortFilesByDate(await RNFS.readDir(`${RNFS.DocumentDirectoryPath}/logs`));
}

export const getFileShortName = (file) => {
    return file.path.split(" ").pop();
}

export const runLogger = async () => {
    createLogsDirectory();
    FileLogger.configure(config.loggerOptions);
}

export const removeFile = async (file) => {
        await RNFS.unlink(file.path);
        FileLogger.write(LogLevel.Info, `Remove file ${getFileShortName(file)}!`);
        const actionsLogs = bindActionCreators(ActionsBluetooth, store.dispatch);
        actionsLogs.updateFilesList({filesList: await getAllLogs(), manualUpdate: true});
}

const createLogsDirectory = async () => {
    if (!await RNFS.exists(`${RNFS.DocumentDirectoryPath}/logs`)) {
        RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/logs`);
        FileLogger.write(LogLevel.Info, 'Crate logger directory!');
    }
}

const sortFilesByDate = (logsFiles) => {
    return logsFiles.sort((a, b) => b.mtime - a.mtime);
}
