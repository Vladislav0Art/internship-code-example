import axios from 'axios';

// login user
export const authenticateUser = (email, password) => {
  return axios.post('users/auth', {
      email,
      password
    });
};


// register new user
export const registerNewUser = (name, email, password) => {
  return axios.post('users/register', {
    name,
    email,
    password
  }) 
};


// get user profile data
export const getUserProfile = (userId) => {
  return axios.get(`users/profile/${userId}`);
};


// update access and refresh tokens
export const updateTokens = (refreshToken) => {
  return axios.post('users/refresh-tokens', {
    refreshToken
  });
};


// update user profile data
export const updateUserProfile = (userId, data, options) => {
  return axios.put(`users/update-profile/${userId}`, data, options);
};


export const deleteAvatar = (options) => {
  return axios.delete('users/delete-profile-avatar', options);
}