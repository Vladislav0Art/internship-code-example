import { OPEN_MENU, CLOSE_MENU } from './types';

const initialState = {
  menuOpen: false
};

const MenuReducer = (state = initialState, action) => {
  switch(action.type) {
    case OPEN_MENU:
      return { menuOpen: true };
    case CLOSE_MENU:
      return { menuOpen: false };
    default:
      return state;
  }
}

export default MenuReducer;