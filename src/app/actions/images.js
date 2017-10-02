export const FETCH_IMAGES = 'FETCH_IMAGES';
export const FETCHING_IMAGES = 'FETCHING_IMAGES';
export const FETCHED_IMAGES = 'FETCHED_IMAGES';

export function fetchImages() {
    return {
        type: FETCH_IMAGES,
    };
}

export function fetchingImages() {
    return {
        type: FETCHING_IMAGES,
    };
}

export function fetchedImages() {
    return {
        type: FETCHED_IMAGES,
    };
}
