import deepFreeze from 'deep-freeze';
import { SHOW_MODAL, HIDE_MODAL } from '../actions/modal';

export default (state = {}, action) => {
  deepFreeze(state);

  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        modal: {
          ...state.modal,
          modalVisible: true,
        },
      };
    case HIDE_MODAL:
      return {
        ...state,
        modal: {
          ...state.modal,
          modalVisible: false,
        },
      };
    default:
      return state;
  }
};
