import RNFS from'react-native-fs';
import { config } from '../config/config.js';
import { FileLogger, LogLevel } from "react-native-file-logger";

export const getAllLogs = async () => {
    const allFiles = await RNFS.readDir(`${RNFS.DocumentDirectoryPath}/logs`);

    const readAllFiles = [];

    for (const file of allFiles) {
        const statResult = await Promise.all([RNFS.stat(file.path), file.path]);
        const [tempIsFile, tempFile] = statResult;

        if (tempIsFile.isFile()) {
            try {
                const content = await RNFS.readFile(tempFile, 'utf8');
                    if (typeof content === 'string') {
                        const fileShortName = tempFile.split(" ").pop();

                        readAllFiles.push({
                            content: content,
                            filePath: tempFile,
                            fileShortName: fileShortName
                            
                        });
                    }
            } catch (error) {
                console.log('getLogsFiles()  ' + error);
            } 
        }
    }

    return readAllFiles;
}

export const runLogger = async () => {
    createLogsDirectory();
    FileLogger.configure(config.loggerOptions);
}

const createLogsDirectory = async () => {
    RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/logs`);
    FileLogger.write(LogLevel.Info, 'Crate logger directory!');
}