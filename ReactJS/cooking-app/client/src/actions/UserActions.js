import { decode } from "jsonwebtoken";
// services
import Auth from '../services/Auth';
// types
import {
  USER_PROFILE_SUCCESS,
  USER_PROFILE_ERROR,
  USER_PROFILE_PENDING,
  CLEAR_USER_PROFILE_MESSAGES,
  USER_PROFILE_LOGOUT,
  GENERAL_ERROR,
  CLEAR_GENERAL_MESSAGES,
  GENERAL_MESSAGE,
  GENERAL_LOADING
} from '../reduces/types';
// api
import { getUserProfile, updateUserProfile, deleteAvatar } from '../api/user';



const getUserProfileInfo = () => (dispatch) => {
  // show loading process while request is being sent
  dispatch({ type: USER_PROFILE_PENDING });

  // checking is user authenticated
  Auth.checkAuth()
  .then(res => {
    // if tokens are expired or does not exist
    if(!res) {
      dispatch({ type: USER_PROFILE_ERROR, payload: {msg: 'Cannot authenticate user!', name: 'ValidationError'}});
      dispatch({ type: CLEAR_USER_PROFILE_MESSAGES });
      return;
    }

    // if tokens are valid
    const { userId } = decode(localStorage.getItem('accessToken'));
    // accessing user data
    getUserProfile(userId)
      .then(res => {
        dispatch({ type: USER_PROFILE_SUCCESS, payload: { ...res.data.user } });
        dispatch({ type: CLEAR_USER_PROFILE_MESSAGES });
      })
      .catch(err => {
        dispatch({ type: USER_PROFILE_ERROR, payload: err.response.data });
        dispatch({ type: CLEAR_USER_PROFILE_MESSAGES });
      });

  });

};



const updateUserProfileInfo = (data) => {
  return (dispatch) => {
    // show loading process while request is being sent
    dispatch({ type: GENERAL_LOADING });

    // checking is user authenticated
    Auth.checkAuth()
      .then(res => {
        // if tokens are expired or does not exist
        if(!res) {
          return;
        }

        // if tokens are valid
        const accessToken = localStorage.getItem('accessToken');
        const { userId } = decode(accessToken);
        
        const options = {
          headers: {
            "access-token": accessToken
          }
        };

        updateUserProfile(userId, data, options)
          .then((res) => {
            dispatch({ type: USER_PROFILE_SUCCESS, payload: { ...res.data } }); // res.data - user info
            dispatch({ type: GENERAL_MESSAGE, payload: 'Profile updated successfully!' });
            dispatch({ type: CLEAR_USER_PROFILE_MESSAGES });
            dispatch({ type: CLEAR_GENERAL_MESSAGES });
          })
          .catch(err => {
            dispatch({ type: GENERAL_ERROR, payload: err.response.data });
            dispatch({ type: CLEAR_GENERAL_MESSAGES });
          });

      })
      .catch(err => {
        dispatch({ type: GENERAL_ERROR, payload: err.response.data });
        dispatch({ type: CLEAR_GENERAL_MESSAGES });
      });
  }
};


const deleteUserAvatar = () => {
  return dispatch => {
    // show loading process while request is being sent
    dispatch({ type: GENERAL_LOADING });

    Auth.checkAuth()
      .then(res => {
        // if tokens are expired or does not exist
        if(!res) {
          return;
        }

        // if tokens are valid
        const accessToken = localStorage.getItem('accessToken');
        const options = {
          headers: {
            "access-token": accessToken
          }
        };

        // deleting user avatar
        deleteAvatar(options)
          .then(res => {
            dispatch({ type: USER_PROFILE_SUCCESS, payload: { ...res.data } }); // res.data - user info
            dispatch({ type: GENERAL_MESSAGE, payload: 'Avatar deleted successfully!' });
            dispatch({ type: CLEAR_USER_PROFILE_MESSAGES });
            dispatch({ type: CLEAR_GENERAL_MESSAGES });
          })
          .catch(err => {
            dispatch({ type: GENERAL_ERROR, payload: err.response.data });
            dispatch({ type: CLEAR_GENERAL_MESSAGES });
          });

      })
      .catch(err => {
        dispatch({ type: GENERAL_ERROR, payload: err.response.data });
        dispatch({ type: CLEAR_GENERAL_MESSAGES });
      })
  }
};


const logoutUser = () => {
  return (dispatch) => {
    Auth.logout();
    dispatch({ type: USER_PROFILE_LOGOUT });
  };
};


export default {
  getUserProfileInfo,
  updateUserProfileInfo,
  deleteUserAvatar,
  logoutUser
}