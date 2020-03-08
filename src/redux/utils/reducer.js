const initStateScreen = {
    size: 3
};

export const screenSize = (state = initStateScreen, action) => {
  switch (action.type) {
    case "SET_SIZE":
      return {
        ...state,
        size: action.payload
      };

    default:
      return state;
  }
};
