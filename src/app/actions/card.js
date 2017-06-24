export const VIEW_IMAGE = 'VIEW_IMAGE';
export const SET_IMAGE = 'SET_IMAGE';
export const DELETE_IMAGE = 'DELETE_IMAGE';

export function viewImage(index) {
  return {
    type: VIEW_IMAGE,
    index,
  };
};

export function setImage(index) {
  return {
    type: SET_IMAGE,
    index,
  };
};

export function deleteImage(index) {
  return {
    type: DELETE_IMAGE,
    index,
  };
};
