import { SET_USER, UNSET_USER } from '../utils/actions';

const authReducer = (state, action) => {
  if (action.type === SET_USER) {
    return { ...state, user: action.payload };
  }

  if (action.type === UNSET_USER) {
    return { ...state, user: {} };
  }

  return new Error(`No matching "${action.type}" - action type`);
};

export default authReducer;
