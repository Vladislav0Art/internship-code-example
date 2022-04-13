// types
import { 
  LOGIN_USER_SUCCESS, 
  LOGIN_USER_ERROR,
  LOGIN_USER_PENDING,
  CLEAR_LOGIN_MESSAGES,
  REGISTER_USER_SUCCESS, 
  REGISTER_USER_ERROR,
  REGISTER_USER_PENDING,
  CLEAR_REGISTER_MESSAGES
} from '../reduces/types';
// api
import { authenticateUser, registerNewUser } from '../api/user';


// login user
function loginUser(userData) {
  return dispatch => {
    // show loading process while request is being handled
    dispatch({ type: LOGIN_USER_PENDING, payload: null });

    // searching user in db
    authenticateUser(userData.email, userData.password)
      .then(res => {
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        dispatch({ type: LOGIN_USER_SUCCESS, payload: res });
        dispatch({ type: CLEAR_LOGIN_MESSAGES });
      })
      .catch(err => {
        dispatch({ type: LOGIN_USER_ERROR, payload: err.response.data });
        dispatch({ type: CLEAR_LOGIN_MESSAGES });
      });
  }
}


// register new user
function registerUser(userData) {
  return dispatch => {

    // if first and second passwords are not the same
    if(userData.password !== userData.passwordSecond) {
      dispatch({ type: REGISTER_USER_ERROR, payload: { msg: 'Passwords are different', name: 'ValidationError' } });
      dispatch({ type: CLEAR_REGISTER_MESSAGES });
    }
    else {
      // show loading process while request is being handled
      dispatch({ type: REGISTER_USER_PENDING, payload: null });

      // register new user in db
      registerNewUser(userData.name, userData.email, userData.password)
        .then(res => {
          localStorage.setItem('accessToken', res.data.accessToken);
          localStorage.setItem('refreshToken', res.data.refreshToken);
          dispatch({ type: REGISTER_USER_SUCCESS, payload: res });
          dispatch({ type: CLEAR_REGISTER_MESSAGES });
        })
        .catch(err => {
          dispatch({ type: REGISTER_USER_ERROR, payload: err.response.data });
          dispatch({ type: CLEAR_REGISTER_MESSAGES });
        });
    }
  }
}


export default {
  loginUser, 
  registerUser
}