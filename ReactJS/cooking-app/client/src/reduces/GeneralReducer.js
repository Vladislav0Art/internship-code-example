import {
  GENERAL_MESSAGE,
  GENERAL_ERROR,
  CLEAR_GENERAL_MESSAGES,
  GENERAL_LOADING
} from './types';


const initialState = {
  generalError: null,
  generalMessage: null,
  generalLoading: false
};


const GeneralReducer = (state = initialState, action) => {
  switch(action.type) {
    case GENERAL_MESSAGE:
      return {
        ...state,
        generalMessage: action.payload
      }

    case GENERAL_ERROR:
      return {
        ...state,
        generalError: action.payload
      }

    case CLEAR_GENERAL_MESSAGES:
      return {
        generalError: null,
        generalMessage: null,
        generalLoading: false
      }

    case GENERAL_LOADING:
      return {
        ...state,
        generalLoading: true
      };

    default:
      return state;
  }
};

export default GeneralReducer;