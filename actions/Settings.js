import {SETTINGS} from '../constans/GlobalConstans.js';

export const changeSettingsStatus = (status) => {
    return {
        type: SETTINGS,
        payload: status
    }
}