const initState = {
  menuCollapsed: false
};

export default (state = initState, action) => {
  switch (action.type) {
    case "MENU_COLLAPSE":
      return {
        ...state,
        menuCollapsed: !state.menuCollapsed
      };

      case "MENU_MOBILE":
        return {
          ...state,
          menuCollapsed: true
        };

        case "MENU_DESKTOP":
          return {
            ...state,
            menuCollapsed: false
          };

    default:
      return state;
  }
};
