export const PRODUCT_DOWNLOADED_CHANGE = 'DOWNLOADED_CHANGE';
export const USER_DOWNLOADED_CHANGE = 'USER_DOWNLOADED_CHANGE';

export const productDownloadedChangeAction = (payload) => ({
    type: PRODUCT_DOWNLOADED_CHANGE,
    payload
});

export const userDownloadedChangeAction = (payload) => ({
    type: USER_DOWNLOADED_CHANGE,
    payload
});