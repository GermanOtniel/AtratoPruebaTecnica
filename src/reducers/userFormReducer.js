export const userFormReducer = (state, action) => {
  const { payload } = action;

  switch (action.type) {
    case 'ON_CHANGE_HANDLER': {
      const { fieldName, value } = payload;
      state[fieldName] = value;
      return { ...state };
    }
    case 'RESET': {
      const { value } = payload;
      state = value;
      return { ...state };
    }
  
    default:
      break;
  }
};