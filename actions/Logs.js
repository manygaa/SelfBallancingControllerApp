import {LOGS} from '../constans/GlobalConstans.js';

export const updateFilesList = (status) => {
    return {
        type: LOGS,
        payload: status
    }
}