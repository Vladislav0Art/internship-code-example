import { decode } from "jsonwebtoken";
// api
import { updateTokens } from '../api/user';

const Auth = {
  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  async checkAuth() {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const decoded = parseJwt(accessToken);
    let isAuth = false;
  
    // parsing token
    function parseJwt(token) {
      try {
        return decode(token);
      } catch (e) {
        return null;
      }
    }

    // checking if decoded toke exists
    if(decoded) {
      // if token is expired, then trying to update tokens
      if(decoded.exp <= Date.now().valueOf() / 1000) {
        isAuth = await updateTokens(refreshToken)
          .then(res => {
            // setting new tokens in local storage
            localStorage.setItem('accessToken', res.data.accessToken);
            localStorage.setItem('refreshToken', res.data.refreshToken);
            return true;
          })
          .catch(err => {
            console.log(err)
            return false;
          });
      }
      else {
        // if token is not expired
        isAuth = true;
      }
    }

    return isAuth;
  }

}

export default Auth;