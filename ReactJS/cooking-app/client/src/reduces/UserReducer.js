// types
import {
  USER_PROFILE_SUCCESS, 
  USER_PROFILE_ERROR, 
  USER_PROFILE_PENDING,
  CLEAR_USER_PROFILE_MESSAGES,
  USER_PROFILE_LOGOUT
} from './types';

const initialState = {
  user: null,
  isUserLoaded: null,
  isUserPending: false,
  userError: null
}


const UserReducer = (state = initialState, action) => {
  switch(action.type) {
    case USER_PROFILE_SUCCESS:
      return {
        user: action.payload,
        isUserLoaded: true,
        isUserPending: false,
        userError: null,
      }
    
    case USER_PROFILE_PENDING:
      return {
        ...state,
        isUserLoaded: false,
        isUserPending: true,
      }

    case USER_PROFILE_ERROR:
      return {
        user: null,
        isUserLoaded: false,
        isUserPending: false,
        userError: (typeof action.payload === 'string') ? { msg: action.payload, name: 'Error' } : action.payload
      }

    case CLEAR_USER_PROFILE_MESSAGES:
      return {
        ...state,
        userError: null
      };

    case USER_PROFILE_LOGOUT:
      return initialState;

    default:
      return state;
  }
};


export default UserReducer;