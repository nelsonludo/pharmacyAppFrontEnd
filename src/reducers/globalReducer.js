const globalReducer = (state, action) => {
  return new Error(`No matching "${action.type}" - action type`);
};

export default globalReducer;
