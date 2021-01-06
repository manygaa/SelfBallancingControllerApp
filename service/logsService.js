import RNFS from'react-native-fs';
import { config } from '../config/config.js';
import { FileLogger, LogLevel } from "react-native-file-logger";

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
                        const fileShortName = getFileShortName(tempIsFile);

                        readAllFiles.push({
                            content: content,
                            filePath: tempFile,
                            fileShortName: fileShortName
                            
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
                    const fileShortName = getFileShortName(tempIsFile);

                    const readFile = {
                        content: content,
                        filePath: tempFile,
                        fileShortName: fileShortName
                        
                    }

                    return readFile;
                }
        } catch (error) {
            console.log(`readFile() ${error}`);
        } 
    }    
}

export const getFilesList = async () => {
    return await RNFS.readDir(`${RNFS.DocumentDirectoryPath}/logs`);
}

export const getFileShortName = (file) => {
    return file.path.split(" ").pop();
}

export const runLogger = async () => {
    createLogsDirectory();
    FileLogger.configure(config.loggerOptions);
}

export const removeFile = async (file) => {
    if (await RNFS.unlink(file.path)) {
        FileLogger.write(LogLevel.Info, `Remove file ${getFileShortName(file)}!`);
    } else {
        FileLogger.write(LogLevel.Info, `Problem with deleting the file ${getFileShortName(file)}!`);
    }
}

const createLogsDirectory = async () => {
    if (!await RNFS.exists(`${RNFS.DocumentDirectoryPath}/logs`)) {
        RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/logs`);
        FileLogger.write(LogLevel.Info, 'Crate logger directory!');
    }
}