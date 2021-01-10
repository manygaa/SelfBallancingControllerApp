import {LOGS} from '../constans/GlobalConstans.js';

const initialState = {
    filesList: [],
    manualUpdate: false
};

const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGS:
            const {payload} = action;
            return {
                ...state,
                ...payload,
            };
        default:
            return state;
    }
}
export default settingsReducer;