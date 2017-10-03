export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

export const SET_IMAGE = 'SET_IMAGE';
export const DELETE_IMAGE = 'DELETE_IMAGE';

export const FETCH_IMAGES = 'FETCH_IMAGES';
export const FETCHING_IMAGES = 'FETCHING_IMAGES';
export const FETCHED_IMAGES = 'FETCHED_IMAGES';

export const SHOW_ERROR = 'SHOW_ERROR';
export const HIDE_ERROR = 'HIDE_ERROR';

export function modalAction(action, data = {}) {
    return {
        type: action,
        data,
    };
}

export function fetchAction(action, data = {}) {
    return {
        type: action,
        data,
    };
}

export function imageAction(action, data = {}) {
    return {
        type: action,
        data,
    };
}

export function errorAction(action, data) {
    return {
        type: action,
        data,
    };
}
