// types
import { 
  LOGIN_USER_SUCCESS,
  LOGIN_USER_PENDING,
  LOGIN_USER_ERROR,
  CLEAR_LOGIN_MESSAGES,
  REGISTER_USER_SUCCESS, 
  REGISTER_USER_PENDING,
  REGISTER_USER_ERROR,
  CLEAR_REGISTER_MESSAGES
} from './types';

const initialState = {
  loginSuccess: false,
  registerSuccess: false,
  loginPending: false,
  registerPending: false,
  loginError: null,
  registerError: null
};

const AuthReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN_USER_SUCCESS:
      return {
        loginSuccess: true, 
        registerSuccess: false, 
        loginError: null, 
        registerError: null,
        loginPending: false,
        registerPending: false,
      };
    
    case LOGIN_USER_PENDING:
      return {
        ...state,
        loginPending: true
      }

    case LOGIN_USER_ERROR:
      return { 
        loginSuccess: false, 
        registerSuccess: false, 
        loginError: action.payload, 
        registerError: null,
        loginPending: false,
        registerPending: false,
      };

    case REGISTER_USER_SUCCESS:
      return { 
        loginSuccess: false, 
        registerSuccess: true, 
        loginError: null, 
        registerError: null,
        loginPending: false,
        registerPending: false,
      };

    case REGISTER_USER_PENDING:
      return {
        ...state,
        registerPending: true
      }

    case REGISTER_USER_ERROR:
      return { 
        loginSuccess: false, 
        registerSuccess: false, 
        loginError: null, 
        registerError: action.payload,
        loginPending: false,
        registerPending: false,
      };
    
    case CLEAR_LOGIN_MESSAGES:
      return initialState;

    case CLEAR_REGISTER_MESSAGES:
      return initialState;

    default:
      return state;
  }
};

export default AuthReducer;