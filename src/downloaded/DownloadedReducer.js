import { PRODUCT_DOWNLOADED_CHANGE } from "./DownloadedActions";
import { USER_DOWNLOADED_CHANGE } from "./DownloadedActions";

export const downloadedReducer = (state = [false, false], action) => {
    console.log(action);
    switch (action.type) {
        case PRODUCT_DOWNLOADED_CHANGE:
            return [!state[0], state[1]];
        case USER_DOWNLOADED_CHANGE:
            return [state[0], !state[1]];
        default:
            return state;
    }
}
