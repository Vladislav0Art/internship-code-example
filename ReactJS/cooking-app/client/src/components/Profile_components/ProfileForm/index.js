import React, { useEffect } from 'react';
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// actions
import { UserActions } from '../../../actions/index';
// components
import { FormGroup, Input, ServiceButton } from '../../index';
import Loader from 'react-loader-spinner';
// services
import { Notification } from '../../../services/index';
// styles
import './ProfileForm.scss';
import './ProfileForm-media.scss';

// default user image
import defaultUserImage from '../../../img/user-default.svg';


const ProfileForm = withRouter((props) => {
  useEffect(() => {
    let msg = null, type = null, showMsg = false;
    
    if(props.state.generalMessage) {
      msg = props.state.generalMessage;
      type = 'success';
      showMsg = true;
    }
    else if(props.state.generalError) {
      msg = props.state.generalError.msg;
      type = 'error';
      showMsg = true;
    }

    if(showMsg) {
      Notification(msg, type);
    }

  }, [
    props.state.generalMessage,
    props.state.generalError
  ]);
  

  // setting image as apreview before the form is submitted
  const previewImage = (input) => {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      const imageContainer = document.querySelector('.profile__img');

      reader.addEventListener('load', (e) => {
        imageContainer.setAttribute('src', e.target.result);
      });

      reader.readAsDataURL(input.files[0]);
    }
  };

  // submitting form data for updating
  const submitForm = (e) => {
    e.preventDefault();
    // getting form data
    const form = new FormData(document.querySelector('.profile__form'));
    const inputs = document.querySelectorAll('.formGroup__input-password');
    // updating user profile
    props.updateUserProfileInfo(form);

    // setting passwords fields to empty strings
    for(let i = 0; i < inputs.length; i++) {
      inputs[i].value = '';
    }
  };

  // logout user and then redirect him to the homepage
  const logoutAndRedirect = () => {
    props.logoutUser();
    props.history.push('/');
  };


  // defining user
  const user = props.state.user;

  return (
    <div className="profile section">
      <div className="container">
        <form className="profile__form section" method="POST" encType="multipart/form-data">
          <div className="profile__content">
            <div className="profile__right">
              <FormGroup title="Name:" classNames={['profile__group']}>
                <Input classNames={['formGroup__input']} name="name" type="text" value={user.name}/>
              </FormGroup>

              <FormGroup title="Email:" classNames={['profile__group']}>
                <Input classNames={['formGroup__input']} name="email" type="email" value={user.email}/>
              </FormGroup>

              <FormGroup title="Change Password:" classNames={['profile__group']}>
                <Input classNames={['formGroup__input formGroup__input-password']} name="prevPassword" type="password" placeholder="Enter your last password" value=""/>
                <Input classNames={['formGroup__input formGroup__input-password']} name="newPassword" type="password" placeholder="Enter your new password" value=""/>
              </FormGroup>

              <FormGroup title="About you:" classNames={['profile__group']}>
                <textarea className="profile__textarea" name="descr" defaultValue={user.descr ? user.descr : ''}></textarea>
              </FormGroup>

              <ServiceButton classNames={['profile__serviceBtn']} content="Logout" type="button" onClick={logoutAndRedirect} />
            </div>
            
            <div className="profile__left">
              <div className="profile__block">
                <div className="profile__avatar">
                  <img className="profile__img" src={ user.avatarLink !== '' ? user.avatarLink : defaultUserImage } alt="User Avatar"></img>
                </div>

                <Input name="avatar" type="file" id="fileInput" classNames={['profile__fileInput']} onChange={(e) => previewImage(e.target)} accept="image/*" />

                <div className="profile__btns">
                  <label className="profile__serviceBtn" htmlFor="fileInput">Upload new avatar</label>
                  <ServiceButton classNames={['profile__serviceBtn']} content="Delete avatar" type="button" onClick={props.deleteUserAvatar} />
                </div>

              </div>

            </div>
          </div>
          
          <div className="profile__submitBlock">
            <ServiceButton classNames={['profile__btn']} content="Update Profile" type="submit" onClick={submitForm} />

            {
            props.state.generalLoading ? 
              <Loader
                type="Oval"
                color="#5E5E5E"
                height={25}
                width={25}
              /> 
            : 
              null
            }
            
          </div>

        </form>
      </div>
    </div>
  );
});

ProfileForm.propTypes = {
  state: PropTypes.object
};


const mapStateToProps = (state) => {
  return {
    state: {
      ...state.UserReducer,
      ...state.GeneralReducer
    }
  }
};


const mapDispatchToProps = {
  updateUserProfileInfo: UserActions.updateUserProfileInfo,
  deleteUserAvatar: UserActions.deleteUserAvatar,
  logoutUser: UserActions.logoutUser
};



export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
