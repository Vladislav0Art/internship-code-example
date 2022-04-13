import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


const ProtectedRoute = ({ loadingPage: Loading, component: Component, userState, ...rest }) => {
  const isUserLoaded = userState.isUserLoaded
  const isUserPending = userState.isUserPending;
  
  return (
    <Route
      { ...rest }
      render = { 
        (props) => {

          if(isUserPending || isUserLoaded === null) {
            return (<Loading />);
          }
          else if(isUserLoaded) {
            return (<Component {...props} />);
          }
          else {
            return (<Redirect to={{ pathname: "/" }} />);
          }

        }
      }
    />
  )
};

const mapStateToProps = (state) => ({
  userState: { 
    isUserLoaded: state.UserReducer.isUserLoaded, 
    isUserPending: state.UserReducer.isUserPending 
  }
});
export default connect(mapStateToProps)(ProtectedRoute);