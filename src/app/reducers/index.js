import deepFreeze from 'deep-freeze';
import { VIEW_IMAGE, SET_IMAGE, DELETE_IMAGE } from '../actions/card';
import { HIDE_MODAL } from '../actions/modal';

export default (state = {}, action) => {
  deepFreeze(state);

  switch (action.type) {
    case HIDE_MODAL:
      return {
        ...state,
        modalVisible: false,
      };
    case VIEW_IMAGE:
      return {
        ...state,
        currentImage: state.images[action.index],
        modalVisible: true,
      };
    case SET_IMAGE:
      fetch(`/set/${action.index}`, {
        method: 'POST',
      })

      return state;
    case DELETE_IMAGE:
      fetch(`/delete/${action.index}`, {
        method: 'DELETE',
      })

      return {
        ...state,
        images: [
          ...state.images.slice(0, action.index),
          ...state.images.slice(action.index + 1),
        ],
      };
    default:
      return state;
  }
};
