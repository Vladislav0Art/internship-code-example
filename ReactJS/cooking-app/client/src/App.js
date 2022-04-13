import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// actions
import { UserActions } from './actions/index';
// pages
import { Homepage, Account, Profile, PostCreation } from './pages/index';
// components
import { ToastContainer, Slide } from 'react-toastify';
import { Loading } from './components/index';
// services
import { ProtectedRoute } from './services/index';
// styles
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import 'react-toastify/dist/ReactToastify.css';

function App(props) {
  // getting user info
  useEffect(() => {
    props.getUserProfileInfo();
  }, [props.state.loginSuccess, props.state.registerSuccess]);


  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Homepage} />
          <ProtectedRoute path="/account" exact component={Account} loadingPage={Loading} />
          <ProtectedRoute path="/profile" exact component={Profile} loadingPage={Loading} />
          <ProtectedRoute path="/create-post" exact component={PostCreation} loadingPage={Loading} />
        </Switch>
      </BrowserRouter>
      
      <ToastContainer transition={Slide}/>
    </React.Fragment>
  );
}


const mapStateToProps = (state) => {
  return {
    state: {
      ...state.AuthReducer
    }
  };
};

const mapDispatchToProps = {
  getUserProfileInfo: UserActions.getUserProfileInfo
};


export default connect(mapStateToProps, mapDispatchToProps)(App);