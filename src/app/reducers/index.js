import deepFreeze from 'deep-freeze';
import {
    SHOW_MODAL,
    HIDE_MODAL,
    FETCHING_IMAGES,
    FETCHED_IMAGES,
    SET_IMAGE,
    DELETE_IMAGE,
 } from '../actions/index';

export default (state = {}, action) => {
    deepFreeze(state);

    switch (action.type) {
        case SHOW_MODAL:
            return {
                ...state,
                currentImage: state.images[action.data],
                modalVisible: true,
            };
        case HIDE_MODAL:
            return {
                ...state,
                modalVisible: false,
            };
        case SET_IMAGE:
            fetch(`/images/${state.images[action.data].reddit_id}`, {
                method: 'POST',
            });

            return state;
        case DELETE_IMAGE:
            fetch(`/images/${state.images[action.data].reddit_id}`, {
                method: 'DELETE',
            });

            return {
                ...state,
                images: [
                    ...state.images.slice(0, action.data),
                    ...state.images.slice(action.data + 1),
                ],
            };
        case FETCHING_IMAGES:
            return {
                ...state,
                fetchingImages: true,
            }
        default:
        return state;
    }
};
