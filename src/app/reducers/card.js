import deepFreeze from 'deep-freeze';
import { VIEW_IMAGE, SET_IMAGE, DELETE_IMAGE } from '../actions/card';

export default (state = {}, action) => {
  deepFreeze(state);

  switch (action.type) {
    case VIEW_IMAGE:
      return {
        ...state,
        card: {
          ...state.card,
          currentImage: state.images[action.index],
        },
      };
    case SET_IMAGE:
      return state;
    case DELETE_IMAGE:
      return {
        ...state,
        card: {
          ...state.card,
          images: [
            ...state.images.slice(0, action.index),
            ...state.images.slice(action.index + 1),
          ],
        },
      };
    default:
      return state;
  }
};
