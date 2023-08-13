import {
  CALCULATE_CART_TOTAL,
  SET_CATEGORIES,
  START_LOADING,
  STOP_LOADING,
  ADD_TO_CART,
} from '../utils/actions';

const globalReducer = (state, action) => {
  if (action.type === START_LOADING) {
    return { ...state, loading: true };
  }

  if (action.type === STOP_LOADING) {
    return { ...state, loading: false };
  }

  if (action.type === ADD_TO_CART) {
    return { ...state, cart: [...state.cart, action.payload] };
  }

  if (action.type === CALCULATE_CART_TOTAL) {
    const cartAmount = state.cart.reduce((total, item) => {
      total += item.amount;
      return total;
    }, 0);

    const cartTotalPrice = state.cart.reduce((total, item) => {
      total += item.price * item.productamount;
      return total;
    }, 0);

    return { ...state, cartAmount, cartTotalPrice };
  }

  if (action.type === SET_CATEGORIES) {
    return { ...state, categories: action.payload };
  }

  return new Error(`No matching "${action.type}" - action type`);
};

export default globalReducer;
