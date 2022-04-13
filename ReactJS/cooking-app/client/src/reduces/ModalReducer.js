import { REGISTER_MODAL_OPEN, REGISTER_MODAL_CLOSE, LOGIN_MODAL_OPEN, LOGIN_MODAL_CLOSE } from './types';

const initialState = {
  registerModalOpen: false,
  loginModalOpen: false
}

const ModalReducer = (state = initialState, action) => {
  switch(action.type) {
    case REGISTER_MODAL_OPEN:
      return { ...state, registerModalOpen: true };
    case REGISTER_MODAL_CLOSE:
      return { ...state, registerModalOpen: false };
    case LOGIN_MODAL_OPEN:
      return { ...state, loginModalOpen: true };
    case LOGIN_MODAL_CLOSE:
      return { ...state, loginModalOpen: false };
    default: 
      return state;
  }
};

export default ModalReducer;